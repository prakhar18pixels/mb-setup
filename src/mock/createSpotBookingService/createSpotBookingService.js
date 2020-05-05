const mbHelper = require("../../mountebank-helper");
const ports = require("../../constants/ports");
const requestBody = require("./spotBookingRequestBody");

function addService() {
  return mbHelper.postImposter({
    port: ports.create_spot_booking_service_port,
    protocol: "http",
    stubs: [
      {
        predicates: [
          {
            method: "POST",
            path: "/createSpotBooking",
            deepEquals: {
              body: JSON.stringify(requestBody),
            },
          },
        ],
        responses: [
          {
            is: {
              statusCode: 200,
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                status: "success",
                message: "Spot Booking successfully created",
                data: {
                  bookingId: "2176396591",
                },
              }),
            },
          },
        ],
      },
      {
        predicates: [
          {
            method: "POST",
            path: "/createSpotBooking",
            not: {
              deepEquals: {
                body: JSON.stringify(requestBody),
              },
            },
          },
        ],
        responses: [
          {
            is: {
              statusCode: 200,
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                status: "fail",
                message:
                  "Spot Booking could not be created. Invalid or missing data",
              }),
            },
          },
        ],
      },
      {
        responses: [
          {
            is: { statusCode: 404 },
          },
        ],
      },
    ],
  });
}

module.exports = { addService };
