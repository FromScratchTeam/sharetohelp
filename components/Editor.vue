<template>
  <div class="editor">
    <input ref="fileEl" type="file" @change="onChangeUpload" hidden accept="image/png, image/jpeg" />
    <div
      main-input
      contenteditable
      :placeholder="$t('yourStory')"
      ref="titleEl"
      :value="storyTitle"
      @input="onInputTitle"
      @keydown="onEnter"
      @focus="onFocusOutEditableContent"
    />
    <div class="editor-container">
      <button class="attach-media" :style="{top: offsetTopAction + 'px'}" @click="onChooseFile" v-if="isVisibledActionMenu">
        <img src="~assets/icons/choose_image.svg" />
      </button>
      <div
        text-default
        contenteditable
        class="content-editor"
        ref="contentEl"
        @mousedown="onCheckVisibleActionMenu"
        @focus="onCheckVisibleActionMenu"
        @input="onChangeContent"
        @paste="onPaste"
        @keydown="onBackspace"
        v-show="storyTitle || storyContent"
      />
    </div>
  </div>
</template>

<script setup>
defineProps({
  storyTitle: {
    type: String,
    required: true
  },
  storyContent: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['update:storyTitle', 'update:storyContent'])

const titleEl = ref(null)
const contentEl = ref(null)
const fileEl = ref(null)
const offsetTopAction = ref(0)
const isVisibledActionMenu = ref(false)
const lastSelectedElement = ref(null)


const getCaretCoordinates = () => {
  let x = 0, y = 0;
  const isSupported = typeof window.getSelection !== "undefined";

  if (isSupported) {
    const selection = window.getSelection();

    if (selection.rangeCount !== 0) {
      const range = selection.getRangeAt(0).cloneRange();
      range.collapse(true);
      let rect

      if (range.endContainer instanceof HTMLDivElement) {
        rect = range.endContainer.getBoundingClientRect()
      } else {
        rect = range.getBoundingClientRect()
      }

      return {
          x: rect.x,
          y: rect.y,
          range
        } 
    }
  }

  return { x, y, range: null };
}

const getCaretIndex = (element) => {
  let position = 0;
  const isSupported = typeof window.getSelection !== "undefined";
  if (isSupported) {
    const selection = window.getSelection();

    if (selection.rangeCount !== 0) {
      const range = window.getSelection().getRangeAt(0);
      const preCaretRange = range.cloneRange();
      preCaretRange.selectNodeContents(element);
      preCaretRange.setEnd(range.endContainer, range.endOffset);
      position = preCaretRange.toString().length;
    }
  }

  return position;
}

const getBase64 = (file) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);

  return new Promise((resolve, reject) => {
    reader.onload = () => {
      resolve(reader.result);
    }

    reader.onerror = (error) => {
      reject(error);
    }
  })
}

const placeCaretAtEnd = (element) => {
  element.focus();

  if (typeof window.getSelection != 'undefined'
          && typeof document.createRange != 'undefined') {
    const range = document.createRange();
    range.selectNodeContents(element);
    range.collapse(false);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  } else if (typeof document.body.createTextRange != 'undefined') {
    const textRange = document.body.createTextRange();
    textRange.moveToElementText(element);
    textRange.collapse(false);
    textRange.select();
  }
}


const onPaste = (event) => {
  event.preventDefault();
  const text = (event.originalEvent || event).clipboardData.getData('text/plain');
  document.execCommand("insertHTML", false, text);
}

const onEnter = (event) => {
  if (event.code == 'Enter') {
    event.preventDefault()
    setTimeout(() => {
      contentEl.value.focus()
    })
  }
}


const onBackspace = (event) => {
  const position = getCaretIndex(event.target)

  if (position === 0 && event.code == 'Backspace') {
    setTimeout(() => {
      placeCaretAtEnd(titleEl.value)
    })
  }
}

const onFocusOutEditableContent = () => {
  isVisibledActionMenu.value = false
}

const onChangeContent = ({ target }) => {
  const { y: carterY, range } = getCaretCoordinates()
  const offsetTop = carterY - target.getBoundingClientRect().y
  offsetTopAction.value = offsetTop
  emit('update:storyContent', target.innerHTML)

  lastSelectedElement.value = range.endContainer

  isVisibledActionMenu.value = window.getSelection().focusOffset === 0
}

const onCheckVisibleActionMenu = () => {
  setTimeout(() => {
    onChangeContent({ target: contentEl.value })
  });
}

const onChooseFile = () => {
  fileEl.value.click()
}

const onMousedownEditorContent = ({ target }) => {
  if (target.closest('.editor-container') === null) {
    isVisibledActionMenu.value = false
  }
}

const onChangeUpload = ({ target }) => {
  const selectedFile = target.files[0];

  getBase64(selectedFile).then((result) => {
    const img = document.createElement('img')
    img.src = result
    lastSelectedElement.value.innerHTML = img.outerHTML
    emit('update:storyContent', lastSelectedElement.value.innerHTML)
  })
}

const onInputTitle = ({ target }) => {
  const value = target.innerText
  const lastSymbol = value[value.length -1]
  if (value.length < 30) {
    return emit('update:storyTitle', value)
  }
  contentEl.value.innerHTML = lastSymbol + contentEl.value.innerHTML
  placeCaretAtEnd(contentEl.value)
}


onMounted(() => {
  document.addEventListener('mousedown', onMousedownEditorContent)
})

onDeactivated(() => {
  document.removeEventListener('mousedown', onMousedownEditorContent)
})
</script>

<style lang="scss" scoped>
.editor {
  margin-bottom: 50px;
}

.attach-media {
  width: 40px;
  height: 40px;
  position: absolute;
  background: var(--color-secondary);
  border-radius: 50%;
  border: 0;
  right: 20px;
  margin-top: -6px;

  @include mq($from: tablet) {
    right: auto;
    left: -50px;
  }

  img {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
  }
}

.content-editor {
  outline: none;
}

.editor-container {
  position: relative;
  margin-top: 20px;

  @include mq($from: tablet) {
    margin-top: 40px;
  }
}

[placeholder]:empty::before {
  content: attr(placeholder);
  color: var(--color-placeholder);
}

::v-deep(img) {
  max-width: 100%;
}
</style>