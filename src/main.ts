import { createApp } from 'vue';
import App from './App.vue';
import VueLazyload from 'vue3-lazyload';

const app = createApp(App);

app.use(VueLazyload, {
  // 옵션 설정이 필요하면 여기에 추가
});

app.mount('#app');
