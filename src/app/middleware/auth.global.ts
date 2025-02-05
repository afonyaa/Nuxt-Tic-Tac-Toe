export default defineNuxtRouteMiddleware((to, from) => {
    console.log(to)
    if (to.path === '/auth' || to.path === '/auth/') {
        return navigateTo('/auth/sign-in')
    }
    return;
})
