CREATE TABLE `user` (
	`user_no`	int	NOT NULL,
	`user_id`	varchar2(20)	NULL,
	`user_pw`	varchar2(20)	NULL,
	`name`	varchar2(20)	NULL,
	`nickname`	varchar2(20)	NULL,
	`addr`	varchar2(100)	NULL,
	`add_detail`	varchar2(100)	NULL,
	`zip`	int	NULL,
	`tel`	varchar2(12)	NULL,
	`email`	varchar2(50)	NULL
);

CREATE TABLE `group` (
	`groupno`	int	NOT NULL,
	`leader`	int	NOT NULL,
	`created`	datetime	NULL,
	`updated`	datetime	NULL,
	`deadline`	datetime	NULL,
	`max_people`	int	NULL,
	`end`	bool	NULL,
	`view`	int	NULL,
	`status`	varchar2(30)	NULL
);

CREATE TABLE `user_party` (
	`userno`	int	NOT NULL,
	`groupno`	int	NOT NULL,
	`leader`	int	NOT NULL,
	`prono`	int	NOT NULL,
	`paid`	int	NULL
);

CREATE TABLE `user_follow` (
	`from`	int	NOT NULL,
	`to`	int	NOT NULL
);

CREATE TABLE `board` (
	`postno`	int	NOT NULL,
	`writer`	int	NOT NULL,
	`title`	varchar2(50)	NULL,
	`content`	text	NULL,
	`created`	datetime	NULL,
	`updated`	datetime	NULL,
	`boardtype`	varchar2(50)	NULL,
	`view`	int	NULL
);

CREATE TABLE `comment` (
	`commentno`	int	NOT NULL,
	`postno`	int	NOT NULL,
	`writer`	int	NOT NULL,
	`content`	text	NULL,
	`Field`	datetime	NULL
);

CREATE TABLE `group-media` (
	`mediaid`	int	NOT NULL,
	`groupno`	int	NOT NULL,
	`name`	varchar2(50)	NULL,
	`type`	varchar2(50)	NULL,
	`created`	datetime	NULL
);

CREATE TABLE `address` (
	`addrno`	int	NOT NULL,
	`user_no`	int	NOT NULL,
	`title`	varchar2	NULL,
	`receiver`	varchar2	NULL,
	`address1`	varchar2	NULL,
	`address2`	varchar2	NULL,
	`zip`	int	NULL,
	`tel`	varchar2	NULL
);

CREATE TABLE `role` (
	`roleno`	int	NOT NULL,
	`role`	varchar2(50)	NULL
);

CREATE TABLE `user-role` (
	`userno`	int	NOT NULL,
	`roleno`	int	NOT NULL
);

CREATE TABLE `Category` (
	`cateno`	int	NOT NULL,
	`catename`	varchar2(20)	NULL
);

CREATE TABLE `party-category` (
	`cateno`	int	NOT NULL,
	`prono`	int	NOT NULL
);

CREATE TABLE `user_interest` (
	`userno`	int	NOT NULL,
	`groupno`	int	NOT NULL
);

CREATE TABLE `board-media` (
	`mediaid`	int	NOT NULL,
	`postno`	int	NOT NULL,
	`name`	varchar2(50)	NULL,
	`type`	varchar2(50)	NULL,
	`created`	datetime	NULL
);

CREATE TABLE `chat-room` (
	`roomno`	int	NOT NULL,
	`groupno`	int	NOT NULL,
	`leader`	int	NOT NULL,
	`user_no`	int	NOT NULL
);

CREATE TABLE `message` (
	`msgno`	int	NOT NULL,
	`tem_no`	int	NOT NULL,
	`groupno`	int	NOT NULL,
	`created`	datetime	NULL,
	`title`	varchar2(50)	NULL,
	`content`	text	NULL
);

CREATE TABLE `message_send` (
	`msgno`	int	NOT NULL,
	`tem_no`	int	NOT NULL,
	`groupno`	int	NOT NULL,
	`userno`	int	NOT NULL,
	`leader`	int	NOT NULL,
	`prono`	int	NOT NULL
);

