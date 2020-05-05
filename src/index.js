const mb = require("mountebank");
const settings = require("./settings");
const getStateListService = require("./mock/getStateService/getStateService");
const getCityListService = require("./mock/getCityService/getCityService");
const getMaterialTypeService = require("./mock/getMaterialType/getMaterialType");
const getPaymentTermsService = require("./mock/getPaymentTerms/getPaymentTerms");
const getCreditPeriodService = require("./mock/getCreditPeriod/getCreditPeriod");
const getPackageTypeService = require("./mock/getPackageType/getPackageType");
const createSpotBookingService = require("./mock/createSpotBookingService/createSpotBookingService");

// check http://www.mbtest.org/config
const mbServerInstance = mb.create({
  port: settings.port,
  pidfile: "../log/mb.pid",
  logfile: "../pid/mb.log",
  protofile: "../protofile/protofile.json",
  ipWhitelist: ["*"],
});

mbServerInstance.then(function () {
  getStateListService.addService();
  getCityListService.addService();
  getMaterialTypeService.addService();
  getPaymentTermsService.addService();
  getCreditPeriodService.addService();
  getPackageTypeService.addService();
  createSpotBookingService.addService();
});
