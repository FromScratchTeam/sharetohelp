<template>
<div class="container">
  <section>
    <div>
      <div text-default class="user-view">
        Telegram <NuxtLink :to="link" target="_blank">@{{ post.telegramUsername }}</NuxtLink>
        <div class="date">{{ createdAt }}</div>
      </div>
      <AboutUser :cardnumber="post.creditcard" :cryptoaddress="post.cryptoaddress" />
    </div>
    <h1 header-text class="title">{{ post.title }}</h1>
    <div text-default v-html="post.story" class="post-content"></div>
  </section>
  <div class="action">
    <button secondary-button @click="onDelete">{{ $t('delete') }}</button>
  </div>
</div>
</template>


<script setup>
import { useI18n } from 'vue-i18n';
import { useToast } from 'vue-toastification'
import dateFormat from "dateformat"
let cookieTokenPost = useCookie('tokenPost')

const router = useRouter()
const route = useRoute()
const toast = useToast()
const { t } = useI18n()

const post = ref()
const createdAt = ref('')

try {
  const { data } = await useAsyncData('mypost', () => $fetch('/api/me[post]', {
      params: {
        post: route.params.post
      }
    })
  )

  post.value = { ...data.value }
  createdAt.value = dateFormat(post.value.createdAt, "dd.mm.yyyy, hh:MM")
} catch {
  console.error(err)
}

const onDelete = async () => {
  try {
    await $fetch('/api/deletePost', {
      method: 'POST',
      body: {
        token: cookieTokenPost.value.token
      }
    })
    cookieTokenPost.value = null
    toast.success(t('postDeleted'))

    router.replace({ name: 'index' })
  } catch (error) {
    console.error(error)
  }
}
</script>

<style lang="scss" scoped>
.container {
  display: grid;
  grid-template-rows: 1fr auto;
}
section {
  padding: 0 15px;

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

.action {
  margin-top: 30px;
  padding-bottom: 110px;

  @include mq($from: tablet) {
    padding-bottom: 0;
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