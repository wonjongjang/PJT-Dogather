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

CREATE TABLE `option` (
  `option_no` int NOT NULL AUTO_INCREMENT,
  `group_no` int DEFAULT NULL,
  `product_no` int DEFAULT NULL,
  `option_name` varchar(50) DEFAULT NULL,
  `option_price` int DEFAULT NULL,
  PRIMARY KEY (`option_no`),
  KEY `group_fk_idx` (`group_no`),
  KEY `product_no_idx` (`product_no`),
  CONSTRAINT `group_fk5` FOREIGN KEY (`group_no`) REFERENCES `group` (`group_no`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `product_no` FOREIGN KEY (`product_no`) REFERENCES `product` (`product_no`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `product_price` (
  `product_no` int NOT NULL,
  `group_no` int NOT NULL,
  `change_price` int NOT NULL,
  `change_time` datetime NOT NULL,
  KEY `product_no_idx` (`product_no`),
  KEY `change_price_group_no_idx` (`group_no`),
  CONSTRAINT `change_price_group_no` FOREIGN KEY (`group_no`) REFERENCES `group` (`group_no`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `change_price_product_no` FOREIGN KEY (`product_no`) REFERENCES `product` (`product_no`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `product_category` (
  `category_no` int NOT NULL,
  `product_no` int NOT NULL,
  KEY `category_no_idx` (`category_no`),
  KEY `product_no_idx` (`product_no`),
  CONSTRAINT `category_no` FOREIGN KEY (`category_no`) REFERENCES `category` (`category_no`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `product_no6` FOREIGN KEY (`product_no`) REFERENCES `product` (`product_no`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `category` (
  `category_no` int NOT NULL AUTO_INCREMENT,
  `category_name` varchar(20) NOT NULL,
  PRIMARY KEY (`category_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `user_interest` (
  `user_no` int NOT NULL,
  `group_no` int NOT NULL,
  KEY `interest_user_no_idx` (`user_no`),
  KEY `interest_group_no_idx` (`group_no`),
  CONSTRAINT `interest_group_no` FOREIGN KEY (`group_no`) REFERENCES `group` (`group_no`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `interest_user_no` FOREIGN KEY (`user_no`) REFERENCES `user` (`user_no`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `group-media` (
  `media_no` int NOT NULL AUTO_INCREMENT,
  `group_no` int DEFAULT NULL,
  `media_name` varchar(50) DEFAULT NULL,
  `media_type` varchar(50) DEFAULT NULL,
  `media_created` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`media_no`),
  KEY `group_fk_idx` (`group_no`),
  CONSTRAINT `group_fk4` FOREIGN KEY (`group_no`) REFERENCES `group` (`group_no`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `faq` (
  `faq_no` int NOT NULL AUTO_INCREMENT,
  `group_no` int NOT NULL,
  `category_no` int NOT NULL,
  `faq_question` varchar(1000) NOT NULL,
  `faq_answer` text NOT NULL,
  PRIMARY KEY (`faq_no`),
  KEY `group_fk_idx` (`group_no`),
  KEY `category_fk_idx` (`category_no`),
  CONSTRAINT `category_fk` FOREIGN KEY (`category_no`) REFERENCES `faq_category` (`category_no`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `group_fk1` FOREIGN KEY (`group_no`) REFERENCES `group` (`group_no`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `faq_media` (
  `faq_media_no` int NOT NULL AUTO_INCREMENT,
  `faq_no` int NOT NULL,
  `group_no` int NOT NULL,
  `category_no` int NOT NULL,
  `media_name` varchar(50) NOT NULL,
  `media_type` varchar(50) NOT NULL,
  `media_created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`faq_media_no`),
  KEY `faq_fk_idx` (`faq_no`),
  KEY `group_fk_idx` (`group_no`),
  KEY `category_fk_idx` (`category_no`),
  CONSTRAINT `category_fk1` FOREIGN KEY (`category_no`) REFERENCES `faq_category` (`category_no`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `faq_fk` FOREIGN KEY (`faq_no`) REFERENCES `faq` (`faq_no`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `group_fk3` FOREIGN KEY (`group_no`) REFERENCES `group` (`group_no`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `faq_category` (
  `category_no` int NOT NULL AUTO_INCREMENT,
  `category_name` varchar(40) NOT NULL,
  PRIMARY KEY (`category_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `board` (
  `post_no` int NOT NULL AUTO_INCREMENT,
  `writer_no` int NOT NULL,
  `board_title` varchar(250) NOT NULL,
  `board_content` varchar(45) NOT NULL,
  `created` datetime DEFAULT NULL,
  `updated` datetime DEFAULT NULL,
  `board_type` varchar(50) DEFAULT NULL,
  `board_view` int DEFAULT NULL,
  PRIMARY KEY (`post_no`),
  KEY `writer_no_idx` (`writer_no`),
  CONSTRAINT `writer_no` FOREIGN KEY (`writer_no`) REFERENCES `user` (`user_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `likes` (
  `post_no` int NOT NULL,
  `user_no` int NOT NULL,
  PRIMARY KEY (`post_no`,`user_no`),
  KEY `post_no_idx` (`post_no`),
  KEY `user_no_idx` (`user_no`),
  CONSTRAINT `like_post_no` FOREIGN KEY (`post_no`) REFERENCES `board` (`post_no`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `like_user_no` FOREIGN KEY (`user_no`) REFERENCES `user` (`user_no`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `comment` (
  `comment_no` int NOT NULL AUTO_INCREMENT,
  `post_no` int NOT NULL,
  `writer_no` int NOT NULL,
  `comment_content` text,
  `created` datetime DEFAULT NULL,
  PRIMARY KEY (`comment_no`),
  KEY `post_no_idx` (`post_no`),
  KEY `writer_no_idx` (`writer_no`),
  CONSTRAINT `comment_post_no` FOREIGN KEY (`post_no`) REFERENCES `board` (`post_no`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `comment_wirter_no` FOREIGN KEY (`writer_no`) REFERENCES `user` (`user_no`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `board_media` (
  `media_no` int NOT NULL AUTO_INCREMENT,
  `post_no` int NOT NULL,
  `media_title` varchar(50) DEFAULT NULL,
  `media_type` varchar(50) NOT NULL,
  `created` datetime DEFAULT NULL,
  PRIMARY KEY (`media_no`),
  KEY `post_no_idx` (`post_no`),
  CONSTRAINT `media_post_no` FOREIGN KEY (`post_no`) REFERENCES `board` (`post_no`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `payment` (
  `user_no` int NOT NULL,
  `group_no` int NOT NULL,
  `product_no` int NOT NULL,
  `option_no` int NOT NULL,
  `amount` int NOT NULL,
  `total_price` int NOT NULL,
  KEY `user_group_fk_idx` (`user_no`),
  KEY `user_group_fk1_idx` (`group_no`),
  KEY `user_group_fk2_idx` (`product_no`),
  KEY `option_fk_idx` (`option_no`),
  CONSTRAINT `option_fk` FOREIGN KEY (`option_no`) REFERENCES `option` (`option_no`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_group_fk` FOREIGN KEY (`user_no`) REFERENCES `user_group` (`user_no`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_group_fk1` FOREIGN KEY (`group_no`) REFERENCES `user_group` (`group_no`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_group_fk2` FOREIGN KEY (`product_no`) REFERENCES `user_group` (`product_no`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `leader_review` (
  `from_user` int NOT NULL,
  `to_user` int NOT NULL,
  `star` int NOT NULL,
  `review` text,
  KEY `from_user_idx` (`from_user`),
  KEY `to_user_idx` (`to_user`),
  CONSTRAINT `from_user` FOREIGN KEY (`from_user`) REFERENCES `user` (`user_no`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `to_user` FOREIGN KEY (`to_user`) REFERENCES `user` (`user_no`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `address` (
  `address_no` int NOT NULL AUTO_INCREMENT,
  `user_no` int NOT NULL,
  `address_title` varchar(50) NOT NULL,
  `address_reciver` varchar(50) NOT NULL,
  `address1` varchar(50) NOT NULL,
  `address2` varchar(50) NOT NULL,
  `zip` int NOT NULL,
  `tel` varchar(45) NOT NULL,
  PRIMARY KEY (`address_no`),
  KEY `address_user_no_idx` (`user_no`),
  CONSTRAINT `address_user_no` FOREIGN KEY (`user_no`) REFERENCES `user` (`user_no`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `user_follow` (
  `follower` int NOT NULL,
  `followee` int NOT NULL,
  PRIMARY KEY (`follower`,`followee`),
  KEY `followee_idx` (`followee`),
  CONSTRAINT `folllower` FOREIGN KEY (`follower`) REFERENCES `user` (`user_no`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `followee` FOREIGN KEY (`followee`) REFERENCES `user` (`user_no`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `user_role` (
  `user_no` int NOT NULL,
  `role_no` int NOT NULL,
  PRIMARY KEY (`user_no`,`role_no`),
  KEY `use_no_idx` (`user_no`),
  KEY `role_no_idx` (`role_no`),
  CONSTRAINT `role_no` FOREIGN KEY (`role_no`) REFERENCES `role` (`role_no`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `use_no` FOREIGN KEY (`user_no`) REFERENCES `user` (`user_no`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `role` (
  `role_no` int NOT NULL AUTO_INCREMENT,
  `role` varchar(50) NOT NULL,
  PRIMARY KEY (`role_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
