import { createApp } from 'vue';
import App from './App.vue';
import VueLazyload from 'vue3-lazyload';
// vue3 디바이스 구버전 호환 (Polyfills -> main.ts / babel.config.js)
import 'core-js/stable';

const app = createApp(App);

app.use(VueLazyload, {
  // 옵션 설정이 필요하면 여기에 추가
});

app.mount('#app');
