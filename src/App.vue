<template>
  <TForm url="/posts" :form="form" v-slot="{ json, loading }">
    <template v-if="loading"> loading... </template>
    <template v-else>
      <input type="text" v-model="form.body" />
      <input type="text" v-model="form.title" />
      <button type="submit">save</button>
    </template>
    {{ json }}
  </TForm>
  <TFetch
    url="/posts"
    v-slot="{ json: posts, loading }"
    :options="{ params: { _limit: 5 } }"
  >
    <template v-if="loading"> loading... </template>
    <template v-else>
      <ul>
        <li v-for="post in posts" :key="post.id">
          {{ post.title }}
        </li>
      </ul>
    </template>
  </TFetch>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    form: {
      title: "",
      body: "",
    },
  }),
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
