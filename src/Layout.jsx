import {
  keyIcon,
  darkIcon,
  userIcon,
  cardIcon,
  plusIcon,
  wheelIcon,
  lightIcon,
  systemIcon,
  leftHandIcon,
  rightHandIcon,
  rowLayoutIcon,
  disconnectIcon,
  columnLayoutIcon
} from './constants/icons'
import { useState } from 'react'
import { config } from './config'
import { logoutUser } from './api/user'
import { Ul, Li } from './components/Ul'
import { Lien } from './components/Lien'
import styleOf from './Layout.module.scss'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { userIsLogout, userIsLogged } from './functions/user'
import logo3D from './images/logos/gitlab-5562373-4642718.png'
import logo from './images/logos/gitlab_tile_logo_icon_170092.png'
import { debounce } from 'lodash'
import FilterButton from './components/filter/FilterButton'
import FilterRadio from './components/filter/FilterRadio'
import FilterCheckbox from './components/filter/FilterCheckbox'
import FilterInput from './components/filter/FilterInput'
import IconSearch from './components/icons/IconSearch'
import IconFiltering from './components/icons/IconFiltering'
import IconCross from './components/icons/IconCross'
import IconHorizontalRule from './components/icons/IconHorizontalRule'

import { connect } from 'react-redux'

const filterElementsRadio = ['oui', 'non'],
      filterLocationPlaceholderElements = ['ville'],
      filterPricePlaceholderElements = ['min', 'max'],
      filterElementsCheckbox = ['1⭐️', '2⭐️', '3⭐️', '4⭐️', '5⭐️']

