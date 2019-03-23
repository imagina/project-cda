import axios from 'axios'
import store from 'src/store/index'
import {alert} from '@imagina/qhelper/_plugins/alert'
// Add a response interceptor
axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
	return error
});

export default ({Vue}) => {
  Vue.prototype.$axios = axios
}
