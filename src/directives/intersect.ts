// directives/intersect.ts
import { Directive } from 'vue';

const intersectDirective: Directive = {
  mounted(el) {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15,
    };

    const callback = (
      entries: IntersectionObserverEntry[],
      observer: IntersectionObserver,
    ) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // 화면에 보이면 클래스를 추가합니다.
          el.classList.add('fade-enter-active');
          observer.unobserve(el); // 필요하다면 observer 해제
        }
        // 화면에서 사라질 때 클래스를 제거하는 코드는 제거합니다.
        // 그렇지 않으면 스크롤로 다시 위로 올라갈 때 컴포넌트가 보이지 않게 됩니다.
      });
    };

    const observer = new IntersectionObserver(callback, options);
    observer.observe(el);
  },
};

export default intersectDirective;
