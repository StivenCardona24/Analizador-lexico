<template>
  <div class="home">
    <nav-head></nav-head>
    <div class="container">
    <lexer-code></lexer-code>
  </div>
  </div>
</template>

<script lang="ts" setup>
import { defineComponent } from 'vue';
import NavHead from '@/components/navHead.vue'; // @ is an alias to /src
import lexerCode from '@/components/lexerCode.vue';

</script>
