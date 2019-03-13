<template>
    <div>
        <div v-bind:class="{ 'd-inline-block' : lineal }">
            <span class="q-mr-sm" v-if="labelShow">{{ label }}</span> 
            <div class="font-weight-bold" v-bind:class="{ 'd-inline-block' : lineal }">
                <q-field :error="model.$invalid" class="q-my-xs">
                  <div class="d-inline-block">
                    <q-input v-model="model.$model" type="text" :placeholder="label" :hide-underline="disable" :disable="disable" ref="Qinput"/>
                  </div>
                  <span @click="change_disable()"><i class="material-icons">edit</i></span>
                </q-field>
                <q-tooltip>
                    <p v-if="!model.required">
                        <i class="material-icons"> error_outline </i> El campo es obligatorio.
                    </p>
                    <p v-if="!typeof model.minLength && !model.minLength">
                        <i class="material-icons"> error_outline </i> El cambo debe contener minimo ({{ model.$params.minLength.min }}) caracteres.
                    </p>
                </q-tooltip>
            </div>
        </div>
    </div>
</template>
<script>
  export default {
    name: 'q-input-validation',
    props: {
      'model': { required: true },
      'label': { required: false, default: null },
      'labelShow': { required: false, default: true },
      'lineal': { required: false, default: true }
    },
    data() {
      return {
        disable: true
      }
    },
  	computed: {
  		value: {
  			get() {
  				return this.model;
  			},
  			set(val) {
  				this.$emit('input', this.sanitizeSlug(val))
  			}
  		}
  	},
    methods: {
      change_disable() {
        this.disable = !this.disable;
      }
    }
  }
</script>