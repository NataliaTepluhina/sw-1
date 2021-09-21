import { ref } from 'vue'

export const useSearch = (getResults) => {
  const searchTerm = ref('')
  const searchResults = ref([])
  const loading = ref(false)
  const error = ref(false)

  async function fetchResults() {
    loading.value = true
    error.value = false
    try {
      searchResults.value = await getResults(searchTerm.value)
    } catch {
      error.value = true
      searchResults.value = []
    } finally {
      loading.value = false
    }
  }

  return {
    searchTerm,
    searchResults,
    loading,
    error,
    fetchResults,
  }
}
