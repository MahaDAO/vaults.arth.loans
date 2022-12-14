import {Contract, ethers} from "ethers";

import ERC20 from "./ERC20";
import ABIS from "./deployments/abi";
import {configKeys, Configuration} from "../utils/interface";
import {getDefaultProvider} from "../utils/provider";
import Web3 from "web3";

/**
 * An API module of ARTH contracts.
 * All contract-interacting domain logic should be defined in here.
 */
export class Protocol {
  // @ts-ignore
  myAccount: string;

  // @ts-ignore
  web3: Web3;

  _signer?: ethers.Signer;

  _config: {
    [chainId: number]: Configuration;
  };

  _contracts: {
    [chainId: number]: { [name: string]: Contract };
  };

  // @ts-ignore
  provider: ethers.providers.JsonRpcProvider;

  _tokens: {
    [chainId: number]: { [name: string]: ERC20 };
  };

  _activeNetwork: number;

  constructor(cfg: { [chainId: number]: Configuration }, chainId: number) {
    this._activeNetwork = chainId;
    this._contracts = {};
    this._tokens = {};
    this._tokens = {};

    try {
      for (const [chainIdString, config] of Object.entries(cfg)) {
        const chainId = Number(chainIdString);
        const {deployments} = config;
        this.provider = getDefaultProvider(config);
        const networkConfig: { [name: string]: Contract } = {};
        const tokens: { [name: string]: ERC20 } = {};

        for (const [name, deployment] of Object.entries(deployments)) {
          if (!deployment.abi) continue;
          //to push all erc20 tokens in tokens array
          if (cfg[chainId].supportedTokens.includes(name)) {
            tokens[name] = new ERC20(
              deployments[name].address,
              this.provider,
              name,
              cfg[chainId].decimalOverrides[name] || 18
            );
          }

          // to push all others as contracts
          networkConfig[name] = new Contract(
            deployment.address,
            ABIS[deployment.abi],
            this.provider
          );
        }
        this._contracts[chainId] = networkConfig;
        this._tokens[chainId] = tokens;
      }
    } catch (e) {
      console.log("Error in contracts mapping", e);
    }

    this._config = cfg;
  }

  get isUnlocked(): boolean {
    return !!this.myAccount;
  }

  /**
   * @param provider From an unlocked wallet. (e.g. Metamask)
   * @param account An address of unlocked wallet account.
   */
  unlockWallet(provider: any, account: string) {
    // @ts-ignore
    const newProvider = new ethers.providers.Web3Provider(provider);
    this.web3 = new Web3(provider);
    this.provider = newProvider;
    this._signer = newProvider.getSigner(0);
    this.myAccount = account;

    for (const [chainId, contracts] of Object.entries(this._contracts)) {
      for (const [name, contract] of Object.entries(contracts)) {
        this._contracts[Number(chainId)][name] = contract.connect(this._signer);
      }
    }

    for (const tokens of Object.values(this._tokens)) {
      for (const token of Object.values(tokens)) {
        if (token && token.address) token.connect(this._signer);
      }
    }
  }

  updateActiveNetwork(chainId: number, dispatch: any) {
    this._activeNetwork = chainId;
  }

  config(id: configKeys, chainId: number): any {
    return this._config[chainId][id];
  }

  getPriceFeed() {
    return this._contracts[this._activeNetwork][`ETHPriceFeed`];
  }

  getTroveManager() {
    return this._contracts[this._activeNetwork][`ETHTroveManager`];
  }

  getSortedTroves() {
    return this._contracts[this._activeNetwork][`ETHSortedTroves`];
  }

  getHintHelpers() {
    return this._contracts[this._activeNetwork][`ETHHintHelpers`];
  }

  getARTHETHTroveLpStrategy() {
    return this._contracts[this._activeNetwork][`ARTHETHTroveLpStrategy`];
  }

  getARTHUSDCCurveLpStrategy() {
    return this._contracts[this._activeNetwork][`ARTHUSDCCurveLPStrategy`];
  }

  getUniV3PositionManager() {
    return this._contracts[this._activeNetwork]["UniV3PositionManager"];
  }
}
