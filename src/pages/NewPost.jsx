import { NewArticle } from '../components/sign/sign'

export default function NewPost({ user }) {
  return (
    <main className="content">
      <NewArticle user={user} />
    </main>
  )
}
