const mbHelper = require("../../mountebank-helper");
const ports = require("../../constants/ports");
const cityList = require("./cityList");

function addService() {
  return mbHelper.postImposter({
    port: ports.get_city_list_service_port,
    protocol: "http",
    stubs: [
      {
        predicates: [
          {
            method: "GET",
            path: "/getCityList",
            equals: {
              query: {
                stateId: "c3hocu89",
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
                status: "success",
                data: cityList,
              }),
            },
          },
        ],
      },
      {
        predicates: [
          {
            method: "GET",
            path: "/getCityList",
            not: {
              equals: {
                query: {
                  stateId: "c3hocu89",
                },
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
                message: "Invalid state ID",
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
