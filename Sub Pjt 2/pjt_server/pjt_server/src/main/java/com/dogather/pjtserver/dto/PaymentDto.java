package com.dogather.pjtserver.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class PaymentDto {
    private int userNo;
    private int groupNo;
    private int optionNo;
    private int amount;
    private int price;
}
