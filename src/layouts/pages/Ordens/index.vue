<template>
	<q-page>
	    <div class="layout-padding q-py-lg">
			<div class="row">
				<div class="col-12">
					<q-list v-if="ordens">
					  	<q-list-header class="h2">Lista de Ordenes</q-list-header>
					  	<q-item v-for="(item, index) in ordens" :key="index" class="bg-white mb-2 shadow-1">
					    	<q-item-side>
					    	 	<q-item-tile avatar>
					    			<img :src="item.mainimagen">
					    	  	</q-item-tile>
					    	</q-item-side>
					      	<q-item-tile sublabel lines="5" class="pl-2">
						        <h5 class="mx-auto">{{ item.title }}</h5>
						        <p class="mx-auto">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem quis eos ea deleniti. Non commodi, animi modi illo molestias veritatis esse adipisci vel hic deserunt autem distinctio, incidunt, accusantium earum.</p>
					      	</q-item-tile>
					  	</q-item>
					</q-list>
				</div>
			</div>
	    </div>
	</q-page>
</template>

<script>
export default {
	name: 'PageOrdens',
  	data () {
    	return {
    		ordens: []
    	}
    },
    created() {
    	this.loadData();
    },
	methods: {
		loadData () {
		    this.$axios.get('/api/backend')
	    	.then((response) => {
	    		this.data = response.data
	    	})
	    	.catch(() => {
	    		this.ordens = [
					{
						mainimagen: "../../assets/moto.png",
						title: 'hodjslfjsf fldfjsdf'
					},
					{
						mainimagen: "../../assets/moto.png",
						title: 'hodjslfjsf fldfjsdf'
					}
	    		]
	    	})
		},
	}
}
</script>

<style>
	.q-list{
		border: none;
	}
</style>