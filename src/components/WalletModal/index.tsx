import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core'
import React, {} from 'react'
import styled from 'styled-components'
import { SUPPORTED_WALLETS } from '../../utils/constants'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import Option from './Option'
import { ExternalLink } from '../theme'
import Modal from "../Modal"
import { AbstractConnector } from '@web3-react/abstract-connector'

const CloseIcon = styled.div`
  position: absolute;
  right: 1rem;
  top: 14px;
  &:hover {
    cursor: pointer;
    opacity: 0.6;
  }
`

const OptionGrid = styled.div`
  display: grid;
  grid-gap: 10px;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    grid-template-columns: 1fr;
    grid-gap: 10px;
  `};
`

const Wrapper = styled.div`
  ${({ theme }) => theme.flexColumnNoWrap}
  margin: 0;
  padding: 0;
  width: 100%;
`

const HeaderRow = styled.div`
  ${({ theme }) => theme.flexRowNoWrap};
  padding: 1rem 1rem;
  font-weight: 500;
  color: ${props => (props.color === 'blue' ? ({ theme }) => theme.primary1 : 'inherit')};
  ${({ theme }) => theme.mediaWidth.upToMedium`
    padding: 1rem;
  `};
`

const ContentWrapper = styled.div`
  background-color: ${({ theme }) => theme.bg2};
  padding: 2rem;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;

  ${({ theme }) => theme.mediaWidth.upToMedium`padding: 1rem`};
`

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
`

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
`


const HoverText = styled.div`
  :hover {
    cursor: pointer;
  }
`

const WALLET_VIEWS = {
  OPTIONS: 'options',
  OPTIONS_SECONDARY: 'options_secondary',
  ACCOUNT: 'account',
  PENDING: 'pending'
}

const HeaderText = styled.div`
  ${({ theme }) => theme.flexRowNoWrap};
  color: ${props => (props.color === 'blue' ? ({ theme }) => theme.primary1 : ({ theme }) => theme.text1)};
  font-size: 1rem;
  font-weight: 500;
`

export default function WalletModal(props)
{
  // important that these are destructed from the account-specific web3-react context
  const { account, connector, activate } = useWeb3React()
  const {walletDropdown, toggleWalletDropdown} = props;


  const tryActivation = async (connector: AbstractConnector | undefined) => {
    let name = ''
    console.log("------------ tryActivation: ");
    console.log(connector);

    Object.keys(SUPPORTED_WALLETS).map(key => {
      if (connector === SUPPORTED_WALLETS[key].connector) {
        return (name = SUPPORTED_WALLETS[key].name)
      }
      return true
    })
    // log selected wallet
    // setPendingWallet(connector) // set wallet for pending view
    // setWalletView(WALLET_VIEWS.PENDING)

    // if the connector is walletconnect and the user has already tried to connect, manually reset the connector
    if (connector instanceof WalletConnectConnector && connector.walletConnectProvider?.wc?.uri) {
      connector.walletConnectProvider = undefined
    }

    connector &&
      activate(connector, undefined, true).catch(error => {
        if (error instanceof UnsupportedChainIdError) {
          activate(connector) // a little janky...can't use setError because the connector isn't set
        } else {
          // setPendingError(true)
        }
      })
  }

  // get wallets user can switch too, depending on device/browser
  function getOptions() {
    return Object.keys(SUPPORTED_WALLETS).map(key => {
      const option = SUPPORTED_WALLETS[key];
      return (
          <Option
            onClick={() => {
              option.connector !== connector && !option.href && tryActivation(option.connector)
            }}
            id={`connect-${key}`}
            key={key}
            active={option.connector && option.connector === connector}
            color={option.color}
            link={option.href}
            header={option.name}
            subheader={null}
            icon={option.iconName}
          />
      )
    })
  }

  function getModalContent() {
    return (
      <UpperSection>
          <CloseIcon onClick={toggleWalletDropdown}>
            <img src={"./x.svg"}/>
          </CloseIcon>
          <HeaderRow>
            <HeaderText color={"white"}>
              Connect to a wallet
            </HeaderText>
          </HeaderRow>
          <ContentWrapper>
            <OptionGrid>{getOptions()}</OptionGrid>
            <Blurb>
              <span>New to Ethereum? &nbsp;</span>{' '}
              <ExternalLink href="https://ethereum.org/wallets/">Learn more about wallets</ExternalLink>
            </Blurb>
        </ContentWrapper>
      </UpperSection>
    )
  }
  return (
    <Modal isOpen={walletDropdown} onDismiss={toggleWalletDropdown} minHeight={false} maxHeight={90}>
      <Wrapper>{getModalContent()}</Wrapper>
    </Modal>
  )  
}