package com.dogather.pjtserver.dao;

import com.dogather.pjtserver.dto.PaymentDto;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface PaymentDao {
    public int payment(PaymentDto dto);
}
