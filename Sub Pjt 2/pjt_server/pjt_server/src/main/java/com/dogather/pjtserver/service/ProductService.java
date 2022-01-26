package com.dogather.pjtserver.service;


import com.dogather.pjtserver.dto.ProductDto;

import java.util.List;

public interface ProductService {

    public List<ProductDto> products(int groupNo);
    public void productRegister(ProductDto productDto);
    public void productUpdate(ProductDto productDto);
    public void productDelete(int productNo);

}
