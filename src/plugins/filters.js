import config from 'src/config/index'

export default ({ Vue }) => {

	Vue.filter('asset', function (value) {
		return config('api.base_url') + '/' +value;
	});

	Vue.filter('uppercase', function (value) {
		return value ? value.toUpperCase() : 'N/D'
	});

}