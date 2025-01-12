export interface ITemplate {
  _id: string;
  title: string;
  template_id: any;
  styles: any[];
  createdAt?: string;
  updatedAt?: string;
}

export interface IBusinessDetails {
  _id?: string;
  full_name?: string;
  first_name?: string;
  last_name?: string;
  personal_email?: string;
  company_email?: string;
  zip_code?: string;
  bio?: string;
  company_name?: string;
  position?: string;
  address?: string;
  mobilePhone?: string;
  telephone?: string;
  logo?: string;
  company_address?: string;
  web_url?: string;
  qr_url?: string;
  color_palette?: string[];
  template?: string; // Refers to the `Template` model or its ID
}

export interface IUser {
  _id: string;
  first_name?: string;
  last_name?: string;
  email: string;
  password?: string;
  register_type?: string;
  photo?: string;
  templates?: ITemplate[] | string[]; // Refers to an array of `Template` models or their IDs
  businessDetails?: IBusinessDetails[];
  createdAt?: string;
  updatedAt?: string;
}
