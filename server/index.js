const express = require('express');
var path = require('path');
var fs = require('fs');
const bodyParser = require('body-parser');
var requestImg = require('request').defaults({ encoding: null })
const url = require('url');

const list = require('../database/list.js');

const app = express();
const PORT = 3002;
app.use(function(req, res, next) {
 res.header("Access-Control-Allow-Origin", "*");
 res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
 next();
})
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/restaurants/', express.static(__dirname + '/../client/dist'));

app.get('/restaurants/:id', function(req , res){
 res.sendFile(path.join(__dirname + '/../client/dist/index.html'));
})

app.get('/api/restaurants/:id/gallery', function(req , res){

  
  var query = list.findOne({"place_id": req.params.id});
  
  query.exec(function(err, photos){

  	if(err){
  		console.log(err);
  	} else{
  		//console.log(photos.photos);
  		var s3String = "//s3-us-west-1.amazonaws.com/apateezgallery93/"
  		//res.send(photos.photos);
  		//photos = Array.prototype.slice.call(photos);
  		var restaurantPhotosArray = [];
  		//console.log(Array.isArray(photos.photos));
  		//console.log(photos.photos[0].photo_reference);
      if(!photos){//error handling
          photos = {
  
  "name" : "Fairmont San Francisco",
  "place_id" : "ChIJN2S4EI2AhYAR9J4Qeh1U8Aw",
  "photos" : [
    {
      "width" : 2048,
      "photo_reference" : "CmRaAAAAHpIYMDOkQq4zm-xWjTVuKRIlwm49BU8wz-FF2Bu72sWsUOsqbaTJW7FTET5idsuhdapGEIdvd9TVwauEXV7HUedVuGnDkvELdJKYSdTikc3L2Kdyp3MChkGmqlniMAd4EhCBH-nug0MZMzZ74uknWEbNGhRBTD2WreCT7AR0ORBK9UCHJ41SNQ",
      "html_attributions" : [
        "<a href=\"https://maps.google.com/maps/contrib/114386282276154448100/photos\">Hotel Fairmont</a>"
      ],
      "height" : 1365
    },
    {
      "width" : 4032,
      "photo_reference" : "CmRaAAAAayLkKitg0UFy9SItFeb7uVu61X0BC8qEbj1CTF3qjVulj__iAOA3ItHhU3R-kRObTdNRJGD6QKTnKPCgSb42CDIMVH-DOOtJ69mCQRmoTZFNs5rOvFceBGeOqLHvO8XWEhBBoVXaW_1ya_G_BEsGnz9TGhTYU3X5GrxPQ415EtrsWJzsRZdpCQ",
      "html_attributions" : [
        "<a href=\"https://maps.google.com/maps/contrib/117638458218556276250/photos\">Mainon Schwartz</a>"
      ],
      "height" : 3024
    },
    {
      "width" : 5344,
      "photo_reference" : "CmRaAAAAXOio0AO0t1ZleESbp9B6DB7JqGxXjUUIHTSdiSS8oYVtLNknPM7ElGb0KLZKkREcDnARBiFzvl51Bc3xKY5XJaQ9SCoSEBdiaytqeHc3yaFRspC96bwe85CkCBpPUf3-EhDrQlhUBhEHlT1lPwNozV4gGhRon1DwZn07FRtcbbqRsZ2REwdAMQ",
      "html_attributions" : [
        "<a href=\"https://maps.google.com/maps/contrib/102366242636347936215/photos\">Joseph Wang</a>"
      ],
      "height" : 3006
    },
    {
      "width" : 4032,
      "photo_reference" : "CmRaAAAAZOQsUIiJBrt8eEJtC8J7_A6fFNWFU1nqzvqvvQF4TNUeGf-kbcTE6jQZQNuSJU4iAQtRdSCHeQUwKCdhDTMbvFG5xmKUm5-vp3cbxc8leKeaxVYdFJTkF9F34JzwmpByEhA-1_v-QrjmeGDz0HGiKZxaGhT3tT3ca-0Hs4PFvXnq-fg9WsY3bA",
      "html_attributions" : [
        "<a href=\"https://maps.google.com/maps/contrib/116114972696185408058/photos\">Chris Carini</a>"
      ],
      "height" : 3024
    },
    {
      "width" : 3000,
      "photo_reference" : "CmRaAAAAUtbAEzinOYmD8fDeYu4K2vddYT7tsmRLU5eV7g5-tGAXP370U2pAPsWpyQCn5_qYKRIgSqmtFrLYEcrfZJaVIYXwJZTTVYbOBwS35VgkzUUh16L9MmOldjMphUb4va8qEhD4JhXgWWinkz2YBh6kaJhzGhSiwYWDtLSZCz6Qcz0H7Ru8Umz4tQ",
      "html_attributions" : [
        "<a href=\"https://maps.google.com/maps/contrib/114386282276154448100/photos\">Hotel Fairmont</a>"
      ],
      "height" : 2242
    },
    {
      "width" : 3000,
      "photo_reference" : "CmRaAAAASolIiU1CyxFoKfLNEYDckWiKfaMT_l3kH0hBhsVQIUFMvBgLHDJOg7XqHj6COtNdapmqE_Z01V3yEyLjUNf6ghwSaH8gTmAbiAKamWTvSwR04OszbFHtIgiMfdf8N_fpEhAeMHPx-HAD8Xwf8grYkfPgGhQ0S-4_FnKlyQqHszEx3S5blIvbxw",
      "html_attributions" : [
        "<a href=\"https://maps.google.com/maps/contrib/114386282276154448100/photos\">Hotel Fairmont</a>"
      ],
      "height" : 1600
    },
    {
      "width" : 2000,
      "photo_reference" : "CmRaAAAAErM6FwdkuFb1EZHpLDq0YclNWmffxSNGU3jU3z9kruwAbpEVYKV9o4t1p8ujoTim3jiqXWk_I50BbgEEwJ7nmbfrAb2TDyPn1KqlZVYB5A7rtR-IaiXkAfbxi9UMC-vmEhDkMAoCc_r16EMzuX8UY2KAGhSrrOOaU6xFSelJeW2SAHl7TQ-whg",
      "html_attributions" : [
        "<a href=\"https://maps.google.com/maps/contrib/114386282276154448100/photos\">Hotel Fairmont</a>"
      ],
      "height" : 3000
    },
    {
      "width" : 5616,
      "photo_reference" : "CmRaAAAAAjkd8nIeglXc9x6nggSYv_A7HP87ILdRTrr_hPBMSUt2j1bai4R1wMH0QJ1NGqCxE3624zFaLxou4W1hfqZtYdWfKic41aoFpDfitzB0yEQB4QIfrPq9bped4cR5q8_EEhB_TQeKqVzyX6rJupgymJUOGhSV-xtQIM0wDGPAcm4af0gogHJtPQ",
      "html_attributions" : [
        "<a href=\"https://maps.google.com/maps/contrib/100440572511157584840/photos\">Jean Saint Aubin</a>"
      ],
      "height" : 3744
    },
    {
      "width" : 2448,
      "photo_reference" : "CmRaAAAA77BcL8HNKZcrBgMjwVDSIcDmGFQN5ioRORxjcmNu-LSeAWnX1U3t44ybrQsdn2jLt6Qp-HsFnfJDR5ArVCCOP-xDuTFCq3pmGrEd1xH5oZoi0MFfyPAmzHgW3qSrXR76EhBJTwhI0LHw9vzEcQfCvkskGhQeFatbdmYF3py5nVUNGo42yQwcAw",
      "html_attributions" : [
        "<a href=\"https://maps.google.com/maps/contrib/101016695002859200662/photos\">Rasmus Himmelstrup</a>"
      ],
      "height" : 3264
    },
    {
      "width" : 4608,
      "photo_reference" : "CmRaAAAAwXXGr3zw7jl6Q6y0BnF03OLCcOgCY0wrIoXiUlIR_BNt9NNCRToyKjkzebDdQJZbrDD2qyJ1XcHfgC-Te82xboK1FsEznet-P746sS5f_EkqB8XgjxjGEAFQxtneMF9zEhCxwDugdsdVu1sz7pmTeF2mGhRxvIyn3wzLO2gv4iZyiQaF5tX8qQ",
      "html_attributions" : [
        "<a href=\"https://maps.google.com/maps/contrib/106088076277451349310/photos\">Miguel Gomez</a>"
      ],
      "height" : 3456
    }
  ],
  "__v" : 0
}

      }
  		for (var i = 0; i < photos.photos.length; i++ ){
  		  var s3String = "//s3-us-west-1.amazonaws.com/apateezgallery93/"+ photos.photos[i].photo_reference +	".png";
          //console.log(s3String);
          restaurantPhotosArray.push(s3String); 
  		}
      
  		res.send({photoArray: restaurantPhotosArray, restaurantName: photos.name, place_id: photos.place_id});
      
  	}
  })

});
app.get('/:searchValue', function(req , res){
  var searchQuery = req.params.searchValue;
  var recursefindPlaceId = function(searchQuery){

    var query = list.findOne({"name": { "$regex": searchQuery, "$options": "i" }});
    query.exec(function(err, photos){
        if(err){
          console.log(err);
        } else{
          if(photos){
            res.send({place_id: photos.place_id});
          } else{
            searchQuery = searchQuery.slice(0, -1)
            recursefindPlaceId(searchQuery);
          }
        }
    }); 
    
  }
  recursefindPlaceId(searchQuery);
});


app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
