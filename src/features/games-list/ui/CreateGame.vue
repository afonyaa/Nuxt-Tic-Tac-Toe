<template>
  <BaseButton @click="handleCreateGameClick">
    Create game
  </BaseButton>
</template>
<script setup lang="ts">
async function handleCreateGameClick() {
  await fetch('/api/createGame')
  await refreshNuxtData('gamesList');
}
 
</script>
    