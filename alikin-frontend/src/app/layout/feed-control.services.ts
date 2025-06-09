import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedControlService {
  private loadMoreRequest = new Subject<void>();
  loadMoreRequest$ = this.loadMoreRequest.asObservable();

  private isLoading = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoading.asObservable();

  private hasMorePosts = new BehaviorSubject<boolean>(true);
  hasMorePosts$ = this.hasMorePosts.asObservable();

  constructor() { }


  requestLoadMore(): void {
    this.loadMoreRequest.next();
  }


  setLoading(loading: boolean): void {
    this.isLoading.next(loading);
  }

  setHasMore(hasMore: boolean): void {
    this.hasMorePosts.next(hasMore);
  }
}
