<template>
<section>
  <component
    :is="currentCmp"
    v-model:storyTitle="storyTitle"
    v-model:storyContent="storyContent"
    v-model:username="telegramUsername"
    v-model:cardnumber="cardnumber"
    v-model:cryptoaddress="cryptoaddress"
  />
  <div class="action">
    <button primary-button @click="onContinue" :disabled="publishing">
    {{
      publishing ? $t('publishing') :
        isLastStep ? $t('publish') : $t('next')
    }}
    </button>
  </div>
</section>
</template>

<script setup>
import Editor from '@/components/Editor.vue'
import TelegramUsername from '@/components/TelegramUsername.vue'
import Gethelp from '@/components/Gethelp.vue'
import { useToast } from 'vue-toastification'
import { useI18n } from 'vue-i18n'

const step = ref(0)
const cookieTokenPost = useCookie('tokenPost')
const cmpList = [Editor, TelegramUsername, Gethelp]
const currentCmp = computed(() => cmpList[step.value])
const telegramUsername = ref('')
const storyTitle = ref('')
const storyContent = ref('')
const cardnumber = ref('')
const cryptoaddress = ref({
  network: null,
  address: null,
})

const toast = useToast()
const router = useRouter()
const { t } = useI18n()
const publishing = ref(false)

const isEmptyStory = computed(() => storyTitle.value.length === 0 || storyContent.value.length === 0)

const isLastStep = computed(() => cmpList.length - 1 === step.value)

const isEmptyCryptoaddress =
  computed(() => !cryptoaddress.value.network || !cryptoaddress.value.address)


const submitPost = async () => {
  publishing.value = true
  try {
    const { data } = await $fetch('/api/createPost', {
      method: 'POST',
      body: {
        title: storyTitle.value,
        story: storyContent.value,
        telegramUsername: telegramUsername.value.replace(/^@/, ''),
        creditcard: cardnumber.value ? cardnumber.value.replace(/\s/g, '') : null,
        cryptoaddress: cryptoaddress.value
      }
    })

    cookieTokenPost.value = {
      id: data.id,
      token: data.token
    }

    toast.success(t('storyPublished'))
    router.replace({ name: 'me-post', params: { post: data.token } })
    publishing.value = false
  } catch ({ response }) {
    toast.error(t(response.data))
  }
}

const validationCard = (value) => {
  const formattedValue = value.replace(/\s/g, '')
  if (!formattedValue) return true

  if (formattedValue.length !== 16) {
    toast.error(t('invalidCardNumber'))
    return false
  }

  return true
}

const validationTelegramUsername = (value) => {
  const formatted = value.replace(/^@/, '')

  if (formatted.length < 5) return false

  const lastSymbol = formatted[formatted.length - 1];

  if (lastSymbol === '_') return false

  return /^[a-z0-9_]*$/i.test(formatted)
}

const validationCryptoAddress = ({ network, address }) => {
  if (!network && !address) {
    return true
  }

  if (!network) {
    toast.error(t('selectNetwork'))
    return false
  }

  if (!address) {
    toast.error(t('insertCryptoWalletAddress'))
    return false
  }

  return true
}

const atLeastFilledOneOfMethods = computed(() => !isEmptyCryptoaddress.value || !!cardnumber.value)


const onContinue = async () => {
  switch (step.value) {
    case 0:
      if (isEmptyStory.value) {
        return toast.error(t('fillPage'))
      }

      step.value = 1
      break;
    case 1:
      if (!telegramUsername.value) {
        return toast.error(t('enterTelegramUsername'))
      }

      if (!validationTelegramUsername(telegramUsername.value)) {
        return toast.error(t('telegramUsernameIsInvalid'))
      }

      step.value = 2
      break;
    case 2:
      if (!validationCard(cardnumber.value)) {
        return
      }

      if (!validationCryptoAddress(cryptoaddress.value)) {
        return
      }

      if (!atLeastFilledOneOfMethods.value) {
        toast.error(t('enterCryptoOrCardnumber'))
        return
      }

      submitPost()
      break;
  }
}
</script>


<style lang="scss" scoped>
section {
  display: grid;
  grid-template-rows: 1fr auto;
  padding: 0 10px;

  @include mq($from: tablet) {
    padding: 0;
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