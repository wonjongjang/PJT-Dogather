package com.dogather.pjtserver.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
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
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime deadline;
    private int maxPeople;
    private int end;
    private int view;
    private String status;
}
