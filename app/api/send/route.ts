import { EmailTemplate } from '@/app/components/email-template';
import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import * as React from 'react';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request:any) {
  try {
    const body = await request.json();
    console.log("email body is mail :", body);
    const {name, email, message } = body;
    const { data, error } = await resend.emails.send({
      from: 'Dadabadi <info@therichdesigns.com>',
      to: email,
      subject: "Hello dadabadis",
      react: EmailTemplate({ firstName: name}) as React.ReactElement,
    });

    console.log("data in resend meail res :", data);

    console.log("eroor in resend meail res :", error);
    
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