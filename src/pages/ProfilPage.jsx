import Card from '../components/Card'
import { loadUserAds } from '../api/ads'
import { useState, useEffect } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import { userIsLogged } from '../functions/user'
import { Image, Transformation, CloudinaryContext } from 'cloudinary-react'
import { lightIcon, goodEveningIcon, binIcon, validIcon } from '../constants/icons'

import styleOf from './ProfilPage.module.scss'
import Masonry from 'react-masonry-css'

import { connect } from 'react-redux'

function ProfilPage(props) {

  const { userIdPage } = useParams()
  const hour = new Date().getHours()
  const [ads, setAds] = useState([])
  const [imgUrl, setImgUrl] = useState('')
  const [noAds, setNoAds] = useState(false)
  const [isVisitor, setIsVisitor] = useState(false)
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [liteInfosOfUser, setLiteInfosOfUser]= useState({})
  const [allCardsChecked, setAllCardsChecked] = useState(false)
  const [showCheckboxsDraft, setshowCheckboxsDraft] = useState(false)
  const [responseMessageFromCard, setResponseMessageFromCard] = useState('')
  const [breakpointsColumnsMasonry, setBreakpointsColumnsMasonry] = useState({})

  const wayToGreet = () => {
    return hour > 6 && hour < 20 ?
      `Bonjour ${props.dataUser.firstname} ${lightIcon}`
      :
      `Bonsoir ${props.dataUser.firstname} ${goodEveningIcon}`
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

  useEffect(() => {
    if(userIsLogged(props.dataUser) && (props.dataUser._id === userIdPage)) {
      setIsVisitor(false)
      loadUserAds(userIdPage, false)
      .then(res => {
        setAds(res.adsOfUser)
        setNoAds(res.noAds)
      })
      .catch(err => console.warn('err', err))
    } else {
      setIsVisitor(true)
      loadUserAds(userIdPage, true)
      .then(res => {
        setAds(res.adsOfUser)
        setNoAds(res.noAds)
        setLiteInfosOfUser(res.liteInfos)
      })
      .catch(err => console.warn('err', err))
    }
  }, [props.dataUser, userIdPage]);

  useEffect(() => {
    if(Object.keys(props.clickedAd).length > 0) {

      // Phase de recherche :
      let item = {}
      let items = []
      let indexSaved = 0
      let favoritesToUpdate = 0

      ads.forEach((ad, index, arr) => {
        if(ad._id === props.clickedAd.adId) {
          indexSaved = index
          items = [...ads]
          item = {...items[index]}
          favoritesToUpdate = props.clickedAd.newFavNumber
          arr.length = index + 1 // Tip > sortir de la boucle
        }
      })

      // Note : Phase de remplacement de toutes les annonces
      // Note : dont celle qui contient son nb favoris mis à jour
      item.favoritesNb = favoritesToUpdate
      items[indexSaved] = item
      // setAreAdsArranged(false)
      setAds(items)
      props.resetClickedAd()
    }
  }, [props.clickedAd]);

  useEffect(() => {
    generateMasonryBreakpointsUntilThisMaxValue(3000)
  }, [])

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

  /* <CloudinaryContext className='rounded-full overflow-hidden' cloudName='mika4ever'>
    <Image publicId={imgUrl}>
      <Transformation quality='auto' fetchFormat='auto' />
    </Image>
  </CloudinaryContext> */

  //console.warn('userIdPage', userIdPage)
  //console.warn('props.dataUser._id', props.dataUser._id)
  //if(props.dataUser._id !== userIdPage) return <Navigate to='/' />

  return (
    <section className='dark:bg-slate-900'>

      <div className='px-6'>

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
        <div className='pb-4 flex justify-between'>
          <div className='flex flex-col justify-center'>
            <h2 className='text-3xl dark:text-white'>
              {/* {isVisitor && !noAds && Object.keys(liteInfosOfUser).length > 0 ?
                `Annonce(s) de ${liteInfosOfUser.firstname}` : ''
              }
              {!isVisitor && !noAds && Object.keys(props.dataUser).length > 0 ?
                `Voici vos annonce(s) ${props.dataUser.firstname}` : ''
              }
              {noAds && isVisitor ?
                `${liteInfosOfUser.firstname} n'a pas d'annonce(s)` : ''
              }
              {noAds && !isVisitor ?
                `Vous n'avez pas d'annonce(s) ${props.dataUser.firstname}` : ''
              } */}
              Annonce(s) :
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
        </div>

      </div>

      {ads.length > 0 && !noAds &&
        <ul className='px-3'>
          <Masonry
            role='list'
            className={styleOf.myMasonryGrid}
            breakpointCols={breakpointsColumnsMasonry}
            columnClassName={styleOf.myMasonryGridColumn}
          >
            {ads.map(ad =>
              <Card
                ad={ad}
                key={ad._id}
                role='listitem'
                isVisitor={isVisitor}
                openPopup={openPopup}
                darkMode={props.darkMode}
                allCardsChecked={allCardsChecked}
                horizontalCard={props.horizontalCard}
                layoutOneColumn={props.layoutOneColumn}
                showCheckboxsDraft={showCheckboxsDraft}
                areCardsVertical={props.areCardsVertical}
                handleAddToFavorites={props.handleAddToFavorites}
              />
            )}
          </Masonry>
        </ul>
      }
      {ads.length === 0 && !noAds &&
        <img className='w-20' src='https://i.stack.imgur.com/y3Hm3.gif' />
      }
      {noAds && !isVisitor &&
        <img
          alt="l'utilisateur n'a pas d'annonces"
          src='https://res.cloudinary.com/mika4ever/image/upload/v1672669742/samples/assets/no-ads.svg'
        />
      }
      {isPopupOpen &&
        <div
          className={`
            flex
            fixed
            inset-0
            text-center
            items-center
            justify-center
          `}
        >
          <div
            className={`
              p-4
              bg-white
              rounded-3xl
              text-green-500
            `}
          >
            <div className='text-7xl'>{validIcon}</div>
            <div>{responseMessageFromCard}</div>
          </div>
        </div>
      }
    </section>
  )
}

const mapStateToProps = (store) => {
  return {
    userInfo: store.user
  }
}

export default connect(mapStateToProps)(ProfilPage)
