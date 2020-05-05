const mbHelper = require("../../mountebank-helper");
const ports = require("../../constants/ports");
const packageTypeOptions = require("./packageTypeOptions");

function addService() {
  return mbHelper.postImposter({
    port: ports.get_package_type_list_service_port,
    protocol: "http",
    stubs: [
      {
        predicates: [
          {
            equals: {
              method: "GET",
              path: "/getPackageType",
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
                data: packageTypeOptions,
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
