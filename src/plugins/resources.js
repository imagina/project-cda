import resources from '../services/resources.js'

export default ({ Vue }) => {
	Vue.prototype.$resources = resources
}