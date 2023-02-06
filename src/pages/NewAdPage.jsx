import axios from 'axios'
import { config } from '../config'
import { connect } from 'react-redux'
import { useState, useEffect } from 'react'
import { newAd, registerAdImages } from '../api/ads'
import IconCross from '../components/icons/IconCross'
import { Navigate, useParams } from 'react-router-dom'
import { addAdsOfUserAction, updateAdsWithImages } from '../actions/user/userActions'

function NewAdPage({user, addAdsOfUserAction, updateAdsWithImages}) {
  const { urlId } = useParams()
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [info, setInfo] = useState(null)
  const [error, setError] = useState(null)
  const [location, setLocation] = useState('')
  const [disabled, setDisabled] = useState(true)
  const [description, setDescription] = useState('')

  const [imagesSelected, setImagesSelected] = useState([])

  const onSubmitForm = e => {
    e.preventDefault()

    const priceConvertedToNumber = parseInt(e.target.price.value)

    const data = {
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
    .then(res => {
      if(res.status === 200) {
        setInfo(res.data.message)
        addAdsOfUserAction(user, res.data.adIdCreated)
        if(imagesSelected.length) {
          updateAdsWithImages(user, Number(user.info.adsWithImages) + 1)
          const adIdCreated = res.data.adIdCreated
          if(adIdCreated) console.warn('adIdCreated a bien été créé', adIdCreated)
          let urlsAdImages = []
          imagesSelected.forEach((imageSelected, index) => {
            const formData = new FormData()
            formData.append("file", imageSelected)
            formData.append('folder', `users/${user.info._id}/ads/${adIdCreated}`)
            formData.append("upload_preset", "unsigned_upload_preset")
            axios.post(`https://api.cloudinary.com/v1_1/${config.cloudname}/image/upload`, formData)
            .then((response) => {
              //console.log('response.data.secure_url', response.data.secure_url)
              urlsAdImages.push(response.data.secure_url)
              //console.log('index', index)
              if (!index) {
                //console.log('urlsAdImages', urlsAdImages)
                //console.log('urlsAdImages[0]', urlsAdImages[0])
                //console.log('urlsAdImages[1]', urlsAdImages[1])
                //console.log('urlsAdImages[2]', urlsAdImages[2])
                const datas = {
                  adIdCreated: adIdCreated,
                  urlsAdImages: urlsAdImages
                }
                registerAdImages(datas)
                .then((res) => {
                  if (res.status === 200) {
                    console.warn(res.data.message)
                  }
                  else {
                    console.error(res.response.data.message)
                  }
                })
                .catch((err) => {
                  console.error(err)
                  setError(err)
                })
              }
            })
            .catch((err) => {
              console.error(err)
            })
          })
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
    setImagesSelected(filesArray)
  }

  const onClickRemovePreviewImage = (e) => {
    const element = Number(e.target.parentElement.dataset.key)
    if(element >= 0) setImagesSelected(imagesSelected.filter(item => imagesSelected.indexOf(item) !== element))
  }

  useEffect(() => {
    if (title !== '' && description !== '' && price !== '' && location !== '') {
      setDisabled(false)
    } else {
      setDisabled(true)
    }
  }, [title, price, description, location])

  if(user.info._id !== urlId) return <Navigate to='/' />

  return (
    <section className='min-h-screen dark:bg-slate-900 bg-white flex flex-col space-y-12 px-8'>
      <h1 className='dark:text-white text-3xl'>Nouvelle annonce</h1>
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
        {Boolean(imagesSelected.length) &&
        <div className='grid gap-3 grid-cols-3 my-3'>
        {imagesSelected.map((image, index) =>
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
            onClick={(e) => onClickRemovePreviewImage(e)} />
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

const mapStateToProps = (store, ownProps) => {
  return {
    user: store.user
  }
}

const mapDispatchToProps = {
  addAdsOfUserAction,
  updateAdsWithImages
}

export default connect(mapStateToProps, mapDispatchToProps)(NewAdPage)
