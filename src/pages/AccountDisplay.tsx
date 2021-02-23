import { TokenGrid } from "../components/TokenGrid"
import { useContext, useState, useEffect } from "react";
import { AssetsContext } from "../context/AssetsContext";
import { LoadingGrid } from "../components/TokenGrid/Loading";

function AccountDisplay () {
    const { assets, loadMore, loading, hasNextPage } = useContext(AssetsContext);
    const [windowWidth, setWindowWidth] = useState(0);
    const [windowHeight, setWindowHeight] = useState(0);

    useEffect(() => {
        setWindowWidth(window.innerWidth);
        setWindowHeight(window.innerHeight);
        const resizeListener = (_e: any) => {
          setWindowHeight(window.innerHeight);
          setWindowWidth(window.innerWidth);
        };
        window.addEventListener("resize", resizeListener);
        return () => {
          window.removeEventListener("resize", resizeListener);
        };
      }, []);

    if(loading)
    {
        return (
            <LoadingGrid windowHeight={windowHeight} windowWidth={windowWidth}/>
        )
    }
    else {
        return (
            <TokenGrid />
        )
    }
}

export default AccountDisplay;