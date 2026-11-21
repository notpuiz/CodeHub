import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useLocaleStore } from '@/stores/locale'

export const DEFAULT_PLAYGROUND = {
  title: 'Interactive Counter Card',
  html: `<main class="card">
  <span class="tag">CodeHub Playground</span>
  <h1>Try editing this code</h1>
  <p>Change the HTML, CSS, or JavaScript and watch the preview update instantly.</p>
  <div class="row">
    <button id="count-btn">Clicked <span id="num">0</span> times</button>
    <button id="reset-btn" class="ghost">Reset</button>
  </div>
</main>`,
  css: `body {
  font-family: system-ui, -apple-system, sans-serif;
  margin: 0;
  min-height: 100vh;
  display: grid;
  place-items: center;
  background: #fafafa;
  color: #18181b;
  padding: 24px;
}

.card {
  max-width: 420px;
  padding: 28px;
  border-radius: 16px;
  background: white;
  border: 1px solid #e4e4e7;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.04);
}

.tag {
  display: inline-block;
  font-size: 12px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 999px;
  background: #eff6ff;
  color: #1d4ed8;
}

h1 {
  margin: 14px 0 8px;
  font-size: 22px;
  letter-spacing: -0.02em;
}

p {
  margin: 0 0 20px;
  color: #52525b;
  font-size: 14px;
  line-height: 1.6;
}

.row {
  display: flex;
  gap: 8px;
}

button {
  padding: 9px 16px;
  border-radius: 8px;
  border: none;
  background: #18181b;
  color: white;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  transition: transform 160ms cubic-bezier(0.23, 1, 0.32, 1);
}

button:active {
  transform: scale(0.97);
}

button.ghost {
  background: #f4f4f5;
  color: #27272a;
}

#num {
  font-variant-numeric: tabular-nums;
}`,
  js: `let count = 0;
const numEl = document.getElementById('num');

document.getElementById('count-btn').addEventListener('click', () => {
  count += 1;
  numEl.textContent = count;
  console.log('Button clicked! Count:', count);
});

document.getElementById('reset-btn').addEventListener('click', () => {
  count = 0;
  numEl.textContent = count;
  console.log('Counter reset');
});`,
}

export const usePlaygroundStore = defineStore('playground', () => {
  const localeStore = useLocaleStore()
  const customTitle = ref(null)
  const title = computed(() => customTitle.value ?? localeStore.t('playground.defaultTitle'))
  const html = ref(DEFAULT_PLAYGROUND.html)
  const css = ref(DEFAULT_PLAYGROUND.css)
  const js = ref(DEFAULT_PLAYGROUND.js)
  const lastSnapshot = ref({ ...DEFAULT_PLAYGROUND, customTitle: null })

  function loadExample(example) {
    const nextTitle = example.title || null
    const next = {
      customTitle: nextTitle,
      html: example.html ?? '',
      css: example.css ?? '',
      js: example.js ?? '',
    }
    customTitle.value = next.customTitle
    html.value = next.html
    css.value = next.css
    js.value = next.js
    lastSnapshot.value = { ...next }
  }

  function reset() {
    customTitle.value = lastSnapshot.value.customTitle
    html.value = lastSnapshot.value.html
    css.value = lastSnapshot.value.css
    js.value = lastSnapshot.value.js
  }

  function loadDefault() {
    loadExample({ ...DEFAULT_PLAYGROUND, title: null })
  }

  return {
    title,
    html,
    css,
    js,
    loadExample,
    reset,
    loadDefault,
  }
})
