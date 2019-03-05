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
			    <div class="row q-pt-sm q-mb-md q-my-md">
			    	<div class="col-12 text-center font-weight-bold">
			  			<p>Datos de la Motocicleta</p>
			    	</div>
			  	</div>
    			<q-field :error="$v.formSearch.plaque.$error" class="q-my-md">
	    			<span class="font-weight-bold">PLACA</span>
					<q-search v-model="formSearch.plaque" class="bg-white q-mt-sm" type="text" placeholder="Placa" v-on:keyup.enter="searchPlaque"/>
    				<div class="error-messages q-px-sm" v-if="$v.formSearch.plaque.$error">
    					<p class="error-message mb-0" v-if="!$v.formSearch.plaque.required">
    						<i class="material-icons">error_outline</i> El campo es obligatorio.
    					</p>
    					<p class="error-message mb-0" v-if="!$v.formSearch.plaque.minLength">
    						<i class="material-icons">error_outline</i> Debe contener al menos 6 caracteres.
    					</p>
    				</div>
  				</q-field>
	    	</div>
	    </div>
    </div>
	<div v-if="showData">
	    <div class="container-fluid bg-gray-10 q-my-md">
	        <div class="row align-items-center">
	            <div class="col-12 col-md-3 px-2 py-3 bg-primary text-right">
	                <span class="h2 font-weight-bold my-3 d-block">SOAT</span>
	            </div>
	            <div class="col-4 col-md-2 mx-auto py-3 text-center">
	                <p class="font-weight-bold font-famili"><b>Fecha de Expedición</b></p>
	                <p class="mb-0">{{ data.soat.dateExpedition }}</p>
	            </div>
	            <div class="col-4 col-md-3 mx-auto py-3 text-center">
	                <p class="font-weight-bold font-famili"><b>Fecha Inicio De Vigencia</b></p>
	                <p class="mb-0">{{ data.soat.dateStartValidity }}</p>
	            </div>
	            <div class="col-4 col-md-2 mx-auto py-3 text-center">
	                <p class="font-weight-bold font-famili"><b>Fecha Fin De Vigencia</b></p>
	                <p class="mb-0">{{ data.soat.dateEndValidity }}</p>
	            </div>
	            <div class="col-4 col-md-2 mx-auto py-3 text-center">
	                <p class="font-weight-bold font-famili"><b>Estado</b></p>
	                <p class="mb-0 text-uppercase" :class="{'text-green': data.soat.validity, 'text-red': !data.soat.validity}">
	                	<b>{{ data.soat.validity|validity }}</b>
	                </p>
	            </div>
	        </div>
	    </div>
	    <div class="layout-padding q-py-lg">
			<!-- Atributos -->
	        <div class="row my-3">
	            <div class="col-12 col-md-6">
	                <div class="d-block">
	                    <p class="d-inline-block">
	                        <span class="q-mr-sm">Tipo de servicio: </span> 
	                        <div class="d-inline-block font-weight-bold">
	                        	<q-input v-model="data.attributes.tipo_servicio" type="text"/>
	                        </div>
	                    </p>
	                </div>
	                <div class="d-block">
	                    <p class="d-inline-block">
	                        <span class="q-mr-sm">Clase de Vehículo: </span> 
	                        <div class="d-inline-block font-weight-bold">
	                        	<q-input v-model="data.attributes.clase_vehículo" type="text"/>
	                        </div>
	                    </p>
	                </div>
	                <div class="d-block">
	                    <p class="d-inline-block">
	                        <span class="q-mr-sm">Marca: </span> 
	                        <div class="d-inline-block font-weight-bold">
	                        	<q-input v-model="data.attributes.marca" type="text"/>
	                        </div>
	                    </p>
	                </div>
	                <div class="d-block">
	                    <p class="d-inline-block">
	                        <span class="q-mr-sm">Línea: </span> 
	                        <div class="d-inline-block font-weight-bold">
	                        	<q-input v-model="data.attributes.linea" type="text"/>
	                        </div>
	                    </p>
	                </div>
	                <div class="d-block">
	                    <p class="d-inline-block">
	                        <span class="q-mr-sm">Modelo: </span>
	                        <span class="d-inline-block font-weight-bold">
	                        	<q-input v-model="data.attributes.modelo" type="text"/>
	                        </span>
	                    </p>
	                </div>
	                <div class="d-block">
	                    <p class="d-inline-block">
	                        <span class="q-mr-sm">N° Licencia de Tránsito: : </span>
	                        <span class="d-inline-block font-weight-bold">
	                        	<q-input v-model="data.attributes.n_licencia" type="text"/>
	                        </span>
	                    </p>
	                </div>
	                <div class="d-block">
	                    <p class="d-inline-block">
	                        <span class="q-mr-sm">Fecha de Matrícula: : </span>
	                        <span class="d-inline-block font-weight-bold">
	                        	<q-input v-model="data.attributes.fecha_matricula" type="text"/>
	                        </span>
	                    </p>
	                </div>
	            </div>
	            <div class="col-12 col-md-6">
	                <div class="d-block">
	                    <p class="d-inline-block">
	                        <span class="q-mr-sm">Color: </span>
	                        <span class="d-inline-block font-weight-bold">
	                        	<q-input v-model="data.attributes.color" type="text"/>
	                        </span>
	                    </p>
	                </div>
	                <div class="d-block">
	                    <p class="d-inline-block">
	                        <span class="q-mr-sm">Tipo de combustible: </span>
	                        <span class="d-inline-block font-weight-bold">
	                        	<q-input v-model="data.attributes.tipo_combustible" type="text"/>
	                        </span>
	                    </p>
	                </div>
	                <div class="d-block">
	                    <p class="d-inline-block">
	                        <span class="q-mr-sm">N°Vin: </span>
	                        <span class="d-inline-block font-weight-bold">
	                        	<q-input v-model="data.attributes.n_vin" type="text"/>
	                        </span>
	                    </p>
	                </div>
	                <div class="d-block">
	                    <p class="d-inline-block">
	                        <span class="q-mr-sm">M° de Chases: </span>
	                        <span class="d-inline-block font-weight-bold">
	                        	<q-input v-model="data.attributes.n_chases" type="text"/>
	                        </span>
	                    </p>
	                </div>
	                <div class="d-block">
	                    <p class="d-inline-block">
	                        <span class="q-mr-sm">N° de Motor: </span>
							<div class="d-inline-block font-weight-bold">
								<q-input v-model="data.attributes.n_motor" type="text"/>
							</div>
	                    </p>
	                </div>
	                <div class="d-block">
	                    <p class="d-inline-block">
	                        <span class="q-mr-sm">Cilindraje: </span>
							<div class="d-inline-block font-weight-bold">
								<q-input v-model="data.attributes.cilindraje" type="text"/>
							</div>
	                    </p>
	                </div>
	            </div>
	        </div>
			<!-- /Atributos -->
	        <div class="row q-my-md">
	        	<div class="col-12">
	        		<hr class="q-my-sm">
	        		<span class="d-inline-block q-mr-lg font-weight-bold">Vehículo de Enseñanza:</span>	
	        		<div class="d-inline-block">
	        			<q-radio v-model="data.teaching_vehicle" val="1" label="Si" class="q-mr-lg"/>
	        			<q-radio v-model="data.teaching_vehicle" val="0" label="No" class="q-mr-lg"/>
	        		</div>
	        	</div>

	        	<!-- kilometraje & diametro -->
	        	<hr class="col-12 my-4">
	        	<div class="col-12 col-md-6">
	        		<span class="font-weight-bold">Kilometraje:</span>
	    			<q-input v-model="data.kilometraje" type="text" placeholder="Kilometraje" class="bg-white q-my-md"/>
	        	</div>
	        	<div class="col-12 col-md-6">
	        		<span class="font-weight-bold">Diametro Exhosto:</span>
	    			<q-input v-model="data.diametro_exhosto" type="text" placeholder="Diametro Exhosto" class="bg-white q-my-md"/>
	        	</div>
	        	<hr class="col-12 my-4">
	        	<!-- /kilometraje & diametro-->

	        	<!-- Pre-Inspección -->
	        	<div class="col-12 text-center q-my-md">
	        		<span class="font-weight-bold">Pre-Inspección</span>
	        	</div>
	        	<div class="col-12 q-mt-md">
	        		<span class="d-inline-block font-weight-bold q-mr-lg">Motocicleta limpia</span>
	        		<div class="d-inline-block">
	        			<q-radio v-model="data.motocicleta_limpia" val="1" label="Si" class="q-mr-lg"/>
	        			<q-radio v-model="data.motocicleta_limpia" val="0" label="No" class="q-mr-lg"/>
	        		</div>
	        	</div>
	        	<div class="col-12 q-my-md">
	        		<span class="d-inline-block font-weight-bold q-mr-lg">Descargado</span>
	        		<div class="d-inline-block">
	        			<q-radio v-model="data.descargado" val="1" label="Si" class="q-mr-lg"/>
	        			<q-radio v-model="data.descargado" val="0" label="No" class="q-mr-lg"/>
	        		</div>
	        	</div>
	        	<!-- /Pre-Inspección -->

	        	<!-- Llantas -->
	        	<hr class="col-12 my-4">
	        	<div class="col-12 q-my-md">
	        		<div class="row">
	        			<div class="col" style="max-width: 150px">
	        				Llantas
	        			</div>
	        			<div class="col">
	        				<div class="row" v-for="(eje,item) in data.ejes">    					
			        			<div class="col"  style="max-width: 200px">
			        				<p class="font-weight-bold">Eje  {{ item + 1 }}</p>
			        				<p class="font-weight-bold q-mr-lg">Presión Inicial:</p>
			        				<p class="font-weight-bold q-mr-lg">Ajuste:</p>
			        			</div>
			        			<div class="col">
			        				<q-input v-model="eje.eje1_presion_inicial" type="text" class="bg-white q-py-sm q-my-md" style="max-width: 100px"/>
			        				<q-input v-model="eje.eje1_ajuste" type="text" class="bg-white q-py-sm q-my-md" style="max-width: 100px"/>
			        			</div>
			        			<hr class="col-12 q-mb-lg" v-if="data.ejes.length - 1 > item">
	        				</div>
	        			</div>
	        		</div>
	        	</div>
	        	<hr class="col-12 my-4">
	        	<!-- /Llantas -->

	        	<!-- Inventario -->
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
			        		<div class="row border border-t-0" v-for="item in data.inventory">
			        			<div class="col q-py-sm font-weight-bold">{{ item.name }}</div>
			        			<div class="col q-py-sm border-l col-checkout text-center">
			        				<div class="q-mt-sm">
			        					<q-radio v-model="item.b" :val="true" class="q-mr-lg mx-auto"/>
			        				</div>
			        			</div>
			        			<div class="col q-py-sm border-l col-checkout">
			        				<div class="q-mt-sm">
			        					<q-radio v-model="item.r" :val="true" class="q-mr-lg mx-auto"/>
			        				</div>
			        			</div>
			        			<div class="col q-py-sm border-l col-checkout">
			        				<div class="q-mt-sm">
			        					<q-radio v-model="item.m" :val="true" class="q-mr-lg mx-auto"/>
			        				</div>
			        			</div>
			        			<div class="col q-py-sm border-l col-count">
			        				<q-input v-model="item.count" type="number" class="bg-white q-py-sm q-my-md"/>
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
	        	<!-- /Inventario -->

	        	<!-- CAROUSEL -->
	        	<div class="col-12 q-my-lg">
	        		<p class="font-weight-bold q-px-md">Fotografías</p>
					<carousel :perPage="3" :paginationEnabled="false" :navigationEnabled="true" :navigationNextLabel="nextLabel" :navigationPrevLabel="prevLabel">
						<slide>
							<div class="q-px-md">
						    	<img src="../../assets/moto.png" alt="" width="100%">
							</div>
						</slide>
						<slide>
							<div class="q-px-md">
						    	<img src="../../assets/moto.png" alt="" width="100%">
							</div>
						</slide>
						<slide>
							<div class="q-px-md">
						    	<img src="../../assets/moto.png" alt="" width="100%">
							</div>
						</slide>
						<slide>
							<div class="q-px-md">
						    	<img src="../../assets/moto.png" alt="" width="100%">
							</div>
						</slide>
					</carousel>
	        		<div class="d-block q-mt-md q-mb-lg text-right">
	    				<q-btn color="primary" size="md" label="Agregar fotografía" class="q-mx-md q-px-xs text-dark" icon="add" @click="openedUploader = true"/>
	    			</div>
	        	</div>
	        	<!-- /CAROUSEL -->

	        	<!-- opbservaciones -->
	        	<div class="col-12 q-my-md">
					<q-input v-model="data.observaciones" type="textarea" float-label="Observaciones:" :max-height="10" rows="4" class="bg-white"/>
	        	</div>
	        	<!-- /opbservaciones -->

	    		<div class="col-12 text-right">
	    			<q-btn color="black" size="md" label="Guardar" class="q-px-lg btn-app" @click="submit"/>
	    		</div>
	        </div>
	    </div>
	</div>
  	<q-modal v-model="openedUploader" :content-css="{minWidth: '80vw', padding: '25px'}">
	    <h4 class="mx-auto">Añadir imagen</h4>
		<q-uploader :url="urlUploader" class="q-my-lg" extensions=".jpg,.jpeg,.png"/>
	    <q-btn color="dark" @click="openedUploader = false" label="Cerrar" class="mt-2"/>
  	</q-modal>
  </q-page>
