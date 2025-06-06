package com.backendalikin.mapper;

import com.backendalikin.dto.request.PlaylistRequest;
import com.backendalikin.dto.response.PlaylistBasicResponse;
import com.backendalikin.dto.response.PlaylistResponse;
import com.backendalikin.dto.response.SongBasicResponse;
import com.backendalikin.entity.PlaylistEntity;
import com.backendalikin.entity.SongEntity;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-06-05T21:19:36+0200",
    comments = "version: 1.5.5.Final, compiler: Eclipse JDT (IDE) 3.42.0.v20250514-1000, environment: Java 21.0.7 (Eclipse Adoptium)"
)
@Component
public class PlaylistMapperImpl implements PlaylistMapper {

    @Autowired
    private UserMapper userMapper;
    @Autowired
    private SongMapper songMapper;

    @Override
    public PlaylistResponse toPlaylistResponse(PlaylistEntity entity) {
        if ( entity == null ) {
            return null;
        }

        PlaylistResponse.PlaylistResponseBuilder playlistResponse = PlaylistResponse.builder();

        playlistResponse.owner( userMapper.toUserBasicResponse( entity.getOwner() ) );
        playlistResponse.songs( songEntityListToSongBasicResponseList( entity.getSongs() ) );
        playlistResponse.isPublic( entity.isPublic() );
        playlistResponse.coverImageUrl( entity.getCoverImageUrl() );
        playlistResponse.createdAt( entity.getCreatedAt() );
        playlistResponse.description( entity.getDescription() );
        playlistResponse.id( entity.getId() );
        playlistResponse.name( entity.getName() );

        return playlistResponse.build();
    }

    @Override
    public PlaylistBasicResponse toPlaylistBasicResponse(PlaylistEntity entity) {
        if ( entity == null ) {
            return null;
        }

        PlaylistBasicResponse.PlaylistBasicResponseBuilder playlistBasicResponse = PlaylistBasicResponse.builder();

        playlistBasicResponse.coverImageUrl( entity.getCoverImageUrl() );
        playlistBasicResponse.id( entity.getId() );
        playlistBasicResponse.name( entity.getName() );

        return playlistBasicResponse.build();
    }

    @Override
    public PlaylistEntity toEntity(PlaylistRequest request) {
        if ( request == null ) {
            return null;
        }

        PlaylistEntity.PlaylistEntityBuilder playlistEntity = PlaylistEntity.builder();

        playlistEntity.coverImageUrl( request.getCoverImageUrl() );
        playlistEntity.description( request.getDescription() );
        playlistEntity.name( request.getName() );

        return playlistEntity.build();
    }

    @Override
    public void updatePlaylistFromRequest(PlaylistRequest request, PlaylistEntity entity) {
        if ( request == null ) {
            return;
        }

        entity.setCoverImageUrl( request.getCoverImageUrl() );
        entity.setDescription( request.getDescription() );
        entity.setName( request.getName() );
        entity.setPublic( request.isPublic() );
    }

    protected List<SongBasicResponse> songEntityListToSongBasicResponseList(List<SongEntity> list) {
        if ( list == null ) {
            return null;
        }

        List<SongBasicResponse> list1 = new ArrayList<SongBasicResponse>( list.size() );
        for ( SongEntity songEntity : list ) {
            list1.add( songMapper.toSongBasicResponse( songEntity ) );
        }

        return list1;
    }
}
