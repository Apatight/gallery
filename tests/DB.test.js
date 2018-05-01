const db = require('../database/list.js');

test('the data is an array', () => {
  expect.assertions(1);
  return db.find().then((data) => {
    expect(Array.isArray(data)).toBe(true);
  });
});

test('the photos data is an array of length 10', () => {
  expect.assertions(1);
  return db.findOne({'place_id': 'ChIJFUBxSY6AhYARwOaLV7TsLjw'}).then((data) => {
    expect(data.photos.length).toBe(10);
  });
});

test('the data has a place_id', () => {
  expect.assertions(1);
  return db.findOne({'place_id': 'ChIJFUBxSY6AhYARwOaLV7TsLjw'}).then(data => {
    expect(!!data.place_id).toBe(true);
  });
});

