import { Directive, ElementRef, HostListener, Renderer2, OnInit } from '@angular/core';

@Directive({
  selector: '[appDraggable]',
  standalone: true,
})
export class DraggableDirective implements OnInit {
  private isDragging = false;
  private offsetX = 0;
  private offsetY = 0;

  private currentTop: number | null = null;
  private currentLeft: number | null = null;

  constructor(private el: ElementRef<HTMLElement>, private renderer: Renderer2) {}

  ngOnInit() {
    this.renderer.setStyle(this.el.nativeElement, 'cursor', 'grab');
    this.renderer.setStyle(this.el.nativeElement, 'userSelect', 'none');
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {

    const targetTagName = (event.target as HTMLElement).tagName.toLowerCase();
    if (event.button === 0 && !['input', 'textarea', 'button', 'select', 'label', 'img'].includes(targetTagName) &&
      !(event.target as HTMLElement).closest('button, input, textarea, select, label, img')
    ) {
      event.preventDefault();

      this.isDragging = true;
      this.renderer.setStyle(this.el.nativeElement, 'cursor', 'grabbing');

      const rect = this.el.nativeElement.getBoundingClientRect();

      if (this.currentTop === null || this.currentLeft === null) {
        this.currentTop = rect.top;
        this.currentLeft = rect.left;


        this.renderer.setStyle(this.el.nativeElement, 'top', `${this.currentTop}px`);
        this.renderer.setStyle(this.el.nativeElement, 'left', `${this.currentLeft}px`);
        this.renderer.setStyle(this.el.nativeElement, 'bottom', 'auto');
        this.renderer.setStyle(this.el.nativeElement, 'right', 'auto');
        this.renderer.setStyle(this.el.nativeElement, 'transform', 'none');
      }

      this.offsetX = event.clientX - this.currentLeft;
      this.offsetY = event.clientY - this.currentTop;
    }
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (!this.isDragging) {
      return;
    }
    event.preventDefault();

    let newLeft = event.clientX - this.offsetX;
    let newTop = event.clientY - this.offsetY;

    const elementRect = this.el.nativeElement.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    if (newLeft < 0) newLeft = 0;
    if (newTop < 0) newTop = 0;
    if (newLeft + elementRect.width > viewportWidth) newLeft = viewportWidth - elementRect.width;
    if (newTop + elementRect.height > viewportHeight) newTop = viewportHeight - elementRect.height;


    this.currentLeft = newLeft;
    this.currentTop = newTop;

    this.renderer.setStyle(this.el.nativeElement, 'left', `${this.currentLeft}px`);
    this.renderer.setStyle(this.el.nativeElement, 'top', `${this.currentTop}px`);
  }

  @HostListener('window:mouseup', ['$event'])
  onMouseUp(event: MouseEvent) {
    if (this.isDragging) {
      this.isDragging = false;
      this.renderer.setStyle(this.el.nativeElement, 'cursor', 'grab');
    }
  }

  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent) {
    const targetTagName = (event.target as HTMLElement).tagName.toLowerCase();
    if (!['input', 'textarea', 'button', 'select', 'label', 'img'].includes(targetTagName) &&
      !(event.target as HTMLElement).closest('button, input, textarea, select, label, img')
    ) {

      this.isDragging = true;
      this.renderer.setStyle(this.el.nativeElement, 'cursor', 'grabbing');

      const touch = event.touches[0];
      const rect = this.el.nativeElement.getBoundingClientRect();

      if (this.currentTop === null || this.currentLeft === null) {
        this.currentTop = rect.top;
        this.currentLeft = rect.left;
        this.renderer.setStyle(this.el.nativeElement, 'top', `${this.currentTop}px`);
        this.renderer.setStyle(this.el.nativeElement, 'left', `${this.currentLeft}px`);
        this.renderer.setStyle(this.el.nativeElement, 'bottom', 'auto');
        this.renderer.setStyle(this.el.nativeElement, 'right', 'auto');
        this.renderer.setStyle(this.el.nativeElement, 'transform', 'none');
      }

      this.offsetX = touch.clientX - this.currentLeft;
      this.offsetY = touch.clientY - this.currentTop;
    }
  }

  @HostListener('window:touchmove', ['$event'])
  onTouchMove(event: TouchEvent) {
    if (!this.isDragging) {
      return;
    }
    event.preventDefault();


    const touch = event.touches[0];
    let newLeft = touch.clientX - this.offsetX;
    let newTop = touch.clientY - this.offsetY;

    const elementRect = this.el.nativeElement.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    if (newLeft < 0) newLeft = 0;
    if (newTop < 0) newTop = 0;
    if (newLeft + elementRect.width > viewportWidth) newLeft = viewportWidth - elementRect.width;
    if (newTop + elementRect.height > viewportHeight) newTop = viewportHeight - elementRect.height;

    this.currentLeft = newLeft;
    this.currentTop = newTop;

    this.renderer.setStyle(this.el.nativeElement, 'left', `${this.currentLeft}px`);
    this.renderer.setStyle(this.el.nativeElement, 'top', `${this.currentTop}px`);
  }

  @HostListener('window:touchend', ['$event'])
  onTouchEnd(event: TouchEvent) {
    if (this.isDragging) {
      this.isDragging = false;
      this.renderer.setStyle(this.el.nativeElement, 'cursor', 'grab');
    }
  }
}
