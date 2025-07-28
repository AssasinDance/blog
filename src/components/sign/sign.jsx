/* eslint-disable react/jsx-props-no-spreading */
import './sign.scss'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useEffect, useState, useRef } from 'react'

import {
  useLoginUserMutation,
  useRegisterUserMutation,
  useEditUserMutation,
  useCreateArticleMutation,
  useEditArticleMutation,
  useGetArticleQuery,
} from '../../services/api'

export function SignIn({ user, setUser }) {
  const [loginUser, { isLoading }] = useLoginUserMutation()
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm()

  const navigate = useNavigate()

  useEffect(() => {
    if (user) navigate('/')
  }, [navigate, user])

  const handleLoginUser = async (email, password) => {
    await loginUser({ email, password })
      .unwrap()
      .then((response) => {
        setUser(response.user)
        localStorage.setItem('token', response.user.token)
        navigate('/')
      })
      .catch(() => {
        setError('email', { type: 'server', message: 'Email or password is invalid' })
        setError('password', { type: 'server', message: 'Email or password is invalid' })
      })
  }

  const onSubmit = (formData) => {
    const { email, password } = formData

    handleLoginUser(email, password)
  }

  return (
    <div className="content__sign sign">
      <span className="sign__title">Sign In</span>
      <form className="sign__form" onSubmit={!isLoading ? handleSubmit(onSubmit) : undefined} noValidate>
        <label className="sign__label" htmlFor="email">
          Email address
          <input
            className={errors?.email ? 'sign__input sign__input--invalid' : 'sign__input'}
            id="email"
            placeholder="Email address"
            type="email"
            {...register('email', {
              required: 'Must be filled in',
              pattern: {
                value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                message: 'Must be a valid mailing address',
              },
            })}
          />
          <div className="sign__error">{errors?.email && (errors?.email?.message || 'Error!')}</div>
        </label>
        <label className="sign__label" htmlFor="password">
          Password
          <input
            className={errors?.password ? 'sign__input sign__input--invalid' : 'sign__input'}
            id="password"
            placeholder="Password"
            type="password"
            {...register('password', {
              required: 'Must be filled in',
            })}
          />
          <div className="sign__error">{errors?.password && (errors?.password?.message || 'Error!')}</div>
        </label>
        <button className="sign__submit" type="submit">
          Login
        </button>
      </form>
      <span className="sign__other-option">
        Don&apos;t have an account?{' '}
        <Link className="sign__marked" to="/sign-up">
          Sign Up
        </Link>
        .
      </span>
    </div>
  )
}

export function SignUp({ user, setUser }) {
  const [registerUser, { isLoading }] = useRegisterUserMutation()
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    setError,
  } = useForm()
  const navigate = useNavigate()

  useEffect(() => {
    if (user) navigate('/')
  }, [navigate, user])

  const handleRegisterUser = async (username, email, password) => {
    await registerUser({ username, email, password })
      .unwrap()
      .then((response) => {
        setUser(response.user)
        localStorage.setItem('token', response.user.token)
        navigate('/')
      })
      .catch((response) => {
        if (Object.hasOwn(response, 'errors')) {
          if (Object.hasOwn(response.errors, 'email'))
            setError('email', { type: 'server', message: 'Is already taken' })
        }
        if (Object.hasOwn(response, 'errors')) {
          if (Object.hasOwn(response.errors, 'username'))
            setError('username', { type: 'server', message: 'Is already taken' })
        }
      })
  }

  const onSubmit = (data) => {
    const { username, email, password } = data

    handleRegisterUser(username, email, password)
  }

  const passwordValue = watch('password')

  return (
    <div className="content__sign sign">
      <span className="sign__title">Sign Up</span>
      <form
        className="sign__form"
        onSubmit={!isLoading ? handleSubmit((data) => onSubmit(data)) : undefined}
        noValidate
      >
        <label className="sign__label" htmlFor="username">
          Username
          <input
            className={errors?.username ? 'sign__input sign__input--invalid' : 'sign__input'}
            id="username"
            placeholder="Username"
            type="username"
            {...register('username', {
              required: 'Must be filled in',
              minLength: {
                value: 3,
                message: 'Must be more than 2 characters long',
              },
              maxLength: {
                value: 20,
                message: 'Must be less than 21 characters long',
              },
            })}
          />
          <div className="sign__error">{errors?.username && (errors?.username?.message || 'Error!')}</div>
        </label>
        <label className="sign__label" htmlFor="email">
          Email address
          <input
            className={errors?.email ? 'sign__input sign__input--invalid' : 'sign__input'}
            id="email"
            placeholder="Email address"
            type="email"
            {...register('email', {
              required: 'Must be filled in',
              pattern: {
                value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                message: 'Must be a valid mailing address',
              },
            })}
          />
          <div className="sign__error">{errors?.email && (errors?.email?.message || 'Error!')}</div>
        </label>
        <label className="sign__label" htmlFor="password">
          Password
          <input
            className={errors?.password ? 'sign__input sign__input--invalid' : 'sign__input'}
            id="password"
            placeholder="Password"
            type="password"
            {...register('password', {
              required: 'Must be filled in',
              minLength: {
                value: 6,
                message: 'Must be more than 5 characters long',
              },
              maxLength: {
                value: 40,
                message: 'Must be less than 41 characters long',
              },
            })}
          />
          <div className="sign__error">{errors?.password && (errors?.password?.message || 'Error!')}</div>
        </label>
        <label className="sign__label" htmlFor="password-repeat">
          Repeat password
          <input
            className={errors?.repeatPassword ? 'sign__input sign__input--invalid' : 'sign__input'}
            id="password-repeat"
            placeholder="Password"
            type="password"
            {...register('repeatPassword', {
              validate: (value) => {
                return value === passwordValue || 'Passwords must match'
              },
            })}
          />
          <div className="sign__error">{errors?.repeatPassword && (errors?.repeatPassword?.message || 'Error!')}</div>
        </label>
        <label
          className={
            errors?.personal
              ? 'sign__label sign__label--checkbox sign__label--invalid'
              : 'sign__label sign__label--checkbox'
          }
          htmlFor="personal"
        >
          <input
            className={
              errors?.personal
                ? 'sign__input sign__input--checkbox sign__input--invalid'
                : 'sign__input sign__input--checkbox'
            }
            id="personal"
            type="checkbox"
            {...register('personal', {
              required: true,
            })}
          />
          I agree to the processing of my personal information
        </label>
        <button className="sign__submit" type="submit">
          Create
        </button>
      </form>
      <span className="sign__other-option">
        Already have an account?{' '}
        <Link className="sign__marked" to="/sign-in">
          Sign In
        </Link>
        .
      </span>
    </div>
  )
}

