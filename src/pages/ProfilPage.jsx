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

  const { userIdPage } = useParams(),
        hour = new Date().getHours(),
        [ads, setAds] = useState([]),
        [imgUrl, setImgUrl] = useState(''),
        [noAds, setNoAds] = useState(false),
        [isVisitor, setIsVisitor] = useState(false),
        [isPopupOpen, setIsPopupOpen] = useState(false),
        [liteInfosOfUser, setLiteInfosOfUser]= useState({}),
        [allCardsChecked, setAllCardsChecked] = useState(false),
        [showCheckboxsDraft, setshowCheckboxsDraft] = useState(false),
        [responseMessageFromCard, setResponseMessageFromCard] = useState(''),
        [breakpointsColumnsMasonry, setBreakpointsColumnsMasonry] = useState({}),

        wayToGreet = () => {
          return hour > 6 && hour < 20 ?
            `Bonjour ${props.dataUser.firstname} ${lightIcon}`
            :
            `Bonsoir ${props.dataUser.firstname} ${goodEveningIcon}`
        },

        handleDeleteAd = e => {
          console.warn('supprimer')
          // console.warn('e', e)
          // deleteAd(userId, adId)
          /* .then((res)=>{
              // console.warn('res', res)
              setAds(res)
          })
          .catch(err => console.warn('err', err)) */
        },

        handleModifyAd = e => {
          // console.warn('e', e)
          console.warn('modifier')
        },

        handleChangeMainCheckbox = e => {
          e.stopPropagation()
          //setAllCardsChecked(e.target.checked)
        },

        checkAllCheckboxes = () => {
          console.warn('checkAllCheckboxes')
          //setAllCardsChecked(true)
        },

        uncheckAllCheckboxes = () => {
          console.warn('uncheckAllCheckboxes')
          //setAllCardsChecked(false)
        },

        openPopup = message => {
          setIsPopupOpen(true)
          setResponseMessageFromCard(message)
          window.location.reload(false)
        },

        generateMasonryBreakpointsUntilThisMaxValue = (maxBreakpointValue) => {
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
    console.warn('(PROFIL) useEffect props.dataUser', props.dataUser)
    if(userIsLogged(props.dataUser) && (props.dataUser._id === userIdPage)) {
      console.warn('(PROFIL) utiliser les props ')
      setIsVisitor(false)
      loadUserAds(userIdPage, false)
      .then(res => {
        setAds(res.adsOfUser)
        setNoAds(res.noAds)
      })
      .catch(err => console.warn('err', err))
    } else {
      console.warn('(PROFIL) utiliser les datas du serveur')
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
    console.warn('(PROFIL) useEffect props.clickedAd', props.clickedAd)
    if(Object.keys(props.clickedAd).length > 0) {
      console.warn('rentre ici car clickedAd.length > 0 ')
      console.warn('mettre à jour le coeur', props.clickedAd)

      // Phase de recherche :
      let item = {},
          items = [],
          indexSaved = 0,
          favoritesToUpdate = 0

      console.warn('ads', ads)

      ads.forEach((ad, index, arr) => {
        console.warn('ad._id', ad._id)
        console.warn('props.clickedAd.adId', props.clickedAd.adId)
        if(ad._id === props.clickedAd.adId) {
          indexSaved = index
          console.warn('ad trouvé', index)
          items = [...ads]
          item = {...items[index]}
          // console.warn('index', index)
          // console.warn('item', item)
          favoritesToUpdate = props.clickedAd.newFavNumber
          // console.warn('item', item)
          console.warn('favoritesToUpdate', favoritesToUpdate)
          arr.length = index + 1 // Tip > sortir de la boucle
        }
        else {
          console.warn('pas trouvé')
        }
      })

      // Note : Phase de remplacement de toutes les annonces
      // Note : dont celle qui contient son nb favoris mis à jour
      item.favoritesNb = favoritesToUpdate
      items[indexSaved] = item
      console.warn('item', item)
      console.warn('items', items)
      // setAreAdsArranged(false)
      setAds(items)
      props.resetClickedAd()
    }
  }, [props.clickedAd]);

  useEffect(() => {
    generateMasonryBreakpointsUntilThisMaxValue(3000)
  }, [])

  /* useEffect(() => {
    console.warn('(PROFIL) useEffect[userIdPage]', userIdPage)
  }, [userIdPage]) */

  /* useEffect(() => {
    console.warn('(PROFIL) useEffect[userIdPage]', userIdPage)
  }, [userIdPage]) */

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
                    //className='w-8 h-8 rounded-full'
                    //className={"before:block before:w-6 before:h-6 dark:before:bg-slate-600 before:bg-slate-200 before:rounded-full"}
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
  console.warn('(PROFIL) store', store)
  return {
    userInfo: store.user
  }
}

export default connect(mapStateToProps)(ProfilPage)
