import './article.scss'
import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import { Tooltip } from 'antd'
import Markdown from 'markdown-to-jsx'

import Avatar from '../content/article/avatar/avatar'

import Title from './title/title'

export default function Article({ user }) {
  const { id } = useParams()
  const [article, setArticle] = useState(null)

  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const navigate = useNavigate()

  async function fetchImage(url) {
    fetch(url, {
      mode: 'no-cors',
    })
      .then((data) => {
        setIsLoading(false)
        return data
      })
      .catch(() => {
        setIsLoading(false)
        setIsError(true)
      })
  }

  function deleteArticle() {
    const url = `https://blog-platform.kata.academy/api/articles/${article.slug}`
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${user.token}`,
      },
    }
    return fetch(url, options).then(() => {
      navigate('/')
    })
  }

  useEffect(() => {
    fetch(`https://blog-platform.kata.academy/api/articles/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setArticle(data.article)
        fetchImage(data.article.author.image)
      })
  }, [id, user])

  if (article === null) {
    return (
      <main className="content">
        <div className="loading-spinner">
          <div className="loading">
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
      </main>
    )
  }

  return (
    <main className="content">
      <article className="article article--one-post">
        <div className="article__header article__header--one-post">
          <div className="article__info">
            <Title article={article} />
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
            <div className="article__description">{article.description}</div>
          </div>
          <div className="article__account article__account--one-post">
            <div className="article__author">
              <div className="article__account-info">
                <h6 className="article__name">{article.author.username}</h6>
                <span className="article__time">{format(article.createdAt, 'MMMM d, yyyy')}</span>
              </div>
              <Avatar isLoading={isLoading} isError={isError} article={article} />
            </div>
            {user !== null && user.username === article.author.username ? (
              <div className="article__manage">
                <Tooltip
                  placement="bottom"
                  color="white"
                  title={
                    <div className="article__tooltip">
                      <span className="article__tooltip-text">Are you sure?</span>
                      <button className="article__tooltip-button" type="button" onClick={() => deleteArticle()}>
                        DELETE!
                      </button>
                    </div>
                  }
                >
                  <button className="article__delete" type="button">
                    Delete
                  </button>
                </Tooltip>
                <button
                  className="article__edit"
                  type="button"
                  onClick={() => navigate(`/articles/${article.slug}/edit`)}
                >
                  Edit
                </button>
              </div>
            ) : null}
          </div>
        </div>
        <div className="article__main-text">
          <Markdown>{article.body}</Markdown>
        </div>
      </article>
    </main>
  )
}
