import axios from 'axios';
import { parseCookies, setCookie, destroyCookie } from 'nookies'

export const login = async (email, password) => {
  const data = new URLSearchParams();
  data.append('username', email);
  data.append('password', password);
  try {
    const response = await axios.post('http://localhost:4000/login', data, {
      responseType: 'text'
    });
    if(response.data && response.data.jwt){
      saveToken(null, response.data.jwt);
    } else {
      throw new Error('JWT not received after login success')
    }
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      if(error.response.status == 401){
        throw new Error('That username or password is incorrect.')
      } else {
        throw new Error(error.message)
      }
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
      throw new Error('Error connecting to the server. Are you offline?')
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
      throw new Error(error.message)
    }
  }
}

export const saveToken = (ctx, jwt) => {
  // return window.localStorage.setItem('jwt', jwt);
  return setCookie(null, 'token', jwt)
}
export const loadToken = (ctx) => {
  // return window.localStorage.getItem('jwt');
  return parseCookies(ctx)['token'] || null;
}

export const clearToken = (ctx) => {
  return destroyCookie(null, 'token')
}

export default {
  login,
  saveToken,
  loadToken
}