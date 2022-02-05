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
    private int productNo;
    private String productName;
    private int productPrice;
    private int categoryNo;
    private String categoryName;
}
