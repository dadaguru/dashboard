'use server';
//// for now will not use this file as there is some issue in attaching image
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

import { CreateDadabadiEmailTemplate } from '@/app/components/create-dadabadi-email-template';
import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import * as React from 'react';
import { validateString } from './utils';
import * as handlebars from "handlebars";
import { welcomeTemplate } from "@/app/lib/templates/welcome";

const resend = new Resend(process.env.RESEND_API_KEY);

const FormSchema = z.object({ 
  id: z.string(),
  title: z.string({ invalid_type_error: 'Please provide a title.' }),
  titlehin: z.string({ invalid_type_error: 'Please provide a hindi title.' }),
  trustname: z.string({ invalid_type_error: 'Please provide a trust name.' }),
  websiteurl: z.string({ invalid_type_error: 'Please provide website url.' }),
  socialmediaurl: z.string({ invalid_type_error: 'Please provide social media link.' }),
  email: z.string({ invalid_type_error: 'Please provide valid email.' }),
  pin: z.string({ invalid_type_error: 'Please provide a valid postal pin.' }),
  eventid: z.string({ invalid_type_error: 'Please provide a event details.' }),
  bhojanshala: z.enum(['available', 'notavailable'], {
    invalid_type_error: 'Please select if Bhojanshala available.',
  }),
  dharmshala: z.enum(['available', 'notavailable'], {
    invalid_type_error: 'Please select if Dharmshala available.',
  }),
  contactnumber: z.string({ invalid_type_error: 'Please provide contact number.' }),
  maplink: z.string({ invalid_type_error: 'Please provide google map link.' }),
  image1: z.string({ invalid_type_error: 'Please upload an external image of dadabadi.' }).default('image1').optional(),
  image2: z.string({ invalid_type_error: 'Please upload an internal image of dadabadi.' }).default('image2').optional(),
  state: z.string({ invalid_type_error: 'Please select state.' }),
  city: z.string({ invalid_type_error: 'Please provide name of area where dadabadi is located.' }),
  description: z.string({ invalid_type_error: 'Please provide the importance of this dadabadi.' }),
  address: z.string({ invalid_type_error: 'Please provide address of dadabadi.' }),
  contactname: z.string({ invalid_type_error: 'Please provide contact name.' }),
  moolnayakname: z.string({ invalid_type_error: 'Please provide MoolNayak Bhagwan Name.' }),
  dadaguruname: z.string({ invalid_type_error: 'Please provide Dadaguru Name.' }),
  published :  z.enum(['published', 'notpublished'], {
    invalid_type_error: 'Please select if you want to publish ? Have you verified the listing?',
  })
});

const CreateDadabadiEmail = FormSchema.omit({ id: true, date: true });

export async function createDadabadiEmail(prevState: State, formData: FormData) {
  // Validate form using Zod
  const validatedFields = CreateDadabadiEmail.safeParse({
    title: formData.get('title'),
    titlehin: formData.get('titlehin'),
    trustname: formData.get('trustname'),
    websiteurl: formData.get('websiteurl'),
    socialmediaurl: formData.get('socialmediaurl'),
    email: formData.get('email'),
    pin: formData.get('pin'),
    eventid: formData.get('eventid'),
    bhojanshala: formData.get('bhojanshala'),
    dharmshala: formData.get('dharmshala'),
    contactnumber: formData.get('contactnumber'),
    maplink: formData.get('maplink'),
    image1: formData.get('image1') as unknown as File,
    image2: formData.get('image2'),
    state: formData.get('state'),
    city: formData.get('city'),
    description: formData.get('description'),
    address: formData.get('address'),
    contactname: formData.get('contactname'),
    moolnayakname: formData.get('moolnayakname'),
    dadaguruname: formData.get('dadaguruname'),
    published: 'notpublished',
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Dadabadi.',
    };
  }

  // Prepare data for insertion into the database
  const {
    title,
    titlehin,
    trustname,
    websiteurl,
    socialmediaurl,
    email,
    pin,
    eventid,
    bhojanshala,
    dharmshala,
    contactnumber,
    maplink,
    image1,
    image2,
    state,
    city,
    description,
    address,
    contactname,
    moolnayakname,
    dadaguruname  
  } = validatedFields.data;
  //const amountInCents = amount * 100;
  
  // Send email 
  try {
    // send mail here
    const { data, error } = await resend.emails.send({
      from: 'Dadabadi <info@therichdesigns.com>',
      to: "dijaingroup@gmail.com" as string,
      //cc: ["dadaguruweb@gmail.com"],
      //bcc: "yatindrajain@gmail.com",
      subject: "Jai Jinendra from Dadabadi Website",
      //reply_to: senderEmail as string,
      //attachments: attachments,
      react: CreateDadabadiEmailTemplate({
        title: title as string,
        titlehin: titlehin as string,
        trustname: trustname as string,
        websiteurl: websiteurl as string,
        socialmediaurl: socialmediaurl as string,
        email: email as string,
        pin: pin as string,
        eventid: eventid as string,
        bhojanshala: bhojanshala as string,
        dharmshala: dharmshala as string,
        contactnumber: contactnumber as string,
        maplink: maplink as string,
        image1: image1 as string,
        image2: image2 as string,
        state: state as string,
        city: city as string,
        description: description as string,
        address: address as string,
        contactname: contactname as string,
        moolnayakname: moolnayakname as string,
        dadaguruname : dadaguruname  as string,
        //name: name as string,
        //senderEmail: senderEmail as string,
        //senderNumber: senderNumber as string,
        //message: message as string
      }) as React.ReactElement,
    });
    console.log("response data in sendemail ts :", data);
    revalidatePath('/dadabadis/create');
    if (error) {      
      return {        
        message: 'Missing Fields. Failed to Create Dadabadi.',
      };
    }    
      return {        
        message: 'Email sent successfully.',
      };   
  } catch (error) {
    console.log("send email error : ", error)
    // If a database error occurs, return a more specific error.
    return {      
      message: 'Send Email Error: Failed to send email.',
    };
  }  
  redirect('/dadabadis/create');
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export type State = {
  errors?: {
    senderName?: string[];
    senderEmail?: string[];
    senderNumber?: string[];
    title?: string[];
    titlehin?: string[];
    trustname?: string[];
    websiteurl?: string[];
    socialmediaurl?: string[];
    email?: string[];
    pin?: string[];
    eventid?: string[];
    bhojanshala?: string[];
    dharmshala?: string[];
    contactnumber?: string[];
    maplink?: string[];
    image1?: string[];
    image2?: string[];
    state?: string[];
    city?: string[];
    description?: string[];
    address?: string[];
    contactname?: string[];
    moolnayakname?: string[];
    dadaguruname?: string[];
    published?: string[];
    created_at?: string[];
  };
  message?: string | null;
};