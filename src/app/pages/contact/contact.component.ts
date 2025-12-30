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
contactForm!: FormGroup;

id!: string;

successMessage: string = '';

constructor (private fb: FormBuilder, private contactUsService: ContactUsService){}

ngOnInit(): void {
  this.contactForm = this.fb.group({
     name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      project: [''],
      subject: ['', Validators.required],
      message: ['', Validators.required]
  })
}

onSubmit(){
  if (this.contactForm.valid) {

    const contactForm: ContactForm = {
      name: this.contactForm.value.name,
      email: this.contactForm.value.email,
      phone: this.contactForm.value.phone,
      project: this.contactForm.value.project,
      subject: this.contactForm.value.subject,
      message: this.contactForm.value.message,
      date: new Date().toISOString()

    };

    // send to firebase 
   this.contactUsService.sendDetails(contactForm).subscribe((response) => {
    console.log("saved with id:", response.name);
    console.log(`this is the contact sent to fire base : ${response}`);

    this.id = response.name.toString()

   });
   this.successMessage = 'Your message has been sent successfully!'; 
   this.contactForm.reset();


    
  }else{
    this.contactForm.markAllAsTouched();
     this.successMessage = ''; 
  }
}


}
