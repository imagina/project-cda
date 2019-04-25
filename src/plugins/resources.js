import resources from '../services/resources.js'
import vehicles  from '../services/vehicles.js'

export default ({ Vue }) => {
	Vue.prototype.$resources = resources
	Vue.prototype.$resourcesVehicles = vehicles
}