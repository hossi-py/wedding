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
          <span class="reset">마커로 이동</span>
        </span>
      </p>
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
      <a :href="TMapURL" @click="checkUserAgent">
        <div class="image">
          <img src="~@/assets/images/tmap.svg" alt="" />
        </div>
        <div class="map-name">티맵</div>
      </a>
    </div>
    <loading-spinner :visible="isLoading"></loading-spinner>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref, toRefs } from 'vue';
import { isiOS, isAndroid } from '@/utils';
import { LoadingSpinner } from '../loadingSpinner';

export default defineComponent({
  components: {
    LoadingSpinner,
  },
  setup() {
    const state = reactive({
      latitude: 37.56298958928777,
      longitude: 126.94236631907835,
      isClick: false,
      isLoading: false,
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

    const locationName = encodeURIComponent('연세동문회관예식장');
    const TMAPLocationName = encodeURIComponent('연세동문회관');

    const naverMapURL = `https://m.map.naver.com/map.naver?lat=${state.latitude}&lng=${state.longitude}&pinTitle=${locationName}`;
    const kakaoMapURL = `https://m.map.kakao.com/actions/detailMapView?locName=${locationName}&urlY=${state.latitude}&urlX=${state.longitude}`;
    // const TMapURL = `https://www.tmap.co.kr/tmap2/mobile/route.jsp?appKey=${process.env.VUE_APP_TMAP_API_KEY}&lat=${state.latitude}&lon=${state.longitude}&name=${TMAPLocationName}`;

    // const naverMapURL = `https://map.naver.com/v5/search/${locationName}`;
    // const kakaoMapURL = `https://map.kakao.com/link/search/${locationName}`;
    // window.open(, '_blank');

    // const naverMapURL =
    //   'nmap://search?query=' +
    //   locationName +
    //   '&appname=hossi-py.github.io/wedding';

    // const kakaoMapURL = 'kakaomap://search?q=' + locationName;

    const TMapURL =
      'tmap://search?name=' + encodeURIComponent(TMAPLocationName);
    const TMapStoreAndroid =
      'https://play.google.com/store/apps/details?id=com.skt.tmap.ku&pli=1';
    const TMapStoreiOS = 'https://apps.apple.com/app/id431589174';

    const checkUserAgent = (event: Event) => {
      // 사용자의 UserAgent를 통해 iOS 또는 Android 여부를 판별합니다.
      if (isAndroid) {
        // Android 장치일 때
        tryToOpenApp(TMapURL, TMapStoreAndroid);
      } else if (isiOS) {
        // iOS 장치일 때
        tryToOpenApp(TMapURL, TMapStoreiOS);
      } else {
        // 모바일 장치가 아닐 때
        alert('이 기능은 모바일 장치에서만 사용할 수 있습니다.');
        event.preventDefault();
      }
    };

    const tryToOpenApp = (appURL: string, storeURL: string) => {
      state.isLoading = true; // 스피너 작동

      // 앱을 열 시도합니다.
      window.location.href = appURL;
      // 만약 앱이 열리지 않는다면 앱 스토어로 유도하기 위한 타임아웃을 설정합니다.
      setTimeout(() => {
        state.isLoading = false; // 스피너 숨김

        // 현재 페이지를 떠나지 않았다면 앱 스토어로 유도합니다.
        if (!document.hidden) {
          window.location.href = storeURL;
        }
      }, 1800); // 앱이 열리는데 대략 2~3초 정도 걸릴 수 있으므로 그 시간 내에 체크합니다.
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
      resetLocation,
      checkUserAgent,
    };
  },
});
</script>

<style scoped>
.no-scroll {
  overflow: hidden;
  height: 100%;
}
</style>

<style lang="scss" scoped>
.wedding-location-container {
  margin-top: 50px;

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
      position: relative;

      .road-name {
        font-size: 0.7rem;
        font-weight: 600;
        opacity: 0.7;
      }
      .reset-area {
        display: flex;
        align-items: center;
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        -webkit-transform: translateY(-50%);
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
        // animation: bounce 500ms;
        // -webkit-animation: bounce 500ms;
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
