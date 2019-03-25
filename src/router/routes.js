import Route from 'vue-routisan'
import user from '@imagina/quser/_router/routes' //Routes module QUser
import auth from '@imagina/quser/_router/middlewares/auth' //Middleware auth

// Define path where your views are stored
Route.setViewResolver(component => require('src/layouts/' + component).default)


Route.view('/', 'master')
  .guard(auth)
  .children(() => {
      Route.view('/', 'pages/Index').options({
        name: 'home'
      }),
      Route.view('/inspections/create/:user_id/:inspection?', 'pages/inspection/create').options({
        name: 'create.inspection'
      }),
      Route.view('/inspections/update/:user_id/:inspection?', 'pages/inspection/create').options({
        name: 'update.inspection'
      }),
      Route.view('/inspections', 'pages/inspection/index').options({
        name: 'inspections'
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
