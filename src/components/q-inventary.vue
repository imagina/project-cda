<template>
    <div>
      <p class="font-weight-bold q-my-lg"  :class="{'color-danger': itemsRequired}">
        <span>Inventario</span>
        <br>
        <small v-show="itemsRequired">Complete al menos un item del inventario</small>
      </p>
      <div class="row">
        <div class="col col-lg-8 mx-auto">
            <div class="row border">
                <div class="col-12 col-sm-4 col-md-5 col-lg-4"></div>
                <div class="col q-py-md border-l font-weight-bold col-checkout">B</div>
                <div class="col q-py-md border-l font-weight-bold col-checkout">R</div>
                <div class="col q-py-md border-l font-weight-bold col-checkout">M</div>
                <div class="col q-py-md border-l font-weight-bold col-checkout">N/A</div>
                <div class="col q-py-md border-l font-weight-bold col-count">Cant</div>
            </div>
            <div class="row border border-t-0" v-for="(item,index) in inventory.$model" :key="index">
                <div class="col-12 col-sm-4 col-md-5 col-lg-4 col-inventory-name font-weight-bold boder-botton">
                  <span :class="{'color-danger': inventory.$each[index].quantity.$error || inventory.$each[index].evaluation.$error }">
                    {{ item.name }}
                  </span>
                </div>
                <div class="col q-py-sm border-l col-checkout col-inventory text-center">
                    <div class="q-mt-sm">
                        <q-radio v-model="item.evaluation" val="B" class="q-mr-lg mx-auto"/>
                    </div>
                </div>
                <div class="col q-py-sm border-l col-checkout col-inventory">
                    <div class="q-mt-sm">
                        <q-radio v-model="item.evaluation" val="R" class="q-mr-lg mx-auto"/>
                    </div>
                </div>
                <div class="col q-py-sm border-l col-checkout col-inventory">
                    <div class="q-mt-sm">
                        <q-radio v-model="item.evaluation" val="M" class="q-mr-lg mx-auto"/>
                    </div>
                </div>
                <div class="col q-py-sm border-l col-checkout col-inventory">
                    <div class="q-mt-sm">
                        <q-radio v-model="item.evaluation" val="NA" class="q-mr-lg mx-auto"/>
                    </div>
                </div>
                <div class="col q-py-sm border-l col-count q-px-md">
                  <div class="row">
                    <div class="col q-pt-xs">
                      <q-field :error="inventory.$each[index].quantity.$error">
                        <span v-show="false">{{item.evaluation == 'NA' ? item.quantity=0:''}}</span>
                        <q-input v-model="item.quantity" type="number" class="bg-white q-py-sm q-my-md" min="0"/>
                      </q-field>
                    </div>
                    <div class="col" style="max-width: 50px" v-show="item.evaluation == 'M' || item.evaluation == 'R'">
                      <q-field :error="inventory.$each[index].quantity.$error" class="pt-0 mt-0">
                        <q-btn v-on:click="setObservations(inventory.$each[index].$model)" class="q-px-sm bg-yellow">
                          <q-icon name="info"/>
                        </q-btn>
                      </q-field>
                    </div>
                  </div>
                </div>
            </div>
            <div class="row">
                <div class="col q-mt-md text-left">
                    <q-btn round color="primary" size="sm" @click="showAddInventary = true">
                        <q-icon name="add"/>
                    </q-btn>
                    <span class="q-ml-sm font-weight-bold cursor-pointer" @click="showAddInventary = true"> Agregar Item</span>
                </div>
            </div>
        </div>
      </div>
      <q-modal v-model="showAddInventary" :content-css="{minWidth: '30vw',padding: '25px', maxWidth: '100%'}">
          <h6 class="mx-auto">Nuevo elemento para el inventario</h6>
            <div class="font-weight-bold">
                <q-field :error="$v.addInventory.name.$invalid" class="q-mt-lg">
                  <q-input v-model="addInventory.name" type="text" placeholder="Nombre"/>
                </q-field>
                <q-tooltip>
                    <p v-if="!$v.addInventory.name.required">
                        <i class="material-icons"> error_outline </i> El campo es obligatorio.
                    </p>
                    <p v-if="!$v.addInventory.name.minLength">
                        <i class="material-icons"> error_outline </i> El cambo debe contener minimo ({{ $v.addInventory.name.$params.minLength.min }}) caracteres.
                    </p>
                </q-tooltip>
            </div>
          <q-btn color="dark" @click="showAddInventary = false" label="Cerrar" class="mt-2 q-mr-md"/>
          <q-btn color="primary" @click="addInventary" label="Aceptar" class="mt-2"/>
      </q-modal>

      <q-modal v-model="observation.showModal" :content-css="{minWidth: '30vw',padding: '25px', maxWidth: '100%'}">
          <h6 class="mx-auto">Observaciones de {{ observation.name }}</h6>
            <div class="font-weight-bold">
                <q-field class="q-mt-lg">
                  <q-input v-model="observation.text"
                             type="textarea"
                             :max-height="10"
                             rows="3"
                             class="bg-white"/>
                 </q-field>
            </div>
          <q-btn color="primary" @click="handlesimpleObservation()" label="Aceptar" class="mt-2"/>
      </q-modal>
    </div>
</template>
<script>
import { required, email, minLength } from 'vuelidate/lib/validators'
import qInputValidation from './q-input-validation'
import resources from 'src/services/resources'

export default {
  name: 'q-inventary',
  components: { qInputValidation },
  props: {
    'inventory': { required: true },
    'itemsRequired': { required: true }
  },
  data () {
    return {
      showAddInventary: false,
      observation: {
        showModal: false,
        text: false,
        name: null,
        evaluation:null
      },
      elementInventary: {
        name: null,
        inventory_id: null,
        evaluation: null,
        quantity: null,
        required: false,
        observation: null
      },
      addInventory: {
        name: null
      }
    }
  },
  methods: {
    addInventary () {
      this.$v.addInventory.$touch()
      this.$store.commit('data/LOAD_TRUE')
      if (this.$v.addInventory.$error) {
        this.$store.commit('data/LOAD_FALSE')
        this.$q.notify({ message: 'Por favor revise los campos de nuevo.', position: 'top-right', closeBtn: true })
      } else {
        this.$resourcesInspections.addInventory(this.addInventory.name)
          .then(response => {
            this.elementInventary.name = response.data.name
            this.elementInventary.inventory_id = response.data.id
            this.elementInventary.id = response.data.id
            this.addInventory.name = null
            this.inventory.$model.push(Object.assign({}, this.elementInventary))
            this.showAddInventary = false
          })
          .then(() => {
            this.$store.commit('data/LOAD_FALSE')
          })
      }
    },
    setObservations (item) {
      this.observation.text = item.observation
      this.observation.evaluation = item.evaluation
      this.observation.name = item.name
      this.observation.showModal = true
    },
    handlesimpleObservation(){
      this.observation.showModal  = false
      let data = {
        name:this.observation.name,
        observation:this.observation.text
      }
      this.$root.$emit('event_observation', data)
    }
  },
  validations: {
    addInventory: {
      name: { required, minLength: minLength(2) }
    }
  }
}
</script>
