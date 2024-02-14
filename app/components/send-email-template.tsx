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

interface ContactEmailTemplateProps {
  name? : string;
  senderEmail? : string;
  senderNumber? : string;
  message? : string;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "";

export const ContactEmailTemplate = ({  
  name,
  senderEmail,
  senderNumber,
  message,
}: ContactEmailTemplateProps) => { 

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
                  Hi {name},
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
                  the following details.
                </Heading>

                <Text style={paragraph}>
                  <b>Your Email: </b>
                  {senderEmail}
                </Text>
                <Text style={{ ...paragraph, marginTop: -5 }}>
                  <b>Your Contact Number: </b>
                  {senderNumber}
                </Text>
                <Text style={{ ...paragraph, marginTop: -5 }}>
                  <b>Your message: </b>                  
                </Text>
                <Text style={paragraph}>
                  {message}
                </Text>                
              </Column>
            </Row>            
          </Section>

          <Section style={containerImageFooter}>
            <Img
              style={image}
              width={620}
              src={`${baseUrl}/static/yelp-footer.png`}
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

ContactEmailTemplate.PreviewProps = {  
  name : "testname",
  senderEmail : "test@dadaguru.in",
  senderNumber : "1234567890",
  message : "testmessage",
} as ContactEmailTemplateProps;

export default ContactEmailTemplate;

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


/* import * as React from 'react';

interface EmailTemplateProps {
  firstName: string;
}

export const SendEmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
}) => (
  <div>
    <h1>Welcome, {firstName}!</h1>
  </div>
);
 */
