import authPlugin from "@imagina/quser/_plugins/auth"

export default ({ Vue, store, router, pusher }) => {

	let vue = Vue.prototype;

	vue.$pusher = new Pusher(env('PUSHER_APP_KEY'), {
    	broadcaster: env('BROADCAST_DRIVER', 'pusher'),
    	key: env('PUSHER_APP_KEY'),
    	id: env('PUSHER_APP_ID'),
    	cluster: env('PUSHER_APP_CLUSTER'),
    	encrypted: env('PUSHER_APP_ENCRYPTED'),
  	});

    if (authPlugin.hasAccess('icda.inspections.index')) {
        var channel = vue.$pusher.subscribe('inspections-list');
        channel.bind('inspections', (data) =>  {
					store.commit('inspections/ADD_INSPECTION_LIST',data.inspection)
					console.log(data)
          vue.$q.notify({
            message: data.message,
            position: 'bottom-left',
            closeBtn: true,
            type: 'positive',
            color: 'blue',
            timeout: 80000,
            actions: [{
                label: 'VER',
                noDismiss: true,
                handler: () => {
                	router.push({ name: 'update.inspection', params:{inspection: data.id} })
                }
            }]
          })
        });
    }

	if (authPlugin.hasAccess('icda.vehicles.create')) {
		var channel = vue.$pusher.subscribe('vehicles-list');
		channel.bind('Modules\\Icda\\Events\\RecordListVehicles', (data) =>  {
		  	store.commit('vehicle/ADD_VEHICLE_LIST',data.vehicle)
		  	vue.$q.notify({
			    message: data.message,
			    position: 'bottom-right',
			    closeBtn: true,
			    type: 'positive',
			    color: 'blue',
			    timeout: 80000,
			    actions: [{
			        label: 'VER',
			        noDismiss: true, // optional, v0.15.11+
			        handler: () => {
			        	router.push({ name: 'vehicles.update', params:{board: data.vehicle.board.toUpperCase()} })
			        }
			    }]
			})
		});
	}
}

