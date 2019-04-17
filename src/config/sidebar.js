/**
 * Config for items in Menu
 */
export default {
  /*home*/
  home: {
    title: 'Inicio',
    icon: 'fas fa-home',
    to: 'home',
  },
  /*Ordens*/
  ordens: {
    title: 'Inspecciones',
    icon: 'fas fa-list',
    to: 'inspections',
    can: 'icda.inspections.index',
  },
  Vehiculos: {
    title: 'Vehiculos',
    icon: 'fas fa-car',
    to: 'vehicles.index',
    can: 'icda.vehicles.index',
  },
  /*logout*/
  logout: {
    title: 'Desconectar',
    icon: 'fas fa-sign-out-alt',
    to: 'auth.logout'
  }
}
