import React, { useContext, useState } from "react";
import Header from "../components/Header/Header";
import { useRouter } from "next/router";
import { AssetsContext } from "../context/AssetsContext";
import { Asset } from "../hooks/useAssets";
import { Rings, useLoading } from "@agney/react-loading";
import { TokenCard } from "../components/TokenGrid/Token";
import { OptionRow } from "../components/OptionRow";
import { CartContext } from "../context/CartContext";
import { ItemConfiguration } from "../hooks/useCart";
import { Button } from "@material-ui/core";
import { useWeb3React } from "@web3-react/core";

interface CustomizePageProps {}

export default function Customize(props: CustomizePageProps) {
  const router = useRouter();
  const { assets } = useContext(AssetsContext);
  const { addToCart } = useContext(CartContext);
  const [loading, setLoading] = useState(false);
  const { library } = useWeb3React();
  const { containerProps, indicatorEl } = useLoading({
    loading: true,
    indicator: <Rings width="100" />,
  });

  const { index } = router.query;
  const item: Asset = assets[Number(index)];

  // TODO: once these options are finalized/confirmed, pull them out into enums.
  const options = {
    size: {
      title: "Size",
      options: ['20"x30"', '30"x45"'],
    },
    frame: {
      title: "Frame",
      options: ["Black", "White"],
    },
    glass: {
      title: "Glass",
      options: ["Glossy", "Matte"],
    },
    space: {
      title: "Space",
      options: ['0"', '3"'],
    },
  };

  const [itemConfiguration, setItemConfiguration] = useState<ItemConfiguration>(
    {
      size: null,
      frame: null,
      glass: null,
      space: null,
    }
  );

  const hasValidConfiguration = (itemConfiguration: ItemConfiguration) => {
    // TODO: make sure these are valid selections, once the options are typified.
    return (
      itemConfiguration.frame != null &&
      itemConfiguration.glass != null &&
      itemConfiguration.size != null &&
      itemConfiguration.space != null
    );
  };

  return (
    <div className={"container"}>
      <Header subPage="print" />
      <main className={"main"}>
        {item == null || loading ? (
          <section {...containerProps}>{indicatorEl}</section>
        ) : (
          <div className="customizeContainer">
            <div className="customizeOptions">
              <span
                className="largeFont customizeTitle"
              >
                <a className="siteTitleLink">{item.name}</a>
              </span>
              {Object.keys(options).map((optionType) => {
                return (
                  <OptionRow
                    key={options[optionType].title}
                    title={options[optionType].title}
                    options={options[optionType].options}
                    selection={itemConfiguration[optionType]}
                    onSelect={(selection) => {
                      setItemConfiguration({
                        ...itemConfiguration,
                        [optionType]: selection,
                      });
                    }}
                  />
                );
              })}
              <div className="cartDiv">
                <Button
                  disabled={!hasValidConfiguration(itemConfiguration)}
                  color="primary"
                  variant="outlined"
                  size="large"
                  onClick={async () => {
                    setLoading(true);
                    addToCart({
                      name: item.name,
                      token_id: item.token_id,
                      collection_slug: item.collection.slug,
                      preview_uri: item.image_thumbnail_url,
                      original_uri: item.image_original_url,
                      config: itemConfiguration,
                    });
                    router.push("/review");
                  }}
                >
                  Add to Cart
                </Button>
              </div>
            </div>
            <div className="customizeImageContainer">
              <TokenCard
                key={item.id}
                name={item.name}
                uri={item.image_url}
                width={500}
                innerBorder={itemConfiguration.space === '3"'}
                outerBorderColor={itemConfiguration.frame}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
