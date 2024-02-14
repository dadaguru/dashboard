'use server';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';


const ContactSchema = z.object({
  name: z.string({ invalid_type_error: 'Please provide a Name.' }),
  senderEmail: z.string({ invalid_type_error: 'Please provide a valid Email.' }),
  senderNumber: z.string({ invalid_type_error: 'Please provide a valid Contact Number.' }),
  message: z.string({ invalid_type_error: 'Please provide valid message.' }),
});

export async function emailContactForm(prevState: State, formData: FormData) {
  // Validate form using Zod
  const validatedFields = ContactSchema.safeParse({
    name: formData.get('name'),
    senderEmail: formData.get('senderEmail'),
    senderNumber: formData.get('senderNumber'),
    message: formData.get('message'),    
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
    name,
    senderEmail,
    senderNumber,
    message    
  } = validatedFields.data;

  // Proceed with form submission
  console.log(validatedFields.data);
  const response = await fetch('/api/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: name,
      senderEmail: senderEmail,
      senderNumber: senderNumber,
      message: message
    }),
  });
  const resp = await response.json();
  if (resp.message) {
    return {      
      message: resp.message,
    };
  } else {
    return {      
      message: "Error in sending mail",
    };
  }
}

export type State = {
  errors?: {
    name?: string[];
    senderEmail?: string[];
    senderNumber?: string[];
    message?: string[];    
  };
  message?: string | null;
};