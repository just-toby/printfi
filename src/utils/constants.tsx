import { injected, portis, walletconnect, walletlink, fortmatic, torus, authereum} from "../connectors";
import { AbstractConnector } from "@web3-react/abstract-connector";
import { getAddress } from "@ethersproject/address";

export const NetworkContextName = "NETWORK";

export interface WalletInfo {
  connector?: AbstractConnector;
  name: string;
  iconName: string;
  description: string;
  href: string | null;
  color: string;
  primary?: true;
  mobile?: true;
  mobileOnly?: true;
}

// returns the checksummed address if the address is valid, otherwise returns false
export function isAddress(value: any): string | false {
  try {
    return getAddress(value);
  } catch {
    return false;
  }
}
// shorten the checksummed version of the input address to have 0x + 4 characters at start and end
export function shortenAddress(address: string, chars = 4): string {
  const parsed = isAddress(address);
  if (!parsed) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }
  return `${parsed.substring(0, chars + 2)}...${parsed.substring(42 - chars)}`;
}

export const SUPPORTED_WALLETS: { [key: string]: WalletInfo } = {
  METAMASK: {
    connector: injected,
    name: "MetaMask",
    iconName: "metamask.png",
    description: "Easy-to-use browser extension.",
    href: null,
    color: "#E8831D",
  },
  WALLET_CONNECT: {
    connector: walletconnect,
    name: "WalletConnect",
    iconName: "walletConnectIcon.svg",
    description: "Connect to Trust Wallet, Rainbow Wallet and more...",
    href: null,
    color: "#4196FC",
    mobile: true,
  },
  Portis: {
    connector: portis,
    name: "Portis",
    iconName: "portisIcon.png",
    description: "Login using Portis hosted wallet",
    href: null,
    color: "#4A6C9B",
    mobile: true,
  },
  WALLET_LINK: {
    connector: walletlink,
    name: "Coinbase Wallet",
    iconName: "coinbaseWalletIcon.svg",
    description: "Use Coinbase Wallet app on mobile device",
    href: null,
    color: "#315CF5",
  },
  FORTMATIC: {
    connector: fortmatic,
    name: 'Fortmatic',
    iconName: 'fortmaticIcon.png',
    description: 'Login using Fortmatic hosted wallet',
    href: null,
    color: '#6748FF',
    mobile: true
  },
  TORUS: {
    connector: torus,
    name: 'Torus',
    iconName: 'torus.jpg',
    description: 'Login using Torus hosted wallet',
    href: null,
    color: '#6748FF',
    mobile: true
  }, 
  AUTHEREUM: {
    connector: authereum,
    name: 'Authereum',
    iconName: 'authereum.png',
    description: 'Login using Authereum hosted wallet',
    href: null,
    color: '#6748FF',
    mobile: true
  }
};

export type SupportedCollectionSlugs =
  | "avastars"
  | "cryptopunks"
  | "art-blocks"
  | "hashmasks"
  | "axie"
  | "unknown";

// List of NFT contract addresses we support
export const WHITELIST = [
  `0xF3E778F839934fC819cFA1040AabaCeCBA01e049`.toLowerCase(), // avastars
  `0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB`.toLowerCase(), // crypto punks
  `0xa7d8d9ef8D8Ce8992Df33D8b8CF4Aebabd5bD270`.toLowerCase(), // art blocks
  `0xc2c747e0f7004f9e8817db2ca4997657a7746928`.toLowerCase(), // hash masks
  `0xF5b0A3eFB8e8E4c201e2A935F110eAaF3FFEcb8d`.toLowerCase(), // axies
];

export function getContractBySlug(slug: string | null) {
  switch (slug) {
    case "avastar":
      return WHITELIST[0];
    case "cryptopunks":
      return WHITELIST[1];
    case "art-blocks":
      return WHITELIST[2];
    case "hashmasks":
      return WHITELIST[3];
    case "axies":
      return WHITELIST[4];
    default:
      return null;
  }
}

// only defines the functions we need.
// you can read the whole contract here: https://etherscan.io/token/0xf3e778f839934fc819cfa1040aabacecba01e049
export const avastarContractAbi = [
  // Read-Only Functions
  "function renderAvastar(uint256 _tokenId) view returns (string)",
];
