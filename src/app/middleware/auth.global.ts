export default defineNuxtRouteMiddleware(async (to, from) => {
    if (to.path === '/auth' || to.path === '/auth/') {
        return navigateTo('/auth/sign-in')
    }

    const user = useUser();
    if (!user.value) {
        const { data } = await useFetchApi<{ login: string }>('/api/user/')
        if (data.value?.login) {
            user.value = data.value.login
        }
    }
    return;
})
