import axios from 'axios'
import { config } from '../config'

/* export function getLiteInfosWithId(id) {
  return axios.get(`${config.api_url}/user/${id}`)
  .then(res => {
      return res.data
  })
  .catch(err => {
      return err
  })
} */

export function addToFavorites(adId) {
  const token = window.localStorage.getItem('serve-token')
  return axios.post(`${config.api_url}/addToFavorites`, {adId: adId}, {headers: { "x-access-token": token }})
  .then(res => {
    return res
  })
  .catch(err => {
    return err
  })
}

export function registerUserImage(data) {
  return axios.post(`${config.api_url}/user/registerUserImage`, data)
  .then(res => {
    return res
  })
  .catch(err => {
    console.warn('err', err)
    return err
  })
}

export function changeUserData(datas, id) {
  return axios.post(`${config.api_url}/user/changeUserData/${id}`, datas)
  .then(res => {
    return res
  })
  .catch(err => {
    return err
  })
}

export function registerUser(datas) {
  return axios.post(`${config.api_url}/user/register`, datas)
  .then(res => {
    return res
  })
  .catch(err => {
    console.warn('err', err)
    return err
  })
}

//on charge toutes les annonces
export function loginUser(datas) {
  return axios.post(`${config.api_url}/user/login`, datas)
  .then(res => {
    return res
  })
  .catch(err => {
    console.warn('err: rentré dans le catch user.js')
    console.warn(err)
    return err
  })
}

export function logoutUser(datas) {
  return axios.post(`${config.api_url}/user/logout`, datas)
  .then(res => {
    return res
  })
  .catch(err => {
    console.warn('erreur: rentre dans le catch de user')
    console.warn(err)
    return err
  })
}
