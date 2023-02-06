import { Navigate, useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import { useState, useEffect } from 'react'

function UserSettings({user}) {
  const { urlId } = useParams()
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [lastname, setLastname] = useState('')
  const [password, setPassword] = useState('')
  const [firstname, setFirstname] = useState('')
  const [disabled, setDisabled] = useState(true)

  const onSubmitForm = e => {
    e.preventDefault()
    let data = {
      phone: e.target.phone.value,
      email: e.target.email.value,
      lastname: e.target.lastname.value,
      password: e.target.password.value,
      firstname: e.target.firstname.value
    }
    console.log('data', data)
    /* changeUserData(data)
    .then((res) => {
      if (res.status === 200) {
        setInfo(res.data.message)
        if(imageSelected) {
          const { userIdCreated } = res.data
          const formData = new FormData()
          formData.append("file", imageSelected)
          formData.append('folder', `users/${userIdCreated}/profile`)
          formData.append("upload_preset", "unsigned_upload_preset")
          axios.post(`https://api.cloudinary.com/v1_1/${config.cloudname}/image/upload`, formData)
          .then((response) => {
            const urlUserImage = response.data.secure_url
            const data = {
              urlUserImage: urlUserImage,
              userIdCreated: userIdCreated
            }
            registerUserImage(data)
            .then((res) => {
              if (res.status === 200) console.warn(res.data.message)
              else console.error(res.response.data.message)
            })
            .catch((err) => {
              setError(err)
            })
          })
          .catch((err) => {
            console.error(err)
          })
        }
      }
      else setError(res.response.data.message)
    })
    .catch((err) => {
        console.error(err)
        setError(err)
    }) */
  }

  useEffect(() => {
    if (email !== '' && password !== '' && firstname !== '' && lastname !== '' && phone !== '') {
        setDisabled(false)
    }
    else {
        setDisabled(true)
    }
  }, [email, password, firstname, lastname, phone])

  if(user.info._id !== urlId) return <Navigate to='/' />

  return (
    <section className='min-h-screen dark:bg-slate-900 bg-white flex flex-col space-y-12 px-8'>
      <h1 className='dark:text-white text-3xl'>Changer mes données</h1>
      <form
        method='post'
        action='/user/changeUserData'
        onSubmit={e => onSubmitForm(e)}
      >
        <input
          onChange={e => setFirstname(e.currentTarget.value)}
          type='text'
          name='firstname'
          placeholder='votre prénom'
          className='pl-1 w-full border dark:bg-slate-800 dark:text-white'
        />
        <input
          onChange={(e) => setLastname(e.currentTarget.value)}
          type='text'
          name='lastname'
          placeholder='votre nom'
          className='pl-1 w-full border dark:bg-slate-800 dark:text-white'
        />
        <input
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
          onChange={(e) => {
            setPhone(e.currentTarget.value);
          }}
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
    </section>
  )
}

const mapStateToProps = (store) => {
  return {
    user: store.user
  }
}

export default connect(mapStateToProps)(UserSettings)
