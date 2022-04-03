<template>
<div class="crypto-address">
  <select @change="onChangeNetwork" :value="cryptoaddress.network">
    <option value="" selected>{{ $t('selectNetwork') }}</option>
    <option value="trc20">TRC20</option>
    <option value="bnb">BNB</option>
    <option value="smartchain">Smart Chain</option>
    <option value="bitcoin">Bitcoin</option>
    <option value="ethereum">Ethereum</option>
    <option value="solana">Solana</option>
  </select>
  <input
    type="text"
    main-input
    :placeholder="$t('insertAddress')"
    :value="cryptoaddress.address"
    @input="onChangeAddress"
  />
</div>
</template>

<script setup>
const props = defineProps({
  cryptoaddress: {
    type: Object,
    default: () => ({
      network: null,
      address: null,
    })
  }
})

const emit = defineEmits(['update:cryptoaddress'])

const onChangeNetwork = ({ target }) => {
  emit('update:cryptoaddress', {
    ...props.cryptoaddress,
    network: target.value
  })
}

const onChangeAddress = ({ target }) => {
  emit('update:cryptoaddress', {
    ...props.cryptoaddress,
    address: target.value
  })
}

</script>

<style lang="scss" scoped>
.crypto-address {
  display: grid;
  align-items: center;
  grid-template-columns: 1fr;
  gap: 20px;

  @include mq($from: tablet) {
    grid-template-columns: auto 1fr;
  }
}
</style>