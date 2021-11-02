<template>
  <div id="app">
    <div class="container">
      <div class="section">
        <div class="columns">
          <div class="column">
            <div class="field">
              <div class="control">
                <label class="label">Search Query</label>
                <input class="input" type="text" placeholder="Search..." v-model="query" @keyup="search">
              </div>
            </div>
            <div class="field">
              <div class="select mr-2">
                <select v-model="query_by" @change="search">
                  <option value="" selected disabled>Query By</option>
                  <option value="title">Title</option>
                  <option value="authors">Authors</option>
                </select>
              </div>
              <div class="select ml-2">
                <select v-model="sort_by" @change="search">
                  <option value="" selected disabled>Sort By</option>
                  <option value="publication_year:desc">Year Descending</option>
                  <option value="publication_year:asc">Year Ascending</option>
                  <option value="average_rating:desc">Average Rating Descending</option>
                  <option value="average_rating:asc">Average Rating Ascending</option>
                </select>
              </div>
              <div class="select ml-2">
                <select v-model="per_page" @change="search">
                  <option value="" selected disabled>Items Per Page</option>
                  <option value="10">10</option>
                  <option value="15">15</option>
                  <option value="20">20</option>
                  <option value="25">25</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div v-if="books.length > 0" class="row columns is-multiline">
          <div v-for="book in books" :key="book.document.id" class="column is-4">
            <card :book="book.document" />
          </div>
        </div>
        <div v-else class="notification is-primary">
          found nothing
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import client from './typesense';
import Card from './components/Card.vue';

export default {
  name: 'App',
  components: {
    Card
  },
  data() {
    return {
      query: '',
      query_by: 'title',
      sort_by: '',
      per_page: '10',
      books: [],
    };
  },
  async mounted() {
    await this.search();
  },
  methods: {
    search: async function() {
      const searchParams = {
        q: this.query.trim() || '*',
        query_by: this.query_by || 'title',
        sort_by: this.sort_by,
        per_page: this.per_page,
      };

      const searchResults = await client.collections('books').documents().search(searchParams);
      this.books = searchResults.hits;
      console.log(searchResults);
    },
  },
}
</script>
