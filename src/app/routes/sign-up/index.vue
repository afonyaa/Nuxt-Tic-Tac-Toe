<script setup lang="ts">
import SignUpForm from '~/features/auth/ui/SignUpForm.vue';
definePageMeta({
  layout: 'auth'
})
// TODO disable SSR
</script>

<template>
    <SignUpForm />
</template>