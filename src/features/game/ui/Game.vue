<script setup lang="ts">
import { GameSign, GameStatus, type Game } from '~/entities/game/domain';
import GameField from './GameField.vue';
import { useEventSource } from '../composables/useEventSource';

const route = useRoute()
const api = useApi()
const userLogin = useUser()

const gameId = route.params.id

const {
    data: game,
    notFound
} = useEventSource<Game>(`/api/gameStream/${gameId}`)

const isWin = computed(() => {
    return game.value?.status === GameStatus.Finished ?
        game.value.winner.login  === userLogin.value ? true : false : null
})

watchEffect(() => {
    console.log(isWin.value)
}) 

const sign = computed(() => 
    game.value?.creator.login === userLogin.value ? GameSign.Cross : GameSign.Circle
)

const isUserTurn = computed(() => {
    const cells = game.value?.field.flat()
    const filledCellsCount = (cells?.filter(cell => cell) ?? []).length
    return (filledCellsCount % 2 === 0 && sign.value === GameSign.Cross) 
        || (filledCellsCount % 2 !== 0 && sign.value === GameSign.Circle)
})

const isFieldDisabled = computed(() => 
    !isUserTurn.value || game?.value?.status !== GameStatus.InProgress
)

// блокировать нажатие на то что уже сходили
const handleTurn = (x:number, y:number) => {
    if (game.value?.field) {
        const fieldUpdated = game.value.field.map(row => [...row]);
        fieldUpdated[x][y] = sign.value
        api(`/api/game/updateField/${gameId}`, {
            method: 'POST',
            body: {
                field: fieldUpdated
            }
        })
    }
}


</script>

<template>
    <div v-if="game">
        <div class="pl-8">
            <div>
                <div>Game status: <b>{{ game?.status }}</b></div>
                <div>You are <b>{{ sign }}</b></div>
                {{ game?.status !== GameStatus.InProgress }}
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
                    <div v-else-if="game.status !== GameStatus.Finished">
                        Wait...
                    </div>
                </div>
                <div>
                    <div v-if="isWin" class="text-green-500 text-xl">You win</div>
                    <div v-else-if="isWin === false" class="text-red-500 text-xl">You lose</div>
                </div>
            </div>
        </div>
        <GameField 
            v-if="game"
            :field="game.field"
            :disabled="isFieldDisabled" 
            @click="handleTurn"
        />
    </div>
    <div v-else>
        <div v-if="notFound">
            Game not found
        </div>
    </div>
</template>