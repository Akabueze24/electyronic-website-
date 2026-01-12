import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ContactForm } from 'src/app/core/contact-us-model/contact-us-model';
import { ContactUsService } from 'src/app/core/contact-us-model/contact-us.service';

@Component({
  selector: 'app-admin-contact',
  templateUrl: './admin-contact.component.html',
  styleUrls: ['./admin-contact.component.css']
})
export class AdminContactComponent implements OnInit, OnDestroy {

  subscription!: Subscription;
  contacts: ContactForm[] = [];

  // Confirmation dialogs
  showConfirmDialog = false;
  contactToDeleteId: string | null = null;

  showClearAllDialog = false;

  constructor(private contactService: ContactUsService) { }

  ngOnInit(): void {
    console.log('AdminContactComponent initialized');

    this.subscription = this.contactService.getForm().subscribe(response => {
      // Only show contacts that are not soft-deleted
      this.contacts = response.filter(c => !c.deleted);
      console.log('Loaded contacts:', this.contacts);
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
      console.log('Subscription unsubscribed');
    }
  }

  // Open single delete confirmation
  openDeleteDialog(id: string) {
    this.contactToDeleteId = id;
    this.showConfirmDialog = true;
  }

  cancelDialog() {
    this.showConfirmDialog = false;
    this.contactToDeleteId = null;
  }

  confirmDelete() {
    if (this.contactToDeleteId) {
      this.contactService.softDeleteContact(this.contactToDeleteId).subscribe(() => {
        // Remove deleted contact from UI
        this.contacts = this.contacts.filter(c => c.id !== this.contactToDeleteId);
        this.cancelDialog();
        console.log('Contact deleted:', this.contactToDeleteId);
      });
    }
  }

  // Clear all contacts
  openClearAllDialog() {
    this.showClearAllDialog = true;
  }

  cancelClearAll() {
    this.showClearAllDialog = false;
  }

  confirmClearAll() {
    this.contacts.forEach(contact => {
      if (contact.id) {
        this.contactService.softDeleteContact(contact.id).subscribe(() => {
          console.log('Soft-deleted contact:', contact.id);
        });
      }
    });
    this.contacts = [];
    this.showClearAllDialog = false;
  }

}
