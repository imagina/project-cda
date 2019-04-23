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
      return http.post(route, data).then(response => {
        resolve(response);
      })
      .catch(error => {
        console.log(error)
        reject(error);
      });
    });
  },
  
  typesVehicles() {
    return new Promise((resolve, reject) => {
      return http.get(config('api.api_icda') + '/typesVehicles').then(response => {
        resolve(response.data.data);
      })
      .catch(error => {
        reject(error);
      });
    });
  },

  inspectionsTypes() {
    return new Promise((resolve, reject) => {
      return http.get(config('api.api_icda') + '/inspectionsTypes').then(response => {
        resolve(response.data.data.map(e => {
                  return {
                      label: e.name,
                      value: e.id
                  }
                }));
      })
      .catch(error => {
        reject(error);
      });
    });
  },

  vehicles()  {
    return new Promise((resolve, reject) => {
      return http.get(config('api.api_icda') + '/vehicles').then(response => {
        resolve(response.data);
      })
      .catch(error => {
        console.log('error');
        // reject(error);
      });
    });
  },

  vehicle(placa)  {
    let key = JSON.stringify(placa);
    return new Promise((resolve, reject) => {
      return http.get(config('api.api_icda') + '/vehicles/'+placa+'?filter={"field":"board"}').then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
    });
  },

  updateVehicle(attributes) {
    return new Promise((resolve, reject) => {
      return http.put(config('api.api_icda') + '/vehicles/'+attributes.id,attributes).then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
    });
  },

  preInspections() {
    return new Promise((resolve, reject) => {
      return http.get(config('api.api_icda') + '/preInspections').then(response => {
        resolve(response.data.data);
      })
      .catch(error => {
        reject(error);
      });
    });
  },

  inventory() {
    return new Promise((resolve, reject) => {
      return http.get(config('api.api_icda') + '/inventory').then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
    });
  },

  addInventory(name) {
    return new Promise((resolve, reject) => {
      return http.post(config('api.api_icda') + '/inventory', {
          name: name,
        }).then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
    });
  },

  addImagenGallery(file,code) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("code", code);
    return http.post(config('api.api_icda') + '/inspections/media/upload',
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      ).then(response => {
        return response
        // resolve(response);
      })
    .catch(error => {
      console.log(error)
      reject(error);
    });
  },

  setInspections(data) {
    return new Promise((resolve, reject) => {
      return http.post(config('api.api_icda') + '/inspections',data)
        .then(response => {
          resolve(response);
        })
      .catch(error => {
        reject(error);
      });
    });
  },

  getInspection(id) {
    return new Promise((resolve, reject) => {
      return http.get(config('api.api_icda') + '/inspections/'+id)
        .then(response => {
          resolve(response);
        })
      .catch(error => {
        reject(error);
      });
    });
  },

  getInspections(page, status) {
    return new Promise((resolve, reject) => {
      return http.get(config('api.api_icda') + '/inspections?page='+page+'&take=10&filter={"inspection_status":'+status+',"order":{"field":"created_at","way":"desc"}}')
        .then(response => {
          resolve(response);
        })
      .catch(error => {
        reject(error);
      });
    });
  },

  updateInspections(data) {
    return new Promise((resolve, reject) => {
      return http.put(config('api.api_icda') + '/inspections/'+data.id,data)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          console.log(error)
          reject(error);
        });
    });
  },
  
  searchUser(typeDocument,document) {
    return new Promise((resolve, reject) => { 
      return http.get(config('api.api_url') + '/profile/users?take=1&filter={"field":{"name":"number_document","value":"'+document+'"}}')
        .then(response => {
          resolve(response);
        })
      .catch(error => {
        reject(error);
      });
    });
  },

  createUser(data) {
    return new Promise((resolve, reject) => {
      return http.post(config('api.api_url') + '/profile/users',{ 'attributes' : data })
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  getInspectionStatues(page) {
    return new Promise((resolve, reject) => {
      return http.get(config('api.api_icda') + '/inspectionStatuses')
        .then(response => {
          resolve(response.data.data.map((e,index) => {
              return {
                  label: e,
                  value: index
              }
          }));
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  inspectionHistory(inspections_id, status ) {
    return new Promise((resolve, reject) => {
      return http.post(config('api.api_icda') + '/inspectionHistory',{
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

  asset(img_url) {
    return config('api.base_url') + '/' +img_url
  }
}