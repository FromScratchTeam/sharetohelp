<template>
  <main>
    <ClientOnly>
      <Header class="header" />
      <NuxtPage />
    </ClientOnly>
  </main>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const route = useRoute()
const { t, locale } = useI18n()

useMeta({
  title: computed(() => `${route.meta?.title && t(route.meta.title)} | Share to Help`),
  meta: [
    {
      name: 'description',
      content: computed(() => t('headDescription')),
    }
  ]
})

const cookieLang = useCookie('lang')


watch(locale, (value) => {
  cookieLang.value = value
})

if (cookieLang.value) {
  locale.value = cookieLang.value
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