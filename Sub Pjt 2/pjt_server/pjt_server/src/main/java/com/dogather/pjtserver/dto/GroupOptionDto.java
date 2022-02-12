package com.dogather.pjtserver.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Data
public class GroupOptionDto {
    private int groupNo;
    private int groupLeader;
    private String LeaderName;
    private int categoryNo;
    private LocalDateTime updated;
    private LocalDateTime created;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime deadline;
    private int maxPeople;
    private int view;
    private String status;
    private String product;
    private String detail;
    private String link;
    private int originPrice;
    private int price;
    private List<OptionDto> options;
    private List<String> mediaList;
    private List<FAQDto> FaqList;
    private String mainImage;

    public void setGroupDto(GroupDto groupDto){
        this.groupNo = groupDto.getGroupNo();
        this.groupLeader = groupDto.getGroupLeader();
        this.categoryNo = groupDto.getCategoryNo();
        this.updated = groupDto.getUpdated();
        this.created = groupDto.getCreated();
        this.deadline = groupDto.getDeadline();
        this.maxPeople = groupDto.getMaxPeople();
        this.view = groupDto.getView();
        this.status = groupDto.getStatus();
        this.product = groupDto.getProduct();
        this.detail = groupDto.getDetail();
        this.link = groupDto.getLink();
        this.originPrice = groupDto.getOriginPrice();
        this.price = groupDto.getPrice();

    }

}
