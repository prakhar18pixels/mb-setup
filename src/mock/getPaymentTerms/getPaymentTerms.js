const mbHelper = require("../../mountebank-helper");
const ports = require("../../constants/ports");
const paymentTerms = require("./paymentTermsData");

function addService() {
  return mbHelper.postImposter({
    port: ports.get_payment_terms_list_service_port,
    protocol: "http",
    stubs: [
      {
        predicates: [
          {
            equals: {
              method: "GET",
              path: "/getPaymentTerms",
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
                data: paymentTerms,
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
