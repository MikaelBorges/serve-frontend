import Layout from './Layout'
import HomePage from './pages/HomePage'
import './assets/fonts/Gilroy/gilroy.css'
import LoginPage from './pages/LoginPage'
import NewAdPage from './pages/NewAdPage'
import ViewAdPage from './pages/ViewAdPage'
import ProfilPage from './pages/ProfilPage'
import { useState, useEffect } from 'react'
import RegisterPage from './pages/RegisterPage'
import RequireAuth from './helpers/RequireAuth'
import UserSettings from './pages/UserSettings'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { lightIcon, darkIcon, systemIcon } from './constants/icons'
import ModifyAdPage from './pages/ModifyAdPage'

import './swiper-custom.scss'

function App() {

  const navigate = useNavigate()

  const [theme, setTheme] = useState('light')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [clickedAd, setClickedAd] = useState({})
  const [darkMode, setDarkMode] = useState(false)
  const [locationTyped, setLocationTyped] = useState('')
  const [focusOnSearchBar, setFocusOnSearchBar] = useState(false)
  const [areCardsVertical, setAreCardsVertical] = useState(false)
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(null)

  const handleFocusOnSearchBar = (focus) => {
    setFocusOnSearchBar(focus)
  }

  const handleSearchBarVisibility = (visibility) => {
    setIsSearchBarVisible(visibility)
  }

  const handleAreCardsVertical = () => {
    if(!areCardsVertical) window.localStorage.setItem('areCardsVertical', true)
    else window.localStorage.removeItem('areCardsVertical')
    setAreCardsVertical(!areCardsVertical)
  }

  const updateClickedAd = (ad) => {
    setClickedAd(ad)
  }

  const resetClickedAd = () => {
    setClickedAd({})
  }

  const toggleTheme = (themeSelected) => {
    switch(themeSelected) {
      case lightIcon:
        setTheme('light');
        localStorage.theme = 'light';
        setDarkMode(false);
        document.documentElement.classList.remove('dark');
        break;
      case darkIcon:
        setTheme('dark');
        localStorage.theme = 'dark';
        setDarkMode(true);
        document.documentElement.classList.add('dark');
        break;
      case systemIcon:
        setTheme('system');
        localStorage.removeItem('theme');
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
          setDarkMode(true);
          document.documentElement.classList.add('dark');
        }
        else {
          setDarkMode(false);
          document.documentElement.classList.remove('dark');
        }
        break;
      default:
        console.error('Problème dans la sélection du thème');
    }
  }

  /* const toggleAddToFavorites = (adId) => {
    const ad = {
      adId: adId,
      userId: dataUser._id
    }
    addToFavorites(ad)
    .then(res => {
      if(res.status === 200) {
        setClickedAd({adId: adId, newFavNumber: res.data.newFavNumber})

        const dataUserCalc = {...dataUser}
        //console.log('adId', adId)
        const index = dataUserCalc.favorites.indexOf(adId)
        //console.log('index', index)

        if (index > -1) {
          //console.log('trouvé on le supprime')
          dataUserCalc.favorites.splice(index, 1)
        }
        else {
          //console.log("pas trouvé on l'ajoute")
          dataUserCalc.favorites.push(adId)
        }

        // console.log('dataUserCalc', dataUserCalc)
        // setDataUser(dataUserCalc)

        window.localStorage.setItem('dataUser', JSON.stringify(dataUserCalc))

      }
    })
    .catch(err => console.warn(err))
  } */

  /* const handleAddToFavorites = (e, ad) => {
    e.stopPropagation()

    const token = window.localStorage.getItem('serve-token')

     console.log('pourquoi on arrive ici ?')

    if(token) {
      console.log('loggué, et autorisé à aller plus loin')
      if(dataUser._id !== ad.userId) {
        toggleAddToFavorites(ad._id)
      }
    }
    else {
      console.log('veuillez vous reconnecter pour utiliser cette fonctionnalité')
      window.localStorage.removeItem('redux')
      window.localStorage.removeItem('dataUser')
      props.logoutUserAction()
      updateUser({})
      //navigate('/user/login')
    }
  } */

  const changeLocationTyped = (locationTyped) => {
    setLocationTyped(locationTyped)
  }




  useEffect(() => {
    /* const areCardsVertical = window.localStorage.getItem('areCardsVertical')
    if(areCardsVertical) setAreCardsVertical(true) */

    // Info > On page load or when changing themes, best to add inline in `head` to avoid FOUC
    if(localStorage.theme) {
      if(localStorage.theme === 'light') {
        setTheme('light')
        document.documentElement.classList.remove('dark')
        setDarkMode(false)
      }
      if(localStorage.theme === 'dark') {
        setTheme('dark')
        document.documentElement.classList.add('dark')
        setDarkMode(true)
      }
    }
    else {
      setTheme('system')
      if(window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark')
        setDarkMode(true)
      }
      else {
        document.documentElement.classList.remove('dark')
        setDarkMode(false)
      }
    }

    const mql = window.matchMedia('(prefers-color-scheme: dark)')
    mql.onchange = e => {
      if (!localStorage.theme) {
        setTheme('system')
        if (e.matches) {
          document.documentElement.classList.add('dark')
          setDarkMode(true)
        }
        else {
          document.documentElement.classList.remove('dark')
          setDarkMode(false)
        }
      }
    }



    /* const parseJwt = (token) => {
      var base64Url = token.split('.')[1];
      var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      return JSON.parse(jsonPayload);
    }
    const token = window.localStorage.getItem('serve-token')
    const parsedJwt = parseJwt(token)
    console.log('parsedJwt', parsedJwt) */



    /* if(token) {
      console.warn('connecté')
      const userDataInLS = window.localStorage.getItem('dataUser')
      if (userDataInLS) {
        setDataUser(JSON.parse(userDataInLS))
        console.log('dataUser a été hydraté par le local storage')
      }
      else console.log("dataUser n'a pas pu être hydraté")
    }
    else {
      console.warn('déconnecté')
      window.localStorage.removeItem('redux')
      window.localStorage.removeItem('dataUser')
      props.logoutUserAction()
      updateUser({})
    } */


  }, []);


  return (
    <Layout
      theme={theme}
      darkMode={darkMode}
      toggleTheme={toggleTheme}
      focusOnSearchBar={focusOnSearchBar}
      isSearchBarVisible={isSearchBarVisible}
      changeLocationTyped={changeLocationTyped}
      handleFocusOnSearchBar={handleFocusOnSearchBar}
      handleAreCardsVertical={handleAreCardsVertical}
    >
      <Routes>
        <Route
          exact
          path='/'
          element={
            <HomePage
              minPrice={minPrice}
              maxPrice={maxPrice}
              darkMode={darkMode}
              clickedAd={clickedAd}
              locationTyped={locationTyped}
              resetClickedAd={resetClickedAd}
              updateClickedAd={updateClickedAd}
              areCardsVertical={areCardsVertical}
              handleFocusOnSearchBar={handleFocusOnSearchBar}
              handleSearchBarVisibility={handleSearchBarVisibility}
            />
          }
        />
        <Route
          exact
          path='/user/login'
          element={
            <LoginPage
              darkMode={darkMode}
            />
          }
        />
        <Route
          exact
          path='/user/register'
          element={
            <RegisterPage
              darkMode={darkMode}
            />
          }
        />
        <Route
          exact
          path='/user/:urlId'
          element={
            <ProfilPage
              darkMode={darkMode}
              clickedAd={clickedAd}
              resetClickedAd={resetClickedAd}
              updateClickedAd={updateClickedAd}
              areCardsVertical={areCardsVertical}
              handleSearchBarVisibility={handleSearchBarVisibility}
            />
          }
        />
        <Route
          exact
          path='/user/:urlId/settings'
          element={
            <RequireAuth
              auth={true}
              child={UserSettings}
              handleSearchBarVisibility={handleSearchBarVisibility}
            />
          }
        />
        <Route
          exact
          path='/user/:urlId/new'
          element={
            <NewAdPage
              darkMode={darkMode}
              handleSearchBarVisibility={handleSearchBarVisibility}
            />
          }
        />
        <Route
          exact
          path='/ad/:urlId/edit'
          element={<ModifyAdPage />}
        />
        <Route
          exact
          path='/ad/:urlId'
          element={<ViewAdPage handleSearchBarVisibility={handleSearchBarVisibility} />}
        />
      </Routes>
    </Layout>
  );
}

export default App
