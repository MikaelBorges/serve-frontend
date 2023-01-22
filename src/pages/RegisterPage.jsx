import { registerUser } from '../api/user'
import { useState, useEffect } from 'react'
import styleOf from './Register.module.scss'
import { useNavigate, Navigate } from 'react-router-dom'

import {
  Image,
  Transformation,
  CloudinaryContext
} from 'cloudinary-react'
import { changeImg } from '../api/coach'

function RegisterPage(props) {

  const navigate = useNavigate(),
        [img, setImg] = useState(null),
        [msg, setMsg] = useState(null),
        [email, setEmail] = useState(''),
        [phone, setPhone] = useState(''),
        [info, setInfo] = useState(null),
        [error, setError] = useState(null),
        [lastname, setLastname] = useState(''),
        [password, setPassword] = useState(''),
        [firstname, setFirstname] = useState(''),
        [disabled, setDisabled] = useState(true),

        onSubmitForm = e => {
          e.preventDefault()
          let data = {
            phone: e.target.phone.value,
            image: e.target.image.value,
            email: e.target.email.value,
            lastname: e.target.lastname.value,
            password: e.target.password.value,
            firstname: e.target.firstname.value
          }
          registerUser(data)
          .then((res) => {
              //console.warn('res Register page', res)
              if (res.status === 200) {
                  //console.warn('res', res)
                  setInfo(res.data.message)
              }
              else {
                  console.warn('RES (LOGIN PAGE) :')
                  console.warn(res)
                  console.warn('RES.RESPONSE.DATA.MESSAGE (LOGIN PAGE) :')
                  console.warn(res.response.data.message)
                  setError(res.response.data.message);
              }
          })
          .catch((err) => {
              console.warn('err: rentré dans le catch RegisterPage.jsx')
              console.warn(err)
              setError(err)
          })
        },

        // fonction callback de cloudinary déclenché lors de l'envoi un fichier
        checkUploadResult = resultEvent => {
          setMsg(null)
          //si l'envoi est réussit
          if (resultEvent.event === 'success') {
            console.warn('result info', resultEvent.info)

            /* let datas = {
              imageUser : resultEvent.info.public_id,
              // id: coach.infos.id
            }
            changeImg(datas)
            .then((res)=>{
              if(res.status === 200) {
                getOneCoach(coach.infos.id)
                .then(response => {
                  console.warn('getOneCoach', response)
                  let myCoach = response.result
                  console.warn(myCoach)
                  myCoach.token = localStorage.getItem('coachme-token')
                  dispatch(connectCoach(myCoach))
                  setImg(response.result.imageUrl)
                })

                setMsg('Votre profil a bien été édité');
              } else {
                setMsg("L'image n'a pas été modifiée");
              }
            })
            .catch(err => console.warn('Echec modification image!')) */
          } else {
            console.warn('Erreur envoi fichier')
          }
          console.warn('RESULT EVENT', resultEvent)
        },

        // fonction d'affichage de notre interface de chargement d'images/videos de cloudinary
        showWidget = e => {
          e.preventDefault()
          //paramètrage de l'interface
          let widget = window.cloudinary.createUploadWidget(
            {
              cloudName: 'mika4ever', // nom de mon cloud
              uploadPreset: 'samples', // dossier ou l'on veut envoyer
              maxImageWidth: 800, // on peut paramètrer la taille max de l'image
              cropping: false, // recadrage
            },
            (error, result) => {
              console.warn('error showWidget', error);
              console.warn('result showWidget', result);
              checkUploadResult(result); //appel de notre callback
            }
          )
          // ouverture de notre interface
          widget.open()
        }

  /* useEffect(() => {
    console.warn('register useEffect')
    console.warn('props.dataUser', props.dataUser)
    if(Object.keys(props.dataUser).length !== 0 || props.dataUser.constructor !== Object) navigate('/')
  }, [props.dataUser]); */

  useEffect(() => {
      if (email !== '' && password !== '' && firstname !== '' && lastname !== '' && phone !== '') {
          setDisabled(false);
      }
      else {
          setDisabled(true);
      }
  }, [email, password]);

  useEffect(() => {
    console.warn('composant register chargé')
  }, []);


  if(props.dataUser._id) return <Navigate to='/' />

  return (
    <section className='min-h-screen dark:bg-slate-900 bg-white flex flex-col space-y-12 px-8'>
      <form
        action='/user/register'
        method='post'
        onSubmit={e => onSubmitForm(e)}
        className='c-form'
      >

        {/* {img !== null && <CloudinaryContext cloudName="mika4ever">
          <div>
            <Image publicId={coach.infos.imageUrl} id="profilImg">
              <Transformation quality="auto" fetchFormat="auto" />
            </Image>
          </div>
        </CloudinaryContext>} */}
        {/* <button
          onClick={e => showWidget(e)}
          className='bg-slate-200 py-1 px-2'
        >
          Ajouter ma photo de profil
        </button> */}

        <input
          type='text'
          name='image'
          placeholder='url de votre photo de profil si vous la connaissez (facultatif)'
          className={`pl-1 ${styleOf.imageUrl} w-full border dark:bg-slate-800 dark:text-white`}
        />
        <input
          onChange={e => {
            setFirstname(e.currentTarget.value);
          }}
          type='text'
          name='firstname'
          placeholder='votre prénom'
          className='pl-1 w-full border dark:bg-slate-800 dark:text-white'
        />
        <input
          onChange={(e) => {
            setLastname(e.currentTarget.value);
          }}
          type='text'
          name='lastname'
          placeholder='votre nom'
          className='pl-1 w-full border dark:bg-slate-800 dark:text-white'
        />
        <input
          onChange={(e) => {
            setEmail(e.currentTarget.value);
          }}
          type='text'
          name='email'
          placeholder='votre email'
          className='pl-1 w-full border dark:bg-slate-800 dark:text-white'
        />
        <input
          onChange={(e) => {
            setPassword(e.currentTarget.value);
          }}
          type='password'
          name='password'
          placeholder='votre mot de passe'
          className='w-full border dark:bg-slate-800 dark:text-white'
        />
        <input
          onChange={(e) => {
            setPhone(e.currentTarget.value);
          }}
          type='tel'
          name='phone'
          placeholder='votre numero de téléphone'
          className='w-full border dark:bg-slate-800 dark:text-white'
        />
        <button
          disabled={disabled}
          type='submit'
          name='Créer mon compte'
          className={`
            border
            bg-slate-200
            dark:bg-slate-800
            dark:text-yellow-100
          `}
        >
          Créer mon compte
        </button>
      </form>
      {info &&
        <p className='text-green-500'>{info}</p>
      }
      {error &&
        <p className='text-red-500'>{error}</p>
      }
    </section>
  );
}

export default RegisterPage;
