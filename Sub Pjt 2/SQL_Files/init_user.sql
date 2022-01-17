-- dogather database 만듬
create database dogather;

-- dogather database 사용
use dogather;

-- user table 만듬
CREATE TABLE `user` (
  `user_no` int NOT NULL AUTO_INCREMENT,
  `user_id` varchar(20) NOT NULL,
  `user_pw` varchar(20) NOT NULL,
  `user_name` varchar(30) NOT NULL,
  `user_nickname` varchar(20) NOT NULL,
  `user_addr` varchar(100) NOT NULL,
  `user_addr_detail` varchar(100) NOT NULL,
  `user_zip` int NOT NULL,
  `user_tel` varchar(12) NOT NULL,
  `user_email` varchar(100) NOT NULL,
  PRIMARY KEY (`user_no`),
  UNIQUE KEY `user_id_UNIQUE` (`user_id`), -- 아이디 중복 x
  UNIQUE KEY `user_nickname_UNIQUE` (`user_nickname`) -- 닉네임 중복 x
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

insert into user values (1, "admin", "admin", "관리자", "관리자", "주소1", "주소2", 00000, "01012345678", "admin@dogather.com");

SELECT * FROM dogather.user;
