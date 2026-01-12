import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ContactForm } from './contact-us-model';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactUsService {

  constructor() { }

  private api = "https://electro-884dc-default-rtdb.firebaseio.com/contact-us.json";

  private http = inject(HttpClient)




  // sending form to fire base
  getForm(): Observable<ContactForm[]> {
    const headers = new HttpHeaders({ headers: "contactUs" })
    return this.http.get<{ [key: string]: ContactForm }>(this.api, { headers: headers }).pipe(
      map((response: { [key: string]: ContactForm }) => {
        const forms: ContactForm[] = [];

        for (const key in response) {
          if (response.hasOwnProperty(key)) {
            const entry = response[key];
            const withId = { ...entry, id: key } as ContactForm;
            forms.push(withId);
          }
        }

        return forms;
      })

    )
  }


  sendDetails(data: any): Observable<any> {
    return this.http.post(this.api, data);
  }


  // Soft delete an order
  // Soft delete a specific contact
softDeleteContact(id: string): Observable<any> {
  const url = `https://electro-884dc-default-rtdb.firebaseio.com/contact-us/${id}.json`;
  return this.http.patch(url, { deleted: true });
}

  // ending
}
