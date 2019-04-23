import Vuelidate from 'vuelidate'
import VueCordova from 'vue-cordova'

export default ({ Vue }) => {
  	Vue.use(Vuelidate)
  	Vue.prototype.$cordova = VueCordova;

	Vue.directive("uppercase", {
	    update: function (el) {
	        el.value = el.value.toUpperCase()
	    }
	})
}
