<template>
    <div class="card large">
        <div class="card-image">
        </div>
        <div class="card-content">
        <div class="media">
            <div class="media-content">
            <p class="title is-4 no-padding">{{ book.title }} ({{ book.publication_year }})</p>
            <p>
                <span class="title is-6">
                <a v-for="(author, index) in book.authors" :key="index" href='#'> {{ author }}{{ index === book.authors.length - 1 ? '' : ',' }} </a>
                </span>
            </p>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "Card",
  props: [
      'book',
  ]
};
</script>
