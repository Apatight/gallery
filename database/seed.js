const db  = require('./index.js');
const list = require('./list.js')
var fullList = require('./fullList.json');
var newList =[];
for (var i = 0; i < 100; i++){
	newList.push(fullList[i]["result"]);
}

const insertfullList = function() {
  list.create(newList)
    .then(() => db.disconnect());
};

insertfullList();

