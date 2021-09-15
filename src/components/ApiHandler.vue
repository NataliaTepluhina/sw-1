<script>
export default {
  render() {
    return this.$slots.default({
      loading: this.loading,
      error: this.error,
      searchResults: this.searchResults,
      runSearch: this.runSearch,
    })
  },
  props: {
    searchTerm: {
      type: String,
      required: true,
    },
    getResults: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      loading: false,
      error: false,
      searchResults: [],
    }
  },
  methods: {
    async runSearch() {
      this.loading = true
      this.error = false
      try {
        this.searchResults = await this.getResults(this.searchTerm)
      } catch {
        this.error = true
        this.searchResults = []
      } finally {
        this.loading = false
      }
    },
  },
  mounted() {
    this.runSearch()
  },
}
</script>
