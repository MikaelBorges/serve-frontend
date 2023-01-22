import {
  keyIcon,
  darkIcon,
  userIcon,
  cardIcon,
  plusIcon,
  heartIcon,
  wheelIcon,
  lightIcon,
  systemIcon,
  messageIcon,
  leftHandIcon,
  rightHandIcon,
  rowLayoutIcon,
  disconnectIcon,
  columnLayoutIcon
} from './constants/icons'
import { useState, useRef } from 'react'
import { config } from './config'
import { logoutUser } from './api/user'
import { Ul, Li } from './components/tests-components/Ul'
import { Lien } from './components/tests-components/Lien'
import styleOf from './Layout.module.scss'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { userIsLogout, userIsLogged } from './functions/user'
import logo3D from './assets/images/logos/gitlab-5562373-4642718.png'
import logoRoundDark from './assets/images/logos/gitlab-discovery-logo.png'
import logoRoundLight from './assets/images/logos/square.png'
import logo from './assets/images/logos/gitlab_tile_logo_icon_170092.png'
import { debounce } from 'lodash'
import FilterButton from './components/filter/FilterButton'
import FilterRadio from './components/filter/FilterRadio'
import FilterCheckbox from './components/filter/FilterCheckbox'
import FilterInput from './components/filter/FilterInput'
import IconSearch from './components/icons/IconSearch'
import IconFiltering from './components/icons/IconFiltering'
import IconCross from './components/icons/IconCross'
import IconHorizontalRule from './components/icons/IconHorizontalRule'
import PictureUser from './components/PictureUser'
import defaultProfile from './assets/images/defaultProfile/default-m-818bf2b20d4b06a052dd..svg'

import { connect } from 'react-redux'
import { logoutUserAction } from './actions/user/userActions'

const filterElementsRadio = []
//const filterElementsRadio = ['oui', 'non']
const filterLocationPlaceholderElements = ['ville']
const filterPricePlaceholderElements = ['min', 'max']
//const filterElementsCheckbox = ['1⭐️', '2⭐️', '3⭐️', '4⭐️', '5⭐️']
const filterElementsCheckbox = []

