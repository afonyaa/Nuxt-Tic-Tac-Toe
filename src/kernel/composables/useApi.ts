import type { UseFetchOptions } from "#app"


// TODO здесь можно протипизировать ошибку, но надо разобраться как это будет работать с throwError накста

export default <T>(url: string | (() => string), options?: UseFetchOptions<T>) => {
  // TODO посмотреть, возможен ли автоимпорт $fetch в компонентах
  return useFetch(url, { ...options, $fetch: useNuxtApp().$api })
}
