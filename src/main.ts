import { createApp } from 'vue';
import App from './App.vue';
import VueLazyload from 'vue3-lazyload';
// vue3 디바이스 구버전 호환 (Polyfills -> main.ts / babel.config.js)
import 'core-js/stable';
// Intersection Observer API => 컵포넌트 각각 fade 효과 적용
import intersectDirective from './directives/intersect';
import './global.css';

const app = createApp(App);

app.use(VueLazyload, {
  // 옵션 설정이 필요하면 여기에 추가
});

app.directive('intersect', intersectDirective);

app.mount('#app');
