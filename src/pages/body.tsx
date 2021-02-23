import { useWeb3React } from "@web3-react/core";
import AccountDisplay from "./AccountDisplay"
function Body () {
    const { active } = useWeb3React();

    if(!active)
    {
        return (
            <p className={"title"}>digital art you can feel</p>
        )
    }
    else 
    {
        return (
            <AccountDisplay />
        )
    }

   
}

export default Body;