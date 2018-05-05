// const { MongoClient } = require('mongodb');
// const assert = require('assert');


const fs = require('fs');
const data = require('./195-Zagat-AllData.json');

// run 'node getPhotoRefs.js' to create photo ref JSON file'
const createPhotoArr = (json) => {
  const photosArr = [];
  json.forEach((place) => {
    if (place.result.photos) {
      place.result.photos.forEach((photo) => {
        photosArr.push(photo.photo_reference);
      });
    }
  });
  return photosArr;
};

fs.appendFileSync('./photoRefs.json', JSON.stringify(createPhotoArr(data)), (err) => {
  if (err) throw err;
  console.log('Photo refs inserted');
});


// const createPhotoArr = () => {
//   for (var i = 0; i < 1000; i++){
//     let flikrUrl = `https://loremflickr.com/320/240/food?lock=${i+1};`
//     storePhotos.push(flikrUrl);
//   }
// };
// createPhotoArr();

// const seedDb = () => {
//   for (let i = 0; i < 10000; i++) {
//     let places = [];
//     for (let l = 0; l < 1000; l++) {
//       let obj = {
//         place_id: i,
//         photos: []
//       }
//       for (let k = i; k < (i+10); k++) {
//         let photoInd = k % 1000;
//         obj.photos.push(storePhotos[photoInd]);
//       }
//       places.push(obj);
//     }
//   }
// };

// seedDb();


// const seedDb = () => {
//   for (let i = 0; i < 10000000; i++) {
//     console.log(i, " inserted to db")
//     let obj = {
//       place_id: i,
//       photos: []
//     }
//     for (let k = i; k < (i+10); k++) {
//       let photoInd = k % 1000;
//       obj.photos.push(storePhotos[photoInd]);
//     }
//     objSON.push(obj);
//   }
// console.log('Entry #: ', entry)
// if (entry === entries) {
//   mongoose.connection.close();
//   return;
// }
// create obj
// let obj = {
//   place_id: entry,
//   photos: []
// }
// in photos array, make sure next ten photos don't run past last index
// i.e. loop thru photo array again
// for (let i = entry; i < (entry+10); i++) {
//   let photoInd = entry % 1000;
//   obj.photos.push(storePhotos[photoInd]);
// }
// insert 10 photos into obj
// ApateezPhotos.create(obj, (err, place) => {
//   if (err) console.log(err);
// });
// seedDb(entry++);
// };

// fs.writeFile('data.json', JSON.stringify(objSON), 'utf8', () => {
//   db.inser
// });

// seedDb();

