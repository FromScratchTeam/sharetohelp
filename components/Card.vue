<template>
  <div class="card" @click.prevent="onClick">
    <div v-if="image">
      <img :src="image" />
    </div>
    <div gap-s>
      <div class="container">
        <div class="text-info">
          <div text-default>{{ title }}</div>
          <div class="description">{{ description }}</div>
          <NuxtLink :to="link" target="_blank" @click.stop>@{{ telegramUsername }}</NuxtLink>
        </div>
      </div>
      <NuxtLink :to="{ name: 'story-id', params: { id } }" primary-button>{{ $t('readMore') }}</NuxtLink>
    </div>
  </div>
</template>

<script setup>
let cookieTokenPost = useCookie('tokenPost')

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  image: {
    type: [String, null],
    default: null
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  telegramUsername: {
    type: String,
    required: true
  }
})

const link = computed(() => `https://t.me/${props.telegramUsername}`)
const router = useRouter()

const onClick = () => {
  const { token, id } = cookieTokenPost.value || {}

  if (token && id === props.id) {
    router.push({ name: 'me-post', params: { post: token } })
  } else {
    router.push({ name: 'story-id', params: { id: props.id } })
  }
}

</script>


<style lang="scss" scoped>
.card {
  background: var(--color-surface);
  box-shadow: var(--box-shadow-1);
  border-radius: 10px;
  padding: 0;
  box-sizing: border-box;
  display: grid;
  grid-template-rows: 1fr;
  padding: 12px 10px;
  gap: 10px;
  cursor: pointer;

  @include mq($from: desktop) {
    border-radius: 20px;
    box-shadow: var(--box-shadow-1);
  }
}

.container {
  display: grid;
  gap: 10px;
  grid-auto-rows: 1fr auto;
}

.text-info {
  display: grid;
  gap: 10px;
}

.description {
  display: -webkit-box;
  -webkit-line-clamp: 12;
  -webkit-box-orient: vertical;  
  overflow: hidden;
}

img {
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: var(--border-radius-2) var(--border-radius-2) 0 0;

  @include mq($from: desktop) {
    height: 100%;
  }
}
</style>
