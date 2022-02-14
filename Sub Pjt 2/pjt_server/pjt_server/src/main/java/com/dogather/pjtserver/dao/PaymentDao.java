package com.dogather.pjtserver.dao;

import com.dogather.pjtserver.dto.GroupReturnDto;
import com.dogather.pjtserver.dto.PaymentDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface PaymentDao {
    public int payment(PaymentDto dto);

}
