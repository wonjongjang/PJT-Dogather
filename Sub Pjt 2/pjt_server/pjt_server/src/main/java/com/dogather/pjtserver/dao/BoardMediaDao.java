package com.dogather.pjtserver.dao;

import com.dogather.pjtserver.dto.BoardMediaDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface BoardMediaDao {

    public int insertFile(List<BoardMediaDto> fileList);

    public List<BoardMediaDto> findAllFile(int boardNo);
}
