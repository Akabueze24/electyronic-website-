import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';


export interface Product {
  id: number;
  name: string;
  category: 'accessories' | 'electronics' | 'laptops' | 'tablets' | 'smartphones' | 'smart-tv' | 'computer' | 'mobile';
  color: string[];
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
  selectedColor?: string,



  isNew?: boolean;
  isFeatured?: boolean;
  isTopSelling?: boolean;
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
      color: ["Space Black", "Silver", "Gold", "Deep Purple"],
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
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764364481/iphone-14-pro-5_hyeo4j.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764364484/iphone-14-pro-1_g30h5m.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764364484/iphone-14-pro-2_vkfswt.png",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764364481/iphone-14-pro-5_hyeo4j.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764364480/iphone-14-pro-3_tormml.jpg"
      ],
      rating: 4.8
    },
    {
      id: 2,
      name: "Samsung Galaxy S23 Ultra",
      category: "smartphones",
      color: ["Phantom Black", "Cream", "Green", "Lavender"],
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
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764366394/samsung-galaxy-s23-ultra-5_ezgcrl.webp",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764366403/samsung-galaxy-s23-ultra-3_ohq0b9.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764366396/samsung-galaxy-s23-ultra-2_x61vse.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764366394/samsung-galaxy-s23-ultra-5_ezgcrl.webp",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764366394/samsung-galaxy-s23-ultra-4_jetrfe.jpg"
      ],
      rating: 4.7,

      isNew: true,
      isFeatured: true,
      isTopSelling: false
    },
    {
      id: 3,
      name: "Dell XPS 13",
      category: "laptops",
      color: ["Silver", "Starlight", "Platinum"],
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
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764366931/dell_xps_13-1_zsn8wb.webp",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764366929/dell_xps_13-2_vwclsf.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764366928/dell_xps_13-5_lhqilv.webp",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764366927/dell_xps_13-4_usj6lz.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764366928/dell_xps_13-3_l2gb08.jpg"
      ],
      rating: 4.6,

      isNew: false,
      isFeatured: true,
      isTopSelling: true
    },
    {
      id: 4,
      name: "Sony WH-1000XM5",
      category: "accessories",
      color: ["Black", "Graphite Silver"],
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
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764367375/111_nnofpn.png",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764367369/333_y8phzf.avif",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764367369/222_a52j6n.avif",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764367369/444_tj3ovy.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764367368/555_wvevdw.avif"
      ],
      rating: 4.9,

      isNew: true,
      isFeatured: false,
      isTopSelling: true
    },
    {
      id: 5,
      name: "Samsung QN90B 55-inch",
      category: "smart-tv",
      color: ["Titan Gray", "Graphite Black"],
      currentprice: 1499.99,
      prevprice: 1799.99,
      location: "South Korea",
      amount: 15,
      description: "4K QLED smart-tv with vibrant colors.",
      detailed_description: "The Samsung QN90B features a 55-inch 4K QLED display, Quantum HDR 32X, and Tizen OS for seamless streaming and gaming.",
      reviews: [
        { user: "David S.", comment: "Picture quality is unreal!", rating: 5 },
        { user: "Anna G.", comment: "Sound could be better.", rating: 4 }
      ],
      images: [
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764619546/samsung-neo-qled-4k-smart-tv-qn90b-55-inch-right-view_nsoys3.png",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764619545/latin-en-qled-qn90b-qn55qn90bapxpa-532149644_vdvpph.png",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764619545/sHgCBNWRkieGNFCyV8xsxm_ujga7v.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764619544/83d6c704-bd07-48ff-ba9e-2035534f3bea.c0d24ca4f473ce7900e0ce10593faf20_ryecud.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764619543/SAMSUNG-55-Class-QN90B-Neo-QLED-4K-Smart-TV-QN55QN85BAFXZA-2022_864831fe-b868-4c89-b391-713e1f1b2922.21b9dfea36fdda4f39d2e827845e8197_kyxqmg.jpg"
      ],
      rating: 4.7,

      isNew: false,
      isFeatured: true,
      isTopSelling: true
    },
    {
      id: 6,
      name: "Apple iPad Pro 12.9",
      category: "tablets",
      color: ["Space Gray", "Silver"],
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
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764619915/spacegray-2_dwisv6.png",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764619907/refurb-ipad-pro-12-wifi-spacegray-2021_tu6xh9.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/a_90/a_hflip/c_crop,ar_1:1/v1764619911/03Y7jw1z1HYAENTC0RaJzjz-2.fit_lim.size_1050x_kgipxp.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764619907/HPLX2_rvmiva.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764619907/HPLX2_rvmiva.jpg"
      ],
      rating: 4.8,

      isNew: false,
      isFeatured: true,
      isTopSelling: false,


    },
    {
      id: 7,
      name: "Logitech MX Master 3",
      category: "accessories",
      color: ["Graphite", "Pale Grey"],
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
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764632671/mx-master-3s-business-product-callout_b25jlp.png",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764632671/mx-master-3-rubber-wear-after-3-years-of-nearly-daily-use-v0-nrmwglucae0d1_dejdxa.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764632671/mx-master-3s-for-business-gallery-1_j8kuy6.png",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764632671/exposing-the-truth-logitech-mx-master-3-and-3s-for-mac-v0-mxe3pa0hfwyc1_tkwj6t.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764632671/design-medium_okajuw.jpg"
      ],
      rating: 4.7,

      isNew: true,
      isFeatured: false,
      isTopSelling: false
    },
    {
      id: 8,
      name: "HP Spectre x360 14",
      category: "laptops",
      color: ["Nightfall Black", "Poseidon Blue", "Natural Silver"],
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
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764632988/hp-spectre-x360-14-review-high-end-convertible-now-with-a-v0-3F-NqWoS0R-vGic5Sjuj9gB150kSYIXDEkII0IzvGQ4_ryskcn.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764632985/hp-spectre-x360-14-main_zjpxg7.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764632983/c08744400_gikstr.png",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764632981/HP_20Spectre_20x360_2014__Mobile_2x_mfm8wx.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764632980/image_n64dcb.jpg"
      ],
      rating: 4.6,

      isNew: true,
      isFeatured: true,
      isTopSelling: false
    },
    {
      id: 9,
      name: "Google Pixel 8",
      category: "smartphones",
      color: ["Obsidian", "Hazel", "Rose"],
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
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764633174/google-pixel-8-pro-768x475_fkpwqu.png",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764633176/google-shiba-hazel_zfjsay.webp",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764633178/Google-Pixel-8-Pro_review_1-1_vgf6q3.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764633181/Google-Pixel-8-Pro_review_1-1_ob6whp.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764633183/hqdefault_ody1kn.jpg"
      ],
      rating: 4.7
    },
    {
      id: 10,
      name: "LG OLED C3 65-inch",
      category: "smart-tv",
      color: ["Black"],
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
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764633363/LG-65-Class-4K-UHD-OLED-Web-OS-Smart-TV-with-Dolby-Vision-C3-Series-OLED65C3PUA_4507d0a3-83cb-4420-9c59-ef2c191d7fe7.3c9fdb1665a5e2074e0c8c38fc251fff_xuezwt.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764633360/lg-c3-65-inch-evo-oled-tv-oled65c3pua_5t5t_z9fzvn.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764633364/back-small_yyqgn1.jpg",
        "https://res.cloudinary_com/dsao6ghfo/image/upload/v1764633367/01NBbV7RTID4k1aEpU8oxPD-5.fit_lim.size_1050x_xw3fxx.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764633370/lg-oled-evo-c3-65-inch-4k-smart-tv-or-oled65c34la__50238.1722438265_lopjsg.jpg"
      ],
      rating: 4.8
    },
    {
      id: 11,
      name: "Apple MacBook Pro 16 M2",
      category: "laptops",
      color: ["Space Gray", "Silver"],
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
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764633617/MacBook-Pro-M2-Max-review_0000_20230202_014725507_iOS_pat9sd.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764633605/52635-105565-16-inch-MacBook-Pro-with-M2-Max-xl_bey9pl.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764633608/refurb-mbp16-m2-spacegray-202303_AV3_vmubeh.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764633611/Apple-MacBook-Pro-M2-Pro-and-M2-Max-hero-230117_Full-Bleed-Image.jpg.large_hkuefu.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764633614/16-inch-macbook-pro-2023-fcp1_u1qhle.jpg"
      ],
      rating: 4.8
    },
    {
      id: 12,
      name: "Anker PowerCore 20000",
      category: "accessories",
      color: ["Black", "White"],
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
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764633807/A1268013_1_dery9d.png",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764633812/718wsrEuQ6L_ofgzim.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764633814/renditionDownload_jdyyjz.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764633815/Anker-PowerCore-Metro-Essential-Power-Bank-20000mAh_hxpisw.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764633818/7c08719c-b219-4251-88be-7e580fa5d751.ab037e69773f1f60a305934e401438fc_c1ni7f.png"
      ],
      rating: 4.7
    },
    {
      id: 13,
      name: "Samsung Galaxy Tab S9",
      category: "tablets",
      color: ["Graphite", "Lime", "Lavender"],
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
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764634161/maxresdefault_gpdbq6.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764634151/galaxy-tab-s9-size-graphite-startframe-mo_axaust.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764634151/samsung-galaxy-tab-s9-ultra_63jp.1920_dl2l7o.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764634156/TabS9FE-FE_KV_MO_720x720_ldvsfc.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764634158/Screenshot-2023-08-02-134750_h20wpc.png"
      ],
      rating: 4.7
    },
    {
      id: 14,
      name: "ASUS ROG Strix G16",
      category: "laptops",
      color: ["Black", "Eclipse Gray"],
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
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764634631/81n1T4CYfmL._AC_UF894_1000_QL80__lv1ege.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764634634/71kOH3in8TL._AC_UF894_1000_QL80__are2zr.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764634637/rog-strix-g-16_i0qdjv.png",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764634645/16_91bdcc2b-d77f-48d6-8857-8aa31b83bd68_nrmavv.png",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764634641/rog-strix-g-16_yfcp7z.png"
      ],
      rating: 4.6
    },
    {
      id: 15,
      name: "Sony Bravia XR A80J 55-inch",
      category: "smart-tv",
      color: ["Black"],
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
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764634790/101455_original_local_1200x1050_v3_converted_dgsh9g.webp",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764634793/92073_original_local_1200x1050_v3_converted_nlicfe.webp",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764634797/92066_original_local_1200x1050_v3_converted_uhslin.webp",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764634801/XR55A80J_09_ya3ukl.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764634805/61-nsp9J-JS._AC_SL1200__uetafn.jpg"
      ],
      rating: 4.8
    },
    {
      id: 16,
      name: "Xiaomi 13 Pro",
      category: "smartphones",
      color: ["Ceramic White", "Black", "Bora Purple"],
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
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764635015/61vFWIksgcL._AC_UF894_1000_QL80__nfabrj.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764635018/25063acab659d7f38d5f2959ad808d04_jqop6k.png",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764635023/xiaomi-13-pro_u8mrdr.png",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764635027/Xiaomi_13_pro_1_ahisbe.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764635031/xiaomi-13-pro-review-finally-a-xiaomi-flagship-with-a-great_vtvw_txeyiy.jpg"
      ],
      rating: 4.7
    },
    {
      id: 17,
      name: "JBL Flip 6",
      category: "accessories",
      color: ["Blue", "Black", "Stone Blue", "Teal"],
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
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764635222/61Eaj593GtL._AC_UF1000_1000_QL80__nhgty8.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764635226/design-medium_vvcxmf.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764635230/61Eaj593GtL_n5bdaw.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764635234/71zohVROdFL._AC_UF350_350_QL80__bnpzh6.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764635238/JBL_Flip_6_hero_brick_rjrksu.jpg"
      ],
      rating: 4.6
    },
    {
      id: 18,
      name: "Lenovo IdeaCentre AIO 3",
      category: "electronics",
      color: ["Black"],
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
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764635600/lenovo-monitor-ideacentre-aio-3-24-amd-subseries-hero_jukoul.png",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764635603/w0uk0t2uc291b4f89i6cb7bi9588tn961529_x2qwqc.png",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764635608/Lenovo-IdeaCentre-AIO-3-27IMB05--F0EY--original-IPS-display-FHD--1920x1080--matt-60Hz-pId-75884887_3_qdogz4.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764635613/RRRRQBQDX_o9jnz6.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764635617/s-l400_w2atau.jpg"
      ],
      rating: 4.5
    },
    {
      id: 19,
      name: "OnePlus Nord 3",
      category: "smartphones",
      color: ["Misty Green", "Midnight Black", "Slate Gray"],
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
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764635823/51zmjtNE6EL._AC_UF1000_1000_QL80__stzkkl.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764635828/oneplusnord3header_lbidps.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764635832/hq720_ojiu5c.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764635838/gsmarena_001_ziz17o.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764635842/OnePlus-Nord-3-will-not-be-sold-in-the-UK_vx7mfm.jpg"
      ],
      rating: 4.6
    },
    {
      id: 20,
      name: "WD Black SN850X 1TB",
      category: "electronics",
      color: ["Black"],
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
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764636031/XznGAj929i82MWrAHPH4Eo-1200-80_zljie0.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764636026/WD-Black-SN850X-1TB-Cover_h6zr8a.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764636016/XznGAj929i82MWrAHPH4Eo-2000-80_fwtu9f.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764636021/WD-Black-SN850X-1TB-Box_is11ui.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764636012/WD_1TB_SN850X_BOX_1000x_lyi0ah.png"
      ],
      rating: 4.7
    },
    {
      id: 21,
      name: "Bose QuietComfort Earbuds",
      category: "accessories",
      color: ["Triple Black", "White Smoke", "Stone Blue", "Eclipse Grey"],
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
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764636187/SF_QCEB25_BLACK_PDP_ECOMM-GALLERY_IMG-1_m2igu0.png",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764636181/COM-1750_QCEBII_RT_2000x2000_DynamicAngle_black_RGB-psd_j1b3pm.png",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764636176/CREA-1078_QCEB25_Black_CaseOpenView_7200x7200_nk6dtr.png",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764636171/cq5dam.web.1920.1920_jxjhzt.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764636167/51ovbrRvF1L_yynssa.jpg",

      ],
      rating: 4.7
    },
    {
      id: 22,
      name: "Acer Predator Helios 300",
      category: "laptops",
      color: ["Black", "Abyssal Black"],
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
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764636591/4_zu_3_helios300_n0nxil.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764636585/81g7AiqWrtL_p2p6ps.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764636574/61rjV21bzfL._AC_UF894_1000_QL80__gaki3r.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764636580/Triton_20300_20-_20Floating_nexmlc.png",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764636570/Predator-Helios-300-PH-315-54-Bl-Bk-05_cuz0sg.jpg"
      ],
      rating: 4.6
    },
    {
      id: 23,
      name: "Samsung Odyssey G7 27-inch",
      category: "electronics",
      color: ["Black", "White"],
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
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764637011/G70NC_005_L-Perspective_White_1600x1200_adwxtt.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764637005/ac3199e8-a545-42d8-8952-73f6cd00b607_c0xwo2.webp",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764636993/2_G70D_27inch_Product_02_Inches_wvdtc2.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764636989/G70D_LS27DG702ENXZA_s-com_s88klp.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764637001/in-odyssey-g7-g70d-ls27dg700ewxxl-545029836_d7rzmh.png"
      ],
      rating: 4.7
    },
    {
      id: 24,
      name: "Apple Watch Series 9",
      category: "accessories",
      color: ["Midnight", "Starlight", "Silver", "Pink", "Red", "(PRODUCT)RED"],
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
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764637175/apple-watch-series-9_birazm.png",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764637181/refurb-45-stainless-graphite-sport-band-midnight-s9_ejamfw.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764637188/Apple-Watch-S9-hero-230912_Full-Bleed-Image.jpg.large_erw7oe.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764637175/apple-watch-series-9_birazm.png",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764637199/hq720_hjwrap.jpg"
      ],
      rating: 4.7
    },
    {
      id: 25,
      name: "Google Pixel Tablet",
      category: "tablets",
      color: ["Porcelain", "Hazel", "Rose"],
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
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764637391/DwjEEz9EqLvL0HHbIZsdtjj2uMWg5KttRFxa_pcxnal.png",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764637396/03857ea8-5e6b-45b2-a4f9-4c7dc619b8d2.__CR0_0_600_450_PT0_SX600_V1____e0pvbg.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764637402/W_Hpaayi9BtTLTKakxE4aPKeSXBiIFiRlyfg9U1oZqTrj_mZCHE-Fz59zr11uyfro-g15olBvk5ZSBHr1Cz-a21cYCt8tpryv2S695s_rw-e365-w842-v1_weoebb.webp",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764637408/81NRDwow4BL_ycclkq.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764637414/Google-Pixel-Tablet-Colors-2-980x628_m0qhwp.jpg"
      ],
      rating: 4.6
    },
    {
      id: 26,
      name: "TCL 6-Series 65-inch",
      category: "smart-tv",
      color: ["Black"],
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
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764637872/R635-NFL-Front_wmb6sr.png",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764637858/61XuCM8yhLL_gt609j.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764637851/tcl-6-series-tv-r6-2022-6384_lky7mn.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764637846/55r635-angled-left-hero-100876601-orig_yna94u.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764637851/tcl-6-series-tv-r6-2022-6384_lky7mn.jpg"
      ],
      rating: 4.6
    },
    {
      id: 27,
      name: "Realme GT 5",
      category: "smartphones",
      color: ["Polar Silver", "Flowing Silver", "Stargaze Black"],
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
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764638211/realmegt5teaser_juckyx.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764638204/S3f98978a31dc45dda0773faa6df8d4708_hes8xf.webp",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764638198/0bd78caa-fe0e-4924-b7e1-b665f882ba81_zinct0.webp",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764638185/realme-gt5-150w_x6vteb.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764638191/S39d0b9e056734d03a3b405f9aa54913ft_p5n2qn.webp"
      ],
      rating: 4.7
    },
    {
      id: 28,
      name: "Logitech G Pro X Keyboard",
      category: "accessories",
      color: ["Black"],
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
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764638427/61ep6omO_0L._AC_UF894_1000_QL80__phsvmc.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764638420/pro-x-keyboard-gallery-1_gy77qk.png",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764638413/design-medium_kmauhx.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764638420/pro-x-keyboard-gallery-1_gy77qk.png",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764638407/gallery-4-pro-x-tkl-black-lightspeed-gaming-keyboard.png_ybes0i.png"
      ],
      rating: 4.7
    },
    {
      id: 29,
      name: "Lenovo Legion 5 Pro",
      category: "laptops",
      color: ["Storm Grey", "Glacier White"],
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
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764638631/elsxf6rwrtxudesy107rsj88cg0qhx499173_li6mfd.png",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764638638/Legion_5_Pro_16IAH7H_OverViewPic_twvzzd.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764638644/maxresdefault_agcapx.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764638651/hqdefault_nu9cnq.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764638658/95ictst7gj332wfl11t7z3e8zfceti849742_qrimoe.png"
      ],
      rating: 4.6
    },
    {
      id: 30,
      name: "Seagate FireCuda 530 2TB",
      category: "electronics",
      color: ["Black"],
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
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764638863/seagate-firecuda-530-2tb-nvme-ssd-7_bbpf4b.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764638842/seagate-firecuda-530-2tb-nvme-ssd-1_xyydcx.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764638855/71A0NOrhVmL_iyhzo2.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764638849/Seagate-Firecuda-530-Gen4-SSD-4_lkurqy.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764638870/81ei_J_8ceL_dk0ybb.jpg"
      ],
      rating: 4.7
    },
    {
      id: 31,
      name: "Samsung Galaxy Z Fold 5",
      category: "smartphones",
      color: ["Phantom Black", "Cream", "Icy Blue", "Graygreen", "Blue"],
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
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764639064/kv_animated_MO_gnhnoq.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764639055/-original-imagztmghzuhz7kf_itg2bk.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764639033/samsung-galaxy-z-fold-4-6662_sjq6ov.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764639048/51PT-U0762L._AC_UF894_1000_QL80__yo3qdg.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764639041/51j7o_cmJ-L_xxcffl.jpg",
      ],
      rating: 4.7
    },
    {
      id: 32,
      name: "Sony WF-1000XM5",
      category: "accessories",
      color: ["Black", "Silver", "Smoky Pink"],
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
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764639319/713IRzfhsEL._AC_UF894_1000_QL80__nlsbpr.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764639311/61GJAFdM9pL_vhtdml.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764639304/maxresdefault_dmx1y9.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764639289/61GJAFdM9pL._AC_UF894_1000_QL80__h2u11y.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764639296/design-medium_aokvra.jpg"
      ],
      rating: 4.8
    },
    {
      id: 33,
      name: "HP Omen 27u 4K",
      category: "electronics",
      color: ["Black"],
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
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764639859/mew-27-shadow-black-core-set-rear_o1wwaa.png",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764639850/monitor-hp-omen-27u-4k-144hz-refurb-277-00-699-00-422-00-v0-18T6J2Xdmll1Qcrupz5yX9SOOueVXUS985RiJ14IAT8_yjog3q.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764639842/edit-omen-title-1_i1xdej.png",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764639847/ports-1_2x_it50ig.png",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764639855/06ZAwql6oRKKPO2B4FXSpHh-3_p4ga9x.jpg"
      ],
      rating: 4.7
    },
    {
      id: 34,
      name: "Apple iPad Air 5",
      category: "tablets",
      color: ["Space Gray", "Starlight", "Pink", "Purple", "Blue"],
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
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764640853/maxresdefault_xmpvzq.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764640848/spin_reverse_static__ehmkt90jzu6a_large_bg7ugs.png",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764640844/DSC0960586_gfyqww.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764640844/DSC0960586_gfyqww.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764640858/111887_sp866-portimage2_e1jqkx.png"
      ],
      rating: 4.7
    },
    {
      id: 35,
      name: "LG UltraGear 32GP850",
      category: "electronics",
      color: ["Black"],
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
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764641085/design-medium_a4mm0i.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764641090/medium01_auumt1.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764641104/mnt-32gp850-08-1-stylish-desgn-m_mxd2pq.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764641099/back-small_x1aqv1.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764641099/32GP850-B_Gaming-Monitors_stylish-desgn-m_zerzq6.jpg"
      ],
      rating: 4.6
    },
    {
      id: 36,
      name: "Oppo Find X6 Pro",
      category: "smartphones",
      color: ["Black", "Brown", "Green"],
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
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764641395/oppo-find-x6-pro_wgo4ih.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764641386/oppo-find-x6-pro-1_f9rpxv.png",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764641390/Oppo-Find-X6-Pro_featured-image-packshot-review_ek8w3y.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764641399/main_llsuok.png",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764641405/gsmarena_001_fcdybt.jpg",
      ],
      rating: 4.7
    },
    {
      id: 37,
      name: "Razer Blade 15",
      category: "laptops",
      color: ["Black", "Mercury White"],
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
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764641844/blade_dljci5.png",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764641854/1312_blade_2018.png_intkqw.png",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764641860/Blade_15_Fall_2018_Base_Model_Render_13_mhubvz.png",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764641848/3900-1-EN-v1_ozdom5.png",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764641839/new-razer-blade-15-2022-nvidia-mobile_atlq3k.webp",
      ],
      rating: 4.7
    },
    {
      id: 38,
      name: "Anker 737 Charger",
      category: "accessories",
      color: ["Black"],
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
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764642095/filters_3Aformat_28png_29_3Aupscale_28_29_dr2pz9.png",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764642089/Anker-737-Charger-GaNPrime-120W-UK-High-Speed_2C-Black_isiypx.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764642083/DE_2_dgzfan.png",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764642073/A2148311-Anker_737_Charger_GaNPrime_120W_cyx8ft.png",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764642078/6581837c9540a_Anker-735-USB-C-Charger-Nano-II-65W-Black-Featured__26147-slider_gl3mim.jpg"
      ],
      rating: 4.7
    },
    {
      id: 39,
      name: "Hisense U8K 55-inch",
      category: "smart-tv",
      color: ["Black"],
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
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764646579/714LAhAd8RL._AC_UF1000_1000_QL80__nqotbd.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764646587/hisense_u8k_tvd_small_cngmbn.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764646597/Hisense-U8K-Review-feature_n76pxs.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764646606/71W5bLVrLcL._AC_UF350_350_QL80__iaekkl.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764646634/hisense-u8k_11jk_l5ayp9.jpg"
      ],
      rating: 4.6
    },
    {
      id: 40,
      name: "Microsoft Surface Pro 9",
      category: "tablets",
      color: ["Platinum", "Graphite", "Sapphire", "Forest"],
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
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764646777/PDP-Highlight-Consumer-Pro-9-Platinum-001_VP1-539x440_txnroq.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764646777/PDP-Highlight-Consumer-Pro-9-Platinum-001_VP1-539x440_txnroq.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764646777/PDP-Highlight-Consumer-Pro-9-Platinum-001_VP1-539x440_txnroq.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764646831/Content-Card-Surface-Pro-9-EB-Angle_shjbfj.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764646853/PDP-Highlight-Consumer-Pro-9-Sapphire-001_VP1-539x440_lp7gax.jpg"
      ],
      rating: 4.6
    },
    {
      id: 41,
      name: "Apple AirPods Pro 2",
      category: "accessories",
      color: ["White"],
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
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764646978/Apple-AirPods-Pro-2-Wireless-Earbuds-Active-Noise-Cancellation-Hearing-Aid-Feature_4e23623d-94ed-4bac-851a-b1fde7eeb962.1523af65ffb7f2e2be28c8b3f0a008fa_r9jza8.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764646962/111851_sp880-airpods-Pro-2nd-gen_d4d2dz.png",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764646967/refurb-airpodspro-usbc-2024_mkipio.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764646957/Apple-AirPods-Pro-2nd-generation-USB-C-connection-230912_inline.jpg.large_v9pbbb.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764646978/Apple-AirPods-Pro-2-Wireless-Earbuds-Active-Noise-Cancellation-Hearing-Aid-Feature_4e23623d-94ed-4bac-851a-b1fde7eeb962.1523af65ffb7f2e2be28c8b3f0a008fa_r9jza8.jpg"
      ],
      rating: 4.8
    },
    {
      id: 42,
      name: "ASUS ZenBook 14 OLED",
      category: "laptops",
      color: ["Ponder Blue", "Jade Black"],
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
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764647158/838fbdac-6d10-4190-8e52-d4b9463f5d23_uk4r7o.png",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764647164/asus-zenbook-14-oled-ux3405_1dtx_cqh8pj.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764647169/51TgIfem9vL._AC_UF894_1000_QL80__jek4al.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764647180/4f4e3cbc-adac-4b50-85f9-647020c096b8_txj6yy.png",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764647204/related_products_06_au2yqn.jpg"
      ],
      rating: 4.7
    },
    {
      id: 43,
      name: "Samsung Galaxy A54",
      category: "smartphones",
      color: ["Awesome Graphite", "Awesome Lime", "Awesome Violet", "Awesome White"],
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
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764647480/164094-phones-news-confirmed-samsung-s-galaxy-a54-to-be-announced-on-18-january-image1-3gkzjywb86_lwnmao.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764647463/awesomegraphite-1_ax8jpd.png",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764647457/51orKJJMfTL._AC_UF894_1000_QL80__utmj2j.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764647468/343612276_229756379675519_821885322546032143_n_omdwnm.png",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764647474/hq720_kiuilq.jpg",

      ],
      rating: 4.6
    },
    {
      id: 44,
      name: "Dell UltraSharp 32 4K",
      category: "electronics",
      color: ["Silver", "Black"],
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
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764647778/04tAxtxl7qY6W6z1nTGoaQX-10.v_1569469975_z4n7zz.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764647784/monitor-p3225qe-pro-plus-c-black-gallery-1_y6t5bp.png",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764647790/210-BRJC_wm9j5y.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764647795/Dell-UltraSharp-32-4K-Monitor-3_vjvfft.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764647801/48656-95153-dell-apple-studiio-display-xl_mglzp4.jpg"
      ],
      rating: 4.7
    },
    {
      id: 45,
      name: "LG C4 77-inch OLED",
      category: "smart-tv",
      color: ["Black"],
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
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764648165/oled-c4-16-ultra-slim-design-m_esbtmq.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764648170/large04_ybzb9n.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764648176/81XMzlM2LTL._AC_UF1000_1000_QL80__crbaqt.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764648182/TV_OLED77C4PUA_gallery_03_3000x3000_lpbdkg.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764648188/oled-c4-20-vast-size-m_zt51hc.jpg"
      ],
      rating: 4.8
    },
    {
      id: 46,
      name: "Lenovo Tab P11 Pro",
      category: "tablets",
      color: ["Storm Grey", "Luna Grey"],
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
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764648371/ycumf4z4oia108az0pq0kzvf17wdws486228_sgefyv.png",

        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764648378/c190f2n0f9lmv94pmedshimgmo7uov605035_vnufam.png",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764648383/lenovo-tab-p11-pro-subseries-gallery-10_giqlzy.png",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764648389/herobanner3.2b8a2056a4ffa707_xaeaxz.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764648396/5o9twoob6uoo9xi88nzstkdq2izwmp380380_sjirpx.jpg"
      ],
      rating: 4.6
    },
    {
      id: 47,
      name: "Razer DeathAdder V3 Pro",
      category: "accessories",
      color: ["Black", "White"],
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
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764648704/https_3A_2F_2Fmedias-p1.phoenix.razer.com_2Fsys-master-phoenix-images-container_2Fhc9_2Fh51_2F9449963946014_2Fdeathadder-v3-pro-black-v2-500x500_l21zu2.png",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764648698/71wNhcQ-wQL_pxuxvt.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764648685/the-best-mouse-for-gaming-and-esports-deathadder-v3-pro-or-v0-054a81tasmta1_jauo4s.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764648680/71fRKz9pUnL_jwv82l.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764648698/71wNhcQ-wQL_pxuxvt.jpg"
      ],
      rating: 4.7
    },
    {
      id: 48,
      name: "HP Envy Desktop",
      category: "electronics",
      color: ["Black", "Natural Silver"],
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
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764648958/hq720_fgfb0n.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764648945/71fOGgAce-L_g4dvd0.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764648958/hq720_fgfb0n.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764648951/51aQrHPnw6L_xa2xbj.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764648945/71fOGgAce-L_g4dvd0.jpg"
      ],
      rating: 4.6
    },
    {
      id: 49,
      name: "Google Pixel 8 Pro",
      category: "smartphones",
      color: ["Obsidian", "Porcelain", "Bay"],
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
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764649171/5174_xwbuq2.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764649171/5174_xwbuq2.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764649162/Google-8-Pro-Porcelain_oo3ggi.png",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764649171/5174_xwbuq2.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764649171/5174_xwbuq2.jpg",
      ],
      rating: 4.8
    },
    {
      id: 50,
      name: "Sony X90L 65-inch",
      category: "smart-tv",
      color: ["Black"],
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
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764649388/711993yRD-L._AC_UF1000_1000_QL80__mfqvpp.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764649414/78c61234-9ad2-4205-89d2-4b45d6853da0.a6f29b09cbff2b31953f4626cfa5b312_ngvjgs.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764649376/112241_original_local_1200x1050_v3_converted_py6drg.webp",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764649382/012b6d47-fb3f-4afb-afe0-692598ffbf64.32419defe789b1072a0b864224387385_af1ew8.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764649432/sony-bravia-XR-X90L-4k-tv-2023-rear-angled.jpg_wgeecn.jpg"
      ],
      rating: 4.7
    },
    {
      id: 51,
      name: "Xiaomi Pad 6",
      category: "tablets",
      color: ["Gravity Gray", "Gold", "Mist Blue"],
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
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764664707/81CWAlJLQqL_z7nxlk.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764664707/xiaomi-pad6_lz2v4c.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764664708/csm_FtkUGtQXwAAWWnK_3992c04e54_tfvt3g.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764664708/6796c627a784d9df30e38193709b886b_qljtlu.png",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764664731/6796c627a784d9df30e38193709b886b_mrcwbd.png"
      ],
      rating: 4.6
    },
    {
      id: 52,
      name: "Logitech Brio Ultra HD",
      category: "accessories",
      color: ["Black"],
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
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764664901/3164WHXq1hL._AC_UF1000_1000_QL80__jeex3s.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764664901/baGcJc7zl9Y2fmNjYcy8N_ftzdr6.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764664902/51sX-WzU-nL_gftgyj.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764664900/brio-webcam-attachable-privacy-shutter-additional-feature-2_y012dd.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764664901/brio-gallery-1_ytmdd1.png"
      ],
      rating: 4.7
    },
    {
      id: 53,
      name: "MSI Katana GF66",
      category: "laptops",
      color: ["Black"],
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
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764665087/msi-katana-gf66-11ud-11400h-1669131344_m0lxv1.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764665088/71yfvV8Wk9L_m4muj1.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764665087/kv-laptop-l_outela.png",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764665092/kv-laptop_irirp7.png",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764665090/400_z4vbpd.png"
      ],
      rating: 4.6
    },
    {
      id: 54,
      name: "Samsung T7 Shield 2TB",
      category: "electronics",
      color: ["Black", "Blue", "Beige"],
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
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764665392/61L9DmGqVgL._AC_UF894_1000_QL80__ka95ld.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764665455/1B-Workshop_Top-bown-shot-of-workstation_3361-Gallery-1600x1200_aecmlw.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764665371/SAMSUNG-T7-Shield-1TB-3-Blue_xcr7uz.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764665374/o-cung-di-dong-2tb-external-ssd-samsung-t7-shield-usb-3-2-gen-2-mu-pe2t0_xhpyj0.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764665370/81ngYSjZePL._AC_UF350_350_QL80__xsj0i4.jpg"
      ],
      rating: 4.7
    },
    {
      id: 55,
      name: "OnePlus 11",
      category: "smartphones",
      color: ["Titan Black", "Eternal Green"],
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
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764665725/salami-share_scst1m.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764665727/P1010084_wahbi6.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764665729/wbmgou5ab44a1_goh9sr.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764665722/green-img_p24vmo.png",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764665723/images-kv-mo-1.png_qqtwky.webp"
      ],
      rating: 4.7
    },
    {
      id: 56,
      name: "TCL 5-Series 50-inch",
      category: "smart-tv",
      color: ["Black"],
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
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764665897/S535-S531_0002_Angled-Right-copy_mj3zqu.png",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764665890/f4c0e2b1-2d10-4dfe-b681-1da9dac3d164.2364876c6c6ee0b391ff4ac5c746914a_ytunwj.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764665890/NFL-S546_Front-720x480_csfrie.png",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764665893/50S535-Back_vdomsy.png",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764665889/S535-S531_0000_Front-copy_hqorn6.png"
      ],
      rating: 4.6
    },
    {
      id: 57,
      name: "JBL Charge 5",
      category: "accessories",
      color: ["Black", "Blue", "Red", "Grey", "Teal", "White", "Pink", "Squad"],
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
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764666129/JBL_CHARGE_5_WIFI_SE_LIFESTYLE_02_904x560px_izmhug.png",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764666131/JBL_CHARGE5_BOTTOM_BLACK_0191_x1_rhoy5d.png",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764666134/61qMO3TS2RL._AC_UF894_1000_QL80__jvyua6.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764666138/JBL_CHARGE5_FRONT_GREEN_0077_x2_sw06tj.png",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764666141/JBL_CHARGE5_Wi-Fi_SE_Box_Image_SKU_1605x1605px_iotdgs.png"
      ],
      rating: 4.7
    },
    {
      id: 58,
      name: "Acer Aspire 5",
      category: "laptops",
      color: ["Pure Silver", "Charcoal Black"],
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
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764666348/71vvXGmdKWL_j74aim.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764666350/71FZX5wl5GL._AC_UF894_1000_QL80__wxwfez.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764666353/715OQs2sA_L._AC_UF350_350_QL80__li5jik.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764666356/xak2rL9SXroC8S82KpBq8X_pzsfjk.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764666358/10-acer-aspire-a515-54-51dj_fezwz0.jpg"
      ],
      rating: 4.5
    },
    {
      id: 59,
      name: "Samsung Galaxy Watch 6",
      category: "accessories",
      color: ["Graphite", "Silver", "Gold"],
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
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764666566/61GT3v2ztOL_dxwur8.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764666563/711f6KLsMaL._AC_UF894_1000_QL80__dscx2a.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764666562/galaxy-watch6-customize-mo_esjmi0.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764666558/galaxy-watch6-safety-mo_grqvii.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764666555/galaxy-watch6-kv-pc_ohjtbe.jpg"
      ],
      rating: 4.7
    },
    {
      id: 60,
      name: "Realme Pad Mini",
      category: "tablets",
      color: ["Grey", "Blue"],
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
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764666807/realme-pad-mini_xdl5ei.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764666809/realme-pad-mini-770x433_tjo5zm.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764666812/maxresdefault_knxlst.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764666816/realme_pad_mini_front_hero_xnlwfv.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764666820/Untitled8357_v4me9z.jpg"
      ],
      rating: 4.5
    },
    {
      id: 61,
      name: "LG 27QN600 27-inch",
      category: "electronics",
      color: ["Black"],
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
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764666965/27QN600-B-1-27-QHD-IPS-M_imdk0a.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764666961/61GCcaIduLS._AC_UF350_350_QL80__lout3k.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764666958/61PFYgGCfNS_em9nvj.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764666956/md07510383-zoom-01-jpg_dtgepw.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764666951/6108mgCPGzS._AC_UF894_1000_QL80__i3ka5r.jpg",
      ],
      rating: 4.6
    },
    {
      id: 62,
      name: "Vivo X90 Pro",
      category: "smartphones",
      color: ["Legendary Black", "China Red"],
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
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764667235/61aSBP-1ldL_rfsvyx.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764667237/maxresdefault_icq8z4.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764667241/maxresdefault_eyhztd.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764667249/X90-Pro_Black_4_t5iyop.webp",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764667358/vivo_X90_pro_max_plus_ultra_king_cgye6o.png"
      ],
      rating: 4.7
    },
    {
      id: 63,
      name: "Dell G15 Gaming Laptop",
      category: "laptops",
      color: ["Dark Shadow Grey", "Specter Green"],
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
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764667551/454c18d1-98f5-41b0-b4d5-4b247317227e.__CR0_0_800_600_PT0_SX800_V1____uwdy36.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764667547/652eac84be9edfa8eda2c156_mvcgmy.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764667543/V36ND21110235SYF_lv8kih.webp",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764667540/laptops_g-series_g15-5515-phantom-grey-coral-kb_gallery_1_iq8zdj.png",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764667536/notebook-g15-5530-nt-coral-black-gallery-1_iswko8.png"
      ],
      rating: 4.6
    },
    {
      id: 64,
      name: "Sony WF-C510/B",
      category: "accessories",
      color: ["Black", "White", "Blue", "Orange"],
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
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764667806/b1ff1d1a-c08e-48c2-a916-3e03418b76cb.__CR0_0_600_450_PT0_SX600_V1____jluipb.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764667803/sony-earbuds-WFC510B-front-view.jpg_peg950.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764667798/121608_original_local_1200x1050_v3_converted_kchnfr.webp",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764667794/51B6_Iyd3ML_mumqpc.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764667790/121267_original_local_1200x1050_v3_converted_vu2eiy.webp"
      ],
      rating: 4.6
    },
    {
      id: 65,
      name: "Hisense U7K 75-inch",
      category: "smart-tv",
      color: ["Black"],
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
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764668085/1000726636-430x430_fawqk3.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764668088/TV_20U7K_1a_qe8kxz.png",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764668092/71TVx7GPJAL._AC_UF350_350_QL80__vatwmm.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764668097/71EODVhgtoL._AC_SL1500_zhqref.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764668101/sddefault_af6siz.jpg"
      ],
      rating: 4.7
    },
    {
      id: 66,
      name: "Samsung Galaxy Z Flip 5",
      category: "smartphones",
      color: ["Mint", "Cream", "Lavender", "Graphite", "Gray"],
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
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764668454/61IqkfGCw5L_ejatds.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764668458/UNPK_B5Q5-PR_main1_q1x3ik.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764668463/Samsung-Galaxy-Z-Flip5-and-Galaxy-Z-Fold5-Review-Featured-Gear_fcj5uo.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764668468/kv_animated_MO_k9src5.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764668473/product_color_lavender_nbz77y.png"
      ],
      rating: 4.7
    },
    {
      id: 67,
      name: "Anker Soundcore Motion+",
      category: "accessories",
      color: ["Black", "Red", "Blue"],
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
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764668701/71AkH2N1c3L._AC_UF894_1000_QL80__vluz0q.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764668695/5_237d67dc-cc7b-4772-afff-ee5f27c6c76b_iczakg.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764668690/design-large_zonyfu.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764668681/A3116011-Motion_-2000x2000-01_sklsba.png",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764668685/YwPhaMwPFRGf5JfXz3d6d8_hn9pnf.jpg"
      ],
      rating: 4.7
    },
    {
      id: 68,
      name: "Lenovo ThinkPad X1 Carbon Gen 11",
      category: "laptops",
      color: ["Black", "Deep Black"],
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
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764668952/IMG_1204_eankon.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764668958/lenovo-thinkpad-x1-carbon-gen-11-2023_9uxc_qsur5x.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764668962/7qjkk7h1a53t8jq5snivyzumxw040v193587_rcxtn4.png",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764668967/x1-carbon-gen-11-lid_kyv79x.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764668973/lenovo-thinkpad-x1-gen-11-metal-cover-01_lnpqfc.png"
      ],
      rating: 4.7
    },
    {
      id: 69,
      name: "WD My Passport 5TB",
      category: "electronics",
      color: ["Black", "Blue", "Red", "Silver"],
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
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764669232/51tXR09l5qL_c2q5zn.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764669237/A14DWcn1AlL_fnwohr.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764669242/9854073_zbzelr.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764669247/07FEceZlKAslEH6IgJdzskl-2..v1580860876_hq8uzu.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764669252/WD-MP-USBC-hero-a-3_w7fldn.webp"
      ],
      rating: 4.6
    },
    {
      id: 70,
      name: "Samsung Galaxy Tab A9+",
      category: "tablets",
      color: ["Graphite", "Silver", "Navy"],
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
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764669455/61h_qeD-qfL._AC_UF894_1000_QL80__pbihpl.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764669467/ca-feature-galaxy-tab-a9---tab-a9--539122883_eeadds.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764669461/7195wIGhbuL_x0kelo.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764669450/01eb17zxmEiSBZAvZVKrTCU-13.fit_lim.size_1050x_ivndnq.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764669447/61d46oYQgdL_t98tjy.jpg"
      ],
      rating: 4.5
    },
    {
      id: 71,
      name: "Sony Bravia 8 55-inch",
      category: "smart-tv",
      color: ["Black"],
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
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764670629/sony-55-inch-bravia-8-oled-tv-k-55xr80_f9ve.1920_vhvrhw.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764670633/NKjuBo2osuLa5fRpkmXqbS_ue9gla.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764670638/71hz9t5sxoL._AC_UF1000_1000_QL80__uqcgd2.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764670644/sony-tv-bravia-8-oled-dynamic-back-view.jpg_vcsojo.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764670650/sony-55-inch-bravia-8-oled-tv-k-55xr80_f9ve.1200_zgwoai.jpg"
      ],
      rating: 4.8
    },
    {
      id: 72,
      name: "Oppo Reno 10 Pro",
      category: "smartphones",
      color: ["Silvery Grey", "Glossy Purple"],
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
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764670834/images-design-g-right0-mo-1_amfkol.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764670828/coque-oppo-reno-10-pro-plus-effet-metal-support_rhusfs.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764670822/reno10-pro-5g-860_720_jixspy.png",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764670816/71vt6YeFImL_hxrgpy.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764670817/filters_3Aupscale_28_29_phgzml.png"
      ],
      rating: 4.6
    },
    {
      id: 73,
      name: "Razer Basilisk V3",
      category: "accessories",
      color: ["Black"],
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
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764671057/61AcT0ZuO3L_ylnucv.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764671060/razer-basilisk-v3-ecolabel-desktop_vwriyn.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764671064/razer-basilisk-v3-pro-35k-ogimage-1200x630_wd7p30.webp",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764671068/razer-basilisk-v3-pro-35k-gaming-mouse-price-availability-20241002-gadgetmatch_mnujqq.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764671071/810NXVg80TL._AC_UF894_1000_QL80__twvs6q.jpg"
      ],
      rating: 4.7
    },
    {
      id: 74,
      name: "Acer Nitro 5",
      category: "laptops",
      color: ["Shale Black"],
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
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764672395/81lWUzhyBlL_f9x23b.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764672398/Nitro5_AN515-45-56-57_High_03_pueyan.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764672401/Nitro-5_AN515-54_Left__AN517-51_Right_txgnnf.png",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764672408/acer-nitro-5-2021-model-is-it-good-in-2025-i-dont-want-v0-6zbn5cnvhqhe1_yo2mau.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764672405/Nitro-5_AN515-54_Left__AN517-51_Right_kg9ztg.png"
      ],
      rating: 4.6
    },
    {
      id: 75,
      name: "Samsung Odyssey Neo G9",
      category: "electronics",
      color: ["White", "Black"],
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
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764672665/Odyssey-Neo-G9_Dual-UHD-Gaming-Monitor_Main2_mdxdpe.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764672668/2283621-samsung-odyssey-neo-g9-57-inch-review_eivgza.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764672672/samsung-odyssey-neo-g9-review_d6vs_rrzmu9.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764672676/2023-Odyssey-Neo-G9-product3-1200x800_v4d9ig.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764672680/PDPGalleryImage_LS57CG952NNXZA_mpq5qh.jpg"
      ],
      rating: 4.8
    },
    {
      id: 76,
      name: "Huawei MatePad 11",
      category: "tablets",
      color: ["Matte Grey", "Isle Blue"],
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
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764677877/Features-Wap-2_x5lrnb.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764677879/800_800_146D5D97ACD780E9420CDCAEA3253082mp_xsegar.png",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764677880/huawei-matepad-11-2023_ba2anc.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764677884/HUAWEI-MatePad-11-1_g9ntvg.png",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764677888/list_wltynb.png"
      ],
      rating: 4.6
    },
    {
      id: 77,
      name: "Sony INZONE M9",
      category: "electronics",
      color: ["White", "Black"],
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
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764678151/61rN2gV0StL._AC_UF894_1000_QL80__arwc7y.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764678152/Primary_image_1200-42_knxbfs.png",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764678154/maxresdefault_pdoyc1.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764678159/INZONE-M9V2-hero-2_bmrbrv.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764678163/36ef166569756a941d76352625bdbffb_o2njye.png"
      ],
      rating: 4.7
    },
    {
      id: 78,
      name: "Xiaomi 14",
      category: "smartphones",
      color: ["Black", "White", "Jade Green"],
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
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764678379/Jade_green_f3yba3.png",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764678375/ba1d009234a56edd7aec73a7a80a2258_nimta4.png",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764678382/960px-23116PN5BC_rpyblh.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764678367/51hOisZjbeL_eckngj.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764678371/head_lens_img_wutr25.jpg",
      ],
      rating: 4.7
    },
    {
      id: 79,
      name: "Logitech MX Keys",
      category: "accessories",
      color: ["Graphite", "Pale Grey"],
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
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764678602/mx-keys-combo-business-gen-2-gallery-us-graphite-1_wqmbuj.png",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764678598/71W-B4hRrCL._AC_UF894_1000_QL80__rf2bcf.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764678594/mx-keys-s-top-view-black-us_huuixb.png",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764678590/design-medium_srezwg.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764678586/mx-keys-business-keyboard-s-gallery-us-graphite-1_bzfsqz.png"
      ],
      rating: 4.7
    },
    {
      id: 80,
      name: "HP Pavilion Aero 13",
      category: "laptops",
      color: ["Natural Silver", "Ceramic White", "Pale Rose Gold"],
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
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764678791/hp-pavilion-aero-13-overview-100903083-orig_a8hyig.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764678787/hp-pavilion-aero-13-overview_schdld.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764678783/c08932266_vos6zf.png",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764678779/con-nb-zurg-22c1-hp-pavilion-aero-13-be1000-product-image_i5oeq8.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764678774/HP_20Pavilion_20Aero_2013_20Laptop_20PC_20hero_20image_20of_20all_20four_20colors_g0kz8w.jpg"
      ],
      rating: 4.6
    },
    {
      id: 81,
      name: "Bose SoundLink Flex",
      category: "accessories",
      color: ["Black", "Stone Blue", "White Smoke", "Chilled Lilac", "Cypress Green"],
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
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764678962/71eLvseXOmL._AC_UF1000_1000_QL80__ikphxn.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764678957/SLFLXII_Set_SF_PDP_Gallery_01_snoley.png",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764678953/61dps8YHNlL_nxzt84.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764678948/SLFLXII_SandStone_SF_PDP_Gallery_01_habipm.png",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764678944/71eLvseXOmL_fry2hn.jpg"
      ],
      rating: 4.7
    },
    {
      id: 82,
      name: "ASUS TUF Gaming A15",
      category: "laptops",
      color: ["Graphite Black", "Jaeger Gray"],
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
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764680209/3166c96d-5c61-4ae7-9d62-d272df1fe385_txssf2.png",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764680207/91MW2X7lrfL._AC_UF894_1000_QL80__ojil7j.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764680213/ibht3480pzgjpbde_setting_xxx_0_90_end_2000_h3fsov.png",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764680218/c0fgpdhpjyf8ajft_setting_xxx_0_90_end_800_p0asar.png",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764680224/ASUS_TUF_Gaming_566IV-HN298T_90NR03L1-M05390_image_9_lvpah7.jpg"
      ],
      rating: 4.6
    },
    {
      id: 83,
      name: "Samsung Galaxy S24",
      category: "smartphones",
      color: ["Onyx Black", "Marble Gray", "Cobalt Violet", "Amber Yellow", "Jade Green", "Sapphire Blue", "Sandstone Orange"],
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
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764681540/6570303_sd_u2mjbp.webp",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764681535/Gear-Samsung-Galaxy-S24-Ultra-SOURCE-Julian-Chokkattu_idrmfg.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764681530/41emO6FOHvL._AC_UF894_1000_QL80__ekmeue.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764681525/Gear-Samsung-Galaxy-S24-Series-SOURCE-Julian-Chokkattu_crmojb.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764681522/galaxy-s24-highlights-kv_dj0maj.jpg"
      ],
      rating: 4.7
    },
    {
      id: 84,
      name: "Dell S2721QS 27-inch",
      category: "electronics",
      color: ["Silver", "Black"],
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
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764681989/4303f5e2-c2a0-4f40-b541-3a0ef1fed406.bf66e65447420ee1c74a758f8c8d0795_trvgfb.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764681983/81sTyOg1O3L._AC_UF894_1000_QL80__ngxiza.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764681978/Dell-S2721QS-27-4K-UHD-3840-x-2160-IPS-LED-backlit-LCD-Monitor-60-Hz-8-ms-HDMI-DisplayPort-USB_4f777dfa-222e-4029-b72f-cc2b090cf4c9.66814b7060ad09b1a871476fcc4b9b0b_pqqard.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764681974/dell01_sbpjq7.png",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764681970/pquCinsPpMNeMZXfVjv86l4WhC51fkWxD9nu_qQihxc_nkqn6a.jpg"
      ],
      rating: 4.6
    },
    {
      id: 85,
      name: "TCL QM8 65-inch",
      category: "smart-tv",
      color: ["Black"],
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
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764683032/PiyGTUxog52FKYd4LwJqUK_oh7orm.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764683024/back-small_e9kimi.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764683016/tcl-qm8-class-65-inch-tv-65qm851g_dyaa_iea0gs.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764683007/tcl-75-inch-qm8-class-tv-75qm850g_vg91_mux7gx.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764683001/design-medium_py4c2i.jpg"
      ],
      rating: 4.7
    },
    {
      id: 86,
      name: "Microsoft Surface Go 3",
      category: "tablets",
      color: ["Platinum", "Matte Black"],
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
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764686930/FL2C-A-BB-00_uptrjo.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764686930/61GqSlHr41L_jlorix.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764686930/Panel5-f4b-SpinCarPoster_ffvmh6.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764686930/maxresdefault_tiyyil.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764686930/Surface-Laptop-Go-3_platinum_fingerprint_VP1-1078x606_vlovdm.png"
      ],
      rating: 4.6
    },
    {
      id: 87,
      name: "JBL Tune 230NC",
      category: "accessories",
      color: ["Black", "White", "Blue", "Sand"],
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
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764687192/61E8o9IItOL_wey3du.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764687191/51K_RngBt_L._AC_SL1500__zobtaa.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764687191/design-medium_lddqj1.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764687190/1.JBL_TUNE_230NC_Product_20image_Hero_Black_wmrdak.png",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764687193/JBL_TUNE_230NC_Box_20Image_Black_Side_1605x1605_jrvpqe.png"
      ],
      rating: 4.6
    },
    {
      id: 88,
      name: "HP Omen 16",
      category: "laptops",
      color: ["Shadow Black", "Mica Silver"],
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
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764687367/hero-1-v2-2x_txwnod.png",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764687368/816JXR4tzWL_tsp8xw.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764687369/omen_laptop_t0fiay.png",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764687370/hp-omen-16-2023-13th-gen-core_87uc_zndxpq.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764687371/hpomen1616-b0000featured_dmtfrv.jpg"
      ],
      rating: 4.7
    },
    {
      id: 89,
      name: "Realme Narzo 60",
      category: "smartphones",
      color: ["Cosmic Black", "Mars Orange"],
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
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764688147/realme-base-60-narzo-realme-db-655x800-1688652903_ucduic.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764688147/61hYKyc7HiL._AC_UF1000_1000_QL80__hgltnw.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764688148/realme_narzo_60_pro_FI_rear_gadgets360_1688646868374_e8kuul.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764688147/8195A49fZbL._AC_UF1000_1000_QL80__r2cbwm.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764688147/8195A49fZbL._AC_UF1000_1000_QL80__r2cbwm.jpg"
      ],
      rating: 4.6
    },
    {
      id: 90,
      name: "LG UltraFine 27UN880",
      category: "electronics",
      color: ["Black", "Silver"],
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
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764688776/71HSyoETuQL._AC_UF894_1000_QL80__vagc7o.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764688776/71vEYczrOLL_usddvw.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764688776/71HSyoETuQL_hl0ujm.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764688777/27UN880-B_UHD_4K_monitors_450_dt31dx.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764688777/md07514640-zoom-15-jpg_varunq.jpg"
      ],
      rating: 4.7
    },
    {
      id: 91,
      name: "Sony Bravia XR A95K 55-inch",
      category: "smart-tv",
      color: ["Black"],
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
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764690115/2QiC8JAE3FLuNvbMFevKyG_stmmxu.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764690115/3f6b089a-8a94-46e7-aff2-6d98019bae76.01ae8d36979d91283a2bba35ce243570_gqqyhl.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764690115/sony-bravia-xr-55-inch-class-a95k-oled-tv_gssm_fgemr3.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764690115/e5ba0d9d3f3f36f76320c2ecbb8d6c7d_xvbwb1.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764690114/91Tu4igSU7L._AC_UF1000_1000_QL80__nvktpk.jpg"
      ],
      rating: 4.8
    },
    {
      id: 92,
      name: "Lenovo Yoga Tab 13",
      category: "tablets",
      color: ["Shadow Black"],
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
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764690690/lenovo-yoga-tab-13_t5snio.png",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764690688/yoga_tab13_3_20210630064035649_e7rfur.png",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764690685/gyz4e9k54dq3tnm3awsfe2q499kvv5850374_aszrhl.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764690686/HaQ2yHJ7BCMkxMdU8eWidf_tpqchd.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764690684/9io0aj37ww1119wi33i0mpwbi231zh359306_ykdiws.png"
      ],
      rating: 4.7
    },
    {
      id: 93,
      name: "Razer Kraken V3 HyperSense",
      category: "accessories",
      color: ["Black"],
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
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764695340/5701-1-EN-v6_zm4bwk.png",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764695340/71PRgAvq52L_qpyxdj.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764695342/design-medium_vfxlsb.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764695343/67d67o7hms781_hrjdza.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764695345/maxresdefault_no1zud.jpg"
      ],
      rating: 4.7
    },
    {
      id: 94,
      name: "MSI Optix MAG274QRF-QD",
      category: "electronics",
      color: ["Black"],
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
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764695565/map274qrf_upe5q8.png",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764695562/design-medium_myevax.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764695563/600_kkwn2v.png",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764695562/mag274r-mystic_m0kxvp.png",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764695560/600_odipfc.png"
      ],
      rating: 4.7
    },
    {
      id: 95,
      name: "Vivo Y78",
      category: "smartphones",
      color: ["Flare Black", "Dreamy Gold", "Aurora Green"],
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
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764695706/vivo-y78-global_skzp2h.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764695707/vivo-Y78_jnv9nm.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764695706/y78-my-kv-mb.jpg_yzmzyi.webp",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764695714/c2VydmljZT1pbWFnZXMmc3JjPWh0dHBzJTNBJTJGJTJGd3d3LmNtZWRpc3RyaWJ1dGlvbi5jb20ubXklMkZ3cC1jb250ZW50JTJGdXBsb2FkcyUyRjIwMjMlMkYwNiUyRlZJVk8tVjI3LTVHLUxDRC1PUkktRlMtMS5qcGcmY2FjaGVNYXJrZXI9MTcwMjAyOTE4My0xNjY5MTEmdG9rZW49MjJmNjBlNWI5ZDFhYTY1Mw.q_zicnye.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764695709/vivo-y78-global-01_dw7xxt.jpg",
      ],
      rating: 4.6
    },
    {
      id: 96,
      name: "Lenovo Legion Pro 7i",
      category: "laptops",
      color: ["Onyx Grey", "Glacier White"],
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
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764695898/thnb6pewb0qlpsqsqb59rlhy2nnrlm497455_w2z0ab.png",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764695900/01jnby2cm871x7miyv7s4lxor1wgxi346939_pvmr1a.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764695903/08rs2dxeb3oz457vizd1gaiyuyzpcn236744_toc3qd.png",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764695903/08rs2dxeb3oz457vizd1gaiyuyzpcn236744_toc3qd.png",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764695896/q6fb2891avf5ok5et6ppuhuuilu0cq939626_canqr6.png"
      ],
      rating: 4.8
    },
    {
      id: 97,
      name: "Anker PowerConf C200",
      category: "accessories",
      color: ["Black"],
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
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764696045/c200_ssff_1600x_fpmtc0.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764696047/61OGdnmxFiL_q7igpl.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764696053/71j2TIBQumL._AC_SX679_1200x_xb9tyl.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764696049/6FFkuDDZprbqNQesFxsYS7_wyihbg.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764696051/61qcBz_-nJL._AC_SX679_1200x_yic7ky.jpg"
      ],
      rating: 4.6
    },
    {
      id: 98,
      name: "Samsung QN85C 75-inch",
      category: "smart-tv",
      color: ["Black"],
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
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764696228/QN85QN85CAFXZA-S.COM_Version_1_V01_zo38cw.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764696230/design-medium_ufz9gz.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764696232/back-small_jzuely.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764696234/QN65QN85CDFXZA_003_L-Perspective_Sand-Black-1600x1_at3nup.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764696236/6108QldMh6L_djbjia.jpg"
      ],
      rating: 4.7
    },
    {
      id: 99,
      name: "Oppo Find N3 Flip",
      category: "smartphones",
      color: ["Cream Gold", "Sleek Black", "Misty Pink"],
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
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764696386/516jQ14MMkL._AC_UF894_1000_QL80__lbmhqn.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764696382/find-n3-flip_kws3g2.png",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764696388/find-n3-flip-all-colors-resized_npsimc.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764696387/img1_vcl0xl.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764696380/img-0133_dr7cly.jpg"
      ],
      rating: 4.7
    },
    {
      id: 100,
      name: "Microsoft Surface Laptop 5",
      category: "laptops",
      color: ["Platinum", "Matte Black", "Sage", "Sandstone"],
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
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764696510/61lYDihIxqL_re7ska.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764696514/closed_gwmcjn.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764696512/MSFT-Surface-Laptop-5-shown-back-Platinum-colour-RE50wFq_jnih4q.png",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764696516/5456_w182cw.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764696519/microsoft-surface-fall-2022-2460_sjew5w.jpg"
      ],
      rating: 4.7
    },
    {
      id: 101,
      name: "Sony WH-CH720N",
      category: "accessories",
      color: ["Black", "White", "Blue"],
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
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764696669/wh-ch720_Primary_image_hmz0l7.png",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764696670/21c0c080-eaf6-4d5a-b34c-f9dca05e1044.__CR0_0_300_225_PT0_SX300_V1____qlytvs.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764696672/design-medium_owlrxb.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764696674/41tp0JPPlmL_fqjjmj.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764696677/61c3099gnFL._AC_UF894_1000_QL80__ajbthu.jpg"
      ],
      rating: 4.6
    },
    {
      id: 102,
      name: "Acer Predator X34",
      category: "electronics",
      color: ["Black"],
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
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764696829/1d02-acer-predator-x34_hf1w0n.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764696832/t7QkAbZqTeXenXufTBifiJ_onqwzt.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764696834/24-009-869-12_jfveng.webp",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764696836/Acer-Predator-X34-Ultra-wide-Curved-G-SYNC-Gaming-Monitor-680x659_f3ywka.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764696838/2DUSWLygjkAsGty6YXQep8_q0imes.jpg"
      ],
      rating: 4.7
    },
    {
      id: 103,
      name: "Realme GT Neo 5",
      category: "smartphones",
      color: ["Final Fantasy Purple", "Zeus White", "Midnight Black"],
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
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764696990/Sd2867adbbe834f56a4279e8acf8377a8A_lc9pb8.webp",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764696987/realme-gt-neo5_kpozyl.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764696985/gsmarena_001_awhp57.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764696982/rmx3706_yphvmi.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764696979/Sa8617a6f2ae8467683faf24615a938fd1_nd9ofd.webp"
      ],
      rating: 4.6
    },
    {
      id: 104,
      name: "Samsung Galaxy Tab S8 Ultra",
      category: "tablets",
      color: ["Graphite", "Silver", "Pink Gold"],
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
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764697129/GalaxyTab_S8Ultra_AllColorKV_WithSPen_MO_n7znnm.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764697125/61f41zCQfKL._AC_UF894_1000_QL80__y4d7wg.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764697123/samsung-galaxy-tab-s8-ultra-8_cmautg.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764697120/81kcWhUr8KL_i6ofir.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764697119/galaxy-tab-s8-ultra-graphite-kv-mo_nbvpv5.jpg"
      ],
      rating: 4.8
    },
    {
      id: 105,
      name: "LG G3 65-inch OLED",
      category: "smart-tv",
      color: ["Black"],
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
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764697312/LG-evo-G3-35-cropped-a-2_og0nwp.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764697309/OLED65G3PSA-OLED-TV-DZ-03_l7vyfa.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764697307/c3068da4-dd8f-446f-92a0-c923794635b6.af252b1e973608fc9c47cc197cb9fa64_a7agj2.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764697304/thum-1600x1062_ubxdcx.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764697301/3322441_1719300699_LG_Electronics-123093025-OLED65-77G3PUA_gallery_09_3000x3000_d2o5tx.jpg"
      ],
      rating: 4.8
    },
    {
      id: 106,
      name: "Logitech G915 TKL",
      category: "accessories",
      color: ["Carbon", "White"],
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
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764697475/4WLBi8XasMjhXKXoGhxQVX_pqxsol.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764697475/4WLBi8XasMjhXKXoGhxQVX_pqxsol.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764697473/esp-g915-tkl-carbon-gallery-topdown_f4mgrb.png",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764697470/61aezyfO5cL._AC_UF894_1000_QL80__y9isbu.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764697467/us-int-g915-tkl-carbon-gallery-topdown_nmho36.png"
      ],
      rating: 4.7
    },
    {
      id: 107,
      name: "ASUS VivoBook 15",
      category: "laptops",
      color: ["Slate Grey", "Transparent Silver", "Indie Black"],
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
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764697657/61stx0hD_9L._AC_UF894_1000_QL80__eq1z0u.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764697655/512-m-ffi514-l_cbwzki.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764697651/61HdKkPp3XL._AC_UF894_1000_QL80__bbhbbt.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764697648/d13bab25-68bc-433f-bbe3-8e5a31f16e94_r7wvl6.png",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764697645/8eccd024-11c9-439d-9cf1-944acb2bca07_e9xpqg.png",
      ],
      rating: 4.6
    },
    {
      id: 108,
      name: "Seagate BarraCuda 4TB",
      category: "electronics",
      color: ["Silver"],
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
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764697807/barracuda-3-5-4tb-hero-left-400x400_knpw07.png",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764697797/71A1LAfBpHL_xijram.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764697804/1_big-1-e1569914340271_m7x0i7.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764697809/s-l1200_f5sovw.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764697800/818Zr2FoBWL_mrejcr.jpg"
      ],
      rating: 4.6
    },
    {
      id: 109,
      name: "OnePlus Pad",
      category: "tablets",
      color: ["Halo Green"],
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
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764697961/OnePlus-Pad-Review-Featured-Gear_jzmece.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764697959/images-efficiency-img2-mo-1.jpeg_wws4p7.webp",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764697955/images-effort-effort_keyboard_mo-1.jpg_ngzaqv.webp",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764697952/pad-specs_wyyxl0.png",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764697948/images-kv-pad1-mo-1_y8jll4.png"
      ],
      rating: 4.7
    },
    {
      id: 110,
      name: "Hisense U6K 55-inch",
      category: "smart-tv",
      color: ["Black"],
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
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764698102/U6K-05-mDAhwjrbbroeEACt4CgR97zdavPQxcHqjZnlBSSF_quvodz.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764698100/Hisense-U6K-55-inch_bg2tbp.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764698095/0654aczMTdRjQGSnn9nAsfo-5_yp2w4l.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764698093/hisense-u6k-55-inch_sir6nn.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764698090/design-medium_a4y7ip.jpg"
      ],
      rating: 4.6
    },
    {
      id: 111,
      name: "Vivo V29",
      category: "smartphones",
      color: ["Noble Black", "Peak Blue", "Rose Gold", "Magic Maroon"],
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
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764698259/gsmarena_001_hqh9ki.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764698255/54375-vivo-v29-2_xxfdhy.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764698254/4fa48a23-1d04-4ffe-8ad1-ab9d882766aa23090729_hmkwjl.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764698249/41TYjbv8S2L._SX300_SY300_QL70_FMwebp_nl2jm3.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764698246/c48729be117c9e9634f099b80e882193_qeuzmb.png"
      ],
      rating: 4.6
    },
    {
      id: 112,
      name: "Razer BlackShark V2 Pro",
      category: "accessories",
      color: ["Black", "White", "Quartz Pink"],
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
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764698408/71LXi404OOL._AC_UF894_1000_QL80__vbprdz.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764698411/71ZTXGr2g0L_swlud5.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764698415/3811-1-en-v2_fajaij.png",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764698418/design-medium_i4vixc.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764698422/Razer-Blackshark-V2-Pro-2023-01_ewlfa1.jpg"
      ],
      rating: 4.7
    },
    {
      id: 113,
      name: "Dell Alienware m16",
      category: "laptops",
      color: ["Dark Metallic Moon", "Lunar Silver"],
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
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764698622/maxresdefault_gbqxza.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764698619/Alienware-m16-Gaming-Laptop_a0bv9o.png",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764698615/51yKeMEWzjL._UF350_350_QL80__mbtdy3.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764698611/laptop-alienware-m16-r2-intel-pdp-hero_mld77w.png",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764698608/design-medium_mxnzlr.jpg"
      ],
      rating: 4.7
    },
    {
      id: 114,
      name: "Samsung T9 Portable SSD 1TB",
      category: "electronics",
      color: ["Black"],
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
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764698794/Samsung-T9-Portable-SSD-Feature-Image_hqfadb.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764698790/MU-PG1TOB-AM_010_LPerspective-PKG_Black_1600_1200_hw3sxn.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764698786/MU-PG1TOB-AM_005_Dynamic1_Black_1600_1200_alonqr.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764698783/samsung-t9-portable-ssd-review_dkfm28.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764698779/MU-PG1TOB-AM_04_cav7n7.jpg"
      ],
      rating: 4.7
    },
    {
      id: 115,
      name: "Xiaomi Smart Band 8",
      category: "accessories",
      color: ["Black", "Gold", "Champagne Gold"],
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
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764698928/71iBrsQzbqL_qk2san.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764698924/41zIT8cTQcL_e95bcp.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764698920/a_chl0xt.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764698916/510YT6bvSiL._AC_UF894_1000_QL80__vsnudc.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764698914/b654f0c49f4b46ff999df0975996dab0_c2p3qm.png"
      ],
      rating: 4.6
    },
    {
      id: 116,
      name: "Sony Xperia 1 V",
      category: "smartphones",
      color: ["Black", "Platinum Silver", "Khaki Green"],
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
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764699307/Sony-Xperia-1-V-Featured-Gear_mmngms.png",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764699303/sony-xperia-1-v-0_c9n8r5.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764699299/p1003516-1_xxanzp.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764699295/sony-xperia-1-v_rcobru.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764699291/747_ProductPrimary_image_l3kaa4.jpg"
      ],
      rating: 4.7
    },
    {
      id: 117,
      name: "Lenovo IdeaPad 3",
      category: "laptops",
      color: ["Arctic Grey", "Abyss Blue", "Platinum Grey"],
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
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764699441/6jnkkw91r4yngvcsu4u0b6acgrl7mf208340_ij2dc2.jpg",
        "hhttps://res.cloudinary.com/dsao6ghfo/image/upload/v1764699445/maxresdefault_neusci.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764699436/l8vn12ei2ejg3n7r8lbxodbtsca2dt213165_mciwdi.png",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764699432/8124sN-1_JL._AC_UF894_1000_QL80__fzdgwv.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764699428/lenovo-laptop-ideapad-3-14-intel-subseries-hero_m3culs.png"
      ],
      rating: 4.6
    },
    {
      id: 118,
      name: "LG 32UN550-W",
      category: "electronics",
      color: ["Silver", "Black"],
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
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764699609/7dfe5d63-f173-475d-acb6-197a0ec2138a.68b26b3a58becf4c3fe59295c78e3f0c_kdtbho.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764699605/desktop-06_lrmxt6.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764699600/71O3gPCvDoL_evkymj.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764699597/md07518687-zoom-01-jpg_pqc75n.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764699592/71ioIXWpLLL_f5etql.jpg"
      ],
      rating: 4.6
    },
    {
      id: 119,
      name: "Huawei Mate 60 Pro",
      category: "smartphones",
      color: ["Black", "White", "Green", "Purple"],
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
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764699794/230906104555-huawei-mate-60-pro-china-0905-restricted_apcgwh.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764699790/Huawei-Mate-60-ProPLUS_featured-image-packshot-review_xf4qsr.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764699786/image-74_lzgt6q.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764699781/b0293c6c-57dd-4f15-9d27-7f89dfaf5a2a_3d9478f6_znmgds.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764699894/mate60pronoglobal96_a60xsd.jpg"
      ],
      rating: 4.7
    },
    {
      id: 120,
      name: "Samsung Odyssey G5 32-inch",
      category: "electronics",
      color: ["Black"],
      currentprice: 399.99,
      prevprice: 449.99,
      location: "South Korea",
      amount: 30,
      description: "Curved QHD gaming monitor.",
      detailed_description: "The Samsung Odyssey G5 features a 32-inch QHD 165Hz curved VA display, 1ms response time, and FreeSync Premium. Ideal for gaming.",
      reviews: [
        { user: "Mia T.", comment: "Immersive gaming experience!", rating: 5 },
        { user: "Jacob S.", comment: "Great for the price.", rating: 4 },
        { user: "james y.", comment: "very lovely", rating: 5 }

      ],
      images: [
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764700004/hq720_xqekuz.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764700001/ca-odyssey-g5-32g55c-ls32cg550enxza-539277993_m7gec9.png",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764699996/ca-feature-go-beyond-539278033_p7jfwp.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764699990/81cYQ1dO5xL._AC_UF894_1000_QL80__vczjtn.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1764699987/ca-odyssey-g5-32g55c-ls32cg550enxza-539278014_z2zwmf.png"
      ],
      rating: 4.6
    },
    {
      id: 121,
      name: "Dell OptiPlex 7090",
      category: "computer",
      color: ["Black"],
      currentprice: 799.99,
      prevprice: 899.99,
      location: "USA",
      amount: 25,
      description: "Reliable desktop for office and productivity.",
      detailed_description: "The Dell OptiPlex 7090 features Intel i5, 16GB RAM, 512GB SSD. Ideal for professional work.",
      reviews: [
        { user: "Alice H.", comment: "Fast and stable!", rating: 5 },
        { user: "John K.", comment: "Great for daily use.", rating: 4 }
      ],
      images: [
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765365331/meet-the-new-optiplex-family-thumb_sszlnr.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765365332/op7090mt-op7090sff-op7090mff-fsy-shot03-bk_vkta0k.png",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765365331/desktop_optiplex_7090_mff_pdp_mod_qrtcq9.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765365331/3-15_kfdzmb.png",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765365331/2-16_grjgzm.png"
      ],
      rating: 4.6
    },
    {
      id: 122,
      name: "HP EliteDesk 800 G6",
      category: "computer",
      color: ["Silver", "Black"],
      currentprice: 849.99,
      prevprice: 949.99,
      location: "USA",
      amount: 20,
      description: "Compact desktop with high performance.",
      detailed_description: "The HP EliteDesk 800 G6 has Intel i7, 16GB RAM, 1TB SSD. Perfect for multitasking and office work.",
      reviews: [
        { user: "Emma R.", comment: "Compact but powerful.", rating: 5 },
        { user: "Michael T.", comment: "Quiet and efficient.", rating: 4 }
      ],
      images: [
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765365703/71P5xUCsfoL_qxn8b7.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765365703/s-l1200_gssytq.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765365702/HP-EliteDesk-800-G6-Mini-65W-Rear_i9vkgg.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765365701/s-l400_ta4aas.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765365702/HP-EliteDesk-800-G6-Mini-35W-Cover_goomw9.jpg"
      ],
      rating: 4.7
    },
    {
      id: 123,
      name: "Lenovo ThinkCentre M90q",
      category: "computer",
      color: ["Black"],
      currentprice: 699.99,
      prevprice: 799.99,
      location: "China",
      amount: 30,
      description: "Small form factor desktop for office tasks.",
      detailed_description: "The Lenovo ThinkCentre M90q has Intel i5, 16GB RAM, 512GB SSD. Compact, reliable, and efficient.",
      reviews: [
        { user: "Sophia P.", comment: "Small but fast!", rating: 5 },
        { user: "Daniel C.", comment: "Perfect for my home office.", rating: 4 }
      ],
      images: [
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765365870/Lenovo-M90Q-Cover-Web_k3qkbx.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765365870/Lenovo-ThinkCentre-m90q-Tiny-Gen2-Cover-Web_ktwd3n.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765365871/Lenovo-ThinkCentre-M90q-Tiny-Internal-Overview_imoljf.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765365873/Img_32565926_e2mtfv.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765365869/fgzrxpog7727q3fd2qcei6s4gktbf3646539_zmteha.jpg"
      ],
      rating: 4.6
    },
    {
      id: 124,
      name: "Acer Veriton X4660G",
      category: "computer",
      color: ["Black"],
      currentprice: 649.99,
      prevprice: 749.99,
      location: "Taiwan",
      amount: 22,
      description: "Desktop for everyday office computing.",
      detailed_description: "The Acer Veriton X4660G features Intel i5, 8GB RAM, 256GB SSD. Reliable for productivity tasks.",
      reviews: [
        { user: "Liam J.", comment: "Good performance for the price.", rating: 5 },
        { user: "Olivia S.", comment: "Works well for office use.", rating: 4 }
      ],
      images: [
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765366011/s-l400_lkxpr1.png",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765366011/Listing_Template_image_1__54956.1703839673_mslsqd.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765366010/s-l1200_ordg88.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765366012/s-l400_zqbmhx.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765366012/1051343230_ewbty9.jpg"
      ],
      rating: 4.5
    },
    {
      id: 125,
      name: "Apple Mac Mini M2",
      category: "computer",
      color: ["Silver"],
      currentprice: 699.99,
      prevprice: 799.99,
      location: "USA",
      amount: 18,
      description: "Compact desktop with Apple M2 chip.",
      detailed_description: "The Mac Mini M2 has 8GB RAM, 256GB SSD. Perfect for creative work and macOS applications.",
      reviews: [
        { user: "Mia W.", comment: "Super fast and quiet.", rating: 5 },
        { user: "Noah B.", comment: "Loving macOS on a small desktop.", rating: 4 }
      ],
      images: [
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765366226/refurb-mac-mini-202303_aiwjtx.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765366225/apple-mac-mini-2023-3277_v7tgtg.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765366227/4695_sy3ufa.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765366229/111837_mac-mini-2023-m2-pro_d6wpzp.png",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765366229/IMG_9844_plakzq.jpg"
      ],
      rating: 4.8
    },
    {
      id: 126,
      name: "ASUS ExpertCenter D700",
      category: "computer",
      color: ["Black"],
      currentprice: 899.99,
      prevprice: 999.99,
      location: "Taiwan",
      amount: 15,
      description: "High-performance business desktop.",
      detailed_description: "The ASUS ExpertCenter D700 features Intel i7, 32GB RAM, 1TB SSD. Ideal for intensive office workloads.",
      reviews: [
        { user: "Sophia L.", comment: "Handles everything smoothly.", rating: 5 },
        { user: "Ethan M.", comment: "Excellent build quality.", rating: 4 }
      ],
      images: [
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765366358/57d3e1c0-1623-4831-80f7-5dd28ca32ac4_r0wchr.png",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765366360/6112fc64-40f2-4f4e-b90c-4ef2ac0e0d1b_g7vvz0.png",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765366361/LD0005934265_1_aejboz.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765366361/maxresdefault_lrsamb.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765366363/cffbc5ca-89e2-43b3-a78a-97bc75d6b575_eljnhs.png"
      ],
      rating: 4.7
    },
    {
      id: 127,
      name: "MSI Pro DP21",
      category: "computer",
      color: ["Black"],
      currentprice: 599.99,
      prevprice: 699.99,
      location: "Taiwan",
      amount: 20,
      description: "Compact desktop for office and home use.",
      detailed_description: "The MSI Pro DP21 features Intel i5, 8GB RAM, 512GB SSD. Smooth performance for everyday tasks.",
      reviews: [
        { user: "Lucas T.", comment: "Compact and quiet.", rating: 5 },
        { user: "Ava S.", comment: "Good value for work.", rating: 4 }
      ],
      images: [
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765366587/6186e0zlXwL_rjitos.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765366588/e8569931-dcd8-4871-8034-d490e860abcb_xtdyfk.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765366588/20241114_172252-jpg.371706_ymqgos.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765366590/6186e0zlXwL._AC_UF894_1000_QL80__aqlks4.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765366591/maxresdefault_oezjos.jpg"
      ],
      rating: 4.6
    },
    {
      id: 128,
      name: "Intel NUC 12 Extreme",
      category: "computer",
      color: ["Black"],
      currentprice: 1099.99,
      prevprice: 1199.99,
      location: "USA",
      amount: 10,
      description: "Mini PC with high performance.",
      detailed_description: "Intel NUC 12 Extreme with Intel i7, 16GB RAM, 1TB SSD. Great for gaming and work in a small form factor.",
      reviews: [
        { user: "Ethan P.", comment: "Powerful for its size.", rating: 5 },
        { user: "Sophia R.", comment: "Perfect mini PC.", rating: 4 }
      ],
      images: [
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765366745/IMG_0133-3_nn5q8k.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765366746/sddefault_bme7ly.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765366748/Intel-NUC-12-Extreme-2-1_qtgh40.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765366746/sddefault_bme7ly.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765366750/Intel_NUC_12_Extreme_Dragon_Canyon_Mini_PC__563_sykeu7.jpg"
      ],
      rating: 4.7
    },
    {
      id: 129,
      name: "Acer Aspire XC-1660",
      category: "computer",
      color: ["Black"],
      currentprice: 549.99,
      prevprice: 649.99,
      location: "Taiwan",
      amount: 18,
      description: "Compact desktop for home use.",
      detailed_description: "The Acer Aspire XC-1660 features Intel i3, 8GB RAM, 256GB SSD. Reliable performance for basic computing.",
      reviews: [
        { user: "Liam P.", comment: "Simple and efficient.", rating: 5 },
        { user: "Emma H.", comment: "Good for home office.", rating: 4 }
      ],
      images: [
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765366913/uNdEqXMjMxFEdUunMnTEgC_ylm0vw.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765366913/acer-aspire-xc-1660-g-almost-max-potential-v0-r17q53he68ub1_slwq1x.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765366914/1_mxcqlv.png",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765366915/acer-aspire-xc-1660-g-almost-max-potential-v0-r17q53he68ub1_cyassh.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765366913/acer-aspire-xc-1660-g-almost-max-potential-v0-r17q53he68ub1_slwq1x.jpg"
      ],
      rating: 4.5
    },
    {
      id: 130,
      name: "Lenovo ThinkStation P340",
      category: "computer",
      color: ["Black"],
      currentprice: 1199.99,
      prevprice: 1299.99,
      location: "China",
      amount: 12,
      description: "Workstation desktop for designers and engineers.",
      detailed_description: "The Lenovo ThinkStation P340 with Intel i7, 32GB RAM, 1TB SSD. Ideal for CAD and professional software.",
      reviews: [
        { user: "Noah K.", comment: "Handles CAD smoothly.", rating: 5 },
        { user: "Ava M.", comment: "Professional grade desktop.", rating: 4 }
      ],
      images: [
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765367076/lenovo-desktop-thinkstation-p340-tower-hero_zrlzba.png ",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765367077/lenovo-desktop-thinkstation-p340-tiny-hero_eumdtn.png",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765367079/Lenovo-ThinkStation-P340-Tiny-Internal-Bottom-Dual-M.2-Slots-and-SSD_rp75bf.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765367081/IMG_1060_1800x_anvear.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765367083/lenovo-desktop-6_bu9duq.png"
      ],
      rating: 4.8
    },
    {
      id: 131,
      name: "HP ProDesk 400 G7",
      category: "computer",
      color: ["Silver"],
      currentprice: 649.99,
      prevprice: 749.99,
      location: "USA",
      amount: 20,
      description: "Reliable desktop for office environments.",
      detailed_description: "HP ProDesk 400 G7 features Intel i5, 16GB RAM, 512GB SSD. Compact and efficient for professional use.",
      reviews: [
        { user: "Sophia T.", comment: "Smooth and quiet.", rating: 5 },
        { user: "Jacob L.", comment: "Good office desktop.", rating: 4 }
      ],
      images: [
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765367221/2aaa61cd-b5f2-410f-ab0c-912c3868ec17_ehgmcx.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765367223/c06699391_doxcoo.png",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765367225/Hp-Prodesk-400-G7-6_pbdezz.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765367226/hp-prodesk-400-g7-sff-intel-core-ram-hdd-ports_hprlse.png",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765367227/ProductViewThumb_leg3d4.jpg"
      ],
      rating: 4.6
    },
    {
      id: 132,
      name: "ASUS ROG Strix GA15",
      category: "computer",
      color: ["Black", "Red"],
      currentprice: 1299.99,
      prevprice: 1399.99,
      location: "Taiwan",
      amount: 15,
      description: "Gaming desktop with powerful specs.",
      detailed_description: "The ASUS ROG Strix GA15 features Ryzen 7, 16GB RAM, 1TB SSD, RTX 3060. Ideal for gaming and streaming.",
      reviews: [
        { user: "Mia T.", comment: "Runs all games smoothly.", rating: 5 },
        { user: "Liam R.", comment: "Excellent gaming PC.", rating: 4 }
      ],
      images: [
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765367353/9C346B9E-F408-4512-B81D-9F4903A0C63D_jiqjea.png",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765367354/h732_zubzxp.png",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765367354/h732_zubzxp.png",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765367358/k3vm6ns4suk71_khtgae.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765367359/upgraded-my-asus-rog-strix-ga15-dh-with-a-6600xt-v0-o1261puhkeh81_c5zgyz.jpg"
      ],
      rating: 4.8,

      isNew: true,
      isFeatured: false,
      isTopSelling: true

    },
    {
      id: 133,
      name: "MSI Creator P100X",
      category: "computer",
      color: ["Black"],
      currentprice: 1499.99,
      prevprice: 1599.99,
      location: "Taiwan",
      amount: 10,
      description: "Desktop for creative professionals.",
      detailed_description: "MSI Creator P100X features Intel i9, 32GB RAM, 1TB SSD, RTX 3070. Perfect for video editing and design work.",
      reviews: [
        { user: "Emma S.", comment: "Amazing for editing.", rating: 5 },
        { user: "Noah P.", comment: "Handles Adobe suite perfectly.", rating: 4 }
      ],
      images: [
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765367552/61BmF_98j0L_wfxmxk.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765367554/Upgradable_img01_xaqx7q.png",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765367555/617WBOTUlHL._AC_UF894_1000_QL80__jwlo0z.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765367557/Webp.net-compress-image_ttyqhh.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765367559/a53bb4ac-cf78-4070-be98-258e490fd6e7_beacrl.jpg"
      ],
      rating: 4.9
    },
    {
      id: 134,
      name: "Apple iMac 24-inch M1",
      category: "computer",
      color: ["Silver", "Blue", "Green", "Pink"],
      currentprice: 1299.99,
      prevprice: 1399.99,
      location: "USA",
      amount: 12,
      description: "All-in-one desktop with M1 chip.",
      detailed_description: "iMac 24-inch M1 features 8GB RAM, 256GB SSD. Beautiful Retina display and macOS ecosystem.",
      reviews: [
        { user: "Sophia W.", comment: "Stunning display!", rating: 5 },
        { user: "Liam M.", comment: "Fast and quiet.", rating: 4 }
      ],
      images: [
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765367708/refurb-imac-24-blue-2021_ylzu60.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765367707/111895_imac-24-inch--m1_ov34jq.png",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765367711/7hq8LosjChoWg3pzCuqezb_fzl701.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765367713/403541-all-in-one-desktops-apple-24-inch-imac-m1-chip-10020645_q2v4f6.png",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765367715/apple-imac-24-2021-main_bnhkhq.jpg"
      ],
      rating: 4.8
    },
    {
      id: 135,
      name: "Dell XPS Desktop 8940",
      category: "computer",
      color: ["Silver", "Black"],
      currentprice: 1099.99,
      prevprice: 1199.99,
      location: "USA",
      amount: 15,
      description: "High-performance desktop for home and office.",
      detailed_description: "Dell XPS Desktop 8940 features Intel i7, 16GB RAM, 512GB SSD, GTX 1660. Great for multitasking and light gaming.",
      reviews: [
        { user: "Mia L.", comment: "Powerful and sleek.", rating: 5 },
        { user: "Ethan R.", comment: "Perfect for my setup.", rating: 4 }
      ],
      images: [
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765367941/61ZFI69jGCL_hsu7n8.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765367943/dell-xps-desktop-8950-1050167_noovjw.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765367945/xs8940-csy-00058ff-bk-rkl_sqnhm4.png",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765367947/403954-full-size-desktops-dell-xps-8940-7887blk-10021340_yg8utl.png",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765367949/Dell-XPS-8940-product-image_jfhnml.jpg"
      ],
      rating: 4.7
    },
    {
      id: 136,
      name: "iPhone 15 Pro",
      category: "mobile",
      color: ["Silver", "Graphite"],
      currentprice: 1099.99,
      prevprice: 1199.99,
      location: "USA",
      amount: 40,
      description: "Latest Apple smartphone with A17 chip.",
      detailed_description: "iPhone 15 Pro features 6.1-inch display, 128GB storage, iOS 17. Perfect for photography and productivity.",
      reviews: [
        { user: "Ava R.", comment: "Fast and sleek!", rating: 5 },
        { user: "Noah T.", comment: "Excellent camera.", rating: 4 }
      ],
      images: [
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765368156/iPhone_15_Pro_-_Black_titanium-_Overlap_Trans-cropped_a3nvyp.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765368151/refurb-iphone-15-pro-bluetitanium-202412_xtor6b.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765368150/Apple-iPhone-15-Pro-lineup-hero-230912.jpg.news_app_ed_gfqfhs.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765368148/iphone_15_pro_lbp22r.png",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765368154/41NGdWgVgdL_gkak0r.jpg"
      ],
      rating: 4.8
    },
    {
      id: 137,
      name: "Samsung Galaxy S24",
      category: "mobile",
      color: ["Phantom Black", "Green"],
      currentprice: 999.99,
      prevprice: 1099.99,
      location: "South Korea",
      amount: 35,
      description: "Flagship Samsung smartphone with Snapdragon 8 Gen 3.",
      detailed_description: "Samsung Galaxy S24 features 6.2-inch AMOLED display, 128GB storage, Android 14. Great for photography and gaming.",
      reviews: [
        { user: "Liam H.", comment: "Beautiful display!", rating: 5 },
        { user: "Emma C.", comment: "Fast and smooth.", rating: 4 }
      ],
      images: [
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765368416/Gear-Samsung-Galaxy-S24-Ultra-SOURCE-Julian-Chokkattu_dquhrl.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765368411/51A-Q4eMBxL._AC_UF894_1000_QL80__yogp56.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765368402/onyx-black-9_lihvzt.png",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765368402/galaxy-s24-highlights-kv_p9jyxl.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765368414/Gear-Samsung-Galaxy-S24-Series-SOURCE-Julian-Chokkattu_vsilcz.jpg"
      ],
      rating: 4.7
    },

    {
      id: 138,
      name: "Google Pixel 8",
      category: "mobile",
      color: ["White", "Black"],
      currentprice: 799.99,
      prevprice: 899.99,
      location: "USA",
      amount: 28,
      description: "Google smartphone with pure Android experience.",
      detailed_description: "Pixel 8 features 6.2-inch OLED display, 128GB storage, Google Tensor G3 chip. Ideal for photography and AI features.",
      reviews: [
        { user: "Sophia W.", comment: "Camera is amazing!", rating: 5 },
        { user: "Ethan P.", comment: "Love the clean Android interface.", rating: 4 }
      ],
      images: [
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765368669/Pixel_8_Pro_in_Porcelain.max-936x936.format-webp_nnqr7u.webp",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765368667/61O4yGzkkTL._AC_UF894_1000_QL80__ogkwpk.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765368665/2f5c16c6-ca0b-40e5-a77c-4a0e5c26c3ed_f0dewv.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765368664/Google-Pixel-8-Pro-and-Pixel-8-Review-Gear_axhkpf.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765368661/65cfbf246fcb546d2d50f812_tbodyn.jpg"
      ],
      rating: 4.7
    },
    {
      id: 139,
      name: "OnePlus 12",
      category: "mobile",
      color: ["Black", "Red"],
      currentprice: 899.99,
      prevprice: 999.99,
      location: "China",
      amount: 30,
      description: "High-speed OnePlus smartphone.",
      detailed_description: "OnePlus 12 features 6.7-inch AMOLED display, 256GB storage, Snapdragon 8 Gen 3. Fast and smooth performance.",
      reviews: [
        { user: "Liam R.", comment: "Extremely fast.", rating: 5 },
        { user: "Olivia C.", comment: "Excellent display.", rating: 4 }
      ],
      images: [
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765368840/12-green_orfdvn.png",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765368842/5310_jiybjv.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765368844/oneplus-12-12r-cnet-lanxon-review-29_mjfudw.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765368846/e2566b9853071dbb7fe9306713bbe51f.png_guhhay.webp",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765368849/71YzJwmRFCL._AC_UF1000_1000_QL80__nf4m18.jpg"
      ],
      rating: 4.6
    },
    {
      id: 140,
      name: "Samsung Galaxy Note 24",
      category: "mobile",
      color: ["Mystic Bronze"],
      currentprice: 1099.99,
      prevprice: 1199.99,
      location: "South Korea",
      amount: 25,
      description: "Samsung stylus-enabled smartphone.",
      detailed_description: "Galaxy Note 24 features 6.7-inch AMOLED display, 256GB storage, S-Pen support. Perfect for productivity and note-taking.",
      reviews: [
        { user: "Emma P.", comment: "Love the S-Pen!", rating: 5 },
        { user: "Noah J.", comment: "Great for work and play.", rating: 4 }
      ],
      images: [
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765369019/S24Ultra-Color-Titanium_Grey_PC_0527_final_rqdytz.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765369015/samsung-galaxy-s24-ultra-1900_p8is25.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765369012/galaxy-s24-ultra-highlights-kv_ej2edb.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765369026/us-galaxy-s24-s928-562376-sm5s928uzkexaa-548727674_bwhnmk.png",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765369020/gsmarena_002_mykj6w.jpg"
      ],
      rating: 4.7
    },
    {
      id: 141,
      name: "iPhone 15",
      category: "mobile",
      color: ["Red", "Blue"],
      currentprice: 899.99,
      prevprice: 999.99,
      location: "USA",
      amount: 50,
      description: "Standard iPhone 15 with A17 chip.",
      detailed_description: "iPhone 15 features 6.1-inch display, 128GB storage, iOS 17. Excellent for daily use and photography.",
      reviews: [
        { user: "Mia K.", comment: "Very smooth performance.", rating: 5 },
        { user: "Ethan H.", comment: "Camera quality is superb.", rating: 4 }
      ],
      images: [
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765369199/51-dI0OmzyL_z8djbc.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765369197/yDn3ZSXu9eSBxmXQDZ4PCF_i8675y.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765369189/iphone_15_hero_aqiqcs.png",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765369191/black-1_p4zmqq.png",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765369194/black-6_hdjmq8.png"
      ],
      rating: 4.7
    },
    {
      id: 142,
      name: "Google Pixel 8 Pro",
      category: "mobile",
      color: ["Black", "Silver"],
      currentprice: 999.99,
      prevprice: 1099.99,
      location: "USA",
      amount: 20,
      description: "Google flagship with advanced camera.",
      detailed_description: "Pixel 8 Pro features 6.7-inch OLED display, 256GB storage, Tensor G3. Ideal for photography and AI-based apps.",
      reviews: [
        { user: "Sophia R.", comment: "Best camera phone!", rating: 5 },
        { user: "Liam S.", comment: "Love the AI features.", rating: 4 }
      ],
      images: [
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765369323/65cfbf246fcb546d2d50f812_i6rbw3.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765369325/Google-8-Pro-Porcelain_aitekw.png",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765369327/71h9zq4viSL._AC_UF894_1000_QL80__uz4dwy.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765369330/71h9zq4viSL_teqtpr.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765369333/Google-Pixel-8-Event-Gear_pikuac.jpg"
      ],
      rating: 4.8
    },
    {
      id: 143,
      name: "OnePlus 12 Pro",
      category: "mobile",
      color: ["Blue", "Silver"],
      currentprice: 999.99,
      prevprice: 1099.99,
      location: "China",
      amount: 18,
      description: "High-end OnePlus smartphone with excellent display.",
      detailed_description: "OnePlus 12 Pro features 6.7-inch AMOLED, 256GB storage, Snapdragon 8 Gen 3. Ideal for gaming and multimedia.",
      reviews: [
        { user: "Olivia R.", comment: "Amazing display and speed.", rating: 5 },
        { user: "Noah F.", comment: "Love the smooth interface.", rating: 4 }
      ],
      images: [
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765373401/e2566b9853071dbb7fe9306713bbe51f.png_ac7q2o.webp",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765373405/12-green_y6thgw.png",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765373410/b96848b7acd10dafde32203d12f6fea7_o0ht5e.png",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765373414/oneplus-12-12r-cnet-lanxon-review-29_bdxmwm.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765373419/71tRpVJeMcL._AC_UF894_1000_QL80__gyubhk.jpg"
      ],
      rating: 4.8
    },
    {
      id: 144,
      name: "Samsung Galaxy Z Fold 6",
      category: "mobile",
      color: ["Silver", "Black"],
      currentprice: 1799.99,
      prevprice: 1899.99,
      location: "South Korea",
      amount: 10,
      description: "Foldable smartphone for multitasking.",
      detailed_description: "Galaxy Z Fold 6 features 7.6-inch foldable AMOLED, 512GB storage. Perfect for productivity and media consumption.",
      reviews: [
        { user: "Mia S.", comment: "Love the foldable screen!", rating: 5 },
        { user: "Ethan K.", comment: "Innovative and powerful.", rating: 4 }
      ],
      images: [
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765373802/61896OtgvGL_robppf.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765373812/668eb0073598be27b3456082_ds9qqe.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765373817/LD0006202415_cuadif.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765373814/maxresdefault_off3eq.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765373834/filters_3Aupscale_28_29_edlj2n.png"
      ],
      rating: 4.9
    },
    {
      id: 145,
      name: "Samsung Galaxy Z Flip 6",
      category: "mobile",
      color: ["Pink", "Black"],
      currentprice: 1099.99,
      prevprice: 1199.99,
      location: "South Korea",
      amount: 12,
      description: "Compact foldable smartphone.",
      detailed_description: "Galaxy Z Flip 6 features 6.7-inch foldable AMOLED, 256GB storage. Stylish and powerful.",
      reviews: [
        { user: "Sophia J.", comment: "Perfect compact phone.", rating: 5 },
        { user: "Liam Q.", comment: "Foldable design is great.", rating: 4 }
      ],
      images: [
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765374013/Wi33c9Z23kKPT8d3MHf4CS_wlltb2.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765374017/61mSUSY4xWL_r3ipwd.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765374017/61mSUSY4xWL_r3ipwd.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765374029/galaxy-z-flip6-share-image_hijwu2.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765374033/filters_3Aformat_28png_29_3Aupscale_28_29_jvij5f.png"
      ],
      rating: 4.8
    },
    {
      id: 146,
      name: "iPhone 15 Plus",
      category: "mobile",
      color: ["Blue", "Black", "Red"],
      currentprice: 999.99,
      prevprice: 1099.99,
      location: "USA",
      amount: 30,
      description: "Larger iPhone 15 with longer battery life.",
      detailed_description: "iPhone 15 Plus features 6.7-inch display, 128GB storage, iOS 17. Great for media consumption and daily use.",
      reviews: [
        { user: "Mia L.", comment: "Battery lasts long!", rating: 5 },
        { user: "Ethan M.", comment: "Smooth performance.", rating: 4 }
      ],
      images: [
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765374282/51PtFHUPjBL._AC_UL495_SR435_495__zkzxge.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765374288/iphone_15_plus_hero_xvem18.png",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765374293/refurb-iphone-15-plus-black-202412_wpmi5k.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765374298/Apple-iPhone-15-Plus-Pink-frontimage_mcmlqy.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765374304/AT-T-Apple-iPhone-15-Plus-128GB-Yellow_02ef5841-1945-43eb-aea4-f61bb247deb3.0a9e3b08d4d70f55caf1b19dbab14b06_kf2i4h.jpg"
      ],
      rating: 4.7
    },
    {
      id: 147,
      name: "Google Pixel 8a",
      category: "mobile",
      color: ["Black", "Purple"],
      currentprice: 499.99,
      prevprice: 599.99,
      location: "USA",
      amount: 25,
      description: "Affordable Pixel with good performance.",
      detailed_description: "Pixel 8a features 6.1-inch OLED, 128GB storage, Tensor G3 chip. Ideal for photography and smooth daily use.",
      reviews: [
        { user: "Olivia N.", comment: "Great value for money.", rating: 5 },
        { user: "Liam D.", comment: "Camera quality is good.", rating: 4 }
      ],
      images: [
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765374498/google-pixel-8-pro-review-cnet-8_qnssel.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765374492/pixel-8a-ga04432-in-google-original-imahyn3mqzdbzywg_vvxyil.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765374487/Yrib6arPO4qH5AasptV5UHT5kay4cbaqpoxpa7C1BSribhYwbqEbqVvcZ7dp2RSybWJkLyxjivsBUSpQxr6lricWMDvCWCBP5M6V_epymoq.png",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765374482/google-pixel-8a-mobile-phone-9730_iq5qrz.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765374476/71XOyJfGIzL_prbmcq.jpg"
      ],
      rating: 4.6
    },
    {
      id: 148,
      name: "OnePlus Nord 3",
      category: "mobile",
      color: ["Gray", "Blue"],
      currentprice: 399.99,
      prevprice: 499.99,
      location: "China",
      amount: 20,
      description: "Mid-range OnePlus smartphone.",
      detailed_description: "OnePlus Nord 3 features 6.5-inch AMOLED, 128GB storage, MediaTek Dimensity 9200. Smooth performance for daily use.",
      reviews: [
        { user: "Sophia K.", comment: "Very responsive phone.", rating: 5 },
        { user: "Ethan L.", comment: "Great display and battery.", rating: 4 }
      ],
      images: [
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765374999/OnePlus-Nord-3-f_hkfwpx.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765374996/oneplus-nord-3-review-7_k3rywd.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765374990/images-kv-bg-asia-1.jpg_wt2nna.webp",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765374982/vitamin-spec-black_w2oonj.png",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765374996/oneplus-nord-3-review-7_k3rywd.jpg"
      ],
      rating: 4.5
    },
    {
      id: 149,
      name: "Samsung Galaxy A74",
      category: "mobile",
      color: ["Silver", "Black"],
      currentprice: 449.99,
      prevprice: 549.99,
      location: "South Korea",
      amount: 22,
      description: "Affordable Samsung smartphone with big display.",
      detailed_description: "Galaxy A74 features 6.7-inch AMOLED, 128GB storage, Snapdragon 778G. Ideal for media and casual use.",
      reviews: [
        { user: "Mia D.", comment: "Big screen and smooth.", rating: 5 },
        { user: "Noah L.", comment: "Good value.", rating: 4 }
      ],
      images: [
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765375206/Samsung-Galaxy-A73-b_rogtzj.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765375191/gsmarena_001_seealz.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765375212/pGM7LdBOMcKNt_3toD0mt2zWE5brbQnfEyMcoSVWTbJZVO_kMTCMyaj_BcyuSxcKJg_vmlfmp.png",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765375191/gsmarena_001_seealz.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765375206/Samsung-Galaxy-A73-b_rogtzj.jpg"
      ],
      rating: 4.6,

      isNew: true,
      isFeatured: false,
      isTopSelling: true

    },
    {
      id: 150,
      name: "iPhone SE 4th Gen",
      category: "mobile",
      color: ["Black", "White", "Red"],
      currentprice: 399.99,
      prevprice: 499.99,
      location: "USA",
      amount: 35,
      description: "Compact iPhone with A17 chip.",
      detailed_description: "iPhone SE 4th Gen features 4.7-inch display, 64GB storage, iOS 17. Great for users who prefer small phones.",
      reviews: [
        { user: "Emma G.", comment: "Perfect size for one-hand use.", rating: 5 },
        { user: "Liam J.", comment: "Fast and reliable.", rating: 4 }
      ],
      images: [
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765375613/hq720_bm4ytt.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765375590/iphone-se-4th-gen-2024-v0-x939lzbxtfic1_fngjn0.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765375607/iphone-se-4-modified_n1x5hg.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765375601/iPhone-SE-4-rumored-to-arrive-in-2025-with-a-design-based-on-the-upcoming-iPhone-16_rznpit.jpg",
        "https://res.cloudinary.com/dsao6ghfo/image/upload/v1765375597/iphone-se-4-render-034720509-3x4_e4cjnc.jpg"
      ],
      rating: 4.7
    }


  ]
  private filteredProduct = new BehaviorSubject<Product[]>(this.products);
  products$ = this.filteredProduct.asObservable();
  priceRange = new BehaviorSubject({ min: 0, max: 500 });
  filteredProducts$: any;

  constructor() {
    console.log('ProductService initialized!');
  }

  /**
   * Search products by term and category
   */
  searchProducts(term: string, category: string) {
    const lowerTerm = term.toLowerCase().trim();

    // Filter by name and category
    const results = this.products.filter(p => {
      const matchName = p.name.toLowerCase().includes(lowerTerm);
      const matchCategory =
        category === 'All Category' || p.category.toLowerCase().includes(category.toLowerCase());

      // Debug log for each product checked
      console.log(`Checking product: ${p.name}, Matches search?`, matchName, 'Matches category?', matchCategory);
      return matchName && matchCategory;
    });

    console.log('Search filtered results count:', results.length);

    // Update the BehaviorSubject
    this.filteredProduct.next(results);
  }


  //product  color selection 
  getAvailableColors(filteredProducts: Product[]): string[] {
    return [...new Set(filteredProducts.flatMap(p => p.color))];
  }


  /**
   * Apply price filter to products
   */
  applyFilter() {
    const { min, max } = this.priceRange.getValue();
    console.log('Current price range:', min, '-', max);

    // Filter products by price range
    const filtered = this.products.filter(p => {
      const inPriceRange = p.currentprice >= min && p.currentprice <= max;

      // Debug log for each product checked
      console.log(`Checking product: ${p.name}, Price: ${p.currentprice}, In range?`, inPriceRange);
      return inPriceRange;
    });

    // Update the BehaviorSubject
    this.filteredProduct.next(filtered);
    console.log('Filtered products count (price filter):', filtered.length);
  }

  /**
   * Sort products
   */
  sortProducts(sortType: string) {
    // Get the currently filtered products (already filtered by search/price)
    const products = this.filteredProduct.getValue();

    // Copy array to avoid mutating original
    let sortedProducts = [...products];

    // Apply sorting based on sortType
    switch (sortType) {
      case 'default':
        console.log('Sorting: default (original order)');
        break;
      case 'popularity':
        sortedProducts.sort((a, b) => b.rating - a.rating);
        console.log('Sorting by popularity (rating descending)');
        break;
      case 'newness':
        sortedProducts.sort((a, b) => b.id - a.id); // assume higher ID = newer
        console.log('Sorting by newness (ID descending)');
        break;
      case 'average':
        sortedProducts.sort((a, b) => b.rating - a.rating);
        console.log('Sorting by average rating (rating descending)');
        break;
      case 'low-high':
        sortedProducts.sort((a, b) => a.currentprice - b.currentprice);
        console.log('Sorting by price low to high');
        break;
      case 'high-low':
        sortedProducts.sort((a, b) => b.currentprice - a.currentprice);
        console.log('Sorting by price high to low');
        break;
      default:
        console.log('Unknown sort type:', sortType);
        break;
    }

    // Debug: log the sorted product names
    console.log('Sorted Products:', sortedProducts.map(p => `${p.name} ($${p.currentprice})`));

    // Update the BehaviorSubject
    this.filteredProduct.next(sortedProducts);
  }

  /**
   * Get all products (unfiltered)
   */
  getAllProducts(): Product[] {
    return this.products;
  }

  /**
   * Get product by ID
   */
  getProductById(id: number): Product | undefined {
    return this.products.find(p => p.id === id);
  }

  resetFilters() {
  console.log('Resetting product filters');
  this.filteredProduct.next([...this.products]);
}


  applyAllFilters(
    term: string,
    category: string,
    priceRange: { min: number; max: number },
    sortType: string,
    color?: string
  ) {
    console.log('--- Applying All Filters ---');
    console.log('Search Term:', term, 'Category:', category, 'Price Range:', priceRange, 'Sort Type:', sortType, 'Color:', color);

    // Step 1: Filter by search term & category
    let filtered = this.products.filter(p => {
      const lowerTerm = term.toLowerCase().trim();
      const matchName = p.name.toLowerCase().includes(lowerTerm);


      // Handle multiple categories if category string is empty
      const matchCategory =
        category === 'All Category' || p.category.toLowerCase() === category.toLowerCase();

      return matchName && matchCategory;
    });
    console.log('After search & category filter:', filtered.length, 'products');

    // Step 2: Filter by price range
    filtered = filtered.filter(p => p.currentprice >= priceRange.min && p.currentprice <= priceRange.max);
    console.log('After price filter:', filtered.length, 'products');

    // Step 3: Filter by color (if provided)
    if (color) {
      filtered = filtered.filter(p => p.color.includes(color));
      console.log(`After color filter (${color}):`, filtered.length, 'products');
    }

    // Step 4: Sort filtered products
    switch (sortType) {
      case 'popularity':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newness':
        filtered.sort((a, b) => b.id - a.id);
        break;
      case 'average':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'low-high':
        filtered.sort((a, b) => a.currentprice - b.currentprice);
        break;
      case 'high-low':
        filtered.sort((a, b) => b.currentprice - a.currentprice);
        break;
      case 'default':
      default:
        break;
    }
    console.log('After sorting:', filtered.map(p => p.name));

    // Step 5: Update BehaviorSubject
    this.filteredProduct.next(filtered);
    console.log('--- Filter & Sort Completed ---');
  }

  // addReview(productId: number, review: any) {
  //   const product = this.products.find(p => p.id === productId);

  //   if (product) {
  //     if (!product.reviews) {
  //       product.reviews = [];
  //     }
  //     product.reviews.push(review);

  //     this.filteredProduct.next([...this.products]);
  //   }
  // }



  /**
   * Get products flagged as "New Arrivals"
   */
  getNewArrivals(): Product[] {
    const newProducts = this.products.filter(p => p.isNew);
    console.log('New Arrivals fetched:', newProducts.map(p => p.name));
    return newProducts;
  }

  /**
   * Get products flagged as "Featured"
   */
  getFeaturedProducts(): Product[] {
    const featured = this.products.filter(p => p.isFeatured);
    console.log('Featured Products fetched:', featured.map(p => p.name));
    return featured;
  }

  /**
   * Get products flagged as "Top Selling"
   */
  getTopSellingProducts(): Product[] {
    const topSelling = this.products.filter(p => p.isTopSelling);
    console.log('Top Selling Products fetched:', topSelling.map(p => p.name));
    return topSelling;
  }


  getRandomProductsForHome(limitPerCategory: number = 2): Product[] {
    const categoryMap: { [key: string]: Product[] } = {};

    // Group products by category
    this.products.forEach(p => {
      if (!categoryMap[p.category]) categoryMap[p.category] = [];
      categoryMap[p.category].push(p);
    });

    // Pick limited random products per category
    let selected: Product[] = [];
    Object.values(categoryMap).forEach(products => {
      const shuffled = [...products].sort(() => 0.5 - Math.random());
      selected.push(...shuffled.slice(0, limitPerCategory));
    });

    // Final shuffle across all categories
    const final = selected.sort(() => 0.5 - Math.random());

    console.log('All Products (limited per category, randomized):', final.map(p => p.name));
    return final;
  }



  getHomePageProducts(limitPerCategory: number = 2, maxPerTab: number = 8) {
    // All Products — random per category
    const all = this.getRandomProductsForHome(limitPerCategory);

    // New Arrivals
    const newArrivals = this.getNewArrivals().slice(0, maxPerTab);

    // Featured
    const featured = this.getFeaturedProducts().slice(0, maxPerTab);

    // Top Selling
    const topSelling = this.getTopSellingProducts().slice(0, maxPerTab);

    console.log('Home Page Products prepared:');
    console.log('All:', all.map(p => p.name));
    console.log('New Arrivals:', newArrivals.map(p => p.name));
    console.log('Featured:', featured.map(p => p.name));
    console.log('Top Selling:', topSelling.map(p => p.name));

    return { all, newArrivals, featured, topSelling };
  }




}
