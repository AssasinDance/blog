import { Link } from 'react-router-dom'

export default function NewUser() {
  return (
    <div className="header__account">
      <Link className="header__sign-in" to="/sign-in">
        <h6>Sign In</h6>
      </Link>
      <Link className="header__sign-up" to="/sign-up">
        <h6>Sign Up</h6>
      </Link>
    </div>
  )
}
