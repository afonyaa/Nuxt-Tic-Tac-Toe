export default defineNuxtRouteMiddleware((to, from) => {
    if (to.path === '/auth' || to.path === '/auth/') {
        return navigateTo('/auth/sign-in')
    }
    return;
})
