import { useWeb3React, UnsupportedChainIdError } from "@web3-react/core";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { SUPPORTED_WALLETS } from "../../utils/constants";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import Option from "./Option";
import { ExternalLink } from "../theme";
import Modal from "../Modal";
import { AbstractConnector } from "@web3-react/abstract-connector";
import { InjectedConnector } from "@web3-react/injected-connector";
import { injected, portis } from "../../connectors";
import { isMobile } from "react-device-detect";
import usePrevious from "../../hooks/usePrevious";

const CloseIcon = styled.div`
  position: absolute;
  right: 1rem;
  top: 14px;
  &:hover {
    cursor: pointer;
    opacity: 0.6;
  }
`;
const OptionGrid = styled.div`
  display: grid;
  grid-gap: 10px;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    grid-template-columns: 1fr;
    grid-gap: 10px;
  `};
`;

const Wrapper = styled.div`
  ${({ theme }) => theme.flexColumnNoWrap}
  margin: 0;
  padding: 0;
  width: 100%;
`;
const HeaderRow = styled.div`
  ${({ theme }) => theme.flexRowNoWrap};
  padding: 1rem 1rem;
  font-weight: 500;
  color: ${(props) =>
    props.color === "blue" ? ({ theme }) => theme.primary1 : "inherit"};
  ${({ theme }) => theme.mediaWidth.upToMedium`
    padding: 1rem;
  `};
`;
const ContentWrapper = styled.div`
  background-color: ${({ theme }) => theme.bg2};
  padding: 2rem;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;

  ${({ theme }) => theme.mediaWidth.upToMedium`padding: 1rem`};
`;

const UpperSection = styled.div`
  position: relative;

  h5 {
    margin: 0;
    margin-bottom: 0.5rem;
    font-size: 1rem;
    font-weight: 400;
  }

  h5:last-child {
    margin-bottom: 0px;
  }

  h4 {
    margin-top: 0;
    font-weight: 500;
  }
`;

const Blurb = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 2rem;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    margin: 1rem;
    font-size: 12px;
  `};
`;

const HoverText = styled.div`
  :hover {
    cursor: pointer;
  }
`;

const WALLET_VIEWS = {
  OPTIONS: "options",
  OPTIONS_SECONDARY: "options_secondary",
  ACCOUNT: "account",
  PENDING: "pending",
};

const HeaderText = styled.div`
  ${({ theme }) => theme.flexRowNoWrap};
  color: ${(props) =>
    props.color === "blue"
      ? ({ theme }) => theme.primary1
      : ({ theme }) => theme.text1};
  font-size: 1rem;
  font-weight: 500;
`;

export const injectedConnector = new InjectedConnector({
  supportedChainIds: [1],
});

export default function WalletModal(props) {
  // important that these are destructed from the account-specific web3-react context
  const { account, connector, activate, active } = useWeb3React();
  const { walletDropdown, toggleWalletDropdown } = props;
  const previousAccount = usePrevious(account);

  // close on connection, when logged out before
  useEffect(() => {
    if (account && !previousAccount && walletDropdown) {
      toggleWalletDropdown();
    }
  }, [account, previousAccount, toggleWalletDropdown, walletDropdown]);

  const tryActivation = async (connector: AbstractConnector | undefined) => {
    let name = "";

    Object.keys(SUPPORTED_WALLETS).map((key) => {
      if (connector === SUPPORTED_WALLETS[key].connector) {
        return (name = SUPPORTED_WALLETS[key].name);
      }
      return true;
    });

    // if the connector is walletconnect and the user has already tried to connect, manually reset the connector
    if (
      connector instanceof WalletConnectConnector &&
      connector.walletConnectProvider?.wc?.uri
    ) {
      connector.walletConnectProvider = undefined;
    }

    connector &&
      activate(connector, undefined, true).catch((error) => {
        if (error instanceof UnsupportedChainIdError) {
          activate(connector); // a little janky...can't use setError because the connector isn't set
        } else {
        }
      });
  };

  // get wallets user can switch too, depending on device/browser
  function getOptions() {
    const isMetamask = window.ethereum && window.ethereum.isMetaMask;
    return Object.keys(SUPPORTED_WALLETS).map((key) => {
      const option = SUPPORTED_WALLETS[key];

      // check for mobile options
      if (isMobile) {
        //disable portis on mobile for now
        if (option.connector === portis) {
          return null;
        }

        if (!window.web3 && !window.ethereum && option.mobile) {
          return (
            <Option
              onClick={() => {
                option.connector !== connector &&
                  !option.href &&
                  tryActivation(option.connector);
              }}
              id={`connect-${key}`}
              key={key}
              active={option.connector === connector}
              color={option.color}
              link={option.href}
              header={option.name}
              subheader={null}
              icon={option.iconName}
            />
          );
        }
        return null;
      }

      // overwrite injected when needed
      if (option.connector === injected) {
        // don't show injected if there's no injected provider
        if (!(window.web3 || window.ethereum)) {
          if (option.name === "MetaMask") {
            return (
              <Option
                id={`connect-${key}`}
                key={key}
                color={"#E8831D"}
                header={"Install Metamask"}
                subheader={null}
                link={"https://metamask.io/"}
                icon={option.iconName}
              />
            );
          } else {
            return null; //dont want to return install twice
          }
        }
        // don't return metamask if injected provider isn't metamask
        else if (option.name === "MetaMask" && !isMetamask) {
          return null;
        }
        // likewise for generic
        else if (option.name === "Injected" && isMetamask) {
          return null;
        }
      }

      // return rest of options
      return (
        !isMobile &&
        !option.mobileOnly && (
          <Option
            id={`connect-${key}`}
            onClick={() => {
              !option.href && tryActivation(option.connector);
            }}
            key={key}
            active={option.connector === connector}
            color={option.color}
            link={option.href}
            header={option.name}
            subheader={null} //use option.descriptio to bring back multi-line
            icon={option.iconName}
          />
        )
      );
    });
  }

  function getModalContent() {
    return (
      <UpperSection>
        <CloseIcon onClick={toggleWalletDropdown}>
          <img src={"./x.svg"} />
        </CloseIcon>
        <HeaderRow>
          <HoverText>Connect to a wallet</HoverText>
        </HeaderRow>
        <ContentWrapper>
          <OptionGrid>{getOptions()}</OptionGrid>
          <Blurb>
            <span>New to Ethereum? &nbsp;</span>{" "}
            <ExternalLink href="https://ethereum.org/wallets/">
              Learn more about wallets
            </ExternalLink>
          </Blurb>
        </ContentWrapper>
      </UpperSection>
    );
  }
  if (walletDropdown) {
    return (
      <Modal
        isOpen={walletDropdown}
        onDismiss={toggleWalletDropdown}
        minHeight={false}
        maxHeight={90}
      >
        <Wrapper>{getModalContent()}</Wrapper>
      </Modal>
    );
  } else return <></>;
}
