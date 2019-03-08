import Link from 'next/link';

import TeamCardList from '../components/TeamCardList';

const Index = () => (
  <div>
    <Link href="/login">
      <a>Log In</a>
    </Link>
    <h1>Teams</h1>
    <TeamCardList />
  </div>
)

export default Index;