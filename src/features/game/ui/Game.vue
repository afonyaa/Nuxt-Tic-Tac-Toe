<script setup lang="ts">
import { GameSign, type Game } from '~/entities/game/domain';
import GameField from './GameField.vue';
import { useEventSource } from '../composables/useEventSource';

const route = useRoute()
const userLogin = useUser()

const gameId = route.params.id

const {data: game, notFound} = useEventSource<Game>(`/api/gameStream/${gameId}`)
watchEffect(() => {
    console.log(game.value,)
})
 
const isFieldDisabled = computed(() => false)

const sign = computed(() => 
    game.value?.creator.login === userLogin.value ? GameSign.Cross : GameSign.Circle
)

const isUserTurn = computed(() => {
    const cells = game.value?.field.flat()
    const filledCellsCount = (cells?.filter(cell => cell) ?? []).length

    return filledCellsCount % 2 === 0 && sign.value === GameSign.Cross
})


// во время хода сделать проверку на выигрыш

// статус
// поле
// экшнс

</script>

<template>
    <div v-if="game">
        <div class="pl-8">
            <div>
                <div>Game status: <b>{{ game?.status }}</b></div>
                <div>You are <b>{{ sign }}</b></div>
            </div>
            <div>
                Players: 
                <div>
                    0 - {{ game?.players[0]?.login }}
                </div>
                <div>
                    x - {{ game?.players[1]?.login }}
                </div>
                <div>
                    <div v-if="isUserTurn">
                        Your turn
                    </div>
                    <div v-else>
                        Wait...
                    </div>
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