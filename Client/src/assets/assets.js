import Logo from "./Logo.svg";
import gmail_logo from "./gmail_logo.svg";
import facebook_logo from "./facebook_logo.svg";
import instagram_logo from "./instagram_logo.svg";
import twitter_logo from "./twitter_logo.svg";
import menu_icon from "./menu_icon.svg";
import search_icon from "./search_icon.svg"
import close_icon from "./close_icon.svg"
import users_icon from "./users_icon.svg"
import car_icon from "./car_icon.svg"
import location_icon from "./location_icon.svg"
import fuel_icon from "./fuel_icon.svg"
import addIcon from "./addIcon.svg"
import carIcon from "./carIcon.svg"
import carIconColored from "./carIconColored.svg"
import dashboardIcon from "./dashboardIcon.svg"
import dashboardIconColored from "./dashboardIconColored.svg"
import addIconColored from "./addIconColored.svg"
import listIcon from "./listIcon.svg"
import listIconColored from "./listIconColored.svg"
import cautionIconColored from "./cautionIconColored.svg"
import arrow_icon from "./arrow_icon.svg"
import star_icon from "./star_icon.svg"
import check_icon from "./check_icon.svg"
import tick_icon from "./tick_icon.svg"
import delete_icon from "./delete_icon.svg"
import eye_icon from "./eye_icon.svg"
import eye_close_icon from "./eye_close_icon.svg"
import filter_icon from "./filter_icon.svg"
import edit_icon from "./edit_icon.svg"
import calendar_icon_colored from "./calendar_icon_colored.svg"
import location_icon_colored from "./location_icon_colored.svg"
import testimonial_image_1 from "./testimonial_image_1.png"
import testimonial_image_2 from "./testimonial_image_2.webp"
import testimonial_image_3 from "./testimonial_image_3.jpg"
import main_car from "./main_car.png"
import banner_car_image from "./banner_car_image.png"
import user_profile from "./user_profile.png"
import upload_icon from "./upload_icon.svg"
import car_image1 from "./car_image1.jpg"
import car_image2 from "./car_image2.jpg"
import car_image3 from "./car_image3.jpg"
import carbanner from "./carbanner.png"
import car_img1 from "./car_img1.jpg"
import car_img2 from "./car_img2.png"
import car_img3 from "./car_img3.jpg"
import car_img4 from "./car_img4.jpg"
import car_img5 from "./car_img5.jpg"
import car_img6 from "./car_img6.jpg"
import noel from "./noel.svg"
import lance from "./lance.svg"
import jm from "./jm.svg"
import gio from "./gio.svg"
import ayen from "./ayen.svg"

export const cityList = ['Cabanatuan City', 'Gapan City', 'Palayan City', 'San Jose City', 'Science City of Muñoz',
 'Aliaga', 'Bongabon', 'Cabiao', 'Carranglan', 'Cuyapo', 'Gabaldon', 'General Mamerto Natividad',
 'General Tinio', 'Guimba', 'Jaen', 'Laur', 'Licab', 'Llanera', 'Lupao', 'Nampicuan',
 'Pantabangan', 'Peñaranda', 'Quezon', 'Rizal', 'San Antonio', 'San Isidro',
 'San Leonardo', 'Santa Rosa', 'Santo Domingo', 'Talavera', 'Talugtug', 'Zaragoza']


export const assets = {
    carbanner,
    Logo,
    gmail_logo,
    facebook_logo,
    instagram_logo,
    twitter_logo,
    menu_icon,
    search_icon,
    close_icon,
    users_icon,
    edit_icon,
    car_icon,
    location_icon,
    fuel_icon,
    addIcon,
    carIcon,
    carIconColored,
    dashboardIcon,
    dashboardIconColored,
    addIconColored,
    listIcon,
    listIconColored,
    cautionIconColored,
    calendar_icon_colored,
    location_icon_colored,
    arrow_icon,
    star_icon,
    check_icon,
    tick_icon,
    delete_icon,
    eye_icon,
    eye_close_icon,
    filter_icon,
    testimonial_image_1,
    testimonial_image_2,
    testimonial_image_3,
    main_car,
    banner_car_image,
    car_image1,
    upload_icon,
    user_profile,
    car_image2,
    car_image3,
    car_img1,
    car_img2,
    car_img3,
    car_img4,
    car_img5,
    car_img6,
    noel,
    lance,
    jm,
    gio,
    ayen

}

