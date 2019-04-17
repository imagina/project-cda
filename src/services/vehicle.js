import {Cookies, LocalStorage} from 'quasar'
import config from 'src/config/index'
import http from "axios"
import {remember} from '@imagina/qhelper/_plugins/remember'

export default {

	getVehicles(page) {
		let route = config('api.api_icda') + '/vehicles?page='+page+'&take=10&filter={"order":{"field":"created_at","way":"desc"}}'
		return new Promise((resolve, reject) => {
			return http.get(route).then(response => {
				resolve(response.data);
			})
			.catch(error => {
				reject(error);
			});
		});
	},
	createVehicle(data) {
		let route = config('api.api_icda') + '/vehicles'
		return new Promise((resolve, reject) => {
			return http.post(route, {
				data
			}).then(response => {
				resolve(response.data);
			})
			.catch(error => {
				reject(error);
			});
		});
	},
}