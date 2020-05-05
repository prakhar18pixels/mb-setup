const mbHelper = require("../../mountebank-helper");
const ports = require("../../constants/ports");
const materialType = require("./materialTypeData");

function addService() {
  return mbHelper.postImposter({
    port: ports.get_material_list_service_port,
    protocol: "http",
    stubs: [
      {
        predicates: [
          {
            equals: {
              method: "GET",
              path: "/getMaterialType",
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
                data: materialType,
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
