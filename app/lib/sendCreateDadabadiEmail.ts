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

  if (!senderEmail && typeof senderEmail !== "string") {
    return {
      error: "Your email is invalid, please fill valid email."
    }
  }

  if (!senderNumber && typeof senderNumber !== "string") {
    return {
      error: "Your contact number is invalid, please fill valid moblie number."
    }
  }

  if (!name && typeof name !== "string") {
    return {
      error: "Your name is invalid, please fill valid name."
    }
  }

  if (!validateString(message, 3000)) {
    return {
      error: "Invalid message, please fill valid message"
    }
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'Dadabadi <info@therichdesigns.com>',
      to: senderEmail as string,
      //cc: ["dadaguruweb@gmail.com"],
      //bcc: "yatindrajain@gmail.com",
      subject: "Jai Jinendra from www.dadaguru.in",
      reply_to: senderEmail as string,
      react: ContactEmailTemplate({
        name: name as string,
        senderEmail: senderEmail as string,
        senderNumber: senderNumber as string,
        message: message as string
      }) as React.ReactElement,
    });
    console.log("response data in sendemail ts :", data);
    if (error) {
      return NextResponse.json({ error });
    }
    if(data){
      return NextResponse.json({message : 'Email sent successfully'});
    }    
  } catch (error) {
    return NextResponse.json({ error });
  }


}


