<template>
<div>
  <div class="info">
    <p text-default class="project-description" v-html="$t('generalMessage')" />
  </div>
  <div v-if="isEmptyList && !pendingList" header-text v-html="$t('projectAppeared')" class="raw-text"></div>
  <section v-show="!isEmptyList">
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
    <InfiniteLoading :posts="postList" @infinite="loadNewPosts">
      <template #complete><span /></template>
    </InfiniteLoading>
  </section>
  <div header-text v-if="pendingList" class="pending raw-text">
    {{ $t('loading') }}
  </div>
</div>
</template>

<script setup>
import InfiniteLoading from 'v3-infinite-loading'
let page = 1

definePageMeta({
  title: 'pageTitles.home'
})

const postList = ref([[], [], []])
const isEmptyList = computed(() => postList.value[0].length === 0)
const pendingList = ref(true)

const splitToChunks = (array, parts) => {
  let result = [];
  for (let i = parts; i > 0; i--) {
      result.push(array.splice(0, Math.ceil(array.length / i)));
  }
  return result;
}

const mergeList = (data) => {
  return data.reduce((acc, array) => {
    return [
      ...acc,
      ...array
    ]
  }, [])
}

const setPostList = (data) => {
  postList.value = splitToChunks([...mergeList(postList.value), ...data], 3)
}


const loadNewPosts = async (state) => {
  pendingList.value = true
  const perPage = 9

  try {
    const data = await $fetch('/api/postList', {
      params: {
        perPage,
        page
      }
    })

    if (data.length < perPage) state.complete()
    else state.loaded()
    setPostList(data)

    page++;
  } catch (error) {
    state.error()
  } finally {
    pendingList.value = false
  }
}
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
