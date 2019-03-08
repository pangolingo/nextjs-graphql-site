import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import TeamCard from "./TeamCard";
import ErrorMessage from "./ErrorMessage";

export const allTeamsQuery = gql`
  query Teams {
    teams {
      id,
      name,
    }
  }
`;

class TeamCardList extends React.Component {
  render() {
    return (
      <div>
        <Query query={allTeamsQuery}>
          {({ loading, error, data }) => {
          if (error) {
            console.log(error)
            return <ErrorMessage message='Error loading teams.' />
          }
          if (loading) return <div>Loading</div>

          if(!data.teams){
            console.log('no teams data');
          }
          const teams = data.teams;

          return (
            <div>
            {teams.map((team, index) => (
              <TeamCard key={team.id} team={team} />
            ))}
            </div>
          )
          }}
        </Query>
      </div>
    )
  }
}

export default TeamCardList