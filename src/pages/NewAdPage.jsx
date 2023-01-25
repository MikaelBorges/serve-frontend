import { newAd } from '../api/ads'
import { useState, useEffect } from 'react'
import styleOf from './NewAdPage.module.scss'
import { Navigate, useParams } from 'react-router-dom'

function NewAdPage(props) {
  const { id } = useParams()
  const [title, setName] = useState('')
  const [price, setPrice] = useState('')
  const [info, setInfo] = useState(null)
  const [error, setError] = useState(null)
  const [location, setLocation] = useState('')
  const [disabled, setDisabled] = useState(true)
  const [description, setDescription] = useState('')

  useEffect(() => {
    if (title !== '' && description !== '' && price !== '' && location !== '') {
      setDisabled(false)
    } else {
      setDisabled(true)
    }
  }, [title, price, description, location])

  const onSubmitForm = e => {
    e.preventDefault()
    let arrayOfUrlImages
    let filteredArrayOfUrlImages

    if(!e.target.imageAd.value && !e.target.imageAd2.value && !e.target.imageAd3.value) {
      filteredArrayOfUrlImages = []
    }
    else {
      arrayOfUrlImages = [
        e.target.imageAd.value,
        e.target.imageAd2.value,
        e.target.imageAd3.value
      ]
      filteredArrayOfUrlImages = arrayOfUrlImages.filter(img => img !== '')
    }

    const data = {
      userId: props.dataUser._id,
      title: e.target.titre.value,
      price: e.target.price.value,
      starsNb: props.dataUser.starsNb,
      imageAd: e.target.imageAd.value,
      location: e.target.location.value,
      lastname: props.dataUser.lastname,
      imagesAd: filteredArrayOfUrlImages,
      firstname: props.dataUser.firstname,
      superUser: props.dataUser.superUser,
      reviewsNb: props.dataUser.reviewsNb,
      imageUser: props.dataUser.imageUser,
      description: e.target.description.value
    }
    newAd(data)
    .then(res => {
      if(res.status === 200) {
        setInfo(res.data.message)
      }
      else {
        setError(res.response.data.message)
      }
    })
    .catch(err => {
      console.warn('err: rentré dans le catch NewAdPage.jsx')
      console.warn(err)
      setError(err)
    })
  }

  const idOfUserInLS = JSON.parse(window.localStorage.getItem('user'))?._id
  if(!idOfUserInLS || idOfUserInLS !== id) return <Navigate to='/' />

  return (
    <section className='min-h-screen dark:bg-slate-900 bg-white flex flex-col space-y-12 px-8'>
      <form
        method='post'
        onSubmit={e => onSubmitForm(e)}
        action={`/user/${props.dataUser._id}/new`}
      >
        <input
          type='text'
          name='imageAd'
          className={`pl-1 ${styleOf.imageUrl} w-full border dark:bg-slate-800 dark:text-white`}
          placeholder='url de la photo de votre annonce si vous la connaissez (facultatif)'
        />
        <input
          type='text'
          name='imageAd2'
          className={`pl-1 ${styleOf.imageUrl} w-full border dark:bg-slate-800 dark:text-white`}
          placeholder='url de la photo 2 de votre annonce si vous la connaissez (facultatif)'
        />
        <input
          type='text'
          name='imageAd3'
          className={`pl-1 ${styleOf.imageUrl} w-full border dark:bg-slate-800 dark:text-white`}
          placeholder='url de la photo 3 de votre annonce si vous la connaissez (facultatif)'
        />
        <input
          required
          type='text'
          name='titre'
          placeholder='Titre de votre annonce'
          onChange={e => setName(e.currentTarget.value)}
          className='w-full border dark:bg-slate-800 dark:text-white'
        />
        <input
          required
          type='text'
          name='description'
          placeholder='Description de votre annonce'
          onChange={e => setDescription(e.currentTarget.value)}
          className='w-full border dark:bg-slate-800 dark:text-white'
        />
        <input
          required
          type='text'
          name='location'
          placeholder='Lieu de votre prestation'
          onChange={e => setLocation(e.currentTarget.value)}
          className='w-full border dark:bg-slate-800 dark:text-white'
        />
        <input
          required
          name='price'
          type='number'
          placeholder='votre prix par heure'
          onChange={e => setPrice(e.currentTarget.value)}
          className='w-full border dark:bg-slate-800 dark:text-white'
        />
        <button
          type='submit'
          name='Envoyer'
          disabled={disabled}
          className='block border bg-slate-200 dark:bg-slate-800 dark:text-yellow-100'
        >
          Poster mon annonce
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

export default NewAdPage;
