<template>
  <div>
    <q-btn
      @click="modal = true"
      icon="add"
      color="primary"
      round>
    </q-btn>
    <q-modal v-model="modal">
      <div class="layout-padding">
        <div class="row">
          <div class="col-md-12">
            <q-field
              :error="this.$v.form.name.$error"
              error-label="Dato requerido">
              <q-input
                v-model="form.name"
                float-label="Nombre de la Marca">
              </q-input>
            </q-field>
          </div>
          <div class="col-md-12">
            <q-btn
              class="full-width"
              color="primary"
              @click="save()"
              label="Guardar"></q-btn>
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
          name: ''
        }
      }
    },
    validations: {
      form:{
        name:{required}
      }
    },
    methods:{
      save(){
        this.$v.form.name.$touch()
        if (this.$v.form.name.$error) {
          this.$q.notify({
            message: 'Por favor revise los campos de nuevo.',
            position: 'top-right',
            closeBtn: true})
          return
        }
        let data = {
          name:this.form.name
        }
        resources.addBrands(data)
        .then(response=>{
          this.form.name = ''
          this.modal = false
          this.$root.$emit('refreshBrands')
        })
        .catch(error=>{
          console.warn(error)
        })
      }
    }
  }
</script>

