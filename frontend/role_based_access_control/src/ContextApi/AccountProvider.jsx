import { createContext, useEffect, useRef, useState } from "react";
export const AccountContext = createContext(null)

const AccountProvider = ({children}) => {
    const [localAccount, setLocalAccount] = useState();

    console.log("XX", localAccount)

    return (
        <AccountContext.Provider
            value={{
                localAccount, setLocalAccount,
            }}
        >
            {children}
        </AccountContext.Provider>
    )
}

export default AccountProvider