import { loadAds } from '../api/ads'
import { connect } from 'react-redux'
import Card from '../components/Card'
import Masonry from 'react-masonry-css'
import { useState, useEffect } from 'react'
import styleOf from './HomePage.module.scss'
//import { fetchAdsAction } from '../actions/ads/adsActions'
import { useNavigate, useSearchParams } from 'react-router-dom'

import FilterRadio from '../components/filter/FilterRadio'
import FilterInput from '../components/filter/FilterInput'
import FilterButton from '../components/filter/FilterButton'
import IconHorizontalRule from '../components/icons/IconHorizontalRule'

const superUserFilterRadioChoices = ['oui', 'non']
const photosAdsFilterRadioChoices = ['oui', 'non']
const filterLocationPlaceholderElements = ['ville']
const filterPricePlaceholderElements = ['min', 'max']

function HomePage({isButtonFilterActive, darkMode, clickedAd, resetClickedAd, areCardsVertical, updateClickedAd, handleFocusOnSearchBar, handleSearchBarVisibility}) {
  const navigate = useNavigate()
  const [ads, setAds] = useState([])
  //const [noAds, setNoAds] = useState(null)
  const [appIsLoading, setAppIsLoading] = useState(true)
  const [search, setSearch] = useSearchParams()
  const [breakpointsColumnsMasonry, setBreakpointsColumnsMasonry] = useState({})

  const title = search.get('title')
  const location = search.get('location')
  const minPrice = Number(search.get('minPrice') || 0)
  const maxPrice = search.get('maxPrice') ? Number(search.get('maxPrice')) : null
  const superUser = search.get('superUser') ? true : false
  const onlyWithPhotos = search.get('onlyWithPhotos') ? true : false

  /* const [minPrice, setMinPrice] = useState(Number(search.get('minPrice') || 0))
  const [maxPrice, setMaxPrice] = useState(search.get('maxPrice') ? Number(search.get('maxPrice')) : null)
  const [location, setLocation] = useState(search.get('location'))
  const [superUser, setSuperUser] = useState(search.get('superUser') ? true : false)
  const [onlyWithPhotos, setOnlyWithPhotos] = useState(search.get('onlyWithPhotos') ? true : false) */

  const filteredAds = ads
  ?.filter(ad => minPrice ? ad.price >= minPrice : true)
  ?.filter(ad => maxPrice ? ad.price <= maxPrice : true)
  ?.filter(ad => superUser ? ad.superUser === superUser : true)
  ?.filter(ad => onlyWithPhotos ? ad.imagesWork.length > 0 === onlyWithPhotos : true)
  ?.filter(ad => title ? ad.title.toUpperCase().includes(title.toUpperCase()) : true)
  ?.filter(ad => location ? ad.location.toUpperCase().includes(location.toUpperCase()) : true)

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

  const handleChangeRadio = (e) => {
    const name = e.target.name
    const radioValue = e.target.value
    /* console.log('name', name)
    console.log('radioValue', radioValue) */

    if(name === 'superUserRadioGroup') {
      if(radioValue === 'oui') search.set('superUser', true)
      //if(search.get('superUser') !== 'true') search.set('superUser', true)
      else search.delete('superUser')
    }
    else {
      if(radioValue === 'oui') search.set('onlyWithPhotos', true)
      else search.delete('onlyWithPhotos')
    }

    setSearch(search)
  }

  const handleChangePriceInput = (e) => {
    const name = e.target.name
    const price = e.target.value

    if (price.length) {
      if(name === 'min') search.set('minPrice', price)
      else search.set('maxPrice', price)
    }
    else {
      if(name === 'min') search.delete('minPrice')
      else search.delete('maxPrice')
    }

    setSearch(search)
  }

  const handleChangeLocationInput = (e) => {
    const text = e.target.value
    if (text.length) search.set('location', text)
    else search.delete('location')
    setSearch(search)
  }

  /* useEffect(() => {
    if(search.get('minPrice')) setMinPrice(Number(search.get('minPrice')))
    else setMinPrice(0)

    if(Number(search.get('maxPrice')) > 0) setMaxPrice(Number(search.get('maxPrice')))
    else setMaxPrice(null)

    if(search.get('location')) setLocation(search.get('location'))
    else setLocation(null)

    if(search.get('superUser') === 'true') setSuperUser(true)
    else setSuperUser(false)

    if(search.get('onlyWithPhotos') === 'true') setOnlyWithPhotos(true)
    else setOnlyWithPhotos(false)
  }, [search]) */

  useEffect(() => {
    handleSearchBarVisibility(true)
    generateMasonryBreakpointsUntilThisMaxValue(3000)
    //if(props.refreshUrl) navigate('/')
    // await loadAds()
    loadAds()
    .then(res => {
      setAds(res.ads)
      //setNoAds(res.noAds)
      setAppIsLoading(false)
      //props.fetchAdsAction(res.ads)
    })
    .catch(err => console.warn(err))
  }, []);

  // Simulation du blur lors d'une recherche
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

  /* const determinatePriceInputValue = (placeholder) => {
    if(placeholder === 'min') {
      if(search.get('minPrice')) return search.get('minPrice')
      else return ''
    }
    else if (placeholder === 'max') {
      if(search.get('maxPrice')) return search.get('maxPrice')
      else return ''
    }
  } */

  const handleResetFilters = () => {
    console.warn('reset all filters')

    /* setMinPrice(0)
    setMaxPrice(null)
    setLocation(null)
    setSuperUser(false)
    setOnlyWithPhotos(false) */

    search.delete('minPrice')
    search.delete('maxPrice')
    search.delete('location')
    search.delete('superUser')
    search.delete('onlyWithPhotos')
    setSearch(search)
  }

  const titlePage = () => {
    if(!appIsLoading) {
      if(!ads.length) return 'Aucune annonces'
      else {
        if(!filteredAds.length) return 'Pas de résultats'
        else if(filteredAds.length !== ads.length) return 'Résultats'
        else return 'Toutes les annonces'
      }
    }
    else return 'En chargement...'
  }

  return (
    <section>
      <ul
        className={`
          pt-1
          flex
          px-3
          pb-2
          mt-3
          mx-3
          right-3
          bg-white
          max-w-lg
          flex-row
          flex-wrap
          items-end
          rounded-3xl
          dark:text-white
          dark:bg-slate-800
          ${darkMode ? '' : styleOf.biggerShadow}
          ${isButtonFilterActive && `sticky z-20 ${styleOf.stickyFilters}`}
        `}
      >
        {/* {filters.map((filter, index) =>
        <li className='mr-3'>
          <FilterButton filterButtonName={filter.label}>
            {filter.inputs.map((placeholder, index) =>
              <FilterInput
                key={index}
                type={filter.type}
                name={placeholder}
                placeholder={placeholder}
                onChange={filter.actionOnChange}
              />
            )}
          </FilterButton>
        </li>
        )} */}
        {Boolean(filterPricePlaceholderElements.length) &&
        <li className='mr-3'>
          <FilterButton filterButtonName='Prix'>
            {filterPricePlaceholderElements.map((placeholder, index) =>
              <FilterInput
                //value={determinatePriceInputValue(placeholder)}
                key={index}
                type='number'
                name={placeholder}
                placeholder={placeholder}
                onChange={handleChangePriceInput}
                defaultValue={placeholder === 'min' ? search.get('minPrice') : search.get('maxPrice')}
              />
            )}
          </FilterButton>
        </li>
        }
        {Boolean(filterLocationPlaceholderElements.length) &&
        <li className='mr-3'>
          <FilterButton filterButtonName='Lieu'>
            {filterLocationPlaceholderElements.map((placeholder, index) =>
              <FilterInput
                //value={search.get('location') ? search.get('location') : ''}
                key={index}
                type='text'
                name={placeholder}
                placeholder={placeholder}
                onChange={handleChangeLocationInput}
                defaultValue={search.get('location')}
              />
            )}
          </FilterButton>
        </li>
        }
        {Boolean(superUserFilterRadioChoices.length) &&
        <li className='mr-3'>
          <FilterButton filterButtonName='Super utilisateurs'>
            {superUserFilterRadioChoices.map((radioName, index) =>
              <FilterRadio
                key={index}
                radioName={radioName}
                groupName='superUserRadioGroup'
                handleChangeRadio={handleChangeRadio}
                isParamOnUrl={search.get('superUser') === 'true' ? true : false}
                //onChange={handleChangeRadio}
                //checked={search.get('superUser') === 'true' ? true : false}
              />
            )}
          </FilterButton>
        </li>
        }
        {Boolean(photosAdsFilterRadioChoices.length) &&
        <li className='mr-3'>
          <FilterButton filterButtonName='Uniquement avec photos'>
            {photosAdsFilterRadioChoices.map((radioName, index) =>
              <FilterRadio
                key={index}
                radioName={radioName}
                groupName='photoRadioGroup'
                handleChangeRadio={handleChangeRadio}
                isParamOnUrl={search.get('onlyWithPhotos') === 'true' ? true : false}
                //onChange={handleChangeRadio}
                //value={search.get('onlyWithPhotos') === 'true' ? 'true' : 'false'}
              />
            )}
          </FilterButton>
        </li>
        }
        {/* <li className='mr-3'>
          <button
            className={`
              px-3
              flex
              mt-1.5
              rounded-3xl
              items-center
              bg-slate-200
              dark:bg-slate-600
              ${styleOf.resetFilterButton}
          `}
            onClick={() => handleResetFilters()}
          >
            Reset
          </button>
        </li> */}
        <div
          className={`
            h-4
            flex
            w-full
            items-center
            justify-center
            overflow-hidden
          `}
        >
          <IconHorizontalRule />
        </div>
      </ul>
      <h1 className='mx-3 my-7 text-3xl dark:text-white'>{titlePage()}</h1>
      {Boolean(filteredAds.length) &&
      <ul className={areCardsVertical ? 'px-1.5' : 'px-3 grid gap-3 md:grid-cols-2 xl:grid-cols-3'}>
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
      {appIsLoading &&
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
