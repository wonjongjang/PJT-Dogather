use dogather;

Drop table `faq_media`;

Drop table `group-media`;

CREATE TABLE `dogather`.`product_media` (
  `media_no` INT NOT NULL AUTO_INCREMENT,
  `product_no` INT NULL,
  `name` VARCHAR(50) NOT NULL,
  `type` VARCHAR(50) NOT NULL,
  `created` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`media_no`),
  INDEX `product_fk9_idx` (`product_no` ASC) VISIBLE,
  CONSTRAINT `product_fk9`
    FOREIGN KEY (`product_no`)
    REFERENCES `dogather`.`product` (`product_no`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;