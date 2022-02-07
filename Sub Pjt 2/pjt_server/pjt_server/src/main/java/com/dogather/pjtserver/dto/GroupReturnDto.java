package com.dogather.pjtserver.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
public class GroupReturnDto {
    private int groupNo;
    private int groupLeader;
    private LocalDateTime deadline;
    private int maxPeople;
    private int view;
    private String status;
    private String product;
    private int price;
    private int categoryNo;
    private String categoryName;
}
