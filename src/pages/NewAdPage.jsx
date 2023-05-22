import axios from 'axios'
import { config } from '../config'
import { useState, useEffect } from 'react'
import { newAd, registerAdImages } from '../api/ads'
import IconCross from '../components/icons/IconCross'
import { Navigate, useParams } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'
import { selectUser, addToAdsOfUser, incrementAdsImagesUser, decrementAdsImagesUser  } from '../slices/userSlice'

function NewAdPage({handleSearchBarVisibility}) {

  const dispatch = useDispatch()
  const user = useSelector(selectUser)

  const { urlId } = useParams()
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [info, setInfo] = useState(null)
  const [error, setError] = useState(null)
  const [location, setLocation] = useState('')
  const [disabled, setDisabled] = useState(true)
  const [description, setDescription] = useState('')

  const [newImagesSelected, setNewImagesSelected] = useState([])

  const onSubmitForm = async (e) => {
    e.preventDefault()

    const priceConvertedToNumber = parseInt(e.target.price.value)

    const data = {
      tel: user.info.tel,
      userId: user.info._id,
      starsNb: user.info.starsNb,
      title: e.target.titre.value,
      lastname: user.info.lastname,
      price: priceConvertedToNumber,
      firstname: user.info.firstname,
      superUser: user.info.superUser,
      reviewsNb: user.info.reviewsNb,
      imageUser: user.info.imageUser,
      location: e.target.location.value,
      description: e.target.description.value,
      adHaveImages: Boolean(e.target.fichiers.files.length)
    }

    newAd(data)
    .then(async (res) => {
      if(res.status === 200) {
        setInfo(res.data.message)
        dispatch(addToAdsOfUser(res.data.adIdCreated))
        if(newImagesSelected.length) {
          dispatch(incrementAdsImagesUser())
          const adIdCreated = res.data.adIdCreated
          if(adIdCreated) console.warn('adIdCreated a bien été créé', adIdCreated)
          const urlsAdImages = []
          for(let newImageSelected of newImagesSelected) {
            const formData = new FormData()
            formData.append("file", newImageSelected)
            formData.append('folder', `users/${user.info._id}/ads/${adIdCreated}`)
            formData.append("upload_preset", "unsigned_upload_preset")
            const response = await axios.post(`https://api.cloudinary.com/v1_1/${config.cloudname}/image/upload`, formData)
            urlsAdImages.push(response.data.secure_url)
          }
          const datas = {
            adIdCreated,
            urlsAdImages
          }
          await registerAdImages(datas)
        }
      }
      else {
        setError(res.response.data.message)
      }
    })
    .catch(err => {
      setError(err)
    })
  }

  const onChangeInputImages = (e) => {
    const filesArray = Object.values(e.target.files)
    setNewImagesSelected(filesArray)
  }

  console.log('newImagesSelected', newImagesSelected)

  const onClickRemovePreviewImage = (image) => {
    setNewImagesSelected(newImagesSelected.filter(item => item.name !== image.name && item.lastModified !== image.lastModified))
  }

  useEffect(() => {
    if (title !== '' && description !== '' && price !== '' && location !== '') {
      setDisabled(false)
    } else {
      setDisabled(true)
    }
  }, [title, price, description, location])

  useEffect(() => {
    handleSearchBarVisibility(false)
  }, [])

  if(user.info._id !== urlId) return <Navigate to='/' />

  return (
    <section className='dark:bg-slate-900 bg-white flex flex-col px-3'>
      <h1 className='dark:text-white text-3xl mt-3 mb-6'>Nouvelle annonce</h1>
      <form
        method='post'
        onSubmit={e => onSubmitForm(e)}
        action={`/user/${user.info._id}/new`}
      >
        <input
          type='file'
          name='fichiers'
          multiple='multiple'
          onChange={(e) => onChangeInputImages(e)}
          className='text-white dark:text-slate-900 max-w-full'
        />
        {Boolean(newImagesSelected.length) &&
        <div className='grid gap-3 grid-cols-3 my-3'>
        {newImagesSelected.map((image, index) =>
        <div key={index} data-key={index} className='relative p-1'>
          <img
            alt='preview image'
            src={URL.createObjectURL(image)}
            className='aspect-square object-cover rounded-2xl' />
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
            onClick={() => onClickRemovePreviewImage(image)} />
        </div>
        )}
        </div>
        }
        <input
          required
          type='text'
          name='titre'
          placeholder='Titre de votre annonce'
          onChange={e => setTitle(e.currentTarget.value)}
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

export default NewAdPage
