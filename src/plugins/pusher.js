export default ({ Vue }) => {
	Vue.prototype.$pusher = new Pusher(env('PUSHER_APP_KEY'), {
    	broadcaster: env('BROADCAST_DRIVER', 'pusher'),
    	key: env('PUSHER_APP_KEY'),
    	id: env('PUSHER_APP_ID'),
    	cluster: env('PUSHER_APP_CLUSTER'),
    	encrypted: env('PUSHER_APP_ENCRYPTED'),
  	});
}