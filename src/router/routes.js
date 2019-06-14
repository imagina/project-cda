import Route from 'vue-routisan'
import user from '@imagina/quser/_router/routes' //Routes module QUser
import auth from '@imagina/quser/_router/middlewares/auth' //Middleware auth
import access from '@imagina/quser/_router/middlewares/access'

// Define path where your views are stored
Route.setViewResolver(component => require('src/layouts/' + component).default)

Route.view('/', 'master')
  .guard(auth)
  .children(() => {
      Route.view('/', 'pages/Index').options({
        name: 'home'
      }),
      Route.view('/inspections/create/:user_id/:inspection?', 'pages/inspection/create').options({
        name: 'create.inspection',
        meta: {permission: 'icda.inspections.create'},
        guard: access
      }),
      Route.view('/inspections/update/:inspection?', 'pages/inspection/show').options({
        name: 'update.inspection',
        meta: { permission: 'icda.inspections.edit' },
        guard: access
      }),
      Route.view('/inspections', 'pages/inspection/index').options({
        name: 'inspections',
        meta: { permission: 'icda.inspections.index'},
        guard: access
      }),
      Route.view('/inspections2', 'pages/inspection/index2').options({
          name: 'inspections.test',
          meta: { permission: 'icda.inspections.index'},
          guard: access
      }),
      Route.view('/vehicles', 'pages/vehicle/index').options({
        name: 'vehicles.index',
        meta: { permission: 'icda.vehicles.edit'},
        guard: access
      }),
      Route.view('/vehicles2', 'pages/vehicle/index2').options({
          name: 'vehicles.index.test',
          meta: { permission: 'icda.vehicles.edit'},
          guard: access
      }),
      Route.view('/vehicles/create', 'pages/vehicle/create').options({
        name: 'vehicles.create',
        meta: {permission: 'icda.vehicles.create'},
        guard: access
      }),
      Route.view('/vehicles/update/:board', 'pages/vehicle/update').options({
        name: 'vehicles.update',
        meta: {permission: 'icda.vehicles.edit'},
        guard: access
      })
    }
  )

Route.view('/', 'blank')
    .children(() => {
      Route.view('/login-0', 'pages/login').options({
        name: 'login-0'
      })
    }
  )

Route.view('*', 'pages/404')//Route error 404

export default Route.all()
