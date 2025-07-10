import { EditArticle } from '../components/sign/sign'

export default function EditPost({ user }) {
  return (
    <main className="content">
      <EditArticle user={user} />
    </main>
  )
}
