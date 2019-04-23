import Vue from 'vue'
import Vuex from 'vuex'
import auth from '@imagina/quser/_store/auth/index'; //Import this file
import orden from './orden/index';
import data  from './data/index';
import vehicle  from './vehicle/index';
import inspections  from './inspections/index';

Vue.use(Vuex)

const store = new Vuex.Store({
	modules: {
		auth,
		data,
		orden,
		vehicle,
		inspections
	}
});

export default store
