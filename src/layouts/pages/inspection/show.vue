<template>
    <div id="printed" v-show="!$store.state.data.load_inner">
        <q-page v-show="showData">
         
        	<div class="col-12 q-border col-search print-none">
	            <div class="row">
	                <div class="col-12 col-sm-10 col-md-6 mx-auto q-px-md">
	                    <span class="w-50 d-inline-block font-weight-bold">
	                        TIPO DE INSPECCIÓN:
	                    </span>
                        <div class="w-50 d-inline-block">
	                        <q-select readonly v-model="data.inspections_types_id" :options="$store.state.data.types_inspections" class="bg-white q-py-sm q-my-md"/>
	                    </div>
	                </div>

                    <div class="col-12 col-sm-10 col-md-6 mx-auto q-px-md">
	                    <span class="w-50 d-inline-block font-weight-bold">
	                        ESTADO:
	                    </span>
                        <div class="w-50 d-inline-block">
	                        {{status}}
	                    </div>
	                </div>

	            </div>
        	</div>
            <q-page>
                <div v-if="data.attributes != null" class="q-pb-lg">
                    <!-- SOAP -->
                    <div class="container-fluid bg-gray-10">
                        <div class="row q-py-sm" style="background-color: #fed80a">
                            <div class="col q-px-md">
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="row">
                                            <div class="col-md-6">
                                                Nombre Completo:
                                            </div>
                                            <div class="col-md-6 ">
                                                <span class="badge badge-light font-weight-bold">
                                                    {{ userData.first_name + ' ' + userData.last_name }}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="row">
                                            <div class="col-md-6">
                                                Email:
                                            </div>
                                            <div class="col-md-6">
                                                <span class="badge badge-light font-weight-bold">
                                                    {{  userData.email ? userData.email : 'N/D' }}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-6 q-mt-sm">
                                        <div class="row">
                                            <div class="col-md-6">
                                                 Teléfono:
                                            </div>
                                            <div class="col-md-6">
                                                 <span class="badge badge-light font-weight-bold">
                                                    {{ userData.phone ? userData.phone : 'N/D' }}
                                                </span>
                                            </div>
                                        </div>
                                       
                                       
                                    </div>
                                    <div class="col-md-6 q-mt-sm">
                                        <div class="row">
                                            <div class="col-md-6">
                                                Documento:
                                            </div>
                                            <div class="col-md-6">
                                                <span class="badge badge-light font-weight-bold">
                                                    {{ userData.number_document ? userData.number_document : 'N/D' }}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row print-row align-items-center">
                            <div class="col-12 col-md-3 px-2 py-3 text-right print-none flex flex-center">
                                <span class="h2 font-weight-bold my-3 d-block">SOAT</span>
                            </div>
                            <div class="col-4 col-md-2 mx-auto py-3 text-center print-col-3 print-center ">
                                <span
                                    class="font-weight-bold d-inline-block"
                                    :class="{'color-danger': $v.data.attributes.insurance_expedition.$error}">
                                    Expedición:
                                </span>
                                <p class="mb-0">

                                    <q-field :error="$v.data.attributes.insurance_expedition.$error">
                                        <q-datetime v-model.trim="data.attributes.insurance_expedition"
                                            placeholder="Fecha Expedición"
                                            type="date"
                                            class="q-mb-lg"
                                            format="YYYY-MM-DD"/>
                                    </q-field>
                                
                                </p>
                            </div>
                            <div class="col-4 col-md-2 mx-auto py-3 text-center print-col-3 print-center ">
                                <span
                                    class="font-weight-bold d-inline-block"
                                    :class="{'color-danger': $v.data.attributes.insurance_expiration.$error}">
                                    Fin De Vigencia
                                </span>
                                <p class="mb-0">

                                    <q-field :error="$v.data.attributes.insurance_expiration.$error">
                                        <q-datetime v-model.trim="data.attributes.insurance_expiration"
                                            placeholder="Fecha Fin De Vigencia"
                                            type="date"
                                            class="q-mb-lg"
                                            format="YYYY-MM-DD"/>
                                    </q-field>
                                </p>
                            </div>
                            <div class="col-4 col-md-2 mx-auto py-3 text-center">
                                <p class="font-weight-bold font-famili"><b>ESTADO</b></p>
                                <p class="mb-0 text-uppercase" :class="{'text-green': validity(data.attributes.insurance_expiration), 'text-red': !validity(data.attributes.insurance_expiration)}">
                                    <b>{{ data.attributes.insurance_expiration|validity }}</b>
                                </p>
                            </div>
                            <div class="col-12 col-md-3 px-2 py-3 bg-primary text-right print-none flex flex-center">
                                <span class="h2 font-weight-bold my-3 d-block">
                                    {{data.attributes.board}}
                                    </span>
                            </div>
                        </div>
                    </div>
                    <div class="layout-padding q-py-lg">
                        <!-- Datos del Vehiculo -->
                        <div class="row mt-3 q-border">
                            <div class="col-12 col-md-6 q-px-md print-col-6">
                                <div class="col-12 col-md-6 q-px-md">
                                    <q-field :error="$v.data.attributes.service_type.$error">
                                        <span class="font-weight-bold d-inline-block"
                                            :class="{'color-danger': $v.data.attributes.service_type.$error}">Tipo de Servicio:</span>
                                        <q-select :disable='!isUpdate' v-model="data.attributes.service_type" class="q-mb-lg uppercase" placeholder="Tipo de Servicio" :options="$store.state.data.types_services"/>
                                    </q-field>

                                    <q-field :error="$v.data.attributes.type_vehicle.$error">
                                        <span class="font-weight-bold d-inline-block"
                                            :class="{'color-danger': $v.data.attributes.type_vehicle.$error}">Tipo de Vehículo</span>
                                            <q-select :disable='false' v-model="data.attributes.type_vehicle" class="q-mb-lg uppercase" placeholder="Clase de Vehículo" :options="$store.state.data.types_vehicles"/>
                                    </q-field>

                                    <q-field>
                                        <span
                                        class="font-weight-bold d-inline-block"
                                        :class="{'color-danger': false}">
                                        Clase de vehículo:
                                        </span>
                                        <q-select
                                        :disable="false"
                                        v-model="data.attributes.vehicle_class"
                                        class="q-mb-lg uppercase"
                                        placeholder="Clase de vehículo"
                                        :options="$store.getters['data/GET_CLASS_VEHICLES']"/>
                                    </q-field>

                                        <div class="row" >
                                            <div class="col-md-10">
                                                <q-field :error="$v.data.attributes.brand_id.$error">
                                                    <span class="font-weight-bold d-inline-block"
                                                        :class="{'color-danger': $v.data.attributes.brand_id.$error}">Marca:</span>
                                                    <q-select
                                                      filter
                                                      filter-placeholder="Buscar"
                                                        @input="handleChangeBrand(data.attributes.brand_id)"
                                                        :disable='!isUpdate'
                                                        v-model="data.attributes.brand_id"
                                                        class="q-mb-lg uppercase"
                                                        placeholder="Marca"
                                                        :options="$store.state.data.types_brands"/>
                                                </q-field>
                                            </div>
                                            <div class="col-md-2" v-if="inspection_statues.initial == 0">
                                                <brandComponent/>
                                            </div>
                                        </div>


                                        <div class="row">
                                            <div class="col-md-10">
                                            <q-field :error="$v.data.attributes.line_id.$error">
                                                <span class="font-weight-bold d-inline-block"
                                                    :class="{'color-danger': $v.data.attributes.line_id.$error}">Línea:</span>
                                                <q-select
                                                  filter
                                                  filter-placeholder="Buscar"
                                                    :disable='!isUpdate'
                                                    v-model="data.attributes.line_id"
                                                    class="q-mb-lg uppercase"
                                                    placeholder="Line"
                                                    :options="SelectLines"/>
                                            </q-field>
                                            </div>
                                        <div class="col-md-2" v-if="inspection_statues.initial == 0">
                                            <lineComponent/>
                                        </div>
                                        </div>

                                    <q-field :error="$v.data.attributes.model.$error">
                                        <span class="font-weight-bold d-inline-block"
                                            :class="{'color-danger': $v.data.attributes.model.$error}">Modelo:</span>
                                        <q-select :disable='!isUpdate' v-model="data.attributes.model" class="q-mb-lg uppercase" placeholder="Modelo" :options="$store.state.data.types_models"/>
                                    </q-field>

                                    <q-field :error="$v.data.attributes.transit_license.$error">
                                        <span class="font-weight-bold d-inline-block"
                                            :class="{'color-danger': $v.data.attributes.transit_license.$error}">N° Licencia de Tránsito:</span>
                                        <q-input :disable='!isUpdate' v-model="data.attributes.transit_license" type="text" placeholder="N° Licencia de Tránsito" class="q-mb-lg"/>
                                    </q-field>

                                    <q-field :error="$v.data.attributes.enrollment_date.$error">
                                        <span class="font-weight-bold d-inline-block"
                                            :class="{'color-danger': $v.data.attributes.enrollment_date.$error}">Fecha de Matrícula:</span>
                                            <q-datetime :disable='!isUpdate' v-model.trim="data.attributes.enrollment_date"
                                                type="date"
                                                class="q-mb-lg"
                                                placeholder="Fecha de Matrícula"
                                                format="YYYY-MM-DD"/>
                                    </q-field>
                                    
                                </div>
                            </div>
                            <div class="col-12 col-md-6 q-px-md print-col-6">

                                <div class="row">
                                    <div class="col-sm-10">
                                        <q-field :error="$v.data.attributes.color_id.$error">
                                            <span class="font-weight-bold d-inline-block"
                                                :class="{'color-danger': $v.data.attributes.color_id.$error}">Color:</span>
                                            <q-select  filter
                                                       filter-placeholder="Buscar"
                                                       :disable='!isUpdate' v-model="data.attributes.color_id" class="q-mb-lg uppercase" placeholder="Color" :options="$store.state.data.types_colors"/>
                                        </q-field>
                                    </div>
                                    <div class="col-md-2 q-mt-md q-pl-lg" v-if="inspection_statues.initial == 0">
                                        <colorComponent/>
                                    </div>
                                </div>


                                <q-field :error="$v.data.attributes.type_fuel.$error">
                                    <span class="font-weight-bold d-inline-block"
                                        :class="{'color-danger': $v.data.attributes.type_fuel.$error}">Tipo de combustible:</span>
                                    <q-select :disable='false' v-model="data.attributes.type_fuel" class="q-mb-lg uppercase" placeholder="Tipo de combustible"
                                            :options="$store.state.data.types_fuels"/>
                                </q-field>

                                <q-field :error="$v.data.attributes.vin_number.$error">
                                    <span class="font-weight-bold d-inline-block"
                                        :class="{'color-danger': $v.data.attributes.vin_number.$error}">N°Vin:</span>
                                    <q-input :disable='!isUpdate' v-model="data.attributes.vin_number" type="text" placeholder="N°Vin:" class="q-mb-lg"/>
                                </q-field>

                                <q-field :error="$v.data.attributes.chasis_number.$error">
                                    <span class="font-weight-bold d-inline-block"
                                        :class="{'color-danger': $v.data.attributes.chasis_number.$error}">N° de Chasis:</span>
                                    <q-input :disable='!isUpdate' v-model="data.attributes.chasis_number" type="text" placeholder="N° de Chasis" class="q-mb-lg"/>
                                </q-field>

                                <q-field :error="$v.data.attributes.engine_number.$error">
                                    <span class="font-weight-bold d-inline-block"
                                        :class="{'color-danger': $v.data.attributes.engine_number.$error}">N° de Motor:</span>
                                    <q-input :disable='!isUpdate' v-model="data.attributes.engine_number" type="text" placeholder="N° de Motor" class="q-mb-lg"/>
                                </q-field>

                                <q-field :error="$v.data.attributes.displacement.$error">
                                    <span class="font-weight-bold d-inline-block"
                                        :class="{'color-danger': $v.data.attributes.displacement.$error}">Cilindraje:</span>
                                    <q-input :disable='!isUpdate' v-model="data.attributes.displacement" type="text" placeholder="Cilindraje" class="q-mb-lg"/>
                                </q-field>

                                <q-field :error="$v.data.attributes.axes_number.$error">
                                    <span class="font-weight-bold d-inline-block"
                                        :class="{'color-danger': $v.data.attributes.axes_number.$error}">Numero de ejes:</span>
                                    <q-input :disable='!isUpdate' v-model="data.attributes.axes_number" type="text" placeholder="Numero de ejes" class="q-mb-lg"/>
                                </q-field>
                            </div>
                        </div>
                        <!-- Datos del Vehiculo -->
                        Datos del Vehiculo
                        <div class="col-12 q-py-md" v-if="inspection_statues.initial == 1">
                            <div class="row">
                                <div class="col-12 col-md-4 q-px-md print-col-6">
                                    <q-field :error="$v.data.pin.$error">
                                        <span class="font-weight-bold d-inline-block"
                                            :class="{'color-danger': $v.data.pin.$error}">Pin:</span>
                                        <q-input :disable='!isUpdate' v-model="data.pin" type="text" placeholder="Pin" class="q-mb-lg"/>
                                    </q-field>
                                </div>

                                <div class="col-12 col-md-4 q-px-md print-col-6" >
                                    <q-field >
                                        <span class="font-weight-bold d-inline-block">
                                            Confirmar Pin:
                                        </span>
                                        <q-input
                                            v-model="confirmPin"
                                            type="text"
                                            placeholder="Confirmar Pin"
                                            class="q-mb-lg"/>
                                    </q-field>
                                </div>

                                <div class="col-12 col-md-4 q-px-md print-col-6">
                                    <q-field :error="$v.data.invoice_num.$error">
                                        <span class="font-weight-bold d-inline-block"
                                            :class="{'color-danger': $v.data.invoice_num.$error}">Factura:</span>
                                        <q-input :disable='!isUpdate' v-model="data.invoice_num" type="text" placeholder="Factura" class="q-mb-lg"/>
                                    </q-field>
                                </div>
                            </div>
                        </div>
                        
                        <div class="col-12 q-py-md" v-if="inspection_statues.initial >= 2">
                            <div class="row">
                                <div class="col-12 col-md-6 q-px-md print-col-6">
                                    <span class="font-weight-bold q-mr-sm">Pin:</span>
                                    <span class="badge badge-light">{{ data.pin}}</span>
                                </div>
                                <div class="col-12 col-md-6 q-px-md print-col-6">
                                    <span class="font-weight-bold q-mr-sm">Factura:</span>
                                    <span class="badge badge-light">{{ data.invoice_num}}</span>
                                </div>
                            </div>
                        </div>


                        
                        <div class="row" v-if="status != 'Revisado'">
                            <div class="col-12 print-col-12 q-px-md q-border" v-if="!isMotocicleta()">
                                <div class="row">
                                    <div class="col-12">
                                        <span class="font-weight-bold q-mr-sm">Tipico de Vehículo:</span>
                                        <span class="badge badge-light">{{ data.type_vehicle }}</span>
                                    </div>
                                </div>
                            </div>

                            <!-- Vehículo de Enseñanza -->
                            <div class="col-12 print-col-12 q-px-md q-border">
                                <span class="font-weight-bold q-mr-sm">Vehículo de Enseñanza:</span>
								<span class="badge badge-light">{{ data.teaching_vehicle ? 'SI' : 'NO' }}</span>
                            </div>


                            <!-- kilometraje & diametro -->
                            <div class="col-12 print-col-12 q-px-md q-border" v-if="!isMotocicleta() && data.type_vehicle != 'MOTOCICLETA'">
                                <div class="row">
                                    <div class="col-12 col-sm-6 print-col-6">
                                        <div class="row">

                                            <div class="col-12 q-my-sm">
                                                <span class="font-weight-bold q-mr-sm q-mb-md"># Cilindros Motor:</span>
                                                <span class="badge badge-light">{{ data.engine_cylinders ? data.engine_cylinders : 0 }}</span>
                                            </div>

                                            <div class="col-12 q-my-sm">
                                                <span class="font-weight-bold q-mr-sm q-mb-md"># Numero Exhosto:</span>
                                                <span class="badge badge-light">{{ data.exhosto_number ? data.exhosto_number : 0 }}</span>
                                            </div>


                                            <div class="col-12 q-my-sm">
                                                <span class="font-weight-bold q-mr-sm q-mb-sm"> Kilometraje: </span>
                                                <span class="badge badge-light">{{ data.mileage }}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-12 col-sm-6 print-col-6" v-if="false">
                                        <div class="row">
                                            <div class="col-12 q-my-sm">
                                                <span class="font-weight-bold q-mr-sm">Vidrios Polarizados:</span>
                                                <span class="badge badge-light">{{ data.polarized_glasses ? 'SI' : 'NO' }}</span>
                                            </div>
                                            <div class="col-12 q-my-sm">
                                                <span class="font-weight-bold q-mr-sm">Vehículo Blindado:</span>
                                                <span class="badge badge-light">{{ data.armored_vehicle ? 'SI' : 'NO' }}</span>
                                            </div>
                                            <div class="col-12 q-my-sm">
                                                <span class="font-weight-bold q-mr-sm">Motor Modiﬁcado:</span>
                                                <span class="badge badge-light">{{ data.modified_engine ? 'SI' : 'NO' }}</span>
                                            </div>
                                            <div class="col-12 q-my-sm">
                                                <span class="font-weight-bold q-mr-sm">Llanta de repuesto:</span>
                                                <span class="badge badge-light">{{ data.spare_tires ? data.spare_tires: 0 }}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- kilometraje & diametro -->
                            <div class="col-12 q-border" v-else>
                                <div class="row">
                                    <div class="col-12 col-md-6 q-px-md">
                                        <span class="font-weight-bold"> Kilometraje:</span>
                                        <span class="badge badge-light">{{ data.mileage }}</span>
                                    </div>
                                    <div class="col-12 col-md-6 q-px-md">
                                        <span class="font-weight-bold">Diametro Exhosto:</span>
                                        <span class="badge badge-light">{{ data.exhosto_diameter }}</span>
                                    </div>
                                </div>
                            </div>

                            <!-- Pre-Inspección -->
                            <div class="col-12 q-px-md q-border" :class="{'print-none':data.pre_inspections.length > 0}">
                                <div class="row">
                                    <div class="col-12 print-col-12 q-mb-md">
                                        <span class="font-weight-bold">Pre-Inspección:</span>
                                    </div>
                                    <div class="col-12 col-sm-6 print-col-6 q-my-md" v-for="(pre_inspection,item) in data.pre_inspections" :key="item">

                                        <div v-if="pre_inspection.value">
                                           <span class="d-inline-block font-weight-bold q-mr-lg">{{ pre_inspection.name }}</span>
                                           <span class="badge badge-light">{{ pre_inspection.value | preInspection }}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Llantas -->
                            <div class="col-12 q-px-md q-border">
                                <div class="row">
                                    <div class="col-12 col-sm-4 col-md-3 col-lg-2 q-mb-lg print-col-2">
                                        <span class="font-weight-bold">Llantas</span>
                                    </div>
                                    <div class="col-12 col-sm-8 col-md-9 col-lg-10 print-col-10">
                                        <div class="row" v-for="(eje,item) in data.axes">
                                          <div class="col print-none" style="max-width: 200px">
                                            <p class="font-weight-bold q-my-md">Eje  {{ item + 1 }}</p>
                                            <p class="font-weight-bold q-mr-lg q-mt-md q-mb-lg">Presión Inicial:</p>
                                            <p class="font-weight-bold q-mr-lg q-my-md">Ajuste:</p>
                                          </div>
                                          <div class="col print-col-12 print-mx q-mx-sm" v-for="(llanta,key) in eje" style="max-width: 130px">
                                            <div class="text-center d-block q-my-sm">
                                                <span v-if="!isMotocicleta()">{{ llanta.type|axes }}</span>
                                                <span v-else>&nbsp;</span>
                                            </div>
                                            <q-field>
                                                <q-input :disable="true" v-model="llanta.pressure_init" class="bg-white q-py-sm q-my-sm"/>
                                            </q-field>
                                            <q-field>
                                                <q-input :disable="true" v-model="llanta.adjustment" class="bg-white q-py-sm q-my-sm"/>
                                            </q-field>
                                          </div>
                                          <hr class="col-12 q-mb-lg" v-if="data.axes - 1 > item">
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Inventario -->
                            <div class="col-12 print-col-12 q-px-md q-border" v-if="data.items.length > 0">
                                <p class="font-weight-bold q-my-lg">Inventario</p>
                                <div class="row print-row">
                                    <div class="col col-md-8 mx-auto">
                                        <div class="row boder-botton">
                                            <div class="col-12">
                                                <div class="row mb-2">
                                                    <div class="col-4 print-col-4 q-pl-sm font-weight-bold">
                                                        NOMBRE
                                                    </div>
                                                    <div class="col-4 print-col-4 q-pl-sm font-weight-bold text-center">
                                                        EVALUACIÓN
                                                    </div>
                                                    <div class="col-4 print-col-4 q-pl-sm font-weight-bold text-center">
                                                        CANTIDAD
                                                    </div>
                                                    <div class="col-12 print-col-12">
                                                        <hr>
                                                    </div>
                                                </div>
                                                <div class="row" v-for="(item,index) in data.items">
                                                    <div class="col-4 print-col-4 q-pl-sm font-weight-bold">
                                                        {{ item.name }}
                                                    </div>
                                                    <div class="col-4 print-col-4 text-center font-weight-bold">
                                                        {{ item.evaluation }}
                                                    </div>
                                                    <div class="col-4 print-col-4 text-center font-weight-bold">
                                                        {{ item.quantity }}
                                                    </div>
                                                    <div class="col-12 print-col-12">
                                                        <hr>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- CAROUSEL -->
                            <div class="col-12 print-col-12 q-px-md" v-if="data.gallery.length">
                                <p class="font-weight-bold q-px-md q-pt-md">Fotografías</p>
                                <carousel :perPage="3" :paginationEnabled="false" :autoplay="true" :navigationEnabled="true" :navigationNextLabel="nextLabel" :navigationPrevLabel="prevLabel" >
                                  <slide v-for="(img, index) in data.gallery" :key="index">
                                    <div class="q-px-md text-center">
                                      <img :src="img|asset" style="max-width: 100%;">
                                    </div>
                                  </slide>
                                </carousel>
                            </div>

                            <!-- opbservaciones -->
                            <div class="col-12 print-col-12 q-my-md" v-if="data.observations">
                                <q-input v-model="data.observations"
                                    :disabled='true'
                                    type="textarea"
                                    float-label="OBSERVACIONES:"
                                    :max-height="10"
                                    rows="4"
                                    class="bg-white print-col-12"/>
                            </div>
                            
                            <div class="col-12 q-py-md print-none" v-if="inspection_statues.initial >= 2">
  
                                <div class="row">
                                    <div class="col-12 print-col-12">
                                        <div class="row q-mb-sm">
                                            <div class="col">
                                            </div>
                                            <div class="col text-right">
                                                <q-btn color="black" size="sm" label="Limpiar" class="q-px-lg btn-app" v-if="is_signature_received_report" @click="undo"/>
                                            </div>
                                        </div>
                                        <VueSignaturePad
                                            v-if="is_signature_received_report"
                                            width="100%"
                                            height="200px"
                                            ref="signatureRecibido"
                                            class="border-bottom signatured"
                                            :options="{ onEnd }"
                                            :class="{'border-danger':$v.data.signature_received_report.$error}"/>

                                           
                                        <div v-else>
                                            <p>Firma y Cédula Entrega de Vehículo</p>
                                                <img  :src="data.signature_received_report|asset"
                                                style="border: 2px solid #0c0c0c;border-radius: 8px;"
                                                width="100%"
                                                class="print-col-12"
                                                height="200px">
                                            <p></p>
                                                <img  :src="data.vehicle_delivery_signature|asset"
                                                style="border: 2px solid #0c0c0c;border-radius: 8px;"
                                                width="100%"
                                                class="print-col-12"
                                                height="200px">
                                        </div>

                                        <p class="font-weight-bold" :class="{'color-danger':$v.data.signature_received_report.$error}">
                                            <i class="material-icons color-danger q-mr-xs" v-show="$v.data.signature_received_report.$error"> error_outline </i>
                                            
                                            Declaro y acepto que he recibido el informe de resultados, FUR y la motocicleta a satisfacción, en el mismo estado y condiciones en que la entregue.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div class="col-12 q-py-md">
                                <div class="row" v-if="inspection_statues.initial == 2">
                                    <div class="col-12 col-sm-12">
                                        <div class="row">
                                            <div class="col-12 q-my-sm q-px-md">
                                                <span class="font-weight-bold q-mb-sm d-block">Numero FUR:</span>
                                                <q-field>
                                                    <q-input v-model="data.num_fur" type="number" min="0" placeholder="Numero FUR" class="bg-white q-my-sm"/>
                                                </q-field>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-12 col-sm-12">
                                        <div class="row" v-show="inspection_statues.status == 3">
                                            <div class="col-12 q-my-sm q-px-md">
                                                <span class="font-weight-bold q-mb-sm d-block">
                                                    <span>Certificado:</span>
                                                </span>
                                                <div>
                                                    <q-field class="q-my-xs">
                                                        <q-input v-model="data.certificado" type="number" min="0" placeholder="Certificado" class="bg-white q-my-sm" />
                                                    </q-field>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-12 q-py-md">
                                <div class="row" v-show="inspection_statues.status == 3">
                                    <div class="col-12">
                                        <div class="row">
                                            <div class="col-12 q-px-md">
                                                <h5 class="border-bottom q-my-sm">Tecnomecanica</h5>
                                            </div>
                                            <q-field :error="$v.data.attributes.tecnomecanica_expedition.$error" class="col-6 col-sm-6 q-px-md">
                                                <span class="font-weight-bold d-inline-block"
                                                        :class="{'color-danger': $v.data.attributes.tecnomecanica_expedition.$error }">Fecha Fin De Vigencia:</span>
                                                <q-datetime v-model.trim="data.attributes.tecnomecanica_expedition"
                                                    placeholder="Fecha Fin De Vigencia"
                                                    type="date"
                                                    class="q-mb-lg"
                                                    format="YYYY-MM-DD"/>
                                                </q-field>
                                            

                                            <q-field :error="$v.data.attributes.tecnomecanica_expiration.$error" class="col-6 col-sm-6 q-px-md">
                                                <span class="font-weight-bold d-inline-block"
                                                        :class="{'color-danger': $v.data.attributes.tecnomecanica_expiration.$error }">Fecha de Expedición:</span>
                                                <q-datetime v-model.trim="data.attributes.tecnomecanica_expiration"
                                                    placeholder="Fecha de Expedición"
                                                    type="date"
                                                    class="q-mb-lg"
                                                    format="YYYY-MM-DD"/>
                                                </q-field>
                                            
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-12 q-px-md" v-if="inspection_statues.initial == 2">
                                        <span class="font-weight-bold d-inline-block"
                                                        :class="{'color-danger': $v.data.tecnomecanica_file.$error }"> Archivo Fur</span>
                                        <q-uploader :url="url" :auto-expand="true" :multiple="false" class="q-my-lg" ref="uploader" :upload-factory="uploadFile"/>
                                    </div>
                                </div>
                            </div>

                        </div>
                            <div class="col-12 print-col-12 print-none q-mt-sm">
                                <div class="row">

                                    <div class="col">
                                        <q-btn
                                            color="black"
                                            size="md"
                                            label="Atras"
                                            class="q-px-lg q-mr-sm btn-app"
                                            @click="back"/>
                                        <q-btn
                                            color="red"
                                            size="md"
                                            label="Imprimir"
                                            class="q-px-lg q-mr-sm btn-app"
                                            @click="print"/>
                                    </div>

                                    <div class="col text-right">
                                        <!-- CAMBIOS DE ESTADO PARA EL ROL ESPECIAL -->
                                        <div v-if="$store.state.auth.userData.permissions['icda.inspections.all']">
                                            <q-select
                                                v-model="inspection_statues.status"
                                                :options="optionsTypesInspectionsStatues"
                                                placeholder="Estado"
                                                class="bg-white pull-left q-mx-sm q-select-app"
                                                style="width: 110px"/>
                                            <q-btn
                                                color="black"
                                                size="md"
                                                label="Guardar"
                                                class="q-px-lg q-mr-sm btn-app pull-left"
                                                @click="submitSave"/>
                                        </div>
                                        
                                        <div v-else>
                                            <!-- CAMBIOS DE ESTADO PARA EN ESPERA -->
                                            <div v-if="inspection_statues.initial == 0">

                                                <q-select
                                                    v-model="inspection_statues.status"
                                                    :options="optionsTypesInspectionsStatuesAwait"
                                                    placeholder="Status"
                                                    class="bg-white pull-left q-mx-sm q-select-app"
                                                    style="width: 210px"/>
                                                <q-btn
                                                    v-if="this.inspection_statues.change"
                                                    color="black"
                                                    size="md"
                                                    label="Guardar"
                                                    class="q-px-lg q-mr-sm btn-app pull-left"
                                                    @click="submitSave"/>

                                                
                                            </div>

                                            <!-- CAMBIOS DE ESTADO PARA REVISADO -->
                                        <div v-if="inspection_statues.initial == 1">
                                                <q-btn color="info"
                                                    size="md"
                                                    @click="submitSave"
                                                    class="q-px-lg q-mr-sm btn-app">
                                                    {{ $store.state.data.types_inspections_statues[2].label }}
                                                </q-btn>
                                            </div>

                                            <!-- CAMBIOS DE ESTADO PARA FACTURADO -->
                                            <div v-if="inspection_statues.initial == 2">
                                                <q-select
                                                    v-model="inspection_statues.status"
                                                    :options="optionsTypesInspectionsStatuesFactured"
                                                    placeholder="Status"
                                                    class="bg-white pull-left q-mx-sm q-select-app"
                                                    style="width: 110px"/>
                                                <q-btn
                                                    color="black"
                                                    size="md"
                                                    label="Guardar"
                                                    class="q-px-lg q-mr-sm btn-app pull-left"
                                                    @click="submitSave"/>
                                            </div>
                                        </div>
                      

                                    </div>
                                </div>
                            </div>
                    </div>
                </div>
            </q-page>
        </q-page>
    </div>
