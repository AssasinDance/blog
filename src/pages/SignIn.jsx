import { SignIn as Sign } from '../components/sign/sign'

export default function SignIn({ user, setUser }) {
  return (
    <main className="content">
      <Sign user={user} setUser={setUser} />
    </main>
  )
}
