
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import Link from 'next/link';

import UserCard from '../components/UserCard';
import ErrorMessage from "../components/ErrorMessage";

export const userQuery = gql`
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
        <Query query={userQuery} variables={{id: userId}}>
          {({ loading, error, data }) => {
          if (error) {
            console.log(error)
            return <ErrorMessage message='Error loading user' />
          }
          if (loading) return <div>Loading</div>

          if(!data.user){
            console.log('no teuseram data');
          }
          const user = data.user;

          return (
            <div>
              <h2>{user.fullName}</h2>
              <ul>
                <li>Job title: {user.jobTitle}</li>
                <li>City: {user.city}</li>
                <li>State: {user.state}</li>
              </ul>
            </div>
          )
          }}
        </Query>
      </div>
    )
  }
}

export default User