</template>

<script>
    import { required, email, minLength, sameAs, requiredIf, requiredUnless} from 'vuelidate/lib/validators';
    import qInputValidation from '../../../components/q-input-validation';
    import qGallery from '../../../components/q-gallery';
    import VueSignaturePad from 'vue-signature-pad';
    import { Carousel, Slide } from 'vue-carousel'
    import { Printd } from 'printd'
    import userService from 'src/services/users'
    import config from 'src/config/index'
    import service from 'src/services/resources.js'
    import serviceInspection from 'src/services/inspections'

    //Components
    import colorComponent from 'src/components/vehicles/colors/create'
    import brandComponent from 'src/components/vehicles/brands/create'
    import lineComponent from 'src/components/vehicles/lines/create'

    export default {
        name: 'PageData',
        components: {
            qInputValidation,
            qGallery,
            VueSignaturePad,
            Carousel,
            Slide,
            colorComponent,
            brandComponent,
            lineComponent,
        },
        data () {
            return {
                SelectLines:[],
                url: config('api.api_icda') + '/inspections/media/upload?code=' + this.code,
                userData: {},
                status:'',

                show: false,
                showData: false,
                aceptContract: false,
                showsignature: true,
                is_vehicle_delivery_signature: true,
                is_signature_received_report: true,
                is_vehicle_gas: false,
                data: {
                    pre_inspections: [],
                    vehicles_id: null,
                    inspections_types_id: null,
                    teaching_vehicle: false,
                    mileage: 150,
                    exhosto_diameter: null,
                    engine_cylinders: null,
                    exhosto_number:null,
                    axes: [],
                    gallery: [],
                    items: [],
                    attributes: null,
                    gas_certificate: null,
                    gas_certifier: null,
                    gas_certificate_expiration: null,
                    governor: false,
                    taximeter: false,
                    polarized_glasses: false,
                    armored_vehicle: false,
                    modified_engine: false,
                    spare_tires: null,
                    observations: null,
                    vehicle_prepared: null,
                    seen_technical_director: null,
                    vehicle_delivery_signature: null,
                    signature_received_report: null,
                    type_vehicle: null,
                    user_id: null,
                    axes_number: null,
                    tecnomecanica_file: null,
                    tecnomecanica_expedition: null,
                    tecnomecanica_expiration: null,

                    pin: null,
                    invoice_num: null,

                    num_fur: null,
                    certificado: null,

                    vehicle_class:null,
                    type_fuel:null,

                },
                file: null,
                inspection_statues: {
                	initial: null,
                    status: null,
                	change: false,
                    options: []
                },
                confirmPin:'',
                ifUpdateInspections: true,
                changeAtributtes: false,
                changeInspection: false,
                isUpdate: true,
                nextLabel: "<i class='fa fa-chevron-right' aria-hidden='true'></i>",
                prevLabel: "<i class='fa fa-chevron-left' aria-hidden='true'></i>",
			    cssText: `
                .q-icon,
                button,
                .print-none,
                .print-d-inline-block
                .q-if-label-spacer,
                .q-input-target.q-input-area,
                .q-if-baseline {  display: none }
                img { width: 25%; display: inline-block; }
                textarea,
                .print-row { width: 100%; display: block; padding-top: 5px; padding-bottom: 5px}
                .q-input-validation { padding-bottom: 5px; padding-top: 5px}
                .q-input-validation > .d-inline-block { float: left; width: 100% }
                .q-input-validation .d-inline-block span { display: inline-block; float: left; width: 50% !important  }
                .q-input-validation .d-inline-block div { float: left; width: 50%  !important  }
                textarea,
                input { bordr: none !important; background: white !important; box-shadow: none !important }
                .print-col-2  { padding-bottom: 10px; float: left; width: 16.6667% !important }
                .print-col-3  { padding-bottom: 10px; float: left; width: 25% !important }
                .print-col-4  { padding-bottom: 10px; float: left; width: 33.33333% !important }
                .print-col-6  { padding-bottom: 10px; float: left; width: 50% !important }
                .print-col-10 { padding-bottom: 10px; float: left; width: 83.3333% !important }
                .print-col-12 { padding-bottom: 10px; float: left; width: 100% !important }
                .print-center { padding-bottom: 10px; text-align: center}
                .print-mx { padding: 5px}
			    `
            }
        },
        created() {
            this.$root.$on("refreshLines", this.initSelectLines);
            this.$store.commit('data/LOAD_TRUE')
        },
        mounted() {
            this.getInspection()
        },
        computed: {
            optionsTypesInspectionsStatues () {
                let types_inspections_statues = Object.assign({}, this.$store.state.data.types_inspections_statues)
                return this.$store.state.data.types_inspections_statues
            },
            optionsTypesInspectionsStatuesFactured(){
                let res = []
                this.$store.state.data.types_inspections_statues.forEach(state=>{
                    if(state.value == 3 || state.value == 4){
                         res.push(state)
                    }
                })
                return res
            },
            optionsTypesInspectionsStatuesAwait(){
                let res = []
                this.$store.state.data.types_inspections_statues.forEach(state=>{
                    if(state.value == 1 || state.value == 5){
                         res.push(state)
                    }
                })
                return res
            }
        },
        watch: {
        	'inspection_statues.status': {
     			handler(newValue, oldValue) {
     				if(oldValue != null) {
        				this.inspection_statues.change = true
                    }
     			},
     			deep: true
        	},
        	'data.attributes' : {
     			handler(newValue, oldValue) {
     				if(oldValue != null)
     					this.changeAtributtes = true
     			},
     			deep: true
        	},
            'data.inspections_types_id' : {
                handler(newValue, oldValue) {
                    if(oldValue != null) {
                        this.changeInspection = true
                        this.ifUpdateInspections = true
                    }
                },
                deep: true
            },
            'data.tecnomecanica_file' : {
                handler() {
                    this.ifUpdateInspections = true
                },
                deep: true
            }
        },
        filters: {
        	axes: function (axe) {
        	  return axe == 'R' ? 'D' : 'I'
        	},
            validity: function (value) {
                let toDay= new Date();
                let day = new Date(value);
                return toDay < day ? 'VIGENTE' : 'NO VIGENTE'
            },
            preInspection: function(value) {
                if (typeof value === 'boolean')
                    return value ? 'SI' : 'NO'
                else
                    return value
            }
        },
        validations: {
            confirmPin:{
               sameAsPin: sameAs('pin')
            },
            formSearch: {
                plaque: { required, minLength: minLength(6)  }
            },
            data: {
                pin: { required : requiredIf(function(model) {
                    return this.inspection_statues.initial >= 1
                })},
                invoice_num: { required : requiredIf(function(model) {
                    return this.inspection_statues.initial >= 1
                })},
                num_fur:{ required : requiredIf(function(model) {
                    return this.inspection_statues.initial >= 2
                })},
                /*seen_technical_director: { required : requiredIf(function(model) {
                    return this.inspection_statues.initial >= 2
                })},*/
                signature_received_report: { required : requiredIf(function(model) {
                    return this.inspection_statues.initial >= 2
                })},
                vehicle_delivery_signature: { required : requiredIf(function(model) {
                    return this.inspection_statues.initial >= 2
                })},
                vehicle_prepared : { required : requiredIf(function (model) {
                    return this.showsignature
                })},
                tecnomecanica_file : { required : requiredIf(function (model) {
                    return (this.inspection_statues.status == 3 || this.inspection_statues.status == 4 ) && (this.inspection_statues.initial != 3 || this.inspection_statues.initial != 4 )
                })},
                attributes: {
                    insurance_expedition: {required},
                    insurance_expiration: {required},
                    tecnomecanica_expedition : { required : requiredIf(function (model) {
                        return this.inspection_statues.status == 3 && this.inspection_statues.initial != 3
                    })},
                    tecnomecanica_expiration : { required : requiredIf(function (model) {
                        return this.inspection_statues.status == 3 && this.inspection_statues.initial != 3
                    })},
                    service_type 	: { required },
                    type_vehicle 	: { required },
                    brand_id       	: { required },
                    line_id        	: { required },
                    model        	: { required },
                    color_id        : { required },
                    type_fuel       : { required },
                    vin_number      : { required },
                    transit_license : { required },
                    enrollment_date : { required },
                    chasis_number   : { required },
                    engine_number   : { required },
                    displacement    : { required },
                    vin_number      : { required },
                    axes_number     : { required },
                }
            },
        },
        methods: {
            validity(value) {
                let toDay= new Date();
                let day = new Date(value);
                return toDay < day
            },
    		print() {
        		const d = new Printd()
    			const { contentWindow } = d.getIFrame()
        		d.print( this.$el,[ this.cssText ] )
    		  // this.d.print( this.$el, [this.cssText])
    		},
            submitSave() {
            
                if(this.inspection_statues.initial == 1){
                    if(this.confirmPin != this.data.pin){
                        this.$q.notify({
                            message: 'El campo Pin y Pin Confirmación no coinciden',
                            position: 'top-right',
                            closeBtn: true
                        })
                        this.$store.commit('data/LOAD_FALSE')
                        return
                    }
                }
        
                
                this.$v.data.$touch()
                this.$store.commit('data/LOAD_TRUE')
                
                if (this.$v.data.$error) {
                    this.$store.commit('data/LOAD_FALSE')
                    this.$q.notify({message: 'Por favor revise los campos de nuevo.',  position: 'top-right', closeBtn: true})
                    return
                } else {
                    Promise.all([
                        this.updateInspections(),
                        this.inspectionHistory(),
                        this.updateVehicle(),
                    ]).then((res) => {
                        this.$q.notify({type:'positive', message: 'Inspeccion actualizada exitosamente!',  position: 'top-right', closeBtn: true})
	                	this.$router.push({name: 'inspections'})
					})
					.catch((err) => {
                    	this.$store.commit('data/LOAD_FALSE')
					    console.error('Promise.all error', err);
					});
	            }
            },
            sameAsPin(){
                if(this.inspection_statues.status == 1){
                    if(this.confirmPin != this.data.pin){
                        this.$q.notify({
                            message: 'El campo Pin y Pin Confirmación no coinciden',
                            position: 'top-right',
                            closeBtn: true
                        })
                        this.$store.commit('data/LOAD_FALSE')
                        return
                    }
                }
            },
            getInspection() {
                this.$resourcesInspections.getInspection(this.$route.params.inspection)
                .then(response => {
                    console.log(response)
                    let data = response.data.data
                    this.$store.commit('orden/SET_ORDEN',{
                        timeEntry: data.created_at_time,
                        dateEntry: data.created_at_date,
                        id:  data.id
                    })
                    this.data.id                            = this.$route.params.inspection

                    let optionsInspections = this.$store.state.data.types_inspections_statues
					for (var item in optionsInspections) {
	    				if ( optionsInspections[item].label == data.inspection_status ) {
							this.inspection_statues.status  = optionsInspections[item].value
                            this.inspection_statues.initial = this.inspection_statues.status
                            if(optionsInspections[item].value == 2){
                                this.getFurAndState(this.$route.params.inspection)
                            }
	    				}
                    }

                    //
                    this.status = response.data.data.inspection_status
                    //

                    this.data.pre_inspections               = data.pre_inspections
                    this.data.vehicles_id                   = data.vehicles_id
                    this.data.inspections_types_id          = data.inspection_type.id
                    this.data.teaching_vehicle              = data.teaching_vehicle   ? true : false
                    this.data.mileage                       = data.mileage
                    this.data.exhosto_diameter              = data.exhosto_diameter
                    this.data.engine_cylinders              = data.engine_cylinders
                    this.data.exhosto_number              = data.exhosto_number

                    this.data.axes                          = data.axes
                    this.data.gallery                       = data.gallery ? data.gallery : []
                    this.data.items                         = data.items_inventory
                    this.data.governor                      = data.governor  == '1' ? true : false
                    this.data.taximeter                     = data.taximeter == '1' ? true : false
                    this.data.polarized_glasses             = data.polarized_glasses == '1' ? true : false
                    this.data.armored_vehicle               = data.armored_vehicle   == '1' ? true : false
                    this.data.modified_engine               = data.modified_engine   == '1' ? true : false
                    this.data.attributes                    = data.vehicle

                    this.data.attributes.tecnomecanica_expedition  = data.vehicle.tecnomecanica_expedition
                    this.data.attributes.tecnomecanica_expiration  = data.vehicle.tecnomecanica_expiration
                    this.data.attributes.tecnomecanica_code  = data.vehicle.tecnomecanica_code

                    this.data.attributes.vehicle_class = data.vehicle.vehicle_class

                    this.data.attributes.brand_id = data.vehicle.brand_id ? parseInt(data.vehicle.brand_id) : null
                    this.data.attributes.color_id = data.vehicle.color_id ? parseInt(data.vehicle.color_id) : null
                    this.data.attributes.line_id = data.vehicle.line_id ? parseInt(data.vehicle.line_id) : null
                    this.data.attributes.type_fuel = data.vehicle.type_fuel ? parseInt(data.vehicle.type_fuel) : null
                    this.data.attributes.type_vehicle = data.vehicle.type_vehicle ? parseInt(data.vehicle.type_vehicle) : null
                    this.data.attributes.service_type = data.vehicle.service_type ? parseInt(data.vehicle.service_type) : null
                    this.data.attributes.model = data.vehicle.model ? parseInt(data.vehicle.model) : null

                    this.data.pin = data.pin_num
                    this.data.invoice_num = data.invoice_num
                    
                    this.data.gas_certificate               = data.gas_certificate
                    this.data.gas_certifier                 = data.gas_certifier
                    this.data.gas_certificate_expiration    = data.gas_certificate_expiration
                    	this.is_vehicle_gas                     = this.data.gas_certificate ? true : false
                    this.data.spare_tires                   = data.spare_tires
                    this.data.observations                  = data.observations
                    this.data.vehicle_prepared              = data.vehicle_prepared == '1' ?  true : false
                    if (data.seen_technical_director != null)
                        this.data.seen_technical_director       = data.seen_technical_director == '1' ?  1 : 0
                    else
                        this.data.seen_technical_director       = null

                    this.data.vehicle_delivery_signature    = data.vehicle_delivery_signature
                    	this.is_vehicle_delivery_signature      = this.data.vehicle_delivery_signature ? false : true
                    this.data.signature_received_report     = data.signature_received_report
                    	this.is_signature_received_report       = this.data.signature_received_report  ? false : true
                    this.data.type_vehicle                  = data.type_vehicle
					this.inspection_statues.change 			= false
     				this.changeAtributtes					= false
                    this.data.user                          = data.vehicle.user
                    this.data.user_id                       = data.vehicle.user.id
                    this.getDataUser(data.vehicle.user.id)
                    this.$store.commit('data/LOAD_FALSE')
                    this.showData = true
                    this.initSelectLines(parseInt(data.vehicle.brand_id))
                }).catch(error => {
                    this.$q.notify(
                            {message: 'Los iento, la inspeccion no se encuentra en nuestra data.',
                            position: 'top-right',
                            closeBtn: true
                        })
                })
                .then(() => {
                    this.$store.commit('data/LOAD_FALSE')
                });
            },
            isMotocicleta() {
                return this.data.attributes.type_vehicle == 'MOTOCICLETA';
            },
            onEnd() {
                var { isEmpty, data } = this.$refs.signatureRecibido.saveSignature();
                if(!isEmpty) {
                    this.ifUpdateInspections = true
                    this.data.signature_received_report = data
                }
            },
            undo() {
                this.$refs.signatureRecibido.undoSignature();
            },
            updateInspections() {


                const formData = new FormData();
                formData.append('id', this.data.id);
                if (this.ifUpdateInspections) {
                    if (this.data.signature_received_report) {
                        formData.append('signature_received_report',this.data.signature_received_report);
                        //formData.append('seen_technical_director',this.data.seen_technical_director);
                        //formData.append('inspections_types_id',this.data.inspections_types_id);
                    }
                    if( this.inspection_statues.status == 3 && this.inspection_statues.status == 4 ) {
                        formData.append('tecnomecanica_file',this.data.tecnomecanica_file);
                    }
                    if( this.inspection_statues.status == 3 ) {
                        
                        formData.append('tecnomecanica_expedition', this.data.attributes.tecnomecanica_expedition);
                        formData.append('tecnomecanica_expiration', this.data.attributes.tecnomecanica_expiration);
                        formData.append('tecnomecanica_code',Math.round(Math.random()*1000000));
                    }

                    if(this.inspection_statues.status >= 1){
                        formData.append('pin_num',this.data.pin);
                        formData.append('invoice_num',this.data.invoice_num);
                    }
                    
                    if(this.inspection_statues.status >= 2){
                        formData.append('num_fur',this.data.num_fur);
                        formData.append('tecnomecanica_file',this.data.tecnomecanica_file);
                    }
                    
                    formData.append('_method','PUT');
                    console.log(formData)
                    return this.$resourcesInspections.updateInspections(formData,this.data.id)
                } else
                    return false
            },
            inspectionHistory() {
                this.$store.commit('inspections/RESET_INSPECTIONS_LIST')
                // return true

                if (this.inspection_statues.change)
                    return this.$resourcesInspections.inspectionHistory(this.data.id, this.inspection_statues.status)
				return this.$resourcesInspections.inspectionHistory(this.data.id, this.inspection_statues.status+1)
            },
            updateVehicle() { // se adiciono el true para permitir el guardado en cualuquier estado de la inspeccion
            	if (this.changeAtributtes || true) {
                    let attributes = Object.assign({}, this.data.attributes)
                    //this.$delete(attributes, 'insurance_expedition')
                    this.$delete(attributes, 'tecnomecanica_expedition')
                    this.$delete(attributes, 'tecnomecanica_expiration')
                    //this.$delete(attributes, 'insurance_expiration')
            		return this.$resourcesVehicles.updateVehicle(attributes)
                }
            	return false
            },
            back() {
                this.$store.commit('data/LOAD_TRUE')
                this.$router.push({ name: 'inspections' })
            },
            uploadFile (file, updateProgress) {
                this.data.tecnomecanica_file = file
            },
            typeVehicle(value) {
                if(value == 1)
                    return 'Heavy'
                if(value == 2)
                    return 'Light'
                if(value == 3)
                    return 'Motorcycle'
                if(value == 4)
                    return 'Car'
                return 'Motorcycle'
            },
            getDataUser(id){
                userService.show(id)
                .then(response=>{
                    this.userData = response.data
                })
                .catch(error=>{
                    console.warn(error)
                })
            },
            initSelectLines(brand_id){
                let filter = {
                    brand: brand_id ? brand_id : this.data.attributes.brand_id
                }
                service.getLines(filter)
                .then(response=>{
                    this.SelectLines = response.data.data.map((color) => { return { label: color.name, value: color.id }})
                })
                .catch(error=>{
                    console.warn(error)
                })
            },
            handleChangeBrand(e){
                let filter = {
                    brand: e
                }
                service.getLines(filter)
                .then(response=>{
                    this.SelectLines = response.data.data.map((color) => { return { label: color.name, value: color.id }})
                })
                .catch(error=>{
                    console.warn(error)
                })
            },
            getFurAndState(order){
                console.log(order)
                return
                serviceInspection.getFurAndState(order)
                .then(response=>{
                    console.log(response)
                })
                .catch(error=>{
                    console.log(error)
                })
            }
        }
    }
</script>
