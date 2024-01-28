const { db } = require('@vercel/postgres');
const {
  states
} = require('../app/lib/placeholder-data-states.js');

async function seedStates(client) {
  try {    

    // Insert data into the "states" table
    const insertedStates = await Promise.all(
      states.map(
        (state) => client.sql`
        
        INSERT INTO indiastates (slno, abb, name, state)
        VALUES (${state.slno}, ${state.abb}, ${state.name}, ${state.state})
        ON CONFLICT (id) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedStates.length} states`);

    return {      
      states: insertedStates,
    };
  } catch (error) {
    console.error('Error seeding states:', error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();  
  await seedStates(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});
