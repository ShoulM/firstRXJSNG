import {Directive, ElementRef, EventEmitter, Output} from '@angular/core';
import {fromEvent, Observable} from 'rxjs';
import {debounceTime} from 'rxjs/operators';

@Directive({
  selector: '[appThrottling]'
})
export class ThrottlingDirective {
  @Output() throttling: EventEmitter<string> = new EventEmitter<string>();

  private throttle$: Observable<unknown>;

  constructor(private elementRef: ElementRef) {
    this.throttle$ = fromEvent(elementRef.nativeElement, 'keydown').pipe(
      debounceTime(1000)
    );
    this.throttle$.subscribe(() => {
      const value = elementRef.nativeElement.value;
      this.throttling.emit(value);
    });
  }

}
