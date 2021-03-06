package com.codesquad.issuetracker.milestone.domain;

import com.codesquad.issuetracker.issue.domain.IssueView;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Builder
@AllArgsConstructor
public class MilestoneDTO {

    private Long id;

    private String title;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String description;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private LocalDate dueDate;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private LocalDateTime updatedAt;

    @JsonProperty
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Boolean isOpen;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Integer achievementRate;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Long numberOfOpenIssue;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Long numberOfClosedIssue;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private List<IssueView> issues;

    public static MilestoneDTO from (Milestone milestone) {
        if (milestone == null) {
            return null;
        }
        return MilestoneDTO.builder()
                .id(milestone.getId().getMilestoneId())
                .title(milestone.getTitle())
                .description(milestone.getDescription())
                .dueDate(milestone.getDueDate())
                .updatedAt(milestone.getModifiedAt())
                .isOpen(milestone.isOpen())
                .achievementRate(milestone.getAchievementRate())
                .numberOfOpenIssue(milestone.getNumberOfOpenIssue())
                .numberOfClosedIssue(milestone.getNumberOfClosedIssue())
                .build();
    }
}
