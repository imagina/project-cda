<template>
  <q-page>
  	<div class="layout-padding q-py-lg">
	    <div class="row">
	    	<div class="col-12 mx-auto">
				<div class="row">
			        <div class="col-12 col-md-5 mx-auto">
			        	<span class="w-50 d-inline-block font-weight-bold">
			    			TIPO DE INSPECCIÓN:
			        	</span>
			        	<div class="w-50 d-inline-block">
			    			<q-select v-model="formSearch.type_inspection" :options="selectInspection" class="bg-white q-py-sm q-my-md"/>
			        	</div>
			        </div>
				</div>
			    <hr>
	    	</div>
	    	<div class="col-12 col-sm-8 col-md-6 col-lg-4 mx-auto">
			    <div class="row q-pt-sm q-mb-md">
			    	<div class="col-12 text-center font-weight-bold">
			  			<p>Datos de la Motocicleta</p>
			    	</div>
			  	</div>
	    		<div class="col">
	    			<span>PLACA</span>
					<q-search v-model="formSearch.plaque" class="bg-white q-my-md" type="text" placeholder="Placa" v-on:keyup.enter="searchPlaque"/>
	    		</div>
	    	</div>
	    </div>
    </div>
	<div v-if="showData">
	    <div class="container-fluid bg-gray-10">
	        <div class="row align-items-center">
	            <div class="col-12 col-md-3 px-2 py-3 bg-primary text-right">
	                <span class="h2 font-weight-bold my-3 d-block">SOAT</span>
	            </div>
	            <div class="col-4 col-md-2 mx-auto py-3 text-center">
	                <p class="font-weight-bold font-famili"><b>Fecha de Expedición</b></p>
	                <p class="mb-0">24/11/2018</p>
	            </div>
	            <div class="col-4 col-md-3 mx-auto py-3 text-center">
	                <p class="font-weight-bold font-famili"><b>Fecha Inicio De Vigencia</b></p>
	                <p class="mb-0">24/11/2018</p>
	            </div>
	            <div class="col-4 col-md-2 mx-auto py-3 text-center">
	                <p class="font-weight-bold font-famili"><b>Fecha Fin De Vigencia</b></p>
	                <p class="mb-0">24/11/2018</p>
	            </div>
	            <div class="col-4 col-md-2 mx-auto py-3 text-center">
	                <p class="font-weight-bold font-famili"><b>Estado</b></p>
	                <p class="mb-0 text-green text-uppercase"><b>VIGENTE</b></p>
	            </div>
	        </div>
	    </div>
	    <div class="layout-padding q-py-lg">
	        <div class="row my-3">
	            <div class="col-12 col-md-6">
	                <div class="d-block">
	                    <p class="d-inline-block font-weight-bold">
	                        <span class="q-mr-sm">Tipo de servicio: </span> <span>PARTICULAR</span>
	                    </p>
	                </div>
	                <div class="d-block">
	                    <p class="d-inline-block font-weight-bold">
	                        <span class="q-mr-sm">Clase de Vehículo: </span> <span>MOTOCICLETA</span>
	                    </p>
	                </div>
	                <div class="d-block">
	                    <p class="d-inline-block font-weight-bold">
	                        <span class="q-mr-sm">Marca: </span> <span>HONDA</span>
	                    </p>
	                </div>
	                <div class="d-block">
	                    <p class="d-inline-block font-weight-bold">
	                        <span class="q-mr-sm">Línea: </span> <span>CB</span>
	                    </p>
	                </div>
	                <div class="d-block">
	                    <p class="d-inline-block font-weight-bold">
	                        <span class="q-mr-sm">Modelo: </span> <span>2012</span>
	                    </p>
	                </div>
	                <div class="d-block">
	                    <p class="d-inline-block font-weight-bold">
	                        <span class="q-mr-sm">N° Licencia de Tránsito: : </span> <span>10010522505</span>
	                    </p>
	                </div>
	                <div class="d-block">
	                    <p class="d-inline-block font-weight-bold">
	                        <span class="q-mr-sm">Fecha de Matrícula: : </span> <span>14/07/2011</span>
	                    </p>
	                </div>
	            </div>
	            <div class="col-12 col-md-6">
	                <div class="d-block">
	                    <p class="d-inline-block font-weight-bold">
	                        <span class="q-mr-sm">Color: </span> <span>GRIS</span>
	                    </p>
	                </div>
	                <div class="d-block">
	                    <p class="d-inline-block font-weight-bold">
	                        <span class="q-mr-sm">Tipo de combustible: </span> <span>GASOLINA</span>
	                    </p>
	                </div>
	                <div class="d-block">
	                    <p class="d-inline-block font-weight-bold">
	                        <span class="q-mr-sm">N°Vin: </span> <span>KNAJT811AC7290082</span>
	                    </p>
	                </div>
	                <div class="d-block">
	                    <p class="d-inline-block font-weight-bold">
	                        <span class="q-mr-sm">M° de Chases: </span> <span>KNAJT811AC7920082</span>
	                    </p>
	                </div>
	                <div class="d-block">
	                    <p class="d-inline-block font-weight-bold">
	                        <span class="q-mr-sm">N° de Motor: </span> <span>G4FCBH2655</span>
	                    </p>
	                </div>
	                <div class="d-block">
	                    <p class="d-inline-block font-weight-bold">
	                        <span class="q-mr-sm">Cilindraje: </span> <span>109</span>
	                    </p>
	                </div>
	            </div>
	        </div>
	        <div class="row my-3">
	        	<hr class="col-12 my-4">
	        	<div class="col-12">
	        		<span class="d-inline-block q-mr-lg font-weight-bold">Vehículo de Enseñanza:</span>	
	        		<div class="d-inline-block">
	        			<q-radio v-model="teaching_vehicle" val="opt2" label="Si" class="q-mr-lg"/>
	        			<q-radio v-model="teaching_vehicle" val="opt3" label="No" class="q-mr-lg"/>
	        		</div>
	        	</div>
	        	<hr class="col-12 my-4">
	        	<div class="col-12 col-md-6">
	        		<span class="font-weight-bold">Kilometraje:</span>
	    			<q-input v-model="form.phone" :class="{ 'form-group--error': $v.form.phone.$error }" type="text" placeholder="Kilometraje" class="bg-white q-my-md"/>
	        	</div>
	        	<div class="col-12 col-md-6">
	        		<span class="font-weight-bold">Kilometraje:</span>
	    			<q-input v-model="form.phone" :class="{ 'form-group--error': $v.form.phone.$error }" type="text" placeholder="Kilometraje" class="bg-white q-my-md"/>
	        	</div>
	        	<hr class="col-12 my-4">
	        	<div class="col-12 text-center q-my-md">
	        		<span class="font-weight-bold">Pre-Inspección</span>
	        	</div>
	        	<div class="col-12 q-mt-md">
	        		<span class="d-inline-block font-weight-bold q-mr-lg">Motocicleta limpia</span>
	        		<div class="d-inline-block">
	        			<q-radio v-model="teaching_vehicle" val="teaching_vehicle_1" label="Si" class="q-mr-lg"/>
	        			<q-radio v-model="teaching_vehicle" val="teaching_vehicle_1" label="No" class="q-mr-lg"/>
	        		</div>
	        	</div>
	        	<div class="col-12 q-my-md">
	        		<span class="d-inline-block font-weight-bold q-mr-lg">Descargado</span>
	        		<div class="d-inline-block">
	        			<q-radio v-model="teaching_vehicle" val="teaching_vehicle_2" label="Si" class="q-mr-lg"/>
	        			<q-radio v-model="teaching_vehicle" val="teaching_vehicle_2" label="No" class="q-mr-lg"/>
	        		</div>
	        	</div>
	        	<hr class="col-12 my-4">
	        	<div class="col-12 q-my-md">
	        		<div class="row">
	        			<div class="col" style="max-width: 150px">
	        				Llantas
	        			</div>
	        			<div class="col">
	        				<div class="row">    					
			        			<div class="col"  style="max-width: 200px">
			        				<p class="font-weight-bold">Eje  1</p>
			        				<p class="font-weight-bold q-mr-lg">Presión Inicial:</p>
			        				<p class="font-weight-bold q-mr-lg">Ajuste:</p>
			        			</div>
			        			<div class="col">
			        				<q-input v-model="value" type="text" class="bg-white q-py-sm q-my-md" style="max-width: 100px"/>
			        				<q-input v-model="value" type="text" class="bg-white q-py-sm q-my-md" style="max-width: 100px"/>
			        			</div>
			        			<hr class="col-12 q-mb-lg">
	        				</div>
	        				<div class="row">    					
			        			<div class="col"  style="max-width: 200px">
			        				<p class="font-weight-bold">Eje  1</p>
			        				<p class="font-weight-bold q-mr-lg">Presión Inicial:</p>
			        				<p class="font-weight-bold q-mr-lg">Ajuste:</p>
			        			</div>
			        			<div class="col">
			        				<q-input v-model="value" type="text" class="bg-white q-py-sm q-my-md" style="max-width: 100px"/>
			        				<q-input v-model="value" type="text" class="bg-white q-py-sm q-my-md" style="max-width: 100px"/>
			        			</div>
	        				</div>
	        			</div>
	        		</div>
	        	</div>
	        	<hr class="col-12 my-4">
	        	<div class="col-12 q-my-lg text-center">
	        		<p class="font-weight-bold q-my-lg">Inventario</p>
					<div class="row">
						<div class="col col-md-8 mx-auto">
			        		<div class="row border">
			        			<div class="col q-py-md"></div>
			        			<div class="col q-py-md border-l font-weight-bold col-checkout">B</div>
			        			<div class="col q-py-md border-l font-weight-bold col-checkout">D</div>
			        			<div class="col q-py-md border-l font-weight-bold col-checkout">M</div>
			        			<div class="col q-py-md border-l font-weight-bold col-count"><span class="text-truncate">Cantidad</span></div>
			        		</div>
			        		<div class="row border border-t-0" v-for="item in inventory">
			        			<div class="col q-py-sm font-weight-bold">{{ item.name }}</div>
			        			<div class="col q-py-sm border-l col-checkout text-center">
			        				<div class="q-mt-sm">
			        					<q-radio v-model="item.b" :val="item.name+'b'" class="q-mr-lg mx-auto"/>
			        				</div>
			        			</div>
			        			<div class="col q-py-sm border-l col-checkout">
			        				<div class="q-mt-sm">
			        					<q-radio v-model="item.r" :val="item.name+'r'" class="q-mr-lg mx-auto"/>
			        				</div>
			        			</div>
			        			<div class="col q-py-sm border-l col-checkout">
			        				<div class="q-mt-sm">
			        					<q-radio v-model="item.m" :val="item.name+'m'" class="q-mr-lg mx-auto"/>
			        				</div>
			        			</div>
			        			<div class="col q-py-sm border-l col-count">
			        				<q-input v-model="item.count" type="text" class="bg-white q-py-sm q-my-md"/>
			        			</div>
			        		</div>
			        		<div class="row">
								<div class="col q-mt-md text-left">
									<q-btn round color="primary" size="sm">
										<q-icon name="add"/>
									</q-btn>
			        				<span class="q-ml-sm font-weight-bold">Agregar Item</span>
								</div>
			        		</div>
						</div>
					</div>
	        	</div>
	        	<div class="col-12 q-my-lg">
	        		<p class="font-weight-bold">Fotografías</p>
	        	</div>
	        	<div class="col-12 q-my-md">
					<q-input v-model="value" type="textarea" float-label="Observaciones:" :max-height="10" rows="4" class="bg-white"/>
	        	</div>
	    		<div class="col-12 text-right">
	    			<q-btn color="black" size="md" label="Guardar" class="q-px-lg btn-app" @click="submit"/>
	    		</div>
	        </div>
	    </div>
	</div>
  </q-page>
