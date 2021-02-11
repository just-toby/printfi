import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Authereum from "authereum";
import React, { useCallback, useEffect, useState } from "react";
import Web3 from "web3";
import { Web3ModalConfig } from "../context/Web3ModalContext";

const useWeb3ModalContext: () => Web3ModalConfig = () => {
  // top level state that will be passed to the app via context in _app.tsx

  const [web3Modal, setWeb3Modal] = useState<Web3Modal>(null);
  const [web3, setWeb3] = useState(null);
  const [provider, setProvider] = useState(null);
  const [address, setAddress] = useState("");
  const [chainId, setChainId] = useState(0);
  const [networkId, setNetworkId] = useState(0);
  const [connected, setConnected] = useState(false);

  const connect = useCallback(() => {
    web3Modal.connect().then((provider) => {
      const web3: any = new Web3(provider);
      web3.eth.extend({
        methods: [
          {
            name: "chainId",
            call: "eth_chainId",
            outputFormatter: web3.utils.hexToNumber,
          },
        ],
      });
      setWeb3(web3);

      setupSubscriptions(provider);

      setProvider(provider);

      web3.eth.getAccounts().then((accounts) => {
        const address = accounts[0];
        setAddress(address);
      });
      web3.eth.net.getId().then((networkId: number) => {
        setNetworkId(networkId);
      });
      web3.eth.chainId().then((chainId: number) => {
        setChainId(chainId);
      });
    });
  }, [web3Modal]);

  const disconnect = useCallback(async () => {
    if (provider.close != null) {
      await provider.close();
    }
    // If the cached provider is not cleared,
    // WalletConnect will default to the existing session
    // and does not allow to re-scan the QR code with a new wallet.
    // Depending on your use case you may want or want not his behavir.
    await web3Modal.clearCachedProvider();
    setProvider(null);
    setAddress("");
    setChainId(null);
    setNetworkId(null);
    setConnected(false);
  }, [provider, web3Modal]);

  useEffect(() => {
    setConnected(address != null && address !== "");
  }, [address]);

  useEffect(() => {
    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          infuraId: process.env.NEXT_PUBLIC_REACT_APP_INFURA_ID,
        },
      },
      //   TODO: add once signed up for fortmatic
      //   fortmatic: {
      //     package: Fortmatic,
      //     options: {
      //       key: process.env.NEXT_PUBLIC_REACT_APP_FORTMATIC_KEY
      //     }
      //   },
      //   TODO: add once signed up for portis
      //   portis: {
      //     package: Portis,
      //     options: {
      //       id: process.env.NEXT_PUBLIC_REACT_APP_PORTIS_ID
      //     }
      //   },
      authereum: {
        package: Authereum,
        options: {},
      },
    };

    const web3Modal = new Web3Modal({
      network: "mainnet", // optional
      cacheProvider: true, // optional
      providerOptions, // required
    });

    setWeb3Modal(web3Modal);
  }, []);

  const setupSubscriptions = (provider) => {
    provider.on("disconnect", () => {
      window.location.href = "/";
    });
    provider.on("accountsChanged", async (accounts: string[]) => {
      setAddress(accounts[0]);
    });
    provider.on("chainChanged", async (chainId: number) => {
      const networkId = await web3.eth.net.getId();

      setChainId(chainId);
      setNetworkId(networkId);
    });

    provider.on("networkChanged", async (networkId: number) => {
      const chainId = await web3.eth.chainId();
      setChainId(chainId);
      setNetworkId(networkId);
    });
  };

  return {
    web3Modal,
    web3,
    address,
    networkId,
    chainId,
    connected,
    connect,
    disconnect,
  };
};

export { useWeb3ModalContext };