CREATE TABLE `chat_message` (
	`roomno`	int	NOT NULL,
	`groupno`	int	NOT NULL,
	`leader`	int	NOT NULL,
	`user_no`	int	NOT NULL,
	`leader_chat`	bool	NULL,
	`content`	varchar2(500)	NULL,
	`created`	datetime	NULL
);

CREATE TABLE `likes` (
	`postno`	int	NOT NULL,
	`user_no`	int	NOT NULL
);

CREATE TABLE `product` (
	`prono`	int	NOT NULL,
	`groupno`	int	NOT NULL,
	`name`	varchar2(50)	NOT NULL,
	`detail`	text	NULL,
	`path`	varchar2(4000)	NULL,
	`origin_price`	int	NULL,
	`price`	int	NULL
);

CREATE TABLE `FAQ` (
	`faqno`	int	NOT NULL,
	`groupno`	int	NOT NULL,
	`cate_no`	int	NOT NULL,
	`question`	varchar2(1000)	NULL,
	`answer`	text	NULL
);

CREATE TABLE `faq-media` (
	`mediaid`	int	NOT NULL,
	`faqno`	int	NOT NULL,
	`groupno`	int	NOT NULL,
	`cate_no`	int	NOT NULL,
	`name`	varchar2(50)	NULL,
	`type`	varchar2(50)	NULL,
	`created`	datetime	NULL
);

CREATE TABLE `leader_review` (
	`from`	int	NOT NULL,
	`to`	int	NOT NULL,
	`star`	int	NULL,
	`review`	text	NULL
);

CREATE TABLE `group-history` (
	`hisno`	int	NOT NULL,
	`groupno`	int	NOT NULL,
	`updated`	datetime	NULL,
	`deadline`	datetime	NULL,
	`max_people`	int	NULL,
	`changed_time`	datetime	NULL
);

CREATE TABLE `product_price` (
	`prono`	int	NOT NULL,
	`groupno`	int	NOT NULL,
	`price`	int	NULL,
	`changed_time`	datetime	NULL
);

CREATE TABLE `meesage_tem` (
	`tem_no`	int	NOT NULL,
	`title`	varchar2(50)	NULL,
	`content`	text	NULL
);

CREATE TABLE `option` (
	`option_group_no`	int	NOT NULL,
	`groupno`	int	NOT NULL,
	`prono`	int	NOT NULL,
	`option_group`	varchar2(50)	NULL
);

CREATE TABLE `option_choice` (
	`option_no`	int	NOT NULL,
	`groupno`	int	NOT NULL,
	`prono`	int	NOT NULL,
	`option_name`	varchar2(50)	NULL,
	`option_price`	int	NULL
);

CREATE TABLE `FAQ_category` (
	`cate_no`	int	NOT NULL,
	`catrgory_name`	varchar2(30)	NULL
);

ALTER TABLE `user` ADD CONSTRAINT `PK_USER` PRIMARY KEY (
	`user_no`
);

ALTER TABLE `group` ADD CONSTRAINT `PK_GROUP` PRIMARY KEY (
	`groupno`,
	`leader`
);

ALTER TABLE `user_party` ADD CONSTRAINT `PK_USER_PARTY` PRIMARY KEY (
	`userno`,
	`groupno`,
	`leader`,
	`prono`
);

ALTER TABLE `board` ADD CONSTRAINT `PK_BOARD` PRIMARY KEY (
	`postno`,
	`writer`
);

ALTER TABLE `comment` ADD CONSTRAINT `PK_COMMENT` PRIMARY KEY (
	`commentno`,
	`postno`,
	`writer`
);

ALTER TABLE `group-media` ADD CONSTRAINT `PK_GROUP-MEDIA` PRIMARY KEY (
	`mediaid`,
	`groupno`
);

ALTER TABLE `address` ADD CONSTRAINT `PK_ADDRESS` PRIMARY KEY (
	`addrno`,
	`user_no`
);

ALTER TABLE `role` ADD CONSTRAINT `PK_ROLE` PRIMARY KEY (
	`roleno`
);

ALTER TABLE `user-role` ADD CONSTRAINT `PK_USER-ROLE` PRIMARY KEY (
	`userno`,
	`roleno`
);

ALTER TABLE `Category` ADD CONSTRAINT `PK_CATEGORY` PRIMARY KEY (
	`cateno`
);

