import './title.scss'
import { Link } from 'react-router-dom'
import { useState } from 'react'

import { useFavoriteArticleMutation, useUnfavoriteArticleMutation } from '../../../../services/api'

export default function Title({ user, article }) {
  const [favoriteArticle] = useFavoriteArticleMutation()
  const [unfavoriteArticle] = useUnfavoriteArticleMutation()
  const [favoriteStatus, setFavoriteStatus] = useState(article.favorited)
  const [favoritesCount, setFavoritesCount] = useState(article.favoritesCount)

  const handleFavoriteArticle = async () => {
    await favoriteArticle({ slug: article.slug, token: user.token })
      .unwrap()
      .then(() => {
        setFavoriteStatus(true)
        setFavoritesCount((prev) => prev + 1)
      })
  }

  const handleUnfavoriteArticle = async () => {
    await unfavoriteArticle({ slug: article.slug, token: user.token })
      .unwrap()
      .then(() => {
        setFavoriteStatus(false)
        setFavoritesCount((prev) => prev - 1)
      })
  }

  const likeClassHandler = () => {
    if (user) {
      return favoriteStatus ? 'title__likes title__likes--active' : 'title__likes'
    }
    return 'title__likes title__likes--unauthorized'
  }

  return (
    <div className="article__title title">
      <Link to={`/articles/${article.slug}`}>
        <h5 className="title__text">{article.title}</h5>
      </Link>
      <button
        className={likeClassHandler()}
        type="button"
        onClick={() => user && (favoriteStatus ? handleUnfavoriteArticle() : handleFavoriteArticle())}
      >
        {favoritesCount}
      </button>
    </div>
  )
}
