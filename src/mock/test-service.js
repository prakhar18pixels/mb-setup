const mbHelper = require("../mountebank-helper");
const ports = require("../constants/ports");

function addService() {
  return mbHelper.postImposter({
    port: ports.test_service_port,
    protocol: "http",
    stubs: [
      {
        predicates: [
          {
            and: [
              {
                equals: {
                  path: "/test",
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                },
              },
              {
                not: {
                  contains: { body: "requiredField" },
                  caseSensitive: true,
                },
              },
            ],
          },
        ],
        responses: [
          {
            is: {
              statusCode: 400,
            },
          },
        ],
      },
    ],
  });
}

module.exports = { addService };
