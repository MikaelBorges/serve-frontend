import axios from 'axios'
import { config } from '../config'
import { connect } from 'react-redux'
import { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import IconCross from '../components/icons/IconCross'
import { registerUser, registerUserImage } from '../api/user'

function RegisterPage({user}) {
  const [img, setImg] = useState(null)
  const [msg, setMsg] = useState(null)
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [info, setInfo] = useState(null)
  const [error, setError] = useState(null)
  const [lastname, setLastname] = useState('')
  const [password, setPassword] = useState('')
  const [firstname, setFirstname] = useState('')
  const [disabled, setDisabled] = useState(true)

  const [imageSelected, setImageSelected] = useState(null)

  const onSubmitForm = e => {
    e.preventDefault()
    let data = {
      phone: e.target.phone.value,
      email: e.target.email.value,
      lastname: e.target.lastname.value,
      password: e.target.password.value,
      firstname: e.target.firstname.value
    }
    registerUser(data)
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
    })
  }

  const onClickRemovePreviewImage = (e) => {
    //const element = Number(e.target.parentElement.dataset.key)
    //if(element) setImagesSelected(imagesSelected.filter(item => imagesSelected.indexOf(item) !== element))
    setImageSelected(null)
  }

  useEffect(() => {
    if (email !== '' && password !== '' && firstname !== '' && lastname !== '' && phone !== '') {
        setDisabled(false)
    }
    else {
        setDisabled(true)
    }
  }, [email, password, firstname, lastname, phone])

  if(user.isLogged) return <Navigate to='/' />

  return (
    <section
      className={`
        px-8
        flex
        flex-col
        bg-white
        space-y-12
        dark:bg-slate-900
      `}
    >
      <h1 className='dark:text-white text-3xl'>Créer un compte</h1>
      <form
        method='post'
        action='/user/register'
        onSubmit={e => onSubmitForm(e)}
      >
        <input
          type='file'
          className='dark:text-slate-900 text-white max-w-full'
          onChange={(e) => setImageSelected(e.target.files[0])}
        />
        {Boolean(imageSelected) &&
          <div className='relative p-1 my-3 w-1/3'>
            <img
              alt='preview image'
              src={URL.createObjectURL(imageSelected)}
              className='aspect-square object-cover rounded-2xl'
            />
            <IconCross
              className={`
                h-6
                w-6
                p-1
                top-0
                right-0
                absolute
                text-white
                bg-red-600
                rounded-full
                cursor-pointer
              `}
              onClick={(e) => onClickRemovePreviewImage(e)}
            />
          </div>
        }
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
          name='Créer mon compte'
          className={`
            border
            bg-slate-200
            dark:bg-slate-800
            dark:text-yellow-100
          `}
        >
          Créer mon compte
        </button>
      </form>
      {info &&
        <p className='text-green-500'>{info}</p>
      }
      {error &&
        <p className='text-red-500'>{error}</p>
      }
    </section>
  );
}

const mapStateToProps = (store, ownProps) => {
  return {
    user: store.user
  }
}

export default connect(mapStateToProps)(RegisterPage)
