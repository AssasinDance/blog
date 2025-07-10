import { Link } from 'react-router-dom'

import avatar from '../../../assets/avatar.png'

export default function LoggedUser({ setUser, user }) {
  return (
    <div className="header__account">
      <Link className="header__article" to="/new-article">
        Create article
      </Link>
      <Link className="header__profile" to="/profile">
        <h6 header="header__name">{user.username}</h6>
        <img className="header__avatar" src={user.image ? user.image : avatar} alt="avatar" />
      </Link>
      <button
        className="header__log-out"
        type="button"
        onClick={() => {
          localStorage.removeItem('token')
          setUser(null)
        }}
      >
        <h6>Log Out</h6>
      </button>
    </div>
  )
}
