import { loadAds } from '../api/ads'
import Card from '../components/Card'
import { useState, useEffect } from 'react'
import styleOf from './HomePage.module.scss'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Masonry from 'react-masonry-css'

import { connect } from 'react-redux'
import { fetchAdsAction } from '../actions/ads/adsActions'

function HomePage(props) {
  const [search, setSearch] = useSearchParams()
  //console.warn('search base', search.get('location'))

  //console.warn('props', props)

  const navigate = useNavigate(),
        [ads, setAds] = useState([]),
        [favs, setFavs] = useState(false),
        [oddAds, setOddAds] = useState([]),
        [evenAds, setEvenAds] = useState([]),
        [filteredAds, setFilteredAds] = useState([]),
        [areAdsArranged, setAreAdsArranged] = useState(false),
        [breakpointsColumnsMasonry, setBreakpointsColumnsMasonry] = useState({}),

        arrangeAds = () => {
          oddAds.length = 0
          evenAds.length = 0
          /* setOddAds([])
          setEvenAds([]) */
          // console.log('début du classement')
          ads.forEach((ad, index) => {
            const isAdEven = (index % 2 === 0) ? true : false
            if (isAdEven) {
              evenAds.push(ad)
            }
            else {
              oddAds.push(ad)
            }
          })
          if(evenAds.length > 0 || oddAds.length > 0) {
            setOddAds(oddAds)
            setEvenAds(evenAds)
            setAreAdsArranged(true)
          }
          console.log('(HOME) ads rangé')
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
    const location = search.get('location'),
          minPrice = search.get('minPrice'),
          maxPrice = search.get('maxPrice')

    console.log('minPrice', minPrice)
    console.log('maxPrice', maxPrice)
    console.log('location', location)

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
        //console.log('location', location)
        //const filteredLocationAds = filteredAds.filter(ad => ad.location !== location)
        //console.log('filteredLocationAds', filteredLocationAds)
        //if(filteredLocationAds.length) setFilteredAds(filteredLocationAds)
        //setFilteredAds(ads)
      }
      if(minPrice) {
        const filteredMinPriceAds = ads.filter(ad => +ad.price >= +minPrice)
        console.log('filteredMinPriceAds', filteredMinPriceAds)
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

  /* useEffect(() => {
    // console.warn('params! changed', params)
    // const [searchParams, setSearchParams] = useSearchParams()
    // const location = searchParams.get('location')
    // console.warn(location)
  }, [params]) */

  /* useEffect(() => {
    // console.log('useEffect favs')
    // console.log('favs', favs)
    // if(favs) arrangeAds()
  }, [favs]); */

  useEffect(() => {
    console.log('(HOME) useEffect props.clickedAd', props.clickedAd)
    if(Object.keys(props.clickedAd).length > 0) {
      console.log('rentre ici car clickedAd.length > 0 ')
      console.log('mettre à jour le coeur', props.clickedAd)

      // Note : Phase de recherche de l'annonce à mettre à jour (ses nb favoris)
      let item = {},
          items = [],
          indexSaved = 0,
          favoritesToUpdate = 0

      console.log('ads', ads)

      ads.forEach((ad, index, arr) => {
        console.log('ad._id', ad._id)
        console.log('props.clickedAd.adId', props.clickedAd.adId)
        if(ad._id === props.clickedAd.adId) {
          indexSaved = index
          console.log('ad trouvé', index)
          items = [...ads]
          item = {...items[index]}
          // console.log('index', index)
          // console.log('item', item)
          favoritesToUpdate = props.clickedAd.newFavNumber
          // console.log('item', item)
          console.log('favoritesToUpdate', favoritesToUpdate)
          arr.length = index + 1 // Tip > sortir de la boucle
        }
        else {
          console.log('pas trouvé')
        }
      })

      // Note : Phase de remplacement de toutes les annonces
      // Note : dont celle qui contient son nb favoris mis à jour
      item.favoritesNb = favoritesToUpdate
      items[indexSaved] = item
      console.log('item', item)
      console.log('items', items)
      setAreAdsArranged(false)
      setAds(items)
      setFilteredAds(items)
      props.resetClickedAd()
    }
  }, [props.clickedAd]);

  useEffect(() => {
    //console.warn('params changed', params)

    //console.warn('search changed', search)

    generateMasonryBreakpointsUntilThisMaxValue(3000)

    if(props.refreshUrl) navigate('/')
    // await loadAds()

    loadAds()
    .then(res => {
      setAds(res.ads)
      setFilteredAds(res.ads)
      props.fetchAdsAction(res.ads)
    })
    .catch(err => console.log(err))
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
    console.log('props.locationTyped', props.locationTyped)
    console.log('filteredAds', filteredAds)
    const locationFilteredAds = filteredAds.filter(ad => ad.location === props.locationTyped)
    console.log('locationFilteredAds', locationFilteredAds)
    if(locationFilteredAds.length) setFilteredAds(locationFilteredAds)
  }, [props.locationTyped]); */

  useEffect(() => {
    console.log('(HOME) useEffect ads', ads)
    //console.log('(HOME) areAdsArranged', areAdsArranged)
    if(!areAdsArranged && ads.length > 0) {
      //console.log('(HOME) arrangement ads')
      arrangeAds()
    }
  }, [ads]);

  // ancien return : balise article vidée
  /* if(areAdsArranged) {
    return (
      <section className='pt-28 pb-24 dark:bg-slate-900 bg-white flex flex-col space-y-12 px-6'>
        <article
          className={`
            flex
            mt-px
            ${props.layoutOneColumn ? 'flex-col' : 'justify-between'}
          `}
        >
        </article>
      </section>
    )
  } else {
    return (
      <section className='min-h-screen flex justify-center items-center'>
        <img className='w-20' src='https://i.stack.imgur.com/y3Hm3.gif' />
      </section>
    )
  } */

  //useSearchParams

  return (
    <section className='flex flex-col space-y-12 px-3'>
      {Boolean(filteredAds.length) &&
        <ul className='mt-px'>
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
                handleAddToFavorites={props.handleAddToFavorites}
              />
            )}
          </Masonry>
        </ul>
      }
      {!Boolean(filteredAds.length) && Boolean(ads.length) &&
        <h1 className='text-3xl dark:text-white'>Pas de résultats</h1>
      }
      {!Boolean(ads.length) &&
        <img className='w-20' src='https://i.stack.imgur.com/y3Hm3.gif' alt='chargement' />
      }
    </section>
  )
}

/* const mapStateToProps = (state, ownProps) => {
  console.log('(HOME) state', state)
  return {
    store: state
  }
} */

const mapStateToProps = (store, ownProps) => {
  console.warn('(HOME) store', store)
  return {
    userInfo: store.user,
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
