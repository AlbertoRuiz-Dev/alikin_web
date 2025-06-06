package com.backendalikin.mapper;

import com.backendalikin.dto.request.CommunityRequest;
import com.backendalikin.dto.response.CommunityBasicResponse;
import com.backendalikin.dto.response.CommunityResponse;
import com.backendalikin.entity.CommunityEntity;
import javax.annotation.processing.Generated;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-06-06T14:30:18+0200",
    comments = "version: 1.5.5.Final, compiler: Eclipse JDT (IDE) 3.42.0.v20250514-1000, environment: Java 21.0.7 (Eclipse Adoptium)"
)
@Component
public class CommunityMapperImpl implements CommunityMapper {

    @Autowired
    private UserMapper userMapper;
    @Autowired
    private PlaylistMapper playlistMapper;

    @Override
    public CommunityResponse toCommunityResponse(CommunityEntity entity) {
        if ( entity == null ) {
            return null;
        }

        CommunityResponse.CommunityResponseBuilder communityResponse = CommunityResponse.builder();

        communityResponse.leader( userMapper.toUserBasicResponse( entity.getLeader() ) );
        communityResponse.radioPlaylist( playlistMapper.toPlaylistBasicResponse( entity.getRadioPlaylist() ) );
        communityResponse.createdAt( entity.getCreatedAt() );
        communityResponse.description( entity.getDescription() );
        communityResponse.id( entity.getId() );
        communityResponse.imageUrl( entity.getImageUrl() );
        communityResponse.name( entity.getName() );
        communityResponse.radioStationLogoUrl( entity.getRadioStationLogoUrl() );
        communityResponse.radioStationName( entity.getRadioStationName() );
        communityResponse.radioStreamUrl( entity.getRadioStreamUrl() );

        communityResponse.membersCount( entity.getMembers().size() );

        return communityResponse.build();
    }

    @Override
    public CommunityBasicResponse toCommunityBasicResponse(CommunityEntity entity) {
        if ( entity == null ) {
            return null;
        }

        CommunityBasicResponse.CommunityBasicResponseBuilder communityBasicResponse = CommunityBasicResponse.builder();

        communityBasicResponse.id( entity.getId() );
        communityBasicResponse.name( entity.getName() );

        return communityBasicResponse.build();
    }

    @Override
    public CommunityEntity toEntity(CommunityRequest request) {
        if ( request == null ) {
            return null;
        }

        CommunityEntity.CommunityEntityBuilder communityEntity = CommunityEntity.builder();

        communityEntity.description( request.getDescription() );
        communityEntity.imageUrl( request.getImageUrl() );
        communityEntity.name( request.getName() );

        return communityEntity.build();
    }

    @Override
    public void updateCommunityFromRequest(CommunityRequest request, CommunityEntity entity) {
        if ( request == null ) {
            return;
        }

        entity.setDescription( request.getDescription() );
        entity.setImageUrl( request.getImageUrl() );
    }
}
