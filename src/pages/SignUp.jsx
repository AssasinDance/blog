import { SignUp as Sign } from '../components/sign/sign'

export default function SignUp({ user, setUser }) {
  return (
    <main className="content">
      <Sign user={user} setUser={setUser} />
    </main>
  )
}
