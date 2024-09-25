import { trigger, transition, style, animate } from '@angular/animations';

export const fadeInOut = trigger(
    'enterAnimation', [
      transition(':enter', [
        style({transform: 'translateX(12px)', opacity: 0}),
        animate('300ms', style({transform: 'translateX(0)', opacity: 1}))
      ]),
      transition(':leave', [
        style({transform: 'translateX(0)', opacity: 1}),
        animate('300ms', style({transform: 'translateX(12px)', opacity: 0}))
      ])
    ]
  )