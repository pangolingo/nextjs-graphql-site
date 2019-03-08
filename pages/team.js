
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
            return <ErrorMessage message='Error loading teams' />
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