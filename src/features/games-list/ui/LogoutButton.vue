<template>
    <div class="flex">
        <div>
            
        </div>
        <BaseButton @click="handleLogoutClick">Logout</BaseButton>
    </div>
</template>
<script setup lang="ts">  
const handleLogoutClick = async () => {
    console.log('CLIK')

    const api = useApi()
    const res = await api('/api/logout', {
        method: 'POST',
    })

    if (res) {
        // TODO посмоотреть network redirects
        return navigateTo('/auth')
    }
}


</script>
