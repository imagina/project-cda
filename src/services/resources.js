import {Cookies, LocalStorage} from 'quasar'
import config from 'src/config/index'
import http from "axios"
import {remember} from '@imagina/qhelper/_plugins/remember'

export default {

  /**
   * Tipos de Vehiculos
   */
  getTypesVehicles() {
    let url = config('api.api_icda') + '/typesVehicles'
    return new Promise((resolve, reject) => {
      return http.get(url).then(response => {
        resolve(response.data.data.map( (e,index) => { return { label: e, value: index }}));
      })
      .catch(error => {
        reject(error);
      });
    });
  },
  getClassVehicles() {
    let url = config('api.api_icda') + '/vehiclesClass'
    return new Promise((resolve, reject) => {
      return http.get(url).then(response => {
        resolve(response.data.data.map( (e,index) => { return { label: e, value: index }}));
      })
        .catch(error => {
          reject(error);
        });
    });
  },

  /**
   * Tipos de Inspecciones
   */
  getTypesInspections() {
    let url = config('api.api_icda') + '/inspectionsTypes'
    return new Promise((resolve, reject) => {
      return http.get(url).then(response => {
        resolve(response.data.data.map(e => { return { label: e.name, value: e.id }}));
      })
      .catch(error => {
        reject(error);
      });
    });
  },

  /**
   * Tipos de Estatus de inspeccion
   */
  getTypesInspectionStatues() {
    let url = config('api.api_icda') + '/inspectionStatuses'
    return new Promise((resolve, reject) => {
      return http.get(url)
        .then(response => {
          resolve(response.data.data.map((e,index) => { return { label: e, value: index }}));
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  /**
   * Tipos de Servicios
   */
  getTypesServices() {
    let url = config('api.api_icda') + '/typesServices'
    return new Promise((resolve, reject) => {
      return http.get(url)
        .then(response => {
          resolve(response.data.data.map((e,index) => { return { label: e, value: index}}));
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  /**
   * Tipos de Fuels
   */
  getTypesFuels() {
    let url = config('api.api_icda') + '/typesFuels'
    return new Promise((resolve, reject) => {
      return http.get(url)
        .then(response => {
          resolve(response.data.data.map((e,index) => { return { label: e, value: index }}));
        })
      .catch(error => {
        reject(error);
      });
    });
  },

  /**
   * Tipos de Marcas
   */
  getTypesBrands() {
    let url = config('api.api_icda') + '/brands'
    return new Promise((resolve, reject) => {
      return http.get(url).then(response => {
        resolve(response.data.data.map(e => { return { label: e.name, value: e.id }}));
      })
      .catch(error => {
        reject(error);
      });
    });
  },

  /**
   * Tipos de Colores
   */
  getTypesColors() {
    let url = config('api.api_icda') + '/colors'
    return new Promise((resolve, reject) => {
      return http.get(url).then(response => {
        resolve(response.data.data.map(e => { return { label: e.name, value: e.id }}));
      })
      .catch(error => {
        reject(error);
      });
    });
  },

  /**
   * Tipos de Lineas
   */
  getTypesLines() {
    let url = config('api.api_icda') + '/lines'
    return new Promise((resolve, reject) => {
      return http.get(url).then(response => {
        resolve(response.data.data.map( (e,index) => { return { label: e.name, value: e.id }}));
      })
      .catch(error => {
        reject(error);
      });
    });
  },

  /**
   * Tipos de Modelos
   */
  getTypesModels() {
    const year = new Date().getFullYear()
    return Array.from({length: year - 1980}, (value, index) => ({label: parseInt(year - index).toString(), value: year - index}))
  },
}
