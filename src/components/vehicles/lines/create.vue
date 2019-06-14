<template>
  <div>
    <q-btn
      @click="modal = true"
      icon="add"
      color="primary"
      round/>
    <q-modal v-model="modal">
      <div class="layout-padding">
        <div class="row">
          <div class="col-md-12">
            <q-field
              :error="$v.form.brand_id.$error">
              <span
                class="font-weight-bold d-inline-block"
                :class="{'color-danger': $v.form.brand_id.$error}">
                Marca:
              </span>
              <q-select
                filter
                v-model="form.brand_id"
                class="q-mb-lg uppercase"
                placeholder="Marca"
                :options="$store.state.data.types_brands"/>
            </q-field>
          </div>
          <div class="col-md-12">
            <q-field
              :error="this.$v.form.name.$error"
              error-label="Dato requerido">
              <q-input
                v-model="form.name"
                float-label="Linea" />
            </q-field>
          </div>
          <div class="col-md-12">
            <q-btn
              class="full-width"
              color="primary"
              @click="save()"
              label="Guardar"/>
          </div>
        </div>
      </div>
    </q-modal>
  </div>
</template>

<script>
  import { required } from 'vuelidate/lib/validators';
  import resources from 'src/services/resources.js'
  export default {
    data(){
      return{
        modal: false,
        form:{
          brand_id:'',
          name: ''
        }
      }
    },
    validations: {
      form:{
        brand_id:{required},
        name:{required}
      }
    },
    methods:{
      save(){
        this.$v.form.$touch()
        if (this.$v.form.$error) {
          this.$q.notify({
            message: 'Por favor revise los campos de nuevo.',
            position: 'top-right',
            closeBtn: true})
          return
        }
        resources.addLines(this.form)
        .then(response=>{
          this.form.name = ''
          this.form.brand_id = ''
          this.modal = false
          this.$root.$emit('refreshLines')
        })
        .catch(error=>{
          console.warn(error)
        })
      }
    }
  }
</script>

