<script setup lang="ts">
import { GameSign, type GameField } from '~/entities/game/domain';
import FieldCell from './FieldCell.vue';

const props = defineProps<{field: GameField, disabled: boolean}>()

const emit = defineEmits<{
  (e: 'click', row: number, col: number ): void
}>()

const onCellClick = (row: number, col: number) => {
    emit('click', row, col)
}


</script>

<template>
    <div class="h-screen grid grid-rows-4 grid-cols-1 gap-4">
        <div class="row-span-3 flex min-w-96 items-center justify-center">
            <div class="grid grid-rows-3 min-w-96 h-96 grid-cols-3"> 
                <FieldCell :isDisabled="props.disabled" @click="onCellClick(0,0)" :sign="props.field[0][0]"/>
                <FieldCell :isDisabled="props.disabled" @click="onCellClick(0,1)" :sign="props.field[0][1]"/>
                <FieldCell :isDisabled="props.disabled" @click="onCellClick(0,2)" :sign="props.field[0][2]"/>
                <FieldCell :isDisabled="props.disabled" @click="onCellClick(1,0)" :sign="props.field[1][0]"/>
                <FieldCell :isDisabled="props.disabled" @click="onCellClick(1,1)" :sign="props.field[1][1]"/>
                <FieldCell :isDisabled="props.disabled" @click="onCellClick(1,2)" :sign="props.field[1][2]"/>
                <FieldCell :isDisabled="props.disabled" @click="onCellClick(2,0)" :sign="props.field[2][0]"/>
                <FieldCell :isDisabled="props.disabled" @click="onCellClick(2,1)" :sign="props.field[2][1]"/>
                <FieldCell :isDisabled="props.disabled" @click="onCellClick(2,2)" :sign="props.field[2][2]"/>
            </div>
        </div>
    </div>
</template>