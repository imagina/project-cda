import {Cookies, LocalStorage} from 'quasar'
import config from 'src/config/index'
import http from "axios"
import {remember} from '@imagina/qhelper/_plugins/remember'

export default {

  index(filter, take, page, fields, include, refresh) {
    filter = JSON.stringify(filter);
    let key = ":" + JSON.stringify(filter + take + page + fields + include);
    key = key == ":null" ? "" : key;
    return new Promise((resolve, reject) => {
      remember.async("inspections" + key, 3600 * 3, () => {
        return http.get( config('api.api_icda') + '/inspections', {
          params: {
            filter: filter,
            take: take,
            page: page,
            fields: fields,
            include: include
          }
        })
      }, true).then(response => {
        resolve(response);
      })
        .catch(error => {
          reject(error);
        });
    });
  },

	
	/**
	 * Obtiene la inspeccion por ID
	 * @param  {Integer} id
	 */
	getInspection(id) {
		let url = config('api.api_icda') + '/inspections/'+id
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
	 * Optienes las inspecciones por paginacion
	 * @param  {iteger} page  
	 */
  	getInspections(page, status) {
  		let url = config('api.api_icda') + '/inspections?page='+page+'&take=10&filter={"inspection_status":'+status+',"order":{"field":"created_at","way":"desc"}}'
	    return new Promise((resolve, reject) => {
	      	return http.get(url)
	        .then(response => {
	        	resolve(response.data);
	        })
	      	.catch(error => {
	        	reject(error);
	      	});
	    });
  	},


  	/**
  	 * Acualizar la inspeccion
  	 * @param  {Object} data
  	 * @param  {intiger} id 
  	 */
	updateInspections(data,id) {
		let url = config('api.api_icda') + '/inspections/'+id
	    return new Promise((resolve, reject) => {
	      return http.post(url, data)
	      	.then(response => {
	        	resolve(response);
	        })
	        .catch(error => {
	        	reject(error);
	        });
	    });
  	},

  	/**
  	 * Acualizar el status de la inspections
  	 * @param  {integer} inspections_id
  	 * @param  {integer} status     
  	 */
  	inspectionHistory(inspections_id, status ) {
  		let url = config('api.api_icda') + '/inspectionHistory'
    	return new Promise((resolve, reject) => {
	      	return http.post(url,{
	        	inspections_id : inspections_id,
	        	status: status,
	        	comment: null
	      	})
			.then(response => {
				resolve(response);
			})
			.catch(error => {
				reject(error);
			});
    	});
  	},

  	/**
  	 * Crea una nueva inspeccion
  	 */
	createInspections(data) {
		let url = config('api.api_icda') + '/inspections'
		return new Promise((resolve, reject) => {
			return http.post(url,data)
			.then(response => {
				resolve(response);
			})
			.catch(error => {
				reject(error);
			});
		});
	},

	/**
	 * Añade una imagen a la galería de la inspeccion
	 */
  	addImagenGallery(file,code) {
	    const formData = new FormData();
	    formData.append("file", file);
	    formData.append("code", code);
	    let url = config('api.api_icda') + '/inspections/media/upload'
	    return http.post(url,
	        formData,
	        { headers: { 'Content-Type': 'multipart/form-data' } }
	      	).then(response => {
	    		return response
	      	})
	    	.catch(error => {
	      		console.log(error)
	      	reject(error);
	    });
  	},

  	/**
  	 * Obtiene los items del inventario
  	 */
  	inventory() {
  		let url = config('api.api_icda') + '/inventory?filter={"status":1}'
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
  	 * Obtiene las PreInspecciones
  	 */
	preInspections() {
		let url = config('api.api_icda') + '/preInspections'
	    return new Promise((resolve, reject) => {
	      	return http.get(url).then(response => {
	        	resolve(response.data.data);
	      	})
		    .catch(error => {
	        	reject(error);
	     	});
    	});
  	},


  	/**
  	 * Añadir nuevo elemento en el inventario
  	 */
 	addInventory(name) {
 		let url = config('api.api_icda') + '/inventory'
	    return new Promise((resolve, reject) => {
	      	return http.post(url, { name: name, status: 0 })
	      	.then(response => {
	      		resolve(response.data);
	      	})
	      	.catch(error => {
	      		reject(error);
	      	});
	    });
 	},
}