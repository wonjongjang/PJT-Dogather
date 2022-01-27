package com.dogather.pjtserver.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Data
@Getter
@Setter
public class GroupDto {
    private int groupNo;
    private int groupLeader;
    private LocalDateTime updated;
    private LocalDateTime created;
    private LocalDateTime deadline;
    private int maxPeople;
    private int end;
    private int view;
    private String status;
}
