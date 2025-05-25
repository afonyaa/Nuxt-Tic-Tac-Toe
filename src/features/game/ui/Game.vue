<script setup lang="ts">
import { type Game } from '~/entities/game/domain';
import GameField from './GameField.vue';
import { useEventSource } from '../composables/useEventSource';

const route = useRoute()

const gameId = route.params.id

const {data: game, notFound} = useEventSource<Game>(`/api/gameStream/${gameId}`)
watchEffect(() => {
    console.log(game.value)
})
 
const isCurrentTurn = false
const isFieldDisabled = computed(() => false)

// статус
// поле
// экшнс

</script>

<template>
    <div v-if="game">
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
    </div>
    <div v-else>
        <div v-if="notFound">
            Game not found
        </div>
    </div>
</template>