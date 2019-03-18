<template>
	<q-page>
	    <div class="layout-padding q-py-lg">
			<div class="row">
				<div class="col-12">
					<q-list>
					  	<q-list-header class="h2">Lista de Ordenes</q-list-header>
					  	<q-item v-for="(item, index) in ordens" :key="index" class="bg-white mb-2 shadow-1">
					      	<q-item-tile sublabel lines="105" class="pl-2">
					      		{{ item }}
						        <!-- <h5 class="mx-auto">MATRICULA: {{ item[0].vehicle.board }}</h5> -->
						       	<p class="q-mb-xs">
						       		<!-- Inspector: {{ item[0].inspector.fullname }} -->
						       	</p>
						       	<p class="q-mb-xs">
						       		<!-- Tipo de vehículo: {{ item[0].vehicle.typeVehicle }} -->
						       	</p>
						       	<small>
						       		<!-- {{ item[0].createdAtDate +' '+ item[0].createdAtTime }} -->
						       	</small>
					      	</q-item-tile>
					  	</q-item>
					</q-list>
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

export default {
	name: 'PageOrdens',
  	data () {
    	return {
    		ordens: [],
    		busy: false,
    		page: 1,
    	}
    },
    created() {
    },
	methods: {
		loadMore () {
        	if(!this.busy) {    		
        		this.busy = true
	        	resources.getInspections(this.page)
	        	.then(response => {
	        		if(response.data.data.length > 0) {
	        			this.ordens.push(response.data)
	        			// this.ordens = this.ordens[0]
						// console.log(response.data.data);
						console.log(this.ordens);
	        			this.page = this.page + 1
	        			this.busy = false
	        		} else {
	        			this.busy = true
	        		}
	        	}).catch(error => {
					console.log(error);
	        	});
        	}
		},
	}
}
</script>

<style>
	.q-list{
		border: none;
	}
</style>