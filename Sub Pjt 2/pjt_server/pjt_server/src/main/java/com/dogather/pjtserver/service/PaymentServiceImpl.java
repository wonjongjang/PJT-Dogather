package com.dogather.pjtserver.service;

import com.dogather.pjtserver.dao.PaymentDao;
import com.dogather.pjtserver.dto.PaymentDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PaymentServiceImpl implements PaymentService{

    @Autowired
    PaymentDao dao;

    @Override
    public int payment(PaymentDto dto) {
        return dao.payment(dto);
    }
}
