const { Pool } = require("pg");
const credentials = {
  user: "postgres",
  host: "localhost",
  database: "personal_budget",
  password: "test",
  port: 5432,
};

const db = new Pool(credentials);

const createEnvelope = `CREATE TABLE envelope (
                            id integer primary key,
                            title varchar(20),
                            budget integer
                        );`;

const createTransaction = `CREATE TABLE transactions (
                            id integer primary key,
                            date date,
                            description varchar(200),
                            payment_amount integer,
                            payment_recipient varchar(50),
                            envelope_id integer references envelope (id)
                          );`;

const insertTransaction = `INSERT INTO transactions (id, date, description, payment_amount, payment_recipient, envelope_id)
                          VALUES (1, '${new Date().getDay()}-${
  new Date().getMonth() + 1
}-${new Date().getFullYear()}', 'test', 2, 'test', 1);
                          `;

const insertValues = `INSERT INTO envelope (id, title, budget) 
                        VALUES (1, 'Rent', 1000);
                        INSERT INTO envelope (id, title, budget) 
                        VALUES (2, 'Groceries', 300);
                        INSERT INTO envelope (id, title, budget) 
                        VALUES (3, 'Entertainment', 400);`;

const selectAllEnvelopes = `SELECT * FROM envelope;`;
const setup = async () => {
  try {
    await db.query(createEnvelope);
    await db.query(createTransaction);
    await db.query(insertValues);
    await db.query(insertTransaction);
    let result = await db.query(selectAllEnvelopes);
    console.log(result.rows);
    console.log(`DB initialized successfully`);
  } catch (error) {
    console.log(`DB init failed`);
    // console.log(error);
  }
};

module.exports = { db, setup };