function Layout(props) {
  const navigate = useNavigate(),
        [error, setError] = useState(null),
        //[menu, setMenu] = useState(false),
        [search, setSearch] = useSearchParams(),
        [isMenuOpen, setIsMenuOpen] = useState(false),
        [isPriceFilterOpen, setIsPriceFilterOpen] = useState(false),
        [dbLocationIsOnline, setDbLocationIsOnline] = useState(false),
        [isLocationFilterOpen, setIsLocationFilterOpen] = useState(false),
        [isButtonFilterActive, setIsButtonFilterActive] = useState(true)

  // console.log('props.dataUser', props.dataUser)

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
    console.log('NEW CONFIG :')
    console.log(config.api_url)

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
    /* console.log('handleLogout')
    props.dataUser === undefined ? '/user/login' : '/logout'
    navigate("/", { state: { user: undefined } }) */
    let data = { _id : props.dataUser._id }
    logoutUser(data)
    .then(res => {
      /* console.log('RES (LAYOUT) :')
      console.log(res) */
      if (res.status === 200) {
        /* console.log('res.status === 200')
        window.localStorage.setItem("saas-token", res.token);
        let user = res.data.user
        console.log('user LoginPage', user)
        user.token = res.token
        dispatch(setUser(user))
        setRedirect(true);
        navigate("/", { state: { user: user } }); */

        // props.updateCorrectDataUser({})

        window.localStorage.removeItem('user')
        props.updateUser({})
        if(window.location.pathname !== '/') navigate('/')
      }
      else {
        console.log('res.msg')
        console.log(res.msg)
        setError(res.msg)
      }
    })
    .catch(err => {
      console.log('erreur: rentre dans le catch du Layout')
      console.log(err)
      // setError(err)
    })
  }

  function handleClickPriceFilter() {
    setIsPriceFilterOpen(!isPriceFilterOpen)
  }

  function handleClickMinOrMaxPriceFilter(e) {
    e.stopPropagation()
  }

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
    const searchInput = document.getElementById('searchInput')
    searchInput.value = ''
  }

  // if(props.dataUser) console.log('in layout',props.dataUser._id)

  return (
    <div className='min-h-screen dark:bg-slate-900'>
      <header
        className={`
          z-10
          px-6
          py-1.5
          w-full
          sticky
          top-0
          ${isButtonFilterActive ? 'dark:bg-slate-800 bg-slate-100' : ''}
        `}
      >
        <div
          className={`
            h-8
            flex
            justify-between
        `}>
          <div className='flex'>
            <Link to='/' className='contents'>
              <img src={logo} alt='logo' className='max-w-none h-full mr-6' />
            </Link>
            <div
              className={`
                flex
                px-2
                rounded-3xl
                items-center
                border-black
                dark:border-white
                ${isButtonFilterActive ?
                  'dark:bg-slate-800 border'
                  :
                  'dark:bg-slate-800 bg-slate-100'
                }
              `}
            >
              <IconSearch />
              <input
                type='text'
                id='searchInput'
                className={`
                  mx-2
                  w-full
                  text-black
                  dark:text-white
                  ${isButtonFilterActive ?
                    'dark:bg-slate-800 bg-slate-100'
                    :
                    'dark:bg-slate-800 bg-slate-100'
                  }
                `}
              />
              <button
                onClick={() => handleClickIconCross()}
              >
                <IconCross />
              </button>
            </div>
          </div>
          <div className='flex'>
            <button
              className={`
                ml-6
                px-1.5
                rounded-full
                dark:text-white
                dark:border-white
                ${isButtonFilterActive ?
                  'dark:bg-slate-800 bg-slate-100'
                  :
                  'dark:bg-slate-800 bg-white'}
                `}
              onClick={handleClickFilterButton}
            >
              <IconFiltering />
            </button>
          </div>
        </div>
        <div
          className={`
            flex
            flex-wrap
            justify-end
            dark:text-white
            ${isButtonFilterActive ? '' : 'hidden'}
          `}
        >
          {filterPricePlaceholderElements.length &&
            <FilterButton filterButtonName='Prix'>
              {filterPricePlaceholderElements.map((placeholder, index) =>
                <FilterInput
                  key={index}
                  type='number'
                  placeholder={placeholder}
                  handleChangeInput={handleChangePriceInput}
                />
              )}
            </FilterButton>
          }
          {filterLocationPlaceholderElements.length &&
            <FilterButton filterButtonName='Lieu'>
              {filterLocationPlaceholderElements.map((placeholder, index) =>
                <FilterInput
                  key={index}
                  type='text'
                  placeholder={placeholder}
                  handleChangeInput={handleChangeLocationInput}
                />
              )}
            </FilterButton>
          }
          {filterElementsRadio.length &&
            <FilterButton filterButtonName='Super user'>
              {filterElementsRadio.map((radioName, index) =>
                <FilterRadio
                  key={index}
                  radioName={radioName}
                  groupName='superUserRadioGroup'
                />
              )}
            </FilterButton>
          }
          {filterElementsCheckbox.length &&
            <FilterButton filterButtonName='Notes'>
              {filterElementsCheckbox.map((checkboxName, index) =>
                <FilterCheckbox
                  key={index}
                  checkboxName={checkboxName}
                  groupName='ratingCheckboxGroup'
                />
              )}
            </FilterButton>
          }
          {filterElementsRadio.length &&
            <FilterButton filterButtonName='Photos'>
              {filterElementsRadio.map((radioName, index) =>
                <FilterRadio
                  key={index}
                  radioName={radioName}
                  groupName='photoRadioGroup'
                />
              )}
            </FilterButton>
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
        </div>
        <div
          className={`
            h-4
            flex
            items-center
            justify-center
            overflow-hidden
            ${isButtonFilterActive ? '' : 'hidden'}
          `}
        >
          <IconHorizontalRule />
        </div>
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
      <main className='min-h-screen pt-6'>
        {props.children}
        <nav
          className={`
            p-2
            w-12
            z-10
            fixed
            bg-white
            bottom-4
            shadow-2xl
            rounded-full
            dark:bg-black
            ${props.rightHand ? 'justify-end right-4' : 'left-4'}
          `}
        >
          <ul>
            {isMenuOpen &&
              <>  
                <li
                  className={`
                    flex
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
                </li>
                <li
                  className={`
                    my-2
                    flex
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
                  <button onClick={() => props.toggleHand()}>
                    {props.rightHand ? leftHandIcon : rightHandIcon}
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
                  <button onClick={e => props.toggleTheme(e.target.innerText)}>
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
                  <button onClick={e => props.toggleTheme(e.target.innerText)}>
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
                  <button onClick={e => props.toggleTheme(e.target.innerText)}>
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
                    <Link to='user/login'>{keyIcon}</Link>
                    :
                    <button onClick={() => handleLogout()}>
                      {disconnectIcon}
                    </button>
                  }
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
                  <Link
                    to={userIsLogout(props.dataUser) ?
                      '/user/register'
                      :
                      `/user/${props.dataUser._id}`
                    }
                  >
                    {userIcon}
                  </Link>
                </li>
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
                      to={`/user/${props.dataUser._id}/new`}
                      onClick={() => props.handleAuthorizedToAdd()}
                    >
                      {plusIcon}
                    </Link>
                  </li>
                }
              </>
            }
            <li
              onClick={() => setIsMenuOpen(!isMenuOpen)}
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
              <button>
                {wheelIcon}
              </button>
            </li>
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
      </main>
      <footer className='p-6 text-center dark:bg-slate-900 dark:text-white'>© 2023 serve.ac</footer>

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

export default connect(mapStateToProps)(Layout)

