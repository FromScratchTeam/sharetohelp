<template>
  <div class="about-user-container">
    <div>
      <TabMenu class="tab-menu" v-model:activeIndex="activeIndex" :list="list" />
    </div>
    <ClientOnly>
      <div class="about-user">
        <div class="card-view">
          <template v-if="activeIndex === 0">
            <template v-if="creditCardView">
              <div class="card-item" text-default @click="onCopyCardNumber">
                {{ $t('cardNumber') }}:
                <span text-default>
                  {{ creditCardView }}
                  <img src="~assets/icons/copy.svg" />
                </span>
              </div>
            </template>
            <div text-default v-else>
              {{ $t('notFilled') }}
            </div>
          </template>
          <template v-if="activeIndex === 1">
            <template v-if="cryptoaddress.address">
              <div class="card-item" text-default @click="onCopy">
                {{ $t('network') }}: {{ cryptoaddress.network }}
              </div>
              <div class="card-item" text-default @click="onCopyNetwork">
                {{ $t('address') }}:
                <span text-default>
                  {{ cryptoaddress.address }}
                  <img src="~assets/icons/copy.svg" />
                </span>
              </div>
            </template>
            <div text-default v-else>
              {{ $t('notFilled') }}
            </div>
          </template>
        </div>
      </div>
    </ClientOnly>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import copy from 'copy-to-clipboard'
import { useToast } from 'vue-toastification'

const { t } = useI18n()
const toast = useToast()

const props = defineProps({
  cardnumber: {
    type: [String, null],
    required: true,
  },
  cryptoaddress: {
    type: Object,
    required: true,
  }
})

const list = [
  { label: 'bankCard' },
  { label: 'cryptocurrency' }
]

const activeIndex = ref(0)
const creditCardView = ref('')


const onCopyCardNumber = () => {
  copy(props.value.cardnumber?.replace(/\s/g, ''))
  toast.success(t('cardNumberCopied'))
}

const onCopyNetwork = () => {
  copy(props.cryptoaddress.address)
  toast.success(t('addressCopied'))
}



if (props.cardnumber) {
  creditCardView.value = mask(props.cardnumber, '#### #### #### ####')
  activeIndex.value = 0
} else if (props.cryptoaddress) {
  activeIndex.value = 1
}
</script>


<style lang="scss" scoped>
.about-user-container {
  width: 100%;

  @include mq($from: tablet) {
    width: max-content;
  }
}

.tab-menu {
  display: inline-grid;
  box-sizing: border-box;
  width: 100%;

  @include mq($from: tablet) {
    width: auto;
  }
}

.about-user {
  background: var(--color-surface);
  box-shadow: var(--box-shadow-1);
  border-radius: var(--border-radius-2);
  min-width: 300px;
  padding: 20px;
  margin-top: 10px;
  margin-bottom: 20px;
  display: inline-flex;
  width: 100%;
  box-sizing: border-box;

  @include mq($from: tablet) {
    width: auto;
    min-width: 600px;
  }
}

.card-view {
  display: grid;
  gap: 10px;
  flex-direction: column;
  align-items: flex-start;
}

.card-item {
  max-width: max-content;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;

  span {
    display: grid;
    grid-auto-flow: column;
    gap: 10px;
    text-decoration: underline;
    align-items: center;
    cursor: pointer;

    &:active {
      color: var(--color-link);
    }
 }

  a {
    color: var(--color-link);
  }
}

</style>
