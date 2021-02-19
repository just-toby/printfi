import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { WalletLinkConnector } from "@web3-react/walletlink-connector";
import { PortisConnector } from "@web3-react/portis-connector";
import { FortmaticConnector } from './Fortmatic'
import { TorusConnector } from '@web3-react/torus-connector';
import { AuthereumConnector } from '@web3-react/authereum-connector';

// import { BitskiConnector } from '@web3-wallets-kit/bitski-connector';

const RPC_URL_PREFIX = "https://mainnet.infura.io/v3/";
const INFURA_ID = process.env.NEXT_PUBLIC_REACT_APP_INFURA_ID;
const PORTIS_ID = process.env.NEXT_PUBLIC_REACT_APP_PORTIS_ID;
const FORMATIC_KEY = process.env.NEXT_PUBLIC_REACT_APP_FORTMATIC_KEY;
const BITSKI_KEY = process.env.NEXT_PUBLIC_BITSKI_KEY;
const AUTHEREUM_KEY = process.env.NEXT_PUBLIC_AUTHEREUM_KEY;

export const NETWORK_CHAIN_ID: number = parseInt(
  process.env.REACT_APP_CHAIN_ID ?? "1"
);

if (INFURA_ID == null) {
  throw new Error(
    `NEXT_PUBLIC_REACT_APP_INFURA_ID must be a defined environment variable`
  );
}

export const injected = new InjectedConnector({
  supportedChainIds: [1], // we only support mainnet
});

// export const bitski = new BitskiConnector({
//   clientId: BITSKI_KEY,
//   redirectUri: 'https://localhost:3000/bitski-callback.html',
// })

export const authereum = new AuthereumConnector({
  chainId: 1
})

// mainnet only
export const torus = new TorusConnector({
  chainId: 1
})

// mainnet only
export const fortmatic = new FortmaticConnector({
  apiKey: FORMATIC_KEY ?? '',
  chainId: 1
})

// mainnet only
export const walletconnect = new WalletConnectConnector({
  rpc: { 1: RPC_URL_PREFIX + INFURA_ID },
  bridge: "https://bridge.walletconnect.org",
  qrcode: true,
  pollingInterval: 15000,
});

// mainnet only
export const portis = new PortisConnector({
  dAppId: PORTIS_ID ?? "",
  networks: [1],
});

// mainnet only
export const walletlink = new WalletLinkConnector({
  url: RPC_URL_PREFIX + INFURA_ID,
  appName: "NiftyPrints.io",
});
