import { Component, AfterViewInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-product',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    //  Outer slider
    $('.productList-carousel').owlCarousel({
      loop: true,
      margin: 20,
      nav: true,
      dots: false,
      autoplay: true,
      smartSpeed: 1500,
      autoplayTimeout: 3000,
      autoplayHoverPause: true,
      responsive: {
        0: { items: 1 },
        576: { items: 1 },
        768: { items: 2 },
        992: { items: 3 },
     

       
      }
      
    });

    //  Inner slider
    $('.productImg-carousel').owlCarousel({
      loop: true,
      margin: 0,
      nav: true,
      dots: false,
      autoplay: true,
      smartSpeed: 1000,
      autoplayTimeout: 2500,
      autoplayHoverPause: true,
      items: 1,
      
    });
  }

}
