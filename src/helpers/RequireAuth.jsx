import { Navigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

import { connect } from 'react-redux'

const RequireAuth = ({child, auth, dataUser, user}) => {
  //const user = useSelector(selectUser);
  //je récup le params de la route demandée
  const params = useParams()
  //const Child = props.child

  // gestion des state
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    //récupération du token dans le localStorage
    const token = window.localStorage.getItem('serve-token')

    //si le token est null et que la route est protégée
    if (token === null && auth) {
      //on demande une redirection
      setRedirect(true);
    //sinon
    }
    else {
      //si l'utilisateur est déconnecté dans le store de redux
      if (user.isLogged) {
        console.warn('loggué')
      }
      else {
        console.warn('pas loggué')
      }
    }
  }, [])

  if (redirect) return <Navigate to="/user/login" />

  return (
    <p>Require Auth</p>
  )

  //{...props} = transmet au composant enfant les props du parent (comme un relais)
  //params = j'ai crée une une props qui envoi le params de l'url (récupéré en haut par useParams) vers le composant enfant
  //return <Child {...props} params={params} />
}

const mapStateToProps = (store, ownProps) => {
  console.warn('(REQUIRE AUTH) store', store)
  return {
    user: store.user
  }
}

export default connect(mapStateToProps)(RequireAuth)
//export default RequireAuth
