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
import { connect } from 'react-redux'
import { logoutUser } from './api/user'
import { useState, useRef } from 'react'
import styleOf from './Layout.module.scss'
import IconKey from './components/icons/IconKey'
import IconAdd from './components/icons/IconAdd'
import PictureUser from './components/PictureUser'
import IconHeart from './components/icons/IconHeart'
import Notification from './components/Notification'
import IconCross from './components/icons/IconCross'
import IconMessage from './components/icons/IconMessage'
import IconAccount from './components/icons/IconAccount'
import IconUserPlus from './components/icons/IconUserPlus'
import IconFilter from './components/icons/IconFilter'
import logoRoundLight from './assets/images/logos/square.png'
import { logoutUserAction } from './actions/user/userActions'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import logoRoundDark from './assets/images/logos/gitlab-discovery-logo.png'
import defaultProfile from './assets/images/defaultProfile/default-m-818bf2b20d4b06a052dd..svg'

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
  user,
  children,
  darkMode,
  toggleTheme,
  logoutUserAction,
  focusOnSearchBar,
  isSearchBarVisible,
  handleFocusOnSearchBar,
  handleAreCardsVertical
}) {
  const navigate = useNavigate()
  const searchInputRef = useRef(null)
  //const locationInputRef = useRef(null)
  const [error, setError] = useState(null)
  const [search, setSearch] = useSearchParams()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  //const [resetAllFilters, setResetAllFilters] = useState(false)
  const [isButtonFilterActive, setIsButtonFilterActive] = useState(false)

  //const numberOfMessagesUnread = user.isLogged ? 2 : ''
  const numberOfFavoritesLiked = user.isLogged ? user.info.favorites.length : null
  //const numberOfFavoritesLiked = null

  const dockElements = [
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
  ]

  /* const inputsReseted = () => {
    setResetAllFilters(false)
  } */

  const handleLogout = () => {
    let data = { _id : user.info._id }
    logoutUser(data)
    .then(res => {
      if (res.status === 200) {
        window.localStorage.removeItem('redux')
        window.localStorage.removeItem('serve-token')
        logoutUserAction()
        if(window.location.pathname !== '/') navigate('/')
      }
      else {
        setError(res.msg)
      }
    })
    .catch(err => {
      console.warn('erreur: rentre dans le catch du Layout')
      console.warn(err)
      // setError(err)
    })
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

  /* const handleClickFilterButton = () => {
    setIsButtonFilterActive(!isButtonFilterActive)
  } */

  const handleClickIconCross = () => {
    searchInputRef.current.value = ''
    searchInputRef.current.focus()
    search.delete('title')
    setSearch(search)
    console.warn('texte effacé')
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
          z-10
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
          `}
        >
          <Link to='/' className='contents'>
            <img
              alt='logo'
              className='max-w-none h-full'
              src={darkMode ? logoRoundDark : logoRoundLight}
            />
          </Link>
          <div
            className={`
              mx-3
              flex
              w-full
              border
              bg-white
              rounded-3xl
              items-center
              border-transparent
              dark:bg-slate-800
              ${darkMode ? '' : styleOf.biggerShadow}
              ${focusOnSearchBar ? 'absolute left-0 right-0 top-0 mx-0 z-20 h-full' : 'relative'}
              ${isSearchBarVisible ? '' : 'hidden'}
            `}>
            <button
              className={`
                p-1
                flex
                h-full
                rounded-full
                items-center
                aspect-square
                justify-center
                dark:text-white
                dark:bg-slate-700
                ${isButtonFilterActive ? 'bg-slate-200' : ''}
                ${!isButtonFilterActive && !darkMode ? styleOf.biggerShadow : ''}
              `}
              //onClick={handleClickFilterButton}
            >
              <IconFilter />
            </button>
            <input
              autoFocus
              type='text'
              id='searchInput'
              className={`
                mx-2
                w-full
                bg-white
                text-black
                dark:text-white
                placeholder:italic
                focus:outline-none
                dark:bg-slate-800
                placeholder:text-sm
              `}
              ref={searchInputRef}
              placeholder='recherchez'
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
                dark:bg-slate-700
                justify-center
                ${darkMode ? '' : styleOf.biggerShadow}
              `}>
              <IconCross />
            </button>
          </div>
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
                  <PictureUser
                    imageUser={user.info.imageUser ?
                      user.info.imageUser
                      :
                      defaultProfile
                    }
                  />
                  :
                  <IconAccount />
                  }
                </button>
              </li>
              {isMenuOpen &&
              <>
                {/* <li
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
                </li> */}
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
                {false &&
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
                }
              </>
              }
            </ul>
          </nav>
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
            ${!isSearchBarVisible || !isButtonFilterActive ? 'hidden' : ''}
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
        onClick={() => handleFocusOnSearchBar(false)}
        className={`
          ${styleOf.blurTransition}
          ${focusOnSearchBar ? 'relative blur-2xl' : ''}
        `}>
        {focusOnSearchBar &&
        <div className='absolute top-0 bottom-0 left-0 right-0'></div>
        }
        <main className='min-h-[calc(100vh-12rem)]'>
          {children}
        </main>
        <footer
          className={`
            pt-6
            pb-20
            text-center
            dark:text-white
            dark:bg-slate-900
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
          </li>
          </>}
          {!user.isLogged && <>
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
          </>}
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

const mapStateToProps = (store) => {
  return {
    user: store.user
  }
}

const mapDispatchToProps = {
  logoutUserAction
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout)
