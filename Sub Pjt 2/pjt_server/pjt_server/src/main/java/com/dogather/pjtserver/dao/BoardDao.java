package com.dogather.pjtserver.dao;

import com.dogather.pjtserver.dto.BoardDto;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface BoardDao {

    public int createBoard(BoardDto boardDto);
}
