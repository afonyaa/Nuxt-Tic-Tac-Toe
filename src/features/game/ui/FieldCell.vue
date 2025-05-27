<script setup lang="ts">
import { GameSign, type GameField } from '~/entities/game/domain';

const props = defineProps<{isDisabled: boolean, sign: GameSign | null}>()

const emit = defineEmits<{
  (e: 'click' ): void
}>()

const gameSignToSign: Record<GameSign, 'x' | 'o' | ''> = {
    [GameSign.Circle]: 'o',
    [GameSign.Cross]: 'x',
}

</script>

<template>
    <div
        @click="emit('click')" 
        :class="[
        props.isDisabled ? 'pointer-events-none bg-gray-300' : 'hover:bg-gray-100',
        'cursor-pointer w-full h-full flex items-center justify-center border']" 
        class="transition-colors duration-200">    
            {{ sign ? gameSignToSign[sign]: null }}
    </div>

</template>