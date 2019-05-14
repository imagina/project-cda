<template>
  <div>
  </div>
</template>

<script>
  import Echo from "laravel-echo";
  export default {
    props:{
    },
    data(){
      return {
        echo : null,
      }
    },
    mounted(){
      this.initPush()
    },
    methods:{
      initPush(){
        this.echo = new Echo({
          broadcaster: env('BROADCAST_DRIVER', 'pusher'),
          key: env('PUSHER_APP_KEY'),
          cluster: env('PUSHER_APP_CLUSTER'),
          encrypted: env('PUSHER_APP_ENCRYPTED'),
        });
        this.echo.channel('inspections-list')
        .listen('.inspections', message => {
          this.$emit('newInspection')
        })
      },
    }
  }
</script>
