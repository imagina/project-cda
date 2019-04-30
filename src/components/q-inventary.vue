<template>
    <div>
      <p class="font-weight-bold q-my-lg"  :class="{'color-danger': itemsRequired}">
        <span>Inventario</span>
        <br>
        <small v-show="itemsRequired">Complete al menos un item del inventario</small>
      </p>
      <div class="row">
        <div class="col col-md-8 mx-auto">
            <div class="row border">
                <div class="col-12 col-sm-4 col-md-5 col-lg-4"></div>
                <div class="col q-py-md border-l font-weight-bold col-checkout">B</div>
                <div class="col q-py-md border-l font-weight-bold col-checkout">R</div>
                <div class="col q-py-md border-l font-weight-bold col-checkout">M</div>
                <div class="col q-py-md border-l font-weight-bold col-checkout">NA</div>
                <div class="col q-py-md border-l font-weight-bold col-count"><span class="d-none d-sm-block">Cantidad</span></div>
            </div>
            <div class="row border border-t-0" v-for="(item,index) in inventory.$model">
                <div class="col-12 col-sm-4 col-md-5 col-lg-4 col-inventory-name font-weight-bold boder-botton">
                  <span :class="{'color-danger': inventory.$each[index].quantity.$error || inventory.$each[index].evaluation.$error }">
                    {{ item.name }}
                  </span>
                </div>
                <div class="col q-py-sm border-l col-checkout text-center">
                    <div class="q-mt-sm">
                        <q-radio v-model="item.evaluation" val="B" class="q-mr-lg mx-auto"/>
                    </div>
                </div>
                <div class="col q-py-sm border-l col-checkout">
                    <div class="q-mt-sm">
                        <q-radio v-model="item.evaluation" val="R" class="q-mr-lg mx-auto"/>
                    </div>
                </div>
                <div class="col q-py-sm border-l col-checkout">
                    <div class="q-mt-sm">
                        <q-radio v-model="item.evaluation" val="M" class="q-mr-lg mx-auto"/>
                    </div>
                </div>
                <div class="col q-py-sm border-l col-checkout">
                    <div class="q-mt-sm">
                        <q-radio v-model="item.evaluation" val="NA" class="q-mr-lg mx-auto"/>
                    </div>
                </div>
                <div class="col q-py-sm border-l col-count q-px-md">
                  <q-field :error="inventory.$each[index].quantity.$error">
                    <q-input v-model="item.quantity" type="number" class="bg-white q-py-sm q-my-md" min="0"/>
                  </q-field>
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
    </div>
</template>
<script>
  import { required, email, minLength } from 'vuelidate/lib/validators';
  import qInputValidation from './q-input-validation';
  import resources from 'src/services/resources';

  export default {
    name: 'q-inventary',
    components: { qInputValidation },
    props: {
      'inventory'      : { required: true },
      'itemsRequired'  : { required: true }
    },
    data() {
      return {
        showAddInventary: false,
        elementInventary: {
            name: null,
            inventory_id: null,
            evaluation: null,
            quantity: null,
            required: false
        },
        addInventory : {
          name: null
        },
      }
    },
    methods: {
      addInventary () {
          this.$v.addInventory.$touch()
          this.$store.commit('data/LOAD_TRUE')
          if (this.$v.addInventory.$error) {
              this.$store.commit('data/LOAD_FALSE')
              this.$q.notify({message: 'Por favor revise los campos de nuevo.',  position: 'top-right', closeBtn: true})
              return
          }else {
            this.$resourcesInspections.addInventory(this.addInventory.name)
            .then(response => {
              this.elementInventary.name = response.data.name;
              this.elementInventary.inventory_id = response.data.id
              this.elementInventary.id = response.data.id
              this.addInventory.name = null;
              this.inventory.$model.push(Object.assign({}, this.elementInventary))
              this.showAddInventary = false
            })
            .then(() => {
              this.$store.commit('data/LOAD_FALSE')
            })
          }
      },
    },
    validations: {
      addInventory: {
        name: { required, minLength: minLength(2) }
      }
    },
  }
</script>