export const menuLinks = [
    { name: "Home", path: "/" },
    { name: "Cars", path: "/cars" },
    { name: "My Bookings", path: "/my-bookings" },
]

export const ownerMenuLinks = [
    { name: "Dashboard", path: "/owner", icon: dashboardIcon, ColoredIcon: dashboardIcon },
    { name: "Add car", path: "/owner/add-car", icon: addIcon, ColoredIcon: addIcon },
    { name: "Manage Cars", path: "/owner/manage-cars", icon: carIcon, ColoredIcon: carIcon },
    { name: "Manage Bookings", path: "/owner/manage-bookings", icon: listIcon, ColoredIcon: listIcon },
]

export const dummyUserData = {
  "_id": "6847f7cab3d8daecdb517095",
  "name": "Zaldy co",
  "email": "admin@example.com",
  "role": "owner",
  "image": user_profile,
}

export const dummyCarData = [
    {
        "_id": "67ff5bc069c03d4e45f30b77",
        "owner": "67fe3467ed8a8fe17d0ba6e2",
        "brand": "MONTERO SPORT",
        "model": "",
        "image": car_image1,
        "year": 2025,
        "category": "Mitsubishi",
        "seating_capacity": 7,
        "fuel_type": "Diesel",
        "transmission": "Automatic",
        "pricePerDay": 4000,
        "location": "Makati",
        "description": "The Mitsubishi Montero Sport is a mid-size SUV known for its rugged design, spacious interior, and reliable diesel performance. It offers 7-seater capacity, advanced safety features, and smooth automatic transmission, making it ideal for both city driving and long trips.",
        "isAvaliable": true,
        "createdAt": "2025-04-16T07:26:56.215Z",
    },
    {
        "_id": "67ff6b758f1b3684286a2a65",
        "owner": "67fe3467ed8a8fe17d0ba6e2",
        "brand": "LANDCRUISER",
        "model": "",
        "image": car_image2,
        "year": 2025,
        "category": "Toyota",
        "seating_capacity": 7,
        "fuel_type": "Diesel",
        "transmission": "Automatic",
        "pricePerDay": 4000,
        "location": "Pampanga",
        "description": "The Toyota Land Cruiser is a full-size SUV renowned for its durability, off-road capability, and premium comfort. With a 7-seater capacity, powerful diesel engine, and smooth automatic transmission, it is perfect for long drives, family trips, and rugged adventures.",
        "isAvaliable": true,
        "createdAt": "2025-04-16T08:33:57.993Z",
    },
    {
        "_id": "67ff6b9f8f1b3684286a2a68",
        "owner": "67fe3467ed8a8fe17d0ba6e2",
        "brand": "FORTUNER ",
        "model": "",
        "image": car_image3,
        "year": 2025,
        "category": "Toyota",
        "seating_capacity": 7,
        "fuel_type": "Diesel",
        "transmission": "Automatic",
        "pricePerDay": 4000,
        "location": "La Union",
        "description": "The Toyota Fortuner is a mid-size SUV designed for versatility, comfort, and performance. With a 7-seater capacity, fuel-efficient diesel engine, and automatic transmission, it’s perfect for both city driving and out-of-town adventures.",
        "isAvaliable": true,
        "createdAt": "2025-04-16T08:34:39.592Z",
    },
    {
         "_id": "67ff6b9f8f1b3684286a2a90",
        "owner": "67fe3467ed8a8fe17d0ba6e2",
        "brand": "CIVIC ",
        "model": "",
        "image": car_img1,
        "year": 2025,
        "category": "Honda",
        "seating_capacity": 5,
        "fuel_type": "Gasoline",
        "transmission": "Automatic",
        "pricePerDay": 2000,
        "location": "Clark",
        "description": "The Toyota Fortuner is a mid-size SUV designed for versatility, comfort, and performance. With a 7-seater capacity, fuel-efficient diesel engine, and automatic transmission, it’s perfect for both city driving and out-of-town adventures.",
        "isAvaliable": true,
        "createdAt": "2025-04-16T08:34:39.592Z",
    },
     {
         "_id": "67ff6b9f8f1b3684286a2a84",
        "owner": "67fe3467ed8a8fe17d0ba6e2",
        "brand": "VIOS ",
        "model": "",
        "image": car_img2,
        "year": 2023,
        "category": "Toyota",
        "seating_capacity": 5,
        "fuel_type": "Gasoline",
        "transmission": "Automatic",
        "pricePerDay": 1500,
        "location": "Clark",
        "description": "The Toyota Fortuner is a mid-size SUV designed for versatility, comfort, and performance. With a 7-seater capacity, fuel-efficient diesel engine, and automatic transmission, it’s perfect for both city driving and out-of-town adventures.",
        "isAvaliable": true,
        "createdAt": "2025-04-16T08:34:39.592Z",
    },
     {
         "_id": "67ff6b9f8f1b3684286a2a24",
        "owner": "67fe3467ed8a8fe17d0ba6e2",
        "brand": "INNOVA ",
        "model": "",
        "image": car_img3,
        "year": 2022,
        "category": "Toyota",
        "seating_capacity": 7,
        "fuel_type": "Diesel",
        "transmission": "Automatic",
        "pricePerDay": 3000,
        "location": "Cabanatuan",
        "description": "The Toyota Fortuner is a mid-size SUV designed for versatility, comfort, and performance. With a 7-seater capacity, fuel-efficient diesel engine, and automatic transmission, it’s perfect for both city driving and out-of-town adventures.",
        "isAvaliable": true,
        "createdAt": "2025-04-16T08:34:39.592Z",
    },
 {
         "_id": "67ff6b9f8f1b3684286a2a36",
        "owner": "67fe3467ed8a8fe17d0ba6e2",
        "brand": "MIRAGE G4",
        "model": "",
        "image": car_img4,
        "year": 2023,
        "category": "Mitsubishi",
        "seating_capacity": 5,
        "fuel_type": "Gasoline",
        "transmission": "Automatic",
        "pricePerDay": 1400,
        "location": "Makati",
        "description": "The Toyota Fortuner is a mid-size SUV designed for versatility, comfort, and performance. With a 7-seater capacity, fuel-efficient diesel engine, and automatic transmission, it’s perfect for both city driving and out-of-town adventures.",
        "isAvaliable": true,
        "createdAt": "2025-04-16T08:34:39.592Z",
    },
     {
         "_id": "67ff6b9f8f1b3684286a2a60",
        "owner": "67fe3467ed8a8fe17d0ba6e2",
        "brand": "NV350 URVAN ",
        "model": "",
        "image": car_img5,
        "year": 2023,
        "category": "Nissan",
        "seating_capacity": 15,
        "fuel_type": "Diesel",
        "transmission": "Manual",
        "pricePerDay": 4500,
        "location": "Cabanatuan",
        "description": "The Toyota Fortuner is a mid-size SUV designed for versatility, comfort, and performance. With a 7-seater capacity, fuel-efficient diesel engine, and automatic transmission, it’s perfect for both city driving and out-of-town adventures.",
        "isAvaliable": true,
        "createdAt": "2025-04-16T08:34:39.592Z",
    },
     {
         "_id": "67ff6b9f8f1b3684286a2a99",
        "owner": "67fe3467ed8a8fe17d0ba6e2",
        "brand": "HIACE COMMUTER ",
        "model": "",
        "image": car_img6,
        "year": 2024,
        "category": "Toyota",
        "seating_capacity": 10,
        "fuel_type": "Diesel",
        "transmission": "Manual",
        "pricePerDay": 5000,
        "location": "Baguio",
        "description": "The Toyota Fortuner is a mid-size SUV designed for versatility, comfort, and performance. With a 7-seater capacity, fuel-efficient diesel engine, and automatic transmission, it’s perfect for both city driving and out-of-town adventures.",
        "isAvaliable": true,
        "createdAt": "2025-04-16T08:34:39.592Z",
    },

];