</template>

<script>

import { Carousel, Slide } from 'vue-carousel';
import { required, email, minLength } from 'vuelidate/lib/validators'

export default {
	name: 'PageData',
	components: { Carousel, Slide},
  	data () {
    	return {
    		value: null,
    		showAddInventary: false,
    		nextLabel: "<i class='fa fa-chevron-right' aria-hidden='true'></i>",
    		prevLabel: "<i class='fa fa-chevron-left' aria-hidden='true'></i>",
    		showData: true,
    		openedUploader: false,
    		urlUploader: "URL",
    		data: {
	    		teaching_vehicle: null,
	    		observaciones: null,
				kilometraje: null,
				diametro_exhosto: null,
				motocicleta_limpia: null,
				descargado: null,
				ejes: [
					{
						presion_inicial: null,
						ajuste: null,
					},
					{
						presion_inicial: null,
						ajuste: null,
					}
				],
	    		soat: {
					dateExpedition: '10/10/2017',
					dateStartValidity: '10/10/2018',
					dateEndValidity: '10/10/2019',
					validity: true,
	    		},
	    		attributes : {
					tipo_servicio: 'PARTICULAR',
					clase_vehículo: 'MOTOCICLETA',
					marca: 'HONDA',
					linea: 'CB',
					modelo: '2012',
					n_licencia: '10010522505',
					fecha_matricula: '14/07/2011',
					color: 'GRIS',
					tipo_combustible: 'GASOLINA',
					n_vin: 'KNAJT811AC7290082',
					n_chases: 'KNAJT811AC7920082',
					n_motor: 'G4FCBH2655',
					cilindraje: '109'
	    		},
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
	    		],
    		},
      		selectInspection: [
        		{
        			label: 'Revision Inicial',
        			value: 'ri'
        		},
        		{
        			label: 'Revision Final',
        			value: 'rf'
        		}
    		],
    		formSearch : {
    			type_inspection: 'ri',
    			plaque: null
    		},
    		elementInventary: {
    		    name: null,
    		    b: false,
    		    r: false,
    		    m: false,
    		    count: null
    		}
    	}
    },
    filters: {
    	validity: function (value) {
    		return value? 'VIGENTE' : 'NO VIGENTE'
    	}
    },
	validations: {
	    formSearch: {
	    	type_inspection: { required },
	    	plaque: { required, minLength: minLength(6)  }
	    }
	},
	methods: {
		addInventary () {
			this.showAddInventary = false;
		},
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
	        	this.$q.notify({message: 'Por favor revise los campos de nuevo.',  position: 'top-right', closeBtn: true})
	        	return
	      	}
	    }
	}
}
</script>
