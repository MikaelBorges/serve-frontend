import { loginUser } from '../api/user'
import { useState, useEffect } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'

import { connect } from 'react-redux'
import { loginUserAction } from '../actions/user/userActions'

function LoginPage(props) {

  const navigate = useNavigate(),
        [email, setEmail] = useState(''),
        [error, setError] = useState(null),
        [password, setPassword] = useState(''),
        [disabled, setDisabled] = useState(true),

        onSubmitForm = e => {
          e.preventDefault()
          /* console.log('EMAIL ENTRé')
          console.log(e.target.email.value)
          console.log('MDP ENTRé')
          console.log(e.target.password.value) */

          let data = {
            email: e.target.email.value,
            password: e.target.password.value,
          }

          loginUser(data)
          .then(res => {
            if(res.status === 200) {
              console.warn('res >', res)
              window.localStorage.setItem('serve-token', res.data.token)
              window.localStorage.setItem('user', JSON.stringify(res.data.session.user))

              props.loginUserAction(res.data.session.user)
              props.updateUser(res.data.session.user)
              navigate('/')
            }
            else {
              console.log('RES (LOGIN PAGE) :')
              console.log(res)
              console.log('RES.RESPONSE.DATA.MESSAGE (LOGIN PAGE) :')
              console.log(res.response.data.message)
              setError(res.response.data.message)
            }
          })
          .catch(err => {
              console.log('err: rentré dans le catch LoginPage.jsx')
              console.log(err)
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
  }, [email, password]);

  //if(props.userInfo.isLogged) {
  if(props.dataUser._id) {
    console.warn('redirection vers la home')
    return <Navigate to='/' />
  }

  return (
    <section
      className={`
        px-8
        flex
        flex-col
        bg-white
        space-y-12
        min-h-screen
        dark:bg-slate-900
      `}
    >
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

const mapStateToProps = (store, ownProps) => {
  console.log('(LOGIN PAGE) store', store)
  return {
    userInfo: store.user,
    allAds: store.ads.fetchedAds
  }
}

const mapDispatchToProps = {
  loginUserAction
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
//export default LoginPage
