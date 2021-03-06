
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import Link from 'next/link';

import UserCard from '../components/UserCard';
import ErrorMessage from "../components/ErrorMessage";

export const teamQuery = gql`
  query Team($id: ID!) {
    team(id: $id) {
      id,
      name,
      users {
        id,
        fullName
      }
    }
  }
`;

class Team extends React.Component {
  static async getInitialProps({query}) {
    return { teamId: query.teamId }
  }

  render() {
    const { teamId } = this.props;
    return (
      <div>
        <Link href="/">
          <a>Home</a>
        </Link>
        <h1>Team</h1>
        <Query query={teamQuery} variables={{id: teamId}}>
          {({ loading, error, data }) => {
          if (error) {
            console.log(error)
            if(error.graphQLErrors.some((err => err.path[0] === 'team' && err.extensions.code === 'UNAUTHENTICATED'))){
              return (
                <div>
                  <ErrorMessage message='You must be logged in to view this team.' />
                  <Link href="/login">
                    <a>Log In</a>
                  </Link>
                </div>
              )
            }
            return <ErrorMessage message={error.message} />
          }
          if (loading) return <div>Loading</div>

          if(!data.team){
            console.log('no team data');
          }
          const team = data.team;

          return (
            <div>
              <h2>{team.name}</h2>
            {team.users.map((user, index) => (
              <UserCard key={user.id} user={user} />
            ))}
            </div>
          )
          }}
        </Query>
      </div>
    )
  }
}

export default Team