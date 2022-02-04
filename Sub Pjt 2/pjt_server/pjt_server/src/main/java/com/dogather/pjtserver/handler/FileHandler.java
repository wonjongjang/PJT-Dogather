package com.dogather.pjtserver.handler;

import com.dogather.pjtserver.dto.BoardMediaDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;
import org.springframework.util.ObjectUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.UUID;

@Component
@Slf4j
public class FileHandler {

    private final LocalDate today = LocalDate.now();

    private final String uploadPath = Paths.get("/Users", "jamiehong", "Documents", "UPLOAD", today.format(DateTimeFormatter.ofPattern("yyMMdd"))).toString();


    private final String getRandomString() {
        return UUID.randomUUID().toString().replace("-", "");
    }


    public List<BoardMediaDto> uploadFiles(List<MultipartFile> files, int postNo) throws IOException {

        if(CollectionUtils.isEmpty(files) == true) {
            return Collections.emptyList();
        }
        List<BoardMediaDto> fileList = new ArrayList<>();

        File dir = new File(uploadPath);
        if(!dir.exists()) {
            dir.mkdirs();
        }
        log.info("========== 경로 뜨나");

        for(MultipartFile file : files) {

            String originalFileExtension;
            String contentType = file.getContentType();

            if(ObjectUtils.isEmpty(contentType)) {
                break;
            } else {
                if(contentType.contains("image/jpeg"))
                    originalFileExtension = ".jpg";
                else if (contentType.contains("image/png"))
                    originalFileExtension = ".png";
                else
                    break;
            }
            String saveName = getRandomString() + originalFileExtension;
            File target = new File(uploadPath, saveName);
            file.transferTo(target);

            BoardMediaDto fileDto = new BoardMediaDto();
            fileDto.setPostNo(postNo);
            fileDto.setMediaTitile(file.getOriginalFilename());
            fileDto.setMediaSavename(saveName);
            fileDto.setMediaFilesize(String.valueOf(file.getSize()));
            fileDto.setInsertDate(today);

            fileList.add(fileDto);

        }
        return fileList;
    }
}