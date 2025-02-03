<script setup lang="ts">
import SignInForm from '~/features/auth/ui/SignInForm.vue';
definePageMeta({
  layout: 'auth'
})

// TODO disable SSR
</script>

<template>
    <SignInForm />
</template>