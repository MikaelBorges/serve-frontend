import { Navigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { config } from '../config'

//HOC de controle des data et de la sécurité
function RequireAuth(props) {
  /* console.log('user', user)
  console.log('auth', auth) */
  //je récup le params de la route demandée
  const params = useParams()
  //console.log('params', params)

  const Child = props.child

  // gestion des state
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    //récupération du token dans le localStorage
    const token = window.localStorage.getItem('serve-token')
    //console.log('token', token)
    //si le token est null et que la route est protégée
    if (!token) {
      //on demande une redirection
      setRedirect(true)
    //sinon
    }
    else {
      //on va vérifier le token (ajax)
      axios.get(`${config.api_url}/api/checkToken`, {headers: { "x-access-token": token }})
      .then((res) => {
        console.log('res.status', res.status)
        //console.log("RequireAuth useEffect", res)
        //si le status de la réponse n'est pas 200
        if (res.status !== 200) {
          //si la route est protégée
          //if (props.auth) {
            //on demande la redirection
            //logoutUserAction()
            console.warn("on doit déconnecter l'user")
            console.warn('on supprime serve token du local storage')
            console.warn('on supprime redux du local storage')
            console.warn('on doit rediriger')
            //window.localStorage.removeItem('serve-token')
            //setRedirect(true)
          //}
        //sinon (c'est 200)
        }
        else{

          console.warn('tout est ok pour le token')

          // PROCEDURE D'HYDRATATION DU STORE

          // on récup les infos de l'utilisateur (objet) qu'on stock dans une variable user
          // let user = res.data.user[0];
          // on rajoute le token à l'objet
          // user.token = token;
          // on met à jour le store pour connecter l'utilisateur
          // dispatch(setUser(user));
        }
      })
      .catch((err) => {
        console.log('error checkToken', err);
      });
    }
  }, [])

  if (redirect) return <Navigate to='/user/login' />

  //{...props} = transmet au composant enfant les props du parent (comme un relais)
  //params = j'ai crée une une props qui envoi le params de l'url (récupéré en haut par useParams) vers le composant enfant
  return <Child {...props} params={params} />
}

const mapStateToProps = (store, ownProps) => {
  return {
    user: store.user
  }
}

export default connect(mapStateToProps)(RequireAuth)
