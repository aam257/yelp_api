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
    // Adding street and city
    businessesData.map(async (ele) => {
      // Reviews for each parlor
      let arrReview = await review(ele);
      arrReview.map((rev) => {
        console.log("Name of Place: " + ele.name);
        console.log(ele.location.address1);
        console.log(ele.location.city);
        console.log("---------------------------------------------");
        console.log("User Name: " + rev.user.name);
        console.log("Review: " + rev.text);
        console.log("*******************************************");
      });
    });
  })
  .catch((e) => {
    console.log(e);
  });

const review = async (business) => {
  let newBus = [];
  await client
    .reviews(business.alias)
    .then((response) => {
      newBus = response.jsonBody.reviews;
    })
    .catch((e) => {
      console.log(e);
    });

  return newBus;
};
