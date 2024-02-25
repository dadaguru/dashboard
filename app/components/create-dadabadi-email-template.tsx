// https://demo.react.email/preview/yelp-recent-login.tsx?view=source&lang=jsx
//https://dev.to/thevinitgupta/crafting-stunning-emails-with-nextjs-and-tailwind-css-529a

import {
  Body,
  Button,
  Container,
  Column,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface CreateDadabadiEmailTemplateProps {
  sendername?: string;
  senderemail?: string;
  sendernumber?: string;
  title?: string;
  titlehin?: string;
  trustname?: string;
  websiteurl?: string;
  socialmediaurl?: string;
  email?: string;
  pin?: string;
  eventid?: string;
  bhojanshala?: string;
  dharmshala?: string;
  contactnumber?: string;
  maplink?: string;
  image1?: string;
  image2?: string;
  state?: string;
  city?: string;
  description?: string;
  address?: string;
  contactname?: string;
  moolnayakname?: string;
  dadaguruname?: string;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "";

export const CreateDadabadiEmailTemplate = ({
  sendername,
  sendernumber,
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
}: CreateDadabadiEmailTemplateProps) => {

  return (
    <Html>
      <Head />
      <Preview>दादाबाड़ी वेब साईट से सादर जय जिनेन्द्र</Preview>
      <Body style={main}>
        <Container>
          <Section style={logo}>
            <Img src={`${baseUrl}/images/yelp-logo.png`} />
          </Section>
          <Section style={content}>
            <Row>
              <Img
                style={image}
                width={620}
                src={`${baseUrl}/images/yelp-header.png`}
              />
            </Row>
            <Row style={{ ...boxInfos, paddingBottom: "0" }}>
              <Column>
                <Heading
                  style={{
                    fontSize: 32,
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Jai Jinendra {sendername} Ji,
                </Heading>
                <Heading
                  as="h2"
                  style={{
                    fontSize: 26,
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Thank you for contacting us through contact form at www.dadaguru.in, you have submitted
                  the following details. We shall reach out to your mobile number {sendernumber}, if we have any
                  questions.
                </Heading>
                <Text style={paragraph}>
                  <b>City : </b>
                  {title}
                </Text>                
                <Text style={{ ...paragraph, marginTop: -5 }}>
                  <b>शहर का नाम हिन्दी में  : </b>
                  {titlehin}
                </Text>
                <Text style={{ ...paragraph, marginTop: -5 }}>
                  <b>Trust name : </b>
                  {trustname}
                </Text>
                <Text style={{ ...paragraph, marginTop: -5 }}>
                  <b>Contact name : </b>
                  {contactname}
                </Text>
                <Text style={{ ...paragraph, marginTop: -5 }}>
                  <b>Contact number : </b>
                  {contactnumber}
                </Text>
                <Text style={{ ...paragraph, marginTop: -5 }}>
                  <b>Address : </b>
                  {address}
                </Text>
                <Text style={{ ...paragraph, marginTop: -5 }}>
                  <b>City : </b>
                  {city}
                </Text>
                <Text style={{ ...paragraph, marginTop: -5 }}>
                  <b>State : </b>
                  {state}
                </Text>
                <Text style={{ ...paragraph, marginTop: -5 }}>
                  <b>Pin : </b>
                  {pin}
                </Text>
                <Text style={{ ...paragraph, marginTop: -5 }}>
                  <b>Bhojan Shala : </b>
                  {bhojanshala}
                </Text>
                <Text style={{ ...paragraph, marginTop: -5 }}>
                  <b>Dharm shala : </b>
                  {dharmshala}
                </Text>
                <Text style={{ ...paragraph, marginTop: -5 }}>
                  <b>Email : </b>
                  {email}
                </Text>
                <Text style={{ ...paragraph, marginTop: -5 }}>
                  <b>Website URL : </b>
                  {websiteurl}
                </Text>
                <Text style={{ ...paragraph, marginTop: -5 }}>
                  <b>Socialmedia URL : </b>
                  {socialmediaurl}
                </Text>
                <Text style={{ ...paragraph, marginTop: -5 }}>
                  <b>Google Maplink : </b>
                  {maplink}
                </Text>
                <Text style={{ ...paragraph, marginTop: -5 }}>
                  <b>Event : </b>
                  {eventid}
                </Text>
                <Text style={{ ...paragraph, marginTop: -5 }}>
                  <b>Image 1 : </b>
                  {image1}
                </Text>
                <Text style={{ ...paragraph, marginTop: -5 }}>
                  <b>Image 2 : </b>
                  {image2}
                </Text>
                <Text style={{ ...paragraph, marginTop: -5 }}>
                  <b>Moolnayak name : </b>
                  {moolnayakname}
                </Text>
                <Text style={{ ...paragraph, marginTop: -5 }}>
                  <b>Dadaguru name : </b>
                  {dadaguruname}
                </Text>                
                <Text style={paragraph}>
                  <b>Description / Comments : </b>
                  {description}
                </Text>                
              </Column>
            </Row>            
          </Section>
          <Section style={containerImageFooter}>
            <Img
              style={image}
              width={620}
              src={`${baseUrl}/images/yelp-footer.png`}
            />
          </Section>
          <Text
            style={{
              textAlign: "center",
              fontSize: 12,
              color: "rgb(0,0,0, 0.7)",
            }}
          >
            © 2024 | www.dadaguru.in           
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

CreateDadabadiEmailTemplate.PreviewProps = {
  sendername : "sendername",
  sendernumber : "sendernumber",
  title : "title",
  titlehin : "titlehin",
  trustname : "trustname",
  websiteurl : "websiteurl",
  socialmediaurl : "socialmediaurl",
  email : "email",
  pin : "pin",
  eventid : "eventid",
  bhojanshala : "bhojanshala",
  dharmshala : "dharmshala",
  contactnumber : "contactnumber",
  maplink : "maplink",
  image1 : "image1",
  image2 : "image2",
  state : "state",
  city : "city",
  description : "description",
  address : "address",
  contactname : "contactname",
  moolnayakname : "moolnayakname",
  dadaguruname : "dadaguruname",  
} as CreateDadabadiEmailTemplateProps;

export default CreateDadabadiEmailTemplate;

const main = {
  backgroundColor: "#fff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const paragraph = {
  fontSize: 16,
};

const logo = {
  padding: "30px 20px",
};

const containerButton = {
  display: "flex",
  justifyContent: "center",
  width: "100%",
};

const button = {
  backgroundColor: "#e00707",
  borderRadius: 3,
  color: "#FFF",
  fontWeight: "bold",
  border: "1px solid rgb(0,0,0, 0.1)",
  cursor: "pointer",
  padding: "12px 30px",
};

const content = {
  border: "1px solid rgb(0,0,0, 0.1)",
  borderRadius: "3px",
  overflow: "hidden",
};

const image = {
  maxWidth: "100%",
};

const boxInfos = {
  padding: "20px",
};

const containerImageFooter = {
  padding: "45px 0 0 0",
};

