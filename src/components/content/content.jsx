import './content.scss'
import { useEffect, useState } from 'react'
import { Pagination } from 'antd'

import { getArticles } from '../../services/blog-platform-api'

import Article from './article/article'
// import { Pagination } from './pagination/pagination'

export default function Content({ user }) {
  const [articles, setArticles] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    getArticles().then((data) => {
      setArticles(data)
    })
  }, [setArticles])

  function paginationHandler(page) {
    setArticles(null)
    getArticles(page)
      .then((data) => {
        setArticles(data)
        setCurrentPage(page)
      })
      .catch(() => {
        setArticles('error')
      })
  }

  switch (articles) {
    case 'error':
      return (
        <main className="content">
          <div className="content__error">Произошла непредвиденная ошибка! Попробуйте перезагрузить страницу</div>
        </main>
      )
    case null:
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
    default:
      return (
        <main className="content">
          {articles.articles.map((article) => {
            return <Article key={article.slug} article={article} user={user} />
          })}
          <Pagination
            className="content__pagination"
            align="center"
            current={currentPage}
            defaultCurrent={1}
            total={articles.articlesCount}
            showSizeChanger={false}
            onChange={(page) => paginationHandler(page)}
          />
        </main>
      )
  }
}
