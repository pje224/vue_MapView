<template>
  <div>
    <div class="search-box">
      <input v-model="keyword" placeholder="주소나 장소를 입력해주세요" />
      <button @click="searchAddress">검색</button>
      <button @click="showMyLocation">📍 내 위치</button>
    </div>
    <!-- 지도를 표시할 div 입니다 -->
    <div id="map" style="width: 100%; height: 400px"></div>
  </div>
</template>
<script setup>
import { onMounted, ref } from "vue";

const map = ref(null);
const keyword = ref("");
let geocoder; // 주소 검색용 객체

onMounted(() => {
  // 카카오 지도 SDK가 로드된 후 실행
  window.kakao.maps.load(() => {
    const container = document.getElementById("map");
    // 기본 지도 (서울 시청 기준)
    const options = {
      center: new kakao.maps.LatLng(37.5665, 126.978), // 지도의 중심좌표
      level: 3, // 지도의 확대 레벨
    };
    // 지도 만들기
    map.value = new kakao.maps.Map(container, options);
    // Geocoder() 주소를 좌표로 바꾸는 "주소 검색기"
    geocoder = new kakao.maps.services.Geocoder();
    // 기본으로 보여줄 마커들 (서울의 유명한 장소들)
    const locations = [
      { name: "서울 시청", lat: 37.5665, lng: 126.978 },
      { name: "남산타워", lat: 37.5512, lng: 126.9882 },
      { name: "경복궁", lat: 37.5796, lng: 126.977 },
    ];
    // 장소 목록을 하나씩 돌면서 지도에 마커 찍기
    locations.forEach((place) => {
      // console.log(place);
      // 마커 만들기
      const marker = new kakao.maps.Marker({
        position: new kakao.maps.LatLng(place.lat, place.lng),
        map: map.value, // 어떤 지도에 표시할지
      });
      // 마우스를 올리면 말풍선 열고 닫기
      //   window.kakao.maps.event.addListener(marker, "mouseover", () => {
      //     info.open(map.value, marker);
      //   });
      //   window.kakao.maps.event.addListener(marker, "mouseout", () => {
      //     info.close();
      //   });
      window.kakao.maps.event.addListener(marker, "click", () => {
        // 마우스 올리면 보이는 말풍선 (위치 정보창)
        const info = new kakao.maps.InfoWindow({
          content: `<div style="padding:5px;font-size:12px;">${place.name}</div>`,
        });
        info.open(map.value, marker);
        setTimeout(() => info.close(), 2000);
      });
    });
  });
});

// 주소 검색 함수
const searchAddress = () => {
  // 아무것도 입력 안하고 검색하면 안내 메세지 띄우기
  if (!keyword.value.trim()) {
    alert("주소나 장소를 입력해 주세요😣");
    return;
  }
  // 주소를 좌표로 바꾸는 기능 사용
  geocoder.addressSearch(keyword.value, (result, status) => {
    // 검색이 성공했을 때
    // console.log(status);
    console.log(result);

    if (status === window.kakao.maps.services.Status.OK) {
      // 좌표값 가져오기 (x : 경도 , y : 위도)
      const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
      // 지도 중심을 그 좌표로 옮기기
      map.value.setCenter(coords);
      // 그 위치에 마커 찍기
      const marker = new kakao.maps.Marker({
        position: coords,
        map: map.value, // 어떤 지도에 표시할지
      });
    } else {
      alert("검색 결과가 없습니다🧨");
    }
  });
};
// 내 위치로 지도 옮기기
const showMyLocation = () => {
  // 컴퓨터나 폰이내 위치를 알려줄 수 있느지 확인
  if (navigator.geolocation) {
    // 내 위치 불러오기
    navigator.geolocation.getCurrentPosition((pos) => {
      // console.log(pos);
      const lat = pos.coords.latitude; // 위도
      const lng = pos.coords.longitude; // 경도
      const currentPos = new kakao.maps.LatLng(lat, lng);
      // 지도 중심을 내 위치로 바꾸기
      map.value.setCenter(currentPos);
      // 내 위치 마커 찍기
      new kakao.maps.Marker({
        map: map.value,
        position: currentPos,
      });
    });
  } else {
    alert("이 브라우저는 위치 정보를 지원하지 않습니다😢");
  }
};
</script>

<style scoped>
.search-box {
  margin: 10px 0;
}
input {
  border: none;
  padding: 5px 8px;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1);
  background-color: whitesmoke;
}
button {
  border: none;
  padding: 5px 8px;
  margin-left: 10px;
  border-radius: 5px;
  background-color: steelblue;
  color: white;
  cursor: pointer;
}
button:hover {
  background-color: rgb(63, 120, 167);
}
</style>
