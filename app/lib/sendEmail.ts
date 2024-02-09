'use server';
import { ContactEmailTemplate } from '@/app/components/send-email-template';
import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import * as React from 'react';
import { validateString } from './utils';
import * as handlebars from "handlebars";
import { welcomeTemplate } from "@/app/lib/templates/welcome";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (formData: FormData) => { 
  console.log("formdada email :", formData.get("senderEmail"))
  const name = formData.get("name");
  const senderEmail = formData.get("senderEmail");
  const senderNumber = formData.get("senderNumber");
  const message = formData.get("message");

  if(!senderEmail && typeof senderEmail !== "string"){
    return {
      error : "Your email is invalid, please fill valid email."
    }
  }

  if(!senderNumber && typeof senderNumber !== "string"){
    return {
      error : "Your contact number is invalid, please fill valid moblie number."
    }
  }

  if(!name && typeof name !== "string"){
    return {
      error : "Your name is invalid, please fill valid name."
    }
  }
  
  if(!validateString(message, 3000)){
    return{
      error: "Invalid message, please fill valid message"
    }
  }

  await resend.emails.send({
    from: 'Dadabadi <info@therichdesigns.com>',
    to: ["dadaguruweb@gmail.com", "dijaingroup@gmail.com"],
    bcc: "yatindrajain@gmail.com",
    subject: "Hello dadabadis from resend mail",
    reply_to: senderEmail as string,
    react: ContactEmailTemplate({ userFirstName: name as string}) as React.ReactElement,
    
  });
}

/* export async function POST(request:any) {
  try {
    const body = await request.json();    
    const {name, email, message } = body;
    const { data, error } = await resend.emails.send({
      from: 'Dadabadi <info@therichdesigns.com>',
      to: email,
      subject: "Hello dadabadis",
      react: EmailTemplate({ firstName: name}) as React.ReactElement,
    });
    if (error) {
      return Response.json({ error });
    }
    if(data){
      return NextResponse.json({message : 'email send successfully'});
    }
    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json({ error });
  }
} */

