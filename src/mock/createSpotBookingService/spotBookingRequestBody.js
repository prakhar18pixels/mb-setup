const unixTimestamp = 1588652733;
const materialTypeId = "fmcd";
const paymentTermsId = "2adv100";
const creditPeriodId = "7days";
const sackId = "sackID";
const drumsId = "drumsID";
const noOfPackage = 2;
const truckType = "Lck Open Type - 700";
const noOfTruck = 2;
const pricePerTruck = 5000;
const length = 200;
const width = 10;
const height = 150;
const weight = 200;

const spotBookingRequestBody = {
  loadingUnloadingPointDetails: [
    {
      pickupPoint: {
        area: "address",
        city: "Lucknow",
        state: "Uttar Pradesh",
        pincode: 226001,
      },
      dropPoint: {
        area: "address",
        city: "Lucknow",
        state: "Uttar Pradesh",
        pincode: 226001,
      },
    },
  ],
  placementDate: unixTimestamp,
  materialType: materialTypeId,
  paymentTerms: paymentTermsId,
  creditPeriod: creditPeriodId,
  packageDetails: [
    {
      packageType: [sackId, drumsId],
      dimensions: {
        Length: { value: length, unit: "in" },
        Width: { value: width, unit: "ft" },
        Height: { value: height, unit: "in" },
        Weight: { value: weight, unit: "kgs" },
      },
      noOfPackage: noOfPackage,
      truckType: truckType,
      noOfTruck: noOfTruck,
      pricePerTruck: pricePerTruck,
    },
  ],
  isHazardousMaterials: true,
  loadingRequired: true,
  unloadingRequired: true,
};

module.exports = spotBookingRequestBody;
