package com.dogather.pjtserver.controller;

import com.dogather.pjtserver.dto.PaymentDto;
import com.dogather.pjtserver.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/payment")
public class PaymentController {

    @Autowired
    PaymentService service;

    @PostMapping
    public int payment(@RequestBody PaymentDto dto){
        return service.payment(dto);
    }
}