export function EditProfile({ user, setUser }) {
  const navigate = useNavigate()
  const [editUser, { isLoading }] = useEditUserMutation()

  useEffect(() => {
    if (!user) navigate('/sign-in')
  }, [navigate, user])

  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
    reset,
  } = useForm()

  const handleEditUser = async (username, email, password, url) => {
    await editUser({ username, email, password, url, token: user.token })
      .unwrap()
      .then((response) => {
        if (Object.hasOwn(response, 'user')) setUser(response.user)
        reset()
      })
      .catch((response) => {
        if (Object.hasOwn(response.data, 'errors')) {
          if (Object.hasOwn(response.data.errors, 'email'))
            setError('email', { type: 'server', message: 'Is already taken' })
        }
        if (Object.hasOwn(response.data, 'errors')) {
          if (Object.hasOwn(response.data.errors, 'username'))
            setError('username', { type: 'server', message: 'Is already taken' })
        }
      })
  }

  const onSubmit = (body) => {
    let { username, email, password, url } = body

    if (!username) username = user.username
    if (!email) email = user.email
    if (!password) password = null
    if (!url) url = user.image || null

    handleEditUser(username, email, password, url, user.token)
  }

  return (
    <div className="content__sign sign">
      <span className="sign__title">Edit Profile</span>
      <form
        className="sign__form"
        onSubmit={!isLoading ? handleSubmit((data) => onSubmit(data)) : undefined}
        noValidate
        autoComplete="off"
      >
        <label className="sign__label" htmlFor="username">
          Username
          <input
            className={errors?.username ? 'sign__input sign__input--invalid' : 'sign__input'}
            id="username"
            placeholder="Username"
            {...register('username')}
          />
          <div className="sign__error">{errors?.username && (errors?.username?.message || 'Error!')}</div>
        </label>
        <label className="sign__label" htmlFor="email">
          Email address
          <input
            className={errors?.email ? 'sign__input sign__input--invalid' : 'sign__input'}
            id="email"
            placeholder="Email address"
            {...register('email', {
              pattern: {
                value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                message: 'Must be a valid mailing address',
              },
            })}
          />
          <div className="sign__error">{errors?.email && (errors?.email?.message || 'Error!')}</div>
        </label>
        <label className="sign__label" htmlFor="password">
          Your or new password
          <input
            className={errors?.password ? 'sign__input sign__input--invalid' : 'sign__input'}
            id="password"
            placeholder="New password"
            type="password"
            {...register('password', {
              required: 'Must be filled in',
              minLength: {
                value: 6,
                message: 'Must be more than 5 characters long',
              },
              maxLength: {
                value: 40,
                message: 'Must be less than 41 characters long',
              },
            })}
          />
          <div className="sign__error">{errors?.password && (errors?.password?.message || 'Error!')}</div>
        </label>
        <label className="sign__label" htmlFor="image">
          Avatar image (url)
          <input
            className={errors?.url ? 'sign__input sign__input--invalid' : 'sign__input'}
            id="image"
            placeholder="Avatar image"
            type="url"
            {...register('url', {
              pattern: {
                value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
                message: 'Must be a valid URL',
              },
            })}
          />
          <div className="sign__error">{errors?.url && (errors?.url?.message || 'Error!')}</div>
        </label>
        <button className="sign__submit" type="submit">
          Save
        </button>
      </form>
    </div>
  )
}

