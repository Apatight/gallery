const fs = require('fs');
const photoRefs = require('./photoRefs.json');
const faker = require('faker');

// TO SEED DATA::
// mongoimport --db apateez-gallery --collection Places --file allData.json
// --jsonArray --numInsertionWorkers 10 | gnomon

// const entries10k = 10000;
// const entries100k = 100000;
// const entries1M = 1000000;
const entries10M = 10000000;

const buildEntry = (n) => {
  const photosArr = [];
  for (let i = 0; i < 5; i += 1) {
    photosArr.push(photoRefs[Math.floor(Math.random() * 1000)]);
  }
  const obj = {
    name: faker.company.companyName,
    place_id: n,
    photos: photosArr,
  };
  return obj;
};

const generateJSON = () => {
  const options = {
    autoClose: true,
  };

  const writeStream = fs.createWriteStream('allData.json', options);
  let i = 0;
  const write = () => {
    let ok = true;
    do {
      i += 1;
      if (i === 1) {
        writeStream.write(`[${JSON.stringify(buildEntry(i))},`);
      } else if (i === entries10M) {
        writeStream.write(`${JSON.stringify(buildEntry(i))}]`);
        console.log('10M entries in!');
      } else {
        ok = writeStream.write(`${JSON.stringify(buildEntry(i))},`);
      }
    } while (i < entries10M && ok);
    if (i < entries10M) {
      writeStream.once('drain', write);
    }
  };
  write();
};

generateJSON();
