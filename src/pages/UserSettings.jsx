import { Navigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { changeUserData } from '../api/user'

import { useSelector } from 'react-redux'
import { selectUser } from '../slices/userSlice'

function UserSettings({handleSearchBarVisibility}) {

  const user = useSelector(selectUser)

  const { urlId } = useParams()
  const [email, setEmail] = useState(user.info.email)
  const [phone, setPhone] = useState(user.info.tel)
  const [info, setInfo] = useState(null)
  const [error, setError] = useState(null)
  const [lastname, setLastname] = useState(user.info.lastname)
  const [password, setPassword] = useState('')
  const [firstname, setFirstname] = useState(user.info.firstname)
  const [disabled, setDisabled] = useState(true)

  const onSubmitForm = e => {
    e.preventDefault()
    let datas = {
      phone: e.target.phone.value,
      email: e.target.email.value,
      lastname: e.target.lastname.value,
      password: e.target.password.value,
      firstname: e.target.firstname.value
    }
    //console.log('data', datas)
    changeUserData(datas, user.info._id)
    .then((res) => {
      if (res.status === 200) setInfo(res.data.message)
      else setError(res.response.data.message)
    })
    .catch((err) => setError(err))
  }

  useEffect(() => {
    if (email !== '' && password !== '' && firstname !== '' && lastname !== '' && phone !== '') {
      setDisabled(false)
    }
    else {
      setDisabled(true)
    }
  }, [email, password, firstname, lastname, phone])

  useEffect(() => {
    handleSearchBarVisibility(false)
  }, [])

  if(user.info._id !== urlId) return <Navigate to='/' />

  return (
    <section className='dark:bg-slate-900 bg-white flex flex-col space-y-12 px-8'>
      <h1 className='dark:text-white text-3xl'>Changer mes données</h1>
      <form
        method='post'
        action='/user/changeUserData'
        onSubmit={e => onSubmitForm(e)}
      >
        <input
          defaultValue={firstname}
          onChange={e => setFirstname(e.currentTarget.value)}
          type='text'
          name='firstname'
          placeholder='votre prénom'
          className='pl-1 w-full border dark:bg-slate-800 dark:text-white'
        />
        <input
          defaultValue={lastname}
          onChange={(e) => setLastname(e.currentTarget.value)}
          type='text'
          name='lastname'
          placeholder='votre nom'
          className='pl-1 w-full border dark:bg-slate-800 dark:text-white'
        />
        <input
          defaultValue={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
          type='text'
          name='email'
          placeholder='votre email'
          className='pl-1 w-full border dark:bg-slate-800 dark:text-white'
        />
        <input
          onChange={(e) => setPassword(e.currentTarget.value)}
          type='password'
          name='password'
          placeholder='votre mot de passe'
          className='w-full border dark:bg-slate-800 dark:text-white'
        />
        <input
          defaultValue={phone}
          onChange={(e) => setPhone(e.currentTarget.value)}
          type='tel'
          name='phone'
          placeholder='votre numero de téléphone'
          className='w-full border dark:bg-slate-800 dark:text-white'
        />
        <button
          disabled={disabled}
          type='submit'
          name='Modifier mes données'
          className={`
            border
            bg-slate-200
            dark:bg-slate-800
            dark:text-yellow-100
          `}
        >
          Modifier mes données
        </button>
      </form>
      {info &&
        <p className='text-green-500'>{info}</p>
      }
      {error &&
        <p className='text-red-500'>{error}</p>
      }
    </section>
  )
}

export default UserSettings
