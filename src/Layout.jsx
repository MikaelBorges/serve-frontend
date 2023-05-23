import {
  starIcon,
  darkIcon,
  userIcon,
  cardIcon,
  plusIcon,
  heartIcon,
  wheelIcon,
  lightIcon,
  systemIcon,
  messageIcon,
  modernKeyIcon,
  disconnectIcon
} from './constants/icons'
import { debounce } from 'lodash'
import { logoutUser } from './api/user'
import { useState, useRef } from 'react'
import styleOf from './Layout.module.scss'
import IconKey from './components/icons/IconKey'
import IconAdd from './components/icons/IconAdd'
import IconHeart from './components/icons/IconHeart'
import Notification from './components/Notification'
import IconCross from './components/icons/IconCross'
import IconFilter from './components/icons/IconFilter'
import IconMessage from './components/icons/IconMessage'
import IconAccount from './components/icons/IconAccount'
import IconUserPlus from './components/icons/IconUserPlus'
import IconSettings from './components/icons/IconSettings'
import IconLayoutMasonry from './components/icons/IconLayoutMasonry'
import IconListLayout from './components/icons/IconListLayout'
import IconFilterOff from './components/icons/IconFilterOff'
import IconFilterMagnetic from './components/icons/IconFilterMagnetic'
import logoRoundLight from './assets/images/logos/logo.png'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import logoRoundDark from './assets/images/logos/logo.png'
import defaultProfile from './assets/images/defaultProfile/default-m-818bf2b20d4b06a052dd..svg'

import { useSelector } from 'react-redux'
import { selectUser } from './slices/userSlice'

/* import FilterRadio from './components/filter/FilterRadio'
import FilterInput from './components/filter/FilterInput'
import FilterButton from './components/filter/FilterButton'
import FilterCheckbox from './components/filter/FilterCheckbox'
import IconHorizontalRule from './components/icons/IconHorizontalRule'

const superUserFilter = {
  defaultSuperUserFilterRadioChecked: 'non',
  superUserFilterRadioChoices: ['oui', 'non']
}
const photoAdsFilter = {
  defaultPhotosAdsFilterRadioChecked: 'non',
  photosAdsFilterRadioChoices: ['oui', 'non']
}
const defaultSuperUserFilterRadioChecked = superUserFilter.defaultSuperUserFilterRadioChecked
const superUserFilterRadioChoices = superUserFilter.superUserFilterRadioChoices
const photosAdsFilterRadioChoices = photoAdsFilter.photosAdsFilterRadioChoices
const defaultPhotosAdsFilterRadioChecked = photoAdsFilter.defaultPhotosAdsFilterRadioChecked

const filterLocationPlaceholderElements = ['ville']
const filterPricePlaceholderElements = ['min', 'max']
const filterElementsCheckbox = [`1${starIcon}`, `2${starIcon}`, `3${starIcon}`, `4${starIcon}`, `5${starIcon}`] */

