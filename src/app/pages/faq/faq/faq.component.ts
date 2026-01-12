import { Component } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent {

  // Dynamic FAQ list
  faqs = [
    {
      question: 'Do you ship internationally?',
      answer: 'Yes! We ship worldwide. Shipping charges and delivery times vary depending on your location.',
      open: true
    },
    {
      question: 'Who should I contact if I have any queries?',
      answer: 'You can contact our support team via email at support@yourelectronicshop.com or call +1 800 789 0000.',
      open: false
    },
    {
      question: 'How do I track my order?',
      answer: 'Once your order is shipped, we will send you a tracking number via email to monitor the delivery.',
      open: false
    },
    {
      question: 'How can I cancel or change my order?',
      answer: 'You can cancel or change your order within 24 hours of placing it by contacting our support team.',
      open: false
    },
    {
      question: 'How can I return a product?',
      answer: 'We offer a 30-day return policy. Products must be unused and in original packaging to be eligible.',
      open: false
    },
    {
      question: 'How long will it take to get my package?',
      answer: 'Delivery times depend on your location. Domestic orders usually arrive within 3-7 business days, international orders take 7-21 days.',
      open: false
    },
    {
      question: 'What shipping methods are available?',
      answer: 'We offer standard, express, and overnight shipping. Available options will be shown at checkout.',
      open: false
    },
    {
      question: 'Do you provide any warranty?',
      answer: 'Yes, most electronics come with a 1-year manufacturer warranty. Check the product page for details.',
      open: false
    },
    {
      question: 'Do you have a replacement guarantee?',
      answer: 'Yes! If your product arrives damaged or defective, we provide a replacement at no extra cost within 30 days.',
      open: false
    }
  ];

  // Toggle a panel
  toggle(faq: any) {
    faq.open = !faq.open;
  }
}