export function NewArticle({ user }) {
  const [createArticle, { isLoading }] = useCreateArticleMutation()
  const {
    register,
    unregister,
    formState: { errors },
    handleSubmit,
  } = useForm()
  const navigate = useNavigate()

  const handleCreateArticle = async (article) => {
    await createArticle({ article, token: user.token })
      .unwrap()
      .then((response) => {
        navigate(`/articles/${response.article.slug}`)
      })
  }

  const onSubmit = (data) => {
    const { title, description, body, ...tagsObject } = data
    const article = { title, description, body }
    const tags = Object.values(tagsObject).filter((tag) => tag)

    article.tagList = tags
    handleCreateArticle(article)
  }

  const [tagsList, setTagsList] = useState([{ value: '', id: 0 }])
  const tagsCounter = useRef(0)

  useEffect(() => {
    if (!user) navigate('/sign-in')
  }, [navigate, user])

  return (
    <div className="content__sign sign sign--article">
      <span className="sign__title">Create new article</span>
      <form
        className="sign__form sign__form--article"
        onSubmit={!isLoading ? handleSubmit((data) => onSubmit(data)) : undefined}
      >
        <label className="sign__label" htmlFor="title">
          Title
          <input
            className={errors?.title ? 'sign__input sign__input--invalid' : 'sign__input'}
            id="title"
            placeholder="Title"
            type="text"
            {...register('title', {
              required: 'Must be filled in',
            })}
          />
          <div className="sign__error">{errors?.title && (errors?.title?.message || 'Error!')}</div>
        </label>
        <label className="sign__label" htmlFor="description">
          Short description
          <input
            className={errors?.description ? 'sign__input sign__input--invalid' : 'sign__input'}
            id="description"
            placeholder="Short description"
            type="text"
            {...register('description', {
              required: 'Must be filled in',
            })}
          />
          <div className="sign__error">{errors?.description && (errors?.description?.message || 'Error!')}</div>
        </label>
        <label className="sign__label" htmlFor="text-body">
          Text
          <textarea
            className={
              errors?.body ? 'sign__input sign__input--tall sign__input--invalid' : 'sign__input sign__input--tall'
            }
            id="text-body"
            placeholder="Text"
            type="text"
            {...register('body', {
              required: 'Must be filled in',
            })}
          />
          <div className="sign__error">{errors?.body && (errors?.body?.message || 'Error!')}</div>
        </label>
        <label className="sign__label" htmlFor="tags">
          Tags
          <div className="sign__inputs-list">
            {tagsList.map((tag, index) => {
              return (
                <div className="sign__tag" key={tag.id}>
                  <input
                    className="sign__input sign__input--short"
                    placeholder="Tag"
                    type="text"
                    value={tag.value}
                    {...register(`tag-${tag.id}`)}
                    onChange={(e) => {
                      const newTagsList = [...tagsList]
                      newTagsList[index] = { value: e.target.value, id: tag.id }
                      setTagsList(newTagsList)
                    }}
                  />
                  <button
                    className={tagsList.length !== 1 ? 'sign__tag-delete' : 'sign__tag-delete sign__tag-delete--hidden'}
                    type="button"
                    onClick={() => {
                      let newTagsList = [...tagsList]
                      newTagsList = [...newTagsList.slice(0, index), ...newTagsList.slice(index + 1)]
                      unregister(`tag-${tag.id}`)
                      setTagsList(newTagsList)
                    }}
                  >
                    Delete
                  </button>
                  <button
                    className={tagsList.length - 1 === index ? 'sign__tag-add' : 'sign__tag-add sign__tag-add--hidden'}
                    type="button"
                    onClick={() => {
                      const newTagsList = [...tagsList]
                      newTagsList.push({ value: '', id: tagsCounter.current + 1 })
                      tagsCounter.current += 1
                      setTagsList(newTagsList)
                    }}
                  >
                    Add tag
                  </button>
                </div>
              )
            })}
          </div>
        </label>
        <button className="sign__submit sign__submit--article" type="submit">
          Send
        </button>
      </form>
    </div>
  )
}

