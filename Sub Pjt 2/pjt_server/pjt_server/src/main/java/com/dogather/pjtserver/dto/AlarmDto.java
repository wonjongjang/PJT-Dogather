package com.dogather.pjtserver.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class AlarmDto {
    private String userNick;
    private String msg;
    private int read;
}
