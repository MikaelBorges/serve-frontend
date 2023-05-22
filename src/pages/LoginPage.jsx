import { loginUser } from '../api/user'
import { useState, useEffect } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'
import { selectUser, connectUser } from '../slices/userSlice'

function LoginPage({handleSearchBarVisibility}) {

  //on prépare la fonctionnalité pour dispatcher notre action dans le store
  const dispatch = useDispatch()
  const user = useSelector(selectUser)

  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [error, setError] = useState(null)
  const [password, setPassword] = useState('')
  const [disabled, setDisabled] = useState(true)

  const onSubmitForm = e => {
    e.preventDefault()

    let data = {
      email: e.target.email.value,
      password: e.target.password.value,
    }

    loginUser(data)
    .then(res => {
      if(res.status === 200) {
        window.localStorage.setItem('serve-token', res.data.token)

        /* console.log('res.data.token', res.data.token)
        console.log('res.data.session.user', res.data.session.user) */

        //console.log('res', res)

        dispatch(connectUser(res.data.session.user))

        navigate('/')
      }
      else {
        setError(res.response.data.message)
      }
    })
    .catch(err => {
      console.warn('err: rentré dans le catch LoginPage.jsx')
      console.warn(err)
      setError(err)
    })
  }

  useEffect(() => {
    if(email !== '' && password !== '') {
      setDisabled(false)
    }
    else {
      setDisabled(true)
    }
  }, [email, password])

  useEffect(() => {
    handleSearchBarVisibility(false)
  }, [])

  if(user.isLogged) return <Navigate to='/' />

  return (
    <section
      className={`
        px-3
        flex
        flex-col
        bg-white
        dark:bg-slate-900
      `}
    >
      <h1 className='dark:text-white text-3xl mt-3 mb-6'>Se connecter</h1>
      <form
        method='post'
        action='/user/login'
        onSubmit={e => onSubmitForm(e)}
      >
        <input
          onChange={e => setEmail(e.currentTarget.value)}
          type='text'
          name='email'
          placeholder='votre email'
          className={`
            w-full
            border
            dark:bg-slate-800
            dark:text-white
          `}
        />
        <input
          onChange={e => setPassword(e.currentTarget.value)}
          type='password'
          name='password'
          placeholder='votre mot de passe'
          className={`
            w-full
            border
            dark:bg-slate-800
            dark:text-white
          `}
        />
        <button
          type='submit'
          disabled={disabled}
          name='Se connecter'
          className={`
            border
            bg-slate-200
            dark:bg-slate-800
            dark:text-yellow-100
          `}
        >
          Se connecter
        </button>
      </form>
      {error &&
        <p className='text-red-500'>{error}</p>
      }
    </section>
  )
}

export default LoginPage
