const express = require("express");
const yelp = require("yelp-fusion");

const client = yelp.client(
  "n5Lu9bodOcuQeH8Da2eb9jQXrFPuGod2JolThN38ptNLbNVUiAiofO_zQDJLNMlzXIpfJ-AydhRVu391TAy2KC4Bztv1bJBxE1XsDmDCdQHzcr8Js8Xq5auT83kkYHYx"
);

let businessesData = [];

client
  .search({
    term: "Icecream",
    location: "Alpharetta",
    limit: 5,
  })
  .then((response) => {
    businessesData = [...response.jsonBody.businesses];
    // console.log(businessesData[0]);

    // Adding street and city
    businessesData.forEach(async (ele) => {
      await addr(ele);
      console.log("Name of Place: " + ele.name);
      console.log(ele.location.address1);
      console.log(ele.location.city);
      // Reviews for each parlor
      let arrReview = await review(ele);
      console.log(arrReview);
    });
  })
  .catch((e) => {
    console.log(e);
  });

async function addr(business) {
  let newBusi;
  await client
    .business(business.alias)
    .then((response) => {
      newBusi = response.jsonBody;
      return newBusi;
    })
    .catch((e) => {
      console.log(e);
    });
}

async function review(business) {
  await client
    .reviews(business.alias)
    .then((response) => {
      newBus = response.jsonBody.reviews;
      //console.log(newBus);
      return newBus;
    })
    .catch((e) => {
      console.log(e);
    });
}
