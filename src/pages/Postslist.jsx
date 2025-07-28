import Content from '../components/content/content'

export default function Postslist({ user, currentPage, setCurrentPage }) {
  return <Content user={user} currentPage={currentPage} setCurrentPage={setCurrentPage} />
}
