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

-- Category
CREATE TABLE `category` (
  `category_no` int NOT NULL AUTO_INCREMENT,
  `category_name` varchar(20) NOT NULL,
  PRIMARY KEY (`category_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Group Table
CREATE TABLE `group` (
  `group_no` int NOT NULL AUTO_INCREMENT,
  `group_leader` int NOT NULL,
  `category_no` int NOT NULL,
  `created` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated` datetime DEFAULT CURRENT_TIMESTAMP,
  `deadline` datetime DEFAULT NULL,
  `max_people` int DEFAULT NULL,
  `view` int DEFAULT NULL,
  `status` varchar(30) DEFAULT NULL,
  `product` varchar(50) DEFAULT NULL,
  `detail` varchar(45) DEFAULT NULL,
  `link` varchar(4000) DEFAULT NULL,
  `origin_price` int DEFAULT NULL,
  `price` int DEFAULT NULL,
  PRIMARY KEY (`group_no`),
  KEY `group_leader_idx` (`group_leader`),
  CONSTRAINT `category_no` FOREIGN KEY (`category_no`) REFERENCES `category` (`category_no`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `group_leader` FOREIGN KEY (`group_leader`) REFERENCES `user` (`user_no`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- User Interest
CREATE TABLE `user_interest` (
  `user_no` int NOT NULL,
  `group_no` int NOT NULL,
  KEY `interest_user_no_idx` (`user_no`),
  KEY `interest_group_no_idx` (`group_no`),
  CONSTRAINT `interest_group_no` FOREIGN KEY (`group_no`) REFERENCES `group` (`group_no`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `interest_user_no` FOREIGN KEY (`user_no`) REFERENCES `user` (`user_no`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Product_price 가격변동
CREATE TABLE `product_price` (
  `group_no` int NOT NULL,
  `change_price` int NOT NULL,
  `change_time` datetime DEFAULT CURRENT_TIMESTAMP,
  KEY `change_price_group_no_idx` (`group_no`),
  CONSTRAINT `change_price_group_no` FOREIGN KEY (`group_no`) REFERENCES `group` (`group_no`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- option
CREATE TABLE `option` (
  `option_no` int NOT NULL AUTO_INCREMENT,
  `group_no` int DEFAULT NULL,
  `option_name` varchar(50) DEFAULT NULL,
  `option_price` int DEFAULT NULL,
  PRIMARY KEY (`option_no`),
  KEY `group_fk_idx` (`group_no`),
  CONSTRAINT `group_fk5` FOREIGN KEY (`group_no`) REFERENCES `group` (`group_no`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Group Media
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

-- faq category
CREATE TABLE `faq_category` (
  `category_no` int NOT NULL AUTO_INCREMENT,
  `category_name` varchar(40) NOT NULL,
  PRIMARY KEY (`category_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- faq
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

-- history
CREATE TABLE `group_history` (
  `history_no` int NOT NULL AUTO_INCREMENT,
  `group_no` int NOT NULL,
  `updated` datetime DEFAULT CURRENT_TIMESTAMP,
  `deadline` datetime DEFAULT NULL,
  `max_people` int DEFAULT NULL,
  `status` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`history_no`),
  KEY `group_fk_idx` (`group_no`),
  CONSTRAINT `group_fk` FOREIGN KEY (`group_no`) REFERENCES `group` (`group_no`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- participants
CREATE TABLE `participants` (
  `user_no` int NOT NULL,
  `group_no` int NOT NULL,
  KEY `participants_user_no_idx` (`user_no`),
  KEY `participants_group_no_idx` (`group_no`),
  CONSTRAINT `participants_group_no` FOREIGN KEY (`group_no`) REFERENCES `group` (`group_no`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `participants_user_no` FOREIGN KEY (`user_no`) REFERENCES `user` (`user_no`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- leader review
CREATE TABLE `leader_review` (
  `from` int NOT NULL,
  `to` int NOT NULL,
  `star` int NOT NULL,
  `review` text,
  KEY `user_fk_idx` (`from`),
  KEY `user_fk_to_idx` (`to`),
  CONSTRAINT `user_fk_from` FOREIGN KEY (`from`) REFERENCES `user` (`user_no`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_fk_to` FOREIGN KEY (`to`) REFERENCES `user` (`user_no`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- follow
CREATE TABLE `follow` (
  `from` int NOT NULL,
  `to` int NOT NULL,
  KEY `user_fk_follow_from_idx` (`from`),
  KEY `user_fk_follow_to_idx` (`to`),
  CONSTRAINT `user_fk_follow_from` FOREIGN KEY (`from`) REFERENCES `user` (`user_no`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_fk_follow_to` FOREIGN KEY (`to`) REFERENCES `user` (`user_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- dogather role
CREATE TABLE `dogather`.`role` (
  `role_no` INT NOT NULL AUTO_INCREMENT,
  `role_name` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`role_no`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

-- user role
CREATE TABLE `dogather`.`user_role` (
  `user_no` INT NOT NULL,
  `role_no` INT NOT NULL,
  INDEX `user_fk_userrole_idx` (`user_no` ASC) VISIBLE,
  INDEX `role_fk_userrole_idx` (`role_no` ASC) VISIBLE,
  CONSTRAINT `user_fk_userrole`
    FOREIGN KEY (`user_no`)
    REFERENCES `dogather`.`user` (`user_no`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `role_fk_userrole`
    FOREIGN KEY (`role_no`)
    REFERENCES `dogather`.`role` (`role_no`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

-- address
CREATE TABLE `dogather`.`address` (
  `addrno` INT NOT NULL AUTO_INCREMENT,
  `user_no` INT NOT NULL,
  `title` VARCHAR(45) NOT NULL,
  `receiver` VARCHAR(45) NOT NULL,
  `address1` VARCHAR(45) NOT NULL,
  `address2` VARCHAR(45) NOT NULL,
  `zip` INT NOT NULL,
  `tel` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`addrno`),
  INDEX `user_fk_address_idx` (`user_no` ASC) VISIBLE,
  CONSTRAINT `user_fk_address`
    FOREIGN KEY (`user_no`)
    REFERENCES `dogather`.`user` (`user_no`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

-- board
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

-- board category
CREATE TABLE `board_category` (
  `category_no` int NOT NULL AUTO_INCREMENT,
  `category_name` varchar(20) NOT NULL,
  PRIMARY KEY (`category_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- board comment
CREATE TABLE `board_comment` (
  `comment_no` int NOT NULL AUTO_INCREMENT,
  `post_no` int NOT NULL,
  `writer_no` int NOT NULL,
  `comment_content` text,
  `created` datetime DEFAULT NULL,
  PRIMARY KEY (`comment_no`),
  KEY `post_no_idx` (`post_no`),
  KEY `writer_no_idx` (`writer_no`),
  CONSTRAINT `comment_post_no` FOREIGN KEY (`post_no`) REFERENCES `board` (`post_no`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `comment_writer_no` FOREIGN KEY (`writer_no`) REFERENCES `user` (`user_no`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- board like
CREATE TABLE `board_like` (
  `post_no` int NOT NULL,
  `user_no` int NOT NULL,
  `board_title` varchar(45) DEFAULT NULL,
  `like_count` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`post_no`,`user_no`,`like_count`),
  KEY `post_no_idx` (`post_no`),
  KEY `user_no_idx` (`user_no`),
  CONSTRAINT `like_post_no` FOREIGN KEY (`post_no`) REFERENCES `board` (`post_no`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `like_user_no` FOREIGN KEY (`user_no`) REFERENCES `user` (`user_no`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- board media
CREATE TABLE `board_media` (
  `media_no` int NOT NULL AUTO_INCREMENT,
  `post_no` int NOT NULL,
  `media_title` varchar(50) DEFAULT NULL,
  `media_savename` varchar(45) NOT NULL,
  `insert_date` date NOT NULL,
  `media_filesize` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`media_no`),
  KEY `post_no_idx` (`post_no`),
  CONSTRAINT `media_post_no` FOREIGN KEY (`post_no`) REFERENCES `board` (`post_no`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- group media
CREATE TABLE `group_media` (
  `media_no` int NOT NULL AUTO_INCREMENT,
  `group_no` int NOT NULL,
  `media_title` varchar(50) DEFAULT NULL,
  `media_savename` varchar(45) NOT NULL,
  `insert_date` date NOT NULL,
  `media_filesize` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`media_no`),
  KEY `group_no_idx` (`group_no`),
  CONSTRAINT `media_group_no` FOREIGN KEY (`group_no`) REFERENCES `group` (`group_no`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
