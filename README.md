# csv-json 

A JSON/CSV importer that reads a CSV file, converts it to JSON, uploads data to a Supabase PostgreSQL database, and prints an age distribution report.

---

## Features

- Read user data from CSV
- Convert CSV rows to JSON
- Import data into Supabase PostgreSQL
- Generate an age-group distribution report in the terminal
- Easy setup for local development

---

## Quick Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/priyanshis1303/kelp-csv.git
cd kelp-csv
```
2️⃣ Install dependencies
```bash
npm install
```
3️⃣ Create .env file

Copy the example file:
```bash
cp .env.example .env

```
Edit .env like this:
```env
PORT=3000
CSV_FILE_PATH=./uploads/users.csv

PG_HOST=your-pooler-host.supabase.com
PG_PORT=6543
PG_USER=postgres
PG_PASSWORD=yourpassword
PG_DATABASE=postgres
```
4️⃣ Add CSV file

Place your CSV file in the uploads/ folder:
```bash
uploads/users.csv
```

Example CSV headers:
```css
name.firstName,name.lastName,age,address.line1,address.line2,address.city,address.state,gender
```
5️⃣ Start the server
```bash
npm start

```
You should see:
```pgsql
 Server running on port 3000
 Table 'users' is ready.
```
6️⃣ Import CSV and view report

Run the import endpoint:
```bash
curl http://localhost:3000/import
```

JSON response:
```json
{"message":"Import and report completed successfully."}
```

Age distribution report prints in the terminal:
```matlab
 Age-Group % Distribution
<20    → 20.00%
20-40  → 40.00%
40-60  → 20.00%
>60    → 20.00%
```
