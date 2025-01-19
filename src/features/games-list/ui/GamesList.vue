<template>
    <div class="text-red-200">
      Game
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
  