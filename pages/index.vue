<template>
<div>
  <div class="info">
    <p text-default class="project-description" v-html="$t('generalMessage')" />
  </div>
  <div header-text v-if="pendingList" class="pending raw-text">
    {{ $t('loading') }}
  </div>
  <section v-else-if="!isEmptyList">
    <div class="column" :key="columnIndex" v-for="(column, columnIndex) in postList">
      <Card
        class="column-card"
        :key="key"
        :id="item.id"
        :image="item.image"
        :title="item.title"
        :description="item.description"
        :telegramUsername="item.telegramUsername"
        v-for="(item, key) in column"
      />
    </div>
  </section>
  <div header-text v-else v-html="$t('projectAppeared')" class="raw-text"></div>
</div>
</template>

<script setup>
definePageMeta({
  title: 'pageTitles.home'
})

const postList = ref([[], [], []])
const isEmptyList = computed(() => postList.value[0].length === 0)
const pendingList = ref(false)

const splitToChunks = (array, parts) => {
  let result = [];
  for (let i = parts; i > 0; i--) {
      result.push(array.splice(0, Math.ceil(array.length / i)));
  }
  return result;
}

const setPostList = (data) => {
  postList.value = splitToChunks(data, 3)
}

onMounted(async () => {
  pendingList.value = true
  try {
    const data = await $fetch('/api/postList')
    setPostList([...data])
  } catch (error) {
    console.error(error)
  } finally {
    pendingList.value = false
  }
})
</script>

<style lang="scss" scoped>
section {
  --gap: 15px;
  display: grid;
  grid-template-columns: 1fr;

  @include mq($from: desktop) {
    --gap: 50px;
    grid-template-columns: repeat(3, 1fr);
  }

  gap: var(--gap);
  .column {
    display: flex;
    flex-direction: column;
    gap: var(--gap);
    padding: 0 15px;

    @include mq($from: desktop) {
      padding: 0;
    }
  }
}


.info {
  position: relative;
  padding: 20px;
  margin-bottom: 40px;
  box-shadow: var(--box-shadow-1);

  @include mq($from: desktop) {
    padding: 0;
    padding-left: 20px;
    box-shadow: none;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      height: 100%;
      background: var(--color-accent);
      width: 2px;
    }
  }
}

.project-description {
  max-width: 700px;
}

.pending {
  color: var(--color-placeholder);
}

.raw-text {
  margin-left: 10px;

  @include mq($from: tablet) {
    margin-left: 0;
  }
}
</style>