ALTER TABLE `party-category` ADD CONSTRAINT `PK_PARTY-CATEGORY` PRIMARY KEY (
	`cateno`,
	`prono`
);

ALTER TABLE `user_interest` ADD CONSTRAINT `PK_USER_INTEREST` PRIMARY KEY (
	`userno`,
	`groupno`
);

ALTER TABLE `board-media` ADD CONSTRAINT `PK_BOARD-MEDIA` PRIMARY KEY (
	`mediaid`,
	`postno`
);

ALTER TABLE `chat-room` ADD CONSTRAINT `PK_CHAT-ROOM` PRIMARY KEY (
	`roomno`,
	`groupno`,
	`leader`,
	`user_no`
);

ALTER TABLE `message` ADD CONSTRAINT `PK_MESSAGE` PRIMARY KEY (
	`msgno`,
	`tem_no`,
	`groupno`
);

ALTER TABLE `message_send` ADD CONSTRAINT `PK_MESSAGE_SEND` PRIMARY KEY (
	`msgno`,
	`tem_no`,
	`groupno`,
	`userno`,
	`leader`,
	`prono`
);

ALTER TABLE `chat_message` ADD CONSTRAINT `PK_CHAT_MESSAGE` PRIMARY KEY (
	`roomno`,
	`groupno`,
	`leader`,
	`user_no`
);

ALTER TABLE `likes` ADD CONSTRAINT `PK_LIKES` PRIMARY KEY (
	`postno`,
	`user_no`
);

ALTER TABLE `product` ADD CONSTRAINT `PK_PRODUCT` PRIMARY KEY (
	`prono`,
	`groupno`
);

ALTER TABLE `FAQ` ADD CONSTRAINT `PK_FAQ` PRIMARY KEY (
	`faqno`,
	`groupno`,
	`cate_no`
);

ALTER TABLE `faq-media` ADD CONSTRAINT `PK_FAQ-MEDIA` PRIMARY KEY (
	`mediaid`,
	`faqno`,
	`groupno`,
	`cate_no`
);

ALTER TABLE `group-history` ADD CONSTRAINT `PK_GROUP-HISTORY` PRIMARY KEY (
	`hisno`,
	`groupno`
);

ALTER TABLE `product_price` ADD CONSTRAINT `PK_PRODUCT_PRICE` PRIMARY KEY (
	`prono`,
	`groupno`
);

ALTER TABLE `meesage_tem` ADD CONSTRAINT `PK_MEESAGE_TEM` PRIMARY KEY (
	`tem_no`
);

ALTER TABLE `option` ADD CONSTRAINT `PK_OPTION` PRIMARY KEY (
	`option_group_no`,
	`groupno`,
	`prono`
);

ALTER TABLE `option_choice` ADD CONSTRAINT `PK_OPTION_CHOICE` PRIMARY KEY (
	`option_no`,
	`groupno`,
	`prono`
);

ALTER TABLE `FAQ_category` ADD CONSTRAINT `PK_FAQ_CATEGORY` PRIMARY KEY (
	`cate_no`
);

ALTER TABLE `group` ADD CONSTRAINT `FK_user_TO_group_1` FOREIGN KEY (
	`leader`
)
REFERENCES `user` (
	`user_no`
);

ALTER TABLE `user_party` ADD CONSTRAINT `FK_user_TO_user_party_1` FOREIGN KEY (
	`userno`
)
REFERENCES `user` (
	`user_no`
);

ALTER TABLE `user_party` ADD CONSTRAINT `FK_group_TO_user_party_1` FOREIGN KEY (
	`groupno`
)
REFERENCES `group` (
	`groupno`
);

ALTER TABLE `user_party` ADD CONSTRAINT `FK_group_TO_user_party_2` FOREIGN KEY (
	`leader`
)
REFERENCES `group` (
	`leader`
);

ALTER TABLE `user_party` ADD CONSTRAINT `FK_product_TO_user_party_1` FOREIGN KEY (
	`prono`
)
REFERENCES `product` (
	`prono`
);

ALTER TABLE `board` ADD CONSTRAINT `FK_user_TO_board_1` FOREIGN KEY (
	`writer`
)
REFERENCES `user` (
	`user_no`
);

