import {Cookies, LocalStorage} from 'quasar'
import config from 'src/config/index'
import http from "axios"
import {remember} from '@imagina/qhelper/_plugins/remember'

export default {
  
  	/**
  	 * Buscar usuario por ID
  	 * @param  Integer id ID del usuario
  	 */
  	users(id) {
  		let url = config('api.api_url') + '/profile/users/' + id
	    return new Promise((resolve, reject) => {
	    	return http.get(url).then(response => {
	    		resolve(response.data.data);
	    	})
	    	.catch(error => {
	    		reject(error);
	    	});
	    });
		},
		
		show(id) {
			let key = JSON.stringify(id);
			return new Promise((resolve, reject) => {
				//remember.async(key, 3600 * 3, () => {
				return http.get(config('api.api_url') + '/profile/users/' + id, {
					params: {
						include: 'addresses'
					}
					/* })*/
				}).then(response => {
					resolve(response.data);
				})
					.catch(error => {
						reject(error);
					});
			});
		},

  	/**
  	 * Busca un usuario mediante el tipo de documento
  	 * @param  String typeDocument Tipo de documento
  	 * @param  String document     Documento
  	 */
  	searchUser(typeDocument,document) {
  		let url = config('api.api_url') + '/profile/users?take=1&filter={"field":{"name":"number_document","value":"'+document+'"}}'
	    return new Promise((resolve, reject) => { 
	      	return http.get(url)
	      	  	.then(response => {
	      	  		resolve(response);
	      	  	})
	      		.catch(error => {
	      			reject(error);
	      		});
	    });
  	},

  	/**
  	 * Crear un usuario mediante la data
  	 * @param  Object data
  	 */
  	createUser(data) {
  		let url = config('api.api_url') + '/profile/users'
	    return new Promise((resolve, reject) => {
	      	return http.post(url,{ 'attributes' : data })
	        	.then(response => {
	        		resolve(response);
	        	})
	        	.catch(error => {
	        		reject(error);
	        	});
	    });
  	},
}