import './article.scss'
import { format } from 'date-fns'

import Avatar from './avatar/avatar'
import Title from './title/title'

export default function Article({ user, article }) {
  return (
    <article className="content__article article">
      <div className="article__info">
        <Title article={article} user={user} />
        <div className={article.tagList.length ? 'article__tags' : 'article__tags article__tags--empty'}>
          {article.tagList.map((tag, index) => {
            return (
              // eslint-disable-next-line react/no-array-index-key
              <span key={`${tag}-${index}`} className="article__tag">
                {tag}
              </span>
            )
          })}
        </div>
        <div className="article__description">
          {article.description.length > 350
            ? `${article.description.substr(0, 349)}${article.description.substr(349).split('.')[0].split(',')[0].split(' ')[0]}...`
            : article.description}
        </div>
      </div>
      <div className="article__account">
        <div className="article__account-info">
          <h6 className="article__name">
            {article.author.username.length > 9 ? `${article.author.username.slice(0, 8)}...` : article.author.username}
          </h6>
          <span className="article__time">{format(article.createdAt, 'MMMM d, yyyy')}</span>
        </div>
        <Avatar article={article} />
      </div>
    </article>
  )
}