ALTER TABLE `comment` ADD CONSTRAINT `FK_board_TO_comment_1` FOREIGN KEY (
	`postno`
)
REFERENCES `board` (
	`postno`
);

ALTER TABLE `comment` ADD CONSTRAINT `FK_user_TO_comment_1` FOREIGN KEY (
	`writer`
)
REFERENCES `user` (
	`user_no`
);

ALTER TABLE `group-media` ADD CONSTRAINT `FK_group_TO_group-media_1` FOREIGN KEY (
	`groupno`
)
REFERENCES `group` (
	`groupno`
);

ALTER TABLE `address` ADD CONSTRAINT `FK_user_TO_address_1` FOREIGN KEY (
	`user_no`
)
REFERENCES `user` (
	`user_no`
);

ALTER TABLE `user-role` ADD CONSTRAINT `FK_user_TO_user-role_1` FOREIGN KEY (
	`userno`
)
REFERENCES `user` (
	`user_no`
);

ALTER TABLE `user-role` ADD CONSTRAINT `FK_role_TO_user-role_1` FOREIGN KEY (
	`roleno`
)
REFERENCES `role` (
	`roleno`
);

ALTER TABLE `party-category` ADD CONSTRAINT `FK_Category_TO_party-category_1` FOREIGN KEY (
	`cateno`
)
REFERENCES `Category` (
	`cateno`
);

ALTER TABLE `party-category` ADD CONSTRAINT `FK_product_TO_party-category_1` FOREIGN KEY (
	`prono`
)
REFERENCES `product` (
	`prono`
);

ALTER TABLE `user_interest` ADD CONSTRAINT `FK_user_TO_user_interest_1` FOREIGN KEY (
	`userno`
)
REFERENCES `user` (
	`user_no`
);

ALTER TABLE `user_interest` ADD CONSTRAINT `FK_group_TO_user_interest_1` FOREIGN KEY (
	`groupno`
)
REFERENCES `group` (
	`groupno`
);

ALTER TABLE `board-media` ADD CONSTRAINT `FK_board_TO_board-media_1` FOREIGN KEY (
	`postno`
)
REFERENCES `board` (
	`postno`
);

ALTER TABLE `chat-room` ADD CONSTRAINT `FK_group_TO_chat-room_1` FOREIGN KEY (
	`groupno`
)
REFERENCES `group` (
	`groupno`
);

ALTER TABLE `chat-room` ADD CONSTRAINT `FK_group_TO_chat-room_2` FOREIGN KEY (
	`leader`
)
REFERENCES `group` (
	`leader`
);

ALTER TABLE `chat-room` ADD CONSTRAINT `FK_user_TO_chat-room_1` FOREIGN KEY (
	`user_no`
)
REFERENCES `user` (
	`user_no`
);

ALTER TABLE `message` ADD CONSTRAINT `FK_meesage_tem_TO_message_1` FOREIGN KEY (
	`tem_no`
)
REFERENCES `meesage_tem` (
	`tem_no`
);

ALTER TABLE `message` ADD CONSTRAINT `FK_group_TO_message_1` FOREIGN KEY (
	`groupno`
)
REFERENCES `group` (
	`groupno`
);

ALTER TABLE `message_send` ADD CONSTRAINT `FK_message_TO_message_send_1` FOREIGN KEY (
	`msgno`
)
REFERENCES `message` (
	`msgno`
);

ALTER TABLE `message_send` ADD CONSTRAINT `FK_message_TO_message_send_2` FOREIGN KEY (
	`tem_no`
)
REFERENCES `message` (
	`tem_no`
);

ALTER TABLE `message_send` ADD CONSTRAINT `FK_message_TO_message_send_3` FOREIGN KEY (
	`groupno`
)
REFERENCES `message` (
	`groupno`
);

ALTER TABLE `message_send` ADD CONSTRAINT `FK_user_party_TO_message_send_1` FOREIGN KEY (
	`userno`
)
REFERENCES `user_party` (
	`userno`
);

ALTER TABLE `message_send` ADD CONSTRAINT `FK_user_party_TO_message_send_2` FOREIGN KEY (
	`leader`
)
REFERENCES `user_party` (
	`leader`
);

