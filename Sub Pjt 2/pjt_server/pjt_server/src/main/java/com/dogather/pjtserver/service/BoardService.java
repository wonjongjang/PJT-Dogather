package com.dogather.pjtserver.service;

import com.dogather.pjtserver.dto.BoardDto;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface BoardService {

    public int createBoard(BoardDto boardDto);

    public int createBoard(BoardDto boardDto, List<MultipartFile> mediaList) throws IOException;
}
