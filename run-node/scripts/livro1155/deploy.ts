import { NonceManager } from "@ethersproject/experimental";
import { create } from "domain";
import { Wallet } from "ethers";
import { ethers } from "hardhat";
import { GasPriceManager } from "../../utils/GasPriceManager";
import { SplashERC1155 } from "../../typechain-types";
import { expect } from "chai";

async function main() {
  const SplashWorld = await ethers.getContractFactory("SplashERC1155");
  const provider = ethers.provider;

  const admin = new Wallet(process.env.ADMIN_KEY || "");
  const adminSigner = new NonceManager(new GasPriceManager(provider.getSigner(admin.address)));

  const splashWorld = await SplashWorld.connect(adminSigner).deploy("SplashWorldERC1155", "SP11");
  await splashWorld.deployed();

  console.log(`Lock with 1 ETH deployed to ${splashWorld.address}`);

  await splashWorld.connect(adminSigner).mint(10,"https://ipfs.io/ipfs/QmYJf3FmFPyZHo8MbbySs6CZLjYh3gGBtjVKt46wbX196h");
  console.log("NFT successfully minted");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
