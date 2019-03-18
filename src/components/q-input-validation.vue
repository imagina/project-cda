<template>
  <div class="q-input-validation">
    <div class="d-inline-block"> 
      <span class="q-mr-sm" v-if="labelShow">{{ label }}</span> 
      <div class="font-weight-bold d-inline-block">
        <q-field :error="model.$error" class="q-my-xs">
          <div class="d-inline-block">
            <q-input v-model="model.$model"
              type="text"
              :placeholder="label" 
              :after="[
                {icon: 'edit', content: true, handler(){ change_disable() }},
                {icon: 'settings_backup_restore', content: !disable, handler(){ change_restore() }},
              ]"
              :disable="disable"
              @blur="change_disable()"
              ref="Qinput"/>
          </div>
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
    },
    data() {
      return {
        disable: true,
        handlerSet: false,
        valueRestore: this.model.$model
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
      change_restore() {
        this.model.$model = this.valueRestore
        this.change_disable()
      },
      change_disable() {
        this.handlerSet = !this.handlerSet;
        this.disable = !this.disable;
        if(!this.disable)
          this.$nextTick(() => {
            this.$refs.Qinput.focus()
          })
        else
          this.$nextTick(() => {
            this.$refs.Qinput.blur()
          })
      }
    }
  }
</script>