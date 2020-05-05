const mbHelper = require("../../mountebank-helper");
const ports = require("../../constants/ports");
const stateList = require("./stateList");

function addService() {
  return mbHelper.postImposter({
    port: ports.get_state_list_service_port,
    protocol: "http",
    stubs: [
      {
        predicates: [
          {
            equals: {
              method: "GET",
              path: "/getStateList",
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
                data: stateList,
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
