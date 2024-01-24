<script setup lang="ts">
import { ref } from 'vue'

const shouldShowDropdown = ref(false)

const props = withDefaults(
  defineProps<{
    admin?: boolean
  }>(),
  {
    admin: false
  }
)
</script>

<template>
  <nav>
    <a id="profile" href="/profile">My Profile</a>
    <a v-if="props.admin" id="admin" href="/admin">Admin</a>
    <ul v-show="shouldShowDropdown" id="user-dropdown">
      <!-- dropdown content -->
    </ul>
  </nav>
</template>
