require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",
  paths: {
    sources: "contracts/contracts",      // где в сабмодуле лежат .sol-файлы
    artifacts: "artifacts",        // куда будет складывать ABI/bytecode
  },
  networks: {
    hardhat: {
      chainId: 1337,
    },
  },
};
