package com.dogather.pjtserver.service;

import com.dogather.pjtserver.dao.PaymentDao;
import com.dogather.pjtserver.dto.PaymentDto;
import com.dogather.pjtserver.dto.PaymentListDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;

@Service
public class PaymentServiceImpl implements PaymentService{

    @Autowired
    PaymentDao dao;

    @Override
    public int payment(List<PaymentDto> paymentList) {
        return dao.payment(paymentList);
    }
}
