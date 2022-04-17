<template>
  <main>
    <Header class="header" />
    <NuxtPage />
  </main>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const route = useRoute()
const { t, locale } = useI18n()
const pageTitle = useState('pageTitle')

useMeta({
  title: computed(() => `${route.meta?.title ? t(route.meta.title) : pageTitle.value} | Share to Help`),
  meta: [
    {
      name: 'description',
      content: computed(() => t('headDescription')),
    }
  ]
})

const cookieLang = useCookie('__session')


watch(locale, (value) => {
  cookieLang.value = {
    lang: value
  }
})

if (cookieLang.value?.lang) {
  locale.value = cookieLang.value?.lang
}

</script>

<style lang="scss" scoped>
main {
  max-width: 100%;
  min-height: 100vh;
  margin: 0 auto;
  display: grid;
  grid-template-rows: auto 1fr;
  padding-top: 40px;
  padding-bottom: 30px;
  box-sizing: border-box;

  @include mq($from: tablet) {
    padding-top: 75px;
    max-width: 90%;
  }
}

.header {
  margin-bottom: 30px;
}
</style>