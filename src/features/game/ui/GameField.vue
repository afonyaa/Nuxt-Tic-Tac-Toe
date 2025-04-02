<script setup lang="ts">
import { GameSign, type GameField } from '~/entities/game/domain';

const props = defineProps<{field: GameField, disabled: boolean}>()

const emit = defineEmits<{
  (e: 'click', row: number, col: number ): void
}>()

const onCellClick = (row: number, col: number) => {
    emit('click', row, col)
}

const gameSignToSign: Record<GameSign, 'x' | 'o' | ''> = {
    [GameSign.Circle]: 'o',
    [GameSign.Cross]: 'x',
}

</script>

<template>
    <div class="h-screen grid grid-rows-4 grid-cols-1 gap-4">
        <div class="row-span-3 flex min-w-96 items-center justify-center">
            <div class="grid grid-rows-3 min-w-96 h-96 grid-cols-3"> 
                <div @click="onCellClick(0,0)" :class="disabled && 'pointer-events-none bg-gray-300'"  class="cursor-pointer w-full h-full flex items-center justify-center border">{{ props.field[0][0] ? gameSignToSign[props.field[0][0]]: '' }}</div>
                <div @click="onCellClick(0,1)" :class="disabled && 'pointer-events-none bg-gray-300'"  class="cursor-pointer w-full h-full flex items-center justify-center border">{{props.field[0][1] ? gameSignToSign[props.field[0][1]]: '' }}</div>
                <div @click="onCellClick(0,2)" :class="disabled && 'pointer-events-none bg-gray-300'"  class="cursor-pointer w-full h-full flex items-center justify-center border">{{ props.field[0][2] ? gameSignToSign[props.field[0][2]]: ''}}</div>
                <div @click="onCellClick(1,0)" :class="disabled && 'pointer-events-none bg-gray-300'"  class="cursor-pointer w-full h-full flex items-center justify-center border">{{props.field[1][0] ? gameSignToSign[props.field[1][0]]: '' }}</div>
                <div @click="onCellClick(1,1)" :class="disabled && 'pointer-events-none bg-gray-300'"  class="cursor-pointer w-full h-full flex items-center justify-center border">{{ props.field[1][1] ? gameSignToSign[props.field[1][1]]: '' }}</div>
                <div @click="onCellClick(1,2)" :class="disabled && 'pointer-events-none bg-gray-300'"  class="cursor-pointer w-full h-full flex items-center justify-center border">{{ props.field[1][2] ? gameSignToSign[props.field[1][2]]: '' }}</div>
                <div @click="onCellClick(2,0)" :class="disabled && 'pointer-events-none bg-gray-300'"  class="cursor-pointer w-full h-full flex items-center justify-center border">{{ props.field[2][0] ? gameSignToSign[props.field[2][0]]: '' }}</div>
                <div @click="onCellClick(2,1)" :class="disabled && 'pointer-events-none bg-gray-300'"  class="cursor-pointer w-full h-full flex items-center justify-center border">{{ props.field[2][1] ? gameSignToSign[props.field[2][1]]: ''}}</div>
                <div @click="onCellClick(2,2)" :class="disabled && 'pointer-events-none bg-gray-300'"  class="cursor-pointer w-full h-full flex items-center justify-center border">{{ props.field[2][2] ? gameSignToSign[props.field[2][2]]: '' }}</div>
            </div>
        </div>
    </div>
</template>