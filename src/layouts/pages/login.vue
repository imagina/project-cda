<template>
	<div id="container-section-login" >
	  	<q-page class="container-section" style="padding-top: 0px !important; padding-bottom: 0px !important">
		    <div class="row q-mx-md" style="min-height: 100vh">
		      	<div id="form-login-left" class="col-12 col-sm-10 col-md-4 bg-primary text-center q-py-lg q-px-md">
		      		 <img src="../../assets/logo.svg" width="50%" class="q-my-lg">
		      		<hr class="col-12 q-my-lg">
			       	<p class="text-center q-mt-none q-my-lg q-pb-sm font-weight-bold">
			       		ORDEN DE SERVICIO
			       	</p>
			        <!-- USER -->
			        <q-field :error="$v.form.username.$error" error-label="Este campo es requerido">
			        	<q-input name="email"
			                   autofocus
			                   autocomplete="off"
			                   v-model="form.username"
			                   type="text"
			                   :before="[{icon: 'person'}]"
			                   @keyup.enter="authenticate()"
			                   placeholder="Email"
			                   class="bg-white q-py-sm q-pl-sm"/>
			        </q-field>

			        <!-- PASS -->
			        <q-field :error="$v.form.password.$error" error-label="Este campo es requerido">
				        <q-input v-model="form.password"
				                   type="password"
				                   name="password"
				                   :before="[{icon: 'lock'}]"
				                   @keyup.enter="authenticate()"
				                   placeholder="Password" 
				                   class="bg-white q-py-sm q-pl-sm"/>
			        </q-field>
			        
			        <!--=== LOGIN ===-->
			        <div class="text-center q-pt-lg bt-app">
			          	<q-btn  color="dark" name="submit" size="md" label="Iniciar Sesión" class="q-px-lg btn-app" @click="authenticate()"/>
			        </div>
		       	</div>
		    </div>
		</q-page>
	</div>
</template>

<script>
  	/*Plugins*/
  	import {required, email, numeric, minLength} from 'vuelidate/lib/validators';
  	import {alert} from '@imagina/qhelper/_plugins/alert'
  	import {helper} from '@imagina/qhelper/_plugins/helper'

  	export default {
	    data() {
	      return {
	        form: {
	        	username: null,
	        	password: null
	        },
	        rememberData: true,
	        loading_login: false
	      }
	    },
	    validations: {
	   		form: {
	        	username: {required},
	        	password: {required}
	    	}
	    },
	    methods: {
		    async authenticate() {
		        this.$v.$touch();
		        if (this.$v.$error) {
		        	alert.error('Please review fields again.', 'bottom');
		        } else {
		        	this.loading_login = !this.loading_login;
		        	const {username, password} = this.form;
		        	this.$store.dispatch("auth/AUTH_REQUEST", {username, password}).then(response => {
		            	this.loading_login = !this.loading_login;
		        	});
		        }
		    },

	    }
  	}
</script>

<style>
	#container-section-login
	{
		/*padding: 0px;*/
		/*margin: 0px;*/
		background-image: url('../../assets/bg-login.jpg');
		background-size: cover;
		background-position: center;
		background-repeat: none;
	}
</style>
