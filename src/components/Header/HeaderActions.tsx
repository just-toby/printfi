import * as React from "react";
import { useContext } from "react";
import Link from "next/link";
import { CartContext } from "../../context/CartContext";
import { Button } from "@material-ui/core";
import { useWeb3React } from "@web3-react/core";
import classNames from "classnames";

export type SubPage = "print" | "cart";

interface HeaderActionsProps {
  subPage: SubPage;
  toggleWalletDropdown: () => void;
}

function HeaderActions(props: HeaderActionsProps) {
  const { subPage, toggleWalletDropdown } = props;
  const { cart } = useContext(CartContext);
  const { account, active } = useWeb3React();

  const formatAddress: (address: string) => string = (address) => {
    return address.slice(0, 6) + "..." + address.slice(address.length - 4);
  };
  return (
    <div className="headerDiv">
      <div className="navPadding">
        <Link href="/">
          <a className="navigationLinks siteTitleLink">NiftyPrints</a>
        </Link>
        <Link href="/">
          <a
            className={classNames(
              "navigationLinks",
              subPage === "print" ? "subPageLinkUnderline" : null
            )}
          >
            print
          </a>
        </Link>
        <Link href="/review">
          <a
            className={classNames(
              "navigationLinks",
              subPage === "cart" ? "subPageLinkUnderline" : null
            )}
          >
            {cart.length > 0 ? "cart (" + cart.length + ")" : "cart"}
          </a>
        </Link>
      </div>

      <div className="flexStretch" />

      <div className="navPadding">
        {account && active ? (
          <Button
            onClick={toggleWalletDropdown}
            color="primary"
            variant="outlined"
          >
            {formatAddress(account)}
          </Button>
        ) : (
          <Button
            onClick={toggleWalletDropdown}
            color="primary"
            variant="outlined"
          >
            {"Connect to a wallet"}
          </Button>
        )}
      </div>
    </div>
  );
}

export default HeaderActions;
