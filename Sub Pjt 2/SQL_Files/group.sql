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


CREATE TABLE `group` (
  `group_no` int NOT NULL AUTO_INCREMENT,
  `group_leader` int NOT NULL,
  `created` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated` datetime DEFAULT CURRENT_TIMESTAMP,
  `deadline` datetime DEFAULT NULL,
  `max_people` int DEFAULT NULL,
  `end` tinyint DEFAULT NULL,
  `view` int DEFAULT NULL,
  `status` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`group_no`),
  KEY `group_leader_idx` (`group_leader`),
  CONSTRAINT `group_leader` FOREIGN KEY (`group_leader`) REFERENCES `user` (`user_no`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `product` (
  `product_no` int NOT NULL AUTO_INCREMENT,
  `group_no` int NOT NULL,
  `product_name` varchar(50) DEFAULT NULL,
  `product_detail` varchar(45) DEFAULT NULL,
  `product_link` varchar(4000) DEFAULT NULL,
  `product_original_price` int DEFAULT NULL,
  `product_price` int DEFAULT NULL,
  PRIMARY KEY (`product_no`),
  KEY `group_no_idx` (`group_no`),
  CONSTRAINT `group_no` FOREIGN KEY (`group_no`) REFERENCES `group` (`group_no`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `user_group` (
  `user_no` int NOT NULL,
  `group_no` int NOT NULL,
  `group_leader` int NOT NULL,
  `product_no` int NOT NULL,
  `paid` int DEFAULT NULL,
  `amount` int DEFAULT NULL,
  KEY `group_no_idx` (`group_no`),
  KEY `product_fk_idx` (`product_no`),
  KEY `user_fk_idx` (`user_no`),
  KEY `group_fk2_idx` (`group_leader`),
  CONSTRAINT `group_fk` FOREIGN KEY (`group_no`) REFERENCES `group` (`group_no`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `group_fk2` FOREIGN KEY (`group_leader`) REFERENCES `group` (`group_no`),
  CONSTRAINT `product_fk` FOREIGN KEY (`product_no`) REFERENCES `product` (`product_no`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_fk` FOREIGN KEY (`user_no`) REFERENCES `user` (`user_no`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- insert into user values (1, "admin", "admin", "관리자", "관리자", "주소1", "주소2", 00000, "01012345678", "admin@dogather.com");
-- insert into product values(1, 1, 'test', 'test', 'test', 1, 1);
-- UPDATE `group` SET `deadline` = '' WHERE (`group_no` = '3');
