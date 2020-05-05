const mbHelper = require("../../mountebank-helper");
const ports = require("../../constants/ports");
const creditPeriodOptions = require("./creditPeriodOptions");

function addService() {
  return mbHelper.postImposter({
    port: ports.get_credit_period_list_service_port,
    protocol: "http",
    stubs: [
      {
        predicates: [
          {
            equals: {
              method: "GET",
              path: "/getCreditPeriod",
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
                data: creditPeriodOptions,
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
