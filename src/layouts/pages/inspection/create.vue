<template>
    <div v-show="!$store.state.data.load_inner">
        <q-page v-show="!showContract && !showsignature">
            <div class="row q-border">
                <div class="col-12 col-sm-10 col-md-6 mx-auto q-px-md">
                    <span class="w-50 d-inline-block font-weight-bold">
                        TIPO DE INSPECCIÓN:
                    </span>
                    <div class="w-50 d-inline-block">
                        <q-select v-model="data.inspections_types_id" filter :options="$store.state.data.types_inspections" class="bg-white q-py-sm q-my-md"/>
                    </div>
                </div>
            </div>
            <div class="row q-py-lg">
                <div class="col-12 col-sm-10 col-md-4 mx-auto q-px-md">
                    <div class="row">
                        <div class="col-12 text-center font-weight-bold">
                            <p>Datos del Vehículo</p>
                        </div>
                        <div class="col-12">
                            <q-field :error="$v.formSearch.plaque.$error">
                                <q-input v-model="formSearch.plaque" type="text" placeholder="Placa" class="bg-white q-mt-sm uppercase"
                                    v-on:keyup.enter="searchPlaque"
                                    :after="[ { icon: 'search', handler() { searchPlaque() } }]"/>
                                <q-tooltip :error="$v.formSearch.plaque.$error">
                                    <p class="error-message mb-0" v-if="!$v.formSearch.plaque.required">
                                        <i class="material-icons">error_outline</i> El campo es obligatorio.
                                    </p>
                                    <p class="error-message mb-0" v-if="!$v.formSearch.plaque.minLength">
                                        <i class="material-icons">error_outline</i> Debe contener al menos 6 caracteres.
                                    </p>
                                </q-tooltip>
                            </q-field>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row" v-show="notFound">
                <div class="col-12 col-sm-10 col-md-8 mx-auto q-px-md">
                    <q-alert icon="error"  color="warning"
                        message="LA PLACA NO FUE ENCONTRADA"
                        :detail="'SE CREARA UN NUEVO VEHICULO CON LA PLACA '+formSearch.plaque | uppercase"
                    />
                </div>
            </div>
            <q-page v-show="showData">
                <div class="q-my-lg q-pt-lg">
                    <!-- SOAP -->
                    <div class="container-fluid bg-gray-10" v-if="user">
                        <div class="row q-py-sm" style="background-color: #88AE3E">
                            
                            
                            <div class="col q-px-md text-center">
                                <div class="q-py-sm q-px-sm">
                                    Cliente: <span class="badge badge-light font-weight-bold">{{ user.first_name + ' ' + user.last_name }}</span>
                                </div>
                                <div class="q-py-sm q-px-sm">
                                    Email: <span class="badge badge-light font-weight-bold">{{  user.email ? user.email : 'N/D'}}</span>
                                </div>
                                <div class="q-py-sm q-px-sm">
                                    Teléfono: <span class="badge badge-light font-weight-bold">{{ user.phone ? user.phone : 'N/D'}}</span>
                                </div>
                                <div class="q-py-sm q-px-sm">
                                    Direccion: <span class="badge badge-light font-weight-bold">{{ user.address ? user.address : 'N/D'}}</span>
                                </div>
                            </div>
                            
                            
                            
                        </div>
                        <div class="row align-items-center" v-if="data.attributes">
                            <div class="col-12 col-md-3 px-2 py-3 bg-primary text-right">
                                <span class="h2 font-weight-bold my-3 d-block text-white">SOAT</span>
                            </div>
                            <div class="col-4 col-md-2 mx-auto py-3 text-center">
                                <p class="font-weight-bold font-famili"><b>Fecha de Expedición</b></p>
                                <p class="mb-0">{{ data.attributes.insurance_expedition ? data.attributes.insurance_expedition : 'N/D' }}</p>
                            </div>
                            <div class="col-4 col-md-3 mx-auto py-3 text-center">
                                <p class="font-weight-bold font-famili"><b>Fecha Inicio De Vigencia</b></p>
                                <p class="mb-0">{{ data.attributes.insurance_expedition ? expedition(data.attributes.insurance_expedition) : 'N/D' }}</p>
                            </div>
                            <div class="col-4 col-md-2 mx-auto py-3 text-center">
                                <p class="font-weight-bold font-famili"><b>Fecha Fin De Vigencia</b></p>
                                <p class="mb-0">{{ data.attributes.insurance_expiration ? data.attributes.insurance_expiration : 'N/D' }}</p>
                            </div>
                            <div class="col-4 col-md-2 mx-auto py-3 text-center">
                                <p class="font-weight-bold font-famili"><b>Estado</b></p>
                                <p class="mb-0 text-uppercase" :class="{'text-green': validity(data.attributes.insurance_expiration), 'text-red': !validity(data.attributes.insurance_expiration)}">
                                    <b>{{ data.attributes.insurance_expiration|validity }}</b>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="layout-padding q-py-lg" v-if="data.attributes">
                        <!-- Atributos -->
                        <div class="row mt-3 q-border">
                            <div class="col-12 col-md-6 q-px-md">
                                <div class="d-block q-mb-lg q-mt-sm">

                                    <span class="font-weight-bold">Tipo de Servicio:</span>
                                        {{ data.attributes.service_type_text ? data.attributes.service_type_text : 'N/D' }}
                                </div>
                                <div class="d-block q-mb-lg q-mt-sm">
                                    <span class="font-weight-bold">Clase de Vehículo:</span>
                                        {{ data.attributes.type_vehicle_text ? data.attributes.type_vehicle_text : 'N/D' }}
                                </div>
                                <div class="d-block q-mb-lg q-mt-sm">
                                    <span class="font-weight-bold">Marca:</span>
                                        {{ data.attributes.brand ? data.attributes.brand : 'N/D' }}
                                </div>
                                <div class="d-block q-mb-lg q-mt-sm">
                                    <span class="font-weight-bold">Línea:</span>
                                        {{ data.attributes.line ? data.attributes.line : 'N/D' }}
                                </div>
                                <div class="d-block q-mb-lg q-mt-sm">
                                    <span class="font-weight-bold">Licencia de Tránsito:</span>
                                        {{ data.attributes.transit_license ? data.attributes.transit_license : 'N/D' }}
                                </div>
                                <div class="d-block q-mb-lg q-mt-sm">
                                    <span class="font-weight-bold">Fecha de Matrícula:</span>
                                        {{ data.attributes.enrollment_date ? data.attributes.enrollment_date : 'N/D' }}
                                </div>
                            </div>

                            <div class="col-12 col-md-6 q-px-md">
                                <div class="d-block q-mb-lg q-mt-sm">
                                    <span class="font-weight-bold">Color:</span>
                                        {{ data.attributes.color ? data.attributes.color : 'N/D' }}
                                </div>
                                <div class="d-block q-mb-lg q-mt-sm">
                                    <span class="font-weight-bold">Tipo de combustible:</span>
                                        {{ data.attributes.type_fuel_text ? data.attributes.type_fuel_text : 'N/D' }}
                                </div>
                                <div class="d-block q-mb-lg q-mt-sm">
                                    <span class="font-weight-bold">N°Vin:</span>
                                        {{ data.attributes.vin_number ? data.attributes.vin_number : 'N/D' }}
                                </div>
                                <div class="d-block q-mb-lg q-mt-sm">
                                    <span class="font-weight-bold">N° de Chasis:</span>
                                        {{ data.attributes.chasis_number ? data.attributes.chasis_number : 'N/D' }}
                                </div>
                                <div class="d-block q-mb-lg q-mt-sm">
                                    <span class="font-weight-bold">N° de Motor:</span>
                                        {{ data.attributes.engine_number ? data.attributes.engine_number : 'N/D' }}
                                </div>
                                <div class="d-block q-mb-lg q-mt-sm">
                                    <span class="font-weight-bold">Cilindraje:</span>
                                        {{ data.attributes.displacement ? data.attributes.displacement : 'N/D' }}
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-12 q-px-md q-border" v-if="!isMotocicleta()">
                                <div class="row">
                                    <div class="col-4 col-md-3 col-lg-2 q-mb-lg q-mt-sm">
                                        <i class="material-icons color-danger q-mr-xs" v-show="$v.data.type_vehicle.$error"> error_outline </i>
                                        <span class="font-weight-bold" :class="{'color-danger': $v.data.type_vehicle.$error}">Tipo de Vehículo:</span>
                                    </div>
                                    <div class="col-8 col-md-9 col-lg-10">
                                        
                                        <q-btn-group class="bg-white">
                                            <q-btn label="PESADO"
                                                @click="data.type_vehicle = 'Heavy'"
                                                :class="data.type_vehicle == 'Heavy' ? 'bg-primary text-white' : ''"/>

                                            <q-btn label="LIVIANO"
                                                @click="data.type_vehicle = 'Light'"
                                                :class="data.type_vehicle == 'Light' ? 'bg-primary text-white' : ''"/>

                                            <q-btn label="MOTOCICLETA"
                                                @click="data.type_vehicle = 'Motorcycle'"
                                                :class="data.type_vehicle == 'Motorcycle' ? 'bg-primary text-white' : ''"/>

                                            <q-btn label="CARRO" v-if="false"
                                                @click="data.type_vehicle = 'Car'"
                                                :class="data.type_vehicle == 'Car' ? 'bg-primary text-white' : ''"/>
                                        </q-btn-group>
                                        
                                        
                                    </div>
                                </div>
                            </div>
                            <!-- Vehículo de Enseñanza -->
                            <div class="col-12 q-px-md q-border">
                                <q-field :error="$v.data.teaching_vehicle.$invalid" class="d-inline-block">
                                    <div class="d-inline-block label-invalid">
                                        <span class="q-mr-lg font-weight-bold">
                                            <i class="material-icons color-danger q-mr-xs" v-show="$v.data.teaching_vehicle.$error"> error_outline </i>
                                            <span :class="{'color-danger': $v.data.teaching_vehicle.$error}">Vehículo de Enseñanza:</span>
                                        </span>
                                    </div>
                                    <div class="d-inline-block">
                                        <q-radio v-model="data.teaching_vehicle" :val="true" label="Si" class="q-mr-lg"/>
                                        <q-radio v-model="data.teaching_vehicle" :val="false" label="No" class="q-mr-lg"/>
                                    </div>
                                    <q-tooltip v-show="$v.data.teaching_vehicle.$error">
                                        <span v-show="!$v.data.teaching_vehicle.required">
                                            <i class="material-icons color-danger"> error_outline </i> El campo es obligatorio.
                                        </span>
                                    </q-tooltip>
                                </q-field>
                            </div>

                            <!-- Gobernador & Taximetro -->
                            <div class="col-12 q-px-md q-border" v-if="!isMotocicleta() && data.type_vehicle != 'Motorcycle'">
                                <q-checkbox v-model="data.governor" label="Gobernador"
                                        :left-label="true"
                                        class="q-mr-lg"/>
                                <q-checkbox v-model="data.taximeter" label="Taxímetro"
                                        :left-label="true"
                                        class="q-mr-lg"/>
                            </div>

                            <div class="col-12 q-border" v-if="!isMotocicleta() && data.type_vehicle != 'Motorcycle'">
                                <div class="row">
                                    <div class="col-12 q-px-md">
                                        <span class="d-inline-block q-mr-lg font-weight-bold">Vehículo a Gas:</span>
                                        <div class="d-inline-block">
                                            <q-radio v-model="is_vehicle_gas" :val="true" label="Si" class="q-mr-lg"/>
                                            <q-radio v-model="is_vehicle_gas" :val="false" label="No" class="q-mr-lg"/>
                                        </div>
                                    </div>
                                </div>
                                <div class="row" v-show="is_vehicle_gas">
                                    <div class="col-12 col-sm-6 q-my-md q-px-sm">
                                        <q-field :error="$v.data.gas_certificate.$error">
                                            <q-input v-model.trim="$v.data.gas_certificate.$model" class="bg-white" placeholder="Certiﬁcado de Gas N°"/>
                                        </q-field>
                                    </div>
                                    <div class="col-12 col-sm-6 q-my-md q-px-sm">
                                        <q-field :error="$v.data.gas_certifier.$error">
                                        <q-input v-model.trim="$v.data.gas_certifier.$model" class="bg-white" placeholder="Certiﬁcador"/>
                                        </q-field>
                                    </div>
                                    <div class="col-12 col-sm-6 q-my-md q-px-sm">
                                        <q-field :error="$v.data.gas_certificate_expiration.$error">
                                        <q-datetime v-model.trim="$v.data.gas_certificate_expiration.$model" type="date" class="bg-white" placeholder="Fecha de Vencimiento" format="YYYY-MM-DD"/>
                                        </q-field>
                                    </div>
                                </div>
                            </div>

                            <!-- kilometraje & diametro -->
                            <div class="col-12 q-border" v-if="!isMotocicleta() && data.type_vehicle != 'Motorcycle'">
                                <div class="row">
                                    <div class="col-12 col-sm-6">
                                        <div class="row">
                                            <div class="col-12 q-my-sm q-px-md">
                                                <span class="font-weight-bold q-mb-sm d-block"># Cilindros Motor:</span>
                                                <q-field>
                                                    <q-input v-model="data.engine_cylinders" type="number" min="0" placeholder="# Cilindros Motor" class="bg-white q-my-sm"/>
                                                </q-field>
                                            </div>
                                            <div class="col-12 q-my-sm q-px-md">
                                                <span class="font-weight-bold q-mb-sm d-block">
                                                    <i class="material-icons color-danger q-mr-xs" v-show="$v.data.mileage.$error"> error_outline </i>
                                                    <span :class="{'color-danger': $v.data.mileage.$error}">Kilometraje:</span>
                                                </span>
                                                <div>
                                                    <q-field :error="$v.data.mileage.$error" class="q-my-xs">
                                                        <q-input v-model="$v.data.mileage.$model" type="number" min="0" placeholder="Kilometraje" class="bg-white q-my-sm" />
                                                    </q-field>
                                                    <q-tooltip>
                                                        <span v-show="!$v.data.mileage.required"><i class="material-icons"> error_outline </i> El campo es obligatorio.</span>
                                                    </q-tooltip>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-12 col-sm-6">
                                        <div class="row">
                                            <div class="col-12 q-my-sm q-px-md">
                                                <q-field>
                                                    <q-checkbox v-model="data.polarized_glasses"
                                                        :left-label="true"
                                                        label="Vidrios Polarizados: "/>
                                                </q-field>
                                            </div>
                                            <div class="col-12 q-my-sm q-px-md">
                                                <q-field>
                                                    <q-checkbox v-model="data.armored_vehicle"
                                                        :left-label="true"
                                                        label="Vehículo Blindado: "/>
                                                </q-field>
                                            </div>
                                            <div class="col-12 q-my-sm q-px-md">
                                                <q-field>
                                                    <q-checkbox v-model="data.modified_engine"
                                                        :left-label="true"
                                                        label="Motor Modiﬁcado: "/>
                                                </q-field>
                                            </div>
                                            <div class="col-12 q-my-sm q-px-md">
                                                <q-field class="d-inline-block">
                                                    <span class="font-weight-bold q-mr-md q-mt-xs">Llanta de repuesto:</span>
                                                    <div class="d-inline-block">
                                                        <q-input v-model="data.spare_tires" type="number" class="bg-white" style="max-width: 47px"/>
                                                    </div>
                                                </q-field>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- kilometraje & diametro -->
                            <div class="col-12 q-border" v-else>
                                <div class="row">
                                    <div class="col-12 col-md-6 q-px-md">
                                        <q-field :error="$v.data.mileage.$error">
                                            <span class="font-weight-bold q-mb-md d-block" :class="{'color-danger': $v.data.mileage.$error}">
                                                <i class="material-icons color-danger q-mr-xs" v-show="$v.data.mileage.$error">
                                                    error_outline
                                                </i>
                                                Kilometraje:
                                            </span>
                                            <q-input v-model="data.mileage" type="number" min="0" placeholder="Kilometraje" class="bg-white"/>
                                        </q-field>
                                    </div>
                                  <!--   <div class="col-12 col-md-6 q-px-md">
                                         <q-field>
                                             <label class="font-weight-bold q-mb-md d-block">Diametro Exhosto:</label>
                                             <q-input v-model="data.exhosto_diameter" type="number" min="0" placeholder="Diametro Exhosto" class="bg-white"/>
                                         </q-field>
                                     </div>-->
                                </div>
                            </div>
                            <!-- /kilometraje & diametro-->
                            <!-- Pre-Inspección -->
                            <div class="col-12 row q-border">
                                <div class="col-12 q-px-md q-mb-md text-center">
                                    <span class="font-weight-bold">Pre-Inspección</span>
                                </div>
                              
                                <div class="col-12 col-sm-6 q-my-md q-px-md" v-for="(pre_inspection,item) in data.pre_inspections">
                                    <span class="d-inline-block font-weight-bold q-mr-lg">{{ pre_inspection.name }}</span>
                                    <div class="d-inline-block" v-if="!pre_inspection.options">
                                      
                                      <div v-if="pre_inspection.type == 'text'">
                                        <q-input type="number" v-model="pre_inspection.value"/>
                                        
                                      </div>
                                      
                                      <div v-else>
                                        <q-radio v-model="pre_inspection.value" :val="true" label="Si" class="q-mr-lg"/>
                                        <q-radio v-model="pre_inspection.value" :val="false" label="No" class="q-mr-lg"/>
                                      </div>
                                      
                                    </div>
                                    
                                    <div v-else>
                                        <q-select v-model="pre_inspection.value" filter :options="pre_inspection.options" :placeholder="pre_inspection.name" class="bg-white q-py-sm q-my-md"/>
                                    </div>
                                </div>
                            </div>
                            <!-- /Pre-Inspección -->

                            <!-- Llantas -->
                            <q-axes :axes="$v.data.axes" :type="data.type_vehicle == 'Motorcycle'" class="col-12 q-px-md q-border"/>
                            <!-- /Llantas -->

                            <!-- Inventario -->
                            <q-inventary :inventory="$v.data.items" :itemsRequired="$v.data.itemsRequired.$error" class="col-12 q-px-md q-border text-center"/>

                            <!-- CAROUSEL -->
                            <div class="col-12 q-px-md">
                                <p class="font-weight-bold q-px-md q-pt-md">Fotografías</p>
                                <carousel :perPage="3" :paginationEnabled="false" :autoplay="true" :navigationEnabled="true" :navigationNextLabel="nextLabel" :navigationPrevLabel="prevLabel" >
                                  <slide v-for="(img, index) in data.gallery" :key="index">
                                    <div class="q-px-md text-center">
                                      <img :src="img|asset" style="max-width: 100%;">
                                    </div>
                                  </slide>
                                </carousel>
                            </div>

                            <galeria :gallery="data.gallery" :code="data.code" class="col-12 q-px-md"/>

                            <!-- opbservaciones -->
                            <div class="col-12 q-my-md">
                                <q-field :error="$v.data.observations.$error">
                                        <span class="font-weight-bold d-block":class="{'color-danger':$v.data.observations.$error}">
                                            <i class="material-icons color-danger q-mr-xs" v-show="$v.data.observations.$error">
                                                error_outline
                                            </i>
                                            OBSERVACIONES:
                                        </span>
                                        <q-input v-model="data.observations"
                                            type="textarea"
                                            :max-height="10"
                                            rows="4"
                                            class="bg-white"/>
                                </q-field>
                            </div>

                            <div class="col-12 text-right">
                                <q-btn color="black" size="md" label="Guardar" class="q-px-lg btn-app" @click="submitData"/>
                            </div>
                        </div>
                    </div>
                </div>
            </q-page>
        </q-page>
        <q-page v-show="showContract">
            <div class="layout-padding q-py-lg">
                <q-contract/>
                <div class="col-12 q-my-md">
                  <q-checkbox v-model="aceptContract" label="Autorizo al centro de diagnostico para que utilice mis datos personales con ﬁnes comerciales"/>
                </div>
                <div class="col-12 text-right q-my-md">
                  <q-btn color="red" size="md" label="Atras" class="q-px-lg q-mx-sm btn-app" @click="back(1)"/>
                  <q-btn color="black" size="md" label="Acepto" class="q-px-lg btn-app" @click="submitContract"/>
                </div>
            </div>
        </q-page>
        <q-page v-show="showsignature">
            <div class="layout-padding q-py-lg">
                <div class="row q-my-lg">
                    <hr class="col-12 q-my-lg">
                    <div class="col-12 col-md-6">
                      <div class="row">
                        <div class="col-6">
                          <p class="font-weight-bold">
                            <i class="material-icons color-danger q-mr-xs" v-show="$v.data.vehicle_prepared.$error"> error_outline </i>
                            <span :class="{'color-danger': $v.data.vehicle_prepared.$error}">Vehículo preparado para la inspección:</span>
                          </p>
                        </div>
                        <div class="col-6">
                            <div class="d-inline-block">
                              <q-radio v-model="data.vehicle_prepared" :val="true" label="Si" class="q-mr-lg"/>
                              <q-radio v-model="data.vehicle_prepared" :val="false" label="No" class="q-mr-lg"/>
                            </div>
                        </div>
                      </div>


                    <div class="row print-row">
                        <div class="col-12 print-col-12">
                            <p class="font-weight-bold d-inline-block q-mr-md" :class="{'border-danger':$v.data.seen_technical_director.$error}">
                                Visto bueno director técnico:
                                <span class="d-none">
                                    {{ data.seen_technical_director ? 'SI' : 'NO' }}
                                </span>
                            </p>
                            <div class="d-inline-block print-none">
                                <q-radio v-model="data.seen_technical_director" :disable="!is_signature_received_report && data.seen_technical_director != null" :val="1" label="Si" class="q-mr-lg"/>
                                <q-radio v-model="data.seen_technical_director" :disable="!is_signature_received_report && data.seen_technical_director != null" :val="0" label="No" class="q-mr-lg"/>
                            </div>
                        </div>
                    </div>

                    
                    </div>
                </div>
                <div class="row">
                    <div class="col-12 q-mb-lg">
                        <div class="row q-mb-sm">
                            <div class="col">
                                <p class="font-weight-bold mb-0">Firma y Cédula Entrega de Vehículo</p>
                            </div>
                            <div class="col text-right">
                                <q-btn color="black" size="sm" label="Limpiar" class="q-px-lg btn-app" v-if="data.vehicle_delivery_signature" @click="undo"/>
                            </div>
                        </div>
                        <VueSignaturePad
                            v-if="showsignature && is_vehicle_delivery_signature"
                            width="100%"
                            height="200px"
                            ref="signatureEntrega"
                            class="border-bottom signatured"
                            :disable="!is_vehicle_delivery_signature"
                            :options="{ onEnd }"
                            :class="{'border-danger':$v.data.vehicle_delivery_signature.$error}"/>

                        <img v-else :src="data.vehicle_delivery_signature"
                            style="border: 2px solid #0c0c0c;border-radius: 8px;"
                            width="100%"
                            height="200px">

                        <p class="font-weight-bold" :class="{'color-danger':$v.data.vehicle_delivery_signature.$error}">
                            <i class="material-icons color-danger q-mr-xs" v-show="$v.data.vehicle_delivery_signature.$error"> error_outline </i>
                            Acepto y estoy conforme con el inventario realizado a mí Vehículo y he leído, entiendo y acepto todas las oservaciones hechas, politicas de inspección, tratamiento de información y conﬁdencialidad.
                        </p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12 text-right q-my-md">
                        <q-btn color="red" size="md" label="Atras" class="q-px-lg q-mx-sm btn-app" @click="back(2)"/>
                        <q-btn color="black" size="md" label="Guardar" class="q-px-lg btn-app" @click="submitSave"/>
                    </div>
                </div>
            </div>
        </q-page>
    </div>
