package com.dogather.pjtserver.dto;

import lombok.Data;

import java.util.List;

@Data
public class PaymentListDto {
    List<PaymentDto> paymentList;
}
