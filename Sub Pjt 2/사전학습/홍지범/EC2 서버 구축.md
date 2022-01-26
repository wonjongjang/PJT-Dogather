## EC2 서버 구축

### 1. 서버 구축방식

	- 온프레미스 : 건물 도면 => 시공 => 건축 // 구축하는 사람이 low 레벨에서 모두 관여
	- Cloud : 필요한 도구를 지원받을 수 있음

### 2. CLI를 다룰 수 있는 도구들

	- aws gui
	- ubuntu cli => putty, mobile strom, terminal // 개인 pc에서 서버로 원격 접속 가능

### 3. 기본세팅

	- DB : MySQL, Maria DB ...
	- 웹서버, 프록시 서버 : Apache, nginx
	- 배포 : docker, npm, gradle(스프링), jenkins(자동 배포 CI/CD)

### 4. 주의사항

	- 방화벽 설정에서 22포트에 대한 조작은 주의!
	- 포트 옆에 22가 써져있는지 항상 주의 => 초기화는 프로님께 문의
	- DB조작은 항상 주의
	- 항상 기록!
	- 프로젝트간 한 번 배포는 경험해보자

---

## AWS EC2 실습

### 흐름

- MobaXterm(GUI 서버 툴) : 서버 초보자가 확인하기 용의함
  - Session setting => sshkey 입력(ubuntu@로 시작)
  - pemkey 등록 => 서버 접속 완료
  - nginx설치
  - mysql 설치 => db를 공유하도록 설정
    - connection name
    - Hostname : 호스트네임으로 설정
    - username : 단순한걸로 하지 말기
    - 배포된 주소로 보여야 함
  - nginx 기본 설정(수동 배포)
    - sudo vi nginx 경로
    - a key(insert) => root /home/ununtu/dist; 로 저장(프론트 배포)
    - sudo service nginx restart => not found 뜸
    - jar 파일, dist 파일을 드래그 앤 드랍으로 배치
    - 다시 restart => 새로고침하면 프론트는 뜸(백은 따로 설정 필요)
    - default 에서 Https, requset, 설정
    - java -jar ~.jar파일로 배포 => 터미널을 끄면 끊김 => 뒤에서 돌아가도록 설정(nohup .. &꼭 붙이기)
  - ![스크린샷 2022-01-25 오후 2.27.16](/Users/jamiehong/Library/Application Support/typora-user-images/스크린샷 2022-01-25 오후 2.27.16.png)



- ㅜ

- EC2 접속 => nginx설치 => MySQL 연결
  - nginx
    - front build 파일 위치 설정
    - Https 설정(ssl key, request)

























