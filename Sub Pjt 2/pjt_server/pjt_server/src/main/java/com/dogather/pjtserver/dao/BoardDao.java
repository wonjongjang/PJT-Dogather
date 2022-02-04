package com.dogather.pjtserver.dao;

import com.dogather.pjtserver.dto.BoardDto;
import com.dogather.pjtserver.dto.BoardResponseDto;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface BoardDao {

    public int createBoard(BoardDto boardDto);

    public BoardResponseDto findBoard(int postNo);

    void updateBoard(BoardResponseDto updatedBoardDto);

    public int upView(int postNo);
}
