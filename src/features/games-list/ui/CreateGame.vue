<template>
  <BaseButton @click="handleCreateGameClick">
    Create game
  </BaseButton>
  <div v-if="error" class="text-red-600">
      {{ error }}
  </div>
</template>
<script setup lang="ts">
import { type Game } from 'entities/game/domain';
import { ref } from 'vue';
// TODO автоимпорт
const {$api} = useNuxtApp()
const error = ref('')

async function handleCreateGameClick() {
  error.value = ''
  const res = await $api<{error: string | Game}>('/api/createGame')
  if (res.error) {
    error.value = res.error as string
  }
  await refreshNuxtData('gamesList');
}
 
</script>
    