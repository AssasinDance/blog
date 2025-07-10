export default function Title({ article }) {
  return (
    <div className="article__title title">
      <h5 className="title__text">{article.title}</h5>
      <button className="title__likes" type="button">
        {article.favoritesCount}
      </button>
    </div>
  )
}
