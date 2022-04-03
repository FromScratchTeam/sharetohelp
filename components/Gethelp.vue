<template>
  <div class="get-help">
    <h1 header-text>{{ $t('getHelpTitle') }}</h1>
    <TabMenu class="tab-menu" v-model:activeIndex="activeIndex" :list="list" />
    <div class="get-help-method">
      <component
        :is="currentCmp"
        :cardnumber="cardnumber"
        :cryptoaddress="cryptoaddress"
        @update:cardnumber="value => $emit('update:cardnumber', value)"
        @update:cryptoaddress="value => $emit('update:cryptoaddress', value)"
      />
    </div>
  </div>
</template>

<script setup>
import CreditCardInput from "./CreditCardInput.vue";
import CryptoAddress from "./CryptoAddress.vue";

defineProps({
  cardnumber: {
    type: String,
    required: true
  },
  cryptoaddress: {
    type: Object,
    default: () => ({
      network: null,
      address: null,
    })
  }
})

const list = [
  { label: 'bankCard' },
  { label: 'cryptocurrency' }
]
const activeIndex = ref(0)
const currentCmp = computed(() => [CreditCardInput, CryptoAddress][activeIndex.value])
</script>

<style lang="scss" scoped>
.tab-menu {
  margin-top: 20px;
  width: max-content;
}

.get-help-method {
  margin-top: 40px;
}
</style>