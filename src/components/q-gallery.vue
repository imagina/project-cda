<template>
  <div>
    <p class="font-weight-bold q-px-md">Fotografías</p>
    <carousel :perPage="3" :paginationEnabled="false" :navigationEnabled="true" :navigationNextLabel="nextLabel" :navigationPrevLabel="prevLabel">
      <slide v-for="(img, index) in gallery" :key="index">
        <div class="q-px-md">
          <img :src="img.file" style="max-width: 100%">
        </div>
      </slide>
    </carousel>
    <div class="d-block q-mt-md q-mb-lg text-right">
      <q-btn color="primary" size="md" label="Agregar fotografía" class="q-mx-md q-px-xs text-dark" icon="add" @click="openedUploader = true"/>
    </div>
    <q-modal v-model="openedUploader" :content-css="{minWidth: '80vw', padding: '25px'}">
        <h4 class="mx-auto">Añadir imagen</h4>
        <q-uploader :url="url" :auto-expand="true" @remove:cancel="removeUploader" :multiple="true" :filter="filterFiles" class="q-my-lg" extensions=".jpg,.jpeg,.png" ref="uploader" :upload-factory="uploadFile"/>
        <q-btn color="dark" @click="openedUploader = false" label="Cerrar" class="mt-2 q-mr-sm"/>
        <q-btn color="red" @click="addUploader" label="Añadir" class="mt-2 mr-2"/>
      <q-inner-loading :visible="visible">
      </q-inner-loading>
    </q-modal>
  </div>
</template>
<script>
  import { Carousel, Slide } from 'vue-carousel'
  import resources from 'src/services/resources'
  import config from 'src/config/index'

  export default {
    name: 'q-gallery',
    components: { Carousel, Slide },
    props: {
      'gallery':  { required: true },
      'code':     { required: false, default: null }
    },
    data() {
      return {
        nextLabel: "<i class='fa fa-chevron-right' aria-hidden='true'></i>",
        prevLabel: "<i class='fa fa-chevron-left' aria-hidden='true'></i>",
        openedUploader: false,
        url: config('api.api_icda') + '/inspections/media/upload?code=' + this.code,
        visible: false
      }
    },
    methods: {
      uploadFile (file, updateProgress) {
        this.visible = true
        resources.addImagenGallery(file, this.code)
        .then(response => {
            const contentType = file.type
            const fileName = file.name
            const file64 = file.__img.src;
            this.gallery.push({file : file64, fileName: fileName, type: contentType})
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
      }
    }
  }
</script>