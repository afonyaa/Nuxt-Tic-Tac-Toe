<template>
    <div class="w-full h-full flex items-center justify-center">
        <div class="w-96">
            <div class="text-lg text-center">{{ props.title }}</div>
            <div class="mt-4">
                <slot name="fields"/>
            </div>
            <div class="mt-6 flex justify-end">
                <slot name="actions"/>
            </div>
            <div class="mt-12">
                <slot name="error"/>
            </div>            
        </div>  
    </div>
</template>
<script setup lang="ts">   
const props = defineProps<{
  title: string
}>()
</script>
