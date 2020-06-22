package com.codesquad.issuetracker.user.domain;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class User {

    @EmbeddedId
    private UserId id;

    @JsonProperty("login")
    private String nickname;

    @JsonProperty("avatar_url")
    private String avatarUrl;

    @JsonProperty("email")
    private String email;

    public static User of(UserId userId, User user) {
        return User.builder()
                .id(userId)
                .nickname(user.getNickname())
                .avatarUrl(user.getAvatarUrl())
                .email(user.getEmail())
                .build();
    }
}
