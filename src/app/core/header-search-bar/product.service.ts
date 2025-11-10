import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';


export interface Product {
  id: number;
  name: string;
  category: 'accessories' | 'electronics' | 'laptops' | 'tablets' | 'smartphones' | 'smart tv';
  color: string;
  currentprice: number;
  prevprice: number;
  location: string;
  amount: number;
  description: string;
  detailed_description: string;
  reviews: Array<{
    user: string;
    comment: string;
    rating: number;
  }>;
  images: string[];
  rating: number;
  quantity?: number;
}

@Injectable({
  providedIn: 'root'
})

 




export class ProductService {
 

  private products: Product[] = [
    {
      id: 1,
      name: "Apple iPhone 14 Pro",
      category: "smartphones",
      color: "Space Black",
      currentprice: 999.99,
      prevprice: 1099.99,
      location: "USA",
      amount: 50,
      description: "Latest iPhone with A16 Bionic chip and advanced camera system.",
      detailed_description: "The iPhone 14 Pro features a 6.1-inch Super Retina XDR display, A16 Bionic chip, and a triple-camera system with 48MP main sensor. Supports 5G and iOS 16.",
      reviews: [
        { user: "John D.", comment: "Amazing camera quality!", rating: 5 },
        { user: "Sarah K.", comment: "Battery life could be better.", rating: 4 }
      ],
      images: [
        "https://example.com/iphone14pro_black1.jpg",
        "https://example.com/iphone14pro_black2.jpg",
        "https://example.com/iphone14pro_black3.jpg",
        "https://example.com/iphone14pro_black4.jpg"
      ],
      rating: 4.8
    },
    {
      id: 2,
      name: "Samsung Galaxy S23 Ultra",
      category: "smartphones",
      color: "Phantom Black",
      currentprice: 1199.99,
      prevprice: 1299.99,
      location: "South Korea",
      amount: 30,
      description: "Flagship smartphone with S Pen and 200MP camera.",
      detailed_description: "The Galaxy S23 Ultra boasts a 6.8-inch Dynamic AMOLED 2X display, Snapdragon 8 Gen 2, and a 200MP main camera. Includes S Pen and 5G support.",
      reviews: [
        { user: "Mike L.", comment: "Love the S Pen functionality!", rating: 5 },
        { user: "Emma T.", comment: "Bit pricey but worth it.", rating: 4 }
      ],
      images: [
        "https://example.com/galaxys23ultra_black1.jpg",
        "https://example.com/galaxys23ultra_black2.jpg",
        "https://example.com/galaxys23ultra_black3.jpg",
        "https://example.com/galaxys23ultra_black4.jpg"
      ],
      rating: 4.7
    },
    {
      id: 3,
      name: "Dell XPS 13",
      category: "laptops",
      color: "Silver",
      currentprice: 1299.99,
      prevprice: 1399.99,
      location: "USA",
      amount: 20,
      description: "Compact and powerful ultrabook for professionals.",
      detailed_description: "The Dell XPS 13 features a 13.4-inch 4K UHD+ display, Intel Core i7-1255U, 16GB RAM, and 512GB SSD. Perfect for productivity and portability.",
      reviews: [
        { user: "Alice B.", comment: "Super lightweight and fast!", rating: 5 },
        { user: "Tom R.", comment: "Screen is stunning.", rating: 4 }
      ],
      images: [
        "https://example.com/xps13_silver1.jpg",
        "https://example.com/xps13_silver2.jpg",
        "https://example.com/xps13_silver3.jpg",
        "https://example.com/xps13_silver4.jpg"
      ],
      rating: 4.6
    },
    {
      id: 4,
      name: "Sony WH-1000XM5",
      category: "accessories",
      color: "Black",
      currentprice: 349.99,
      prevprice: 399.99,
      location: "Japan",
      amount: 100,
      description: "Industry-leading noise-canceling headphones.",
      detailed_description: "Sony WH-1000XM5 offers superior noise cancellation, 30-hour battery life, and high-resolution audio. Ideal for music lovers and travelers.",
      reviews: [
        { user: "Chris P.", comment: "Best headphones I’ve owned!", rating: 5 },
        { user: "Lisa M.", comment: "Comfortable for long use.", rating: 4 }
      ],
      images: [
        "https://example.com/wh1000xm5_black1.jpg",
        "https://example.com/wh1000xm5_black2.jpg",
        "https://example.com/wh1000xm5_black3.jpg",
        "https://example.com/wh1000xm5_black4.jpg"
      ],
      rating: 4.9
    },
    {
      id: 5,
      name: "Samsung QN90B 55-inch",
      category: "smart tv",
      color: "Black",
      currentprice: 1499.99,
      prevprice: 1799.99,
      location: "South Korea",
      amount: 15,
      description: "4K QLED smart TV with vibrant colors.",
      detailed_description: "The Samsung QN90B features a 55-inch 4K QLED display, Quantum HDR 32X, and Tizen OS for seamless streaming and gaming.",
      reviews: [
        { user: "David S.", comment: "Picture quality is unreal!", rating: 5 },
        { user: "Anna G.", comment: "Sound could be better.", rating: 4 }
      ],
      images: [
        "https://example.com/qn90b_black1.jpg",
        "https://example.com/qn90b_black2.jpg",
        "https://example.com/qn90b_black3.jpg",
        "https://example.com/qn90b_black4.jpg"
      ],
      rating: 4.7
    },
    {
      id: 6,
      name: "Apple iPad Pro 12.9",
      category: "tablets",
      color: "Space Gray",
      currentprice: 1099.99,
      prevprice: 1199.99,
      location: "USA",
      amount: 25,
      description: "Powerful tablet with M2 chip.",
      detailed_description: "The iPad Pro 12.9-inch features the M2 chip, Liquid Retina XDR display, and supports Apple Pencil 2. Ideal for creatives and professionals.",
      reviews: [
        { user: "Emily W.", comment: "Perfect for digital art!", rating: 5 },
        { user: "Mark H.", comment: "Pricey but powerful.", rating: 4 }
      ],
      images: [
        "https://example.com/ipadpro_spacegray1.jpg",
        "https://example.com/ipadpro_spacegray2.jpg",
        "https://example.com/ipadpro_spacegray3.jpg",
        "https://example.com/ipadpro_spacegray4.jpg"
      ],
      rating: 4.8
    },
    {
      id: 7,
      name: "Logitech MX Master 3",
      category: "accessories",
      color: "Graphite",
      currentprice: 99.99,
      prevprice: 129.99,
      location: "Switzerland",
      amount: 80,
      description: "Advanced wireless mouse for productivity.",
      detailed_description: "The Logitech MX Master 3 offers ergonomic design, hyper-fast scrolling, and multi-device connectivity. Perfect for professionals.",
      reviews: [
        { user: "James T.", comment: "Super comfortable mouse!", rating: 5 },
        { user: "Rachel K.", comment: "Great for multitasking.", rating: 4 }
      ],
      images: [
        "https://example.com/mxmaster3_graphite1.jpg",
        "https://example.com/mxmaster3_graphite2.jpg",
        "https://example.com/mxmaster3_graphite3.jpg",
        "https://example.com/mxmaster3_graphite4.jpg"
      ],
      rating: 4.7
    },
    {
      id: 8,
      name: "HP Spectre x360 14",
      category: "laptops",
      color: "Nightfall Black",
      currentprice: 1399.99,
      prevprice: 1599.99,
      location: "USA",
      amount: 18,
      description: "Convertible laptop with stunning OLED display.",
      detailed_description: "The HP Spectre x360 14 features a 13.5-inch OLED display, Intel Core i7-1255U, 16GB RAM, and 1TB SSD. Great for creators and professionals.",
      reviews: [
        { user: "Laura B.", comment: "Love the 2-in-1 design!", rating: 5 },
        { user: "Sam P.", comment: "Battery life is decent.", rating: 4 }
      ],
      images: [
        "https://example.com/spectrex360_black1.jpg",
        "https://example.com/spectrex360_black2.jpg",
        "https://example.com/spectrex360_black3.jpg",
        "https://example.com/spectrex360_black4.jpg"
      ],
      rating: 4.6
    },
    {
      id: 9,
      name: "Google Pixel 8",
      category: "smartphones",
      color: "Obsidian",
      currentprice: 699.99,
      prevprice: 799.99,
      location: "USA",
      amount: 40,
      description: "Google’s latest smartphone with AI features.",
      detailed_description: "The Google Pixel 8 features a 6.2-inch OLED display, Tensor G3 chip, and advanced AI-powered camera system. Supports 5G and Android 14.",
      reviews: [
        { user: "Tom W.", comment: "Camera is phenomenal!", rating: 5 },
        { user: "Clara S.", comment: "Smooth software experience.", rating: 4 }
      ],
      images: [
        "https://example.com/pixel8_obsidian1.jpg",
        "https://example.com/pixel8_obsidian2.jpg",
        "https://example.com/pixel8_obsidian3.jpg",
        "https://example.com/pixel8_obsidian4.jpg"
      ],
      rating: 4.7
    },
    {
      id: 10,
      name: "LG OLED C3 65-inch",
      category: "smart tv",
      color: "Black",
      currentprice: 1999.99,
      prevprice: 2299.99,
      location: "South Korea",
      amount: 12,
      description: "Premium OLED TV with stunning visuals.",
      detailed_description: "The LG OLED C3 65-inch features a 4K OLED display, α9 Gen6 AI Processor, and Dolby Vision. Perfect for cinematic experiences.",
      reviews: [
        { user: "Peter M.", comment: "Best TV I’ve ever owned!", rating: 5 },
        { user: "Sophie L.", comment: "Setup was a bit tricky.", rating: 4 }
      ],
      images: [
        "https://example.com/oledc3_black1.jpg",
        "https://example.com/oledc3_black2.jpg",
        "https://example.com/oledc3_black3.jpg",
        "https://example.com/oledc3_black4.jpg"
      ],
      rating: 4.8
    },
    {
      id: 11,
      name: "Apple MacBook Pro 16 M2",
      category: "laptops",
      color: "Space Gray",
      currentprice: 2499.99,
      prevprice: 2699.99,
      location: "USA",
      amount: 15,
      description: "High-performance laptop for professionals and creatives.",
      detailed_description: "The MacBook Pro 16-inch features the M2 Max chip, 32GB RAM, 1TB SSD, and a 16.2-inch Liquid Retina XDR display. Ideal for video editing and coding.",
      reviews: [
        { user: "Michael C.", comment: "Blazing fast performance!", rating: 5 },
        { user: "Nina R.", comment: "A bit heavy but powerful.", rating: 4 }
      ],
      images: [
        "https://example.com/macbookpro16_spacegray1.jpg",
        "https://example.com/macbookpro16_spacegray2.jpg",
        "https://example.com/macbookpro16_spacegray3.jpg",
        "https://example.com/macbookpro16_spacegray4.jpg"
      ],
      rating: 4.8
    },
    {
      id: 12,
      name: "Anker PowerCore 20000",
      category: "accessories",
      color: "Black",
      currentprice: 49.99,
      prevprice: 59.99,
      location: "China",
      amount: 120,
      description: "Portable power bank with high capacity.",
      detailed_description: "The Anker PowerCore 20000 offers 20,000mAh capacity, PowerIQ technology, and USB-C input/output. Perfect for charging smartphones and tablets on the go.",
      reviews: [
        { user: "Sophie B.", comment: "Charges my phone multiple times!", rating: 5 },
        { user: "Liam T.", comment: "Compact and reliable.", rating: 4 }
      ],
      images: [
        "https://example.com/powercore20000_black1.jpg",
        "https://example.com/powercore20000_black2.jpg",
        "https://example.com/powercore20000_black3.jpg",
        "https://example.com/powercore20000_black4.jpg"
      ],
      rating: 4.7
    },
    {
      id: 13,
      name: "Samsung Galaxy Tab S9",
      category: "tablets",
      color: "Graphite",
      currentprice: 799.99,
      prevprice: 899.99,
      location: "South Korea",
      amount: 30,
      description: "Premium tablet with AMOLED display.",
      detailed_description: "The Galaxy Tab S9 features an 11-inch Dynamic AMOLED 2X display, Snapdragon 8 Gen 2, 12GB RAM, and 256GB storage. Supports S Pen and DeX mode.",
      reviews: [
        { user: "Ella M.", comment: "Great for work and entertainment!", rating: 5 },
        { user: "Jack P.", comment: "S Pen is a game-changer.", rating: 4 }
      ],
      images: [
        "https://example.com/galaxytabs9_graphite1.jpg",
        "https://example.com/galaxytabs9_graphite2.jpg",
        "https://example.com/galaxytabs9_graphite3.jpg",
        "https://example.com/galaxytabs9_graphite4.jpg"
      ],
      rating: 4.7
    },
    {
      id: 14,
      name: "ASUS ROG Strix G16",
      category: "laptops",
      color: "Black",
      currentprice: 1599.99,
      prevprice: 1799.99,
      location: "Taiwan",
      amount: 10,
      description: "Powerful gaming laptop with high refresh rate.",
      detailed_description: "The ASUS ROG Strix G16 features a 16-inch QHD 165Hz display, Intel Core i9-13980HX, NVIDIA RTX 4070, 16GB RAM, and 1TB SSD. Ideal for gamers.",
      reviews: [
        { user: "Ryan S.", comment: "Runs games smoothly!", rating: 5 },
        { user: "Olivia K.", comment: "Fans are a bit loud.", rating: 4 }
      ],
      images: [
        "https://example.com/rogstrixg16_black1.jpg",
        "https://example.com/rogstrixg16_black2.jpg",
        "https://example.com/rogstrixg16_black3.jpg",
        "https://example.com/rogstrixg16_black4.jpg"
      ],
      rating: 4.6
    },
    {
      id: 15,
      name: "Sony Bravia XR A80J 55-inch",
      category: "smart tv",
      color: "Black",
      currentprice: 1799.99,
      prevprice: 1999.99,
      location: "Japan",
      amount: 8,
      description: "OLED TV with immersive sound and visuals.",
      detailed_description: "The Sony Bravia XR A80J 55-inch features a 4K OLED display, Cognitive Processor XR, and Dolby Atmos. Perfect for movies and gaming.",
      reviews: [
        { user: "Lucas W.", comment: "Incredible picture quality!", rating: 5 },
        { user: "Mia T.", comment: "Remote could be better.", rating: 4 }
      ],
      images: [
        "https://example.com/braviaa80j_black1.jpg",
        "https://example.com/braviaa80j_black2.jpg",
        "https://example.com/braviaa80j_black3.jpg",
        "https://example.com/braviaa80j_black4.jpg"
      ],
      rating: 4.8
    },
    {
      id: 16,
      name: "Xiaomi 13 Pro",
      category: "smartphones",
      color: "Ceramic White",
      currentprice: 899.99,
      prevprice: 999.99,
      location: "China",
      amount: 35,
      description: "Flagship smartphone with Leica camera.",
      detailed_description: "The Xiaomi 13 Pro features a 6.73-inch AMOLED display, Snapdragon 8 Gen 2, and a Leica-tuned triple-camera system. Supports 120W fast charging and 5G.",
      reviews: [
        { user: "Henry L.", comment: "Camera is top-notch!", rating: 5 },
        { user: "Grace F.", comment: "Battery charges super fast.", rating: 4 }
      ],
      images: [
        "https://example.com/xiaomi13pro_white1.jpg",
        "https://example.com/xiaomi13pro_white2.jpg",
        "https://example.com/xiaomi13pro_white3.jpg",
        "https://example.com/xiaomi13pro_white4.jpg"
      ],
      rating: 4.7
    },
    {
      id: 17,
      name: "JBL Flip 6",
      category: "accessories",
      color: "Blue",
      currentprice: 129.99,
      prevprice: 149.99,
      location: "USA",
      amount: 90,
      description: "Portable Bluetooth speaker with powerful sound.",
      detailed_description: "The JBL Flip 6 offers IP67 waterproofing, 12-hour battery life, and JBL PartyBoost for stereo pairing. Ideal for outdoor adventures.",
      reviews: [
        { user: "Noah B.", comment: "Amazing sound for its size!", rating: 5 },
        { user: "Ava S.", comment: "Bass is impressive.", rating: 4 }
      ],
      images: [
        "https://example.com/jblflip6_blue1.jpg",
        "https://example.com/jblflip6_blue2.jpg",
        "https://example.com/jblflip6_blue3.jpg",
        "https://example.com/jblflip6_blue4.jpg"
      ],
      rating: 4.6
    },
    {
      id: 18,
      name: "Lenovo IdeaCentre AIO 3",
      category: "electronics",
      color: "Black",
      currentprice: 799.99,
      prevprice: 899.99,
      location: "China",
      amount: 25,
      description: "All-in-one desktop for home and office use.",
      detailed_description: "The Lenovo IdeaCentre AIO 3 features a 23.8-inch FHD display, AMD Ryzen 5 5500U, 16GB RAM, and 512GB SSD. Great for multitasking and entertainment.",
      reviews: [
        { user: "Ethan M.", comment: "Sleek and efficient!", rating: 5 },
        { user: "Lily R.", comment: "Good for home office.", rating: 4 }
      ],
      images: [
        "https://example.com/ideacentre_black1.jpg",
        "https://example.com/ideacentre_black2.jpg",
        "https://example.com/ideacentre_black3.jpg",
        "https://example.com/ideacentre_black4.jpg"
      ],
      rating: 4.5
    },
    {
      id: 19,
      name: "OnePlus Nord 3",
      category: "smartphones",
      color: "Misty Green",
      currentprice: 499.99,
      prevprice: 549.99,
      location: "China",
      amount: 50,
      description: "Mid-range smartphone with fast performance.",
      detailed_description: "The OnePlus Nord 3 features a 6.74-inch AMOLED 120Hz display, MediaTek Dimensity 9000, and 80W fast charging. Great value for money.",
      reviews: [
        { user: "Zoe K.", comment: "Smooth and fast!", rating: 5 },
        { user: "Mason L.", comment: "Camera is decent.", rating: 4 }
      ],
      images: [
        "https://example.com/nord3_green1.jpg",
        "https://example.com/nord3_green2.jpg",
        "https://example.com/nord3_green3.jpg",
        "https://example.com/nord3_green4.jpg"
      ],
      rating: 4.6
    },
    {
      id: 20,
      name: "WD Black SN850X 1TB",
      category: "electronics",
      color: "Black",
      currentprice: 129.99,
      prevprice: 149.99,
      location: "USA",
      amount: 60,
      description: "High-speed NVMe SSD for gaming and storage.",
      detailed_description: "The WD Black SN850X 1TB offers read speeds up to 7300MB/s, PCIe Gen4, and Game Mode 2.0. Perfect for PS5 and high-performance PCs.",
      reviews: [
        { user: "Chloe P.", comment: "Super fast load times!", rating: 5 },
        { user: "Jacob T.", comment: "Easy to install.", rating: 4 }
      ],
      images: [
        "https://example.com/wdblack_sn850x1.jpg",
        "https://example.com/wdblack_sn850x2.jpg",
        "https://example.com/wdblack_sn850x3.jpg",
        "https://example.com/wdblack_sn850x4.jpg"
      ],
      rating: 4.7
    },
    {
      id: 21,
      name: "Bose QuietComfort Earbuds",
      category: "accessories",
      color: "Triple Black",
      currentprice: 179.99,
      prevprice: 199.99,
      location: "USA",
      amount: 85,
      description: "Wireless earbuds with superior noise cancellation.",
      detailed_description: "The Bose QuietComfort Earbuds feature world-class noise cancellation, 6-hour battery life, and IPX4 water resistance. Ideal for immersive audio experiences.",
      reviews: [
        { user: "Amelia W.", comment: "Blocks out all noise!", rating: 5 },
        { user: "Daniel R.", comment: "Fit is comfortable.", rating: 4 }
      ],
      images: [
        "https://example.com/quietcomfort_black1.jpg",
        "https://example.com/quietcomfort_black2.jpg",
        "https://example.com/quietcomfort_black3.jpg",
        "https://example.com/quietcomfort_black4.jpg"
      ],
      rating: 4.7
    },
    {
      id: 22,
      name: "Acer Predator Helios 300",
      category: "laptops",
      color: "Black",
      currentprice: 1299.99,
      prevprice: 1499.99,
      location: "Taiwan",
      amount: 12,
      description: "Affordable gaming laptop with strong performance.",
      detailed_description: "The Acer Predator Helios 300 features a 15.6-inch FHD 144Hz display, Intel Core i7-12700H, NVIDIA RTX 3060, 16GB RAM, and 512GB SSD. Great for gaming.",
      reviews: [
        { user: "Sophia L.", comment: "Great value for gamers!", rating: 5 },
        { user: "Lucas B.", comment: "Runs hot during heavy use.", rating: 4 }
      ],
      images: [
        "https://example.com/helios300_black1.jpg",
        "https://example.com/helios300_black2.jpg",
        "https://example.com/helios300_black3.jpg",
        "https://example.com/helios300_black4.jpg"
      ],
      rating: 4.6
    },
    {
      id: 23,
      name: "Samsung Odyssey G7 27-inch",
      category: "electronics",
      color: "Black",
      currentprice: 549.99,
      prevprice: 649.99,
      location: "South Korea",
      amount: 20,
      description: "Curved gaming monitor with QHD resolution.",
      detailed_description: "The Samsung Odyssey G7 features a 27-inch QHD 240Hz curved display, 1ms response time, and G-Sync compatibility. Perfect for immersive gaming.",
      reviews: [
        { user: "Emma P.", comment: "Stunning visuals for gaming!", rating: 5 },
        { user: "Oliver M.", comment: "Setup was easy.", rating: 4 }
      ],
      images: [
        "https://example.com/odysseyg7_black1.jpg",
        "https://example.com/odysseyg7_black2.jpg",
        "https://example.com/odysseyg7_black3.jpg",
        "https://example.com/odysseyg7_black4.jpg"
      ],
      rating: 4.7
    },
    {
      id: 24,
      name: "Apple Watch Series 9",
      category: "accessories",
      color: "Midnight",
      currentprice: 399.99,
      prevprice: 429.99,
      location: "USA",
      amount: 60,
      description: "Advanced smartwatch with health tracking.",
      detailed_description: "The Apple Watch Series 9 features a 1.9-inch Retina display, S9 chip, ECG, blood oxygen monitoring, and up to 18 hours of battery life. Ideal for fitness enthusiasts.",
      reviews: [
        { user: "Isabella T.", comment: "Love the health features!", rating: 5 },
        { user: "Ethan K.", comment: "Battery could last longer.", rating: 4 }
      ],
      images: [
        "https://example.com/watchseries9_midnight1.jpg",
        "https://example.com/watchseries9_midnight2.jpg",
        "https://example.com/watchseries9_midnight3.jpg",
        "https://example.com/watchseries9_midnight4.jpg"
      ],
      rating: 4.7
    },
    {
      id: 25,
      name: "Google Pixel Tablet",
      category: "tablets",
      color: "Porcelain",
      currentprice: 499.99,
      prevprice: 549.99,
      location: "USA",
      amount: 30,
      description: "Versatile tablet with Google Tensor chip.",
      detailed_description: "The Google Pixel Tablet features an 11-inch LCD display, Tensor G2 chip, 8GB RAM, and 128GB storage. Includes a charging speaker dock for smart home use.",
      reviews: [
        { user: "Ava R.", comment: "Great for smart home control!", rating: 5 },
        { user: "Liam S.", comment: "Smooth performance.", rating: 4 }
      ],
      images: [
        "https://example.com/pixeltablet_porcelain1.jpg",
        "https://example.com/pixeltablet_porcelain2.jpg",
        "https://example.com/pixeltablet_porcelain3.jpg",
        "https://example.com/pixeltablet_porcelain4.jpg"
      ],
      rating: 4.6
    },
    {
      id: 26,
      name: "TCL 6-Series 65-inch",
      category: "smart tv",
      color: "Black",
      currentprice: 999.99,
      prevprice: 1199.99,
      location: "China",
      amount: 15,
      description: "Affordable 4K QLED TV with Roku.",
      detailed_description: "The TCL 6-Series 65-inch features a 4K QLED display, Dolby Vision, and Roku OS for seamless streaming. Great for budget-conscious buyers.",
      reviews: [
        { user: "Mason W.", comment: "Amazing value for the price!", rating: 5 },
        { user: "Zoe T.", comment: "Colors are vibrant.", rating: 4 }
      ],
      images: [
        "https://example.com/tcl6series_black1.jpg",
        "https://example.com/tcl6series_black2.jpg",
        "https://example.com/tcl6series_black3.jpg",
        "https://example.com/tcl6series_black4.jpg"
      ],
      rating: 4.6
    },
    {
      id: 27,
      name: "Realme GT 5",
      category: "smartphones",
      color: "Silver",
      currentprice: 599.99,
      prevprice: 649.99,
      location: "China",
      amount: 45,
      description: "High-performance smartphone with fast charging.",
      detailed_description: "The Realme GT 5 features a 6.74-inch AMOLED 144Hz display, Snapdragon 8 Gen 2, and 150W fast charging. Ideal for gaming and multitasking.",
      reviews: [
        { user: "Jacob L.", comment: "Charges in minutes!", rating: 5 },
        { user: "Mia B.", comment: "Great for gaming.", rating: 4 }
      ],
      images: [
        "https://example.com/realmegt5_silver1.jpg",
        "https://example.com/realmegt5_silver2.jpg",
        "https://example.com/realmegt5_silver3.jpg",
        "https://example.com/realmegt5_silver4.jpg"
      ],
      rating: 4.7
    },
    {
      id: 28,
      name: "Logitech G Pro X Keyboard",
      category: "accessories",
      color: "Black",
      currentprice: 129.99,
      prevprice: 149.99,
      location: "Switzerland",
      amount: 70,
      description: "Mechanical gaming keyboard with swappable switches.",
      detailed_description: "The Logitech G Pro X features hot-swappable mechanical switches, RGB lighting, and a compact tenkeyless design. Perfect for esports gamers.",
      reviews: [
        { user: "Lucas R.", comment: "Love the customizable switches!", rating: 5 },
        { user: "Sophia K.", comment: "Very responsive.", rating: 4 }
      ],
      images: [
        "https://example.com/gprox_black1.jpg",
        "https://example.com/gprox_black2.jpg",
        "https://example.com/gprox_black3.jpg",
        "https://example.com/gprox_black4.jpg"
      ],
      rating: 4.7
    },
    {
      id: 29,
      name: "Lenovo Legion 5 Pro",
      category: "laptops",
      color: "Storm Grey",
      currentprice: 1499.99,
      prevprice: 1699.99,
      location: "China",
      amount: 18,
      description: "Gaming laptop with high-resolution display.",
      detailed_description: "The Lenovo Legion 5 Pro features a 16-inch QHD 165Hz display, AMD Ryzen 7 6800H, NVIDIA RTX 3070, 16GB RAM, and 1TB SSD. Ideal for gamers.",
      reviews: [
        { user: "Noah T.", comment: "Fantastic display for gaming!", rating: 5 },
        { user: "Isabella M.", comment: "A bit bulky.", rating: 4 }
      ],
      images: [
        "https://example.com/legion5pro_grey1.jpg",
        "https://example.com/legion5pro_grey2.jpg",
        "https://example.com/legion5pro_grey3.jpg",
        "https://example.com/legion5pro_grey4.jpg"
      ],
      rating: 4.6
    },
    {
      id: 30,
      name: "Seagate FireCuda 530 2TB",
      category: "electronics",
      color: "Black",
      currentprice: 249.99,
      prevprice: 299.99,
      location: "USA",
      amount: 40,
      description: "High-capacity NVMe SSD for gaming and storage.",
      detailed_description: "The Seagate FireCuda 530 2TB offers read speeds up to 7300MB/s, PCIe Gen4, and durability for PS5 and PC gaming. Includes rescue data recovery.",
      reviews: [
        { user: "Ava L.", comment: "Perfect for PS5 storage!", rating: 5 },
        { user: "Ethan P.", comment: "Fast and reliable.", rating: 4 }
      ],
      images: [
        "https://example.com/firecuda530_black1.jpg",
        "https://example.com/firecuda530_black2.jpg",
        "https://example.com/firecuda530_black3.jpg",
        "https://example.com/firecuda530_black4.jpg"
      ],
      rating: 4.7
    },
    {
      id: 31,
      name: "Samsung Galaxy Z Fold 5",
      category: "smartphones",
      color: "Phantom Black",
      currentprice: 1799.99,
      prevprice: 1999.99,
      location: "South Korea",
      amount: 10,
      description: "Foldable smartphone with large AMOLED display.",
      detailed_description: "The Galaxy Z Fold 5 features a 7.6-inch Dynamic AMOLED 2X display, Snapdragon 8 Gen 2, and 12GB RAM. Supports S Pen and multitasking.",
      reviews: [
        { user: "Oliver S.", comment: "Love the foldable design!", rating: 5 },
        { user: "Emma W.", comment: "Expensive but innovative.", rating: 4 }
      ],
      images: [
        "https://example.com/zfold5_black1.jpg",
        "https://example.com/zfold5_black2.jpg",
        "https://example.com/zfold5_black3.jpg",
        "https://example.com/zfold5_black4.jpg"
      ],
      rating: 4.7
    },
    {
      id: 32,
      name: "Sony WF-1000XM5",
      category: "accessories",
      color: "Silver",
      currentprice: 249.99,
      prevprice: 299.99,
      location: "Japan",
      amount: 65,
      description: "Premium wireless earbuds with noise cancellation.",
      detailed_description: "The Sony WF-1000XM5 offers industry-leading noise cancellation, 8-hour battery life, and high-resolution audio. IPX4 water-resistant for active use.",
      reviews: [
        { user: "Mia R.", comment: "Crystal clear sound!", rating: 5 },
        { user: "Jacob K.", comment: "Fit is snug.", rating: 4 }
      ],
      images: [
        "https://example.com/wf1000xm5_silver1.jpg",
        "https://example.com/wf1000xm5_silver2.jpg",
        "https://example.com/wf1000xm5_silver3.jpg",
        "https://example.com/wf1000xm5_silver4.jpg"
      ],
      rating: 4.8
    },
    {
      id: 33,
      name: "HP Omen 27u 4K",
      category: "electronics",
      color: "Black",
      currentprice: 699.99,
      prevprice: 799.99,
      location: "USA",
      amount: 25,
      description: "4K gaming monitor with HDMI 2.1.",
      detailed_description: "The HP Omen 27u features a 27-inch 4K IPS display, 144Hz refresh rate, and HDMI 2.1 support. Perfect for console and PC gaming.",
      reviews: [
        { user: "Lucas T.", comment: "Great for PS5 gaming!", rating: 5 },
        { user: "Sophia B.", comment: "Colors are vibrant.", rating: 4 }
      ],
      images: [
        "https://example.com/omen27u_black1.jpg",
        "https://example.com/omen27u_black2.jpg",
        "https://example.com/omen27u_black3.jpg",
        "https://example.com/omen27u_black4.jpg"
      ],
      rating: 4.7
    },
    {
      id: 34,
      name: "Apple iPad Air 5",
      category: "tablets",
      color: "Starlight",
      currentprice: 599.99,
      prevprice: 649.99,
      location: "USA",
      amount: 35,
      description: "Lightweight tablet with M1 chip.",
      detailed_description: "The iPad Air 5 features a 10.9-inch Liquid Retina display, M1 chip, 8GB RAM, and 256GB storage. Supports Apple Pencil 2 and Magic Keyboard.",
      reviews: [
        { user: "Isabella P.", comment: "Perfect for students!", rating: 5 },
        { user: "Noah L.", comment: "Great performance.", rating: 4 }
      ],
      images: [
        "https://example.com/ipadair5_starlight1.jpg",
        "https://example.com/ipadair5_starlight2.jpg",
        "https://example.com/ipadair5_starlight3.jpg",
        "https://example.com/ipadair5_starlight4.jpg"
      ],
      rating: 4.7
    },
    {
      id: 35,
      name: "LG UltraGear 32GP850",
      category: "electronics",
      color: "Black",
      currentprice: 499.99,
      prevprice: 599.99,
      location: "South Korea",
      amount: 30,
      description: "QHD gaming monitor with high refresh rate.",
      detailed_description: "The LG UltraGear 32GP850 features a 32-inch QHD IPS display, 165Hz refresh rate, and NVIDIA G-Sync compatibility. Ideal for competitive gaming.",
      reviews: [
        { user: "Ava T.", comment: "Smooth gameplay!", rating: 5 },
        { user: "Ethan S.", comment: "Good color accuracy.", rating: 4 }
      ],
      images: [
        "https://example.com/ultragear32_black1.jpg",
        "https://example.com/ultragear32_black2.jpg",
        "https://example.com/ultragear32_black3.jpg",
        "https://example.com/ultragear32_black4.jpg"
      ],
      rating: 4.6
    },
    {
      id: 36,
      name: "Oppo Find X6 Pro",
      category: "smartphones",
      color: "Green",
      currentprice: 999.99,
      prevprice: 1099.99,
      location: "China",
      amount: 25,
      description: "Flagship smartphone with Hasselblad camera.",
      detailed_description: "The Oppo Find X6 Pro features a 6.82-inch AMOLED 120Hz display, Snapdragon 8 Gen 2, and Hasselblad-tuned triple-camera system. Supports 100W charging.",
      reviews: [
        { user: "Sophia W.", comment: "Camera is exceptional!", rating: 5 },
        { user: "Lucas R.", comment: "Premium build quality.", rating: 4 }
      ],
      images: [
        "https://example.com/findx6pro_green1.jpg",
        "https://example.com/findx6pro_green2.jpg",
        "https://example.com/findx6pro_green3.jpg",
        "https://example.com/findx6pro_green4.jpg"
      ],
      rating: 4.7
    },
    {
      id: 37,
      name: "Razer Blade 15",
      category: "laptops",
      color: "Black",
      currentprice: 1999.99,
      prevprice: 2299.99,
      location: "USA",
      amount: 10,
      description: "Sleek gaming laptop with high-end performance.",
      detailed_description: "The Razer Blade 15 features a 15.6-inch QHD 240Hz display, Intel Core i7-13800H, NVIDIA RTX 4070, 16GB RAM, and 1TB SSD. Perfect for gamers.",
      reviews: [
        { user: "Mia L.", comment: "Stylish and powerful!", rating: 5 },
        { user: "Jacob T.", comment: "Pricey but worth it.", rating: 4 }
      ],
      images: [
        "https://example.com/razerblade15_black1.jpg",
        "https://example.com/razerblade15_black2.jpg",
        "https://example.com/razerblade15_black3.jpg",
        "https://example.com/razerblade15_black4.jpg"
      ],
      rating: 4.7
    },
    {
      id: 38,
      name: "Anker 737 Charger",
      category: "accessories",
      color: "Black",
      currentprice: 89.99,
      prevprice: 109.99,
      location: "China",
      amount: 100,
      description: "Compact GaN charger with multiple ports.",
      detailed_description: "The Anker 737 Charger features 120W output, 3 USB ports (2 USB-C, 1 USB-A), and PowerIQ 4.0 for fast charging. Ideal for laptops and phones.",
      reviews: [
        { user: "Ethan W.", comment: "Charges everything fast!", rating: 5 },
        { user: "Ava B.", comment: "Very portable.", rating: 4 }
      ],
      images: [
        "https://example.com/anker737_black1.jpg",
        "https://example.com/anker737_black2.jpg",
        "https://example.com/anker737_black3.jpg",
        "https://example.com/anker737_black4.jpg"
      ],
      rating: 4.7
    },
    {
      id: 39,
      name: "Hisense U8K 55-inch",
      category: "smart tv",
      color: "Black",
      currentprice: 1099.99,
      prevprice: 1299.99,
      location: "China",
      amount: 12,
      description: "Mini-LED 4K TV with vibrant visuals.",
      detailed_description: "The Hisense U8K 55-inch features a 4K Mini-LED display, 144Hz refresh rate, Dolby Vision, and Google TV. Great for movies and gaming.",
      reviews: [
        { user: "Noah R.", comment: "Bright and colorful display!", rating: 5 },
        { user: "Isabella S.", comment: "Good for the price.", rating: 4 }
      ],
      images: [
        "https://example.com/hisenseu8k_black1.jpg",
        "https://example.com/hisenseu8k_black2.jpg",
        "https://example.com/hisenseu8k_black3.jpg",
        "https://example.com/hisenseu8k_black4.jpg"
      ],
      rating: 4.6
    },
    {
      id: 40,
      name: "Microsoft Surface Pro 9",
      category: "tablets",
      color: "Platinum",
      currentprice: 999.99,
      prevprice: 1099.99,
      location: "USA",
      amount: 20,
      description: "Versatile 2-in-1 tablet with laptop performance.",
      detailed_description: "The Microsoft Surface Pro 9 features a 13-inch PixelSense 120Hz display, Intel Core i5-1235U, 8GB RAM, and 256GB SSD. Runs Windows 11.",
      reviews: [
        { user: "Sophia T.", comment: "Great for work and travel!", rating: 5 },
        { user: "Lucas P.", comment: "Keyboard sold separately.", rating: 4 }
      ],
      images: [
        "https://example.com/surfacepro9_platinum1.jpg",
        "https://example.com/surfacepro9_platinum2.jpg",
        "https://example.com/surfacepro9_platinum3.jpg",
        "https://example.com/surfacepro9_platinum4.jpg"
      ],
      rating: 4.6
    },
    {
      id: 41,
      name: "Apple AirPods Pro 2",
      category: "accessories",
      color: "White",
      currentprice: 249.99,
      prevprice: 279.99,
      location: "USA",
      amount: 70,
      description: "Premium wireless earbuds with active noise cancellation.",
      detailed_description: "The AirPods Pro 2 feature advanced noise cancellation, H2 chip, up to 6 hours of battery life, and spatial audio with head tracking. IPX4 water-resistant.",
      reviews: [
        { user: "Olivia W.", comment: "Sound quality is amazing!", rating: 5 },
        { user: "James K.", comment: "Great for calls.", rating: 4 }
      ],
      images: [
        "https://example.com/airpodspro2_white1.jpg",
        "https://example.com/airpodspro2_white2.jpg",
        "https://example.com/airpodspro2_white3.jpg",
        "https://example.com/airpodspro2_white4.jpg"
      ],
      rating: 4.8
    },
    {
      id: 42,
      name: "ASUS ZenBook 14 OLED",
      category: "laptops",
      color: "Ponder Blue",
      currentprice: 1199.99,
      prevprice: 1399.99,
      location: "Taiwan",
      amount: 15,
      description: "Sleek ultrabook with vibrant OLED display.",
      detailed_description: "The ASUS ZenBook 14 features a 14-inch 2.8K OLED display, AMD Ryzen 7 7730U, 16GB RAM, and 512GB SSD. Ideal for professionals and creators.",
      reviews: [
        { user: "Emma T.", comment: "Stunning display!", rating: 5 },
        { user: "Liam P.", comment: "Battery life is great.", rating: 4 }
      ],
      images: [
        "https://example.com/zenbook14_blue1.jpg",
        "https://example.com/zenbook14_blue2.jpg",
        "https://example.com/zenbook14_blue3.jpg",
        "https://example.com/zenbook14_blue4.jpg"
      ],
      rating: 4.7
    },
    {
      id: 43,
      name: "Samsung Galaxy A54",
      category: "smartphones",
      color: "Awesome Graphite",
      currentprice: 399.99,
      prevprice: 449.99,
      location: "South Korea",
      amount: 50,
      description: "Mid-range smartphone with vibrant display.",
      detailed_description: "The Galaxy A54 features a 6.4-inch Super AMOLED 120Hz display, Exynos 1380, 8GB RAM, and 128GB storage. Supports 5G and 25W fast charging.",
      reviews: [
        { user: "Sophia R.", comment: "Great value for money!", rating: 5 },
        { user: "Noah L.", comment: "Camera is decent.", rating: 4 }
      ],
      images: [
        "https://example.com/galaxya54_graphite1.jpg",
        "https://example.com/galaxya54_graphite2.jpg",
        "https://example.com/galaxya54_graphite3.jpg",
        "https://example.com/galaxya54_graphite4.jpg"
      ],
      rating: 4.6
    },
    {
      id: 44,
      name: "Dell UltraSharp 32 4K",
      category: "electronics",
      color: "Silver",
      currentprice: 799.99,
      prevprice: 899.99,
      location: "USA",
      amount: 20,
      description: "4K monitor for professional and creative work.",
      detailed_description: "The Dell UltraSharp 32 features a 32-inch 4K IPS display, 100% sRGB, USB-C hub, and adjustable stand. Perfect for video editing and design.",
      reviews: [
        { user: "Ava S.", comment: "Crystal clear visuals!", rating: 5 },
        { user: "Ethan M.", comment: "Great for multitasking.", rating: 4 }
      ],
      images: [
        "https://example.com/ultrasharp32_silver1.jpg",
        "https://example.com/ultrasharp32_silver2.jpg",
        "https://example.com/ultrasharp32_silver3.jpg",
        "https://example.com/ultrasharp32_silver4.jpg"
      ],
      rating: 4.7
    },
    {
      id: 45,
      name: "LG C4 77-inch OLED",
      category: "smart tv",
      color: "Black",
      currentprice: 2999.99,
      prevprice: 3499.99,
      location: "South Korea",
      amount: 10,
      description: "Large OLED TV with cinematic visuals.",
      detailed_description: "The LG C4 77-inch features a 4K OLED display, α9 Gen7 AI Processor, Dolby Vision, and webOS. Ideal for home theater enthusiasts.",
      reviews: [
        { user: "Jacob T.", comment: "Perfect for movies!", rating: 5 },
        { user: "Mia W.", comment: "Pricey but stunning.", rating: 4 }
      ],
      images: [
        "https://example.com/lgc4_black1.jpg",
        "https://example.com/lgc4_black2.jpg",
        "https://example.com/lgc4_black3.jpg",
        "https://example.com/lgc4_black4.jpg"
      ],
      rating: 4.8
    },
    {
      id: 46,
      name: "Lenovo Tab P11 Pro",
      category: "tablets",
      color: "Slate Grey",
      currentprice: 499.99,
      prevprice: 549.99,
      location: "China",
      amount: 30,
      description: "Premium tablet with OLED display.",
      detailed_description: "The Lenovo Tab P11 Pro features an 11.2-inch 2.5K OLED display, Snapdragon 730G, 6GB RAM, and 128GB storage. Supports stylus and keyboard.",
      reviews: [
        { user: "Isabella K.", comment: "Great for media!", rating: 5 },
        { user: "Lucas R.", comment: "Smooth performance.", rating: 4 }
      ],
      images: [
        "https://example.com/tabp11pro_grey1.jpg",
        "https://example.com/tabp11pro_grey2.jpg",
        "https://example.com/tabp11pro_grey3.jpg",
        "https://example.com/tabp11pro_grey4.jpg"
      ],
      rating: 4.6
    },
    {
      id: 47,
      name: "Razer DeathAdder V3 Pro",
      category: "accessories",
      color: "Black",
      currentprice: 149.99,
      prevprice: 169.99,
      location: "USA",
      amount: 60,
      description: "Lightweight wireless gaming mouse.",
      detailed_description: "The Razer DeathAdder V3 Pro features a 30K DPI sensor, 90-hour battery life, and ergonomic design. Ideal for competitive gaming.",
      reviews: [
        { user: "Noah B.", comment: "Super precise!", rating: 5 },
        { user: "Ava T.", comment: "Comfortable grip.", rating: 4 }
      ],
      images: [
        "https://example.com/deathadder_black1.jpg",
        "https://example.com/deathadder_black2.jpg",
        "https://example.com/deathadder_black3.jpg",
        "https://example.com/deathadder_black4.jpg"
      ],
      rating: 4.7
    },
    {
      id: 48,
      name: "HP Envy Desktop",
      category: "electronics",
      color: "Black",
      currentprice: 999.99,
      prevprice: 1199.99,
      location: "USA",
      amount: 15,
      description: "Powerful desktop for work and entertainment.",
      detailed_description: "The HP Envy Desktop features an Intel Core i7-12700, 16GB RAM, 1TB SSD, and NVIDIA GTX 1660 Super. Great for multitasking and light gaming.",
      reviews: [
        { user: "Sophia L.", comment: "Fast and reliable!", rating: 5 },
        { user: "Ethan P.", comment: "Quiet operation.", rating: 4 }
      ],
      images: [
        "https://example.com/envydesktop_black1.jpg",
        "https://example.com/envydesktop_black2.jpg",
        "https://example.com/envydesktop_black3.jpg",
        "https://example.com/envydesktop_black4.jpg"
      ],
      rating: 4.6
    },
    {
      id: 49,
      name: "Google Pixel 8 Pro",
      category: "smartphones",
      color: "Bay Blue",
      currentprice: 999.99,
      prevprice: 1099.99,
      location: "USA",
      amount: 25,
      description: "Premium smartphone with advanced AI camera.",
      detailed_description: "The Google Pixel 8 Pro features a 6.7-inch OLED 120Hz display, Tensor G3 chip, and 50MP triple-camera system. Supports 5G and Android 14.",
      reviews: [
        { user: "Mia S.", comment: "Best camera phone!", rating: 5 },
        { user: "Jacob R.", comment: "Software is smooth.", rating: 4 }
      ],
      images: [
        "https://example.com/pixel8pro_blue1.jpg",
        "https://example.com/pixel8pro_blue2.jpg",
        "https://example.com/pixel8pro_blue3.jpg",
        "https://example.com/pixel8pro_blue4.jpg"
      ],
      rating: 4.8
    },
    {
      id: 50,
      name: "Sony X90L 65-inch",
      category: "smart tv",
      color: "Black",
      currentprice: 1499.99,
      prevprice: 1699.99,
      location: "Japan",
      amount: 12,
      description: "Full-array LED TV with vibrant colors.",
      detailed_description: "The Sony X90L 65-inch features a 4K full-array LED display, XR Cognitive Processor, and Google TV. Supports Dolby Vision and Atmos.",
      reviews: [
        { user: "Lucas W.", comment: "Great for gaming!", rating: 5 },
        { user: "Ava K.", comment: "Bright and clear.", rating: 4 }
      ],
      images: [
        "https://example.com/x90l_black1.jpg",
        "https://example.com/x90l_black2.jpg",
        "https://example.com/x90l_black3.jpg",
        "https://example.com/x90l_black4.jpg"
      ],
      rating: 4.7
    },
    {
      id: 51,
      name: "Xiaomi Pad 6",
      category: "tablets",
      color: "Mist Blue",
      currentprice: 399.99,
      prevprice: 449.99,
      location: "China",
      amount: 40,
      description: "Affordable tablet with high refresh rate.",
      detailed_description: "The Xiaomi Pad 6 features an 11-inch 2.8K 144Hz display, Snapdragon 870, 6GB RAM, and 128GB storage. Great for media and productivity.",
      reviews: [
        { user: "Isabella T.", comment: "Smooth and fast!", rating: 5 },
        { user: "Noah L.", comment: "Good for the price.", rating: 4 }
      ],
      images: [
        "https://example.com/xiaomipad6_blue1.jpg",
        "https://example.com/xiaomipad6_blue2.jpg",
        "https://example.com/xiaomipad6_blue3.jpg",
        "https://example.com/xiaomipad6_blue4.jpg"
      ],
      rating: 4.6
    },
    {
      id: 52,
      name: "Logitech Brio Ultra HD",
      category: "accessories",
      color: "Black",
      currentprice: 199.99,
      prevprice: 229.99,
      location: "Switzerland",
      amount: 50,
      description: "4K webcam for professional video calls.",
      detailed_description: "The Logitech Brio Ultra HD features 4K resolution, HDR, and 5X digital zoom. Supports Windows Hello and works with Zoom, Teams, and more.",
      reviews: [
        { user: "Sophia B.", comment: "Crystal clear video!", rating: 5 },
        { user: "Ethan T.", comment: "Easy to set up.", rating: 4 }
      ],
      images: [
        "https://example.com/brio_black1.jpg",
        "https://example.com/brio_black2.jpg",
        "https://example.com/brio_black3.jpg",
        "https://example.com/brio_black4.jpg"
      ],
      rating: 4.7
    },
    {
      id: 53,
      name: "MSI Katana GF66",
      category: "laptops",
      color: "Black",
      currentprice: 1099.99,
      prevprice: 1299.99,
      location: "Taiwan",
      amount: 18,
      description: "Budget-friendly gaming laptop.",
      detailed_description: "The MSI Katana GF66 features a 15.6-inch FHD 144Hz display, Intel Core i5-12450H, NVIDIA RTX 3050, 16GB RAM, and 512GB SSD. Great for casual gamers.",
      reviews: [
        { user: "Ava R.", comment: "Good performance for price!", rating: 5 },
        { user: "Lucas P.", comment: "Runs most games well.", rating: 4 }
      ],
      images: [
        "https://example.com/katanagf66_black1.jpg",
        "https://example.com/katanagf66_black2.jpg",
        "https://example.com/katanagf66_black3.jpg",
        "https://example.com/katanagf66_black4.jpg"
      ],
      rating: 4.6
    },
    {
      id: 54,
      name: "Samsung T7 Shield 2TB",
      category: "electronics",
      color: "Black",
      currentprice: 199.99,
      prevprice: 249.99,
      location: "South Korea",
      amount: 45,
      description: "Rugged portable SSD with fast speeds.",
      detailed_description: "The Samsung T7 Shield 2TB offers read/write speeds up to 1050/1000 MB/s, IP65 water/dust resistance, and USB 3.2 Gen 2. Perfect for creators.",
      reviews: [
        { user: "Mia T.", comment: "Super fast transfers!", rating: 5 },
        { user: "Jacob S.", comment: "Durable design.", rating: 4 }
      ],
      images: [
        "https://example.com/t7shield_black1.jpg",
        "https://example.com/t7shield_black2.jpg",
        "https://example.com/t7shield_black3.jpg",
        "https://example.com/t7shield_black4.jpg"
      ],
      rating: 4.7
    },
    {
      id: 55,
      name: "OnePlus 11",
      category: "smartphones",
      color: "Titan Black",
      currentprice: 799.99,
      prevprice: 899.99,
      location: "China",
      amount: 30,
      description: "Flagship smartphone with fast charging.",
      detailed_description: "The OnePlus 11 features a 6.7-inch AMOLED 120Hz display, Snapdragon 8 Gen 2, 16GB RAM, and 80W SUPERVOOC charging. Hasselblad-tuned cameras.",
      reviews: [
        { user: "Noah W.", comment: "Blazing fast performance!", rating: 5 },
        { user: "Ava L.", comment: "Great camera system.", rating: 4 }
      ],
      images: [
        "https://example.com/oneplus11_black1.jpg",
        "https://example.com/oneplus11_black2.jpg",
        "https://example.com/oneplus11_black3.jpg",
        "https://example.com/oneplus11_black4.jpg"
      ],
      rating: 4.7
    },
    {
      id: 56,
      name: "TCL 5-Series 50-inch",
      category: "smart tv",
      color: "Black",
      currentprice: 449.99,
      prevprice: 499.99,
      location: "China",
      amount: 20,
      description: "Budget-friendly 4K QLED TV.",
      detailed_description: "The TCL 5-Series 50-inch features a 4K QLED display, Dolby Vision, and Roku OS. Great for streaming and casual viewing.",
      reviews: [
        { user: "Sophia T.", comment: "Amazing value!", rating: 5 },
        { user: "Lucas R.", comment: "Good picture quality.", rating: 4 }
      ],
      images: [
        "https://example.com/tcl5series_black1.jpg",
        "https://example.com/tcl5series_black2.jpg",
        "https://example.com/tcl5series_black3.jpg",
        "https://example.com/tcl5series_black4.jpg"
      ],
      rating: 4.6
    },
    {
      id: 57,
      name: "JBL Charge 5",
      category: "accessories",
      color: "Red",
      currentprice: 179.99,
      prevprice: 199.99,
      location: "USA",
      amount: 80,
      description: "Portable Bluetooth speaker with powerbank.",
      detailed_description: "The JBL Charge 5 offers IP67 waterproofing, 20-hour battery life, and a built-in powerbank. Supports PartyBoost for stereo pairing.",
      reviews: [
        { user: "Ava B.", comment: "Loud and clear sound!", rating: 5 },
        { user: "Ethan K.", comment: "Great for outdoor use.", rating: 4 }
      ],
      images: [
        "https://example.com/charge5_red1.jpg",
        "https://example.com/charge5_red2.jpg",
        "https://example.com/charge5_red3.jpg",
        "https://example.com/charge5_red4.jpg"
      ],
      rating: 4.7
    },
    {
      id: 58,
      name: "Acer Aspire 5",
      category: "laptops",
      color: "Silver",
      currentprice: 549.99,
      prevprice: 649.99,
      location: "Taiwan",
      amount: 25,
      description: "Affordable laptop for everyday use.",
      detailed_description: "The Acer Aspire 5 features a 15.6-inch FHD display, AMD Ryzen 5 5500U, 8GB RAM, and 256GB SSD. Great for students and professionals.",
      reviews: [
        { user: "Mia W.", comment: "Good for the price!", rating: 5 },
        { user: "Jacob T.", comment: "Decent performance.", rating: 4 }
      ],
      images: [
        "https://example.com/aspire5_silver1.jpg",
        "https://example.com/aspire5_silver2.jpg",
        "https://example.com/aspire5_silver3.jpg",
        "https://example.com/aspire5_silver4.jpg"
      ],
      rating: 4.5
    },
    {
      id: 59,
      name: "Samsung Galaxy Watch 6",
      category: "accessories",
      color: "Graphite",
      currentprice: 299.99,
      prevprice: 329.99,
      location: "South Korea",
      amount: 55,
      description: "Smartwatch with advanced health tracking.",
      detailed_description: "The Galaxy Watch 6 features a 1.5-inch AMOLED display, Exynos W930, sleep tracking, and heart rate monitoring. Runs Wear OS.",
      reviews: [
        { user: "Sophia L.", comment: "Great fitness tracker!", rating: 5 },
        { user: "Lucas P.", comment: "Battery life is good.", rating: 4 }
      ],
      images: [
        "https://example.com/galaxywatch6_graphite1.jpg",
        "https://example.com/galaxywatch6_graphite2.jpg",
        "https://example.com/galaxywatch6_graphite3.jpg",
        "https://example.com/galaxywatch6_graphite4.jpg"
      ],
      rating: 4.7
    },
    {
      id: 60,
      name: "Realme Pad Mini",
      category: "tablets",
      color: "Grey",
      currentprice: 199.99,
      prevprice: 249.99,
      location: "China",
      amount: 50,
      description: "Compact tablet for budget users.",
      detailed_description: "The Realme Pad Mini features an 8.7-inch HD display, Unisoc T616, 4GB RAM, and 64GB storage. Ideal for basic tasks and media consumption.",
      reviews: [
        { user: "Ava T.", comment: "Perfect for kids!", rating: 5 },
        { user: "Noah R.", comment: "Good for the price.", rating: 4 }
      ],
      images: [
        "https://example.com/realmeadmini_grey1.jpg",
        "https://example.com/realmeadmini_grey2.jpg",
        "https://example.com/realmeadmini_grey3.jpg",
        "https://example.com/realmeadmini_grey4.jpg"
      ],
      rating: 4.5
    },
    {
      id: 61,
      name: "LG 27QN600 27-inch",
      category: "electronics",
      color: "Black",
      currentprice: 299.99,
      prevprice: 349.99,
      location: "South Korea",
      amount: 30,
      description: "QHD monitor for work and entertainment.",
      detailed_description: "The LG 27QN600 features a 27-inch QHD IPS display, 99% sRGB, and HDR10. Supports dual-monitor setups and productivity tasks.",
      reviews: [
        { user: "Isabella S.", comment: "Great for office work!", rating: 5 },
        { user: "Lucas B.", comment: "Sharp visuals.", rating: 4 }
      ],
      images: [
        "https://example.com/lg27qn600_black1.jpg",
        "https://example.com/lgonius"
      ],
      rating: 4.6
    },
    {
      id: 62,
      name: "Vivo X90 Pro",
      category: "smartphones",
      color: "Black",
      currentprice: 799.99,
      prevprice: 899.99,
      location: "China",
      amount: 35,
      description: "High-performance smartphone with Zeiss optics.",
      detailed_description: "The Vivo X90 Pro features a 6.78-inch AMOLED 120Hz display, Dimensity 9200, and Zeiss-tuned triple-camera system. Supports 120W fast charging.",
      reviews: [
        { user: "Mia R.", comment: "Incredible camera!", rating: 5 },
        { user: "Jacob W.", comment: "Fast and sleek.", rating: 4 }
      ],
      images: [
        "https://example.com/vivox90pro_black1.jpg",
        "https://example.com/vivox90pro_black2.jpg",
        "https://example.com/vivox90pro_black3.jpg",
        "https://example.com/vivox90pro_black4.jpg"
      ],
      rating: 4.7
    },
    {
      id: 63,
      name: "Dell G15 Gaming Laptop",
      category: "laptops",
      color: "Dark Shadow Grey",
      currentprice: 999.99,
      prevprice: 1199.99,
      location: "USA",
      amount: 20,
      description: "Affordable gaming laptop with solid performance.",
      detailed_description: "The Dell G15 features a 15.6-inch FHD 120Hz display, Intel Core i5-13450HX, NVIDIA RTX 3050, 16GB RAM, and 512GB SSD. Great for budget gamers.",
      reviews: [
        { user: "Ava L.", comment: "Runs games smoothly!", rating: 5 },
        { user: "Noah T.", comment: "Good value for money.", rating: 4 }
      ],
      images: [
        "https://example.com/dellg15_grey1.jpg",
        "https://example.com/dellg15_grey2.jpg",
        "https://example.com/dellg15_grey3.jpg",
        "https://example.com/dellg15_grey4.jpg"
      ],
      rating: 4.6
    },
    {
      id: 64,
      name: "Sony WF-C510/B",
      category: "accessories",
      color: "Black",
      currentprice: 59.99,
      prevprice: 69.99,
      location: "Japan",
      amount: 100,
      description: "Affordable wireless earbuds with clear sound.",
      detailed_description: "The Sony WF-C510/B offers 11-hour battery life, IPX4 splash resistance, and clear audio quality. Perfect for everyday use.",
      reviews: [
        { user: "Sophia W.", comment: "Great for workouts!", rating: 5 },
        { user: "Lucas R.", comment: "Comfortable fit.", rating: 4 }
      ],
      images: [
        "https://example.com/wfc510_black1.jpg",
        "https://example.com/wfc510_black2.jpg",
        "https://example.com/wfc510_black3.jpg",
        "https://example.com/wfc510_black4.jpg"
      ],
      rating: 4.6
    },
    {
      id: 65,
      name: "Hisense U7K 75-inch",
      category: "smart tv",
      color: "Black",
      currentprice: 1299.99,
      prevprice: 1499.99,
      location: "China",
      amount: 10,
      description: "Large Mini-LED TV with high brightness.",
      detailed_description: "The Hisense U7K 75-inch features a 4K Mini-LED display, 120Hz refresh rate, Dolby Vision, and Google TV. Ideal for bright rooms.",
      reviews: [
        { user: "Jacob L.", comment: "Bright and vivid!", rating: 5 },
        { user: "Mia T.", comment: "Great for sports.", rating: 4 }
      ],
      images: [
        "https://example.com/hisenseu7k_black1.jpg",
        "https://example.com/hisenseu7k_black2.jpg",
        "https://example.com/hisenseu7k_black3.jpg",
        "https://example.com/hisenseu7k_black4.jpg"
      ],
      rating: 4.7
    },
    {
      id: 66,
      name: "Samsung Galaxy Z Flip 5",
      category: "smartphones",
      color: "Mint",
      currentprice: 999.99,
      prevprice: 1099.99,
      location: "South Korea",
      amount: 20,
      description: "Compact foldable smartphone with AMOLED display.",
      detailed_description: "The Galaxy Z Flip 5 features a 3.4-inch cover display, 6.7-inch AMOLED main display, Snapdragon 8 Gen 2, and 12GB RAM. Supports 5G.",
      reviews: [
        { user: "Ava S.", comment: "Love the flip design!", rating: 5 },
        { user: "Noah B.", comment: "Very stylish.", rating: 4 }
      ],
      images: [
        "https://example.com/zflip5_mint1.jpg",
        "https://example.com/zflip5_mint2.jpg",
        "https://example.com/zflip5_mint3.jpg",
        "https://example.com/zflip5_mint4.jpg"
      ],
      rating: 4.7
    },
    {
      id: 67,
      name: "Anker Soundcore Motion+",
      category: "accessories",
      color: "Black",
      currentprice: 99.99,
      prevprice: 119.99,
      location: "China",
      amount: 90,
      description: "Portable Bluetooth speaker with hi-fi audio.",
      detailed_description: "The Anker Soundcore Motion+ features 30W output, 12-hour battery life, and IPX7 waterproofing. Ideal for outdoor and indoor use.",
      reviews: [
        { user: "Lucas T.", comment: "Amazing sound quality!", rating: 5 },
        { user: "Sophia R.", comment: "Compact and powerful.", rating: 4 }
      ],
      images: [
        "https://example.com/motionplus_black1.jpg",
        "https://example.com/motionplus_black2.jpg",
        "https://example.com/motionplus_black3.jpg",
        "https://example.com/motionplus_black4.jpg"
      ],
      rating: 4.7
    },
    {
      id: 68,
      name: "Lenovo ThinkPad X1 Carbon Gen 11",
      category: "laptops",
      color: "Black",
      currentprice: 1599.99,
      prevprice: 1799.99,
      location: "China",
      amount: 15,
      description: "Premium ultrabook for business professionals.",
      detailed_description: "The ThinkPad X1 Carbon Gen 11 features a 14-inch 2.8K display, Intel Core i7-1355U, 16GB RAM, and 512GB SSD. Lightweight and durable.",
      reviews: [
        { user: "Mia L.", comment: "Perfect for work!", rating: 5 },
        { user: "Jacob P.", comment: "Great keyboard.", rating: 4 }
      ],
      images: [
        "https://example.com/thinkpadx1_black1.jpg",
        "https://example.com/thinkpadx1_black2.jpg",
        "https://example.com/thinkpadx1_black3.jpg",
        "https://example.com/thinkpadx1_black4.jpg"
      ],
      rating: 4.7
    },
    {
      id: 69,
      name: "WD My Passport 5TB",
      category: "electronics",
      color: "Black",
      currentprice: 129.99,
      prevprice: 149.99,
      location: "USA",
      amount: 60,
      description: "Portable hard drive with large capacity.",
      detailed_description: "The WD My Passport 5TB offers USB 3.2 Gen 1, password protection, and compact design. Perfect for backups and file storage.",
      reviews: [
        { user: "Ava T.", comment: "Huge storage space!", rating: 5 },
        { user: "Noah S.", comment: "Reliable drive.", rating: 4 }
      ],
      images: [
        "https://example.com/mypassport_black1.jpg",
        "https://example.com/mypassport_black2.jpg",
        "https://example.com/mypassport_black3.jpg",
        "https://example.com/mypassport_black4.jpg"
      ],
      rating: 4.6
    },
    {
      id: 70,
      name: "Samsung Galaxy Tab A9+",
      category: "tablets",
      color: "Silver",
      currentprice: 269.99,
      prevprice: 299.99,
      location: "South Korea",
      amount: 40,
      description: "Budget tablet for everyday use.",
      detailed_description: "The Galaxy Tab A9+ features an 11-inch 90Hz LCD display, Snapdragon 695, 4GB RAM, and 64GB storage. Great for streaming and browsing.",
      reviews: [
        { user: "Sophia B.", comment: "Great for casual use!", rating: 5 },
        { user: "Lucas T.", comment: "Good screen size.", rating: 4 }
      ],
      images: [
        "https://example.com/taba9plus_silver1.jpg",
        "https://example.com/taba9plus_silver2.jpg",
        "https://example.com/taba9plus_silver3.jpg",
        "https://example.com/taba9plus_silver4.jpg"
      ],
      rating: 4.5
    },
    {
      id: 71,
      name: "Sony Bravia 8 55-inch",
      category: "smart tv",
      color: "Black",
      currentprice: 1999.99,
      prevprice: 2299.99,
      location: "Japan",
      amount: 10,
      description: "Premium OLED TV with Google TV.",
      detailed_description: "The Sony Bravia 8 55-inch features a 4K OLED display, XR Cognitive Processor, Dolby Vision, and Google TV. Perfect for cinematic viewing.",
      reviews: [
        { user: "Jacob R.", comment: "Incredible blacks!", rating: 5 },
        { user: "Mia L.", comment: "Great smart features.", rating: 4 }
      ],
      images: [
        "https://example.com/bravia8_black1.jpg",
        "https://example.com/bravia8_black2.jpg",
        "https://example.com/bravia8_black3.jpg",
        "https://example.com/bravia8_black4.jpg"
      ],
      rating: 4.8
    },
    {
      id: 72,
      name: "Oppo Reno 10 Pro",
      category: "smartphones",
      color: "Glossy Purple",
      currentprice: 599.99,
      prevprice: 649.99,
      location: "China",
      amount: 35,
      description: "Mid-range smartphone with sleek design.",
      detailed_description: "The Oppo Reno 10 Pro features a 6.7-inch AMOLED 120Hz display, Snapdragon 778G, 12GB RAM, and 50MP triple-camera system. Supports 80W charging.",
      reviews: [
        { user: "Ava W.", comment: "Beautiful design!", rating: 5 },
        { user: "Noah T.", comment: "Fast charging.", rating: 4 }
      ],
      images: [
        "https://example.com/reno10pro_purple1.jpg",
        "https://example.com/reno10pro_purple2.jpg",
        "https://example.com/reno10pro_purple3.jpg",
        "https://example.com/reno10pro_purple4.jpg"
      ],
      rating: 4.6
    },
    {
      id: 73,
      name: "Razer Basilisk V3",
      category: "accessories",
      color: "Black",
      currentprice: 69.99,
      prevprice: 89.99,
      location: "USA",
      amount: 80,
      description: "Customizable wired gaming mouse.",
      detailed_description: "The Razer Basilisk V3 features a 26K DPI sensor, 11 programmable buttons, and RGB lighting. Ideal for gaming and productivity.",
      reviews: [
        { user: "Sophia R.", comment: "Very responsive!", rating: 5 },
        { user: "Lucas B.", comment: "Comfortable design.", rating: 4 }
      ],
      images: [
        "https://example.com/basiliskv3_black1.jpg",
        "https://example.com/basiliskv3_black2.jpg",
        "https://example.com/basiliskv3_black3.jpg",
        "https://example.com/basiliskv3_black4.jpg"
      ],
      rating: 4.7
    },
    {
      id: 74,
      name: "Acer Nitro 5",
      category: "laptops",
      color: "Black",
      currentprice: 899.99,
      prevprice: 999.99,
      location: "Taiwan",
      amount: 20,
      description: "Budget gaming laptop with strong performance.",
      detailed_description: "The Acer Nitro 5 features a 15.6-inch FHD 144Hz display, Intel Core i5-13420H, NVIDIA RTX 4050, 16GB RAM, and 512GB SSD. Great for gamers.",
      reviews: [
        { user: "Mia T.", comment: "Runs games well!", rating: 5 },
        { user: "Jacob L.", comment: "Good for the price.", rating: 4 }
      ],
      images: [
        "https://example.com/nitro5_black1.jpg",
        "https://example.com/nitro5_black2.jpg",
        "https://example.com/nitro5_black3.jpg",
        "https://example.com/nitro5_black4.jpg"
      ],
      rating: 4.6
    },
    {
      id: 75,
      name: "Samsung Odyssey Neo G9",
      category: "electronics",
      color: "White",
      currentprice: 1999.99,
      prevprice: 2299.99,
      location: "South Korea",
      amount: 8,
      description: "Ultrawide Mini-LED gaming monitor.",
      detailed_description: "The Samsung Odyssey Neo G9 features a 49-inch 5K 240Hz curved display, Quantum Mini-LED, and G-Sync. Perfect for immersive gaming.",
      reviews: [
        { user: "Ava S.", comment: "Massive and stunning!", rating: 5 },
        { user: "Noah R.", comment: "Pricey but worth it.", rating: 4 }
      ],
      images: [
        "https://example.com/odysseyneog9_white1.jpg",
        "https://example.com/odysseyneog9_white2.jpg",
        "https://example.com/odysseyneog9_white3.jpg",
        "https://example.com/odysseyneog9_white4.jpg"
      ],
      rating: 4.8
    },
    {
      id: 76,
      name: "Huawei MatePad 11",
      category: "tablets",
      color: "Matte Grey",
      currentprice: 399.99,
      prevprice: 449.99,
      location: "China",
      amount: 30,
      description: "High-performance tablet with HarmonyOS.",
      detailed_description: "The Huawei MatePad 11 features an 11-inch 120Hz LCD display, Snapdragon 865, 6GB RAM, and 128GB storage. Supports stylus and keyboard.",
      reviews: [
        { user: "Sophia T.", comment: "Great for productivity!", rating: 5 },
        { user: "Lucas W.", comment: "Smooth interface.", rating: 4 }
      ],
      images: [
        "https://example.com/matepad11_grey1.jpg",
        "https://example.com/matepad11_grey2.jpg",
        "https://example.com/matepad11_grey3.jpg",
        "https://example.com/matepad11_grey4.jpg"
      ],
      rating: 4.6
    },
    {
      id: 77,
      name: "Sony INZONE M9",
      category: "electronics",
      color: "White",
      currentprice: 899.99,
      prevprice: 999.99,
      location: "Japan",
      amount: 15,
      description: "4K gaming monitor for consoles and PCs.",
      detailed_description: "The Sony INZONE M9 features a 27-inch 4K 144Hz IPS display, HDMI 2.1, and Auto HDR Tone Mapping. Ideal for PS5 and PC gaming.",
      reviews: [
        { user: "Mia B.", comment: "Perfect for PS5!", rating: 5 },
        { user: "Jacob T.", comment: "Great color accuracy.", rating: 4 }
      ],
      images: [
        "https://example.com/inzonem9_white1.jpg",
        "https://example.com/inzonem9_white2.jpg",
        "https://example.com/inzonem9_white3.jpg",
        "https://example.com/inzonem9_white4.jpg"
      ],
      rating: 4.7
    },
    {
      id: 78,
      name: "Xiaomi 14",
      category: "smartphones",
      color: "Jade Green",
      currentprice: 899.99,
      prevprice: 999.99,
      location: "China",
      amount: 25,
      description: "Flagship smartphone with Leica camera.",
      detailed_description: "The Xiaomi 14 features a 6.36-inch AMOLED 120Hz display, Snapdragon 8 Gen 3, and Leica-tuned 50MP camera. Supports 90W fast charging.",
      reviews: [
        { user: "Ava L.", comment: "Stunning photos!", rating: 5 },
        { user: "Noah S.", comment: "Premium feel.", rating: 4 }
      ],
      images: [
        "https://example.com/xiaomi14_green1.jpg",
        "https://example.com/xiaomi14_green2.jpg",
        "https://example.com/xiaomi14_green3.jpg",
        "https://example.com/xiaomi14_green4.jpg"
      ],
      rating: 4.7
    },
    {
      id: 79,
      name: "Logitech MX Keys",
      category: "accessories",
      color: "Space Gray",
      currentprice: 119.99,
      prevprice: 139.99,
      location: "Switzerland",
      amount: 70,
      description: "Premium wireless keyboard for productivity.",
      detailed_description: "The Logitech MX Keys features backlit keys, multi-device connectivity, and a comfortable typing experience. Perfect for professionals.",
      reviews: [
        { user: "Sophia W.", comment: "Love the typing feel!", rating: 5 },
        { user: "Lucas R.", comment: "Sleek design.", rating: 4 }
      ],
      images: [
        "https://example.com/mxkeys_gray1.jpg",
        "https://example.com/mxkeys_gray2.jpg",
        "https://example.com/mxkeys_gray3.jpg",
        "https://example.com/mxkeys_gray4.jpg"
      ],
      rating: 4.7
    },
    {
      id: 80,
      name: "HP Pavilion Aero 13",
      category: "laptops",
      color: "Natural Silver",
      currentprice: 799.99,
      prevprice: 899.99,
      location: "USA",
      amount: 20,
      description: "Lightweight laptop for everyday use.",
      detailed_description: "The HP Pavilion Aero 13 features a 13.3-inch 2.5K display, AMD Ryzen 7 7735U, 16GB RAM, and 512GB SSD. Ultra-portable and efficient.",
      reviews: [
        { user: "Mia T.", comment: "Super lightweight!", rating: 5 },
        { user: "Jacob L.", comment: "Great for travel.", rating: 4 }
      ],
      images: [
        "https://example.com/pavilionaero_silver1.jpg",
        "https://example.com/pavilionaero_silver2.jpg",
        "https://example.com/pavilionaero_silver3.jpg",
        "https://example.com/pavilionaero_silver4.jpg"
      ],
      rating: 4.6
    },
    {
      id: 81,
      name: "Bose SoundLink Flex",
      category: "accessories",
      color: "Stone Blue",
      currentprice: 149.99,
      prevprice: 169.99,
      location: "USA",
      amount: 80,
      description: "Compact Bluetooth speaker with rugged design.",
      detailed_description: "The Bose SoundLink Flex offers IP67 waterproofing, 12-hour battery life, and PositionIQ technology for optimal sound. Perfect for outdoor adventures.",
      reviews: [
        { user: "Emma L.", comment: "Great sound for size!", rating: 5 },
        { user: "Liam T.", comment: "Very durable.", rating: 4 }
      ],
      images: [
        "https://example.com/soundlinkflex_blue1.jpg",
        "https://example.com/soundlinkflex_blue2.jpg",
        "https://example.com/soundlinkflex_blue3.jpg",
        "https://example.com/soundlinkflex_blue4.jpg"
      ],
      rating: 4.7
    },
    {
      id: 82,
      name: "ASUS TUF Gaming A15",
      category: "laptops",
      color: "Graphite Black",
      currentprice: 1099.99,
      prevprice: 1299.99,
      location: "Taiwan",
      amount: 18,
      description: "Durable gaming laptop with high performance.",
      detailed_description: "The ASUS TUF Gaming A15 features a 15.6-inch FHD 144Hz display, AMD Ryzen 7 7735HS, NVIDIA RTX 4060, 16GB RAM, and 1TB SSD. Ideal for gamers.",
      reviews: [
        { user: "Noah S.", comment: "Runs games smoothly!", rating: 5 },
        { user: "Ava R.", comment: "Solid build quality.", rating: 4 }
      ],
      images: [
        "https://example.com/tufgaminga15_black1.jpg",
        "https://example.com/tufgaminga15_black2.jpg",
        "https://example.com/tufgaminga15_black3.jpg",
        "https://example.com/tufgaminga15_black4.jpg"
      ],
      rating: 4.6
    },
    {
      id: 83,
      name: "Samsung Galaxy S24",
      category: "smartphones",
      color: "Onyx Black",
      currentprice: 799.99,
      prevprice: 899.99,
      location: "South Korea",
      amount: 40,
      description: "Flagship smartphone with AI enhancements.",
      detailed_description: "The Galaxy S24 features a 6.2-inch Dynamic AMOLED 2X display, Snapdragon 8 Gen 3, 8GB RAM, and 50MP triple-camera system. Supports 5G and Galaxy AI.",
      reviews: [
        { user: "Sophia W.", comment: "Amazing AI features!", rating: 5 },
        { user: "Lucas P.", comment: "Great display.", rating: 4 }
      ],
      images: [
        "https://example.com/galaxys24_black1.jpg",
        "https://example.com/galaxys24_black2.jpg",
        "https://example.com/galaxys24_black3.jpg",
        "https://example.com/galaxys24_black4.jpg"
      ],
      rating: 4.7
    },
    {
      id: 84,
      name: "Dell S2721QS 27-inch",
      category: "electronics",
      color: "Silver",
      currentprice: 349.99,
      prevprice: 399.99,
      location: "USA",
      amount: 25,
      description: "4K monitor for work and entertainment.",
      detailed_description: "The Dell S2721QS features a 27-inch 4K IPS display, 99% sRGB, and built-in speakers. Ideal for productivity and multimedia.",
      reviews: [
        { user: "Mia T.", comment: "Sharp and vibrant!", rating: 5 },
        { user: "Jacob R.", comment: "Great for multitasking.", rating: 4 }
      ],
      images: [
        "https://example.com/s2721qs_silver1.jpg",
        "https://example.com/s2721qs_silver2.jpg",
        "https://example.com/s2721qs_silver3.jpg",
        "https://example.com/s2721qs_silver4.jpg"
      ],
      rating: 4.6
    },
    {
      id: 85,
      name: "TCL QM8 65-inch",
      category: "smart tv",
      color: "Black",
      currentprice: 1499.99,
      prevprice: 1699.99,
      location: "China",
      amount: 12,
      description: "Mini-LED 4K TV with high brightness.",
      detailed_description: "The TCL QM8 65-inch features a 4K Mini-LED display, 120Hz refresh rate, Dolby Vision, and Google TV. Perfect for movies and gaming.",
      reviews: [
        { user: "Noah L.", comment: "Incredible picture quality!", rating: 5 },
        { user: "Ava S.", comment: "Great for bright rooms.", rating: 4 }
      ],
      images: [
        "https://example.com/tclqm8_black1.jpg",
        "https://example.com/tclqm8_black2.jpg",
        "https://example.com/tclqm8_black3.jpg",
        "https://example.com/tclqm8_black4.jpg"
      ],
      rating: 4.7
    },
    {
      id: 86,
      name: "Microsoft Surface Go 3",
      category: "tablets",
      color: "Platinum",
      currentprice: 399.99,
      prevprice: 449.99,
      location: "USA",
      amount: 35,
      description: "Compact tablet for portability and productivity.",
      detailed_description: "The Surface Go 3 features a 10.5-inch PixelSense display, Intel Pentium Gold 6500Y, 8GB RAM, and 128GB SSD. Runs Windows 11.",
      reviews: [
        { user: "Sophia T.", comment: "Perfect for travel!", rating: 5 },
        { user: "Lucas R.", comment: "Good for light tasks.", rating: 4 }
      ],
      images: [
        "https://example.com/surfacego3_platinum1.jpg",
        "https://example.com/surfacego3_platinum2.jpg",
        "https://example.com/surfacego3_platinum3.jpg",
        "https://example.com/surfacego3_platinum4.jpg"
      ],
      rating: 4.6
    },
    {
      id: 87,
      name: "JBL Tune 230NC",
      category: "accessories",
      color: "Black",
      currentprice: 99.99,
      prevprice: 119.99,
      location: "USA",
      amount: 90,
      description: "Wireless earbuds with active noise cancellation.",
      detailed_description: "The JBL Tune 230NC offers 10-hour battery life, IPX4 water resistance, and JBL Pure Bass sound. Great for music and calls.",
      reviews: [
        { user: "Mia B.", comment: "Great sound for price!", rating: 5 },
        { user: "Jacob T.", comment: "Comfortable fit.", rating: 4 }
      ],
      images: [
        "https://example.com/tune230nc_black1.jpg",
        "https://example.com/tune230nc_black2.jpg",
        "https://example.com/tune230nc_black3.jpg",
        "https://example.com/tune230nc_black4.jpg"
      ],
      rating: 4.6
    },
    {
      id: 88,
      name: "HP Omen 16",
      category: "laptops",
      color: "Shadow Black",
      currentprice: 1399.99,
      prevprice: 1599.99,
      location: "USA",
      amount: 15,
      description: "High-performance gaming laptop.",
      detailed_description: "The HP Omen 16 features a 16.1-inch QHD 165Hz display, AMD Ryzen 9 6900HX, NVIDIA RTX 3070 Ti, 16GB RAM, and 1TB SSD. Ideal for gamers.",
      reviews: [
        { user: "Ava L.", comment: "Fantastic gaming performance!", rating: 5 },
        { user: "Noah S.", comment: "Runs a bit warm.", rating: 4 }
      ],
      images: [
        "https://example.com/omen16_black1.jpg",
        "https://example.com/omen16_black2.jpg",
        "https://example.com/omen16_black3.jpg",
        "https://example.com/omen16_black4.jpg"
      ],
      rating: 4.7
    },
    {
      id: 89,
      name: "Realme Narzo 60",
      category: "smartphones",
      color: "Cosmic Black",
      currentprice: 299.99,
      prevprice: 349.99,
      location: "China",
      amount: 50,
      description: "Budget smartphone with fast performance.",
      detailed_description: "The Realme Narzo 60 features a 6.6-inch FHD+ 120Hz display, Dimensity 6020, 8GB RAM, and 128GB storage. Supports 33W fast charging.",
      reviews: [
        { user: "Sophia R.", comment: "Great for gaming!", rating: 5 },
        { user: "Lucas T.", comment: "Good value.", rating: 4 }
      ],
      images: [
        "https://example.com/narzo60_black1.jpg",
        "https://example.com/narzo60_black2.jpg",
        "https://example.com/narzo60_black3.jpg",
        "https://example.com/narzo60_black4.jpg"
      ],
      rating: 4.6
    },
    {
      id: 90,
      name: "LG UltraFine 27UN880",
      category: "electronics",
      color: "Black",
      currentprice: 499.99,
      prevprice: 549.99,
      location: "South Korea",
      amount: 20,
      description: "4K monitor with USB-C hub.",
      detailed_description: "The LG UltraFine 27UN880 features a 27-inch 4K IPS display, 99% sRGB, USB-C with 60W power delivery, and ergonomic stand. Great for creators.",
      reviews: [
        { user: "Mia W.", comment: "Perfect for photo editing!", rating: 5 },
        { user: "Jacob L.", comment: "Versatile connectivity.", rating: 4 }
      ],
      images: [
        "https://example.com/ultrafine27_black1.jpg",
        "https://example.com/ultrafine27_black2.jpg",
        "https://example.com/ultrafine27_black3.jpg",
        "https://example.com/ultrafine27_black4.jpg"
      ],
      rating: 4.7
    },
    {
      id: 91,
      name: "Sony Bravia XR A95K 55-inch",
      category: "smart tv",
      color: "Black",
      currentprice: 2499.99,
      prevprice: 2799.99,
      location: "Japan",
      amount: 8,
      description: "Premium QD-OLED TV with vibrant colors.",
      detailed_description: "The Sony Bravia XR A95K 55-inch features a 4K QD-OLED display, XR Cognitive Processor, Dolby Vision, and Google TV. Ideal for cinematic experiences.",
      reviews: [
        { user: "Noah T.", comment: "Best TV I’ve seen!", rating: 5 },
        { user: "Ava R.", comment: "Pricey but stunning.", rating: 4 }
      ],
      images: [
        "https://example.com/a95k_black1.jpg",
        "https://example.com/a95k_black2.jpg",
        "https://example.com/a95k_black3.jpg",
        "https://example.com/a95k_black4.jpg"
      ],
      rating: 4.8
    },
    {
      id: 92,
      name: "Lenovo Yoga Tab 13",
      category: "tablets",
      color: "Shadow Black",
      currentprice: 649.99,
      prevprice: 699.99,
      location: "China",
      amount: 25,
      description: "Premium tablet with built-in kickstand.",
      detailed_description: "The Lenovo Yoga Tab 13 features a 13-inch 2K LTPS display, Snapdragon 870, 8GB RAM, and 256GB storage. Supports stylus and HDMI input.",
      reviews: [
        { user: "Sophia L.", comment: "Great for streaming!", rating: 5 },
        { user: "Lucas W.", comment: "Versatile design.", rating: 4 }
      ],
      images: [
        "https://example.com/yogatab13_black1.jpg",
        "https://example.com/yogatab13_black2.jpg",
        "https://example.com/yogatab13_black3.jpg",
        "https://example.com/yogatab13_black4.jpg"
      ],
      rating: 4.7
    },
    {
      id: 93,
      name: "Razer Kraken V3 HyperSense",
      category: "accessories",
      color: "Black",
      currentprice: 129.99,
      prevprice: 149.99,
      location: "USA",
      amount: 60,
      description: "Gaming headset with haptic feedback.",
      detailed_description: "The Razer Kraken V3 HyperSense features THX Spatial Audio, haptic feedback, and RGB lighting. Ideal for immersive gaming experiences.",
      reviews: [
        { user: "Mia T.", comment: "Love the haptic feedback!", rating: 5 },
        { user: "Jacob S.", comment: "Comfortable for long sessions.", rating: 4 }
      ],
      images: [
        "https://example.com/krakenv3_black1.jpg",
        "https://example.com/krakenv3_black2.jpg",
        "https://example.com/krakenv3_black3.jpg",
        "https://example.com/krakenv3_black4.jpg"
      ],
      rating: 4.7
    },
    {
      id: 94,
      name: "MSI Optix MAG274QRF-QD",
      category: "electronics",
      color: "Black",
      currentprice: 449.99,
      prevprice: 499.99,
      location: "Taiwan",
      amount: 20,
      description: "QHD gaming monitor with quantum dot technology.",
      detailed_description: "The MSI Optix MAG274QRF-QD features a 27-inch QHD 165Hz IPS display, 97% DCI-P3, and G-Sync compatibility. Perfect for gaming and content creation.",
      reviews: [
        { user: "Ava L.", comment: "Vibrant colors!", rating: 5 },
        { user: "Noah T.", comment: "Great for FPS games.", rating: 4 }
      ],
      images: [
        "https://example.com/optixmag274_black1.jpg",
        "https://example.com/optixmag274_black2.jpg",
        "https://example.com/optixmag274_black3.jpg",
        "https://example.com/optixmag274_black4.jpg"
      ],
      rating: 4.7
    },
    {
      id: 95,
      name: "Vivo Y78",
      category: "smartphones",
      color: "Aurora Green",
      currentprice: 249.99,
      prevprice: 299.99,
      location: "China",
      amount: 55,
      description: "Budget smartphone with 5G support.",
      detailed_description: "The Vivo Y78 features a 6.64-inch FHD+ 120Hz display, Dimensity 6020, 8GB RAM, and 128GB storage. Supports 44W fast charging.",
      reviews: [
        { user: "Sophia S.", comment: "Great for the price!", rating: 5 },
        { user: "Lucas R.", comment: "Decent performance.", rating: 4 }
      ],
      images: [
        "https://example.com/vivoy78_green1.jpg",
        "https://example.com/vivoy78_green2.jpg",
        "https://example.com/vivoy78_green3.jpg",
        "https://example.com/vivoy78_green4.jpg"
      ],
      rating: 4.6
    },
    {
      id: 96,
      name: "Lenovo Legion Pro 7i",
      category: "laptops",
      color: "Onyx Grey",
      currentprice: 1999.99,
      prevprice: 2299.99,
      location: "China",
      amount: 10,
      description: "Premium gaming laptop with top-tier performance.",
      detailed_description: "The Lenovo Legion Pro 7i features a 16-inch WQXGA 240Hz display, Intel Core i9-13900HX, NVIDIA RTX 4080, 32GB RAM, and 1TB SSD. Ideal for gamers.",
      reviews: [
        { user: "Mia W.", comment: "Blazing fast!", rating: 5 },
        { user: "Jacob L.", comment: "Premium build.", rating: 4 }
      ],
      images: [
        "https://example.com/legionpro7i_grey1.jpg",
        "https://example.com/legionpro7i_grey2.jpg",
        "https://example.com/legionpro7i_grey3.jpg",
        "https://example.com/legionpro7i_grey4.jpg"
      ],
      rating: 4.8
    },
    {
      id: 97,
      name: "Anker PowerConf C200",
      category: "accessories",
      color: "Black",
      currentprice: 59.99,
      prevprice: 69.99,
      location: "China",
      amount: 100,
      description: "1080p webcam for video conferencing.",
      detailed_description: "The Anker PowerConf C200 features 1080p resolution, AI noise cancellation, and a wide-angle lens. Perfect for Zoom and Teams calls.",
      reviews: [
        { user: "Ava T.", comment: "Clear video quality!", rating: 5 },
        { user: "Noah S.", comment: "Easy to use.", rating: 4 }
      ],
      images: [
        "https://example.com/powerconfc200_black1.jpg",
        "https://example.com/powerconfc200_black2.jpg",
        "https://example.com/powerconfc200_black3.jpg",
        "https://example.com/powerconfc200_black4.jpg"
      ],
      rating: 4.6
    },
    {
      id: 98,
      name: "Samsung QN85C 75-inch",
      category: "smart tv",
      color: "Black",
      currentprice: 1999.99,
      prevprice: 2299.99,
      location: "South Korea",
      amount: 10,
      description: "Neo QLED TV with vibrant colors.",
      detailed_description: "The Samsung QN85C 75-inch features a 4K Neo QLED display, 120Hz refresh rate, Quantum HDR, and Tizen OS. Great for gaming and streaming.",
      reviews: [
        { user: "Sophia L.", comment: "Stunning visuals!", rating: 5 },
        { user: "Lucas T.", comment: "Great smart features.", rating: 4 }
      ],
      images: [
        "https://example.com/qn85c_black1.jpg",
        "https://example.com/qn85c_black2.jpg",
        "https://example.com/qn85c_black3.jpg",
        "https://example.com/qn85c_black4.jpg"
      ],
      rating: 4.7
    },
    {
      id: 99,
      name: "Oppo Find N3 Flip",
      category: "smartphones",
      color: "Cream Gold",
      currentprice: 999.99,
      prevprice: 1099.99,
      location: "China",
      amount: 20,
      description: "Foldable smartphone with Hasselblad camera.",
      detailed_description: "The Oppo Find N3 Flip features a 3.26-inch cover display, 6.8-inch AMOLED main display, Dimensity 9200, and Hasselblad-tuned cameras. Supports 44W charging.",
      reviews: [
        { user: "Mia R.", comment: "Love the flip design!", rating: 5 },
        { user: "Jacob W.", comment: "Great camera.", rating: 4 }
      ],
      images: [
        "https://example.com/findn3flip_gold1.jpg",
        "https://example.com/findn3flip_gold2.jpg",
        "https://example.com/findn3flip_gold3.jpg",
        "https://example.com/findn3flip_gold4.jpg"
      ],
      rating: 4.7
    },
    {
      id: 100,
      name: "Microsoft Surface Laptop 5",
      category: "laptops",
      color: "Sage",
      currentprice: 1299.99,
      prevprice: 1499.99,
      location: "USA",
      amount: 15,
      description: "Sleek laptop for productivity and portability.",
      detailed_description: "The Surface Laptop 5 features a 13.5-inch PixelSense display, Intel Core i5-1235U, 16GB RAM, and 512GB SSD. Runs Windows 11.",
      reviews: [
        { user: "Ava S.", comment: "Elegant design!", rating: 5 },
        { user: "Noah T.", comment: "Great for work.", rating: 4 }
      ],
      images: [
        "https://example.com/surfacelaptop5_sage1.jpg",
        "https://example.com/surfacelaptop5_sage2.jpg",
        "https://example.com/surfacelaptop5_sage3.jpg",
        "https://example.com/surfacelaptop5_sage4.jpg"
      ],
      rating: 4.7
    },
    {
      id: 101,
      name: "Sony WH-CH720N",
      category: "accessories",
      color: "Blue",
      currentprice: 129.99,
      prevprice: 149.99,
      location: "Japan",
      amount: 75,
      description: "Wireless headphones with noise cancellation.",
      detailed_description: "The Sony WH-CH720N offers noise cancellation, 35-hour battery life, and USB-C charging. Lightweight and great for everyday use.",
      reviews: [
        { user: "Sophia T.", comment: "Great sound quality!", rating: 5 },
        { user: "Lucas R.", comment: "Comfortable fit.", rating: 4 }
      ],
      images: [
        "https://example.com/whch720n_blue1.jpg",
        "https://example.com/whch720n_blue2.jpg",
        "https://example.com/whch720n_blue3.jpg",
        "https://example.com/whch720n_blue4.jpg"
      ],
      rating: 4.6
    },
    {
      id: 102,
      name: "Acer Predator X34",
      category: "electronics",
      color: "Black",
      currentprice: 1099.99,
      prevprice: 1299.99,
      location: "Taiwan",
      amount: 12,
      description: "Ultrawide QHD gaming monitor.",
      detailed_description: "The Acer Predator X34 features a 34-inch QHD 180Hz curved IPS display, G-Sync, and 95% DCI-P3. Perfect for immersive gaming.",
      reviews: [
        { user: "Mia L.", comment: "Incredible for gaming!", rating: 5 },
        { user: "Jacob S.", comment: "Wide and vibrant.", rating: 4 }
      ],
      images: [
        "https://example.com/predatorx34_black1.jpg",
        "https://example.com/predatorx34_black2.jpg",
        "https://example.com/predatorx34_black3.jpg",
        "https://example.com/predatorx34_black4.jpg"
      ],
      rating: 4.7
    },
    {
      id: 103,
      name: "Realme GT Neo 5",
      category: "smartphones",
      color: "Purple",
      currentprice: 499.99,
      prevprice: 549.99,
      location: "China",
      amount: 40,
      description: "Mid-range smartphone with ultra-fast charging.",
      detailed_description: "The Realme GT Neo 5 features a 6.74-inch AMOLED 144Hz display, Snapdragon 8+ Gen 1, and 240W fast charging. Great for gaming.",
      reviews: [
        { user: "Ava T.", comment: "Charges in minutes!", rating: 5 },
        { user: "Noah L.", comment: "Great performance.", rating: 4 }
      ],
      images: [
        "https://example.com/gtneo5_purple1.jpg",
        "https://example.com/gtneo5_purple2.jpg",
        "https://example.com/gtneo5_purple3.jpg",
        "https://example.com/gtneo5_purple4.jpg"
      ],
      rating: 4.6
    },
    {
      id: 104,
      name: "Samsung Galaxy Tab S8 Ultra",
      category: "tablets",
      color: "Graphite",
      currentprice: 999.99,
      prevprice: 1099.99,
      location: "South Korea",
      amount: 15,
      description: "Premium tablet with large AMOLED display.",
      detailed_description: "The Galaxy Tab S8 Ultra features a 14.6-inch AMOLED 120Hz display, Snapdragon 8 Gen 1, 12GB RAM, and 256GB storage. Supports S Pen.",
      reviews: [
        { user: "Sophia R.", comment: "Huge and vibrant screen!", rating: 5 },
        { user: "Lucas T.", comment: "Great for productivity.", rating: 4 }
      ],
      images: [
        "https://example.com/tabs8ultra_graphite1.jpg",
        "https://example.com/tabs8ultra_graphite2.jpg",
        "https://example.com/tabs8ultra_graphite3.jpg",
        "https://example.com/tabs8ultra_graphite4.jpg"
      ],
      rating: 4.8
    },
    {
      id: 105,
      name: "LG G3 65-inch OLED",
      category: "smart tv",
      color: "Black",
      currentprice: 2499.99,
      prevprice: 2799.99,
      location: "South Korea",
      amount: 8,
      description: "Premium OLED TV with brightness booster.",
      detailed_description: "The LG G3 65-inch features a 4K OLED display with Brightness Booster, α9 Gen6 AI Processor, and Dolby Vision. Perfect for home theater.",
      reviews: [
        { user: "Mia W.", comment: "Stunning picture quality!", rating: 5 },
        { user: "Jacob R.", comment: "Great for movies.", rating: 4 }
      ],
      images: [
        "https://example.com/lgg3_black1.jpg",
        "https://example.com/lgg3_black2.jpg",
        "https://example.com/lgg3_black3.jpg",
        "https://example.com/lgg3_black4.jpg"
      ],
      rating: 4.8
    },
    {
      id: 106,
      name: "Logitech G915 TKL",
      category: "accessories",
      color: "Carbon",
      currentprice: 199.99,
      prevprice: 229.99,
      location: "Switzerland",
      amount: 50,
      description: "Wireless mechanical keyboard for gaming.",
      detailed_description: "The Logitech G915 TKL features low-profile mechanical switches, LIGHTSPEED wireless, and RGB lighting. Compact and ideal for gamers.",
      reviews: [
        { user: "Ava S.", comment: "Love the low-profile keys!", rating: 5 },
        { user: "Noah T.", comment: "Sleek and responsive.", rating: 4 }
      ],
      images: [
        "https://example.com/g915tkl_carbon1.jpg",
        "https://example.com/g915tkl_carbon2.jpg",
        "https://example.com/g915tkl_carbon3.jpg",
        "https://example.com/g915tkl_carbon4.jpg"
      ],
      rating: 4.7
    },
    {
      id: 107,
      name: "ASUS VivoBook 15",
      category: "laptops",
      color: "Slate Grey",
      currentprice: 649.99,
      prevprice: 749.99,
      location: "Taiwan",
      amount: 25,
      description: "Affordable laptop for everyday tasks.",
      detailed_description: "The ASUS VivoBook 15 features a 15.6-inch FHD display, Intel Core i5-1235U, 8GB RAM, and 512GB SSD. Great for students and professionals.",
      reviews: [
        { user: "Sophia L.", comment: "Good for daily use!", rating: 5 },
        { user: "Lucas R.", comment: "Decent battery life.", rating: 4 }
      ],
      images: [
        "https://example.com/vivobook15_grey1.jpg",
        "https://example.com/vivobook15_grey2.jpg",
        "https://example.com/vivobook15_grey3.jpg",
        "https://example.com/vivobook15_grey4.jpg"
      ],
      rating: 4.6
    },
    {
      id: 108,
      name: "Seagate BarraCuda 4TB",
      category: "electronics",
      color: "Silver",
      currentprice: 99.99,
      prevprice: 119.99,
      location: "USA",
      amount: 60,
      description: "High-capacity HDD for storage needs.",
      detailed_description: "The Seagate BarraCuda 4TB offers 7200 RPM, SATA 6Gb/s, and reliable performance. Perfect for desktops and external storage.",
      reviews: [
        { user: "Mia T.", comment: "Huge storage!", rating: 5 },
        { user: "Jacob S.", comment: "Reliable drive.", rating: 4 }
      ],
      images: [
        "https://example.com/barracuda4tb_silver1.jpg",
        "https://example.com/barracuda4tb_silver2.jpg",
        "https://example.com/barracuda4tb_silver3.jpg",
        "https://example.com/barracuda4tb_silver4.jpg"
      ],
      rating: 4.6
    },
    {
      id: 109,
      name: "OnePlus Pad",
      category: "tablets",
      color: "Halo Green",
      currentprice: 479.99,
      prevprice: 529.99,
      location: "China",
      amount: 30,
      description: "High-performance tablet with fast refresh rate.",
      detailed_description: "The OnePlus Pad features an 11.61-inch 144Hz LCD display, Dimensity 9000, 8GB RAM, and 128GB storage. Supports 67W fast charging.",
      reviews: [
        { user: "Ava R.", comment: "Smooth and fast!", rating: 5 },
        { user: "Noah L.", comment: "Great for media.", rating: 4 }
      ],
      images: [
        "https://example.com/onepluspad_green1.jpg",
        "https://example.com/onepluspad_green2.jpg",
        "https://example.com/onepluspad_green3.jpg",
        "https://example.com/onepluspad_green4.jpg"
      ],
      rating: 4.7
    },
    {
      id: 110,
      name: "Hisense U6K 55-inch",
      category: "smart tv",
      color: "Black",
      currentprice: 499.99,
      prevprice: 599.99,
      location: "China",
      amount: 20,
      description: "Affordable 4K Mini-LED TV.",
      detailed_description: "The Hisense U6K 55-inch features a 4K Mini-LED display, 60Hz refresh rate, Dolby Vision, and Google TV. Great for budget buyers.",
      reviews: [
        { user: "Sophia T.", comment: "Amazing value!", rating: 5 },
        { user: "Lucas R.", comment: "Good picture quality.", rating: 4 }
      ],
      images: [
        "https://example.com/hisenseu6k_black1.jpg",
        "https://example.com/hisenseu6k_black2.jpg",
        "https://example.com/hisenseu6k_black3.jpg",
        "https://example.com/hisenseu6k_black4.jpg"
      ],
      rating: 4.6
    },
    {
      id: 111,
      name: "Vivo V29",
      category: "smartphones",
      color: "Rose Gold",
      currentprice: 399.99,
      prevprice: 449.99,
      location: "China",
      amount: 45,
      description: "Mid-range smartphone with stylish design.",
      detailed_description: "The Vivo V29 features a 6.44-inch AMOLED 120Hz display, Snapdragon 778G, 8GB RAM, and 50MP triple-camera system. Supports 44W charging.",
      reviews: [
        { user: "Mia L.", comment: "Beautiful design!", rating: 5 },
        { user: "Jacob T.", comment: "Good camera.", rating: 4 }
      ],
      images: [
        "https://example.com/vivov29_gold1.jpg",
        "https://example.com/vivov29_gold2.jpg",
        "https://example.com/vivov29_gold3.jpg",
        "https://example.com/vivov29_gold4.jpg"
      ],
      rating: 4.6
    },
    {
      id: 112,
      name: "Razer BlackShark V2 Pro",
      category: "accessories",
      color: "White",
      currentprice: 179.99,
      prevprice: 199.99,
      location: "USA",
      amount: 50,
      description: "Wireless gaming headset with THX audio.",
      detailed_description: "The Razer BlackShark V2 Pro features THX Spatial Audio, 50mm drivers, and 24-hour battery life. Perfect for esports and gaming.",
      reviews: [
        { user: "Ava S.", comment: "Immersive sound!", rating: 5 },
        { user: "Noah R.", comment: "Lightweight design.", rating: 4 }
      ],
      images: [
        "https://example.com/blacksharkv2_white1.jpg",
        "https://example.com/blacksharkv2_white2.jpg",
        "https://example.com/blacksharkv2_white3.jpg",
        "https://example.com/blacksharkv2_white4.jpg"
      ],
      rating: 4.7
    },
    {
      id: 113,
      name: "Dell Alienware m16",
      category: "laptops",
      color: "Dark Metallic Moon",
      currentprice: 1899.99,
      prevprice: 2199.99,
      location: "USA",
      amount: 10,
      description: "High-performance gaming laptop.",
      detailed_description: "The Alienware m16 features a 16-inch QHD+ 165Hz display, Intel Core i7-13700HX, NVIDIA RTX 4070, 16GB RAM, and 1TB SSD. Ideal for gamers.",
      reviews: [
        { user: "Sophia T.", comment: "Powerful performance!", rating: 5 },
        { user: "Lucas R.", comment: "Great cooling system.", rating: 4 }
      ],
      images: [
        "https://example.com/alienwarem16_moon1.jpg",
        "https://example.com/alienwarem16_moon2.jpg",
        "https://example.com/alienwarem16_moon3.jpg",
        "https://example.com/alienwarem16_moon4.jpg"
      ],
      rating: 4.7
    },
    {
      id: 114,
      name: "Samsung T9 Portable SSD 1TB",
      category: "electronics",
      color: "Black",
      currentprice: 149.99,
      prevprice: 179.99,
      location: "South Korea",
      amount: 50,
      description: "Fast portable SSD for creators.",
      detailed_description: "The Samsung T9 Portable SSD offers 1TB storage, read/write speeds up to 2000 MB/s, and USB 3.2 Gen 2x2. Rugged and ideal for video editing.",
      reviews: [
        { user: "Mia R.", comment: "Blazing fast transfers!", rating: 5 },
        { user: "Jacob L.", comment: "Compact and durable.", rating: 4 }
      ],
      images: [
        "https://example.com/t9ssd_black1.jpg",
        "https://example.com/t9ssd_black2.jpg",
        "https://example.com/t9ssd_black3.jpg",
        "https://example.com/t9ssd_black4.jpg"
      ],
      rating: 4.7
    },
    {
      id: 115,
      name: "Xiaomi Smart Band 8",
      category: "accessories",
      color: "Black",
      currentprice: 49.99,
      prevprice: 59.99,
      location: "China",
      amount: 100,
      description: "Affordable fitness tracker with AMOLED display.",
      detailed_description: "The Xiaomi Smart Band 8 features a 1.62-inch AMOLED display, heart rate monitoring, and 14-day battery life. Supports 150+ sports modes.",
      reviews: [
        { user: "Ava T.", comment: "Great for fitness!", rating: 5 },
        { user: "Noah S.", comment: "Light and comfy.", rating: 4 }
      ],
      images: [
        "https://example.com/smartband8_black1.jpg",
        "https://example.com/smartband8_black2.jpg",
        "https://example.com/smartband8_black3.jpg",
        "https://example.com/smartband8_black4.jpg"
      ],
      rating: 4.6
    },
    {
      id: 116,
      name: "Sony Xperia 1 V",
      category: "smartphones",
      color: "Black",
      currentprice: 1299.99,
      prevprice: 1399.99,
      location: "Japan",
      amount: 15,
      description: "Premium smartphone with 4K display.",
      detailed_description: "The Sony Xperia 1 V features a 6.5-inch 4K OLED 120Hz display, Snapdragon 8 Gen 2, and 48MP triple-camera system. Ideal for content creators.",
      reviews: [
        { user: "Sophia L.", comment: "Stunning 4K display!", rating: 5 },
        { user: "Lucas T.", comment: "Great for video.", rating: 4 }
      ],
      images: [
        "https://example.com/xperia1v_black1.jpg",
        "https://example.com/xperia1v_black2.jpg",
        "https://example.com/xperia1v_black3.jpg",
        "https://example.com/xperia1v_black4.jpg"
      ],
      rating: 4.7
    },
    {
      id: 117,
      name: "Lenovo IdeaPad 3",
      category: "laptops",
      color: "Arctic Grey",
      currentprice: 499.99,
      prevprice: 599.99,
      location: "China",
      amount: 30,
      description: "Budget laptop for students and professionals.",
      detailed_description: "The Lenovo IdeaPad 3 features a 15.6-inch FHD display, AMD Ryzen 5 5500U, 8GB RAM, and 256GB SSD. Great for everyday tasks.",
      reviews: [
        { user: "Mia S.", comment: "Good for schoolwork!", rating: 5 },
        { user: "Jacob R.", comment: "Solid performance.", rating: 4 }
      ],
      images: [
        "https://example.com/ideapad3_grey1.jpg",
        "https://example.com/ideapad3_grey2.jpg",
        "https://example.com/ideapad3_grey3.jpg",
        "https://example.com/ideapad3_grey4.jpg"
      ],
      rating: 4.6
    },
    {
      id: 118,
      name: "LG 32UN550-W",
      category: "electronics",
      color: "Silver",
      currentprice: 349.99,
      prevprice: 399.99,
      location: "South Korea",
      amount: 25,
      description: "4K monitor for work and gaming.",
      detailed_description: "The LG 32UN550-W features a 32-inch 4K VA display, 90% DCI-P3, and HDR10. Supports FreeSync for smooth gaming.",
      reviews: [
        { user: "Ava L.", comment: "Great for multitasking!", rating: 5 },
        { user: "Noah T.", comment: "Vivid colors.", rating: 4 }
      ],
      images: [
        "https://example.com/lg32un550_silver1.jpg",
        "https://example.com/lg32un550_silver2.jpg",
        "https://example.com/lg32un550_silver3.jpg",
        "https://example.com/lg32un550_silver4.jpg"
      ],
      rating: 4.6
    },
    {
      id: 119,
      name: "Huawei Mate 60 Pro",
      category: "smartphones",
      color: "Green",
      currentprice: 999.99,
      prevprice: 1099.99,
      location: "China",
      amount: 20,
      description: "Flagship smartphone with Kirin chip.",
      detailed_description: "The Huawei Mate 60 Pro features a 6.82-inch OLED 120Hz display, Kirin 9000S, 12GB RAM, and 50MP triple-camera system. Supports 88W charging.",
      reviews: [
        { user: "Sophia R.", comment: "Powerful performance!", rating: 5 },
        { user: "Lucas W.", comment: "Great camera.", rating: 4 }
      ],
      images: [
        "https://example.com/mate60pro_green1.jpg",
        "https://example.com/mate60pro_green2.jpg",
        "https://example.com/mate60pro_green3.jpg",
        "https://example.com/mate60pro_green4.jpg"
      ],
      rating: 4.7
    },
    {
      id: 120,
      name: "Samsung Odyssey G5 32-inch",
      category: "electronics",
      color: "Black",
      currentprice: 399.99,
      prevprice: 449.99,
      location: "South Korea",
      amount: 30,
      description: "Curved QHD gaming monitor.",
      detailed_description: "The Samsung Odyssey G5 features a 32-inch QHD 165Hz curved VA display, 1ms response time, and FreeSync Premium. Ideal for gaming.",
      reviews: [
        { user: "Mia T.", comment: "Immersive gaming experience!", rating: 5 },
        { user: "Jacob S.", comment: "Great for the price.", rating: 4 },
        { user: "james y.", comment: "very lovely", rating: 5}

      ],
      images: [
        "https://example.com/odysseyg5_black1.jpg",
        "https://example.com/odysseyg5_black2.jpg",
        "https://example.com/odysseyg5_black3.jpg",
        "https://example.com/odysseyg5_black4.jpg"
      ],
      rating: 4.6
    }
  ]
  private filteredProduct = new BehaviorSubject<Product[]>(this.products);
  products$ = this.filteredProduct.asObservable();


  constructor() {
     console.log('product service initialize!');
     
   }
 
  


  searchProducts(term: string, category: string) {

    const lowerTerm = term.toLowerCase().trim();
    
    const results = this.products.filter(p => {
      const matchName = p.name.toLowerCase().includes(lowerTerm);
      const matchCategory =
        category === 'All Category' || p.category.toLowerCase().includes(category.toLowerCase());
      return matchName && matchCategory;
    });
    
    console.log('filtered result ');
    
    this.filteredProduct.next(results)


  }
  getAllProducts(): Product[]{
    return this.products
  }

  getProductById(id: number): Product | undefined{
    return  this.products.find(p => p.id === id)!;
  }

  }
