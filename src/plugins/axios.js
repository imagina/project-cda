import axios from 'axios'
import store from 'src/store/index'
import {alert} from '@imagina/qhelper/_plugins/alert'
// Add a response interceptor
axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  	if(error.response){
    	let status = error.response.status
	    switch (status) {
	      case 401:
	        store.dispatch("auth/AUTH_CLEAR")
	        // alert.error("auth/AUTH_CLEAR")
	        return Promise.reject(error);
	        break
	      case 403:
	        return Promise.reject(error);
	        break
	      case 403:
	        return Promise.reject(error);
	        // alert.error('The requested content was not found')
	        break
	      case 500:
	        return Promise.reject(error);
	        // alert.error('Internal Server Error')
	        break
	      case 502:
	        return Promise.reject(error);
	        // alert.error('Bad Gateway')
	        break
	      case 504:
	        return Promise.reject(error);
	        // alert.error('Gateway Time Out')
	        break
	      default:
	        return Promise.reject(error);
	        break
	    }
  	}else{
  	  alert.error('Bad Gateway')
  	}
});

export default ({Vue}) => {
	Vue.prototype.$axios = axios
}
