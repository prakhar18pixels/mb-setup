const mbHelper = require("../mountebank-helper");
const ports = require("../constants/ports");

function addService() {
  const response = { message: "hello login" };

  return mbHelper.postImposter({
    port: ports.login_service_port,
    protocol: "http",
    stubs: [
      {
        predicates: [
          {
            equals: {
              method: "GET",
              path: "/",
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
              body: JSON.stringify(response),
            },
          },
        ],
      },
    ],
  });
}

module.exports = { addService };
