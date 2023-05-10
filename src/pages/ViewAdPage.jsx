import { connect } from 'react-redux'
import 'swiper/css'
import 'swiper/css/scrollbar'
//import './swiper-custom.scss'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Navigation, Scrollbar } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useState, useEffect } from 'react'
import { retrieveUserAd } from '../api/ads'
import { useParams } from 'react-router-dom'
import IconMap from '../components/icons/IconMap'
import { moneyIcon, smartphoneIcon, heartIcon } from '../constants/icons'
import { addToFavorites } from '../api/user'
import { updateLikedAdAction } from '../actions/ads/adsActions'
import { logoutUserAction, favoriteAddUserAction } from '../actions/user/userActions'

function ViewAdPage({user, clickedAd, resetClickedAd, handleSearchBarVisibility, updateClickedAd, updateLikedAdAction, favoriteAddUserAction, logoutUserAction}) {
  const { urlId } = useParams()
  const [ad, setAd] = useState({})

  const manageAddToFavorites = () => {
    const token = window.localStorage.getItem('serve-token')
    if(token) {
      if(user.info._id !== ad.userId) {
        addToFavorites(ad._id)
        .then(res => {
          if(res.status === 200) {
            //console.log('ok en bdd')
            updateClickedAd({adId: ad._id, newFavNumber: res.data.newFavNumber})
            //console.log('go to redux action !')
            favoriteAddUserAction(user, ad._id)
            updateLikedAdAction({adId: ad._id, newFavNumber: res.data.newFavNumber})
          }
        })
        .catch(err => console.warn(err))
      }
    }
    else {
      console.log('veuillez vous reconnecter pour utiliser cette fonctionnalité')
      window.localStorage.removeItem('redux')
      logoutUserAction()
      //navigate('/user/login')
    }
  }

  useEffect(() => {
    handleSearchBarVisibility(false)
    retrieveUserAd(urlId)
    .then((res) => {
      setAd(res.adRetrieved)
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

  return(
    <div className='lg:flex'>
      <Swiper className='lg:w-2/3 aspect-square swiper-custom-scrollbar swiper-custom-height' scrollbar={{hide: false}} navigation={true} modules={[Navigation, Scrollbar]}>
        {ad.imagesWork?.map((imageWork, index) =>
          <SwiperSlide
            key={`${ad._id}-${index}`}
            onClick={() => console.warn('display image bigger')}
          >
            <img
              src={imageWork}
              alt='image du service' />
          </SwiperSlide>
        )}
      </Swiper>
      <div className='lg:w-1/3 p-2 dark:text-white'>
        <button
          className={`
            px-2
            py-1
            flex
            items-center
            rounded-full
            bg-gray-100
            dark:bg-slate-600
          `}
          onClick={() => manageAddToFavorites()}
        >
          <div>{heartIcon}</div>
          <div className='ml-1 text-red-600'>
            {ad.favoritesNb}
          </div>
        </button>
        <p className='text-xs'>Annonce mise en ligne le {ad.dateOfPublication}</p>
        <h1 className='text-3xl dark:text-white'>{ad.title}</h1>
        <p className='text-xl text-red-500'>
          <IconMap className='mr-1 relative bottom-0.5 inline' />{ad.location}
        </p>
        <p className='text-2xl text-fuchsia-500 dark:text-yellow-100'>{moneyIcon} {ad.price} €/h</p>
        <p>{ad.description}</p>
        <div className='flex items-center'>
          <p>Contacter {ad.firstname} au :</p>
          <a
            className={`
              ml-2
              px-2
              py-1
              flex
              w-fit
              bg-gray-100
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
    </div>
  )
}

const mapStateToProps = (store) => {
  return {
    user: store.user,
    likedAd: store.likedAd
  }
}

const mapDispatchToProps = {
  logoutUserAction,
  updateLikedAdAction,
  favoriteAddUserAction
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewAdPage)
