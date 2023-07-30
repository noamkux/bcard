export default interface Card {
  id?: number;
  ownerId?: number;
  title: string;
  subtitle: string;
  description: string;
  phone: string;
  email: string;
  webSite: string;
  businessImgURL?: string;
  businessImgAlt?: string;
  country: string;
  state?: string;
  city: string;
  street: string;
  houseNumber: string;
  zipcode: string;
  postDate : string
}
