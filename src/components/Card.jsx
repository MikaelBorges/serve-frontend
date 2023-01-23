import {
  binIcon,
  pinIcon,
  eyeIcon,
  heartIcon,
  starIcon,
  crownIcon,
  pencilIcon,
  paperPencilIcon
} from '../constants/icons'
import 'swiper/css'
import './swiper-custom.scss'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { deleteAd } from '../api/ads'
import PictureUser from './PictureUser'
import styleOf from './Card.module.scss'
import { useState, useEffect } from 'react'
import { Pagination, Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Link, useNavigate } from 'react-router-dom'

function Card(props) {
  const navigate = useNavigate()
  const urlOnBrowser = window.location.pathname
  const [isItChecked, setIsItChecked] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)
  const userPage = `/projects/serve/user/${props.ad.userId}`
  const [weAreOnUserPage, setWeAreOnUserPage] = useState(false)
  const userPageWithSlash = `/projects/serve/user/${props.ad.userId}/`

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

  const handleShowAd = () => {
    console.warn("afficher l'annonce")
  }

  const handleShowLocation = e => {
    e.stopPropagation()
    console.warn('afficher la carte')
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
        navigate(`/user/${props.ad.userId}`)
      }
      if (urlOnBrowser !== userPageWithSlash) {
        navigate(`user/${props.ad.userId}`)
      }
    }
  }

  const handleDeleteAd = (e, id) => {
    e.stopPropagation()

    const adToDelete = {
      id: id
    }

    deleteAd(adToDelete)
    .then(res => {
      if(res.status === 200) {
        props.openPopup(res.data.message)
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

  useEffect(() => {
    if (urlOnBrowser === userPage || urlOnBrowser === userPageWithSlash) {
      setWeAreOnUserPage(true)
    }
  }, []);

  return (
    <li
      className={`
        ${props.areCardsVertical ? '' : 'flex h-36'}
        rounded-3xl
        bg-slate-200
        overflow-hidden
        dark:bg-slate-700
        ${props.layoutOneColumn ? '' : ''}
        ${props.horizontalCard ? '' : ''}
        ${props.layoutOneColumn && props.horizontalCard ?
          styleOf.horizontalCard : ''
        }
      `}
    >
      <div className='aspect-square'>
        <Swiper
          navigation={true}
          pagination={{type: "progressbar"}}
          modules={[Pagination, Navigation]}
          className={`
            bg-slate-200
            ${styleOf.mySwiper}
            dark:bg-slate-700
          `}
        >
          {props.ad.imagesWork.map((imageWork, index) =>
            <SwiperSlide
              className={styleOf.swiperSlide}
              key={`${props.ad._id}-${index}`}
            >
              <img alt='image du service' src={imageWork} />
            </SwiperSlide>
          )}
        </Swiper>
      </div>
      <div
        onClick={() => handleShowAd()}
        className={`${props.areCardsVertical ? '' : 'w-full'}`}
      >
        <div className='flex justify-between items-center'>
          <div className='flex items-center'>
            {!props.areCardsVertical &&
            <Link to={`/user/${props.ad.userId}`}>
              <PictureUser
                imageUser={props.ad.imageUser}
                layoutOneColumn={props.layoutOneColumn}
              />
            </Link>
            }
            <h3
              className={`
                mt-1
                px-2
                w-fit
                h-fit
                mx-1.5
                dark:mt-1
                dark:mx-1
                dark:px-4
                font-bold
                leading-4
                dark:leading-4
                dark:text-black
                ${styleOf.limitTextTo}
                ${styleOf.twoLinesMax}
                ${styleOf.letterSpacingThinner}
                ${props.darkMode ? styleOf.highlightedTextForDarkMode : styleOf.highlightedText}
                ${props.layoutOneColumn && !props.horizontalCard ?
                  'leading-7' : ''
                }
              `}
            >
              {props.ad.title}
            </h3>
          </div>
          {props.ad.superUser &&
          <div className='mt-1 mx-2 mb-2'>{crownIcon}</div>
          }
        </div>
        <div
          className={`
            p-3
            flex
            flex-col
            cursor-pointer
            justify-between
            dark:text-white
            ${props.layoutOneColumn && !props.horizontalCard ?
              'text-2xl p-5 h-96' : ''
            }
            ${props.layoutOneColumn && props.horizontalCard ?
              styleOf.textPartHorizontalAd : ''
            }
          `}
        >
          {props.areCardsVertical &&
          <div className='pb-3'>
            <div
              className={`
                flex
                flex-1
                min-w-0
              `}
            >
              {props.areCardsVertical &&
              <Link
                className={`
                  flex
                  py-1
                  text-sm
                  text-left
                  rounded-3xl
                  items-center
                  text-ellipsis
                  bg-gray-100
                  overflow-hidden
                  whitespace-nowrap
                  dark:bg-slate-600
                  ${styleOf.userButton}
                `}
                to={`/user/${props.ad.userId}`}
              >
                <PictureUser
                  imageUser={props.ad.imageUser}
                  layoutOneColumn={props.layoutOneColumn}
                />
                <h4
                  className={`
                    ml-2
                    flex
                    flex-1
                    min-w-0
                    flex-col
                    ${props.layoutOneColumn && !props.horizontalCard ?
                      'text-lg mt-1' : 'text-sm'
                    }
                  `}
                >
                  <div
                    className={`
                      text-ellipsis
                      overflow-hidden
                      whitespace-nowrap
                    `}
                  >
                    {props.ad.firstname}
                  </div>
                  <div
                    className={`
                      text-ellipsis
                      overflow-hidden
                      whitespace-nowrap
                    `}
                  >
                    {props.ad.lastname}
                  </div>
                </h4>
              </Link>
              }
            </div>
            <span className='text-sm'>{displayStars(props.ad.starsNb)}</span>
            <button
              className={`
                px-2
                ml-1
                text-xs
                font-bold
                rounded-3xl
                bg-gray-100
                dark:bg-slate-600
                dark:text-yellow-100
                ${styleOf.letterSpacingThinner}
              `}
              onClick={e => handleRateUser(e)}
            >
              noter
            </button>
            <div
              className={`
                flex
                flex-1
                min-w-0
              `}
            >
              <button
                className={`
                  mt-1
                  pl-2
                  pr-3
                  py-0.5
                  text-sm
                  rounded-2xl
                  text-ellipsis
                  bg-gray-100
                  text-rose-500
                  overflow-hidden
                  whitespace-nowrap
                  dark:bg-slate-600
                `}
                onClick={e => handleShowLocation(e)}
              >
                <span className='mr-1'>{pinIcon}</span>{props.ad.location}
              </button>
            </div>
          </div>
          }
          <p
            className={`
              mb-3
              ${styleOf.limitTextTo}
              ${props.areCardsVertical ? styleOf.fiveLinesMax : styleOf.oneLineMax}
            `}
          >
            {props.ad.description}
          </p>
          {props.areCardsVertical &&
          <>
            <p
              className={`
                text-gray-400
                ${props.layoutOneColumn && !props.horizontalCard ?
                  'text-lg' : 'text-xs'
                }
              `}
            >
              le {props.ad.dateOfPublication}
            </p>
            <div
              className={`
                pb-3
                flex
                justify-between
                ${props.layoutOneColumn && !props.horizontalCard ?
                  'text-lg' : 'text-xs'
                }
              `}
            >
              <div className='text-right text-gray-400'>
                à {props.ad.timeOfPublication}
              </div>
              {/* <button
                className={`
                  px-2
                  text-xs
                  font-bold
                  rounded-3xl
                  text-white
                  bg-fuchsia-500
                  dark:bg-slate-600
                  dark:text-yellow-100
                  ${styleOf.letterSpacingThinner}
                `}
                onClick={e => handleShowPriceDetails(e)}
              >
                {props.ad.price} €/h
              </button> */}
            </div>
          </>
          }
          <div className='flex justify-between'>
          <button
              className={`
                px-3
                py-2
                flex
                text-xl
                items-center
                rounded-full
                bg-fuchsia-500
                dark:bg-slate-600
                dark:text-yellow-100
              `}
            >
              <div
                className={`
                text-white
                  ${props.layoutOneColumn && !props.horizontalCard ?
                    'text-xl' : 'text-base'
                  }
                `}
              >
                {props.ad.price} €/h
              </div>
            </button>
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
                  ${props.layoutOneColumn && !props.horizontalCard ?
                    'text-xl' : 'text-base'
                  }
                `}
              >
                {props.ad.reviewsNb}
              </div>
            </button> */}
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
              onClick={e => props.handleAddToFavorites(e, props.ad)}
            >
              <div>{heartIcon}</div>
              <div
                className={`
                  ml-1
                  text-red-600 
                  ${props.layoutOneColumn && !props.horizontalCard ?
                    'text-xl' : 'text-base'
                  }
                `}
              >
                {props.ad.favoritesNb}
              </div>
            </button>
          </div>
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
                    ${props.layoutOneColumn && !props.horizontalCard ?
                      'text-xl' : 'text-base'
                    }
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

export default Card;
