<template>
    <div class="card large">
        <div class="card-image">
        <figure class="image is-16by9">
            <img class="cover-image" :src="book.image_url" alt="Image">
        </figure>
        </div>
        <div class="card-content">
        <div class="media">
            <div class="media-content">
            <p class="title is-4 no-padding">{{ book.title }}</p>
            <p>
                <span class="title is-6">
                <a v-for="(author, index) in book.authors" :key="index" href='#'> {{ author }}, </a>
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

<style scoped>
    .cover-image {
        object-fit: contain;
    }
</style>
