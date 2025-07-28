import { useState, useEffect } from 'react'

import avatarTemplate from '../../../../assets/avatar.png'

export default function Avatar({ article }) {
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  function fetchImage(url) {
    fetch(url, {
      mode: 'no-cors',
    })
      .then((data) => {
        setIsLoading(false)
        console.log(data)
        return data
      })
      .catch(() => {
        setIsLoading(false)
        setIsError(true)
      })
  }

  useEffect(() => {
    fetchImage(article.author.image)
  }, [article])

  if (isError) {
    return <img className="article__avatar" src={avatarTemplate} alt="avatar" />
  }

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

  return (
    <img
      className="article__avatar"
      src={article.author.image}
      alt="avatar"
      onError={(e) => {
        e.target.src = avatarTemplate
      }}
    />
  )
}
