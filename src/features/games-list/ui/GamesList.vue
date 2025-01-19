<template>
  <h1 class="m-2">
    Games:
  </h1>
  <div class="flex gap-x-8 m-2">
    <Card v-for="game of gamesList" :key="game.id" class="w-[350px]">
      <CardHeader>
        <CardTitle> {{ game.id }}</CardTitle>
        <CardDescription>Created at: {{ game.createdAt }}</CardDescription>
      </CardHeader>
      <CardContent>
        <BaseButton>Join</BaseButton>
      </CardContent>
    </Card>
  </div>
</template>
<script setup lang="ts">
import { getGamesByStatus } from '~/entities/game';
import { GameStatus } from '~/entities/game/domain';

const { data: gamesList, error } = await useAsyncData (
    'idleGames', 
    () => getGamesByStatus(GameStatus.Pending),
)


</script>
  