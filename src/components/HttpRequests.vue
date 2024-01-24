<script setup lang="ts">
import axios from 'axios'

import { ref } from 'vue'

interface Post {
  id: number
  title: string
  body: string
  userId: number
  tags: string[]
  reactions: number
}

interface PostsResponse {
  limit: number
  posts: Post[]
  skip: number
  total: number
}

const posts = ref<Post[]>([])
const loading = ref(false)

const getPosts = async () => {
  loading.value = true
  posts.value = (await axios.get<PostsResponse>('https://dummyjson.com/posts')).data.posts
  loading.value = false
}
</script>

<template>
  <button :disabled="loading" @click="getPosts">Get posts</button>
  <p v-if="loading" role="alert">Loading your posts…</p>
  <ul>
    <li v-for="post in posts" :key="post.id" data-test="post">
      {{ post.title }}
    </li>
  </ul>
</template>
