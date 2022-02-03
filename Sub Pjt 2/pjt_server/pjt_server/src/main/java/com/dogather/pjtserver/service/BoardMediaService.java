package com.dogather.pjtserver.service;

import com.dogather.pjtserver.dto.BoardMediaDto;

import java.util.List;

public interface BoardMediaService {
    public List<BoardMediaDto> filndAllFile(int boardNo);
}
