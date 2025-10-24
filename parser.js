
 //Custom CSV to JSON parser with no external CSV libs


import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

export function parseCSV() {
const path = process.env.CSV_FILE_PATH;
if (!fs.existsSync(path)) {
throw new Error(`CSV file not found at: ${path}`);
  }

// const data = fs.readFileSync(path, 'utf8').trim()
// const lines = data.split('\n')
// const headers = lines[0].split(',').map(h => h .trim()) // small spacing mistake
// const result = lines.slice(1).map(r => {
//   let obj = {}
//   const vals = r.split(',').map(v => v.trim())
//   headers.forEach((h, i) => {
//     if(h.includes('.')){
//       const parts = h.split('.')
//       let temp = obj
//       for(let j=0;j<parts.length-1;j++){
//         if(!temp[parts[j]]) temp[parts[j]] = {}
//         temp = temp[parts[j]]
//       }
//       temp[parts[parts.length-1]] = vals[i] || ''
//     } else obj[h] = vals[i]
//   })
//   return obj
// })

//here

  const data = fs.readFileSync(path, "utf-8").trim();
  const [headerLine, ...rows] = data.split("\n").map(line => line.trim());

  const headers = headerLine.split(",").map(h => h.trim());

const result = rows.map(row => {
const values = row.split(",").map(v => v.trim());
const obj = {};

 headers.forEach((header, i) => {
const value = values[i];
if (!header) return;

    if (header.includes(".")) {
    const parts = header.split(".");
    let temp = obj;
    for (let j = 0; j < parts.length - 1; j++) {
     const part = parts[j];
    if (!temp[part]) temp[part] = {};
     temp = temp[part];
        }
     temp[parts[parts.length - 1]] = value;
      } else {
  obj[header] = value;
      }
    });

    return obj;
  });
return result;}
