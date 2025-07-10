export function registerUser(username, email, password) {
  const url = 'https://blog-platform.kata.academy/api/users'
  const body = {
    user: {
      username,
      email,
      password,
    },
  }
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  }

  return fetch(url, options).then((data) => {
    return data.json()
  })
}

export function loginUser(email, password) {
  const url = 'https://blog-platform.kata.academy/api/users/login'
  const body = {
    user: {
      email,
      password,
    },
  }
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  }

  return fetch(url, options).then((data) => {
    return data.json()
  })
}

export function editUser(username, email, password, urlImage, token) {
  const url = 'https://blog-platform.kata.academy/api/user'
  const body = {
    user: {
      username,
      email,
      image: urlImage,
      bio: '',
      password,
    },
  }
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(body),
  }

  return fetch(url, options).then((data) => {
    return data.json()
  })
}

export function createArticle(article, token) {
  const url = 'https://blog-platform.kata.academy/api/articles'
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify({ article }),
  }
  return fetch(url, options).then((data) => {
    return data.json()
  })
}

export function editArticle(article, slug, token) {
  const url = `https://blog-platform.kata.academy/api/articles/${slug}`
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify({ article }),
  }
  return fetch(url, options).then((data) => {
    return data.json()
  })
}
