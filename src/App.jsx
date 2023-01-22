import './assets/fonts/Gilroy/gilroy.css'
import Layout from './Layout'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import NewAdPage from './pages/NewAdPage'
import ProfilPage from './pages/ProfilPage'
import RegisterPage from './pages/RegisterPage'
import { addToFavorites } from './api/user'
import { useState, useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { userIsLogout } from './functions/user'
import { lightIcon, darkIcon, systemIcon } from './constants/icons'

import { connect } from 'react-redux'

function App() {
  const [userId, setUserId] = useState(''),
        [urlNewAd, setUrlNewAd] = useState(''),
        [clickedAd, setClickedAd] = useState({}),
        [urlUserId, setUrlUserId] = useState(''),

        { pathname } = useLocation(),
        [path, setPath] = useState(''),
        [theme, setTheme] = useState('light'),
        [minPrice, setMinPrice] = useState(''),
        [maxPrice, setMaxPrice] = useState(''),
        [dataUser, setDataUser] = useState({}),
        [darkMode, setDarkMode] = useState(false),
        [rightHand, setRightHand] = useState(true),
        [locationTyped, setLocationTyped] = useState(''),
        [horizontalCard, setHorizontalCard] = useState(false),
        [layoutOneColumn, setLayoutOneColumn] = useState(false),
        [authorizedToAdd, setAuthorizedToAdd] = useState(false),
        [localStorageChecked, setLocalStorageChecked] = useState(false)

        function resetClickedAd() {
          console.log('faire le reset')
          setClickedAd({})
        }

        function toggleDirectionCard(horizontalDirection) {
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

        function toggleLayout(layoutSelected) {
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

        function toggleHand() {
          setRightHand(!rightHand)
        }

        function toggleTheme(themeSelected) {
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

        function updateUser(data) {
          setDataUser(data)
          if (data) {
            setUrlUserId(`/user/${data._id}`)
            setUrlNewAd(`/user/${data._id}/new`)
          }
        }

        function displayUser() {
          console.log('dataUser', dataUser)
        }

        function handleAuthorizedToAdd() {
          setAuthorizedToAdd(true)
        }

        function checkIfAddToFavorites(adId) {
          const ad = {
            adId: adId,
            userId: dataUser._id,
          }
          addToFavorites(ad)
          .then(res => {
            // console.log('res', res)

            if(res.status === 200) {
              // console.log('200')
              setClickedAd({adId: adId, newFavNumber: res.data.newFavNumber})
              console.log('setClickedAd setted')
              console.log('res.data.newFavNumber', res.data.newFavNumber)
              console.log('adId', adId)
              // loadAds()
              // .then(res => {
                // console.log('RES :', res)
                // setAds(res.ads)
                // setAreAdsArranged(false)
                // setFavs(true)
              // })
              // .catch(err => console.log(err))
            }

          })
          .catch(err => console.log(err))
        }

        function handleAddToFavorites(e, ad) {
          e.stopPropagation()
          // console.log('ad', ad)
          // console.log('dataUser._id', dataUser._id)

          if(!userIsLogout(dataUser) && (dataUser._id !== ad.userId)) {
            // console.log('fav éligible !')
            checkIfAddToFavorites(ad._id)
          }/* 
          else{
            console.log('fav not ok...')
          } */



          // if((props.dataUser._id !== undefined) && (props.dataUser._id !== props.ad.userId)) {
            // console.log('ajouter !')
            // props.checkIfAddToFavorites(props.ad._id)
            // console.log('props.dataUser._id', props.dataUser._id)
            // console.log('props.ad.userId', props.ad.userId)
            // if(props.dataUser._id !== props.ad.userId) {
              // const ad = {
                // adId: props.ad._id,
                // userId: props.dataUser._id,
              // }
              // addToFavorites(ad)
              // .then(res => {
                // console.log('res', res)
              // })
              // .catch(err => console.log(err))
            // }
          // } else {
            // console.log("déco ou c'est ma propre annonce")
          // }
        }

        function changeMinPrice(minPrice) {
          setMinPrice(minPrice)
        }

        function changeMaxPrice(maxPrice) {
          setMaxPrice(maxPrice)
        }

        function changeLocationTyped(locationTyped) {
          setLocationTyped(locationTyped)
        }

  useEffect(() => {
    const horizontalCardInLS = window.localStorage.getItem('horizontalCard'),
          layoutOneColumnInLS = window.localStorage.getItem('layoutOneColumn')

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
    //console.log('(APP) check si le local storage a des infos')
    if (userDataInLS) {
      //console.log('(APP) JSON.parse(userDataInLS)', JSON.parse(userDataInLS))
      setDataUser(JSON.parse(userDataInLS))
      console.log('(APP) le local storage a alimenté le state dataUser')
      console.log('(APP) dataUser', dataUser)
      setUserId(JSON.parse(userDataInLS)._id)
      setUrlUserId(`/user/${JSON.parse(userDataInLS)._id}`)
      setUrlNewAd(`/user/${JSON.parse(userDataInLS)._id}/new`)
    } else {
      console.log('pas de user data dans le local storage')
    }
    setLocalStorageChecked(true)
  }, []);

  return (
    <Layout
      theme={theme}
      darkMode={darkMode}
      dataUser={dataUser}
      rightHand={rightHand}
      toggleHand={toggleHand}
      updateUser={updateUser}
      displayUser={displayUser}
      toggleTheme={toggleTheme}
      toggleLayout={toggleLayout}
      changeMinPrice={changeMinPrice}
      changeMaxPrice={changeMaxPrice}
      horizontalCard={horizontalCard}
      layoutOneColumn={layoutOneColumn}
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
              handleAddToFavorites={handleAddToFavorites}
            />
          }
        />
        <Route
          exact
          path='/user/login'
          element={userIsLogout(dataUser) ?
            <LoginPage
              darkMode={darkMode}
              dataUser={dataUser}
              updateUser={updateUser}
            />
            :
            <HomePage
              refreshUrl
              darkMode={darkMode}
              clickedAd={clickedAd}
              updateUser={updateUser}
              resetClickedAd={resetClickedAd}
              horizontalCard={horizontalCard}
              layoutOneColumn={layoutOneColumn}
              handleAddToFavorites={handleAddToFavorites}
            />
          }
        />
        <Route
          exact
          path='/user/register'
          element={userIsLogout(dataUser) ?
            <RegisterPage
              dataUser={dataUser}
              darkMode={darkMode}
            />
            :
            <HomePage
              refreshUrl
              darkMode={darkMode}
              clickedAd={clickedAd}
              updateUser={updateUser}
              resetClickedAd={resetClickedAd}
              horizontalCard={horizontalCard}
              layoutOneColumn={layoutOneColumn}
              handleAddToFavorites={handleAddToFavorites}
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
              toggleDirectionCard={toggleDirectionCard}
              handleAddToFavorites={handleAddToFavorites}
            />
          }
        />
        <Route
          exact
          path='/user/:id/new'
          element={
            pathname === `/user/${JSON.parse(window.localStorage.getItem('user'))?._id}/new`
            ||
            pathname === `/user/${JSON.parse(window.localStorage.getItem('user'))?._id}/new/`
            ?
            <NewAdPage
              darkMode={darkMode}
              dataUser={dataUser}
            />
            :
            <HomePage
              refreshUrl
              darkMode={darkMode}
              clickedAd={clickedAd}
              updateUser={updateUser}
              resetClickedAd={resetClickedAd}
              horizontalCard={horizontalCard}
              layoutOneColumn={layoutOneColumn}
              handleAddToFavorites={handleAddToFavorites}
            />
          }
        />
      </Routes>
    </Layout>
  );
}

const mapStateToProps = (store) => {
  console.log('(APP) store', store)
  return {
    userInfo: store.user
  }
}

export default connect(mapStateToProps)(App)
// export default App
