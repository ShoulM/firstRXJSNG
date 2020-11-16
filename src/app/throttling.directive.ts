import {Directive, ElementRef, EventEmitter, OnDestroy, Output} from '@angular/core';
import {fromEvent, Observable, Subscription} from 'rxjs';
import {debounceTime} from 'rxjs/operators';

@Directive({
  selector: '[appThrottling]'
})
export class ThrottlingDirective implements OnDestroy{
  @Output() throttling: EventEmitter<string> = new EventEmitter<string>();

  private throttle$: Observable<unknown>;

  private subscription: Subscription;

  constructor(private elementRef: ElementRef) {
    this.throttle$ = fromEvent(elementRef.nativeElement, 'keydown').pipe(
      debounceTime(1000)
    );
    this.subscription = this.throttle$.subscribe(() => {
      const value = elementRef.nativeElement.value;
      this.throttling.emit(value);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
