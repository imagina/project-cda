import Vue from 'vue'
import Vuex from 'vuex'
import auth from '@imagina/quser/_store/auth/index'; //Import this file
import orden from './orden/index';

Vue.use(Vuex)

const store = new Vuex.Store({
	modules: {
		auth,
		orden
	}
});

export default store
