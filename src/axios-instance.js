import axios from 'axios'
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import store from '@/store'

const axiosInstance = axios.create({
  baseURL: 'https://aman3d.pythonanywhere.com/',
})


axiosInstance.interceptors.request.use(request => {
  const source = axios.CancelToken.source()
  request.cancelToken = source.token
  store.commit('ADD_CANCEL_TOKEN', source) // Это нужно для отмены запросов, во время перехода на другие страницы

  const isAuthentificated = store.getters['IS_AUTHENTIFICATED']
  store.dispatch('setLoading', true)
  if (isAuthentificated) {
    const token = store.getters['TOKEN']
    request.headers['Authorization'] = `Bearer ${token.access_token}`
    return Promise.resolve(request);
  }
  return Promise.resolve(request)

});

axiosInstance.interceptors.response.use(response => {
  store.commit('CLEAR_CANCEL_TOKENS') // Очищаем выполненые запросы
  store.dispatch('setLoading', false)

  return Promise.resolve(response)

}, error => {
  console.log("error")
  store.dispatch('setLoading', false)
  if (axios.isCancel(error)) {
    throw new axios.Cancel('Operation canceled due to timeout!');
  }
  if (error.response.status === 422) {
    console.log('check tokens')
    store.dispatch('logout')
    location.reload()
  }
  return Promise.reject(error)
});

const refreshAuthLogic = () => axiosInstance({
  method: 'post',
  url: 'refresh',
  data: {
    refresh_token: store.getters['TOKEN'].refresh_token // вот тут кажетсч надо передавать через httponly cookie
  }
}).then(response => {
  const token = response.data.token
  store.dispatch('saveToken', token)
  // failedRequest.response.config.headers['Authorization'] = `Bearer ${token.access_token}`
  console.log('token refreshed')
  return Promise.resolve(response);
}).catch(error => {
  console.log('refresh token error')
  store.dispatch('logout')
  location.reload()
  return Promise.reject(error)
})

createAuthRefreshInterceptor(
  axiosInstance,
  refreshAuthLogic,
  // { pauseInstanceWhileRefreshing : true } //например если сразу выполняются 3 запроса и они возрвщают ошибку 401, эта опция обновляет токен и перезапускает только 1-й запрос
  // но если убрать, почему-то перестает работать refersh после истечения refresh
);

export default axiosInstance;