export const dummyMyBookingsData = [
    {
        "_id": "68482bcc98eb9722b7751f70",
        "car": dummyCarData[1],
        "user": "6847f7cab3d8daecdb517095",
        "owner": "6847f7cab3d8daecdb5170d2",
        "pickupDate": "2025-06-13T00:00:00.000Z",
        "returnDate": "2025-06-14T00:00:00.000Z",
        "status": "confirmed",
        "price": 3000,
        "createdAt": "2025-06-10T12:57:48.244Z",
    },
    {
        "_id": "68482bb598eb9722b7751f60",
        "car": dummyCarData[2],
        "user": "6847f7cab3d8daecdb517095",
        "owner": "67fe3467ed8a8fe17d0ba6e2",
        "pickupDate": "2025-06-12T00:00:00.000Z",
        "returnDate": "2025-06-12T00:00:00.000Z",
        "status": "pending",
        "price": 4000,
        "createdAt": "2025-06-10T12:57:25.613Z",
    },
    {
        "_id": "684800fa0fb481c5cfd92e56",
        "car": dummyCarData[3],
        "user": "6847f7cab3d8daecdb517095",
        "owner": "67fe3467ed8a8fe17d0ba6e2",
        "pickupDate": "2025-06-11T00:00:00.000Z",
        "returnDate": "2025-06-12T00:00:00.000Z",
        "status": "pending",
        "price": 2000,
        "createdAt": "2025-06-10T09:55:06.379Z",
    },
    {
        "_id": "6847fe790fb481c5cfd92d14",
        "car": dummyCarData[4],
        "user": "6847f7cab3d8daecdb517095",
        "owner": "6847f7cab3d8daecdb517032",
        "pickupDate": "2025-06-11T00:00:00.000Z",
        "returnDate": "2025-06-12T00:00:00.000Z",
        "status": "confirmed",
        "price": 4000,
        "createdAt": "2025-06-10T09:44:25.410Z",
    },
     {
        "_id": "6847fe790fb481c5cfd92d95",
        "car": dummyCarData[5],
        "user": "6847f7cab3d8daecdb517095",
        "owner": "6847f7cab3d8daecdb517076",
        "pickupDate": "2025-06-11T00:00:00.000Z",
        "returnDate": "2025-06-12T00:00:00.000Z",
        "status": "confirmed",
        "price": 4000,
        "createdAt": "2025-06-10T09:44:25.410Z",
    },
     {
        "_id": "6847fe790fb481c5cfd92d96",
        "car": dummyCarData[6],
        "user": "6847f7cab3d8daecdb517095",
        "owner": "6847f7cab3d8daecdb517045",
        "pickupDate": "2025-06-11T00:00:00.000Z",
        "returnDate": "2025-06-12T00:00:00.000Z",
        "status": "confirmed",
        "price": 4000,
        "createdAt": "2025-06-10T09:44:25.410Z",
    }
]

export const dummyDashboardData = {
    "totalCars": 4,
    "totalBookings": 6,
    "pendingBookings": 2,
    "completedBookings": 3,
    "recentBookings": [
        dummyMyBookingsData[0],
        dummyMyBookingsData[1]
    ],
    "monthlyRevenue": 20322
}