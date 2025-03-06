export default defineNuxtPlugin(nuxtApp => {
    const api = $fetch.create({
        async onRequest({ options }) {
            const headers = useRequestHeaders();
            options.headers = {
                ...headers,
                ...options.headers,
            };
        },
        async onResponse({ response }) {
            if (response.status === 403) {
                // TODO что такое runWithContext
                await nuxtApp.runWithContext(() => navigateTo('/auth'))
            }
        },
    })

    return {
        name: 'handle unauthorized',
        provide: {
            api
        }
    }
})