import { loadAds } from '../api/ads'
import { connect } from 'react-redux'
import Card from '../components/Card'
import Masonry from 'react-masonry-css'
import { useState, useEffect } from 'react'
import styleOf from './HomePage.module.scss'
//import { fetchAdsAction } from '../actions/ads/adsActions'
import { useNavigate, useSearchParams } from 'react-router-dom'

function HomePage({clickedAd, resetClickedAd, areCardsVertical, updateClickedAd, handleFocusOnSearchBar, handleSearchBarVisibility}) {
  const navigate = useNavigate()
  const [ads, setAds] = useState([])
  const [noAds, setNoAds] = useState(null)
  const [search, setSearch] = useSearchParams()
  const [breakpointsColumnsMasonry, setBreakpointsColumnsMasonry] = useState({})

  const title = search.get('title')
  const location = search.get('location')
  const minPrice = Number(search.get('minPrice') || 0)
  const maxPrice = Number(search.get('maxPrice') || 0)
  const superUser = search.get('superUser') ? true : false
  const onlyWithPhotos = search.get('onlyWithPhotos') ? true : false

  const filteredAds = ads
  ?.filter(ad => minPrice ? minPrice >= ad.price : true)
  ?.filter(ad => maxPrice ? ad.price <= maxPrice : true)
  ?.filter(ad => superUser ? ad.superUser === superUser : true)
  ?.filter(ad => onlyWithPhotos ? ad.imagesWork.length > 0 === onlyWithPhotos : true)
  ?.filter(ad => title ? ad.title.toUpperCase().includes(title.toUpperCase()) : true)
  ?.filter(ad => location ? ad.location.toUpperCase().includes(location.toUpperCase()) : true)

  /* console.log('minPrice', minPrice)
  console.log('maxPrice', maxPrice) */

  /* const generateMasonryBreakpointsFor = (verticalCards) => {
    let pas
    let columns = 7
    let breakpointsObject
    let startValueForBigScreens = 1565
    let maxBreakpointValue = 3000
    if(verticalCards) {
      pas = 200
      columns = 7
      breakpointsObject = {
        374: 1,
        567: 2,
        767: 3,
        1023: 4,
        1179: 5,
        1365: 6
      }
    }
    else {
      pas = 500
      columns = 3
      breakpointsObject = {
        567: 1,
        1023: 2
      }
    }
    for (let bp = startValueForBigScreens; bp < maxBreakpointValue; bp += pas) {
      breakpointsObject[bp] = columns // TIP > obligé d'utiliser la notation crochets pour définir des clés d'objet par le contenu de variable 
      ++columns
    }
    breakpointsObject.default = columns
    setBreakpointsColumnsMasonry(breakpointsObject)
  } */
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
    const timeout = setTimeout(() => {
      handleFocusOnSearchBar(false)
    }, 500)
    return () => clearTimeout(timeout)
  }, [filteredAds]);

  useEffect(() => {
    if(Object.keys(clickedAd).length > 0) {

      /* const dataUserCalc = {...dataUser}
      const index = dataUserCalc.favorites.indexOf(adId) */

      // Note : Phase de recherche de l'annonce à mettre à jour (ses nb favoris)
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
      setAds(items)
      resetClickedAd()
    }
  }, [clickedAd]);

  useEffect(() => {

    handleSearchBarVisibility(true)

    generateMasonryBreakpointsUntilThisMaxValue(3000)
    //if(props.refreshUrl) navigate('/')
    // await loadAds()
    loadAds()
    .then(res => {
      setAds(res.ads)
      setNoAds(res.noAds)
      //props.fetchAdsAction(res.ads)
    })
    .catch(err => console.warn(err))
  }, []);

  return (
    <section className={`${areCardsVertical ? styleOf.sectionHomepage : 'px-3'}`}>
      {Boolean(filteredAds.length) &&
      <div className='border border-black bg-white'>Filtres</div>
      }
      <h1 className='my-7 text-3xl dark:text-white'>
        {noAds ? 'Aucune annonces' : 'Toutes les annonces'}
      </h1>
      {Boolean(filteredAds.length) &&
      <ul className={areCardsVertical ? '' : 'grid gap-3 md:grid-cols-2 xl:grid-cols-3'}>
        {areCardsVertical &&
        <Masonry
          role='list'
          className={styleOf.myMasonryGrid}
          breakpointCols={breakpointsColumnsMasonry}
          columnClassName={styleOf.myMasonryGridColumn}
        >
          {filteredAds.map(ad =>
          <Card
            ad={ad}
            key={ad._id}
            role='listitem'
            updateClickedAd={updateClickedAd}
            areCardsVertical={areCardsVertical} />
          )}
        </Masonry>
        }
        {!areCardsVertical && filteredAds.map(ad =>
        <Card
          ad={ad}
          key={ad._id}
          role='listitem'
          updateClickedAd={updateClickedAd}
          areCardsVertical={areCardsVertical} />
        )}
      </ul>
      }
      {!Boolean(filteredAds.length) && Boolean(ads.length) &&
      <h1 className='text-3xl dark:text-white'>Pas de résultats</h1>
      }
      {!Boolean(ads.length) && !noAds &&
      <img
        className='w-20'
        alt='chargement'
        src='https://i.stack.imgur.com/y3Hm3.gif' />
      }
    </section>
  )
}

const mapStateToProps = (store, ownProps) => {
  return {
    lastAdLiked: store.lastAdLiked
    //user: store.user,
  }
}

/* const mapDispatchToProps = {
  fetchAdsAction
} */

export default connect(mapStateToProps)(HomePage);
//export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
//export default HomePage
