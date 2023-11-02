<template>
  <div class="wedding-location-container">
    <div class="header">오시는 길</div>
    <div class="location-wrapper">
      <p class="location">연세대학교 동문회관 예식장</p>
      <p class="road-name">서울특별시 서대문구 연세로 50 (신촌동)</p>
    </div>
    <div id="map" class="map"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';

export default defineComponent({
  setup() {
    onMounted(() => {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.VUE_APP_MAP_API_KEY}`;

      document.head.appendChild(script);

      script.onload = () => {
        const map = new window.naver.maps.Map('map', {
          center: new window.naver.maps.LatLng(
            37.56298958928777,
            126.94236631907835,
          ),
          zoom: 17,
        });

        const markerOptions = {
          position: new window.naver.maps.LatLng(
            37.56298958928777,
            126.94236631907835,
          ),
          map: map,
          icon: require('@/assets/images/marker.png'),
        };

        new window.naver.maps.Marker(markerOptions);
      };
    });

    return;
  },
});
</script>

<style lang="scss" scoped>
.wedding-location-container {
  margin-top: 80px;

  .header {
    font-size: 0.8rem;
    font-weight: 600;
    margin-bottom: 20px;
  }

  .location-wrapper {
    .location {
      font-size: 0.85rem;
      font-weight: 600;
      line-height: 0.5rem;
    }
    .road-name {
      font-size: 0.7rem;
      font-weight: 600;
      opacity: 0.7;
    }
  }

  .map {
    position: relative;
    width: 100%;
    height: 325px;
    overflow: hidden;
  }
}
</style>
