import womenClothing from "../assets/womenClothing.png";
import jewelery from "../assets/jewelery.png";
import electronics from "../assets/electronics.png";
import mensClothing from "../assets/mensClothing.png";
import carousal1 from "../assets/corosal1.png";
import carousal2 from "../assets/corosal2.png";
import carousal3 from "../assets/corosal3.png";
import carousal4 from "../assets/corosal4.png";
import carousal5 from "../assets/corosal5.png";

export const categoryContent = [
  { name: "Electronics", url: electronics },
  { name: "Jewelery", url: jewelery },
  { name: "Men's clothing", url: mensClothing },
  { name: "Women's clothing", url: womenClothing },
];

export const carousalItem = [
  { url: carousal1 },
  { url: carousal2 },
  { url: carousal3 },
  { url: carousal4 },
  { url: carousal5 },
];

export const offersList = [
  {
    offerName: "Bank Offer",
    offer:
      "Get ₹50 instant discount on first Flipkart UPI transaction on order of ₹200 and above",
    TAC: "T&C",
  },
  {
    offerName: "Bank Offer",
    offer: "5% Cashback on Flipkart Axis Bank Card",
    TAC: "T&C",
  },
  {
    offerName: "Special Offer",
    offer: " Get extra ₹4300 off (price inclusive of cashback/coupon)",
    TAC: "T&C",
  },
  {
    offerName: "Partner Offer",
    offer:
      "Make a purchase and enjoy a surprise cashback/ coupon that you can redeem later",
    TAC: "T&C",
  },
];

export const baseURL = "https://fakestoreapi.com";