function Layout(props) {
  const inputRef = useRef(null)
  const navigate = useNavigate(),
        [error, setError] = useState(null),
        // [menu, setMenu] = useState(false),
        [search, setSearch] = useSearchParams(),
        [isFocused, setIsFocused] = useState(false),
        [isMenuOpen, setIsMenuOpen] = useState(false),
        // [isPriceFilterOpen, setIsPriceFilterOpen] = useState(false),
        [dbLocationIsOnline, setDbLocationIsOnline] = useState(false),
        [isButtonFilterActive, setIsButtonFilterActive] = useState(true),
        [isLocationFilterOpen, setIsLocationFilterOpen] = useState(false)

  /* function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  }

  const token = window.localStorage.getItem("serve-token")
  if(token) {
    const parsedJwt = parseJwt(token)
    console.warn('parsed jwt', parsedJwt)
  } */

  // console.warn('props.dataUser', props.dataUser)

  /* function handleDbLocationIsOnline() {
    if(goOnline) {
      changeConfig('https://mikaelborges-serve.herokuapp.com')
      setDbLocationIsOnline(goOnline)
    }
    else {
      changeConfig('http://localhost:3306')
      setDbLocationIsOnline(!goOnline)
    }

    setDbLocationIsOnline(goOnline)
    console.warn('NEW CONFIG :')
    console.warn(config.api_url)

    props.displayUser()
  } */

  /* function initState () {
    if (config.api_url === 'http://localhost:3306') {
      return false
    }
    else {
      return true
    }
  } */

  /* function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  } */

  let themeButtonIcon
  switch(props.theme) {
    case 'light':
      themeButtonIcon = lightIcon
      break
    case 'dark':
      themeButtonIcon = darkIcon
      break
    case 'system':
      themeButtonIcon = systemIcon
      break
    default:
      console.error("Problème dans props.theme et du coup dans le state theme de l'app")
  }

  function handleLogout() {
    /* console.warn('handleLogout')
    props.dataUser === undefined ? '/user/login' : '/logout'
    navigate("/", { state: { user: undefined } }) */
    let data = { _id : props.dataUser._id }
    logoutUser(data)
    .then(res => {
      if (res.status === 200) {
        console.warn('RES (LAYOUT) :', res.data.message)

        /* console.warn('res.status === 200')
        window.localStorage.setItem("saas-token", res.token);
        let user = res.data.user
        console.warn('user LoginPage', user)
        user.token = res.token
        dispatch(setUser(user))
        setRedirect(true);
        navigate("/", { state: { user: user } }); */

        // props.updateCorrectDataUser({})

        window.localStorage.removeItem('user')
        window.localStorage.removeItem('serve-token')

        props.logoutUserAction()

        props.updateUser({})
        if(window.location.pathname !== '/') navigate('/')
      }
      else {
        console.warn('res.msg')
        console.warn(res.msg)
        setError(res.msg)
      }
    })
    .catch(err => {
      console.warn('erreur: rentre dans le catch du Layout')
      console.warn(err)
      // setError(err)
    })
  }

  /* function handleClickPriceFilter() {
    setIsPriceFilterOpen(!isPriceFilterOpen)
  }

  function handleClickMinOrMaxPriceFilter(e) {
    e.stopPropagation()
  } */

  /* function handleChangeMinPriceFilter(e) {
    const price = e.target.value
    if (price.length) search.set('minPrice', price)
    else search.delete('minPrice')
    setSearch(search)

    props.changeMinPrice(e.target.value)
  } */

  function handleChangePriceInput(e) {
    const name = e.target.name,
          price = e.target.value

    if (price.length) {
      if(name === 'min') {
        search.set('minPrice', price)
      } else {
        search.set('maxPrice', price)
      }
    } else {
      if(name === 'min') {
        search.delete('minPrice')
      } else {
        search.delete('maxPrice')
      }
    }

    setSearch(search)
  }

  /* function handleChangeMaxPriceFilter(e) {
    const price = e.target.value
    if (price.length) search.set('maxPrice', price)
    else search.delete('maxPrice')
    setSearch(search)

    props.changeMaxPrice(e.target.value)
  } */

  /* function handleClickLocationFilter() {
    setIsLocationFilterOpen(!isLocationFilterOpen)
  } */

  /* function handleClickLocationInput(e) {
    e.stopPropagation()
  } */

  function handleChangeLocationInput(e) {
    const text = e.target.value
    if (text.length) search.set('location', text)
    else search.delete('location')
    setSearch(search)
    //setSearch(search, { replace: true })
    //navigate(`/?location=${e.target.value}`)

    //props.changeLocationTyped(e.target.value)
  }

  function handleClickFilterButton() {
    setIsButtonFilterActive(!isButtonFilterActive)
  }

  function handleClickIconCross() {
    inputRef.current.value = ''
  }

  function handleBlur() {
    setIsFocused(false)
  }

  // if(props.dataUser) console.warn('in layout',props.dataUser._id)

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
        //${isButtonFilterActive ? 'dark:bg-slate-800 bg-slate-100' : ''}
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
            <img src={props.darkMode ? logoRoundDark : logoRoundLight} alt='logo' className='max-w-none h-full' />
          </Link>
          <div
            className={`
              mx-3
              flex
              px-2
              w-full
              border
              bg-white
              rounded-3xl
              items-center
              border-transparent
              dark:bg-slate-800
              ${props.darkMode ? '' : styleOf.biggerShadow}
              ${isFocused ? 'absolute left-0 mx-0 z-30 h-full' : ''}
            `}
          >
            <button
              className={`
                p-1
                rounded-full
                dark:text-white
                dark:bg-slate-700
                ${isButtonFilterActive ? 'bg-slate-200' : ''}
                ${!isButtonFilterActive && !props.darkMode ? styleOf.biggerShadow : ''}
              `}
              onClick={handleClickFilterButton}
            >
              <IconFiltering />
            </button>
            <input
              type='text'
              ref={inputRef}
              id='searchInput'
              className={`
                mx-2
                w-full
                bg-white
                text-black
                dark:text-white
                placeholder:italic
                dark:bg-slate-800
                placeholder:text-sm
              `}
              placeholder='recherchez'
              //onFocus={() => setIsFocused(true)}
              onBlur={handleBlur}
            />
            <button
              onClick={handleClickIconCross}
            >
              <IconCross />
            </button>
          </div>
          {/* <button
            className={`
              px-2
              mr-2.5
              bg-white
              rounded-full
              dark:text-white
              dark:bg-slate-800
              ${props.darkMode ? '' : styleOf.biggerShadow}
            `}
            onClick={handleClickFilterButton}
          >
            <IconFiltering />
          </button> */}
          <nav className={`aspect-square ${isFocused ? 'blur-2xl' : ''}`}>
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
                `}
              >
                <button
                  className='rounded-3xl h-full w-full'
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  <PictureUser
                    layoutOneColumn={props.layoutOneColumn}
                    imageUser={props.dataUser._id ?
                      props.dataUser.imageUser
                      :
                      defaultProfile
                    }
                  />
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
                      onClick={e => props.toggleTheme(e.target.innerText)}
                    >
                      {lightIcon}
                    </button>
                  </li>
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
                      onClick={e => props.toggleTheme(e.target.innerText)}
                    >
                      {darkIcon}
                    </button>
                  </li>
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
                      onClick={e => props.toggleTheme(e.target.innerText)}
                    >
                      {systemIcon}
                    </button>
                  </li>
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
                    {userIsLogout(props.dataUser) ?
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
                        {keyIcon}
                      </Link>
                      :
                      <button
                        className='rounded-3xl h-full w-full'
                        onClick={() => handleLogout()}
                      >
                        {disconnectIcon}
                      </button>
                    }
                  </li>
                  {userIsLogged(props.dataUser) &&
                    <li
                      className={`
                        mt-2
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
                        onClick={() => console.warn('afficher la page settings user')}
                      >
                        {wheelIcon}
                      </button>
                    </li>
                }
                
                  {userIsLogged(props.dataUser) &&
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
                      <Link
                        className={`
                          flex
                          h-full
                          w-full
                          rounded-3xl
                          items-center
                          justify-center
                        `}
                        to={`/user/${props.dataUser._id}/new`}
                        onClick={() => props.handleAuthorizedToAdd()}
                      >
                        {plusIcon}
                      </Link>
                    </li>
                  }
                  <li
                    className={`
                      mt-2
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
                      to={userIsLogout(props.dataUser) ?
                        '/user/register'
                        :
                        `/user/${props.dataUser._id}`
                      }
                    >
                      {userIcon}
                    </Link>
                  </li>
                </>
              }
            </ul>
            {/* {menu &&
            <Ul className='dark:text-white text-black'>
              <Li>
                <Lien
                  url={'/projects'}
                  target='_self'
                  className={`
                    hover:bg-slate-100
                    dark:bg-slate-1000
                    hover:dark:bg-black
                    dark:border-white
                    dark:border
                    hover:dark:border-pink-600
                    hover:dark:text-pink-600
                    rounded-full
                    focus:outline-none
                    p-4
                    shadow-xl
                  `}
                  // className={`
                    // block
                    // w-fit
                    // shadow-xl
                  // `}
                >
                  Projets
                </Lien>
              </Li>
              <Li className='text-gray-400'>
                Contact
              </Li>
              <Li className='text-gray-400'>
                À propos
              </Li>
            </Ul>
          } */}
          </nav>
        </div>
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
            rounded-3xl
            dark:text-white
            ${props.darkMode ? '' : styleOf.biggerShadow}
            ${isButtonFilterActive ? 'dark:bg-slate-800 bg-white' : 'hidden'}
            ${isMenuOpen && !isFocused ? styleOf.reducedWidthFilters : ''}
          `}
        >
          {Boolean(filterPricePlaceholderElements.length) &&
            <li className='mr-3'>
              <FilterButton statusFilter={true} filterButtonName='Prix'>
                {filterPricePlaceholderElements.map((placeholder, index) =>
                  <FilterInput
                    key={index}
                    type='number'
                    placeholder={placeholder}
                    handleChangeInput={handleChangePriceInput}
                  />
                )}
              </FilterButton>
            </li>
          }
          {Boolean(filterLocationPlaceholderElements.length) &&
            <li>
              <FilterButton statusFilter={true} filterButtonName='Lieu'>
                {filterLocationPlaceholderElements.map((placeholder, index) =>
                  <FilterInput
                    key={index}
                    type='text'
                    placeholder={placeholder}
                    handleChangeInput={handleChangeLocationInput}
                  />
                )}
              </FilterButton>
            </li>
          }
          {Boolean(filterElementsRadio.length) &&
            <li>
              <FilterButton statusFilter={false} filterButtonName='Super user'>
                {filterElementsRadio.map((radioName, index) =>
                  <FilterRadio
                    key={index}
                    radioName={radioName}
                    groupName='superUserRadioGroup'
                  />
                )}
              </FilterButton>
            </li>
          }
          {Boolean(filterElementsCheckbox.length) &&
            <li>
              <FilterButton statusFilter={false} filterButtonName='Notes'>
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
          {Boolean(filterElementsRadio.length) &&
            <li>
              <FilterButton statusFilter={false} filterButtonName='Photos'>
                {filterElementsRadio.map((radioName, index) =>
                  <FilterRadio
                    key={index}
                    radioName={radioName}
                    groupName='photoRadioGroup'
                  />
                )}
              </FilterButton>
            </li>
          }
          {/* <span
            className={`
              px-1
              ml-1
              rounded-full
              bg-orange-400
              ${styleOf.filtersNb}
            `}
          >
            2
          </span> */}
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
        {/* {config.api_url === 'http://localhost:3306' && (
          <div className=''>
            <button
              className={`
                bg-white
                px-4
                rounded-full
                shadow-xl

                dark:text-yellow-100
                dark:bg-black
              `}
              onClick={handleDbLocationIsOnline}
            >
              {dbLocationIsOnline ? 'online' : 'local'}
            </button>
          </div>
        )} */}

      </header>
      <main
        className={`
          pt-3
          min-h-screen
          ${isFocused ? 'blur-2xl' : ''}
        `}
      >
        {props.children}
      </main>
      <nav
        className={`
          flex
          z-10
          fixed
          w-fit
          m-auto
          left-3
          right-3
          bottom-3
          justify-center
          ${props.rightHand ? '' : ''}
        `}
      >
        <ul
          className={`
            p-1
            h-10
            flex
            w-fit
            bg-white
            rounded-full
            dark:bg-black
            ${styleOf.biggerShadow}
          `}
        >

          {/* <li
            className={`
              hidden
              rounded-full
              items-center
              aspect-square
              justify-center
            `}
          >
            <button
              disabled={props.layoutOneColumn ? false : true}
              onClick={() => props.toggleDirectionCard('toggle')}
            >
              {cardIcon}
            </button>
          </li> */}
          {/* <li
            className={`
              my-2
              hidden
              rounded-full
              items-center
              aspect-square
              justify-center
            `}
          >
            <button
              disabled={true}
              onClick={() => props.toggleLayout('toggle')}
            >
              {props.layoutOneColumn ? rowLayoutIcon : columnLayoutIcon}
            </button>
          </li> */}
          {/* <li
            className={`
              my-2
              hidden
              rounded-full
              items-center
              aspect-square
              bg-slate-200
              cursor-pointer
              justify-center
              dark:bg-slate-400
            `}
          >
            <button onClick={() => props.toggleHand()}>
              {props.rightHand ? leftHandIcon : rightHandIcon}
            </button>
          </li> */}
          {/* <li
            className={`
              w-8
              mr-1
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
              onClick={e => props.toggleTheme(e.target.innerText)}
            >
              {lightIcon}
            </button>
          </li> */}
          {/* <li
            className={`
              w-8
              mx-1
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
              onClick={e => props.toggleTheme(e.target.innerText)}
            >
              {darkIcon}
            </button>
          </li> */}
          {/* <li
            className={`
              w-8
              mx-1
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
              onClick={e => props.toggleTheme(e.target.innerText)}
            >
              {systemIcon}
            </button>
          </li> */}
          {/* <li
            className={`
              w-8
              mr-1
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
            {userIsLogout(props.dataUser) ?
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
                {keyIcon}
              </Link>
              :
              <button 
                className='rounded-3xl h-full w-full'
                onClick={() => handleLogout()}
              >
                {disconnectIcon}
              </button>
            }
          </li> */}
          <li
            className={`
              w-8
              mr-1
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
              to={userIsLogout(props.dataUser) ?
                '/user/register'
                :
                `/user/${props.dataUser._id}`
              }
            >
              {userIcon}
            </Link>
          </li>
          <li
            className={`
              w-8
              ml-1
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
              onClick={() => console.warn('afficher la page des favoris')}
            >
              {heartIcon}
            </button>
          </li>
          <li
            className={`
              w-8
              ml-1
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
              onClick={() => console.warn('afficher la messagerie')}
            >
              {messageIcon}
            </button>
          </li>
        </ul>
      </nav>
      <footer
        className={`
          pt-6
          pb-16
          text-center
          dark:text-white
          dark:bg-slate-900
          ${isFocused ? 'blur-2xl' : ''}
        `}
      >
        © 2023 serve.ac
      </footer>

      {/* <footer className="m-1 6 text-center">
        {footerLists.map((footerList, index) =>
          <FooterList footerList={footerList} key={index} />
        )}
      </footer> */}

    </div>
  );
}

const mapStateToProps = (store) => {
  return {
    userInfo: store.user
  }
}

const mapDispatchToProps = {
  logoutUserAction
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout)
//export default Layout
