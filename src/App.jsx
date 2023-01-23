import Layout from './Layout'
import { connect } from 'react-redux'
import HomePage from './pages/HomePage'
import './assets/fonts/Gilroy/gilroy.css'
import LoginPage from './pages/LoginPage'
import NewAdPage from './pages/NewAdPage'
import ProfilPage from './pages/ProfilPage'
import { addToFavorites } from './api/user'
import { useState, useEffect } from 'react'
import RegisterPage from './pages/RegisterPage'
import RequireAuth from './helpers/RequireAuth'
import UserSettings from './pages/UserSettings'
import { userIsLogout } from './functions/user'
import { Route, Routes, useLocation } from 'react-router-dom'
import { lightIcon, darkIcon, systemIcon } from './constants/icons'

function App() {
  const [userId, setUserId] = useState('')
  const [theme, setTheme] = useState('light')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [dataUser, setDataUser] = useState({})
  const [clickedAd, setClickedAd] = useState({})
  const [darkMode, setDarkMode] = useState(false)
  const [rightHand, setRightHand] = useState(true)
  const [locationTyped, setLocationTyped] = useState('')
  const [horizontalCard, setHorizontalCard] = useState(false)
  const [layoutOneColumn, setLayoutOneColumn] = useState(false)
  const [authorizedToAdd, setAuthorizedToAdd] = useState(false)
  const [areCardsVertical, setAreCardsVertical] = useState(false)

  const handleAreCardsVertical = () => {
    setAreCardsVertical(!areCardsVertical)
  }

  const resetClickedAd = () => {
    setClickedAd({})
  }

  const toggleDirectionCard = (horizontalDirection) => {
    window.localStorage.setItem('horizontalCard', !horizontalCard)
    switch(horizontalDirection) {
      case 'toggle':
        setHorizontalCard(!horizontalCard)
        break
      case true:
        setHorizontalCard(true)
        break
      case false:
        setHorizontalCard(false)
        break
      default:
        console.error('Problème dans la sélection du style des annonces');
    }
  }

  const toggleLayout = (layoutSelected) => {
    switch(layoutSelected) {
      case 'toggle':
        setLayoutOneColumn(!layoutOneColumn)
        window.localStorage.setItem('layoutOneColumn', !layoutOneColumn)
        break
      case true:
        setLayoutOneColumn(true)
        break
      case false:
        setLayoutOneColumn(false)
        break
      default:
        console.error("Problème dans la sélection du layout de l'app");
    }
  }

  const toggleHand = () => {
    setRightHand(!rightHand)
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

  const updateUser = (data) => {
    setDataUser(data)
  }

  const handleAuthorizedToAdd = () => {
    setAuthorizedToAdd(true)
  }

  const checkIfAddToFavorites = (adId) => {
    const ad = {
      adId: adId,
      userId: dataUser._id,
    }
    addToFavorites(ad)
    .then(res => {
      if(res.status === 200) {
        setClickedAd({adId: adId, newFavNumber: res.data.newFavNumber})
      }
    })
    .catch(err => console.warn(err))
  }

  const handleAddToFavorites = (e, ad) => {
    e.stopPropagation()

    if(!userIsLogout(dataUser) && (dataUser._id !== ad.userId)) {
      checkIfAddToFavorites(ad._id)
    }
  }

  const changeMinPrice = (minPrice) => {
    setMinPrice(minPrice)
  }

  const changeMaxPrice = (maxPrice) => {
    setMaxPrice(maxPrice)
  }

  const changeLocationTyped = (locationTyped) => {
    setLocationTyped(locationTyped)
  }

  useEffect(() => {
    const horizontalCardInLS = window.localStorage.getItem('horizontalCard')
    const layoutOneColumnInLS = window.localStorage.getItem('layoutOneColumn')

    if(layoutOneColumnInLS === 'true') setLayoutOneColumn(true)
    if(horizontalCardInLS === 'true') setHorizontalCard(true)

    // Info : On page load or when changing themes, best to add inline in `head` to avoid FOUC
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

    const userDataInLS = window.localStorage.getItem('user')
    if (userDataInLS) {
      setDataUser(JSON.parse(userDataInLS))
      setUserId(JSON.parse(userDataInLS)._id)
    }
  }, []);

  return (
    <Layout
      theme={theme}
      darkMode={darkMode}
      dataUser={dataUser}
      rightHand={rightHand}
      toggleHand={toggleHand}
      updateUser={updateUser}
      toggleTheme={toggleTheme}
      toggleLayout={toggleLayout}
      changeMinPrice={changeMinPrice}
      changeMaxPrice={changeMaxPrice}
      horizontalCard={horizontalCard}
      layoutOneColumn={layoutOneColumn}
      handleAreCardsVertical={handleAreCardsVertical}
      changeLocationTyped={changeLocationTyped}
      toggleDirectionCard={toggleDirectionCard}
      handleAuthorizedToAdd={handleAuthorizedToAdd}
    >
      <Routes>
        <Route
          exact
          path='/*'
          element={
            <HomePage
              minPrice={minPrice}
              maxPrice={maxPrice}
              darkMode={darkMode}
              clickedAd={clickedAd}
              updateUser={updateUser}
              locationTyped={locationTyped}
              resetClickedAd={resetClickedAd}
              horizontalCard={horizontalCard}
              layoutOneColumn={layoutOneColumn}
              areCardsVertical={areCardsVertical}
              handleAddToFavorites={handleAddToFavorites}
            />
          }
        />
        <Route
          exact
          path='/user/login'
          element={
            <LoginPage
              darkMode={darkMode}
              dataUser={dataUser}
              updateUser={updateUser}
            />
          }
        />
        <Route
          exact
          path='/user/register'
          element={
            <RegisterPage
              dataUser={dataUser}
              darkMode={darkMode}
            />
          }
        />
        <Route
          exact
          path='/user/:userIdPage'
          element={
            <ProfilPage
              darkMode={darkMode}
              dataUser={dataUser}
              clickedAd={clickedAd}
              toggleLayout={toggleLayout}
              resetClickedAd={resetClickedAd}
              horizontalCard={horizontalCard}
              layoutOneColumn={layoutOneColumn}
              areCardsVertical={areCardsVertical}
              toggleDirectionCard={toggleDirectionCard}
              handleAddToFavorites={handleAddToFavorites}
            />
          }
        />
        <Route
          exact
          path='/user/:userIdPage/settings'
          element={<RequireAuth child={UserSettings} auth={true} dataUser={dataUser} />}
        />
        <Route
          exact
          path='/user/:id/new'
          element={
            <NewAdPage
              darkMode={darkMode}
              dataUser={dataUser}
            />
          }
        />
      </Routes>
    </Layout>
  );
}

/* const mapStateToProps = (store) => {
  console.warn('(APP) store', store)
  return {
    userInfo: store.user
  }
} */

// export default connect(mapStateToProps)(App)
export default App
