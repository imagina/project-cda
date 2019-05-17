import {Cookies, LocalStorage} from 'quasar'
import config from 'src/config/index'
import http from "axios"
import {remember} from '@imagina/qhelper/_plugins/remember'

export default {

	/**
	 * Listado de vehiculos paginados
	 * @param  INTEGER page [Página del listado]
	 */
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

  	/**
  	 * Crea el vehiculo
  	 * @param  {OBJECT} data 
  	 */
  	createVehicle(data) {
	    let route = config('api.api_icda') + '/vehicles'
	    return new Promise((resolve, reject) => {
	      return http.post(route, data).then(response => {
	        resolve(response);
	      })
	      .catch(error => {
	        console.log(error)
	        reject(error);
	      });
	    });
  	},
  
  	deleteVehicle(id) {
	    return new Promise((resolve, reject) => {
	      return http.delete(config('api.api_icda') + '/vehicles/'+id).then(response => {
	        resolve(response.data.data);
	      })
	      .catch(error => {
	        reject(error);
	      });
	    });
  	},

  	vehicles()  {
  		let url	= config('api.api_icda') + '/vehicles'
	    return new Promise((resolve, reject) => {
	      	return http.get(url).then(response => {
	      	  resolve(response.data);
	      	})
	      	.catch(error => {
	      	  reject(error);
	      	});
	    });
  	},

  	/**
  	 * Busca la matricula creando el vehiculo si no existe
  	 * @param  {string} placa 
  	 * @param  {Integer} user_id
  	 */
  	vehicle(board)  {
	    board = board.toUpperCase();
	    let url = config('api.api_icda') + '/vehicles/'+board+'?filter={"field":"board"}'
	    return new Promise((resolve, reject) => {
	    	return http.get(url).then(response => {
	    		resolve(response.data);
	    	})
	    	.catch(error => {
	    		reject(error);
	    	});
	    });
  	},

  	/**
  	 * Busca la matricula sin crear el vehiculo si no existe
  	 * @param  {string} placa 
  	 */
  	searchVehicle(board)  {
	    board = board.toUpperCase();
	    let url	 = config('api.api_icda') + '/vehicles/'+board+'?filter={"field":"board"}'
	    return new Promise((resolve, reject) => {
		    return http.get(url).then(response => {
		    	resolve(response.data);
		    })
		    .catch(error => {
		    	reject(error);
		    });
	    });
  	},

  	/**
  	 * Actualizar el vehiculo
  	 * @param  {Object} attributes 
  	 */
  	updateVehicle(attributes) {
  		let url = config('api.api_icda') + '/vehicles/'+attributes.id
	    return new Promise((resolve, reject) => {
	    	return http.put(url,attributes).then(response => {
	    		resolve(response);
	    	})
	    	.catch(error => {
	    	 	reject(error);
	    	});
	    });
  	},

}