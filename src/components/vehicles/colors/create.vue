<template>
  <div>
    <q-btn
      @click="modalColor = true"
      icon="add"
      color="primary"
      round>
    </q-btn>
    <q-modal v-model="modalColor">
      <div class="layout-padding">
        <div class="row">
          <div class="col-md-12">
            <q-field
              :error="this.$v.form.nameColor.$error"
              error-label="Dato requerido">
              <q-input
                v-model="form.nameColor"
                float-label="Color" >
              </q-input>
            </q-field>
          </div>
          <div class="col-md-12">
            <q-btn
              class="full-width"
              color="primary"
              @click="saveColor()"
              label="Guardar">
            </q-btn>
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
        modalColor: false,
        form:{
          nameColor: ''
        }
      }
    },
    validations: {
      form:{
        nameColor:{required}
      }
    },
    methods:{
      saveColor(){
        this.$v.form.nameColor.$touch()
        if (this.$v.form.nameColor.$error) {
          this.$q.notify({
            message: 'Por favor revise los campos de nuevo.',
            position: 'top-right',
            closeBtn: true})
          return
        }
        let data = {
          name:this.form.nameColor
        }
        resources.addColors(data)
        .then(response=>{
          this.form.nameColor = ''
          this.modalColor = false
          this.$root.$emit('refreshColor')
        })
        .catch(error=>{
          console.warn(error)
        })
      }
    }
  }
</script>

