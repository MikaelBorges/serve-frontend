import {
  binIcon,
  pinIcon,
  eyeIcon,
  starIcon,
  moneyIcon,
  heartIcon,
  crownIcon,
  pencilIcon,
  paperPencilIcon
} from '../constants/icons'
import 'swiper/css'
import 'swiper/css/scrollbar'
//import './swiper-custom.scss'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { deleteAd } from '../api/ads'
import IconBin from './icons/IconBin'
import IconMap from './icons/IconMap'
import IconEdit from './icons/IconEdit'
import styleOf from './Card.module.scss'
import { useState, useEffect } from 'react'
import { addToFavorites } from '../api/user'
import { Pagination, Navigation, Scrollbar } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import defaultProfile from '../assets/images/defaultProfile/default-m-818bf2b20d4b06a052dd..svg'

import { useSelector, useDispatch } from 'react-redux'
import { selectUser, addToFavoritesUser, deleteToFavoritesUser, decrementAdsImagesUser, deleteToAdsOfUser, disconnectUser } from '../slices/userSlice'
import { lastActionWithLikesAds } from '../slices/adsSlice'

function Card({
  ad,
  //user,
  openPopup,
  areCardsVertical,
  updateClickedAd,
}) {

  const dispatch = useDispatch()
  const user = useSelector(selectUser)

  const { urlId } = useParams()
  const navigate = useNavigate()
  const urlOnBrowser = window.location.pathname
  const [isItChecked, setIsItChecked] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)
  const userPage = `/projects/serve/user/${ad.userId}`
  const [weAreOnUserPage, setWeAreOnUserPage] = useState(false)
  const userPageWithSlash = `/projects/serve/user/${ad.userId}/`

  const handleChangeCheckbox = e => {
    e.stopPropagation()

    /* if(props.allCardsChecked) {
      props.uncheckAllCheckboxes()
    } */

    //setIsSubscribed(e.target.checked)

    //props.allCardsChecked && (isSubscribed || props.allCardsChecked)
  }

  const displayStars = starsNb => {
    let stringOfStars = ''
    while(starsNb) {
      stringOfStars += starIcon
      --starsNb
    }
    return stringOfStars
  }

  const handleViewReviews = e => {
    e.stopPropagation()
    console.warn('voir les avis')
  }

  const handleShowPriceDetails = e => {
    e.stopPropagation()
    console.warn('proposer un prix de prestation')
  }

  const handleRateUser = e => {
    e.stopPropagation()
    console.warn('noter')
  }

  const handleModifyAd = e => {
    e.stopPropagation()
    console.warn('modifier annonce')
  }

  const handleShowUserProfile = e => {
    console.warn('handleShowUserProfile')
    e.stopPropagation()
    if (!weAreOnUserPage) {
      if (urlOnBrowser !== userPage) {
        navigate(`/user/${ad.userId}`)
      }
      if (urlOnBrowser !== userPageWithSlash) {
        navigate(`user/${ad.userId}`)
      }
    }
  }

  const handleDeleteAd = (e, id) => {
    e.stopPropagation()

    const datas = {
      adId: id,
      userId: user.info._id,
      adHaveImages: Boolean(ad.imagesWork.length)
    }

    deleteAd(datas)
    .then(res => {
      if(res.status === 200) {

        const adsArrayWithoutAd = user.info.ads.filter((adElement) => adElement !== ad._id)
        dispatch(deleteToAdsOfUser(adsArrayWithoutAd))

        if(ad.imagesWork.length) dispatch(decrementAdsImagesUser())
        openPopup(res.data.message)
      }
    })
    .catch(err => {
      console.warn('err', err)
    })

  }

  const showStatistics = e => {
    e.stopPropagation()
    console.warn('montrer les stats')
  }

  const manageAddToFavorites = (e) => {
    e.stopPropagation()
    const token = window.localStorage.getItem('serve-token')
    if(token) {
      if(user.info._id !== ad.userId) {
        addToFavorites(ad._id)
        .then(res => {
          if(res.status === 200) {
            //console.log('ok en bdd')
            updateClickedAd({adId: ad._id, newFavNumber: res.data.newFavNumber})
            //console.log('go to redux action !')
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
    if (urlOnBrowser === userPage || urlOnBrowser === userPageWithSlash) {
      setWeAreOnUserPage(true)
    }

    //const btnsDisabled = document.querySelectorAll('.swiper-button-disabled')
    //console.log('btnsDisabled', btnsDisabled)
    /* btnsDisabled.forEach((btnDisabled, index) => {
      console.log('btnDisabled', btnDisabled)
      btnDisabled.addEventListener('click', function(e) {
        console.log('e', e)
        e.stopPropagation()
        e.preventDefault()
        e.cancelBubble = true;
        e.stopImmediatePropagation()
      })
    }) */
  }, []);

  const handleShowAd = () => {
    navigate(`/ad/${ad._id}`)
  }

  return (
    <li
      className={`${areCardsVertical ? '[&:not(:last-child)]:mb-3' : ''}`}
    >
      {user.isLogged && user.info._id === urlId &&
      <div className='py-1 flex'>
        <button
          onClick={e => handleDeleteAd(e, ad._id)}
          className={`
            p-2
            bg-slate-200
            dark:bg-slate-700
            rounded-full
            [&:not(:first-child)]:ml-2
          `}>
          <IconBin className='text-red-600' />
        </button>
        <Link
          onClick={(e) => e.stopPropagation()}
          className={`
            p-2
            bg-slate-200
            dark:bg-slate-700
            rounded-full
            [&:not(:first-child)]:ml-2
          `}
          to={`/ad/${ad._id}/edit`}>
          <IconEdit className='dark:text-white text-black' />
        </Link>
      </div>
      }
      <div
        className={`
          z-0
          rounded-3xl
          bg-slate-200
          overflow-hidden
          dark:bg-slate-700
          ${areCardsVertical ? 'relative' : 'flex h-36'}`}
      >
        {Boolean(ad.imagesWork.length) &&
        <div className={`relative ${areCardsVertical ? 'aspect-square swiper-custom-vertical' : 'swiper-custom-horizontal w-36'}`}>
          <Swiper
            navigation={true}
            scrollbar={{hide: false}}
            modules={[Navigation, Scrollbar]}
          >
            {ad.imagesWork.map((imageWork, index) =>
              <SwiperSlide
                key={`${ad._id}-${index}`}
              >
                <img
                  onClick={() => console.warn('display image bigger')}
                  src={imageWork}
                  alt='image du service' />
              </SwiperSlide>
            )}
          </Swiper>
        </div>
        }
        <div
          onClick={() => handleShowAd()}
          className={`
            p-2
            flex
            flex-col
            cursor-pointer
            overflow-hidden
            ${areCardsVertical ? '' : 'justify-between w-full'}
          `}>
          <div>

            <div className='flex justify-between'>
              <div>
                <h3
                  className={`
                    relative
                    dark:text-white
                    ${styleOf.limitTextTo}
                    ${styleOf.twoLinesMax}
                  `}>
                  {ad.title}
                </h3>
                <div
                  className={`
                    text-xs
                    text-ellipsis
                    text-rose-500
                    overflow-hidden
                    whitespace-nowrap
                  `}
                >
                  <span className='mr-1'><IconMap className='text-red-500 relative bottom-0.5 inline' /></span>{ad.location}
                </div>
              </div>
              <div className={`w-6 ${styleOf.crownImageContainer}`}>
                <Link
                  onClick={(e) => e.stopPropagation()}
                  className='flex justify-center items-center'
                  to={`/user/${ad.userId}`}>
                  <img
                    src={ad.imageUser ? ad.imageUser : defaultProfile}
                    alt="image de l'utilisateur"
                    className='rounded-full aspect-square object-cover'
                  />
                </Link>
                {Boolean(ad.superUser) &&
                <div className='text-xs text-center'>{crownIcon}</div>
                }
              </div>
            </div>



            
          </div>
          <p
            className={`
              dark:text-white
              ${styleOf.limitTextTo}
              ${areCardsVertical ? 'my-3' : ''}
              ${areCardsVertical ? styleOf.fiveLinesMax : styleOf.oneLineMax}
            `}>
            {ad.description}
          </p>

          {/* <div>
            <p
              className={`
                text-gray-400
              `}
            >
              le {props.ad.dateOfPublication}
            </p>
            <div
              className={`
                pb-3
                flex
                justify-between
              `}
            >
              <div className='text-right text-gray-400'>
                à {props.ad.timeOfPublication}
              </div>
            </div>
          </div> */}

          <div className='flex justify-between items-center'>

            <div>
              {Boolean(ad.starsNb) &&
              <div className={styleOf.stars}>
                {displayStars(ad.starsNb)}
              </div>
              }

              <div
                className={`
                  text-xs
                  text-fuchsia-500
                  dark:text-yellow-100
                `}>
                {moneyIcon} {ad.price} €/h
              </div>
            </div>

              <button
                className={`
                  px-2
                  py-1
                  flex
                  items-center
                  rounded-full
                  bg-slate-100
                  dark:bg-slate-600
                `}
                onClick={e => manageAddToFavorites(e)}
              >
                <div>{heartIcon}</div>
                <div className='ml-1 text-red-600'>
                  {ad.favoritesNb}
                </div>
              </button>

          </div>



          {/* <button
            className={`
              px-3
              py-2
              flex
              text-xl
              items-center
              rounded-full
              bg-gray-100
              dark:bg-slate-600
            `}
            onClick={e => handleViewReviews(e)}
          >
            <div className='text-xs'>{paperPencilIcon}</div>
            <div
              className={`
                ml-2
                text-gray-400
              `}
            >
              {props.ad.reviewsNb}
            </div>
          </button> */}

          {/* </div> */}
            {/* {weAreOnUserPage && !props.isVisitor &&
            <div className='flex pt-3'>
              <button
                className={`
                  px-2
                  py-2
                  flex
                  text-xl
                  items-center
                  rounded-full
                  bg-gray-100
                  dark:bg-slate-600
                `}
                onClick={e => handleDeleteAd(e, props.ad._id)}
              >
                {binIcon}
              </button>
              <button
                className={`
                  mx-1
                  px-2
                  py-2
                  flex
                  text-xl
                  items-center
                  rounded-full
                  bg-gray-100
                  dark:bg-slate-600
                `}
                onClick={e => showStatistics(e)}
              >
                <div>{eyeIcon}</div>
                <div
                  className={`
                    ml-1
                    text-green-500
                  `}
                >
                  {props.ad.views}
                </div>
              </button>
              <button
                className={`
                  px-2
                  py-2
                  flex
                  text-xl
                  items-center
                  rounded-full
                  bg-gray-100
                  dark:bg-slate-600
                `}
                onClick={e => handleModifyAd(e)}
              >
                {pencilIcon}
              </button>
              {props.showCheckboxsDraft &&
                <input
                  value='yes'
                  name='check'
                  type='checkbox'
                  id={props.ad._id}
                  //className='w-8 h-8 rounded-full'
                  //checked={props.allCardsChecked ? true : false}
                  //defaultChecked
                  //onChange={}
                  onClick={e => handleChangeCheckbox(e)}
                  onChange={e => handleChangeCheckbox(e)}
                  //checked={isSubscribed || props.allCardsChecked}
                />
              }
            </div>
          } */}
        </div>
      </div>
    </li>
  )
}

export default Card
