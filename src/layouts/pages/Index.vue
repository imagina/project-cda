<template>
  <q-page class="container-section q-py-lg">
    <div class="row">
        <div class="col-12 col-sm-8 col-md-6 col-lg-5 mx-auto">
            <div class="row q-py-sm">
                <div class="col-12 text-center">
                    <p>Datos de Usuario</p>
                </div>
            </div>

            <q-field :error="$v.form.type_document.$error" class="q-mb-md">
                <span class="w-50 d-inline-block"> Tipo de documento </span>
                <div class="w-50 d-inline-block">
                    <q-select v-model="form.type_document" :options="selectOptions" class="bg-white q-my-md"/>
                </div>
            </q-field>
            
            <q-field :error="$v.form.number_document.$error" class="q-my-md">
                <q-input v-model="form.number_document" type="text" placeholder="N° Cédula" class="bg-white mx-auto"
                    v-on:keyup.enter="searchUser"
                    :after="[
                    {
                        icon: 'search',
                        handler() {
                            searchUser()
                        }
                    }]"/>
                <q-tooltip v-show="$v.form.number_document.$error">
                    <p class="error-message mb-0" v-if="!$v.form.number_document.required">
                        <i class="material-icons">error_outline</i> El campo es obligatorio.
                    </p>
                    <p class="error-message mb-0" v-if="!$v.form.number_document.minLength">
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
                <q-input v-model="form.last_name" type="text" placeholder="Apelldio" class="bg-white mx-auto"/>
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
                <q-btn color="black" size="md" label="ENVIAR" class="q-px-lg btn-app" @click="submit"/>
            </div>
        </div>
    </div>
  </q-page>
</template>

<script>
import { required, email, minLength, sameAs } from 'vuelidate/lib/validators'
import resources from 'src/services/resources';

const isPhone = (value) => /^1(3|4|5|7|8)\d{9}$/.test(value);  //phone valid

export default {
    name: 'PageIndex',
    data () {
        return {
            form: {
                email: null,
                phone: null,
                first_name: null,
                last_name: null,
                number_document: null,
                checked: true,
                roles: [],
                status: true,
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
        let time = new Date();
        time = time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: false })
        this.$store.commit('orden/SET_ORDEN',{
           timeEntry: time,
           dateEntry: new Date().toJSON().slice(0,10).replace(/-/g,'-'),
           id:  null
        })
        this.$q.loading.hide()
    },
    validations: {
        form: {
            number_document: { required,minLength: minLength(8) },
            first_name:  { required, minLength: minLength(3) },
            last_name:  { required, minLength: minLength(3) },
            phone: { required, minLength: minLength(10) },
            email: { email },
            type_document: { required },
            checked: { required, sameAs: sameAs( () => true ) }
        },
    },
    methods: {
        submit () {
            this.$q.loading.show()
            this.$v.form.$touch()
            if (this.$v.form.$error) {
                this.$q.loading.hide()
                this.$q.notify({icon:'error', message: 'Por favor revise los campos de nuevo',  position: 'top-right', closeBtn: true})
                return
            }else {
                resources.createUser(this.form)
                .then(response => {
                    let user_id = response.data.succes.detail.id
                    this.$router.push({ name: 'create.inspection', params: { user_id: user_id, update: false } })
                }).catch((error) => {
                    let errors = JSON.parse(error.response.data.errors)
                    let message;
                    for (var clave in errors){
                        message = errors[clave]
                    }
                    this.$q.loading.hide()
                    this.$q.notify({icon:'error', message: message,  position: 'top-right', closeBtn: true})
                })
            }
        },
        searchUser () {
            this.$q.loading.show()
            resources.searchUser(this.form.type_document,this.form.number_document)
            .then(response => {
                if(response.data.data.length) {

                    var user_id = response.data.data[0].id
                    this.$router.push({ name: 'create.inspection', params: { user_id: user_id, update: false } })
                }
                else {
                    this.$q.notify({icon:'error', message: 'Usuario no encontrado, debe registrarse',  position: 'top-right', closeBtn: true})
                    this.$q.loading.hide()
                }
            }).catch(error => {
                this.$q.notify({icon:'error', message: 'Ocurrio un error inesperado',  position: 'top-right', closeBtn: true})
                this.$q.loading.hide()
            })
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
