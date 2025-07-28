import './App.scss'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

import Header from './components/header/header'
import Postslist from './pages/Postslist'
import NotFoundPage from './pages/Notfoundpage'
import Post from './pages/Post'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Profile from './pages/Profile'
import NewPost from './pages/NewPost'
import EditPost from './pages/EditPost'
import { useGetUserQuery } from './services/api'

function App() {
  const token = localStorage.getItem('token')
  const { data, isError } = useGetUserQuery(token)
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    if (data && token) {
      setIsLoading(false)
      setUser(data.user)
    }

    if (isError) {
      setIsLoading(false)
    }
  }, [data, isError, token])

  if (!isLoading)
    return (
      <Routes>
        <Route path="/" element={<Header user={user} setUser={setUser} />}>
          <Route index element={<Postslist currentPage={currentPage} setCurrentPage={setCurrentPage} user={user} />} />
          <Route path="articles" element={<Navigate to="/" replace />} />
          <Route path="articles/:id" element={<Post user={user} />} />
          <Route path="sign-in" element={<SignIn user={user} setUser={setUser} />} />
          <Route path="sign-up" element={<SignUp user={user} setUser={setUser} />} />
          <Route path="profile" element={<Profile user={user} setUser={setUser} />} />
          <Route path="new-article" element={<NewPost user={user} />} />
          <Route path="articles/:id/edit" element={<EditPost user={user} />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    )
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

export default App
