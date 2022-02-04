package com.dogather.pjtserver.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
public class GroupReturnDto {
    private int group_no;
    private int group_leader;
    private LocalDateTime deadline;
    private int max_people;
    private int view;
    private String status;
    private int product_no;
    private String product_name;
    private int product_price;
    private int category_no;
    private String category_name;
}
