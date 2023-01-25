import { loadAds } from '../api/ads'
import { connect } from 'react-redux'
import Card from '../components/Card'
import Masonry from 'react-masonry-css'
import { useState, useEffect } from 'react'
import styleOf from './HomePage.module.scss'
import { fetchAdsAction } from '../actions/ads/adsActions'
import { useNavigate, useSearchParams } from 'react-router-dom'

function HomePage(props) {
  const navigate = useNavigate()
  const [ads, setAds] = useState([])
  const [search, setSearch] = useSearchParams()
  const [filteredAds, setFilteredAds] = useState([])
  const [breakpointsColumnsMasonry, setBreakpointsColumnsMasonry] = useState({})

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
    const location = search.get('location')
    const minPrice = search.get('minPrice')
    const maxPrice = search.get('maxPrice')

    /* console.warn('minPrice', minPrice)
    console.warn('maxPrice', maxPrice)
    console.warn('location', location) */

    const filterAds = ads
    .filter(ad => ad.location === location)
    .filter(ad => +ad.price >= +minPrice)
    .filter(ad => +ad.price <= +maxPrice)

    setFilteredAds(filterAds)

    /* if(location || minPrice || maxPrice) {
      if(location) {
        const filteredLocationAds = ads.filter(ad => ad.location === location)
        if(filteredLocationAds.length) setFilteredAds(filteredLocationAds)
      } else {
        //console.warn('location', location)
        //const filteredLocationAds = filteredAds.filter(ad => ad.location !== location)
        //console.warn('filteredLocationAds', filteredLocationAds)
        //if(filteredLocationAds.length) setFilteredAds(filteredLocationAds)
        //setFilteredAds(ads)
      }
      if(minPrice) {
        const filteredMinPriceAds = ads.filter(ad => +ad.price >= +minPrice)
        console.warn('filteredMinPriceAds', filteredMinPriceAds)
        setFilteredAds(filteredMinPriceAds)
      } else {

      }
      if(maxPrice) {
        const filteredMaxPriceAds = ads.filter(ad => +ad.price <= +maxPrice)
        setFilteredAds(filteredMaxPriceAds)
      } else {
        
      }
    } */

  }, [search])

  useEffect(() => {
    if(Object.keys(props.clickedAd).length > 0) {

      // Note : Phase de recherche de l'annonce à mettre à jour (ses nb favoris)
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
      setAds(items)
      setFilteredAds(items)
      props.resetClickedAd()
    }
  }, [props.clickedAd]);

  useEffect(() => {
    generateMasonryBreakpointsUntilThisMaxValue(3000)
    if(props.refreshUrl) navigate('/')
    // await loadAds()
    loadAds()
    .then(res => {
      setAds(res.ads)
      setFilteredAds(res.ads)
      props.fetchAdsAction(res.ads)
    })
    .catch(err => console.warn(err))
  }, []);

  /* useEffect(() => {
    let priceFilteredAds,
        minPrice = props.minPrice,
        maxPrice = props.maxPrice
    if(props.minPrice) minPrice = +props.minPrice
    if(props.maxPrice) maxPrice = +props.maxPrice

    if(minPrice && !maxPrice) priceFilteredAds = filteredAds.filter(ad => +ad.price >= minPrice)
    else if(!minPrice && maxPrice) priceFilteredAds = filteredAds.filter(ad => +ad.price <= maxPrice)
    else if(minPrice && maxPrice) priceFilteredAds = filteredAds.filter(ad => +ad.price >= minPrice && +ad.price <= maxPrice)
    else if(!minPrice && !maxPrice) priceFilteredAds = filteredAds
    setFilteredAds(priceFilteredAds)
  }, [props.minPrice, props.maxPrice]); */

  /* useEffect(() => {
    console.warn('props.locationTyped', props.locationTyped)
    console.warn('filteredAds', filteredAds)
    const locationFilteredAds = filteredAds.filter(ad => ad.location === props.locationTyped)
    console.warn('locationFilteredAds', locationFilteredAds)
    if(locationFilteredAds.length) setFilteredAds(locationFilteredAds)
  }, [props.locationTyped]); */

  return (
    <section className={`flex flex-col space-y-12 ${props.areCardsVertical ? styleOf.sectionHomepage : 'px-3'}`}>
      {Boolean(filteredAds.length) &&
      <ul
        className={`
          mt-px
          ${props.areCardsVertical ? '' : 'grid gap-3 md:grid-cols-2 xl:grid-cols-3'}
        `}
        >
        {props.areCardsVertical &&
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
              darkMode={props.darkMode}
              horizontalCard={props.horizontalCard}
              layoutOneColumn={props.layoutOneColumn}
              areCardsVertical={props.areCardsVertical}
              handleAddToFavorites={props.handleAddToFavorites}
            />
          )}
        </Masonry>
        }
        {!props.areCardsVertical && filteredAds.map(ad =>
        <Card
          ad={ad}
          key={ad._id}
          role='listitem'
          darkMode={props.darkMode}
          horizontalCard={props.horizontalCard}
          layoutOneColumn={props.layoutOneColumn}
          areCardsVertical={props.areCardsVertical}
          handleAddToFavorites={props.handleAddToFavorites}
        />
        )}
      </ul>
      }
      {!Boolean(filteredAds.length) && Boolean(ads.length) &&
      <h1 className='text-3xl dark:text-white'>Pas de résultats</h1>
      }
      {!Boolean(ads.length) &&
      <img
        className='w-20'
        alt='chargement'
        src='https://i.stack.imgur.com/y3Hm3.gif'
      />
      }
    </section>
  )
}

/* const mapStateToProps = (state, ownProps) => {
  return {
    store: state
  }
} */

const mapStateToProps = (store, ownProps) => {
  return {
    user: store.user,
    allAds: store.ads.fetchedAds
  }
}

/* const mapStateToProps = (store, ownProps) => ({
  allAds: store.ads
}) */

/* const mapStateToProps = {
  store: adsSelectors(state)
} */

/* const mapDispatchToProps = dispatch => {
  return {
    fetchAdsAction: ads => dispatch({type: 'FETCH_ADS_ACTION', payload: ads})
  }
} */

const mapDispatchToProps = {
  fetchAdsAction
}

// export default connect(mapStateToProps)(HomePage);
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
