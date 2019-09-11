
import { Query, Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import Link from 'next/link';

import UserCard from '../components/UserCard';
import ErrorMessage from "../components/ErrorMessage";
import UserComments from '../components/UserComments';

export const USER_QUERY = gql`
  query User($id: ID!) {
    user(id: $id) {
      id,
      fullName
      jobTitle
      city
      state
    }
  }
`;


class User extends React.Component {
  static async getInitialProps({query}) {
    return { userId: query.userId }
  }

  render() {
    const { userId } = this.props;
    return (
      <div>
        <Link href="/">
          <a>Home</a>
        </Link>
        <h1>User</h1>
        <Query query={USER_QUERY} variables={{id: userId}} errorPolicy="all">
          {({ loading, error, data, fetchMore }) => {
          if (error) {
            console.log(error)
            return <ErrorMessage message='Error loading user' />
          }
          if (loading) return <div>Loading</div>

          if(!data.user){
            console.log('no user data');
          }
          const user = data.user;

          if(!user){
            return 'Nothing';
          }

          return (
            <div>
              <h2>{user.fullName}</h2>
              <ul>
                <li>Job title: {user.jobTitle}</li>
                <li>City: {user.city}</li>
                <li>State: {user.state}</li>
              </ul>
              <UserComments user={user} />
            </div>
          )
          }}
        </Query>
      </div>
    )
  }
}

export default User