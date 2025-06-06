package com.backendalikin.mapper;

import com.backendalikin.dto.request.UserUpdateRequest;
import com.backendalikin.dto.response.UserBasicResponse;
import com.backendalikin.dto.response.UserResponse;
import com.backendalikin.entity.UserEntity;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-06-05T21:19:36+0200",
    comments = "version: 1.5.5.Final, compiler: Eclipse JDT (IDE) 3.42.0.v20250514-1000, environment: Java 21.0.7 (Eclipse Adoptium)"
)
@Component
public class UserMapperImpl implements UserMapper {

    @Override
    public UserResponse toUserResponse(UserEntity entity) {
        if ( entity == null ) {
            return null;
        }

        UserResponse.UserResponseBuilder userResponse = UserResponse.builder();

        userResponse.bio( entity.getBio() );
        userResponse.birthDate( entity.getBirthDate() );
        userResponse.email( entity.getEmail() );
        userResponse.emailVerified( entity.isEmailVerified() );
        userResponse.id( entity.getId() );
        userResponse.lastName( entity.getLastName() );
        userResponse.name( entity.getName() );
        userResponse.nickname( entity.getNickname() );
        userResponse.phoneNumber( entity.getPhoneNumber() );
        userResponse.profilePictureUrl( entity.getProfilePictureUrl() );
        if ( entity.getRole() != null ) {
            userResponse.role( entity.getRole().name() );
        }

        userResponse.followersCount( entity.getFollowers().size() );
        userResponse.followingCount( entity.getFollowing().size() );

        return userResponse.build();
    }

    @Override
    public UserBasicResponse toUserBasicResponse(UserEntity entity) {
        if ( entity == null ) {
            return null;
        }

        UserBasicResponse.UserBasicResponseBuilder userBasicResponse = UserBasicResponse.builder();

        userBasicResponse.id( entity.getId() );
        userBasicResponse.name( entity.getName() );
        userBasicResponse.nickname( entity.getNickname() );
        userBasicResponse.profilePictureUrl( entity.getProfilePictureUrl() );

        return userBasicResponse.build();
    }

    @Override
    public void updateUserFromRequest(UserUpdateRequest request, UserEntity entity) {
        if ( request == null ) {
            return;
        }

        entity.setBio( request.getBio() );
        entity.setLastName( request.getLastName() );
        entity.setName( request.getName() );
        entity.setNickname( request.getNickname() );
        entity.setPhoneNumber( request.getPhoneNumber() );
    }
}
