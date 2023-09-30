<template>
    <select ref="selectElement">
      <!-- Options will be dynamically populated -->
    </select>
  </template>
  
  <script>
  export default {
    name: 'Select2Component',
    mounted() {
      $(this.$refs.selectElement).select2();
    },
    beforeDestroy() {
      // Ensure to destroy the Select2 instance to avoid memory leaks
      $(this.$refs.selectElement).select2('destroy');
    },
  };
  </script>
  
  <style>
  /* You can add custom styling here if needed */
  </style>
  