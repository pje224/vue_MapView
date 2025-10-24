<template>
  <div>
    <div id="map" style="width: 100%; height: 350px"></div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";

onMounted(() => {
  // 카카오 지도 SDK가 로드된 후 실행
  window.kakao.maps.load(() => {
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(35.868330398, 128.593970729), // 지도의 중심좌표
      level: 3, // 지도의 확대 레벨 (숫자가 작을수록 확대됨)
    };
    // 지도를 표시할 div와 지도 옵션으로 지도를 생성
    const map = new kakao.maps.Map(container, options);
    
    // 마커가 표시될 위치입니다
    // var markerPosition = new kakao.maps.LatLng(35.868813, 128.594944);

    // 마커 이미지 설정
    const imageSrc = "/pin@4x.png";
    const imageSize = new kakao.maps.Size(33, 47); // 이미지 크기
    const imageOption = { offset: new kakao.maps.Point(15, 40) }; // 중심 좌표 기준 위치 조정

    // 마커 이미지 객체 생성
    const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

    // 마커를 생성합니다
    const marker = new kakao.maps.Marker({
      position: options.center,
      image: markerImage, // 이미지 적용
    });

    // 마커가 지도 위에 표시되도록 설정합니다
    marker.setMap(map);
  });
});
// 챗지피티가 고쳐준 코드🔽
// onMounted(() => {
//   // 카카오맵 스크립트가 로드되어 있는지 확인
//   if (!window.kakao || !window.kakao.maps) {
//     console.error("Kakao Maps API가 로드되지 않았습니다.");
//     return;
//   }

//   const mapContainer = document.getElementById("map"); // 지도를 표시할 div
//   const mapOption = {
//     center: new kakao.maps.LatLng(37.54699, 127.09598), // 중심좌표
//     level: 4, // 확대 레벨
//   };

//   // 지도 생성
//   const map = new kakao.maps.Map(mapContainer, mapOption);

//   // 마커 이미지 설정
//   const imageSrc = "/public/pin@4x.png";
//   const imageSize = new kakao.maps.Size(53, 70);
//   const imageOption = { offset: new kakao.maps.Point(27, 69) };

//   const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);
//   const markerPosition = new kakao.maps.LatLng(37.54699, 127.09598);

//   // 마커 생성 및 지도에 표시
//   const marker = new kakao.maps.Marker({
//     position: markerPosition,
//     image: markerImage,
//   });

//   marker.setMap(map);
// });
</script>

<style scoped></style>
