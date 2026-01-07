import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactForm } from 'src/app/core/contact-us-model/contact-us-model';
import { ContactUsService } from 'src/app/core/contact-us-model/contact-us.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  /* -------------------- FORM -------------------- */
  contactForm!: FormGroup;

  /* -------------------- STATE -------------------- */
  id!: string;                     // Firebase document ID
  successMessage: string = '';     // UI success feedback

  constructor(
    private fb: FormBuilder,
    private contactUsService: ContactUsService
  ) {}

  /* ==================== LIFECYCLE ==================== */
  ngOnInit(): void {
    console.log('[Contact] Initializing contact form');

    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      project: [''],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  /* ==================== SUBMIT ==================== */
  onSubmit(): void {
    console.log('[Contact] Form submit triggered');

    if (this.contactForm.valid) {

      // Build contact payload
      const contactForm: ContactForm = {
        name: this.contactForm.value.name,
        email: this.contactForm.value.email,
        phone: this.contactForm.value.phone,
        project: this.contactForm.value.project,
        subject: this.contactForm.value.subject,
        message: this.contactForm.value.message,
        date: new Date().toISOString()
      };

      console.log('[Contact] Payload prepared:', contactForm);

      // Send to Firebase
      this.contactUsService.sendDetails(contactForm).subscribe({
        next: (response) => {
          console.log('[Contact] Saved successfully with ID:', response.name);
          this.id = response.name.toString();
        },
        error: (err) => {
          console.error('[Contact] Error sending message:', err);
        }
      });

      // UI feedback
      this.successMessage = 'Your message has been sent successfully!';
      this.contactForm.reset();

    } else {
      console.warn('[Contact] Form invalid – marking all fields as touched');

      this.contactForm.markAllAsTouched();
      this.successMessage = '';
    }
  }
}
