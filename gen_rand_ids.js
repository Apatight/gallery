const Faker = require('faker');

// TO SIMULATE REAL-WORLD SCENARIO OF REQUESTING MULTIPLE IDS IN FIXED RANGE WITH ARTILLERY

function generateRandomData(userContext, events, done) {
  const id = Faker.random.number(50);

  userContext.vars.id = id;
  return done();
}

module.exports = {
  generateRandomData,
};
