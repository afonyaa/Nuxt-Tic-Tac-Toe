export default defineNuxtPlugin(nuxtApp => {
    const api = $fetch.create({
        async onRequest({ options }) {
            const headers = useRequestHeaders();
            // TODO можно ли как то обойтись без этого    
            options.headers = {
                ...headers,
                ...options.headers,
            };
            // TODO выяснить, почему не работает это:
            // Object.assign(options.headers, headers)
        },
        async onResponse({ response }) {
            console.log(response.status)
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