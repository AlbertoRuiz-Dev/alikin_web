import {SongBasic} from "./song-basic.model";
import {UserBasic} from "./user-basic.model";

export interface PlaylistRequest {
  name: string;
  description?: string;
  public: boolean;
  songIds?: number[];
}


export interface Playlist {
  id: number;
  name: string;
  description?: string;
  coverImageUrl?: string;
  createdAt: string | null;
  public: boolean;
  owner: UserBasic;
  songs: SongBasic[];
}
