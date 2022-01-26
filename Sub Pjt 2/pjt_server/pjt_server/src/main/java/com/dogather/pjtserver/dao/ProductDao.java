package com.dogather.pjtserver.dao;

import com.dogather.pjtserver.dto.ProductDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ProductDao {

    public List<ProductDto> products(int groupNo);
    public void register(ProductDto productDto);
    public void update(ProductDto productDto);
    public void delete(int productNo);

}
