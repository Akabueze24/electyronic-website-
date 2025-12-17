import {  Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-your-component',
  templateUrl: './bestseller.component.html',
})
export class BestsellerComponent implements OnInit {

  ngOnInit(): void {
     $('.productList-carousel').owlCarousel({
      loop: true,
      margin: 20,
      nav: true,
      dots: false,
      autoplay: true,
      smartSpeed: 1500,
      autoplayHoverPause: true,
      autoplayTimeout: 3000,
      responsive: {
        0: { items: 1 },
        576: { items: 2 },
        992: { items: 3 }
      }
    });
  }
  }

   

