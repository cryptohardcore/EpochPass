// src/eth.ts
import { ethers } from "ethers";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "./contracts";

let provider: ethers.providers.Web3Provider;
let contract: ethers.Contract;

export async function initEthereum() {
  if (!window.ethereum) {
    throw new Error("MetaMask not installed");
  }
  provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();
  contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
}

export function getContract() {
  if (!contract) throw new Error("Call initEthereum() first");
  return contract;
}
