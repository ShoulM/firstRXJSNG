import {Directive, EventEmitter, HostListener, OnDestroy, OnInit, Output} from '@angular/core';
import {Subject, Subscription} from 'rxjs';
import {debounceTime} from 'rxjs/operators';

@Directive({
  selector: '[appThrottling]'
})
export class ThrottlingDirective implements OnInit, OnDestroy{
  @Output() throttling: EventEmitter<string> = new EventEmitter<string>();

  private inputEvent$: Subject<string> = new Subject<string>();

  private subscription: Subscription;

  ngOnInit(): void {
    this.subscription = this.inputEvent$.pipe(debounceTime(1000))
      .subscribe((input) => {
      this.throttling.emit(input);
    });
  }

  @HostListener('input', ['$event.target'])
  onInputEvent(input: HTMLInputElement): any{
      this.inputEvent$.next(input.value);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }



}
