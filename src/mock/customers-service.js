const mbHelper = require("../mountebank-helper");
const ports = require("../constants/ports");

function addService() {
  return mbHelper.postImposter({
    port: ports.customers_service_port,
    protocol: "http",
    stubs: [
      {
        predicates: [
          {
            and: [
              {
                equals: {
                  path: "/customers/123",
                  method: "POST",
                },
              },
            ],
          },
        ],
        responses: [
          {
            is: {
              statusCode: 201,
              headers: {
                Location: `http://localhost:${ports.customers_service_port}/customers/123`,
                "Content-Type": "application/xml",
              },
              body: "<customer><email>customer@test.com</email></customer>",
            },
          },
          {
            is: {
              statusCode: 400,
              headers: {
                "Content-Type": "application/xml",
              },
              body: "<error>email already exists</error>",
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
