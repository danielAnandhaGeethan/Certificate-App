const Certificates = artifacts.require("Certificates");
const Migrations = artifacts.require("Migrations");

module.exports = function (deployer) {
  deployer.deploy(Migrations).then((instance) => {
    console.log(`Migrations deployed at address: ${instance.address}`);
  });

  deployer.deploy(Certificates).then((instance) => {
    console.log(`Certificates deployed at address: ${instance.address}`);
  });
};
