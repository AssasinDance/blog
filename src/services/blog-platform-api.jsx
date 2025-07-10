/* eslint-disable no-return-await */
export async function getArticles(page = 1, quantityViewed = 10) {
  const url = `https://blog-platform.kata.academy/api/articles?limit=${quantityViewed}&offset=${quantityViewed * (page - 1)}`
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
  }

  return await fetch(url, options)
    .then((res) => {
      if (!res.ok) throw new Error()
      return res.json()
    })
    .then((json) => {
      return json
    })
}

export async function getArticle() {
  return null
}