function Layout({
  theme,
  children,
  darkMode,
  toggleTheme,
  areCardsVertical,
  focusOnSearchBar,
  isSearchBarVisible,
  handleMagnetismFilter,
  handleVisibilityFilter,
  handleFocusOnSearchBar,
  handleAreCardsVertical,
  isFilterOffButtonActive,
  isFilterMagneticButtonActive
}) {

  const user = useSelector(selectUser)

  const navigate = useNavigate()
  const searchInputRef = useRef(null)
  //const locationInputRef = useRef(null)
  const [error, setError] = useState(null)
  const [search, setSearch] = useSearchParams()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isButtonSettingsActive, setIsButtonSettingsActive] = useState(false)

  const [isFilterSelectButtonActive, setIsFilterSelectButtonActive] = useState(false)
  const [isThemeSelectButtonActive, setIsThemeSelectButtonActive] = useState(true)
  //const [resetAllFilters, setResetAllFilters] = useState(false)

  //const numberOfMessagesUnread = user.isLogged ? 2 : ''
  //const numberOfFavoritesLiked = user.isLogged ? user.info.favorites.length : null
  //const numberOfFavoritesLiked = null

  /* const dockElements = [
    {
      icon: heartIcon,
      notificationNumber: numberOfFavoritesLiked,
      actionOnClick: () => console.warn('afficher la page des favoris')
    },
    {
      icon: messageIcon,
      actionOnClick: () => console.warn('afficher la messagerie')
    },
    {
      icon: plusIcon,
      route: `/user/${user.info._id}/new`
    }
  ] */

  /* const inputsReseted = () => {
    setResetAllFilters(false)
  } */

  const handleClickSettingsButton = () => {
    if(isThemeSelectButtonActive) setIsThemeSelectButtonActive(false)
    setIsButtonSettingsActive(!isButtonSettingsActive)
  }

  const themeSelectButtonIcon = () => {
    switch(theme) {
      case 'light': return lightIcon
      case 'dark': return darkIcon
      case 'system': return systemIcon
      default:
        console.error('Problème dans la sélection du thème');
    }
  }

  /* const handleChangePriceInput = (e) => {
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
  } */

  /* const handleChangeLocationInput = (e) => {
    const text = e.target.value
    if (text.length) search.set('location', text)
    else search.delete('location')
    setSearch(search)
  } */

  const handleChangeOnSearchBar = (e) => {
    handleFocusOnSearchBar(true)
    const text = e.target.value
    if (text.length) search.set('title', text)
    else search.delete('title')
    setSearch(search)
  }

  const handleClickFilterMagneticButton = () => {
    setIsFilterSelectButtonActive(!isFilterSelectButtonActive)
    handleMagnetismFilter()
  }

  const handleClickFilterOffButton = () => {
    setIsFilterSelectButtonActive(!isFilterSelectButtonActive)
    handleVisibilityFilter()
  }

  const handleClickIconCross = () => {
    searchInputRef.current.value = ''
    //searchInputRef.current.focus()
    search.delete('title')
    setSearch(search)
  }

  /* const handleChangeRadio = (e) => {
    const name = e.target.name
    const radioValue = e.target.value
    console.log('name', name)
    console.log('radioValue', radioValue)

    if(name === 'superUserRadioGroup') {
      if(radioValue === 'oui') search.set('superUser', true)
      else search.delete('superUser')
    }
    else {
      if(radioValue === 'oui') search.set('onlyWithPhotos', true)
      else search.delete('onlyWithPhotos')
    }

    setSearch(search)
  } */

  /* const handleChangeCheckbox = (e) => {
    const checkboxName = e.target.name
    const checkboxValue = e.target.value

    switch(checkboxName) {
      case '1' : 
      break
      case '2' : 
      break
      case '3' : 
      break
      case '4' : 
      break
      case '5' : 
      break
      default : search.delete('superUser')
      break
    }

    // if(checkboxValue === 'oui') search.set('superUser', radioValue)
    // else search.delete('superUser')

    setSearch(search)
  } */

  /* const handleResetFilters = () => {
    console.warn('reset filters')
    //setResetAllFilters(true)
    //console.log('locationInputRef', locationInputRef)

    //locationInputRef.current.value = ''
    //search.delete('location')
    //search.delete('minPrice')
    //search.delete('maxPrice')
    //search.delete('superUser')
    //search.delete('onlyWithPhotos')
    //setSearch(search)
  }
 */
  /* const filters = [
    {
      label: 'Prix',
      type: 'number',
      inputs: ['min', 'max'],
      actionOnChange: (e) => handleChangePriceInput(e)
    },
    {
      label: 'Lieu',
      type: 'text',
      inputs: ['ville'],
      actionOnChange: (e) => handleChangeLocationInput(e)
    },
    {
      label: 'Super user',
      type: 'radio',
      inputs: ['oui', 'non'],
      actionOnChange: (e) => handleChangeRadio(e)
    },
    {
      type: 'checkbox',
      inputs: [`1${starIcon}`, `2${starIcon}`, `3${starIcon}`, `4${starIcon}`, `5${starIcon}`],
    },
    {
      label: 'Uniquement avec photos',
      type: 'radio',
      inputs: ['oui', 'non'],
      actionOnChange: (e) => handleChangeRadio(e)
    }
  ] */

  return (
    <div className='min-h-screen dark:bg-slate-900'>
      <header
        className={`
          p-3
          z-30
          top-0
          w-full
          sticky
        `}
      >

        <div
          className={`
            h-10
            flex
            relative
            justify-between
          `}>

          <div className='flex'>
            <Link
            to='/'
            className='mr-1.5 w-10 rounded-full' // Tip : fix width cause ios safari
            >
              <img
                alt='logo'
                className='max-w-none h-full rounded-full'
                src={darkMode ? logoRoundDark : logoRoundLight}
              />
            </Link>

            <ul className='flex'>
              <li>
                <button
                  className={`
                    mx-1.5
                    px-2.5
                    flex
                    h-full
                    bg-white
                    rounded-full
                    items-center
                    aspect-square
                    justify-center
                    dark:text-white
                    dark:bg-slate-700
                    ${isButtonSettingsActive ? 'bg-slate-200 dark:bg-slate-500' : ''}
                    ${!isButtonSettingsActive && !darkMode ? styleOf.biggerShadow : ''}
                  `}
                  onClick={() => handleClickSettingsButton()}
                >
                  <IconSettings />
                </button>
              </li>
              {isButtonSettingsActive && <>
                <li>
                  <ul
                    className={`
                      flex
                      flex-col
                      items-center
                      rounded-full
                    `}>
                    <li>
                      <button
                        className={`
                          flex
                          px-2.5
                          h-full
                          text-xl
                          bg-white
                          rounded-full
                          items-center
                          aspect-square
                          justify-center
                          dark:text-white
                          dark:bg-slate-700
                          ${isThemeSelectButtonActive ? 'bg-slate-200 dark:bg-slate-500' : ''}
                          ${isButtonSettingsActive && !darkMode ? styleOf.biggerShadow : ''}
                        `}
                        onClick={() => setIsThemeSelectButtonActive(!isThemeSelectButtonActive)}
                      >
                        {themeSelectButtonIcon()}
                      </button>
                    </li>
                    {isThemeSelectButtonActive && <>
                      <li>
                        <button
                          className={`
                            flex
                            h-full
                            mt-1.5
                            px-2.5
                            text-xl
                            bg-white
                            rounded-full
                            items-center
                            aspect-square
                            justify-center
                            dark:text-white
                            dark:bg-slate-700
                            ${theme === 'light' ? 'bg-slate-200 dark:bg-slate-500' : ''}
                            ${isButtonSettingsActive && !darkMode ? styleOf.biggerShadow : ''}
                          `}
                          onClick={(e) => toggleTheme(e.target.innerText)}>
                          {lightIcon}
                        </button>
                      </li>
                      <li>
                        <button
                          className={`
                            flex
                            mt-1.5
                            px-2.5
                            h-full
                            text-xl
                            bg-white
                            rounded-full
                            items-center
                            aspect-square
                            justify-center
                            dark:text-white
                            dark:bg-slate-700
                            ${theme === 'dark' ? 'bg-slate-200 dark:bg-slate-500' : ''}
                            ${isButtonSettingsActive && !darkMode ? styleOf.biggerShadow : ''}
                          `}
                          onClick={(e) => toggleTheme(e.target.innerText)}>
                          {darkIcon}
                        </button>
                      </li>
                      <li>
                        <button
                          className={`
                            flex
                            mt-1.5
                            px-2.5
                            h-full
                            text-xl
                            bg-white
                            rounded-full
                            items-center
                            aspect-square
                            justify-center
                            dark:text-white
                            dark:bg-slate-700
                            ${theme === 'system' ? 'bg-slate-200 dark:bg-slate-500' : ''}
                            ${isButtonSettingsActive && !darkMode ? styleOf.biggerShadow : ''}
                          `}
                          onClick={(e) => toggleTheme(e.target.innerText)}>
                          {systemIcon}
                        </button>
                      </li>
                    </>}
                  </ul>
                </li>
                <li>
                  <button
                    className={`
                      flex
                      h-full
                      ml-1.5
                      px-2.5
                      bg-white
                      rounded-full
                      items-center
                      aspect-square
                      justify-center
                      dark:text-white
                      dark:bg-slate-700
                      ${!darkMode ? styleOf.biggerShadow : ''}
                    `}
                    onClick={() => handleAreCardsVertical()}>
                      {areCardsVertical ? <IconLayoutMasonry /> : <IconListLayout />}
                  </button>
                </li>
              </>}
            </ul>

          </div>

          {isSearchBarVisible && !isButtonSettingsActive &&
            <div
              className={`
                mr-3
                flex
                ml-1.5
                w-full
                border
                bg-white
                rounded-full
                border-transparent
                dark:bg-slate-600
                ${darkMode ? '' : styleOf.biggerShadow}
                ${focusOnSearchBar ? 'absolute left-0 right-0 top-0 mr-0 ml-0 z-20 h-full' : 'relative'}
              `}>
                <ul>
                  <li>
                    <button
                      className={`
                        flex
                        h-full
                        bg-white
                        rounded-full
                        items-center
                        aspect-square
                        justify-center
                        dark:text-white
                        dark:bg-slate-700
                        ${styleOf.filterButton}
                        ${isFilterSelectButtonActive ? 'bg-slate-200 dark:bg-slate-500' : ''}
                        ${!isFilterSelectButtonActive && !darkMode ? styleOf.biggerShadow : ''}
                      `}
                      onClick={() => setIsFilterSelectButtonActive(!isFilterSelectButtonActive)}>
                        <IconFilter />
                    </button>
                  </li>
                  {isFilterSelectButtonActive && <>
                    <li>
                      <button
                        className={`
                          mt-1.5
                          p-3
                          flex
                          h-full
                          bg-white
                          rounded-full
                          items-center
                          aspect-square
                          justify-center
                          dark:text-white
                          dark:bg-slate-700
                          ${isFilterOffButtonActive ? '': 'bg-slate-200 dark:bg-slate-500'}
                          ${isFilterSelectButtonActive && !darkMode ? styleOf.biggerShadow : ''}
                        `}
                        onClick={handleClickFilterOffButton}>
                          <IconFilterOff />
                      </button>
                    </li>
                    <li>
                      <button
                        className={`
                          mt-1.5
                          p-3
                          flex
                          h-full
                          bg-white
                          rounded-full
                          items-center
                          aspect-square
                          justify-center
                          dark:text-white
                          dark:bg-slate-700
                          ${isFilterMagneticButtonActive ? 'bg-slate-200 dark:bg-slate-500' : ''}
                          ${isFilterSelectButtonActive && !darkMode ? styleOf.biggerShadow : ''}
                        `}
                        onClick={handleClickFilterMagneticButton}>
                          <IconFilterMagnetic />
                      </button>
                    </li>
                  </>}
                </ul>
              
              <input
                autoFocus
                type='text'
                id='searchInput'
                className={`
                  mx-2
                  w-full
                  bg-white
                  text-black
                  rounded-full
                  dark:text-white
                  dark:bg-slate-600
                  placeholder:italic
                  focus:outline-none
                  placeholder:text-sm
                `}
                ref={searchInputRef}
                placeholder='recherche'
                onChange={(e) => handleChangeOnSearchBar(e)}
              />
              <button
                onClick={handleClickIconCross}
                className={`
                  flex
                  h-full
                  rounded-full
                  items-center
                  aspect-square
                  justify-center
                  dark:bg-slate-700
                  ${styleOf.crossButton}
                  ${darkMode ? '' : styleOf.biggerShadow}
                `}>
                <IconCross />
              </button>
            </div>
          }

          {!user.isLogged &&
            <div className='flex'>
                <Link
                  to='/user/register'
                  className={`
                    mr-3
                    flex
                    px-2.5
                    rounded-full
                    items-center
                    bg-slate-300
                    dark:bg-slate-600
                  `}
                >
                  <IconUserPlus className='text-black dark:text-yellow-100 text-xl' />
                </Link>
                <Link to='/user/login'
                  className={`
                    flex
                    px-2.5
                    rounded-full
                    items-center
                    bg-slate-300
                    dark:bg-slate-600
                  `}
                >
                  <IconKey className='text-yellow-300 text-xl' />
                </Link>
            </div>
          }

          {user.isLogged &&
            <Link
            className='w-10 flex justify-center items-center rounded-full' // Tip : fix width cause ios safari
            to={`/user/${user.info._id}`}>
              <img
                alt='image utilisateur'
                src={user.info.imageUser ? user.info.imageUser : defaultProfile}
                className='max-w-none h-full rounded-full aspect-square object-cover' // Tip : height: 100% and max-width: none cause ios safari
              />
            </Link>
          }

          {/* {user.isLogged &&
          <nav className={`aspect-square ${focusOnSearchBar ? 'blur-2xl' : ''}`}>
            <ul
              className={`
                bg-white
                rounded-3xl
                dark:bg-black
                ${isMenuOpen ? 'p-1' : ''}
                ${styleOf.biggerShadow}
              `}
            >
              <li
                className={`
                  flex
                  rounded-full
                  items-center
                  aspect-square
                  bg-slate-200
                  cursor-pointer
                  justify-center
                  dark:bg-slate-400
                `}>
                <button
                  className='rounded-3xl h-full w-full'
                  onClick={() => setIsMenuOpen(!isMenuOpen)}>
                  {user.isLogged ?
                  <img
                    className='rounded-full'
                    alt="image de l'utilisateur"
                    src={user.info.imageUser ? user.info.imageUser : defaultProfile}
                  />
                  :
                  <IconAccount />
                  }
                </button>
              </li>
              {isMenuOpen &&
              <>
                <li
                  className={`
                    my-2
                    flex
                    rounded-full
                    items-center
                    aspect-square
                    bg-slate-200
                    cursor-pointer
                    justify-center
                    dark:bg-slate-400
                  `}
                >
                  <button
                    className='rounded-3xl h-full w-full'
                    onClick={() => props.handleAreCardsVertical()}
                  >
                    {cardIcon}
                  </button>
                </li>
                <li
                  className={`
                    mt-1
                    flex
                    rounded-full
                    items-center
                    aspect-square
                    bg-slate-200
                    cursor-pointer
                    justify-center
                    dark:bg-slate-400
                  `}
                >
                  <button
                    className='rounded-3xl h-full w-full'
                    onClick={e => toggleTheme(e.target.innerText)}>
                      {lightIcon}
                  </button>
                </li>
                <li
                  className={`
                    mt-1
                    flex
                    rounded-full
                    items-center
                    aspect-square
                    bg-slate-200
                    cursor-pointer
                    justify-center
                    dark:bg-slate-400
                  `}
                >
                  <button
                    className='rounded-3xl h-full w-full'
                    onClick={e => toggleTheme(e.target.innerText)}
                  >
                    {darkIcon}
                  </button>
                </li>
                <li
                  className={`
                    mt-1
                    flex
                    rounded-full
                    items-center
                    aspect-square
                    bg-slate-200
                    cursor-pointer
                    justify-center
                    dark:bg-slate-400
                  `}
                >
                  <button
                    className='rounded-3xl h-full w-full'
                    onClick={e => toggleTheme(e.target.innerText)}
                  >
                    {systemIcon}
                  </button>
                </li>
                <li
                  className={`
                    mt-1
                    flex
                    rounded-full
                    items-center
                    aspect-square
                    bg-slate-200
                    cursor-pointer
                    justify-center
                    dark:bg-slate-400
                  `}
                >
                  {user.isLogged ?
                    <button
                      className='rounded-3xl h-full w-full'
                      onClick={() => handleLogout()}
                    >
                      {disconnectIcon}
                    </button>
                    :
                    <Link
                      className={`
                        flex
                        h-full
                        w-full
                        rounded-3xl
                        items-center
                        justify-center
                      `}
                      to='user/login'
                    >
                      {modernKeyIcon}
                    </Link>
                  }
                </li>
                {user.isLogged &&
                <li
                  className={`
                    mt-1
                    flex
                    rounded-full
                    items-center
                    aspect-square
                    bg-slate-200
                    cursor-pointer
                    justify-center
                    dark:bg-slate-400
                  `}
                >
                  <Link
                    className={`
                      flex
                      h-full
                      w-full
                      rounded-3xl
                      items-center
                      justify-center
                    `}
                    to={`/user/${user.info._id}/settings`}
                  >
                    {wheelIcon}
                  </Link>
                </li>
                }
                <li
                  className={`
                    mt-1
                    flex
                    rounded-full
                    items-center
                    aspect-square
                    bg-slate-200
                    cursor-pointer
                    justify-center
                    dark:bg-slate-400
                  `}
                >
                  <Link
                    className={`
                      flex
                      h-full
                      w-full
                      rounded-3xl
                      items-center
                      justify-center
                    `}
                    to={user.isLogged ?
                      `/user/${user.info._id}`
                      :
                      '/user/register'
                    }
                  >
                    {userIcon}
                  </Link>
                </li>
                <li
                  className={`
                    mt-1
                    flex
                    rounded-full
                    items-center
                    aspect-square
                    bg-slate-200
                    cursor-pointer
                    justify-center
                    dark:bg-slate-400
                  `}
                >
                  <button
                    className='rounded-3xl h-full w-full'
                    onClick={() => handleAreCardsVertical()}
                  >
                      {cardIcon}
                  </button>
                </li>
              </>
              }
            </ul>
          </nav>
          } */}

        </div>

        {/* {Boolean(filters.length) &&
        <ul
          className={`
            pt-1
            flex
            px-3
            pb-2
            mt-3
            right-3
            flex-row
            flex-wrap
            items-end
            bg-white
            rounded-3xl
            dark:text-white
            dark:bg-slate-800
            ${darkMode ? '' : styleOf.biggerShadow}
            ${isMenuOpen && !focusOnSearchBar ? styleOf.reducedWidthFilters : ''}
            ${!isSearchBarVisible || !isFilterMagneticButtonActive ? 'hidden' : ''}
          `}
        >

          {Boolean(filterPricePlaceholderElements.length) &&
          <li className='mr-3'>
            <FilterButton filterButtonName='Prix'>
              {filterPricePlaceholderElements.map((placeholder, index) =>
                <FilterInput
                  key={index}
                  type='number'
                  name={placeholder}
                  placeholder={placeholder}
                  onChange={handleChangePriceInput}
                  locationinputref={locationInputRef}
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
                  key={index}
                  type='text'
                  name={placeholder}
                  placeholder={placeholder}
                  resetfilter={resetAllFilters.toString()}
                  onChange={handleChangeLocationInput}
                />
              )}
            </FilterButton>
          </li>
          }
          {Boolean(superUserFilterRadioChoices.length) &&
          <li className='mr-3'>
            <FilterButton filterButtonName='Super user'>
              {superUserFilterRadioChoices.map((radioName, index) =>
                <FilterRadio
                  key={index}
                  radioName={radioName}
                  groupName='superUserRadioGroup'
                  handleChangeRadio={handleChangeRadio}
                  checked={defaultSuperUserFilterRadioChecked}
                />
              )}
            </FilterButton>
          </li>
          }
          {Boolean(filterElementsCheckbox.length) && false &&
          <li className='mr-3'>
            <FilterButton>
              {filterElementsCheckbox.map((checkboxName, index) =>
                <FilterCheckbox
                  key={index}
                  checkboxName={checkboxName}
                  groupName='ratingCheckboxGroup'
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
                  checked={defaultPhotosAdsFilterRadioChecked}
                />
              )}
            </FilterButton>
          </li>
          }
          <li className='mr-3 hidden'>
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
              onClick={handleResetFilters}
            >
              Reset
            </button>
          </li>
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
        } */}

      </header>
      <div
        //onClick={() => handleFocusOnSearchBar(false)}
        className={`
          ${styleOf.blurTransition}
          ${focusOnSearchBar ? 'relative blur-2xl' : ''}
        `}>
        {focusOnSearchBar &&
        <div className='absolute top-0 bottom-0 left-0 right-0'></div>
        }
        <main className='min-h-[calc(100vh-13rem)]'>
          {children}
        </main>
        <footer
          className={`
            pt-6
            text-xs
            text-center
            dark:text-white
            dark:bg-slate-900
            ${user.isLogged ? 'pb-20' : 'pb-6'}
            ${focusOnSearchBar ? 'blur-2xl' : ''}
          `}
        >
          © 2023 serve.ac
        </footer>
      </div>
      <nav
        className={`
          z-10
          fixed
          w-fit
          m-auto
          left-3
          right-3
          bottom-3
        `}
      >
        <ul
          className={`
            p-1
            flex
            w-fit
            rounded-full
          `}
        >
          {/* {dockElements.map((dockElement, index) =>
            <li
              key={index}
              className={`
                w-11
                flex
                rounded-full
                items-center
                aspect-square
                bg-slate-200
                cursor-pointer
                justify-center
                dark:bg-slate-400
                [&:not(:first-child)]:ml-1
              `}>
                {dockElement.route ?
                <Link
                  className={`
                    flex
                    h-full
                    w-full
                    rounded-3xl
                    items-center
                    justify-center
                  `}
                  to={dockElement.route}
                  onClick={dockElement.actionOnClick}>
                    {dockElement.icon}
                </Link>
                :
                <button
                  onClick={dockElement.actionOnClick}
                  className='relative rounded-3xl h-full w-full'>
                    {dockElement.icon}
                    {Boolean(dockElement.notificationNumber) &&
                    <Notification
                      notificationNumber={dockElement.notificationNumber}
                    />
                    }
                </button>
                }
            </li>
          )} */}
          {user.isLogged && <>
          <li
            className={`
              p-2
              flex
              rounded-full
              items-center
              bg-slate-300
              dark:bg-slate-800
              justify-center
              [&:not(:first-child)]:ml-2
            `}
          >
            <Link to={`/user/${user.info._id}/new`} className='relative'>
              <IconAdd className='text-green-500 text-3xl' />
            </Link>
          </li>
          {/* <li
            className={`
              p-2
              flex
              rounded-full
              items-center
              bg-slate-300
              dark:bg-slate-800
              justify-center
              [&:not(:first-child)]:ml-2
            `}
          >
            <button className='relative'
              onClick={() => console.warn('afficher la pages des favoris')}>
                <IconHeart className='text-pink-500 text-3xl' />
                {Boolean(numberOfFavoritesLiked) &&
                <Notification notificationNumber={numberOfFavoritesLiked} />
                }
            </button>
          </li>
          <li
            className={`
              p-2
              flex
              rounded-full
              items-center
              bg-slate-300
              dark:bg-slate-800
              justify-center
              [&:not(:first-child)]:ml-2
            `}
          >
            <button className='relative' onClick={() => console.warn('afficher la messagerie')}>
              <IconMessage className='text-blue-500 text-3xl' />
              {false &&
                <Notification notificationNumber={3} />
              }
            </button>
          </li> */}
          </>}
          {/* {!user.isLogged && <>
          <li
            className={`
              p-2
              flex
              rounded-full
              items-center
              bg-slate-300
              dark:bg-slate-800
              justify-center
              [&:not(:first-child)]:ml-2
            `}
          >
            <Link to='/user/register'>
              <IconUserPlus className='text-black dark:text-yellow-100 text-3xl' />
            </Link>
          </li>
          <li
            className={`
              py-2
              px-3
              flex
              rounded-full
              items-center
              bg-slate-300
              dark:bg-slate-800
              justify-center
              [&:not(:first-child)]:ml-2
            `}
          >
            <Link to='/user/login'>
              <IconKey className='text-yellow-300 text-2xl' />
            </Link>
          </li>
          </>} */}
          {/* className={`
            h-full
            w-full
            relative
            rounded-3xl
            after:top-1
            after:right-1
            after:text-xs
            after:absolute
            after:text-white
            after:rounded-full
            after:bg-red-500
            after:inline-block
            [&:not(:first-child)]:ml-1
            ${styleOf.minWidthNotification}
            after:content-['${numberOfFavoritesLiked}']
          `} */}
        </ul>
      </nav>
    </div>
  )
}

export default Layout
