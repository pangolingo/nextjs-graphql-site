import Link from 'next/link'

const UserCard = (props) => {
  const { user  } = props;
  return (
  <div>
    <p>{user.fullName}</p>
    <Link href={`/user?userId=${user.id}`} as={`/users/${user.id}`}>
      <a>View User</a>
    </Link>
  </div>
)
  }

export default UserCard