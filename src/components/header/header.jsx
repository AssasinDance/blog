import './header.scss'
import { Outlet, Link } from 'react-router-dom'

import NewUser from './new-user/new-user'
import LoggedUser from './logged-user/logged-user'

export default function Header({ user, setUser }) {
  return (
    <>
      <header className="header">
        <Link className="header__title" to="/">
          <h6>DkDence Blog</h6>
        </Link>
        {user ? <LoggedUser setUser={setUser} user={user} /> : <NewUser />}
      </header>
      <Outlet />
    </>
  )
}
