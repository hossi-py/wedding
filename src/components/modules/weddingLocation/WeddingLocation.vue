<template>
  <div class="wedding-location-container">
    <div class="header">오시는 길</div>
    <div class="location-wrapper">
      <p class="location">연세대학교 동문회관 예식장</p>
      <p class="road-name">서울특별시 서대문구 연세로 50 (신촌동)</p>
    </div>
    <div id="map" class="map"></div>
    <div class="map-wrapper">
      <a :href="naverMapURL">
        <div class="image">
          <img src="~@/assets/images/naver.png" alt="" />
        </div>
        <div class="map-name">네이버지도</div>
      </a>
      <a :href="kakaoMapURL">
        <div class="image">
          <img src="~@/assets/images/kakao.png" alt="" />
        </div>
        <div class="map-name">카카오맵</div>
      </a>
      <a :href="TMapURL">
        <div class="image">
          <img src="~@/assets/images/tmap.svg" alt="" />
        </div>
        <div class="map-name">티맵</div>
      </a>
    </div>
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

    const locationName = encodeURIComponent('연세대학교 동문회관 예식장');
    const TMAPLocationName = encodeURIComponent('연세동문회관');

    // 유저 에이전트
    // const isiOS =
    //   /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    // const isAndroid = /Android/.test(navigator.userAgent);

    // 모웹으로 열 때
    // const naverMapUrl = `https://map.naver.com/v5/search/${locationName}`;
    //  const kakaoMapUrl = `https://map.kakao.com/link/search/${locationName}`;
    // window.open(, '_blank');
    const naverMapURL =
      'nmap://search?query=' +
      locationName +
      '&appname=hossi-py.github.io/wedding';

    const kakaoMapURL = 'kakaomap://search?q=' + locationName;

    const TMapURL = 'tmap://search?name=' + TMAPLocationName;

    return { naverMapURL, kakaoMapURL, TMapURL };
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
    margin-bottom: 50px;

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

  .map-wrapper {
    margin-top: 20px;
    display: flex;
    padding: 6px 2rem 0;
    box-sizing: border-box;
    justify-content: space-between;

    a {
      flex: 1;
      height: 45px;
      display: flex;
      align-items: center;
      justify-content: center;
      text-decoration: none;
      border: 1px solid #ccc;
      border-radius: 10px;
      box-shadow: 0px 0px 16px rgb(0 0 0 / 6%);
      margin: 0 5px;

      .image {
        display: flex;
        align-items: center;

        img {
          width: 20px;
          height: 20px;
          margin-right: 5px;
        }
      }

      .map-name {
        font-size: 0.8rem;
        color: #000000;
      }
    }

    a:first-child {
      margin-left: 0; // 첫번째 a 태그의 왼쪽 마진 제거
    }

    a:last-child {
      margin-right: 0; // 마지막 a 태그의 오른쪽 마진 제거
    }
  }
}
</style>
