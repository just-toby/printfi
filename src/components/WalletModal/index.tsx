import { AbstractConnector } from '@web3-react/abstract-connector'
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import React, { useEffect, useState } from 'react'
import { isMobile } from 'react-device-detect'
import ReactGA from 'react-ga'
import styled from 'styled-components'
// import MetamaskIcon from '../../assets/images/metamask.png'
// import { ReactComponent as Close } from '../../assets/images/x.svg'
// import { fortmatic, injected, portis } from '../../connectors'
import { injected, portis } from '../../connectors'

// import { OVERLAY_READY } from '../../connectors/Fortmatic'
import { SUPPORTED_WALLETS } from '../../utils/constants'
import usePrevious from '../../hooks/usePrevious'
import { ApplicationModal } from '../../state/actions'
import { useModalOpen, useWalletModalToggle } from '../../state/application/hooks'
// import { ExternalLink } from '../../theme'
import AccountDetails from '../AccountDetails'

import Modal from '../Modal'
import Option from './Option'
import PendingView from './PendingReview'

const CloseIcon = styled.div`
  position: absolute;
  right: 1rem;
  top: 14px;
  &:hover {
    cursor: pointer;
    opacity: 0.6;
  }
`

// const CloseColor = styled(Close)`
//   path {
//     stroke: ${({ theme }) => theme.text4};
//   }
// `

// const HeaderRow = styled.div`
//   ${({ theme }) => theme.flexRowNoWrap};
//   padding: 1rem 1rem;
//   font-weight: 500;
//   color: ${props => (props.color === 'blue' ? ({ theme }) => theme.primary1 : 'inherit')};
//   ${({ theme }) => theme.mediaWidth.upToMedium`
//     padding: 1rem;
//   `};
// `

// const ContentWrapper = styled.div`
//   background-color: ${({ theme }) => theme.bg2};
//   padding: 2rem;
//   border-bottom-left-radius: 20px;
//   border-bottom-right-radius: 20px;

//   ${({ theme }) => theme.mediaWidth.upToMedium`padding: 1rem`};
// `

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

// const Blurb = styled.div`
//   ${({ theme }) => theme.flexRowNoWrap}
//   align-items: center;
//   justify-content: center;
//   flex-wrap: wrap;
//   margin-top: 2rem;
//   ${({ theme }) => theme.mediaWidth.upToMedium`
//     margin: 1rem;
//     font-size: 12px;
//   `};
// `

// const OptionGrid = styled.div`
//   display: grid;
//   grid-gap: 10px;
//   ${({ theme }) => theme.mediaWidth.upToMedium`
//     grid-template-columns: 1fr;
//     grid-gap: 10px;
//   `};
// `

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

console.log("WalletModal");

