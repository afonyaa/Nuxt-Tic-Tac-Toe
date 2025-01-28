<template>
  <h1 class="m-2">
    Games:
  </h1>
  <div class="flex gap-x-8 m-2">
    <Card v-for="game of gamesList" :key="game.id" class="w-[350px]">
      <CardHeader>
        <CardTitle> {{ game.id }}</CardTitle>
        <CardDescription>Created at: {{ game.createdAt }}</CardDescription>
        <CardDescription>Creator: {{ game.creator.login }}</CardDescription>
        <CardDescription>Players: 
          <div v-for="player of game.players" :key="player.id">
            {{ player.login }}
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <BaseButton>Join</BaseButton>
      </CardContent>
    </Card>
  </div>
  <div class="m-4">
    <CreateGame />
  </div>
</template>
<script setup lang="ts">
import { GameStatus } from '@prisma/client';
import CreateGame from './CreateGame.vue';

const { data: gamesList } = await useFetch (
    '/api/gamesByStatus',
    {
      key: 'gamesList'
    }  
  
)

</script>
  