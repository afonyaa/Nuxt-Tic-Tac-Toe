<script setup lang="ts">
import { GameSign, GameStatus, type Game } from '~/entities/game/domain';
import GameField from './GameField.vue';

const route = useRoute()

const gameId = route.params.id

const { data: gameRaw } = await useFetchApi<Game>(
    `/api/game/${gameId}`,
    {
      method: 'GET',
      key: 'game',
    }
)

onMounted(() => {
    console.log(gameRaw.value)
})

const game: Game = {
    status: GameStatus.InProgress,
    id: '',
    field: [[null, GameSign.Circle, null], [null, null, null], [null, null, null]],
    createdAt: new Date(),
    players: [],
    creator: {
        id: '1',
        login: '',
        rating: 1,
    },
}

const isCurrentTurn = false
const isFieldDisabled = computed(() => false)

// статус
// поле
// экшнс


// вывести статус
// вывести кто X а кто О - (рандомно выбирать)

</script>

<template>
    <div class="pl-8">
        <div>
            Game status: {{ game.status }}
        </div>
        <div>
            Players: 
            <div>
                0 - {{ game.players[0] }}
            </div>
            <div>
                x - {{ game.players[1] }}
            </div>
        </div>
    </div>
    <GameField :field="game.field" :disabled="isFieldDisabled"/>
</template>