export function EditArticle({ user }) {
  const [editArticle, { isLoading }] = useEditArticleMutation()
  const {
    register,
    unregister,
    formState: { errors },
    handleSubmit,
  } = useForm()
  const navigate = useNavigate()
  const { id } = useParams()
  const { data } = useGetArticleQuery({ slug: id, token: user.token })
  const [article, setArticle] = useState(null)
  const [tagsList, setTagsList] = useState([{ value: '', id: 0 }])
  const tagsCounter = useRef(0)

  const handleEditArticle = async (post) => {
    await editArticle({ article: post, slug: id, token: user.token })
      .unwrap()
      .then((response) => {
        navigate(`/articles/${response.article.slug}`)
      })
  }

  const onSubmit = (formData) => {
    const { title, description, body, ...tagsObject } = formData
    const post = { title, description, body }
    const tags = Object.values(tagsObject).filter((tag) => tag)
    post.tagList = tags

    handleEditArticle(post)
  }

  useEffect(() => {
    if (!user) navigate('/sign-in')
  }, [navigate, user])

  useEffect(() => {
    if (data) {
      setArticle(data.article)

      if (data.article.tagList.length !== 0) {
        const tagListObject = []
        data.article.tagList.forEach((tag, index) => {
          tagListObject.push({ value: tag, id: index })
          tagsCounter.current += 1
        })
        setTagsList(tagListObject)
      }
    }
  }, [data])

  if (!article)
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

  return (
    <div className="content__sign sign sign--article">
      <span className="sign__title">Edit article</span>
      <form
        className="sign__form sign__form--article"
        onSubmit={!isLoading ? handleSubmit((formData) => onSubmit(formData)) : undefined}
      >
        <label className="sign__label" htmlFor="title">
          Title
          <input
            className={errors?.title ? 'sign__input sign__input--invalid' : 'sign__input'}
            id="title"
            placeholder="Title"
            type="text"
            defaultValue={article.title}
            {...register('title', {
              required: 'Must be filled in',
            })}
          />
          <div className="sign__error">{errors?.title && (errors?.title?.message || 'Error!')}</div>
        </label>
        <label className="sign__label" htmlFor="description">
          Short description
          <input
            className={errors?.description ? 'sign__input sign__input--invalid' : 'sign__input'}
            id="description"
            placeholder="Short description"
            type="text"
            defaultValue={article.description}
            {...register('description', {
              required: 'Must be filled in',
            })}
          />
          <div className="sign__error">{errors?.description && (errors?.description?.message || 'Error!')}</div>
        </label>
        <label className="sign__label" htmlFor="text-body">
          Text
          <textarea
            className={
              errors?.body ? 'sign__input sign__input--tall sign__input--invalid' : 'sign__input sign__input--tall'
            }
            id="text-body"
            placeholder="Text"
            type="text"
            defaultValue={article.body}
            {...register('body', {
              required: 'Must be filled in',
            })}
          />
          <div className="sign__error">{errors?.body && (errors?.body?.message || 'Error!')}</div>
        </label>
        <label className="sign__label" htmlFor="tags">
          Tags
          <div className="sign__inputs-list">
            {tagsList.map((tag, index) => {
              return (
                <div className="sign__tag" key={tag.id}>
                  <input
                    className="sign__input sign__input--short"
                    placeholder="Tag"
                    type="text"
                    value={tag.value}
                    {...register(`tag-${tag.id}`)}
                    onChange={(e) => {
                      const newTagsList = [...tagsList]
                      newTagsList[index] = { value: e.target.value, id: tag.id }
                      setTagsList(newTagsList)
                    }}
                  />
                  <button
                    className={tagsList.length !== 1 ? 'sign__tag-delete' : 'sign__tag-delete sign__tag-delete--hidden'}
                    type="button"
                    onClick={() => {
                      let newTagsList = [...tagsList]
                      newTagsList = [...newTagsList.slice(0, index), ...newTagsList.slice(index + 1)]
                      unregister(`tag-${tag.id}`)
                      setTagsList(newTagsList)
                    }}
                  >
                    Delete
                  </button>
                  <button
                    className={tagsList.length - 1 === index ? 'sign__tag-add' : 'sign__tag-add sign__tag-add--hidden'}
                    type="button"
                    onClick={() => {
                      const newTagsList = [...tagsList]
                      newTagsList.push({ value: '', id: tagsCounter.current + 1 })
                      tagsCounter.current += 1
                      setTagsList(newTagsList)
                    }}
                  >
                    Add tag
                  </button>
                </div>
              )
            })}
          </div>
        </label>
        <button className="sign__submit sign__submit--article" type="submit">
          Send
        </button>
      </form>
    </div>
  )
}
