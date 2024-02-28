import { Resend } from 'resend';
import { NextResponse, NextRequest } from 'next/server';
import * as React from 'react';
import ContactEmailTemplate from '@/app/components/send-email-template';
import { redirect } from 'next/navigation'
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request:NextRequest) {
  try {
    const body = await request.json();
    console.log("email body in api call :", body);
    console.log("ip in api call :", request.ip);
    console.log("request.geo.city in api call :", request.geo?.city);
    console.log("ip x forwarded for in api call :", request.headers.get('X-Forwarded-For'));
    const {
      name,
      senderEmail,
      senderNumber,
      message
     } = body;
    const { data, error } = await resend.emails.send({
      from: 'Dadabadi <info@dadabadi.dadaguru.in>',
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
    console.log("data in resend meail res :", data);
    console.log("eroor in resend meail res :", error);    
    if (error) {
      return NextResponse.json({ message : error.message });
    }

    if(data){
      return NextResponse.json({message : 'Email sent successfully'});
    }
    console.log("hahahaha")
    //redirect('/dadabadis/contact');
  } catch (error) {
    return NextResponse.json({ error });
  }
}

/* export async function POST() {
  try {
    const data = await resend.emails.send({
      from: 'Dadabadi <info@therichdesigns.com>',
      to: ['yatindrajain@gmail.com'],
      subject: 'Hello Dadabadis',
      react: EmailTemplate({ firstName: 'John' }),
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
 */