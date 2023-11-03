<template>
  <div class="wedding-location-container">
    <div class="header">오시는 길</div>
    <div class="location-wrapper">
      <p class="location">연세대학교 동문회관 예식장</p>
      <p class="road-name-wrapper">
        <span class="road-name">서울특별시 서대문구 연세로 50 (신촌동)</span>
        <span
          class="reset-area"
          :class="{ active: isClick }"
          @click="resetLocation"
        >
          <img src="~@/assets/images/marker.png" />
          <!-- <span class="reset">마커로 이동</span> -->
        </span>
      </p>
    </div>
    <div id="map" class="map"></div>
    <div class="map-wrapper">
      <a :href="naverMapURL" @click="checkUserAgent">
        <div class="image">
          <img src="~@/assets/images/naver.png" alt="" />
        </div>
        <div class="map-name">네이버지도</div>
      </a>
      <a :href="kakaoMapURL" @click="checkUserAgent">
        <div class="image">
          <img src="~@/assets/images/kakao.png" alt="" />
        </div>
        <div class="map-name">카카오맵</div>
      </a>
      <a :href="TMapURL" @click="checkUserAgent">
        <div class="image">
          <img src="~@/assets/images/tmap.svg" alt="" />
        </div>
        <div class="map-name">티맵</div>
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref, toRefs } from 'vue';
import { isiOS, isAndroid } from '@/utils';

export default defineComponent({
  setup() {
    const state = reactive({
      latitude: 37.56298958928777,
      longitude: 126.94236631907835,
      isClick: false,
    });

    const mapRef = ref(null) as any;

    onMounted(() => {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.VUE_APP_MAP_API_KEY}`;

      document.head.appendChild(script);

      script.onload = () => {
        mapRef.value = new window.naver.maps.Map('map', {
          center: new window.naver.maps.LatLng(state.latitude, state.longitude),
          zoom: 17,
        });

        const markerOptions = {
          position: new window.naver.maps.LatLng(
            state.latitude,
            state.longitude,
          ),
          map: mapRef.value,
          icon: require('@/assets/images/marker.png'),
        };

        new window.naver.maps.Marker(markerOptions);
      };
    });

    const locationName = encodeURIComponent('연세대학교 동문회관 예식장');
    const TMAPLocationName = encodeURIComponent('연세동문회관');

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

    const checkUserAgent = (event: Event) => {
      if (!isiOS && !isAndroid) {
        alert('이 기능은 모바일 장치에서만 사용할 수 있습니다.');
        event?.preventDefault();
      } else {
        //
      }
    };

    // 마커로 이동
    const resetLocation = () => {
      state.isClick = true;

      setTimeout(() => {
        state.isClick = false;
      }, 500);

      if (mapRef.value) {
        mapRef.value.setOptions({
          center: new window.naver.maps.LatLng(state.latitude, state.longitude),
          zoom: 17, // 원하는 줌 레벨로 설정
        });
      }
    };

    return {
      ...toRefs(state),
      naverMapURL,
      kakaoMapURL,
      TMapURL,
      checkUserAgent,
      resetLocation,
    };
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
    .road-name-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;

      .road-name {
        position: relative;
        font-size: 0.7rem;
        font-weight: 600;
        opacity: 0.7;
      }
      .reset-area {
        display: flex;
        position: absolute;
        right: 5%;
        cursor: pointer;
        -webkit-tap-highlight-color: transparent;

        img {
          width: 25px;
          height: 25px;
          margin-bottom: 13px;
        }

        .reset {
          font-size: 0.7rem;
          font-weight: 600;
        }
      }
      .reset-area.active {
        animation: jelly 500ms;
        -webkit-animation: jelly 500ms;
      }
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
      // a 태그의 탭 컬러를 없앨 수 있다.
      -webkit-tap-highlight-color: transparent;
      position: relative;

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
      margin-left: 0;
    }

    a:last-child {
      margin-right: 0;
    }

    a::before {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background-color: rgba(255, 165, 0, 0.5);
      border-radius: 10px;
      opacity: 0;
      -webkit-transition: opacity 0.3s;
      transition: opacity 0.3s;
    }

    a:active::before {
      opacity: 1;
    }
  }
}
</style>
