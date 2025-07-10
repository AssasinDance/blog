import { EditProfile } from '../components/sign/sign'

export default function Profile({ user, setUser }) {
  return (
    <main className="content">
      <EditProfile user={user} setUser={setUser} />
    </main>
  )
}
