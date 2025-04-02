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
          <span v-for="player of game.players" :key="player.id">
            {{ player.login }}
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <BaseButton @click="goToGame(game.id)">Join</BaseButton>
      </CardContent>
    </Card>
  </div>
  <div class="m-4">
    <CreateGame />
  </div>
</template>
<script setup lang="ts">
import { GameStatus, type Game } from '~/entities/game/domain';
import CreateGame from './CreateGame.vue';

/**
 * TODO
 * Проблемы:
 * Мы ходим по кругу, навороты с сервисами
 * доменами нужны были для того чтобы абстрагировать (или нет) компонент 
 * от вызова запроса напрямую (или это разные проблемы)
 * Но вернулись к нему
 *  */ 
// TODO добавить монаду either
// функиональная обработка ошибок

const { data: gamesList } = await useFetchApi<Game[]>(
    `/api/gamesByStatus/${GameStatus.Pending}`,
    {
      method: 'GET',
      key: 'gamesList',
    }
)
const {$api} = useNuxtApp()


const goToGame = async (gameId: string) => {
  const res = await $api<{error: string | Game}>(`/api/game/join/${gameId}`)
  
  if (res) {
    navigateTo({
      path: `/game/${gameId}`,
    })
  }
}

</script>
  