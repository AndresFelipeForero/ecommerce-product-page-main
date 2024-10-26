import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ContactForm } from '../../interfaces/contact-form';
import { NgIf } from '@angular/common';
import { ContactMessageService } from '../../services/contact-message.service';
import { fadeInOut } from '../../animations/fadeInOut';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './contact-page.component.html',
  styleUrl: './contact-page.component.scss',
  animations: [fadeInOut],
})
export class ContactPageComponent {
  private fb = inject(FormBuilder);
  private _contactMessageService = inject(ContactMessageService);
  contactForm!: FormGroup;
  toastr = inject(ToastrService);

  ngOnInit() {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'
          ),
        ],
      ],
      phone: ['', Validators.pattern(/^3\d{9}$/)],
      subject: ['', Validators.required],
      message: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(200),
        ],
      ],
    });
  }

  async onSubmit() {
    if (this.contactForm.valid) {
      try {
        const formData: ContactForm = this.contactForm.value;
        let response = await this._contactMessageService.createContactMessage(
          formData
        );
        this.toastr.success(
          'Nos pondremos en contacto pronto',
          '¡Enviado!'
        );
      } catch (error) {
        let {message} = (error as any).error.error
        this.toastr.error(
          `${message}`,
          'No enviado'
        );
      }
    }
  }
}
