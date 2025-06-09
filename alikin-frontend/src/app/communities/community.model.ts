export interface Community {
  id: number;
  name: string;
  description: string;
  imageUrl: string | null;
  createdAt: string | null;
  leader: any;
  membersCount: number;
  userRole: string | null;
  radioPlaylist: any;
  member: boolean;
}
