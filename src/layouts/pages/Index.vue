<template>
  <q-page class="container-section q-py-lg">
    <div class="row">
        <div class="col-12 col-sm-8 col-md-6 col-lg-5 mx-auto">
            <div class="row q-py-sm">
                <div class="col-12 text-center">
                    <p>Datos de Usuario</p>
                </div>
            </div>

            <q-field :error="$v.form.type_document.$error" error-label="" class="q-mb-md">
                <span class="w-50 d-inline-block"> Tipo de documento </span>
                <div class="w-50 d-inline-block">
                    <q-select v-model="form.type_document" :options="selectOptions" class="bg-white q-my-md"/>
                </div>
            </q-field>

            <q-field :error="$v.form.document.$error" error-label="" class="q-my-md">
                <q-search v-model="form.document" type="text" placeholder="N° Cédula" class="bg-white mx-auto"/>
                <q-tooltip v-show="$v.form.document.$error">
                    <p class="error-message mb-0" v-if="$v.form.document.$error && !$v.form.document.required">
                        <i class="material-icons">error_outline</i> El campo es obligatorio.
                    </p>
                    <p class="error-message mb-0" v-if="$v.form.document.$error && !$v.form.document.minLength">
                        <i class="material-icons">error_outline</i> Debe contener al menos 8 caracteres.
                    </p>
                </q-tooltip>
            </q-field>

            <q-field :error="$v.form.name.$error" error-label="" class="q-my-md">
                <q-input v-model="form.name" type="text" placeholder="Nombre completo" class="bg-white mx-auto"/>
                <q-tooltip v-show="$v.form.name.$error">
                    <p v-show="!$v.form.name.required" class="mb-0">
                        <i class="material-icons color-danger"> error_outline </i> El campo es obligatorio.
                    </p>
                </q-tooltip>
            </q-field>

            <q-field :error="$v.form.phone.$error" error-label="" class="q-my-md">
                <q-input v-model="form.phone" type="text" placeholder="Celular" class="bg-white mx-auto"/>
                <q-tooltip v-show="$v.form.phone.$error">
                    <span v-show="!$v.form.phone.required">
                        <i class="material-icons color-danger"> error_outline </i> El campo es obligatorio.
                    </span>
                </q-tooltip>
            </q-field>

            <q-field :error="$v.form.email.$error" error-label="" class="q-my-md">
                <q-input v-model="form.email" type="text" placeholder="Correo eléctronico" class="bg-white mx-auto"/>
                <q-tooltip v-show="$v.form.email.$error">
                    <p v-show="!$v.form.email.required" class="mb-0">
                        <i class="material-icons"> error_outline </i> El campo es obligatorio.
                    </p>
                    <p v-show="!$v.form.email.email" class="mb-0">
                        <i class="material-icons">error_outline</i> Debe ingresar un email valido.
                    </p>
                </q-tooltip>
            </q-field>

            <q-field :error="$v.form.checked.$error" error-label="" class="q-my-md">
                <q-checkbox v-model="form.checked" label="Autorizo la toma de datos personales" class="mx-auto" :class="{'color-danger' :$v.form.checked.$error}"/>
                <q-tooltip v-show="$v.form.checked.$error">
                    <p v-show="!$v.form.checked.sameAs" class="mb-0">
                        <i class="material-icons">error_outline</i>Debe autorizar los datos.
                    </p>
                </q-tooltip>
            </q-field>

            <div class="col-12 text-center">
                <q-btn color="black" size="md" label="ENVIAR" class="q-px-lg btn-app" @click="submit"/>
            </div>
        </div>
    </div>
  </q-page>
</template>

<script>
import { required, email, minLength, sameAs } from 'vuelidate/lib/validators'

const isPhone = (value) => /^1(3|4|5|7|8)\d{9}$/.test(value);  //phone valid

export default {
    name: 'PageIndex',
    data () {
        return {
            form: {
                phone: null,
                email: null,
                name: null,
                document: null,
                checked: false,
                type_document: 'cc',
            },
            selectOptions: [
                {
                  label: 'Cédula de ciudadanía',
                  value: 'cc'
                },
                {
                  label: 'Cédula de extranjería',
                  value: 'ce'
                },
                {
                  label: 'Pasaporte',
                  value: 'p'
                }
            ],
        }
    },
    created() {
        this.$q.loading.hide()
    },
    validations: {
        form: {
            document: { required,minLength: minLength(8) },
            name: { required, minLength: minLength(4) },
            phone: { required, minLength: minLength(11)},
            email: { required, email },
            type_document: { required },
            checked: { required, sameAs: sameAs( () => true ) }
        }
    },
    methods: {
        submit () {
            this.$v.form.$touch()
            if (this.$v.form.$error) {
                this.$q.notify({icon:'error', message: 'Por favor revise los campos de nuevo',  position: 'top-right', closeBtn: true})
                return
            }else {
                this.$q.loading.show()
                this.$router.push('/nueva/inspeccion')
            }
        }
    }
}
</script>


<style>
    .error-messages
    {
        background-color: #db2828
    }
    .error-messages .error-message
    {
        color: white;
        font-size: .8rem;
        line-height: 1.6;
        opacity: 0.8;
    }
</style>
