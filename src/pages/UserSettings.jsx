import { Navigate, useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { changeUserData, deleteAccount, logoutUser } from '../api/user'
import { useSelector, useDispatch } from 'react-redux'
import { selectUser, disconnectUser } from '../slices/userSlice'

function UserSettings({handleSearchBarVisibility}) {

  const user = useSelector(selectUser)
  const dispatch = useDispatch()

  const navigate = useNavigate()
  const { urlId } = useParams()
  const [email, setEmail] = useState(user.info.email)
  const [phone, setPhone] = useState(user.info.tel)
  const [info, setInfo] = useState(null)
  const [error, setError] = useState(null)
  const [lastname, setLastname] = useState(user.info.lastname)
  const [password, setPassword] = useState('')
  const [firstname, setFirstname] = useState(user.info.firstname)
  const [disabled, setDisabled] = useState(true)
  const [imageUser, setImageUser] = useState(user.info.imageUser)

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

  const onChangeInputImage = (e) => {
    console.log('e', e)
  }

  const onClickRemovePreviewImage = (e) => {
    e.preventDefault()
    console.log('e', e)
  }

  /* const handleLogout = () => {
    let data = { _id : user.info._id }
    logoutUser(data)
    .then(res => {
      if (res.status === 200) {
        localStorage.removeItem('redux')
        localStorage.removeItem('serve-token')
        dispatch(disconnectUser())
        console.warn('message from api', res.data.message)
        navigate('/')
      }
      else {
        setError(res.msg)
      }
    })
    .catch(err => {
      console.warn('erreur: rentre dans le catch de UserSettings')
      console.warn(err)
      setError(err)
    })
  } */

  /* const handleDeleteAccount = () => {
    deleteAccount(user.info._id)
    .then((res) => {
      if(res.status === 200) {
        console.warn('message from api', res.data.message)
        handleLogout()
      }
      else {
        setError(res.response.data.message)
        console.warn('message from api', res.response.data.message)
      }
    })
    .catch((error) => {
      setError(error)
      console.warn('message from promise', error)
    })
  } */

  return (
    <section className='dark:bg-slate-900 flex flex-col px-3'>
      <h1 className='dark:text-white text-3xl mt-3 mb-6'>Modifier mon compte</h1>
      <form
        method='post'
        action='/user/changeUserData'
        onSubmit={e => onSubmitForm(e)}
        className='sm:flex items-center'>
          <div className='sm:w-1/3 mb-4 sm:mb-0'>
            <div className='flex justify-center mb-3'>
              <label
                htmlFor='file'
                className={`
                  px-2
                  py-1
                  text-xs
                  inline-block
                  rounded-full
                  bg-slate-200
                  cursor-pointer
                  text-slate-500
                `}>
                  {imageUser ? 'Changer ma photo' : 'Ajouter une photo'}
              </label>
              <input
                id='file'
                type='file'
                name='fichier'
                className='hidden'
                onChange={(e) => onChangeInputImage(e)}
              />
            </div>
            {Boolean(imageUser) &&
              <div className='flex flex-col'>
                <div className='mx-auto mb-3 flex justify-center items-center w-2/4 sm:w-auto h-40'>
                  <img
                    src={imageUser}
                    alt='image user'
                    className='aspect-square object-cover rounded-full h-full'
                  />
                </div>
                <button
                  className={`
                    py-1
                    px-2
                    w-fit
                    mx-auto
                    text-xs
                    bg-red-100
                    text-red-600
                    rounded-full
                  `}
                  onClick={(e) => onClickRemovePreviewImage(e)}
                >
                  Supprimer ma photo
                </button>
              </div>
            }
          </div>
          <div className='sm:w-2/3 sm:pl-3'>
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
          </div>
      </form>
      {/* <div className='flex justify-end mt-6'>
        <button
          className={`
            py-1
            px-2
            text-xs
            text-white
            bg-red-600
            rounded-full
          `}
          onClick={(e) => handleDeleteAccount()}
        >
          Supprimer mon compte
        </button>
      </div> */}
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
