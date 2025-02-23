<template>
   <BaseButton @click="handleLogoutClick">Logout</BaseButton>
</template>
<script setup lang="ts">   
const handleLogoutClick = async () => {
    console.log('CLIK')

    const api = useApi()
    const res = await api('/api/logout', {
        method: 'POST',
    })

    if (res) {
        return navigateTo('/auth')
    }
}


</script>
