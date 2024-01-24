<script setup lang="ts">
import { ref } from 'vue'

const msg = ref('world')
</script>

<template>
  <div>
    <header>
      <slot name="header" />
    </header>
    <main>
      <slot />
    </main>
    <footer>
      <slot name="footer" />
    </footer>
    <div class="scoped">
      <slot name="scoped" v-bind="{ msg }" />
    </div>
  </div>
</template>
