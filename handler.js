"use strict";

const orderManager = require("./orderManager");

function createResponse(statusCode, message) {
  const response = {
    statusCode: statusCode,
    body: JSON.stringify(message),
  };

  return response;
}

module.exports.createOrder = async (event) => {
  const body = JSON.parse(event.body);
  const order = orderManager.createOrder(body);
  // try {
  //   const placedOrder = await orderManager.placeNewOrder(order);
  //   return createResponse(200, placedOrder);
  // } catch (e) {
  //   return createResponse(400, e);
  // }

  return orderManager
    .placeNewOrder(order)
    .then(() => {
      return createResponse(200, order);
    })
    .catch((error) => {
      return createResponse(400, error);
    });
};
