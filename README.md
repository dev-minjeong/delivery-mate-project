# 배달음식 메이트 프로젝트
link : http://delivery-mate-deploy-bucket.s3-website.ap-northeast-2.amazonaws.com/
## Description
갈수록 상승하는 배달팁이 부담될때, 배달음식을 1인분만 시켜먹고 싶을때, 꼭 먹고싶은 음식이 직접 걸어가서 먹기 먼 곳일때
내 주변에 있는 배달 메이트들을 구해 배달팁과 음식값의 부담을 덜 수 있는 커뮤니티 웹 사이트 프로젝트.
<div style="disply: flex;">
  <img src="https://img.shields.io/badge/client-000000?style=flat-square&logo=client&logoColor=white"/> -
  <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=white"/> 
  <img src="https://img.shields.io/badge/styled-components-DB7093?style=flat-square&logo=styled-components&logoColor=white"/>
</div>
<div style="disply: flex;">
  <img src="https://img.shields.io/badge/server-000000?style=flat-square&logo=server&logoColor=white"/> -
  <img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=Node.js&logoColor=white"/> 
  <img src="https://img.shields.io/badge/Express-000000?style=flat-square&logo=Express&logoColor=white"/>
  <img src="https://img.shields.io/badge/MySQL-4479A1?style=flat-square&logo=MySQL&logoColor=white"/> 
</div>
<div style="disply: flex;">
  <img src="https://img.shields.io/badge/deploy-000000?style=flat-square&logo=deploy&logoColor=white"/> -
  <img src="https://img.shields.io/badge/Amazon S3-569A31?style=flat-square&logo=Amazon S3&logoColor=white"/>
  <img src="https://img.shields.io/badge/Amazon RDS-527FFF?style=flat-square&logo=Amazon RDS&logoColor=white"/>
  <img src="https://img.shields.io/badge/Heroku-430098?style=flat-square&logo=Heroku&logoColor=white"/>
</div>

## Requirements
* 로그인: 회원가입, 로그인, 아이디 찾기, 비번 찾기 및 수정(nodemailer), 로그인 시 글쓰기  참여하기 댓글보기 가능
* 게시판 : 게시글 쓰기(ckeditor), 게시물 리스트화, 게시글 수정 및 삭제
* sessionStorage : 로그인, 카테고리, 페이지, 게시글, 참여 메이트 정보 저장
* 카테고리 : 관리자는 카테고리 편집 가능, 카테고리별 게시글 필터링
* 댓글 : 관리자, 게시글 주인, 참여 메이트들만 게시물의 댓글 추가 및 삭제 가능
* 참여하기 : 위치 업데이트시 참여 완료, 댓글 가능, 지도에 메이트 위치 추가
* db(sequlize) : 유저, 게시글, 참여 메이트, 댓글, 카테고리 정보 담기, 비밀번호 해싱
* kakao map api : 위치 업데이트 및 저장, 메이트들 중간지점(픽업위치) 찾기
* 송금 금액 계산 : 배달팁, 음식 값 더한 금액 계산
* styled-components : props 기반 컴포넌트 스타일
* Loading : 데이터 받아오기 완료 전 화면에 표시
