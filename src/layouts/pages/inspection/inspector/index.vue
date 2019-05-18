<template>
  <div class="row q-pt-lg">
    <div class="col-md-4 border-left">
      <ordersComponent 
        title="En Espera"
        typeOrder="0"/>
    </div>
    <div class="col-md-4 border-left">
      <ordersComponent 
        title="Revisado"
        typeOrder="1"/>
    </div>
    <div class="col-md-4 border-left">
      <ordersComponent 
        title="Facturado"
        typeOrder="2"/>
    </div>
  </div>
</template>

<script>
  import ordersComponent from 'src/components/inspection/orders'
  export default {
    components:{
      ordersComponent
    }
  }
</script>
<style>
  .border-left{
    border-right: 1px #c4c4c4 solid;
  }
</style>
