<template>
  <q-page class="container-section q-py-lg" v-show="!$store.state.data.load_inner">
    <div class="row">
        <div class="col-12 col-sm-8 col-md-6 col-lg-5 mx-auto">
            <div class="row q-pt-sm">
                <div class="col-12 text-center">
                    <p>Datos de Usuario</p>
                </div>
            </div>

            <q-field :error="$v.form.type_document.$error" class="q-mb-md">
                <span class="w-50 d-inline-block"> Tipo de documento </span>
                <div class="w-50 d-inline-block">
                    <q-select v-model="form.type_document" :options="selectOptions" class="bg-white q-mb-md"/>
                </div>
            </q-field>
            
            <q-field :error="$v.form.number_document.$error" class="q-my-md">
                <q-input v-model="form.number_document" type="text" placeholder="N° Documento" class="bg-white mx-auto"
                    v-on:keyup.enter="searchUser"
                    :after="[{icon: 'search',handler() { searchUser()} }]"/>
                <q-tooltip v-show="$v.form.number_document.$error">
                    <p class="error-message mb-0" v-if="!$v.form.number_document.required">
                        <i class="material-icons">error_outline</i> El campo es obligatorio.
                    </p>
                    <p class="error-message mb-0" v-if="!$v.form.number_document.minLength">
                        <i class="material-icons">error_outline</i> Debe contener al menos 8 caracteres.
                    </p>
                </q-tooltip>
            </q-field>

            <q-field :error="$v.form.business.$error" class="q-my-md" >
                <q-input v-model="form.business" type="text" placeholder="Empresa" class="bg-white mx-auto"/>
                <q-tooltip v-show="$v.form.business.$error">
                    <p class="error-message mb-0" v-if="!$v.form.business.required">
                        <i class="material-icons">error_outline</i> El campo es obligatorio.
                    </p>
                    <p class="error-message mb-0" v-if="!$v.form.business.minLength">
                        <i class="material-icons">error_outline</i> Debe contener al menos 8 caracteres.
                    </p>
                </q-tooltip>
            </q-field>

            <q-field :error="$v.form.first_name.$error" error-label="" class="q-my-md">
                <q-input v-model="form.first_name" type="text" placeholder="Nombre" class="bg-white mx-auto"/>
                <q-tooltip v-show="$v.form.first_name.$error">
                    <p v-show="!$v.form.first_name.required" class="mb-0">
                        <i class="material-icons color-danger"> error_outline </i> El campo es obligatorio.
                    </p>
                    <p class="error-message mb-0" v-if="!$v.form.first_name.minLength">
                        <i class="material-icons">error_outline</i> Debe contener al menos 3 caracteres.
                    </p>
                </q-tooltip>
            </q-field>

            <q-field :error="$v.form.last_name.$error" error-label="" class="q-my-md">
                <q-input v-model="form.last_name" type="text" placeholder="Apellido" class="bg-white mx-auto"/>
                <q-tooltip v-show="$v.form.last_name.$error">
                    <p v-show="!$v.form.last_name.required" class="mb-0">
                        <i class="material-icons color-danger"> error_outline </i> El campo es obligatorio.
                    </p>
                    <p class="error-message mb-0" v-if="!$v.form.last_name.minLength">
                        <i class="material-icons">error_outline</i> Debe contener al menos 3 caracteres.
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
                <q-btn color="black" size="md" label="ENVIAR" class="q-px-lg q-mx-sm btn-app" @click="submit"/>
                <!-- <q-btn color="red" size="md" label="CONTINUAR" class="q-px-lg q-mx-sm btn-app" v-show="changeSearch" @click="next"/> -->
            </div>
        </div>
    </div>
  </q-page>
</template>

<script>
import { required, email, minLength, requiredIf, sameAs } from 'vuelidate/lib/validators'

export default {
    name: 'PageIndex',
    data () {
        return {
            changeSearch: false,
            form: {
                email: null,
                phone: null,
                first_name: null,
                last_name: null,
                user_id: null,
                number_document: null,
                checked: true,
                roles: ['User'],
                status: true,
                business: null,
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
                },
                {
                    label: 'NIT',
                    value: 'nit'
                }
            ],
        }
    },
    created() {
        let time = new Date();
        time = time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: false })
        this.$store.commit('orden/SET_ORDEN',{
           timeEntry: time,
           dateEntry: new Date().toJSON().slice(0,10).replace(/-/g,'-'),
           id:  null
        })
    },
    mounted() {
        this.$store.commit('data/LOAD_FALSE')
    },
    validations: {
        form: {
            number_document: { required,minLength: minLength(8) },
            first_name:  { required, minLength: minLength(3) },
            last_name:  { required, minLength: minLength(3) },
            phone: { required, minLength: minLength(10) },
            business: { required : requiredIf(function(model) {
                return this.form.type_document == 'nit'
            })},
            email: { email },
            type_document: { required },
            checked: { required, sameAs: sameAs( () => true ) }
        },
    },
    methods: {
        submit () {
            this.$store.commit('data/LOAD_TRUE')
            this.$v.form.$touch()
            if (this.$v.form.$error) {
                this.$store.commit('data/LOAD_FALSE')
                this.$q.notify({icon:'error', message: 'Por favor revise los campos de nuevo',  position: 'top-right', closeBtn: true})
                return
            }else {
                this.$resourcesUsers.createUser(this.form)
                .then(response => {
                    let user_id = response.data.succes.detail.id
                    this.$router.push({ name: 'create.inspection', params: { user_id: user_id, update: false } })
                }).catch((error) => {
                    let message, errors = JSON.parse(error.response.data.errors)
                    for (var clave in errors) {
                        message = errors[clave]
                    }
                    this.$store.commit('data/LOAD_FALSE')
                    this.$q.notify({icon:'error', message: message,  position: 'top-right', closeBtn: true})
                })
            }
        },
        searchUser () {
            this.$store.commit('data/LOAD_TRUE')
            this.$resourcesUsers.searchUser(this.form.type_document,this.form.number_document)
            .then(response => {
                if(response.data.data.length) {
                    let user = response.data.data[0]
                    this.form.user_id            =   user.id
                    this.form.email              =   user.email
                    this.form.phone              =   user.phone
                    this.form.first_name         =   user.first_name
                    this.form.last_name          =   user.last_name
                    this.form.number_document    =   user.number_document
                    this.$router.push({ name: 'create.inspection', params: { user_id: this.form.user_id, update: false } })
                }
                else {
                    this.$q.notify({icon:'error', message: 'Usuario no encontrado, debe registrarse',  position: 'top-right', closeBtn: true})
                    this.$store.commit('data/LOAD_FALSE')
                }
            }).catch(error => {
                this.$store.commit('data/LOAD_FALSE')
                this.$q.notify({icon:'error',message: 'Ocurrio un error inesperado',position:'top-right',closeBtn: true})
            })
        },
        next () {
            this.$store.commit('data/LOAD_TRUE')
            this.$v.form.$touch()
            if (this.$v.form.$error) {
                this.$store.commit('data/LOAD_FALSE')
                this.$q.notify({icon:'error', message: 'Por favor revise los campos de nuevo',  position: 'top-right', closeBtn: true})
                return
            }else {
                this.$store.commit('data/LOAD_FALSE')
                this.$router.push({ name: 'create.inspection', params: { user_id: this.form.user_id, update: false } })
            }
        }
    }
}
</script>