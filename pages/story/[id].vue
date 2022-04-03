<template>
<section>
  <div>
    <div text-default class="user-view">
      Telegram <NuxtLink :to="link" target="_blank">@{{ post.telegramUsername }}</NuxtLink>
      <div class="date">{{ createdAt }}</div>
    </div>
    <AboutUser :cardnumber="post.creditcard" :cryptoaddress="cryptoaddress" />
  </div>
  <h1 header-text class="title">{{ post.title }}</h1>
  <div text-default v-html="post.story" class="post-content"></div>
</section>
</template>


<script setup>
import * as maska from 'maska'
import dateFormat from "dateformat"

const route = useRoute()

const post = ref({})
const creditCardView = ref('')
const link = computed(() => `https://t.me/${post.value?.telegramUsername}`)
const createdAt = ref('')
const cryptoaddress = ref({})
const activeIndex = ref(0)

try {
  const { data } = await useAsyncData('mypost', () => $fetch('/api/postById', {
      params: {
        id: route.params.id
      }
    })
  )

  post.value = { ...data.value }
  if (post.value.creditcard) {
    creditCardView.value = maska.mask(post.value.creditcard, '#### #### #### ####')
    activeIndex.value = 0
  } else if (cryptoaddress.value) {
    activeIndex.value = 1
  }

  createdAt.value = dateFormat(post.value.createdAt, "dd.mm.yyyy, hh:MM")
  cryptoaddress.value = post.value.cryptoaddress
} catch(error) {
  console.error(error)
}
</script>

<style lang="scss" scoped>
section {
  padding: 0 10px;

  @include mq($from: tablet) {
    padding: 0;
  }
}
.post-content {
  position: relative;
  margin-top: 20px;

  ::v-deep(img) {
    margin-left: -15px;
    margin-right: -15px;
    width: calc(100% + 30px);
    max-width: calc(100% + 30px);

    @include mq($from: tablet) {
      width: auto;
      margin: 0;
      max-width: 100%;
    }
  }

  @include mq($from: tablet) {
    margin-top: 40px;
  }
}

.user-view {
  margin-bottom: 20px;
}

.date {
  margin-top: 5px;
  color: var(--color-placeholder);
  font-size: 16px;

  @include mq($from: tablet) {
    margin-top: 10px;
    font-size: 18px;
  }
}
</style>
