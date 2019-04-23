<template>
	<q-page>
	    <div class="layout-padding q-py-lg">
			<div class="row">
				<div class="col-12">
					<q-timeline responsive color="black" :responsive="false" class="border-bottom-none">
					  <q-timeline-entry heading>
					    <span>Lista de Ordenes </span>
	                    <div class="d-inline-block">
	                        <q-select v-model="inspection_statues.status" :options="inspection_statues.options" class="bg-white q-py-sm q-my-md"/>
	                    </div>
	                   	<hr class="mt-0 q-my-sm">
					  </q-timeline-entry>

					  <q-timeline-entry
					  	:heading="false"
					    v-for="(item, index) in ordens" :key="index"
					    :subtitle="item.created_at_date + ' ' + item.created_at_time + ' ID-'+item.id+''"
					    side="right"
					  >
					    <div class="border-bottom">
				    		<router-link  :to="{ 
				    							name: 'update.inspection',
						    					params: {
						    						inspection: item.id
						    					}
						    				}"
						    				class="link row">

					    		<div class="col mx-auto" style="max-width: 100px;">
					    			<img :src="item.gallery | img" width="100%">
					    		</div>
					    		<div class="col px-2">
					    			Matricula: <b>{{ item.vehicle.board }}</b> <br>
					    			Tipo de Servicio: {{ item.vehicle.service_type }} <br>
					    			Tipo de Vehiculo: {{ item.vehicle.type_vehicle }} <br>
					    			Cliente: {{ item.vehicle.user.fullname }} <br>
					    			Status: {{ item.inspection_status }} <br>
					    		</div>
				    		</router-link>
					    </div>
					  </q-timeline-entry>

					</q-timeline>
				</div>
                <div class="col-12 q-px-md" v-show="ordens.length == 0">
                    <q-alert color="red" icon="error" appear class="q-mb-sm">
                        NO SE ENCONTRO ORDENES
                    </q-alert>
                </div>
				<div class="col-12 d-block q-py-md">
 					<div v-infinite-scroll="loadMore" :infinite-scroll-disabled="busy" infinite-scroll-distance="10"></div> 
				</div>
			</div>
	    </div>
	</q-page>
</template>

<script>
import resources from 'src/services/resources';
import config from 'src/config/index'

export default {
	name: 'PageOrdens',
  	data () {
    	return {
    		ordens: [],
    		busy: false,
    		page: 1,
            inspection_statues: {
            	status: 0,
            	change: false,
            	options: []
            },
    	}
    },
    created() {
        this.$store.commit('orden/RESET_ORDEN')
	    this.inspection_statues.options = this.$store.getters['data/GET_TYPES_INSPECTIONS_STATUES']
    },
    watch: {
    	'inspection_statues.status': {
  		handler(newValue, oldValue) {
  			this.page = 1
  			this.busy = false
  			this.inspection_statues.change = true
  			this.loadMore()
  		},
  			deep: true
    	},
    },
    filters: {
    	img: function(gallery) {
    		return gallery ? config('api.base_url') +'/'+ gallery[0]  : 'assets/imagen.png';
    	}
    },
	methods: {
		loadMore () {
        	if(!this.busy) {
        		
        		this.busy = true

        		this.$q.loading.show()

	        	resources.getInspections(this.page,this.inspection_statues.status)

	        	.then(response => {
	        		if(this.inspection_statues.change)
        				this.ordens = []

        				response.data.data.forEach((val)=>{
        					this.ordens.push(val)
        				});

        			let page = response.data.meta.page;

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