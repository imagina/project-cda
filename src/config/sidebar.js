/**
 * Config for items in Menu
 */

/*
*{
  title: 'Assignment',
  icon: 'fas fa-users-cog',
  to: 'user.users.assignment',
  can:'user.users.index'
},*/

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
  },
  /*User*/
  user: {
    title: 'Users',
    icon: 'fas fa-users',
    can: 'iprofile.api.user.permission',
    children: [
      {
        title: 'Crear',
        icon: 'fas fa-user-plus',
        to: 'user.users.create',
        can: 'iprofile.api.user.create'
      },
      {
        title: 'Lista/Búsqueda',
        icon: 'fas fa-list-alt',
        to: 'user.users.index',
        can: 'iprofile.api.user.index'
      },
      {
        title: 'Mi perfil',
        icon: 'fas fa-user-tie',
        to: 'user.profile.me',
      },
      /*
      {
        title: 'Departments',
        icon: 'fas fa-cubes',
        to: 'user.department',
        can: 'iprofile.api.user.deparment'
      }
      */
    ]
  },
  /*logout*/
  logout: {
    title: 'Desconectar',
    icon: 'fas fa-sign-out-alt',
    to: 'auth.logout'
  }
}
