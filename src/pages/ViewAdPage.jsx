import 'swiper/css'
import 'swiper/css/scrollbar'
//import './swiper-custom.scss'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Navigation, Scrollbar } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useState, useEffect } from 'react'
import { retrieveUserAd } from '../api/ads'
import { useParams, Link } from 'react-router-dom'
import IconMap from '../components/icons/IconMap'
import { moneyIcon, smartphoneIcon, heartIcon } from '../constants/icons'
import { addToFavorites } from '../api/user'
import defaultProfile from '../assets/images/defaultProfile/default-m-818bf2b20d4b06a052dd..svg'

import { useSelector, useDispatch } from 'react-redux'
import { selectUser, addToFavoritesUser, deleteToFavoritesUser, disconnectUser } from '../slices/userSlice'
import { lastActionWithLikesAds } from '../slices/adsSlice'

function ViewAdPage({
  clickedAd,
  resetClickedAd,
  handleSearchBarVisibility,
  updateClickedAd
}) {

  const dispatch = useDispatch()
  const user = useSelector(selectUser)
  
  const { urlId } = useParams()
  const [ad, setAd] = useState({})

  const manageAddToFavorites = () => {
    const token = window.localStorage.getItem('serve-token')
    if(token) {
      if(user.info._id !== ad.userId) {
        addToFavorites(ad._id)
        .then(res => {
          if(res.status === 200) {
            updateClickedAd({adId: ad._id, newFavNumber: res.data.newFavNumber})

            const index = user.info.favorites.indexOf(ad._id)
            if (index > -1) {
              const favoriteArrayWithoutAd = user.info.favorites.filter((adFav) => adFav !== ad._id)
              dispatch(deleteToFavoritesUser(favoriteArrayWithoutAd))
            }
            else {
              dispatch(addToFavoritesUser(ad._id))
            }
            dispatch(lastActionWithLikesAds({adId: ad._id, newFavNumber: res.data.newFavNumber}))
          }
        })
        .catch(err => console.warn(err))
      }
    }
    else {
      console.log('veuillez vous reconnecter pour utiliser cette fonctionnalité')
      window.localStorage.removeItem('redux')
      dispatch(disconnectUser())
      //navigate('/user/login')
    }
  }

  useEffect(() => {
    handleSearchBarVisibility(false)
    retrieveUserAd(urlId)
    .then((res) => {
      setAd(res.adRetrieved)
      //console.log('ad', res.adRetrieved)
    })
  }, [])

  useEffect(() => {
    if(Object.keys(clickedAd).length > 0) {
      const adLiked = {...ad}
      adLiked.favoritesNb = clickedAd.newFavNumber
      setAd(adLiked)
      resetClickedAd()
    }
  }, [clickedAd])

  return (
    <div className='lg:flex'>
      {Boolean(ad?.imagesWork?.length) &&
      <Swiper className='max-h-screen lg:w-2/3 aspect-square swiper-custom-view-ad-page swiper-custom-height' scrollbar={{hide: false}} navigation={true} modules={[Navigation, Scrollbar]}>
        {ad.imagesWork?.map((imageWork, index) =>
          <SwiperSlide key={`${ad._id}-${index}`}>
            <img
              src={imageWork}
              alt='image du service'
              onClick={() => console.warn('display image bigger')}
            />
          </SwiperSlide>
        )}
      </Swiper>
      }
      <div className='lg:w-1/3 p-3 dark:text-white'>

        <div className='flex justify-between items-end'>
          <Link
            className='w-10 flex justify-center items-center rounded-full'
            to={`/user/${ad.userId}`}>
            <img
              src={ad.imageUser ? ad.imageUser : defaultProfile}
              alt='image utilisateur'
              className='rounded-full aspect-square object-cover'
            />
          </Link>
          <button
            className={`
              px-3
              py-1.5
              flex
              z-10
              text-xl
              items-center
              rounded-full
              bg-slate-200
              dark:bg-slate-600
            `}
            onClick={() => manageAddToFavorites()}
          >
            <div>{heartIcon}</div>
            <div className='ml-1 text-red-600'>
              {ad.favoritesNb}
            </div>
          </button>
        </div>

        <p className='text-xs mt-2 mb-1'>Annonce mise en ligne le {ad.dateOfPublication}</p>
        <h1 className='text-3xl dark:text-white'>{ad.title}</h1>
        <p className='text-xl text-red-500'>
          <IconMap className='mr-1 relative bottom-0.5 inline' />{ad.location}
        </p>
        <p className='text-2xl text-fuchsia-500 dark:text-yellow-100'>{moneyIcon} {ad.price} €/h</p>
        <p className='my-5'>{ad.description}</p>
        <p>Contacter {ad.firstname} au :</p>
        <a
          className={`
            px-2
            py-1
            flex
            w-fit
            bg-slate-200
            items-center
            rounded-full
            dark:bg-slate-600
          `}
          href={`tel:${ad.tel}`}
        >
          <div>{smartphoneIcon}</div>
          <div className='ml-1'>
            {ad.tel}
          </div>
        </a>
      </div>
    </div>
  )
}

export default ViewAdPage
