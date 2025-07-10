import './title.scss'
import { Link } from 'react-router-dom'

export default function Title({ article }) {
  return (
    <div className="article__title title">
      <Link to={`/articles/${article.slug}`}>
        <h5 className="title__text">{article.title}</h5>
      </Link>
      <button className="title__likes" type="button">
        {article.favoritesCount}
      </button>
    </div>
  )
}
