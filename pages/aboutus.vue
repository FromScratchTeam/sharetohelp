<template>
<section>
  <div class="item">
    <h2 header-text>{{ $t('aboutusTitles[0]') }}</h2>
    <p text-default>{{ $t('aboutusParahprahs[0]') }}</p>
  </div>
  <div class="item">
    <h2 header-text>{{ $t('aboutusTitles[1]') }}</h2>
    <p text-default>{{ $t('aboutusParahprahs[1]') }}</p>
  </div>
  <div class="item">
    <h2 header-text>{{ $t('aboutusTitles[2]') }}</h2>
    <p text-default>{{ $t('aboutusParahprahs[2]') }}</p>
  </div>
  <div class="item">
    <h2 header-text>{{ $t('aboutusTitles[3]') }}</h2>
    <p text-default>{{ $t('aboutusParahprahs[3]') }}</p>
  </div>
  <!-- <div class="item">
    <h2 header-text>{{ $t('aboutusTitles[4]') }}</h2>
    <p text-default>
      {{ $t('aboutusParahprahs[4]') }}
      <a href="https://github.com/FromScratchTeam/sharetohelp" target="_blank">{{ $t('sourceCode') }}</a>
    </p>
  </div> -->
</section>
</template>

<style lang="scss" scoped>
section {
  display: grid;
  grid-auto-rows: min-content;
  max-width: 1000px;
  gap: 60px;
  padding: 0 15px;
}

.item {
  display: grid;
  gap: 20px;
}
</style>