ALTER TABLE `message_send` ADD CONSTRAINT `FK_user_party_TO_message_send_3` FOREIGN KEY (
	`prono`
)
REFERENCES `user_party` (
	`prono`
);

ALTER TABLE `chat_message` ADD CONSTRAINT `FK_chat-room_TO_chat_message_1` FOREIGN KEY (
	`roomno`
)
REFERENCES `chat-room` (
	`roomno`
);

ALTER TABLE `chat_message` ADD CONSTRAINT `FK_chat-room_TO_chat_message_2` FOREIGN KEY (
	`groupno`
)
REFERENCES `chat-room` (
	`groupno`
);

ALTER TABLE `chat_message` ADD CONSTRAINT `FK_chat-room_TO_chat_message_3` FOREIGN KEY (
	`leader`
)
REFERENCES `chat-room` (
	`leader`
);

ALTER TABLE `chat_message` ADD CONSTRAINT `FK_chat-room_TO_chat_message_4` FOREIGN KEY (
	`user_no`
)
REFERENCES `chat-room` (
	`user_no`
);

ALTER TABLE `likes` ADD CONSTRAINT `FK_board_TO_likes_1` FOREIGN KEY (
	`postno`
)
REFERENCES `board` (
	`postno`
);

ALTER TABLE `likes` ADD CONSTRAINT `FK_user_TO_likes_1` FOREIGN KEY (
	`user_no`
)
REFERENCES `user` (
	`user_no`
);

ALTER TABLE `product` ADD CONSTRAINT `FK_group_TO_product_1` FOREIGN KEY (
	`groupno`
)
REFERENCES `group` (
	`groupno`
);

ALTER TABLE `FAQ` ADD CONSTRAINT `FK_group_TO_FAQ_1` FOREIGN KEY (
	`groupno`
)
REFERENCES `group` (
	`groupno`
);

ALTER TABLE `FAQ` ADD CONSTRAINT `FK_FAQ_category_TO_FAQ_1` FOREIGN KEY (
	`cate_no`
)
REFERENCES `FAQ_category` (
	`cate_no`
);

ALTER TABLE `faq-media` ADD CONSTRAINT `FK_FAQ_TO_faq-media_1` FOREIGN KEY (
	`faqno`
)
REFERENCES `FAQ` (
	`faqno`
);

ALTER TABLE `faq-media` ADD CONSTRAINT `FK_FAQ_TO_faq-media_2` FOREIGN KEY (
	`groupno`
)
REFERENCES `FAQ` (
	`groupno`
);

ALTER TABLE `faq-media` ADD CONSTRAINT `FK_FAQ_TO_faq-media_3` FOREIGN KEY (
	`cate_no`
)
REFERENCES `FAQ` (
	`cate_no`
);

ALTER TABLE `group-history` ADD CONSTRAINT `FK_group_TO_group-history_1` FOREIGN KEY (
	`groupno`
)
REFERENCES `group` (
	`groupno`
);

ALTER TABLE `product_price` ADD CONSTRAINT `FK_product_TO_product_price_1` FOREIGN KEY (
	`prono`
)
REFERENCES `product` (
	`prono`
);

ALTER TABLE `product_price` ADD CONSTRAINT `FK_product_TO_product_price_2` FOREIGN KEY (
	`groupno`
)
REFERENCES `product` (
	`groupno`
);

ALTER TABLE `option` ADD CONSTRAINT `FK_product_TO_option_1` FOREIGN KEY (
	`groupno`
)
REFERENCES `product` (
	`groupno`
);

ALTER TABLE `option` ADD CONSTRAINT `FK_product_TO_option_2` FOREIGN KEY (
	`prono`
)
REFERENCES `product` (
	`prono`
);

ALTER TABLE `option_choice` ADD CONSTRAINT `FK_option_TO_option_choice_1` FOREIGN KEY (
	`option_no`
)
REFERENCES `option` (
	`option_group_no`
);

ALTER TABLE `option_choice` ADD CONSTRAINT `FK_option_TO_option_choice_2` FOREIGN KEY (
	`groupno`
)
REFERENCES `option` (
	`groupno`
);

ALTER TABLE `option_choice` ADD CONSTRAINT `FK_option_TO_option_choice_3` FOREIGN KEY (
	`prono`
)
REFERENCES `option` (
	`prono`
);

