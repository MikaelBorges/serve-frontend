import { newAd } from '../api/ads'
import { useState, useEffect } from 'react'
import styleOf from './NewAdPage.module.scss'
import { useNavigate, Navigate, useParams } from 'react-router-dom'

function NewAdPage(props) {
  const { id } = useParams()
  const [info, setInfo] = useState(null)
  const [error, setError] = useState(null)

  // console.log('props NewAdPage', props)
  // const navigate = useNavigate()

  const [title, setName] = useState('')
  const [price, setPrice] = useState('')
  const [location, setLocation] = useState('')
  const [disabled, setDisabled] = useState(true)
  const [description, setDescription] = useState('')

  useEffect(() => {
    if (title !== '' && description !== '' && price !== '' && location !== '') {
      setDisabled(false)
    } else {
      setDisabled(true)
    }
  }, [title, price, description, location]);

  useEffect(() => {

    /* console.log('props.dataUser', props.dataUser)
    if(Object.keys(props.dataUser).length === 0 && props.dataUser.constructor === Object) {
      console.log('REDIRECTION')
    } else {
      console.log('NE RIEN FAIRE')
    } */

    console.log('composant newAd chargé')
  }, []);

  /* useEffect(() => {
    console.log('newAd useEffect [dataUserInLocalStorage]')
    console.log('(newAd) props.dataUser', props.dataUser)
    console.log('(newAd) props.dataUserInLS', props.dataUserInLS)
    console.log('Object.keys(props.dataUser).length', Object.keys(props.dataUser).length)
    console.log('props.dataUser.constructor', props.dataUser.constructor)
    if(Object.keys(props.dataUser).length === 0 && props.dataUser.constructor === Object) {
      console.log('REDIRECTION')
    }
  }, [props.dataUser]); */

  // [dataUserInLocalStorage, setDataUserInLocalStorage] = useState(false),

  const onSubmitForm = e => {
    e.preventDefault()
    const arrayOfUrlImages = [
            e.target.imageAd.value,
            e.target.imageAd2.value,
            e.target.imageAd3.value
          ],
          elementDifferentOfEmptyString = url => url !== '',
          isAtMinimumOneImage = arrayOfUrlImages.some(elementDifferentOfEmptyString)

    let filteredArrayOfUrlImages = ['https://travauxcasa.com/public/artiza/images/default.png']
    if (isAtMinimumOneImage) filteredArrayOfUrlImages = arrayOfUrlImages.filter(img => img !== '')

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
      // console.log('res Register page', res)
      if(res.status === 200) {
        // console.log('res', res)
        setInfo(res.data.message)
      }
      else {
        console.log('RES :')
        console.log(res)
        console.log('RES.RESPONSE.DATA.MESSAGE :')
        console.log(res.response.data.message)
        setError(res.response.data.message)
      }
    })
    .catch(err => {
      console.log('err: rentré dans le catch NewAdPage.jsx')
      console.log(err)
      setError(err)
    })
  }

  //if(!props.dataUser._id || props.dataUser._id !== id) return <Navigate to='/' />
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
