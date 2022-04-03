<template>
  <div class="username-container">
    <div>
      <input
        type="text"
        main-input
        placeholder="@..."
        :value="username"
        @input="onChange"
      />
    </div>
    <div class="info">
      <p text-default>{{ $t('enterTelegramUsername') }}.</p>
      <br />
      <p text-default class="project-description" v-html="$t('telegramDescription')" />
    </div>
  </div>
</template>

<script setup>
defineProps({
  username: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['update:username'])


const onChange = ({ target }) => {
  const value = '@' + target.value.replace(/^@/, '')
  
  if (value === '@') {
    return emit('update:username', '')
  }

  emit('update:username', value)
  target.value = value
}
</script>

<style lang="scss" scoped>
.username-container {
  display: grid;
  grid-auto-rows: max-content;
  gap: 60px;
}

.info {
  position: relative;
  padding-left: 20px;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    height: 100%;
    background: #000;
    width: 2px;
  }
}

.project-description {
  max-width: 700px;
}
</style>