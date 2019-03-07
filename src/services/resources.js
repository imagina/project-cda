import {Cookies, LocalStorage} from 'quasar'
import config from 'src/config/index'
import http from "axios"
import {remember} from '@imagina/qhelper/_plugins/remember'

export default {

  typesVehicles() {
    return new Promise((resolve, reject) => {
      return http.get(config('api.api_icda') + '/typesVehicles').then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
    });
  },

  inspectionsTypes() {
    return new Promise((resolve, reject) => {
      return http.get(config('api.api_icda') + '/inspectionsTypes').then(response => {
        resolve(response.data);
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

  preInspections() {
    return new Promise((resolve, reject) => {
      return http.get(config('api.api_icda') + '/preInspections').then(response => {
        resolve(response.data);
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
}