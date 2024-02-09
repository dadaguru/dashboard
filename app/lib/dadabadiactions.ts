'use server';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

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

const CreateDadabadi = FormSchema.omit({ id: true, date: true });

// Use Zod to update the expected types
const UpdateInvoice = FormSchema.omit({ id: true, date: true });

export async function createDadabadi(prevState: State, formData: FormData) {
  // Validate form using Zod
  const validatedFields = CreateDadabadi.safeParse({
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
    image1: formData.get('image1'),
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
  const date = new Date().toISOString().split('T')[0];

  // Insert data into the database
  try {
    await sql`
      INSERT INTO dadabadis (        
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
        published,
        created_at
      )
      VALUES (   
        ${title},
        ${titlehin},
        ${trustname},
        ${websiteurl},
        ${socialmediaurl},
        ${email},
        ${pin},
        ${eventid},
        ${bhojanshala},
        ${dharmshala},
        ${contactnumber},
        ${maplink},
        ${image1},
        ${image2},
        ${state},
        ${city},
        ${description},
        ${address},
        ${contactname},
        ${moolnayakname},
        ${dadaguruname},
        'notpublished',
        ${date}
      )
    `;
  } catch (error) {
    console.log("db error : ", error)
    // If a database error occurs, return a more specific error.
    return {
      message: 'Database Error: Failed to Create Invoice.',
    };
  }
  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath('/dashboard/dadabadis');
  redirect('/dashboard/dadabadis');
}

export async function updateDadabadi(
  id: string,
  prevState: State,
  formData: FormData,
) {
  const validatedFields = UpdateInvoice.safeParse({    
    id: formData.get('id'),
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
    image1: formData.get('image1'),
    image2: formData.get('image2'),
    state: formData.get('state'),
    city: formData.get('city'),
    description: formData.get('description'),
    address: formData.get('address'),
    contactname: formData.get('contactname'),
    moolnayakname: formData.get('moolnayakname'),
    dadaguruname: formData.get('dadaguruname'),
    published: formData.get('published')
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Invoice.',
    };
  }

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
    dadaguruname,
    published
  } = validatedFields.data;

  
  try {
    await sql`
      UPDATE dadabadis
      SET 
        title = ${title},
        titlehin = ${titlehin},
        trustname = ${trustname},
        websiteurl = ${websiteurl},
        socialmediaurl = ${socialmediaurl},
        email = ${email},
        pin = ${pin},
        eventid = ${eventid},
        bhojanshala = ${bhojanshala},
        dharmshala = ${dharmshala},
        contactnumber = ${contactnumber},
        maplink = ${maplink},
        image1 = ${image1},
        image2 = ${image2},
        state = ${state},
        city = ${city},
        description = ${description},
        address = ${address},
        contactname = ${contactname},
        moolnayakname = ${moolnayakname},
        dadaguruname = ${dadaguruname},
        published = ${published}

       WHERE id = ${id}
    `;
  } catch (error) {
    console.log("error is :", error);
    return { message: 'Database Error: Failed to Update Dadabadi.' };
  }
  console.log("inside dadaadi action update dadabadi path")
  revalidatePath('/dashboard/dadabadis');
  redirect('/dashboard/dadabadis');
}

export async function deleteDadabadi(id: string) {
  try {
    await sql`DELETE FROM dadabadis WHERE id = ${id}`;
    revalidatePath('/dashboard/dadabadis');
    return { message: 'Deleted Dadabadi.' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Dadabadi.' };
  }
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
    id?: string[];
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