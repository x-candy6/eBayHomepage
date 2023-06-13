const jquery = require('jquery');
const xml2js = require('xml2js')
const axios = require('axios');
 // Define API credentials and request parameters
const data = require("./config.json")
const app_id = data.KeySets.AppID;
const dev_id = data.KeySets.DevID;
const cert = data.KeySets.CertID;
const oauth = data.KeySets.OauthToken;

let res;
let price;
let category;
let categoryID;


const url = data.Endpoints.ebayAPI;
const itemID = 364219680836;
//console.log(url);
//dom = new DOMParser().parseFromString(xml, "text/xml")



function getItem(itemID){

  const requestBody = `
    <?xml version="1.0" encoding="utf-8"?>
    <GetItemRequest xmlns="urn:ebay:apis:eBLBaseComponents">
      <RequesterCredentials>
        <eBayAuthToken>${oauth}</eBayAuthToken>
      </RequesterCredentials>
      <ItemID>${itemID}</ItemID>
      <DetailLevel>ReturnAll</DetailLevel>
    </GetItemRequest>
  `;
  axios.post(url, requestBody, {
    headers: {
      'Content-Type': 'text/json',
      'X-EBAY-API-CALL-NAME': 'GetItem',
      'X-EBAY-API-SITEID': 0, // 0 is for the US site
      'X-EBAY-API-COMPATIBILITY-LEVEL': 1083,
    },
  })
  .then(response => {
    // console.log(response.data);
     xml2js.parseString(response.data, (err, result) => {
     if (err) {
       console.error("hi," ,err);
     } else {
        res = JSON.parse(JSON.stringify(result));
        price = parseFloat(res.GetItemResponse.Item[0]['ListingDetails'][0]['ConvertedStartPrice'][0]['_'][0]) + 0.99; // Okay this part is bad lol, After parsing and stringifying, the price is set to an integer(the first left most before the decimal), need to find a way to preserve the actual value instead of just adding .99
        categoryID = res.GetItemResponse.Item[0]['PrimaryCategory'][0]['CategoryID'][0];
        category = res.GetItemResponse.Item[0]['PrimaryCategory'][0]['CategoryName'][0].toString();
      //  console.log(res);
     }
   });
  })
  .catch(error => {
    // Handle errors here
    console.error('hi,' ,error);
  })
   // Wait for the axios promise to resolve before using myVariable
   return price, categoryID, category
} 
getItem(itemID);

setTimeout(() => {
  // console.log(res.GetItemResponse.Item[0]['PrimaryCategory'][0]['CategoryName'][0].toString());
  console.log(price, categoryID, category);
}, 1000);


