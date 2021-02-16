export interface ConfirmationEmailProps {
  mailingAddress: Object;
  cartItems: Array<Object>;
}

const ConfirmationEmail: React.FC<ConfirmationEmailProps> = (
  props: ConfirmationEmailProps
) => {
  // TODO: make this an actual email template
  return (
    <div>
      <div>{props.mailingAddress}</div>
      <div>{props.cartItems}</div>
    </div>
  );
};

export { ConfirmationEmail };
