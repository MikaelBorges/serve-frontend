import axios from 'axios'
import { config } from '../config'
import { connect } from 'react-redux'
import { useState, useEffect } from 'react'
import IconCross from '../components/icons/IconCross'
import { Navigate, useParams } from 'react-router-dom'
import { modifyAd, retrieveUserAd, deleteCloudinaryImages } from '../api/ads'

import { decrementAdsWithImagesOfUser, incrementAdsWithImagesOfUser } from '../actions/user/userActions'

function ModifyAdPage({user, decrementAdsWithImagesOfUser, incrementAdsWithImagesOfUser}) {
  const { urlId } = useParams()
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [info, setInfo] = useState(null)
  const [error, setError] = useState(null)
  const [location, setLocation] = useState('')
  const [disabled, setDisabled] = useState(false)
  const [description, setDescription] = useState('')

  const [newImagesSelected, setNewImagesSelected] = useState([])
  const [imagesWork, setImagesWork] = useState([])
  const [adHadImages, setAdHadImages] = useState(null)
  const [retrievedAd, setRetrievedAd] = useState({})

  const onClickRemovePreviewImage = (e) => {
    const element = Number(e.target.parentElement.dataset.key)
    if(element >= 0) setNewImagesSelected(newImagesSelected.filter(item => newImagesSelected.indexOf(item) !== element))
  }

  const onClickRemovePreviewImageRetrieved = (e) => {
    const element = Number(e.target.parentElement.dataset.key)
    if(element >= 0) setImagesWork(imagesWork.filter(item => imagesWork.indexOf(item) !== element))
  }

  const onChangeInputImages = (e) => {
    const filesArray = Object.values(e.target.files)
    setNewImagesSelected(filesArray)
  }

  const onSubmitForm = async (e) => {
    e.preventDefault()

    let adHaveImages = null
    let urlsAdImages = []
    console.log('adHadImages', adHadImages)
    console.log('newImagesSelected', newImagesSelected)
    console.log('imagesWork', imagesWork)

    if(Object.keys(newImagesSelected).length) {
      console.warn('prendre les nouvelles images')
      adHaveImages = true

      if(adHaveImages !== adHadImages) {
        if(adHaveImages) incrementAdsWithImagesOfUser()
        else decrementAdsWithImagesOfUser()
      }

      // Supprimer les images
      if(adHadImages) {
        const datas = {
          adId: urlId,
          userId: user.info._id,
          checkEmptyFolder: false
        }
        deleteCloudinaryImages(datas)
        .then(res => {
          if(res.status === 200) {
            console.log("tout s'est bien passé, vérifier sur cloudinary")
          }
          else console.error(res.data.message)
        })
        .catch(err => console.error(err))
      }

      newImagesSelected.forEach((imageSelected, index) => {
        const formData = new FormData()
        formData.append("file", imageSelected)
        formData.append('folder', `users/${user.info._id}/ads/${urlId}`)
        formData.append("upload_preset", "unsigned_upload_preset")
        axios.post(`https://api.cloudinary.com/v1_1/${config.cloudname}/image/upload`, formData)
        .then((response) => {
          urlsAdImages.push(response.data.secure_url)
          console.log('urlsAdImages', urlsAdImages)
          if (!index) {
            const priceConvertedToNumber = parseInt(e.target.price.value)
            const datas = {
              adId: urlId,
              userId: user.info._id,
              urlsAdImages: urlsAdImages,
              adHaveImages: adHaveImages,
              title: e.target.titre.value,
              price: priceConvertedToNumber,
              location: e.target.location.value,
              description: e.target.description.value
            }
            console.log('datas', datas)
            modifyAd(datas)
            .then((res) => {
              if (res.status === 200) {
                setInfo(res.data.message)
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
    else if(imagesWork.length) {

      console.warn('prendre les anciennes images')
      adHaveImages = true
      console.log('adHaveImages', adHaveImages)

      if(adHaveImages !== adHadImages) {
        if(adHaveImages) incrementAdsWithImagesOfUser()
        else decrementAdsWithImagesOfUser()
      }

      const priceConvertedToNumber = parseInt(e.target.price.value)

      const datas = {
        adId: urlId,
        userId: user.info._id,
        urlsAdImages: imagesWork,
        adHaveImages: adHaveImages,
        title: e.target.titre.value,
        price: priceConvertedToNumber,
        location: e.target.location.value,
        description: e.target.description.value,

        compareIfSomeImagesMustBeDeleted: true
      }
      console.log('datas', datas)
      modifyAd(datas)
      .then((res) => {
        if (res.status === 200) {
          setInfo(res.data.message)
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
    else {
      console.warn('vider les images')
      adHaveImages = false
      console.log('adHaveImages', adHaveImages)

      if(adHaveImages !== adHadImages) {
        if(adHaveImages) incrementAdsWithImagesOfUser()
        else decrementAdsWithImagesOfUser()
      }


      if(adHadImages) {
        const datas = {
          adId: urlId,
          userId: user.info._id,
          checkEmptyFolder: true
        }
        deleteCloudinaryImages(datas)
        .then(res => {
          if(res.status === 200) {
            console.log("tout s'est bien passé, vérifier sur cloudinary")
            const priceConvertedToNumber = parseInt(e.target.price.value)
            const datas = {
              adId: urlId,
              userId: user.info._id,
              urlsAdImages: urlsAdImages,
              adHaveImages: adHaveImages,
              title: e.target.titre.value,
              price: priceConvertedToNumber,
              location: e.target.location.value,
              description: e.target.description.value
            }
            console.log('datas', datas)
            modifyAd(datas)
            .then((res) => {
              if (res.status === 200) {
                setInfo(res.data.message)
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
        .catch(err => console.error(err))
      }
      else {
        const priceConvertedToNumber = parseInt(e.target.price.value)
        const datas = {
          adId: urlId,
          userId: user.info._id,
          urlsAdImages: urlsAdImages,
          adHaveImages: adHaveImages,
          title: e.target.titre.value,
          price: priceConvertedToNumber,
          location: e.target.location.value,
          description: e.target.description.value
        }
        console.log('datas', datas)
        modifyAd(datas)
        .then((res) => {
          if (res.status === 200) {
            setInfo(res.data.message)
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
    }


    // Si rien n'a été touché, ne pas intéragir avec cloudinary.

    // Si le bloc blanc a été touché, supprimer certaines images dans cloudinary,
    // puis envoyer les nouvelles images vers cloudinary.

    // Si le bloc rouge a été touché, supprimer toutes les images dans cloudinary,
    // et envoyer les nouvelles.

    // Si tout a été vidé, faire juste une suppression des images sur cloudinary.



    // Récupérer les adresses des images
    // Envoyer les textes vers la bdd (avec les adresses des images)
  }

  useEffect(() => {
    console.log('newImagesSelected', newImagesSelected)
    if(newImagesSelected.length) {
      setImagesWork([])
    }
  }, [newImagesSelected])

  useEffect(() => {
    console.log("récupération des images et des textes de l'annonce")
    retrieveUserAd(urlId)
    .then((res) => {
      const ad = res.adRetrieved
      console.log('ad', ad)
      console.log('imagesWork', ad.imagesWork)
      if(ad.imagesWork.length) setAdHadImages(true)
      else setAdHadImages(false)
      setRetrievedAd(ad)
      setImagesWork(ad.imagesWork)
      setTitle(ad.title)
      setDescription(ad.description)
      setPrice(ad.price)
      setLocation(ad.location)
    })
  }, [])

  useEffect(() => {
    if (title !== '' && description !== '' && price !== '' && location !== '') {
      setDisabled(false)
    } else {
      setDisabled(true)
    }
  }, [title, price, description, location])

  if(!user.isLogged || !user.info.ads.includes(urlId)) return <Navigate to='/' />

  return (
    <section className='dark:bg-slate-900 bg-white flex flex-col space-y-12 px-8'>
      <form
        method='post'
        onSubmit={e => onSubmitForm(e)}
        action={`/ad/${urlId}/edit`}
      >
        <h1 className='dark:text-white text-3xl'>Modifier mon annonce</h1>
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
            onClick={(e) => onClickRemovePreviewImage(e)} />
        </div>
        )}
        </div>
        }
        {Boolean(imagesWork?.length) &&
        <div className='grid gap-3 grid-cols-3 my-3'>
        {imagesWork.map((image, index) =>
        <div key={index} data-key={index} className='relative p-1'>
          <img
            src={image}
            alt='preview image'
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
            onClick={(e) => onClickRemovePreviewImageRetrieved(e)} />
        </div>
        )}
        </div>
        }
        <input
          required
          type='text'
          name='titre'
          defaultValue={title}
          placeholder='Titre de votre annonce'
          onChange={e => setTitle(e.currentTarget.value)}
          className='w-full border dark:bg-slate-800 dark:text-white'
        />
        <input
          required
          type='text'
          name='description'
          defaultValue={description}
          placeholder='Description de votre annonce'
          onChange={e => setDescription(e.currentTarget.value)}
          className='w-full border dark:bg-slate-800 dark:text-white'
        />
        <input
          required
          type='text'
          name='location'
          defaultValue={location}
          placeholder='Lieu de votre prestation'
          onChange={e => setLocation(e.currentTarget.value)}
          className='w-full border dark:bg-slate-800 dark:text-white'
        />
        <input
          required
          name='price'
          type='number'
          placeholder='votre prix par heure'
          defaultValue={price}
          onChange={e => setPrice(e.currentTarget.value)}
          className='w-full border dark:bg-slate-800 dark:text-white'
        />
        <button
          type='submit'
          name='Envoyer'
          disabled={disabled}
          className='block border bg-slate-200 dark:bg-slate-800 dark:text-yellow-100'
        >
          Modifier mon annonce
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
  incrementAdsWithImagesOfUser,
  decrementAdsWithImagesOfUser
}

export default connect(mapStateToProps, mapDispatchToProps)(ModifyAdPage)
