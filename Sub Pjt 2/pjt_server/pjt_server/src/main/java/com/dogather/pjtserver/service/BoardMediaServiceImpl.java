package com.dogather.pjtserver.service;

import com.dogather.pjtserver.dao.BoardMediaDao;
import com.dogather.pjtserver.dto.BoardMediaDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BoardMediaServiceImpl implements BoardMediaService{

    @Autowired
    public BoardMediaDao fileDao;

    @Override
    public List<BoardMediaDto> filndAllFile(int boardNo) {
        List<BoardMediaDto> fileDtoList = fileDao.findAllFile(boardNo);
        return fileDtoList;
    }
}
