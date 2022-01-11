const Method = artifacts.require('./Methods');
module.exports = function(deployer) {
  deployer.deploy(Method);
  // Use deployer to state migration tasks.
};
