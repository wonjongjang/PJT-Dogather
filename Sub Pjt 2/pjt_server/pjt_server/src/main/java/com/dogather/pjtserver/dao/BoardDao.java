package com.dogather.pjtserver.dao;

import com.dogather.pjtserver.dto.BoardDto;
import com.dogather.pjtserver.dto.BoardResponseDto;
import com.dogather.pjtserver.dto.CommentDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface BoardDao {

    public int createBoard(BoardDto boardDto);

    public BoardResponseDto findBoard(int postNo);

    void updateBoard(BoardResponseDto updatedBoardDto);

    public int upView(int postNo);

    public List<BoardResponseDto> getAllboard();

    public BoardDto findUserLikeBoard(int postNo);
}
