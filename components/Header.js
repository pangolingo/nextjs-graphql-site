
import { Query, Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import Link from 'next/link';

import UserCard from '../components/UserCard';
import ErrorMessage from "../components/ErrorMessage";

export const CURRENT_USER_QUERY = gql`
  query HeaderCurrentUser {
    viewer {
      fullName
      email
    }
  }
`;

class Header extends React.Component {

  render() {
    return (
      <div>
        REACHIRE
        <Query query={CURRENT_USER_QUERY}>
          {({ loading, error, data, fetchMore }) => {
          if (error) {
            console.log(error)
            return <ErrorMessage message='Error loading current user' />
          }
          if (loading) return null;

          if(!data.viewer){
            return (
              <Link href={'/login'}>
                <a>Log In</a>
              </Link>
            );
          }

          return (
            <div>
              Logged in as {data.viewer.fullName} &lt;{data.viewer.email}&gt;
              <button type="button" onClick={this.props.logout}>Log Out</button>
            </div>
          )
          
          }}
        </Query>
      </div>
    )
  }
}

export default Header