</template>

<script>
    import { required, email, minLength, sameAs, requiredIf, requiredUnless} from 'vuelidate/lib/validators';
    import qInputValidation from 'src/components/q-input-validation';
    import qAxes from 'src/components/q-axes';
    import qInventary from 'src/components/q-inventary';
    import galeria from 'src/components/q-gallery';
    import qContract from 'src/components/q-contract';
    import VueSignaturePad from 'vue-signature-pad';
    import config from 'src/config/index'
    import { Carousel, Slide } from 'vue-carousel'

    export default {
        name: 'PageData',
        components: { qInputValidation, galeria, qInventary, qAxes, qContract, VueSignaturePad, Carousel, Slide },
        data () {
            return {
                showData: false,
                showContract: false,
                aceptContract: false,
                showsignature: false,
                is_vehicle_delivery_signature: true,
                is_signature_received_report: true,
                is_vehicle_gas: false,
                notFound: false,
                data: {
                    pre_inspections: [],
                    vehicles_id: null,
                    inspections_types_id: 1,
                    teaching_vehicle: null,
                    mileage: null,
                    exhosto_diameter: null,
                    engine_cylinders: null,
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
                    observations: '',
                    vehicle_prepared: null,
                    seen_technical_director: null,
                    vehicle_delivery_signature: null,
                    signature_received_report: null,
                    type_vehicle: null,
                    code: Math.round(Math.random()*1000000),
                    user_id: this.$route.params.user_id,
                    board: null,
                    numero_ruf: null,
                    certificado: null
                },
                user:{},
                created: false,
                formSearch : { plaque: null },
                selectItems: [],
                nextLabel: "<i class='fa fa-chevron-right' aria-hidden='true'></i>",
                prevLabel: "<i class='fa fa-chevron-left' aria-hidden='true'></i>"
            }
        },
        created() {
            this.$store.commit('data/LOAD_TRUE')
            this.$root.$on("event_observation", this.event_observation)
            Promise.all([
                this.$resourcesInspections.preInspections(),
                this.$resourcesInspections.inventory(),
                this.$resourcesUsers.users(this.data.user_id)
            ]).then((response) => {

                this.data.pre_inspections = response[0].map(e => {
                    let options = null
                    if (e.values) {
                        options = e.values.map(e => {
                            return {
                                label: e,
                                value: e
                            }
                        })
                    }

                    return {
                        name: e.name,
                        pre_inspection_id: e.id,
                        options: options,
                        value: null,
                        type: e.type
                    }
                })

                this.data.items = response[1].data.map(e => {
                    return {
                        name: e.name,
                        inventory_id: e.id,
                        evaluation: null,
                        quantity: null
                    }
                })

                this.user = response[2]

                this.$store.commit('data/LOAD_FALSE')
            }).catch((err) => {
                this.$store.commit('data/LOAD_FALSE')
                this.$q.notify({
                        message: 'Lo siento, ocurrio un error en el servidor. Intente de nuevo.',
                        position: 'top-right'
                    })
                console.log('There is an error', err);
            })
        },
        watch: {
            'formSearch.plaque': function(val) {
                this.notFound = false
            },
            is_vehicle_gas: function(val) {
                if(!val) {
                    this.data.gas_certificate = null
                    this.data.gas_certifier = null
                }
            },
        },
        filters: {
            validity: function (value) {
                let toDay= new Date();
                let day = new Date(value);
                return toDay < day ? 'VIGENTE' : 'NO VIGENTE'
            }
        },
        validations: {
            formSearch: {
                plaque: { required, minLength: minLength(6)  }
            },
            data: {
                type_vehicle: { required },
                teaching_vehicle: { required },
                mileage: { required },
                axes: {
                    $each: {
                        $each: {
                            pressure_init: { required },
                            adjustment: { required }
                        }
                    }
                },
                itemsRequired: {
                    required: requiredIf(vm => {
                        let isRequired = true
                        var d = vm.items.map((e) => {
                            isRequired = isRequired && e.quantity == null
                            return e
                        })
                        return isRequired
                    }),
                },
                items: {
                    $each: {
                        evaluation: { required : requiredIf((model) => {
                            if(typeof model.required === "undefined") {
                                return true
                            }
                            else
                                return model.quantity != null
                        })},
                        quantity: { required : requiredIf((model) => {
                            if(typeof model.required === "undefined") {
                                return true
                            }
                            else
                                return model.evaluation != null
                        })}
                    }
                },
                observations: { required : requiredIf(function(model) {
                    let required = false;
                    // this.data.items.forEach(function(element) {
                    //     if(element.evaluation == 'R' || element.evaluation == 'M') {
                    //         required = true
                    //     }
                    // });
                    return required
                })},
                gas_certificate: { required : requiredIf(function(model) {
                    return this.is_vehicle_gas
                })},
                gas_certifier: { required : requiredIf(function(model) {
                    return this.is_vehicle_gas
                })},
                gas_certificate_expiration: { required : requiredIf(function(model) {
                    return this.is_vehicle_gas
                })},
                signature_received_report: { required : requiredIf(function(model) {
                    //return this.showsignature && this.data.seen_technical_director
                })},
                vehicle_delivery_signature: { required : requiredIf(function(model) {
                    return this.showsignature
                })},
                vehicle_prepared : { required : requiredIf(function (model) {
                    return this.showsignature
                })},
                seen_technical_director: { required : requiredIf(function (model) {
                    return this.showsignature
                })},
            },
        },
        methods: {
          event_observation(e){
            if(this.data.observations==null){
              this.data.observations = e.name+' - '+e.observation
            }else{
              this.data.observations = this.data.observations + '\n'+ e.name+' - '+e.observation
            }

          },
            validity(value) {
                let toDay= new Date();
                let day = new Date(value);
                return toDay < day
            },
            expedition (value) {
                var fecha = new Date(value)
                var dias = parseInt(fecha)
                return value
            },
            submitData () {
                this.$v.data.$touch()
                if(this.data.gallery.length < 4){
                    this.$q.notify({message: 'Debe agregar mìnimo 4 imagenes',  position: 'top-right', closeBtn: true})
                    return
                }
                this.$store.commit('data/LOAD_TRUE')
                if (this.$v.data.$error) {
                    this.$store.commit('data/LOAD_FALSE')
                    this.$q.notify({message: 'Por favor revise los campos de nuevo.',  position: 'top-right', closeBtn: true})
                    return
                } else {
                    this.showData = false;
                    if(!this.is_vehicle_delivery_signature)
                        this.showsignature = true
                    else
                        this.showContract = true;
                    this.$store.commit('data/LOAD_FALSE')
                }
            },
            submitContract() {
                if(!this.aceptContract)
                    this.$q.notify({message: 'Debe aceptar los terminos para continuar.',  position: 'top-right', closeBtn: true})
                else{
                    this.$v.data.$reset()
                    this.showContract = false
                    this.showsignature = true
                }
            },
            submitSave() {
                this.$v.data.$touch()
                this.$store.commit('data/LOAD_TRUE')
                if (this.$v.data.$error) {
                    this.$store.commit('data/LOAD_FALSE')
                    this.$q.notify({message: 'Por favor revise los campos de nuevo.',  position: 'top-right', closeBtn: true})
                    return
                } else {

                    var jsonData = {};

                    for(var prop in this.data) {
                        if(this.data[prop]!=null)
                            jsonData[prop] = this.data[prop];
                    }

                    var items = this.data.items.filter(function (item) {
                        return item.evaluation != null && item.quantity != null
                    })

                    jsonData['items'] = items;
                    jsonData['gas_certificate'] = this.data.gas_certificate
                    jsonData['gas_certifier']   = this.data.gas_certifier
                    if ( !this.is_vehicle_delivery_signature)
                        delete jsonData['vehicle_delivery_signature'];
                    if ( !this.is_signature_received_report)
                        delete jsonData['signature_received_report'];
                    this.$resourcesInspections.createInspections(jsonData)
                    .then(response => {
                        this.$router.push({ name: 'home' })
                    }).catch(error => {
                        this.$store.commit('data/LOAD_FALSE')
                        this.$q.notify({message: 'Ocurrio algo inesperado.',  position: 'top-right', closeBtn: true})
                    })
                }
            },
            undo() {
                this.$refs.signatureEntrega.undoSignature();
            },
            onEnd() {
                if ( this.is_vehicle_delivery_signature) {

                    var { isEmpty, data } = this.$refs.signatureEntrega.saveSignature();
                    if(!isEmpty) {
                        this.data.vehicle_delivery_signature = data
                    } else
                        this.data.vehicle_delivery_signature = null
                }
            },
            searchPlaque () {
                this.$v.formSearch.$touch()
                this.$store.commit('data/LOAD_TRUE')
                this.notFound = false
                if (this.$v.formSearch.$error){
                    this.$store.commit('data/LOAD_FALSE')
                }
                else{
                    let board = this.formSearch.plaque.replace(/ /g, "")
                    this.data.board = board
                    this.$resourcesVehicles.vehicle(board,this.data.user_id)
                    .then(response => {
                        console.log(response.created)

                        this.data.attributes = []
                        this.data.vehicles_id = response.data.id
                        this.data.attributes = response.data
                        this.data.type_vehicle = this.typeVehicle(response.data.typeVehicle)
                        if(response.created)
                            this.notFound = true
                        this.showData = true;
                    }).catch(error => {
                        this.$q.notify({message: 'Ocurrio algo inesperado.',  position: 'top-right', closeBtn: true})
                        console.error('Error ', error)
                    }).then(() => {
                        this.$store.commit('data/LOAD_FALSE')
                    })
                }
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
            isMotocicleta() {
                return this.data.attributes.type_vehicle == 'Motorcycle';
            },
            captureImage () {
                var cameraError = function(error) {
                    navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
                };
                var cameraSuccess = function(mediaFiles) {
                    alert(JSON.stringify(mediaFiles));
                };

                navigator.camera.getPicture(cameraSuccess, cameraError,
                    data => { // on success
                        console.log(`data:image/jpeg;base64,${data}`)
                    }, () => { // on fail
                        this.$q.notify('Could not access device camera.')
                    },{
                      // camera options
                    }
                )
            },
            back(step) {
                if(step == 1) {
                    this.showData = true
                    this.showContract = false
                    this.showsignature = false
                } else {
                    this.showContract = true
                    this.showsignature = false
                }
            }
        }
    }
</script>
