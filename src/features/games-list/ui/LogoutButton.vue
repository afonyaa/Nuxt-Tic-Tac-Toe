<template>
    <div class="flex gap-4 items-center">
        <BaseButton @click="handleLogoutClick">Logout</BaseButton>
    </div>
</template>
<script setup lang="ts">  
const user = useUser()
const handleLogoutClick = async () => {
    const api = useApi()
    const res = await api('/api/logout', {
        method: 'POST',        
    })

    if (res) {
        user.value = ''
        // TODO посмоотреть network redirects
        
        return navigateTo('/auth')
    }
}


</script>
