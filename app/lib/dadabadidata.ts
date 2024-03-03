import { unstable_noStore as noStore } from 'next/cache';
import { sql } from '@vercel/postgres';
import {
  User,
  DadabadiTable,
  LatestDadabadiRaw,
  DadabadiRawSEO,
  DadabadiForm 
} from './dadabadidefinitions';
import { formatCurrency } from './utils';
import { DadabadiField, IndiaStatesField } from '@/app/lib/dadabadidefinitions';

export async function fetchLatestDadabadis() {
  noStore();
  try {
    const data = await sql<LatestDadabadiRaw>`
      SELECT dadabadis.title, dadabadis.titlehin, dadabadis.image1, dadabadis.published, dadabadis.id
      FROM dadabadis      
      ORDER BY dadabadis.created_at DESC
      LIMIT 5`;

    const latestDadabadis = data.rows.map((dadabadi) => ({
      ...dadabadi,
      published: dadabadi.published,
    }));
    return latestDadabadis;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest Dadabadis.');
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

export async function fetchFilteredDadabadisPublished(
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
        dadabadis.published = 'published' AND
        (dadabadis.title ILIKE ${`%${query}%`} OR
        dadabadis.description ILIKE ${`%${query}%`} )
        
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;
    console.log("dadabadis.rows", dadabadis.rows);
    return dadabadis.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch dadabadis.');
  }
}

export async function fetchDadabadisPublishedPages(query: string) {
  noStore();
  try {
    const count = await sql`SELECT COUNT(*)
    FROM dadabadis    
    WHERE
    dadabadis.published = 'published' AND
    (dadabadis.city::text ILIKE ${`%${query}%`} OR
    dadabadis.title::text ILIKE ${`%${query}%`}   ) 
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    console.log("total published pages :", totalPages);
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

export async function fetchCardDataDadabadis() {
  noStore();
  try {
    // You can probably combine these into a single SQL query
    // However, we are intentionally splitting them to demonstrate
    // how to initialize multiple queries in parallel with JS.
    const dadabadiCountPromise = sql`SELECT COUNT(*) FROM dadabadis`;
    const pendingCountPromise = sql`SELECT COUNT(*) FROM dadabadis Where dadabadis.published ='notpublished'`;
    const totalUsersPromise = sql`SELECT
         SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
         SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
         FROM invoices`;

    const data = await Promise.all([
      dadabadiCountPromise,
      pendingCountPromise,
      totalUsersPromise,
    ]);

    const numberOfDadabadis = Number(data[0].rows[0].count ?? '0');
    const numberOfPublishPending = Number(data[1].rows[0].count ?? '0');
    const totalUsers = formatCurrency(data[2].rows[0].paid ?? '0');
    const totalEmails = formatCurrency(data[2].rows[0].pending ?? '0');

    return {      
      numberOfDadabadis,
      numberOfPublishPending,
      totalUsers,
      totalEmails,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

export async function fetchAllDadabadisSEO() {
  noStore();
  try {
    const data = await sql<DadabadiRawSEO>`
      SELECT dadabadis.title, dadabadis.created_at, dadabadis.image1, dadabadis.published, dadabadis.id
      FROM dadabadis`;

    const latestDadabadis = data.rows.map((dadabadi) => ({
      ...dadabadi,
      published: dadabadi.published,
    }));
    return latestDadabadis;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest Dadabadis SEO.');
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