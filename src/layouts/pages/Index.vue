<template>
  <q-page class="container-section q-py-lg">
    <div class="row">
    	<div class="col-12 col-sm-8 col-md-6 col-lg-5 mx-auto">
		    <div class="row q-py-sm">
		    	<div class="col-12 text-center">
		  			<p>Datos de Usuario</p>
		    	</div>
		  	</div>

    		<q-field :error="$v.form.type_document.$error" error-label="" class="q-my-md">
	        	<span class="w-50 d-inline-block">
	    			Tipo de documento
	        	</span>
	        	<div class="w-50 d-inline-block">
	    			<q-select v-model="form.type_document" :options="selectOptions" class="bg-white q-my-md"/>
	        	</div>
			</q-field>

    		<q-field :error="$v.form.document.$error" error-label="" class="q-my-md">
				<q-search v-model="form.document" type="text" placeholder="N° Cédula" class="bg-white mx-auto"/>
			</q-field>

    		<q-field :error="$v.form.name.$error" error-label="" class="q-my-md">
    			<q-input v-model="form.name" type="text" placeholder="Nombre completo" class="bg-white mx-auto"/>
    		</q-field>

    		<q-field :error="$v.form.phone.$error" error-label="" class="q-my-md">
    			<q-input v-model="form.phone" type="text" placeholder="Celular" class="bg-white mx-auto"/>
    		</q-field>

    		<q-field :error="$v.form.email.$error" error-label="" class="q-my-md">
    			<q-input v-model="form.email" type="text" placeholder="Correo eléctronico" class="bg-white mx-auto"/>
    		</q-field>

    		<q-field :error="$v.form.checked.$error" error-label="" class="q-my-md">
	    		<q-checkbox v-model="form.checked" label="Autorizo la toma de datos personales" class="mx-auto"/>
	    	</q-field>

	    	<div class="col-12 text-center">
	    		<q-btn color="black" size="md" label="ENVIAR" class="q-px-lg btn-app" @click="submit"/>
	    	</div>
    	</div>
    </div>
  </q-page>
</template>

<script>
import { required, email, minLength } from 'vuelidate/lib/validators'

export default {
	name: 'PageIndex',
  	data () {
    	return {
    		form : {
    			phone: null,
    			email: null,
    			name: null,
    			document: null,
    			type_document: 'cedula',
    			checked: false,
    		},
      		selectOptions: [
        		{
        		  label: 'Cédula',
        		  value: 'cedula'
        		},
        		{
        		  label: 'Pasaporte',
        		  value: 'pasaporte'
        		}
    		],
    	}
    },
	validations: {
	    form: {
	    	email: { required, email },
	    	phone: { required },
	    	name: { required, minLength: minLength(4) },
	    	document: { required,minLength: minLength(4) },
	    	checked: { required },
	    	type_document: { required }
	    }
	},
	methods: {
	    submit () {
	    	this.$v.form.$touch()
	      	if (this.$v.form.$error) {
	        	this.$q.notify({message: 'Please review fields again.',  position: 'top-right', closeBtn: true})
	        	return
	      	}else
	      		this.$router.push('data')
	    }
	}
}
</script>
