import resources from '../services/resources.js'
import vehicles  from '../services/vehicles.js'
import users  from '../services/users.js'
import inspections  from '../services/inspections.js'

export default ({ Vue }) => {
	Vue.prototype.$resources = resources
	Vue.prototype.$resourcesVehicles = vehicles
	Vue.prototype.$resourcesUsers = users
	Vue.prototype.$resourcesInspections = inspections
}