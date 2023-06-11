const $ = require('jquery');
 // Define API credentials and request parameters
 const app_id = "AndrewC-pokemonw-PRD-a1c66d072-1e0cc2f5";
 const dev_id = "70b73b90-5798-4d89-b0fa-d5136ff8b0e5";
 const cert = "PRD-1c66d07233aa-5b0b-42c1-b602-41e9";
 const token = "v^1.1#i^1#r^1#f^0#I^3#p^3#t^Ul4xMF8wOjA2QkNFRkJFNDY1RUY4ODc1MUUwM0FBODQ0ODQ1NkU5XzNfMSNFXjI2MA==";
 const url = "https://api.ebay.com/wsapi";
 const xml = `<GetOrdersRequest xmlns="urn:ebay:apis:eBLBaseComponents">
   <RequesterCredentials>
     <eBayAuthToken>${token}</eBayAuthToken>
   </RequesterCredentials>
   <CreateTimeFrom>2022-01-01T00:00:00.000Z</CreateTimeFrom>
   <CreateTimeTo>2022-01-31T23:59:59.000Z</CreateTimeTo>
   <OrderStatus>Active</OrderStatus>
 </GetOrdersRequest>`;

 // Send SOAP request using AJAX
$.ajax({
   url: url,
   type: "POST",
   data: xml,
   headers: {
     "X-EBAY-API-APP-ID": app_id,
     "X-EBAY-API-DEV-NAME": dev_id,
     "X-EBAY-API-CERT-NAME": cert,
     "X-EBAY-API-SITEID": 0, // USA
     "X-EBAY-API-COMPATIBILITY-LEVEL": 1081.0,
     "Content-Type": "text/xml"
   },
   success: function(response) {
     // Parse XML response and retrieve order information
     const orders = $(response).find("Order");
     const numOrders = orders.length;
     console.log(`You have ${numOrders} orders that need to be shipped.`);
   },
   error: function(xhr, status, error) {
     console.error(`Error: ${error}`);
   }
 });