import { Song } from "../songs/song.model";
import {Comment} from "../comment/comment.model";
export interface PostResponse {
  id: number;
  content: string;
  imageUrl?: string | null;
  song?: Song | null;
  user: {
    id: number;
    name: string;
    nickname: string;
    profilePictureUrl?: string | null;
  };
  community?: {
    id: number;
    name: string;
  } | null;
  createdAt: string;
  voteCount: number;
  userVote: number;
  commentsCount: number;
  isHighlighted?: boolean;
  isExpanded?: boolean;
  uiShowComments?: boolean;
  uiComments: Comment[];
  uiIsLoadingComments?: boolean;
  uiCommentsError?: string | null;
  uiIsSubmittingComment?: boolean;
  uiSubmitCommentError?: string | null
}

export interface Page<T> {
  content: T[];
  pageable: {
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    unpaged: boolean;
  };
  last: boolean;
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}
