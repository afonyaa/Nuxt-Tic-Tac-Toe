<template>
  <div>
    <div class="p-4 flex justify-end items-center gap-6">
      <div>
          {{ userlogin }}
      </div>
      <LogoutButton />
    </div>
  </div>
  <div>
    <slot />
  </div>
</template>

<script lang="ts" setup>
const userlogin = useUser()
import LogoutButton from '~/features/games-list/ui/LogoutButton.vue';

</script>

<style>

</style>