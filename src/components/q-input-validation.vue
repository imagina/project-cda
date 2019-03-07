<template>
  <div>
{{ value }}

      <q-input v-model="value" />


  </div>
</template>
<script>
  export default {
    name: 'q-input-validation',
    props: {
      'value':       { required: true }
    }
  }
</script>