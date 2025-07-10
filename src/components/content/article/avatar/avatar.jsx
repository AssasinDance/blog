import avatarTemplate from '../../../../assets/avatar.png'

export default function Avatar({ isLoading, isError, article }) {
  if (isLoading) {
    return (
      <div className="loading-spinner loading-spinner--avatar">
        <div className="loading loading--avatar">
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
        </div>
      </div>
    )
  }

  if (isError) {
    return <img className="article__avatar" src={avatarTemplate} alt="avatar" />
  }

  return <img className="article__avatar" src={article.author.image} alt="avatar" />
}
