package com.backendalikin.mapper;

import com.backendalikin.dto.request.SongRequest;
import com.backendalikin.dto.response.GenreResponse;
import com.backendalikin.dto.response.SongBasicResponse;
import com.backendalikin.dto.response.SongResponse;
import com.backendalikin.entity.GenreEntity;
import com.backendalikin.entity.SongEntity;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import javax.annotation.processing.Generated;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-06-05T21:19:36+0200",
    comments = "version: 1.5.5.Final, compiler: Eclipse JDT (IDE) 3.42.0.v20250514-1000, environment: Java 21.0.7 (Eclipse Adoptium)"
)
@Component
public class SongMapperImpl implements SongMapper {

    @Autowired
    private UserMapper userMapper;
    @Autowired
    private GenreMapper genreMapper;

    @Override
    public SongResponse toSongResponse(SongEntity entity) {
        if ( entity == null ) {
            return null;
        }

        SongResponse.SongResponseBuilder songResponse = SongResponse.builder();

        songResponse.uploader( userMapper.toUserBasicResponse( entity.getUploader() ) );
        songResponse.genres( genreEntitySetToGenreResponseList( entity.getGenres() ) );
        songResponse.album( entity.getAlbum() );
        songResponse.artist( entity.getArtist() );
        songResponse.coverImageUrl( entity.getCoverImageUrl() );
        songResponse.duration( entity.getDuration() );
        songResponse.id( entity.getId() );
        songResponse.title( entity.getTitle() );
        songResponse.uploadedAt( entity.getUploadedAt() );
        songResponse.url( entity.getUrl() );

        return songResponse.build();
    }

    @Override
    public SongBasicResponse toSongBasicResponse(SongEntity entity) {
        if ( entity == null ) {
            return null;
        }

        SongBasicResponse.SongBasicResponseBuilder songBasicResponse = SongBasicResponse.builder();

        songBasicResponse.artist( entity.getArtist() );
        songBasicResponse.coverImageUrl( entity.getCoverImageUrl() );
        songBasicResponse.duration( entity.getDuration() );
        songBasicResponse.id( entity.getId() );
        songBasicResponse.title( entity.getTitle() );

        return songBasicResponse.build();
    }

    @Override
    public SongEntity toEntity(SongRequest request) {
        if ( request == null ) {
            return null;
        }

        SongEntity.SongEntityBuilder songEntity = SongEntity.builder();

        songEntity.album( request.getAlbum() );
        songEntity.artist( request.getArtist() );
        songEntity.title( request.getTitle() );

        return songEntity.build();
    }

    @Override
    public void updateSongFromRequest(SongRequest request, SongEntity entity) {
        if ( request == null ) {
            return;
        }

        entity.setAlbum( request.getAlbum() );
        entity.setArtist( request.getArtist() );
        entity.setTitle( request.getTitle() );
    }

    protected List<GenreResponse> genreEntitySetToGenreResponseList(Set<GenreEntity> set) {
        if ( set == null ) {
            return null;
        }

        List<GenreResponse> list = new ArrayList<GenreResponse>( set.size() );
        for ( GenreEntity genreEntity : set ) {
            list.add( genreMapper.toGenreResponse( genreEntity ) );
        }

        return list;
    }
}