</template>

<script>
import { required, email, minLength } from 'vuelidate/lib/validators'

export default {
	name: 'PageData',
  	data () {
    	return {
    		value: null,
    		showData: false,
    		teaching_vehicle: false,
    		formSearch : {
    			type_inspection: 1,
    			plaque: null
    		},
    		form : {
    			phone: null,
    			email: null,
    			name: null,
    			document: null,
    			checked: null,
    		},
      		selectInspection: [
        		{
        			label: 'Revision Inicial',
        			value: 1
        		},
        		{
        			label: 'Revision Final',
        			value: 2
        		}
    		],
    		inventory: [
    		  	{
    		    	name: 'Espejos',
    		    	b: false,
    		    	r: false,
    		    	m: false,
    		    	count: null
    		  	},
    		  	{
    		    	name: 'Tablero',
    		    	b: false,
    		    	r: false,
    		    	m: true,
    		    	count: null
    		  	},
    		  	{
    		    	name: 'Rines de Lujo',
    		    	b: true,
    		    	r: false,
    		    	m: false,
    		    	count: null
    		  	},
    		]
    	}
    },
	validations: {
	    formSearch: {
	    	type_inspection: { required },
	    	plaque: { required, minLength: minLength(6)  }
	    },
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
		searchPlaque () {
	    	this.$v.formSearch.$touch()
			this.$q.loading.show()
	      	if (this.$v.formSearch.$error) {
				this.$q.loading.hide()
	      	}
			else{
                setTimeout(() => {
	      			setTimeout(this.$q.loading.hide(),1500);
	      			this.showData = true;
                }, 1800);
			}
		},
	    submit () {
	    	this.$v.form.$touch()
	      	if (this.$v.form.$error) {
	        	this.$q.notify({message: 'Please review fields again.',  position: 'top-right', closeBtn: true})
	        	return
	      	}
	    }
	}
}
</script>
