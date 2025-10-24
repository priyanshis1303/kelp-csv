
 // DB insertion and  reporting logic
 

import pool from "./db.js";

export async function uploadUsers(users) {
  const client = await pool.connect();
  try {
    for (const user of users) {
      const firstName = user.name?.firstName || "";
      const lastName = user.name?.lastName || "";
      const fullName = `${firstName} ${lastName}`.trim();
      const age = parseInt(user.age);
// Separate out known fields
      const { name, age: _, ...others } = user;
      const address = user.address || {};
      const additional_info = {};

// Move remaining fields (not name/age/address) to additional_info
      for (const key of Object.keys(others)) {
        if (key !== "address") {
          additional_info[key] = others[key];
        }
      }

      await client.query(
        `INSERT INTO users(name, age, address, additional_info)
         VALUES ($1, $2, $3, $4)`,
        [fullName, age, address, additional_info]
      );
    }
  } catch (err) {
    console.error("Error inserting users:", err);
    throw err;
  } finally {
    client.release();
  }
}

export async function reportAgeDistribution() {
  const { rows } = await pool.query("SELECT age FROM users");
  const ages = rows.map(r => r.age);
  const total = ages.length;

  const buckets = { "<20": 0, "20-40": 0, "40-60": 0, ">60": 0 };

for (const age of ages) {
if (age < 20) buckets["<20"]++;
else if (age <= 40) buckets["20-40"]++;
else if (age <= 60) buckets["40-60"]++;
else buckets[">60"]++;}

  console.log("\n Age group % distribution  ");
  for (const [group, count] of Object.entries(buckets)) {
    const percent = ((count / total) * 100).toFixed(2);
    console.log(`${group.padEnd(6)} → ${percent}%`);
}
}
