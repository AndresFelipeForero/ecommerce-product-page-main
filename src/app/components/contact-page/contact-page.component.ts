import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ContactForm } from '../../interfaces/contact-form';
import { NgIf } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './contact-page.component.html',
  styleUrl: './contact-page.component.scss',
  animations: [
    trigger(
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
  ]
})
export class ContactPageComponent {

  private fb = inject(FormBuilder); 
  contactForm!: FormGroup;

  ngOnInit(){
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      subject: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      const formData: ContactForm = this.contactForm.value;
      console.log('Contact form data:', formData);
      // Aquí podrías enviar el formulario a través de un servicio HTTP
    }
  }
}
