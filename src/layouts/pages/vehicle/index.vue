<template>
	<q-page>
	    <div class="layout-padding q-py-lg">
			<div class="row">
				<div class="col-12">
					<q-timeline responsive color="black" :responsive="false">
					  	<q-timeline-entry heading>
					  		<div class="row q-px-md">
						  		<div class="col">
						    		<span>Lista de Vehiculos</span>
						  		</div>
						  		<div class="col-2 text-right">
				    				<router-link :to="{ name: 'vehicles.create'}" class="text-decoration-none q-btn inline relative-position q-btn-item non-selectable q-btn-rectangle q-focusable q-hoverable bg-red text-white">
				    					<q-icon name="add"/>
				    				</router-link>
						  		</div>
					  		</div>
					  	</q-timeline-entry>
			    		<router-link  v-for="(item, index) in vehicles" :key="index"
			    					class="q-timeline-link"
			    					:to="{ name: 'vehicles.update', params: { board: item.board } }">
							<q-timeline-entry
							  	:heading="false"
							    :title="item.brand + '' + item.model + ' | ' + item.board"
							    :subtitle="item.created_at_date + ' ' + item.created_at_time"
							    side="right">
						  		<p class="mb-0"><b>Tipo de Servicio:</b>{{ item.service_type }}</p>
						  		<p class="mb-0"><b>Tipo de Vehículo:</b> {{ item.type_vehicle }}</p>
						  	</q-timeline-entry>
						</router-link>

					</q-timeline>
				</div>
				<div class="col-12 d-block q-py-md">
 					<div v-infinite-scroll="loadMore" :infinite-scroll-disabled="busy" infinite-scroll-distance="10"></div> 
				</div>
			</div>
		</div>
	</q-page>
</template>

<script>
	// import resources from 'src/services/resources';
	import resources from 'src/services/vehicle';
	import config from 'src/config/index'

	export default {
		name: 'PageOrdens',
	  	data () {
	    	return {
	    		vehicles: [],
				busy: false,
				page: 1,
	    	}
	    },
	    created() {
	    	this.loadMore()
	    },
		methods: {
			loadMore () {
	        	if(!this.busy) {
	        		
	        		this.busy = true

	        		this.$q.loading.show()

		        	resources.getVehicles(this.page)

		        	.then(response => {

        				response.data.forEach((val)=>{
        					this.vehicles.push(val)
        				});

        				let page = response.meta.page
        				
	        			this.page = page.currentPage +1 

	        			this.busy = page.lastPage == page.currentPage ? true : false

		        	}).catch(error => {
						this.$q.notify({message: 'Ocurrio algo inesperado.',  position: 'top-right', closeBtn: true})
						console.log(error);
		        	}).then(() => {
	        			this.$q.loading.hide()
		        	});
	        	}
			},
		}
	}
</script>