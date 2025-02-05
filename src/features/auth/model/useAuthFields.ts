export const useAuthFields = () => {
    const password = ref<string>('')
    const login = ref<string>('')

    return { password, login }
}