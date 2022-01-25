package com.dogather.pjtserver.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    //CORS SETTING!
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("*")//), "http://127.0.0.1:5500/")// 나중에 변경해야함 일단은 모두에게서 허용
                .allowedMethods("*");
    }
}
