<template>
  <div id="app">
    <div class="container">
      <div class="section">
        <div class="columns">
          <div class="column">
            <div class="field">
              <div class="control">
                <label class="label">Search Query</label>
                <input class="input" type="text" placeholder="Search..." v-model="searchParams.q" @keyup="search">
              </div>
            </div>
            <div class="field">
              <div class="select mr-2">
                <select v-model="searchParams.query_by">
                  <option>Sort By</option>
                  <option value="publication_year">Year</option>
                  <option value="title">Title</option>
                  <option value="average_rating">Rating</option>
                </select>
              </div>
              <div class="select ml-2">
                <select v-model="searchParams.sort_by">
                  <option>Query By</option>
                  <option value="publication_year:desc">Year Descending</option>
                  <option value="publication_year:asc">Year Ascending</option>
                  <option value="title:desc">Title Descending</option>
                  <option value="title:asc">Title Ascending</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div v-if="searchResults.hits.length > 0" class="row columns is-multiline">
          <div v-for="hit in searchResults.hits" :key="hit.document.id" class="column is-4">
            <card :book="hit.document" />
          </div>
        </div>
        <div v-else class="notification is-primary">
          Write your search query in the box above to see Typesens in action...
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
      searchParams: {
        q: '',
        query_by: 'title',
        facet_by  : 'authors',
        sort_by: 'publication_year:desc',
      },
      searchResults: {
        hits: [],
      },
    }
  },
  methods: {
    search() {
      const instance = this;
      client.collections('books')
        .documents()
        .search(instance.searchParams)
        .then(function (searchResults) {
          instance.searchResults = searchResults;
          console.log(searchResults);
        })
    }
  }
}
</script>
