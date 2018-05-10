const fs = require('fs');
const faker = require('faker');

/*
TO SEED DATA IN MONGO:
  mongoimport --db apateez-gallery --collection Places --file allData.json
  --jsonArray --numInsertionWorkers 10 | gnomon

TO SEED DATA IN POSTGRES FROM WITHIN apateez DB:
  \copy gallery ("place_id", "name", "photos")
  FROM '/Users/Pooja_Kodavanti/Desktop/HR-SDC/gallery/database/allData.csv'
  DELIMITER ',' CSV HEADER;
*/

// Specify command line arguments
const args = process.argv.slice(2);
const genJSON = args.includes('--json'); // if included in bash script, create json
const numEntries = args.find(item => /\b\d+\b/.test(item)) || 10; // if there is num in bash script, use as entry val
const PHOTO_COUNT = 992;

const genRandPhotos = () => Array(10).fill(0).map(() => Math.floor(Math.random() * PHOTO_COUNT));

const buildEntryJSON = (id) => {
  const obj = {
    place_id: id,
    name: `${faker.company.companyName()}`,
    photos: genRandPhotos(),
  };
  return JSON.stringify(obj);
};

const buildEntryCSV = id => `${id},"${faker.company.companyName()}","{${genRandPhotos()}}"\n`;

const generateData = () => {
  const options = {
    autoClose: true,
  };
  const writeStream = genJSON ? fs.createWriteStream('allData.json', options) : fs.createWriteStream('allData.csv', options);
  let i = 0;
  const write = () => {
    let ok = true;
    do {
      i += 1;
      if (i === 1) {
        writeStream.write(genJSON ? `[${buildEntryJSON(i)},` : `${buildEntryCSV(i)}`);
      } else if (i === numEntries) {
        writeStream.write(genJSON ? `${buildEntryJSON(i)}]` : `${buildEntryCSV(i)}`);
      } else {
        ok = writeStream.write(genJSON ? `${buildEntryJSON(i)},` : `${buildEntryCSV(i)}`);
      }
    } while (i < numEntries && ok);
    if (i < numEntries) {
      writeStream.once('drain', write);
    }
  };
  write();
};

generateData();

// async function seedDB() {
//   let counter = 1;
//   for (let j = 0; j < 10000; j += 1) {
//     const seedArr = [];
//     for (let i = 0; i < 1000; i += 1) {
//       const photosArr = [];
//       for (let l = 0; l < 5; l += 1) {
//         photosArr.push(photoRefs[Math.floor(Math.random() * 1000)]);
//       }
//       const obj = {
//         name: faker.company.companyName,
//         place_id: counter,
//         photos: photosArr,
//       };
//       seedArr.push(obj);
//       counter += 1;
//     }
//     await ApateezPhotos.places.insertMany(seedArr);
//   }
// }

// seedDB();
