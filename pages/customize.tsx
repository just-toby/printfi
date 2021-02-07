import Head from "next/head";
import React, { useContext, useState } from "react";
import styles from "../styles/Home.module.css";
import { NavBar } from "../components/NavBar";
import { useRouter } from "next/router";
import { AssetsContext } from "../context/AssetsContext";
import { Asset } from "../hooks/useAssets";
import { Rings, useLoading } from "@agney/react-loading";
import { TokenCard } from "../components/TokenCard";
import { OptionRow, OptionRowProps } from "../components/OptionRow";
import classNames from "classnames";
import { ConfirmButton } from "../components/ConfirmButton";

interface CustomizePageProps {}

type ItemConfiguration = {
  size: string;
  frame: string;
  glass: string;
  space: string;
};

export default function Customize(props: CustomizePageProps) {
  const router = useRouter();
  const { assets } = useContext(AssetsContext);
  const { containerProps, indicatorEl } = useLoading({
    loading: true,
    indicator: <Rings width="50" />,
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
    <div className={styles.container}>
      <Head>
        <title>Print.Fi</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar subPage="print" />
      <main className={styles.main}>
        {item == null ? (
          <section {...containerProps}>{indicatorEl}</section>
        ) : (
          <div className={styles.customizeContainer}>
            <div className={styles.customizeOptions}>
              <span
                className={classNames(styles.largeFont, styles.customizeTitle)}
              >
                {item.name}
              </span>
              {Object.keys(options).map((optionType) => {
                return (
                  <OptionRow
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
              <ConfirmButton
                title="Add to Cart"
                onClick={() => {
                  if (hasValidConfiguration(itemConfiguration)) {

                  } else {
                    // TODO: flash unselected options? pop up an alert?
                  }
                }}
              />
            </div>
            <TokenCard
              key={item.id}
              name={item.name}
              uri={item.image_url}
              type={item.asset_contract.name}
              height={715}
              width={500}
            />
          </div>
        )}
      </main>
    </div>
  );
}
