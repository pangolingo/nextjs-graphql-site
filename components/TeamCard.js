import Link from 'next/link'

const TeamCard = (props) => {
  const { team } = props;
  return (
  <div>
    <h2>{team.name}</h2>
    <Link href={`/team?teamId=${team.id}`} as={`/teams/${team.id}`} >
      <a>View Team</a>
    </Link>
  </div>
)
  }

export default TeamCard