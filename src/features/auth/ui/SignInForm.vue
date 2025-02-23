<template>
    <BaseLayout title="Sign In">
        <template v-slot:fields>
            <div class="relative w-full max-w-sm items-center">
                <Input v-model="login" autocomplete="one-time-code" id="login" type="text" placeholder="login" class="pl-10" />
                <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
                <PersonIcon class="size-6 text-muted-foreground" />
                </span>
            </div>
            <div class="mt-4 relative w-full max-w-sm items-center">
                <Input v-model="password" autocomplete="one-time-code" id="password" type="password" placeholder="password" class="pl-10" />
                <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
                <LockClosedIcon class="size-6 text-muted-foreground" />
                </span>
            </div>
        </template>
        <template v-slot:actions>
            <BaseButton @click="handleSignInClick">
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
import { useAuthFields } from '../model/useAuthFields'

const {login, password} = useAuthFields()

const handleSignInClick = async () => {
    const api = useApi()
    const res = await api('/api/signIn', {
        method: 'POST',
        body: {login: login.value, password: password.value}
    })

    if (res) {
        return navigateTo('/')
    }
}


</script>
