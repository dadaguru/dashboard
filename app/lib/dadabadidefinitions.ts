// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  image_url: string;
};

export type Invoice = {
  id: string;
  customer_id: string;
  amount: number;
  date: string;
  // In TypeScript, this is called a string union type.
  // It means that the "status" property can only be one of the two strings: 'pending' or 'paid'.
  status: 'pending' | 'paid';
};

export type Revenue = {
  month: string;
  revenue: number;
};

export type LatestInvoice = {
  id: string;
  name: string;
  image_url: string;
  email: string;
  amount: string;
};

// The database returns a number for amount, but we later format it to a string with the formatCurrency function
export type LatestDadabadiRaw = Omit<LatestInvoice, 'amount'> & {
  amount: number;
};

export type DadabadiTable = {
id: string;
title: string;
titlehin: string;
trustname: string;
websiteurl: string;
socialmediaurl: string;
email: string;
pin: string;
eventid: string;
bhojanshala: string;
dharmshala: string;
contactnumber: string;
maplink: string;
image1: string;
image2: string;
state: string;
city: string;
description: string;
address: string;
contactname: string;
moolnayakname: string;
dadaguruname: string;
published: string;
created_at: string;
};

export type CustomersTableType = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: number;
  total_paid: number;
};

export type FormattedCustomersTable = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: string;
  total_paid: string;
};

export type CustomerField = {
  id: string;
  name: string;
};

export type DadabadiForm = {
  id: string;
  title: string;
  titlehin: string;
  trustname: string;
  websiteurl: string;
  socialmediaurl: string;
  email: string;
  pin: string;
  eventid: string;
  bhojanshala: 'available' | 'notavailable';
  dharmshala: 'available' | 'notavailable';
  contactnumber: string;
  maplink: string;
  image1: string;
  image2: string;
  state: string;
  city: string;
  description: string;
  address: string;
  contactname: string;
  moolnayakname: string;
  dadaguruname: string;
  published: 'published' | 'notpublished';
  created_at: string; 
};

export type IndiaStatesField = {
  id: string;
  slno: string;
  abb: string;
  name: string;
  state: string;
};

export type DadabadiField = {
  id: string;
  title: string;  
  titlehin: string;
  trustname: string;
  websiteurl: string;
  socialmediaurl: string;
  email: string;
  pin: string;
  eventid: string;
  bhojanshala: string;
  dharmshala: string;
  contactnumber: string;
  maplink: string;
  image1: string;
  image2: string;
  state: string;
  city: string;
  description: string;
  address: string;
  contactname: string;
  moolnayakname: string;
  dadaguruname: string;
  published: string;
  created_at: string;
};