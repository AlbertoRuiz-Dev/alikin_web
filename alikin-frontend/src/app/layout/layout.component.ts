

import { Component, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, NavigationEnd, Event as RouterEvent, ActivatedRouteSnapshot, Scroll } from '@angular/router';
import { filter, takeUntil, tap, map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { FeedControlService } from './feed-control.services';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, OnDestroy {
  isFeedRouteActive = false;
  private destroy$ = new Subject<void>();

  isFeedLoading: boolean = false;
  feedHasMorePosts: boolean = true;

  constructor(
    private router: Router,
    private feedControlService: FeedControlService,
    private cdr: ChangeDetectorRef
  ) {}

  private getRouteData(route: ActivatedRouteSnapshot): any {
    while (route.firstChild) {
      route = route.firstChild;
    }
    return route.data;
  }

  ngOnInit(): void {

    this.router.events.pipe(
      filter((event: RouterEvent): event is NavigationEnd =>
        event instanceof NavigationEnd || (event instanceof Scroll && event.routerEvent instanceof NavigationEnd)
      ),
      map((event: RouterEvent) => {

        const navigationEndEvent = (event instanceof Scroll) ? event.routerEvent : event;
        return navigationEndEvent as NavigationEnd;
      }),
      map((event: NavigationEnd) => {
        const currentRouteData = this.getRouteData(this.router.routerState.snapshot.root);
        const newIsFeedActive = currentRouteData?.pageType === 'feed';
        return newIsFeedActive;
      }),
      takeUntil(this.destroy$)
    ).subscribe((calculatedIsFeedActive: boolean) => {
      if (this.isFeedRouteActive !== calculatedIsFeedActive) {
        this.isFeedRouteActive = calculatedIsFeedActive;
        this.cdr.detectChanges();
      } else {
        if(this.isFeedRouteActive && calculatedIsFeedActive) {
        }
      }

      if (!this.isFeedRouteActive) {
        this.feedControlService.setLoading(false);
        this.feedControlService.setHasMore(true);
      }
    });


    this.feedControlService.isLoading$
      .pipe(takeUntil(this.destroy$))
      .subscribe(loading => {
        if (this.isFeedLoading !== loading) {
          this.isFeedLoading = loading;
          this.cdr.detectChanges();
        }
      });

    this.feedControlService.hasMorePosts$
      .pipe(takeUntil(this.destroy$))
      .subscribe(hasMore => {
        if (this.feedHasMorePosts !== hasMore) {
          this.feedHasMorePosts = hasMore;
          this.cdr.detectChanges();
        }
      });
  }

  onFeedAreaScrolled(): void {
    if (this.isFeedRouteActive && !this.isFeedLoading && this.feedHasMorePosts) {
      this.feedControlService.requestLoadMore();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
