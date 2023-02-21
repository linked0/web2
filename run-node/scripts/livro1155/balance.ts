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

  const receiver = new Wallet(process.env.USER_KEY || "");
  const receiverSigner = new NonceManager(new GasPriceManager(provider.getSigner(receiver.address)));

  const splashWorld = await SplashWorld.attach("0x24F797c42997DD2dfd6F4f362a8561c326c8cc69");
  
  console.log("Balance: ", await splashWorld.balanceOf(admin.address, 1));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
