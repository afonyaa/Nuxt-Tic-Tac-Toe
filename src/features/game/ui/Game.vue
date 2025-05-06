<script setup lang="ts">
import { GameSign, GameStatus, type Game } from '~/entities/game/domain';
import GameField from './GameField.vue';

const route = useRoute()

const gameId = route.params.id

const { data: game } = await useFetchApi<Game>(
    `/api/game/${gameId}`,
    {
      method: 'GET',
      key: 'game',
    }
)

// вынести в композабл
const gameStreamInfo = ref()
const sse = ref<EventSource>()

onMounted(() => {
    console.log('mounted')
    sse.value = new EventSource(`/api/gameStream/${gameId}`)
    sse.value.onmessage = ((evt: Event) => {
        console.log(evt)
    })
    console.log('event source')
})

onUnmounted(() => {
    sse.value?.close()
})

const isCurrentTurn = false
const isFieldDisabled = computed(() => false)

// статус
// поле
// экшнс

</script>

<template>
    <div class="pl-8">
        <div>
            Game status: {{ game?.status }}
        </div>
        <div>
            Players: 
            <div>
                0 - {{ game?.players[0]?.login }}
            </div>
            <div>
                x - {{ game?.players[1]?.login }}
            </div>
        </div>
    </div>
    <GameField v-if="game" :field="game.field" :disabled="isFieldDisabled"/>
</template>