<template>
	<q-page v-show="!$store.state.data.load_inner">
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
					  		<div class="row q-my-md q-mb-lg">
	                            <q-field :error="$v.search.text.$error" class="col-12">
							  		<q-input v-model="search.text"
							  				 class="w-100 uppercase"
							  				 placeholder="BUSCAR POR PLACA"
							  				 v-on:keyup.enter="searchPlaque"
		                                     :after="[{
		                                        icon: 'search',
		                                        handler() {
		                                        	searchPlaque()
		                                        }
		                                     }]"/>
	                            </q-field>
					  		</div>
					  	</q-timeline-entry>

				    		<router-link v-for="(item, index) in $store.getters['vehicle/GET_VEHICLES']" :key="index" class="q-timeline-link" v-show="!search.show" :to="{ name:'vehicles.update',params:{board: uppercase(item.board)}}">
								<q-timeline-entry
								  	:heading="false"
								    :title="item | title"
								    :subtitle="item.created_at_date+' '+item.created_at_time"
								    side="right">
							  		<p class="mb-0"><b>Marca: </b>{{ item.brand ? item.brand : 'N/D' }}</p>
							  		<p class="mb-0"><b>Tipo de Servicio: </b>{{ item.service_type_text ? item.service_type_text : 'N/D' }}</p>
							  		<p class="mb-0"><b>Tipo de Vehículo: </b> {{ item.type_vehicle_text ? item.type_vehicle_text : 'N/D' }}</p>
							  	</q-timeline-entry>
							</router-link>
					</q-timeline>
				</div>
				<div class="col-12 d-block q-py-md">
 					<div v-infinite-scroll="loadMore" :infinite-scroll-disabled="$store.getters['inspections/GET_PAGE_BUSY']" infinite-scroll-distance="10"></div> 
				</div>
			</div>
		</div>
	</q-page>
</template>

<script>
	import config from 'src/config/index'
    import { required, minLength } from 'vuelidate/lib/validators';

	export default {
		name: 'PageOrdens',
		data() {
			return {
				search: {
					text: null,
					show: false
				}
			}
		},
	    created() {           
        	if(this.$store.getters['vehicle/IF_EMPYT_VEHICLES']) {
        		this.$store.commit('vehicle/RESET_VEHICLE_LIST')
	    		this.loadMore()
        	}else {
        		this.$store.commit('data/LOAD_FALSE')
        	}
	    },
  		beforeDestroy() {
  			this.$store.commit('vehicle/RESET_VEHICLE_LIST')
  			this.clearSearch()
  		},
		filters: {
			title: function (item) {
				let model = item.model ? '|' + item.model : ''
				return item.board.toUpperCase() + model
			},
			uppercase: function (item) {
				return item.toUpperCase()
			}
		},
        validations: {
            search: {
                text: { required, minLength: minLength(6)  }
            },
        },
		methods: {
			clearSearch() {
    			this.search.text = null
    			this.search.show = false
			},
			uppercase(board) {
				return board.toUpperCase()
			},
			loadMore () {
        		if(!this.$store.getters['vehicle/GET_PAGE_BUSY']) {
	        		
    				this.$store.commit('vehicle/SET_PAGE_BUSY',true)

	        		this.$store.commit('data/LOAD_TRUE')

		        	this.$resourcesVehicles.getVehicles(this.$store.getters['vehicle/GET_PAGE'])

		        	.then(response => {

        				response.data.forEach((val)=>{
        					this.$store.commit('vehicle/ADD_VEHICLE_LIST',val)
        				});

        				this.$store.commit('vehicle/INCREMENT_PAGE')

	        			let page = response.meta.page;

	        			let busy = page.lastPage == page.currentPage ? true : false

	    				this.$store.commit('vehicle/SET_PAGE_BUSY',busy)

		        	}).catch(error => {
						this.$q.notify({message: 'Ocurrio algo inesperado.',  position: 'top-right', closeBtn: true})
						console.log(error);
		        	}).then(() => {
	        			this.$store.commit('data/LOAD_FALSE')
		        	});
	        	}
			},
            searchPlaque () {
                this.$v.search.$touch()
                this.$store.commit('data/LOAD_TRUE')
                if (this.$v.search.$error)
                    this.$store.commit('data/LOAD_FALSE')
                else{
                    let board = this.search.text.replace(/ /g, "")
                    this.$resourcesVehicles.searchVehicle(board).then(response => {
                    	if(response.data != '')
                    		this.$router.push({ name: 'vehicles.update', params:{board: board.toUpperCase()} })
                    	else {
                        	this.$store.commit('data/LOAD_FALSE')
                        	this.$q.notify({message: 'Matricula no registrada.',  position: 'top-right', closeBtn: true})
                    	}
                    }).catch(error => {
                        this.$q.notify({message: 'Ocurrio algo inesperado.',  position: 'top-right', closeBtn: true})
                        this.$store.commit('data/LOAD_FALSE')
                    })
                }
            },
		}
	}
</script>