<template>
    <BaseLayout title="Sign In">
        <template v-slot:fields>
            <div class="relative w-full max-w-sm items-center">
                <Input v-model="login" id="login" type="text" placeholder="login" class="pl-10" />
                <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
                <PersonIcon class="size-6 text-muted-foreground" />
                </span>
            </div>
            <div class="mt-4 relative w-full max-w-sm items-center">
                <Input v-model="password" id="password" type="password" placeholder="password" class="pl-10" />
                <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
                <LockClosedIcon class="size-6 text-muted-foreground" />
                </span>
            </div>
        </template>
        <template v-slot:actions>
            <BaseButton>
                Sign in
            </BaseButton>
            <NuxtLink to="sign-up">Or go to Sign up</NuxtLink>
        </template>     
        <template v-slot:error>
            <div v-if="false" class="text-red-500">
                Error to sign in! 
            </div>
        </template>
    </BaseLayout>
</template>
<script setup lang="ts">   
import BaseLayout from './BaseLayout.vue'
import { PersonIcon } from '@radix-icons/vue'
import { LockClosedIcon } from '@radix-icons/vue'

// TODO видео про useState
//TODO composable
const password = ref<string>('')
const login = ref<string>('')

</script>
