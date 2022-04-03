<template>
  <input
    type="text"
    main-input
    v-maska="'#### #### #### ####'"
    :placeholder="$t('enterYourCardNumber')"
    :value="cardnumber"
    @input="$emit('update:cardnumber', $event.target.value)"
  />
</template>

<script setup>
defineProps({
  cardnumber: {
    type: String,
    required: true
  }
})
</script>
