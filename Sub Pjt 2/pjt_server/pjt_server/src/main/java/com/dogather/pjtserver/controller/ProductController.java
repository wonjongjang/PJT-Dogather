package com.dogather.pjtserver.controller;

import com.dogather.pjtserver.dto.ProductDto;
import com.dogather.pjtserver.jwt.JwtRet;
import com.dogather.pjtserver.service.ProductService;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/product")
public class ProductController {

    @Autowired
    ProductService productService;

    @GetMapping("/{groupNo}")
    public ResponseEntity<String> products(@PathVariable int groupNo){
        System.err.println("(Get) Product Controller products Method run!");
        List<ProductDto> products = productService.products(groupNo);

        JSONObject json = new JSONObject();
        json.put("group", groupNo);
        json.put("products", products);
        return new ResponseEntity<String>(json.toString(4), HttpStatus.OK);
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody ProductDto productDto){
        System.err.println("(Post) Product Controller register Method run!");
        productService.productRegister(productDto);
        return new ResponseEntity<String>("Product Created Successfully!",HttpStatus.CREATED);
//            return new ResponseEntity<String>("Bad Request! Confirm your datas!",HttpStatus.BAD_REQUEST);

    }

    @PutMapping("/{ProductNo}")
    public ResponseEntity<String> update(@RequestBody ProductDto productDto){
        System.err.println("(Put) Product Controller update Method run!");
        productService.productUpdate(productDto);
        return new ResponseEntity<String>("Product Updated Successfully!",HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/{ProductNo}")
    public ResponseEntity<String> delete(@RequestBody ProductDto productDto){
        System.err.println("(Delete) Product Controller delete Method run!");
        productService.productDelete(productDto.getProductNo());
        return new ResponseEntity<String>("Product deleted Successfully!",HttpStatus.ACCEPTED);
    }

}
