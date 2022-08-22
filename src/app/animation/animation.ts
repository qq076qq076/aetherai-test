import { animate, state, style, transition, trigger } from "@angular/animations";

export const showAnimation =
  trigger('visibilityChanged', [
    state('*',
      style({
        transform: 'scaleY(1)',
        display: 'block',
        'transform-origin': 'top',
      })
    ),
    state('void',
      style({
        transform: 'scaleY(0)',
        display: 'block',
        'transform-origin': 'top',
      })
    ),
    transition('* => void', animate('300ms')),
    transition('void => *', animate('300ms'))
  ]);
