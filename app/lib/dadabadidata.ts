import { unstable_noStore as noStore } from 'next/cache';
import { sql } from '@vercel/postgres';
import {
  User,
  DadabadiTable,
  LatestDadabadiRaw,
  DadabadiForm 
} from './dadabadidefinitions';
import { formatCurrency } from './utils';
import { DadabadiField, IndiaStatesField } from '@/app/lib/dadabadidefinitions';


export async function fetchLatestInvoices() {
  noStore();
  try {
    const data = await sql<LatestDadabadiRaw>`
      SELECT invoices.amount, customers.name, customers.image_url, customers.email, invoices.id
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      ORDER BY invoices.date DESC
      LIMIT 5`;

    const latestInvoices = data.rows.map((invoice) => ({
      ...invoice,
      amount: formatCurrency(invoice.amount),
    }));
    return latestInvoices;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest invoices.');
  }
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredDadabadis(
  query: string,
  currentPage: number,
) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const dadabadis = await sql<DadabadiTable>`
      SELECT
        dadabadis.id,
        dadabadis.title,
        dadabadis.titlehin,
        dadabadis.trustname,
        dadabadis.websiteurl,
        dadabadis.socialmediaurl,
        dadabadis.email,
        dadabadis.pin,
        dadabadis.eventid,
        dadabadis.bhojanshala,
        dadabadis.dharmshala,
        dadabadis.contactnumber,
        dadabadis.maplink,
        dadabadis.image1,
        dadabadis.image2,
        dadabadis.state,
        dadabadis.city,
        dadabadis.description,
        dadabadis.address,
        dadabadis.contactname,
        dadabadis.moolnayakname,
        dadabadis.dadaguruname,
        dadabadis.published,
        dadabadis.created_at        
      FROM dadabadis      
      WHERE        
        dadabadis.title ILIKE ${`%${query}%`} OR
        dadabadis.description ILIKE ${`%${query}%`} 
        
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;
    console.log("dadabadis.rows", dadabadis.rows);
    return dadabadis.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch dadabadis.');
  }
}

export async function fetchDadabadisPages(query: string) {
  noStore();
  try {
    const count = await sql`SELECT COUNT(*)
    FROM dadabadis    
    WHERE      
    dadabadis.city::text ILIKE ${`%${query}%`} OR
    dadabadis.title::text ILIKE ${`%${query}%`}    
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    console.log("total pages :", totalPages);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of dadabadis.');
  }
}

export async function fetchDadabadiById(id: string) {
  noStore();
  try {
    const data = await sql<DadabadiForm>`
      SELECT
        dadabadis.id,
        dadabadis.title,
        dadabadis.titlehin,
        dadabadis.trustname,
        dadabadis.websiteurl,
        dadabadis.socialmediaurl,
        dadabadis.email,
        dadabadis.pin,
        dadabadis.eventid,
        dadabadis.bhojanshala,
        dadabadis.dharmshala,
        dadabadis.contactnumber,
        dadabadis.maplink,
        dadabadis.image1,
        dadabadis.image2,
        dadabadis.state,
        dadabadis.city,
        dadabadis.description,
        dadabadis.address,
        dadabadis.contactname,
        dadabadis.moolnayakname,
        dadabadis.dadaguruname,
        dadabadis.published        
      FROM dadabadis
      WHERE dadabadis.id = ${id};
    `;

    const dadabadi = data.rows.map((dadabadi) => ({
      ...dadabadi,
      // Convert amount from cents to dollars
      //amount: invoice.amount / 100,
    }));

    return dadabadi[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch dadabadi.');
  }
}

export async function fetchDadabadis() {
  noStore();
  try {
    const data = await sql<DadabadiField>`
      SELECT
        id,
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
      FROM dadabadis
      ORDER BY title ASC
    `;
    const dadabadis = data.rows;
    return dadabadis;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all dadabadis.');
  }
}

export async function getDadabadi(email: string) {
  noStore();
  try {
    const dadabadi = await sql`SELECT * FROM dadabadis WHERE email=${email}`;
    return dadabadi.rows[0] as User;
  } catch (error) {
    console.error('Failed to fetch dadabadi:', error);
    throw new Error('Failed to fetch dadabadi.');
  }
}

export async function fetchIndiaStates() {
  noStore();
  try {
    const data = await sql<IndiaStatesField>`
      SELECT
        id,
        slno,
        abb,
        name,
        state
      FROM indiastates
      ORDER BY slno ASC
    `;
    const indiastates = data.rows;
    return indiastates;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all indiastates');
  }
}