<template>
    <!-- TODO check shadcn styles -->
    <div class="v-full h-screen flex items-center justify-center">
        <div class="w-96">
            <div class="relative w-full max-w-sm items-center">
                <Input id="login" type="text" placeholder="login" class="pl-10" />
                <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
                <PersonIcon class="size-6 text-muted-foreground" />
                </span>
            </div>
            <div class="mt-4 relative w-full max-w-sm items-center">
                <Input id="password" type="password" placeholder="password" class="pl-10" />
                <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
                <LockClosedIcon class="size-6 text-muted-foreground" />
                </span>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">   
import { PersonIcon } from '@radix-icons/vue'
import { LockClosedIcon } from '@radix-icons/vue'
</script>
