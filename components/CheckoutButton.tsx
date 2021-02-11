import styles from "../styles/Home.module.css";
import CoinbaseCommerceButton from "react-coinbase-commerce";
import "react-coinbase-commerce/dist/coinbase-commerce-button.css";
import classNames from "classnames";

export type MessageData = {
  event: "charge_confirmed" | "charge_failed" | "payment_detected";
  code: string; // chargeCode
};

type CoinbaseCommerceButtonSharedProps = {
  // prop name, type, default
  styled?: boolean; // =false
  onLoad?: () => void; // =null
  onChargeSuccess?: (data: MessageData) => void; // =null
  onChargeFailure?: (data: MessageData) => void; // =null
  onPaymentDetected?: (data: MessageData) => void; // =null
  disableCaching?: boolean; // =false
  customMetadata?: string; // =null
};

type CoinbaseCommerceButtonPropsForCharge = {
  // prop name, type, default
  checkoutId?: string;
  chargeId: string;
} & CoinbaseCommerceButtonSharedProps;

type CoinbaseCommerceButtonPropsForCheckout = {
  // prop name, type, default
  checkoutId: string; // =null (required if no chargeId)
  chargeId?: string; // =null (required if no checkoutId)
};

type CoinbaseCommerceButtonProps =
  | CoinbaseCommerceButtonPropsForCheckout
  | CoinbaseCommerceButtonPropsForCharge;

interface CheckoutButtonProps {
  // Returned by Coinbase API when charge is created.
  chargeId: string;
  // Should include
  // - email,
  // - mailing address
  // - order info (frame, size, spacing, glass)
  // - URI for high quality NFT image to be printed
  metadata: string;
  onChargeSuccess?: (data: MessageData) => void;
  onChargeFailure?: (data: MessageData) => void;
  onPaymentDetected?: (data: MessageData) => void;
  onModalClosed?: (data: MessageData) => void;
}

/**
 * Typed wrapper for the Coinbase Commerce React library.
 * Docs: https://github.com/coinbase/react-coinbase-commerce
 * @param props just the ones we need for our use case.
 */
const CheckoutButton: React.FC<CheckoutButtonProps> = (
  props: CheckoutButtonProps
) => {
  // Use this intermediary to ensure we have the right props with the right types.
  const coinbaseProps: CoinbaseCommerceButtonProps = {
    chargeId: props.chargeId,
    styled: false,
    onChargeSuccess: props.onChargeSuccess,
    onChargeFailure: props.onChargeFailure,
    onPaymentDetected: props.onPaymentDetected,
    customMetadata: props.metadata,
  };
  return (
    <CoinbaseCommerceButton
      className={classNames(
        styles.confirmButton,
        styles.smallFont,
        styles.payWithCryptoButton
      )}
      chargeId={coinbaseProps.chargeId}
      styled={coinbaseProps.styled}
      onChargeSuccess={coinbaseProps.onChargeSuccess}
      onChargeFailure={coinbaseProps.onChargeFailure}
      onPaymentDetected={coinbaseProps.onPaymentDetected}
      customMetadata={coinbaseProps.customMetadata}
    />
  );
};

export { CheckoutButton };
