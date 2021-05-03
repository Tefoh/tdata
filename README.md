# tdata

Fetch your data, send your form easily. for vue 3.

## install plugin

```bash
npm i tdata
```

or

```bash
yarn add tdata
```

## Usage

you can register TFetch and TForm components globally or locally.

### globally

main.js:

```js
import TData from "tdata";

const app = createApp(App);

app.use(TData, options);

app.mount("#app");
```

### locally

any component (e.x. App.vue):

```js
<script>
import { TFetch } from "tdata";
import { TForm } from "tdata";
export default {
  components: {
    TFetch: TFetch(options),
    TForm: TForm(options),
  },
  // for sending form
  data: () => ({
    form: {
      title: "",
      body: "",
    },
  }),
};
</script>
```

after register components you can use it in template like this:

```html
<template>
  <TForm
    url="https://jsonplaceholder.typicode.com/posts"
    :form="form"
    v-slot="{ json, loading }"
  >
    <input type="text" v-model="form.body" />
    <input type="text" v-model="form.title" />
    <button type="submit" :disabled="loading">submit</button>
  </TForm>

  <TFetch
    url="https://jsonplaceholder.typicode.com/posts"
    v-slot="{ json: posts, loading }"
    :options="{ params: { _limit: 5 } }"
  >
    <template v-if="loading"> loading... </template>
    <template v-else>
      <ul>
        <li v-for="post in posts" :key="post.id">{{ post.title }}</li>
      </ul>
    </template>
  </TFetch>
</template>
```

thats it, easy peasy. but you can customize it more like baseURL or event pass axios instance.

## options

you can set baseURL or even axios instance to not set headeres or baseURL every time.
heres how.

### globally

```js
import TData from "tdata";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  headers: {
    Authorization: "Bearer token:)",
  },
});

const app = createApp(App);

app.use(TData, { axios: axiosInstance });

app.mount("#app");
```

now for every request it will set header and baseURL.

### locally

```js
<script>
import { TFetch } from "tdata";
export default {
  components: {
    TFetch: TFetch({ baseURL: "https://jsonplaceholder.typicode.com" }),
  },
};
</script>
```

and this will only set baseURL for every request.
<br />
and the usage in template will be like this:

```html
<TForm url="/posts" :form="form" v-slot="{ loading }">
  <input type="text" v-model="form.body" />
  <input type="text" v-model="form.title" />
  <button type="submit" :disabled="loading">submit</button>
</TForm>
<TFetch
  url="/posts"
  v-slot="{ json: posts, loading }"
  :options="{ params: { _limit: 5 } }"
>
  <template v-if="loading"> loading... </template>
  <template v-else>
    <ul>
      <li v-for="post in posts" :key="post.id">{{ post.title }}</li>
    </ul>
  </template>
</TFetch>
```

## slots

| slot         | type         | descriptions                           |
| ------------ | ------------ | -------------------------------------- |
| json         | array object | json response when request resolved    |
| loading      | boolean      | check response has been recived or not |
| response     | object       | entire response from api               |
| error        | object       | error response                         |
| errorMessage | string       | error message                          |
