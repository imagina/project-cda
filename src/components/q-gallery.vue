<template>
  <div>
    <div 
      class="d-block q-mt-md q-mb-lg text-right">
      <q-btn 
        color="primary" 
        size="md" 
        label="Agregar fotografía" 
        class="q-mx-md q-px-xs text-dark" 
        icon="add" 
        @click="openedUploader = true"/>
    </div>
    <q-modal 
      v-model="openedUploader" 
      :content-css="{minWidth: '80vw', padding: '25px'}">
      <h4 class="mx-auto">Añadir imagen</h4>
      <div >
        <q-uploader
          :url="url"
          :auto-expand="true"
          @remove:cancel="removeUploader"
          :multiple="true"
          class="q-my-lg"
          extensions=".jpg,.jpeg,.png" ref="uploader"
          :upload-factory="uploadFile"/>
        <q-inner-loading :visible="visible"/>
      </div>
      <div v-if="$q.platform.is.mobile">
        <q-btn color="black" icon="photo_camera" @click="captureImage()" />
      </div>
      <div>
        <img
          :src="imageSrc"
          placeholder-src="statics/quasar-logo.png"
          :alt="'Imagem: ' + imageSrc" id="photo"
        />
      </div>
      <q-btn 
        color="dark" 
        @click="openedUploader = false" 
        label="Cerrar" 
        class="mt-2 q-mr-sm"/>
      <q-btn 
        color="red" 
        @click="addUploader" 
        label="Añadir" 
        class="mt-2 mr-2" 
        :disabled="visible"/>
    </q-modal>
  </div>
</template>

<script>

  import resources from 'src/services/resources'
  import config from 'src/config/index'

  export default {
    name:'galeria',
    props: {
      gallery:{
        required: true 
      },
      code:{ 
        required: false, 
        default: null 
      }
    },
    data() {
      return {
        renderComponent: false,
        nextLabel: "<i class='fa fa-chevron-right' aria-hidden='true'></i>",
        prevLabel: "<i class='fa fa-chevron-left' aria-hidden='true'></i>",
        openedUploader: false,
        url: config('api.api_icda') + '/inspections/media/upload?code=' + this.code,
        visible: false,
        imageSrc: ''
      }
    },
    methods: {
      uploadFile (file, updateProgress) {
        this.visible = true
        this.$resourcesInspections.addImagenGallery(file, this.code)
        .then(response => {
          this.gallery.push(response.data.data.url)
          this.$refs.uploader.reset();
          this.openedUploader = false
          this.visible = false
        })
        .catch(error => {
          this.visible = false
          this.$q.notify({message: 'Ocurrio algo inesperado.',  position: 'top-right', closeBtn: true})
        });
      },
      removeUploader(file) {
        const file64 = file.__img.src;
        this.gallery = this.gallery.filter(function(item) {
          return item.file !== file64
        })
      },
      addUploader() {
        this.$refs.uploader.upload()
      },
      filterFiles (files) {
        const MAX_FILE_SIZE = 3 * 1024 * 1024 /* =3M */
        return files.filter((file) => {
          if (file.size > MAX_FILE_SIZE) {
              this.$q.notify({message: 'El archivo debe ser menor o igual a 3M',  position: 'top-right', closeBtn: true})
          }
          return file.size <= MAX_FILE_SIZE
        })
      },
      captureImage () {
        navigator.camera.getPicture(
          data => {
            this.imageSrc = `data:image/jpeg;base64, ${data}`
            //alert(this.imageSrc)

            //
          this.$resourcesInspections.addImagenGallery(`data:image/jpeg;base64,${data}`, this.code)
          .then(response => {
            this.gallery.push(response.data.data.url)
            this.$refs.uploader.reset();
            this.openedUploader = false
            this.visible = false
          })
          .catch(error => {
            this.visible = false
            this.$q.notify({message: 'Ocurrio algo inesperado.',  position: 'top-right', closeBtn: true})
          });
          //



          },
          () => {
            this.$q.notify('No hay posibilidad de acceder a la cámara del dispositivo.')
          },
          {
            quality: 50,
            destinationType: navigator.camera.DestinationType.DATA_URL,
            encodingType: navigator.camera.EncodingType.JPEG,
            MEDIATYPE: navigator.camera.MediaType.PICTURE,
            sourceType: navigator.camera.PictureSourceType.CAMERA,
            mediaType: navigator.camera.MediaType.PICTURE,
            cameraDirection: navigator.camera.Direction.BACK,
            targetWidth: 300,
            targetHeight: 400
          }
        )
      }
    }
  }
</script>
