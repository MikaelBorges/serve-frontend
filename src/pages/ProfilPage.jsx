import Card from '../components/Card'
import { loadUserAds } from '../api/ads'
import { useState, useEffect } from 'react'
import { useParams, Navigate, Link, useNavigate } from 'react-router-dom'
import { Image, Transformation, CloudinaryContext } from 'cloudinary-react'
import styleOf from './ProfilPage.module.scss'
import Masonry from 'react-masonry-css'
//import { lightIcon, telescopeIcon, binIcon, validIcon } from '../constants/icons'
import { logoutUser } from '../api/user'
import {
  binIcon,
  starIcon,
  darkIcon,
  userIcon,
  cardIcon,
  plusIcon,
  heartIcon,
  wheelIcon,
  validIcon,
  lightIcon,
  systemIcon,
  messageIcon,
  modernKeyIcon,
  disconnectIcon,
  telescopeIcon
} from '../constants/icons'

import { useSelector, useDispatch } from 'react-redux'
import { selectUser, disconnectUser } from '../slices/userSlice'
import IconLogout from '../components/icons/IconLogout'
import IconWheel from '../components/icons/IconWheel'

function ProfilPage({
  handleAreCardsVertical,
  toggleTheme,
  clickedAd,
  resetClickedAd,
  updateClickedAd,
  areCardsVertical,
  handleSearchBarVisibility
}) {

  const dispatch = useDispatch()
  const user = useSelector(selectUser)

  const navigate = useNavigate()
  const { urlId } = useParams()
  const hour = new Date().getHours()
  const [ads, setAds] = useState([])
  const [imgUrl, setImgUrl] = useState('')
  const [noAds, setNoAds] = useState(null)
  const [appIsLoading, setAppIsLoading] = useState(true)
  const [isVisitor, setIsVisitor] = useState(false)
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [liteInfosOfUser, setLiteInfosOfUser]= useState({})
  const [allCardsChecked, setAllCardsChecked] = useState(false)
  const [showCheckboxsDraft, setshowCheckboxsDraft] = useState(false)
  const [responseMessageFromCard, setResponseMessageFromCard] = useState('')
  const [breakpointsColumnsMasonry, setBreakpointsColumnsMasonry] = useState({})
  const [error, setError] = useState(null)

  const handleLogout = () => {
    let data = { _id : user.info._id }
    logoutUser(data)
    .then(res => {
      if (res.status === 200) {
        window.localStorage.removeItem('redux')
        window.localStorage.removeItem('serve-token')

        dispatch(disconnectUser())

        if(window.location.pathname !== '/') navigate('/')
      }
      else {
        setError(res.msg)
      }
    })
    .catch(err => {
      console.warn('erreur: rentre dans le catch de ProfilPage')
      console.warn(err)
      // setError(err)
    })
  }

  const wayToGreet = () => {
    return hour > 6 && hour < 20 ?
      `Bonjour ${user.info.firstname} ${lightIcon}`
      :
      `Bonsoir ${user.info.firstname} ${telescopeIcon}`
  }

  const handleDeleteAd = e => {
    console.warn('supprimer')
  }

  const handleModifyAd = e => {
    console.warn('modifier')
  }

  const handleChangeMainCheckbox = e => {
    e.stopPropagation()
  }

  const checkAllCheckboxes = () => {
    console.warn('checkAllCheckboxes')
  }

  const uncheckAllCheckboxes = () => {
    console.warn('uncheckAllCheckboxes')
  }

  const openPopup = message => {
    setIsPopupOpen(true)
    setResponseMessageFromCard(message)
    window.location.reload(false)
  }

  const generateMasonryBreakpointsUntilThisMaxValue = (maxBreakpointValue) => {
    let columns = 7,
    breakpointsObject = {
      374: 1,
      567: 2,
      767: 3,
      1023: 4,
      1179: 5,
      1365: 6
    }

    for (let bp = 1565; bp < maxBreakpointValue; bp += 200) {
      breakpointsObject[bp] = columns // TIP > obligé d'utiliser la notation crochets pour définir des clés d'objet par le contenu de variable 
      ++columns
    }
    breakpointsObject.default = columns

    setBreakpointsColumnsMasonry(breakpointsObject)
  }

  /* useEffect(() => {
    if(props.user.isLogged && (props.user.info._id === userIdPage)) {
      setIsVisitor(false)
      loadUserAds(userIdPage, false)
      .then(res => {
        setAds(res.adsOfUser)
        setNoAds(res.noAds)
      })
      .catch(err => console.warn('err', err))
    }
    else {
      setIsVisitor(true)
      loadUserAds(userIdPage, true)
      .then(res => {
        setAds(res.adsOfUser)
        setNoAds(res.noAds)
        setLiteInfosOfUser(res.liteInfos)
      })
      .catch(err => console.warn('err', err))
    }
  }, [props.user, userIdPage]); */

  const titlePage = () => {
    if(!appIsLoading) {
      if(ads.length) {
        if(user.info._id === urlId) return `Voici vos annonces`
        else return `Voici les annonces de ${liteInfosOfUser.firstname}`
      }
      else {
        if(user.info._id === urlId) return `Vous n'avez pas d'annonces`
        else return `${liteInfosOfUser.firstname} n'a aucune annonce`
      }
    }
    else return 'Voici vos annonces...'
  }

  useEffect(() => {
    handleSearchBarVisibility(false)
    generateMasonryBreakpointsUntilThisMaxValue(3000)
  }, [])

  // loadUserAds
  useEffect(() => {
    loadUserAds(urlId)
    .then(res => {
      setLiteInfosOfUser(res.liteInfos)
      setAds(res.adsOfUser)
      //setNoAds(res.noAds)
      setAppIsLoading(false)
    })
    .catch(err => console.error('err', err))
  }, [urlId])

  // Mettre à jour les tableaux d'annonces au clic sur une annonce favorite
  useEffect(() => {
    if(Object.keys(clickedAd).length > 0) {

      // Phase de recherche :
      let item = {}
      let items = []
      let indexSaved = 0
      let favoritesToUpdate = 0

      ads.forEach((ad, index, arr) => {
        if(ad._id === clickedAd.adId) {
          indexSaved = index
          items = [...ads]
          item = {...items[index]}
          favoritesToUpdate = clickedAd.newFavNumber
          arr.length = index + 1 // Tip > sortir de la boucle
        }
      })

      // Note : Phase de remplacement de toutes les annonces
      // Note : dont celle qui contient son nb favoris mis à jour
      item.favoritesNb = favoritesToUpdate
      items[indexSaved] = item
      // setAreAdsArranged(false)
      setAds(items)
      resetClickedAd()
    }
  }, [clickedAd]);

  /* useEffect(() => {
    // console.warn('isVisitor', isVisitor)

    // loadUserAds(userIdPage, isVisitor)
    // .then(res => {
    //   setAds(res.adsOfUser)
    //   if(!liteInfosLoaded) setLiteInfosOfUser(res.liteInfos)
    //   setLiteInfosLoaded(true)
    // })
    // .catch(err => console.warn('err', err))

  }, [isVisitor]); */

  /* if(isVisitor) {
    setImgUrl(user.imageUser)
  } else {
    setImgUrl(user.imageUser)
  } */

  //console.warn('userIdPage', userIdPage)
  //console.warn('props.dataUser._id', props.dataUser._id)
  //if(props.dataUser._id !== userIdPage) return <Navigate to='/' />

  return (
    <section>
      <div className='m-3'>
        {/* {!isVisitor &&
          <>
            <h1 className='pb-4 text-3xl dark:text-white'>{wayToGreet()}</h1>
            <div className='pb-4 flex text-sm'>
              <button
                className={`
                  p-2
                  rounded-3xl
                  text-white
                  bg-gray-300
                  dark:text-white
                `}
                onClick={() => console.warn('Changer mon mot de passe')}
              >
                Changer mon mot de passe
              </button>
              <button
                className={`
                  p-3
                  mx-3
                  rounded-3xl
                  text-white
                  bg-gray-300
                  dark:text-white
                `}
                onClick={() => console.warn('Changer mon e-mail')}
              >
                Changer mon e-mail
              </button>
              <button
                className={`
                  p-2
                  rounded-3xl
                  text-white
                  bg-gray-300
                  dark:text-white
                `}
                onClick={() => console.warn('Supprimer mon compte')}
              >
                Supprimer mon compte
              </button>
            </div>
          </>
        } */}
        {/* <div className='flex justify-between'>
          <div className='flex flex-col justify-center'>
            <h2 className='text-3xl dark:text-white'>
              {titlePage()}
            </h2>
          </div>
          {!isVisitor && showCheckboxsDraft &&
            <div className='flex flex-col justify-center'>
              <div className='flex'>
                <button
                  className={`
                    mr-2
                    px-4
                    py-3
                    text-2xl
                    bg-gray-100
                    rounded-full
                    dark:bg-gray-800
                  `}
                  onClick={e => handleDeleteAd(e)}
                >
                  {binIcon}
                </button>
                <div
                  className={`
                    flex
                    flex-col
                    justify-center
                  `}
                >
                  <input
                    value='yes'
                    type='checkbox'
                    name='check-all'
                    onClick={e => handleChangeMainCheckbox(e)}
                    onChange={e => handleChangeMainCheckbox(e)}
                  />
                </div>
              </div>
            </div>
          }
        </div> */}

        {user.info._id === urlId &&
        <h1 className='text-3xl dark:text-white'>{wayToGreet()}</h1>
        }
        {user.info._id === urlId &&
        <div className='flex justify-between mt-6'>
          <Link
            className={`
              px-2
              py-1
              flex
              text-xs
              items-center
              bg-slate-200
              rounded-full
              text-slate-500
              cursor-pointer
              dark:bg-slate-600
              dark:text-yellow-100
            `}
            to={`/user/${user.info._id}/settings`}>
              <IconWheel /><p className='ml-1'>Modifier mon compte</p>
          </Link>
          <button
            className={`
              px-2
              py-1
              flex
              text-xs
              bg-red-100
              items-center
              rounded-full
              text-red-600
              cursor-pointer
              dark:bg-slate-600
            `}
            onClick={() => handleLogout()}>
              <IconLogout /><p className='ml-1'>Se déconnecter</p>
          </button>
        </div>
        }
        <h2 className='mt-4 text-2xl dark:text-white'>{titlePage()}</h2>
      </div>

      {Boolean(ads.length) &&
      <ul className={areCardsVertical ? 'px-1.5' : 'px-3 grid gap-3 md:grid-cols-2 xl:grid-cols-3'}>
        {areCardsVertical &&
        <Masonry
          role='list'
          className={styleOf.myMasonryGrid}
          breakpointCols={breakpointsColumnsMasonry}
          columnClassName={styleOf.myMasonryGridColumn}>
            {ads.map(ad =>
            <Card
              ad={ad}
              key={ad._id}
              role='listitem'
              isVisitor={isVisitor}
              openPopup={openPopup}
              allCardsChecked={allCardsChecked}
              updateClickedAd={updateClickedAd}
              areCardsVertical={areCardsVertical}
              showCheckboxsDraft={showCheckboxsDraft} />
            )}
        </Masonry>
        }

        {!areCardsVertical && ads.map(ad =>
        <Card
          ad={ad}
          key={ad._id}
          role='listitem'
          isVisitor={isVisitor}
          openPopup={openPopup}
          allCardsChecked={allCardsChecked}
          updateClickedAd={updateClickedAd}
          areCardsVertical={areCardsVertical}
          showCheckboxsDraft={showCheckboxsDraft} />
        )}
      </ul>
      }
      {/* {noAds && !isVisitor &&
      <img
        alt="Vous n'avez pas d'annonces"
        src='https://res.cloudinary.com/mika4ever/image/upload/v1672669742/samples/assets/no-ads.svg'
      />
      } */}
      {isPopupOpen &&
        <div
          className={`
            flex
            fixed
            inset-0
            text-center
            items-center
            justify-center
            z-10
          `}>
          <div
            className={`
              p-4
              bg-white
              rounded-3xl
              text-green-500
            `}>
            <div className='text-7xl'>{validIcon}</div>
            <div>{responseMessageFromCard}</div>
          </div>
        </div>
      }
    </section>
  )
}

export default ProfilPage
