package com.dogather.pjtserver.controller;

import com.dogather.pjtserver.dto.PaymentDto;
import com.dogather.pjtserver.dto.PaymentListDto;
import com.dogather.pjtserver.service.PaymentService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/payment")
@Slf4j
public class PaymentController {

    @Autowired
    PaymentService service;

    @PostMapping
    public int payment(@RequestPart List<PaymentDto> paymentList){
        log.info(paymentList.toString());
        return service.payment(paymentList);
    }
}
