<template>
  <div class="tab-menu">
    <button
      :key="index"
      @click="onClick(index)"
      v-for="(item, index) in list" :class="{active: activeIndex === index}"
    >
      {{ $t(item.label) }}
    </button>
  </div>
</template>

<script setup>
defineProps({
  list: {
    type: Array,
    required: true
  },
  activeIndex: {
    type: Number,
    default: 0
  },
})

const emit = defineEmits(['update:activeIndex'])

const onClick = (index) => {
  emit('update:activeIndex', index)
}
</script>

<style lang="scss" scoped>
.tab-menu {
  border-radius: var(--border-radius-2);
  padding: 8px;
  box-shadow: var(--box-shadow-1);
  display: grid;
  grid-auto-flow: column;
  gap: 20px;
}

button {
  border: 0;
  background: transparent;
  font-weight: 500;
  font-size: 14px;

  @include mq($from: medium-mobile) {
    font-size: 16px;
  }

  @include mq($from: large-mobile) {
    font-size: 20px;
  }

  &.active {
    border-radius: var(--border-radius-1);
    background: var(--color-primary);
    color: var(--color-accentOnPrimary);
    padding: 10px;
  }
}
</style>