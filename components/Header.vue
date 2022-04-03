<template>
  <div class="header-container">
    <header>
      <ul>
        <li><NuxtLink :to="{name: 'index'}">{{ $t('whoNeedsHelp') }}</NuxtLink></li>
        <li><NuxtLink :to="{name: 'aboutus'}">{{ $t('aboutUs') }}</NuxtLink></li>
        <li><NuxtLink :to="{name: 'helpme'}" class="dotoff"><button primary-button @click.prevent="onClick">{{ $t(textButton) }}</button></NuxtLink></li>
      </ul>
    </header>
    <div class="choose-language">
      <select @change="onChangeLanguage" :value="locale">
        <option
          :selected="locale === item.value"
          :value="item.value"
          :key="item.value"
          v-for="item in list"
        >
          {{ item.label }}
        </option>
      </select>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { locale } = useI18n({ useScope: 'global' })
const router = useRouter()
const textButton = ref('iNeedHelp')

const list = [
  {
    label: 'Український',
    value: 'ua'
  },
  {
    label: 'English',
    value: 'en'
  },
  {
    label: 'Русский',
    value: 'ru'
  }
]

const onChangeLanguage = ({ target: { value }}) => {
  locale.value = value
}

onMounted(() => {
  try {
    const data = JSON.parse(localStorage.getItem('tokenPost'))
    const token = data.token

    if (token) {
      textButton.value = 'myStory'
    }
  } catch {}
})

const onClick = () => {
  let token = null

  try {
    const data = JSON.parse(localStorage.getItem('tokenPost'))
    token = data.token
  } catch {}

  if (token) {
    router.push({ name: 'me-post', params: { post: token } })
  } else {
    router.push({ name: 'helpme' })
  }
}
</script>

<style lang="scss" scoped>
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: column-reverse;
  max-width: 100vw;

  @include mq($from: tablet) {
    flex-direction: row;
    align-items: center;
  }
}
header {
  max-width: 100%;
  box-sizing: border-box;
  overflow: auto;
  padding: 0 20px 10px;
  margin-top: 20px;

  @include mq($from: tablet) {
    padding: 0;
    margin-top: 0;
  }
}

ul {
  list-style-type: none;
  display: grid;
  align-items: center;
  gap: 20px;
  grid-auto-flow: column;
  grid-auto-columns: max-content;
}

li:last-child {
  padding-right: 20px;

  @include mq($from: tablet) {
    padding-right: 0;
  }
}

a {
  color: var(--color-primary);
  text-decoration: none;
  position: relative;
}


.router-link-active:not(.dotoff):before {
  content: '';
  left: 0;
  position: absolute;
  background: var(--color-accent);
  width: 20px;
  height: 5px;
  border-radius: 2.5px;
  top: 100%;
  margin: auto;
  margin-top: 5px;
}

.choose-language {
  margin-left: 20px;
}
</style>
