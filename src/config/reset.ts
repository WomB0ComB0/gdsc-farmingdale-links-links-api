import { pool } from '../config/database.js';
import '../config/dotenv.js';
import links from '../data/data.js';

const createLinksTable = async (): Promise<void> => {
  const createTableQuery = `
    DROP TABLE IF EXISTS links;

    CREATE TABLE IF NOT EXISTS links (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      image VARCHAR(255) NOT NULL,
      link VARCHAR(255) NOT NULL,
      description VARCHAR(255) NOT NULL
    )
  `;

  try {
    await pool.query(createTableQuery);
    console.log('🎉 links table created successfully');
  } catch (err) {
    console.error('⚠️ error creating links table', err);
  }
};

const sendLinksTable = async () => {
  await createLinksTable();

  links.forEach((link) => {
    const insertQuery = {
      text: 'INSERT INTO links (name, image, link, description) VALUES ($1, $2, $3, $4) RETURNING *',
      values: [
        link.name,
        link.image,
        link.link,
        link.description,
      ],
    };

    try {
      pool.query(insertQuery, insertQuery.values, (err, res) => {
        if (err) {
          console.error(`⚠️ error inserting ${link.title}`, err);
        } else {
          console.log(`✅ ${link.title} added successfully`);
        }
      });
    } catch (err) {
      console.error('⚠️ error inserting gifts', err);
    }
  });
};

sendLinksTable();
