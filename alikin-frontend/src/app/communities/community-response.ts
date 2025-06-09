
export interface UserBasicResponse {
  id: number;
  name: string;
  nickname: string;
  profilePictureUrl: string | null;
}


export interface CommunityRadio {
  name: string;
  streamUrl: string;
  logoUrl: string | null;
}


export interface CommunityResponse {
  id: number;
  name: string;
  description: string | null;
  imageUrl: string | null;
  createdAt: string;
  leader: UserBasicResponse;
  membersCount: number;
  userRole: 'LEADER' | 'MEMBER' | 'VISITOR' | null;


  radioPlaylist: CommunityRadio | null;





  radioStationName?: string;
  radioStreamUrl?: string;
  radioStationLogoUrl?: string;

  member?: boolean;

}
