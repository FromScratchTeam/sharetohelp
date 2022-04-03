<template>
<div class="container">
  <section>
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

const router = useRouter()
const route = useRoute()
const toast = useToast()
const { t } = useI18n()

const post = ref()

try {
  const { data } = await useAsyncData('mypost', () => $fetch('/api/me[post]', {
      params: {
        post: route.params.post
      }
    })
  )

  post.value = { ...data.value }
} catch {
  console.error(err)
}

const onDelete = async () => {
  const data = JSON.parse(localStorage.getItem('tokenPost'))
  try {
    await $fetch('/api/deletePost', {
      method: 'POST',
      body: {
        token: data.token
      }
    })
    localStorage.removeItem('tokenPost')
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
</style>