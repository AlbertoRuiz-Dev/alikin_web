export interface UserProfile {
  id: number;
  name?: string | null;
  lastName?: string | null;
  nickname?: string;
  profilePictureUrl?: string | null;
  removeProfilePicture?: boolean;
  phoneNumber?: string | null;
  birthDate?: string | Date | null;
  bio?: string | null;
  createdAt?: Date | string | null;
}
export interface UserProfileUpdate {
  name?: string | null;
  lastName?: string | null;
  nickname?: string;
  profilePictureFile?: File | null;
  removeProfilePicture?: boolean;
  phoneNumber?: string | null;
  birthDate?: string | Date | null;
  bio?: string | null;
}