// export default function WalletModal({
//   pendingTransactions,
//   confirmedTransactions,
//   ENSName
// }: {
//   pendingTransactions: string[] // hashes of pending
//   confirmedTransactions: string[] // hashes of confirmed
//   ENSName?: string
// }) {
export default function WalletModal(props)
{
  console.log("WalletModal2");
  // important that these are destructed from the account-specific web3-react context
  const { active, account, connector, activate, error } = useWeb3React()

  const [walletView, setWalletView] = useState(WALLET_VIEWS.ACCOUNT)

  const [pendingWallet, setPendingWallet] = useState<AbstractConnector | undefined>()

  const [pendingError, setPendingError] = useState<boolean>()

  const walletModalOpen = useModalOpen(ApplicationModal.WALLET)
  const toggleWalletModal = useWalletModalToggle()

  const previousAccount = usePrevious(account)

  // close on connection, when logged out before
  useEffect(() => {
    if (account && !previousAccount && walletModalOpen) {
      toggleWalletModal()
    }
  }, [account, previousAccount, toggleWalletModal, walletModalOpen])

  // always reset to account view
  useEffect(() => {
    if (walletModalOpen) {
      setPendingError(false)
      setWalletView(WALLET_VIEWS.ACCOUNT)
    }
  }, [walletModalOpen])

  // close modal when a connection is successful
  const activePrevious = usePrevious(active)
  const connectorPrevious = usePrevious(connector)
  useEffect(() => {
    if (walletModalOpen && ((active && !activePrevious) || (connector && connector !== connectorPrevious && !error))) {
      setWalletView(WALLET_VIEWS.ACCOUNT)
    }
  }, [setWalletView, active, error, connector, walletModalOpen, activePrevious, connectorPrevious])

  const tryActivation = async (connector: AbstractConnector | undefined) => {
    let name = ''
    Object.keys(SUPPORTED_WALLETS).map(key => {
      if (connector === SUPPORTED_WALLETS[key].connector) {
        return (name = SUPPORTED_WALLETS[key].name)
      }
      return true
    })
    // log selected wallet
    ReactGA.event({
      category: 'Wallet',
      action: 'Change Wallet',
      label: name
    })
    setPendingWallet(connector) // set wallet for pending view
    setWalletView(WALLET_VIEWS.PENDING)

    // if the connector is walletconnect and the user has already tried to connect, manually reset the connector
    if (connector instanceof WalletConnectConnector && connector.walletConnectProvider?.wc?.uri) {
      connector.walletConnectProvider = undefined
    }

    connector &&
      activate(connector, undefined, true).catch(error => {
        if (error instanceof UnsupportedChainIdError) {
          activate(connector) // a little janky...can't use setError because the connector isn't set
        } else {
          setPendingError(true)
        }
      })
  }

//   // close wallet modal if fortmatic modal is active
//   useEffect(() => {
//     fortmatic.on(OVERLAY_READY, () => {
//       toggleWalletModal()
//     })
//   }, [toggleWalletModal])

  // get wallets user can switch too, depending on device/browser
  function getOptions() {
    // console.log("windows in Wallet Modal: ", window);
    // const isMetamask = window.ethereum && window.ethereum.isMetaMask
    return Object.keys(SUPPORTED_WALLETS).map(key => {
      const option = SUPPORTED_WALLETS[key];

      console.log("supported option wallet: ", option);
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
            icon={'../../assets/images/metamask.png'}
          />
      )
    })
  }

  function getModalContent() {
    console.log("buk buk buk");
    console.log("account: ", account);
    console.log("THE CONTENTTTTTTTT");

    return (
      <UpperSection>
        <CloseIcon onClick={toggleWalletModal}>
          {/* <CloseColor /> */}
        </CloseIcon>
        {walletView !== WALLET_VIEWS.ACCOUNT ? (
          // <HeaderRow color="blue">
            <HoverText
              onClick={() => {
                setPendingError(false)
                setWalletView(WALLET_VIEWS.ACCOUNT)
              }}
            >
              Back
            </HoverText>
          // </HeaderRow>
        ) : (
          // <HeaderRow>
            <HoverText>Connect to a wallet</HoverText>
          // </HeaderRow>
        )}
        {/* <ContentWrapper> */}
          {walletView === WALLET_VIEWS.PENDING ? (
            <PendingView
              connector={pendingWallet}
              error={pendingError}
              setPendingError={setPendingError}
              tryActivation={tryActivation}
            />
          ) : (
            <div>{getOptions()}</div>
          )}
          {walletView !== WALLET_VIEWS.PENDING && (
            <div>
              <span>New to Ethereum? &nbsp;</span>{' '}
              {/* <ExternalLink href="https://ethereum.org/wallets/">Learn more about wallets</ExternalLink> */}
            </div>
          )}
        {/* </ContentWrapper> */}
      </UpperSection>
    )
  }

  console.log("walletModalOpen: ", walletModalOpen);
  return (
    <Modal isOpen={walletModalOpen} onDismiss={toggleWalletModal} minHeight={false} maxHeight={90}>
      {getModalContent()}
    </Modal>
  )
}