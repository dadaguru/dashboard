import { Resend } from 'resend';
import { NextResponse, NextRequest } from 'next/server';
import * as React from 'react';
import CreateDadabadiEmailTemplate from '@/app/components/create-dadabadi-email-template';
import { redirect } from 'next/navigation'
import { NextApiRequest, NextApiResponse } from 'next';
const resend = new Resend(process.env.RESEND_API_KEY);



export async function POST(request: NextRequest, response: NextResponse) {
  try {
    console.log("reached in api router")
    const body = await request.json();
    console.log("email body in api call :", body);

    const {
      senderName,
      senderEmail,
      senderNumber,
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
      dadaguruname,
      content,
      filename,
      content2,
      filename2,
    } = body;

    const { data, error } = await resend.emails.send({
      from: 'Dadabadi <info@therichdesigns.com>',
      to: senderEmail as string,
      cc: ["dadaguruweb@gmail.com"],
      bcc: "yatindrajain@gmail.com",
      subject: "Jai Jinendra from www.dadaguru.in",
      reply_to: senderEmail as string,

      react: CreateDadabadiEmailTemplate({
        title : title as string,
        titlehin : titlehin as string,
        trustname : trustname as string,
        websiteurl : websiteurl as string,
        socialmediaurl : socialmediaurl as string,
        email : email as string,
        pin : pin as string,
        eventid : eventid as string,
        bhojanshala : bhojanshala as string,
        dharmshala : dharmshala as string,
        contactnumber : contactnumber as string,
        maplink : maplink as string,
        image1 : image1 as string,
        image2 : image2 as string,
        state : state as string,
        city : city as string,
        description : description as string,
        address : address as string,
        contactname : contactname as string,
        moolnayakname : moolnayakname as string,
        dadaguruname : dadaguruname as string,
        senderName : senderName as string,
        senderNumber : senderNumber as string,
      }) as React.ReactElement,
      attachments: [
        {
          content: content,
          filename: filename,
        },
        {
          content: content2,
          filename: filename2,
        }
      ],
    });
    console.log("data in resend meail res :", data);
    console.log("eroor in resend meail res :", error);
    if (error) {
      return NextResponse.json({ message: error.message });
    }

    if (data) {
      return NextResponse.json({ message: 'Email sent successfully' });
    }
    console.log("hahahaha")
    //redirect('/dadabadis/contact');
  } catch (error) {
    return NextResponse.json({ error });
  }
}