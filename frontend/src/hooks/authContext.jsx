import React, { useEffect, useState } from 'react'

const HOOKContext = React.createContext([{}, () => { }]);

const AUTHContext = (props) => {
    const [auth, setAuth] = useState({
        token: "",
        authentication: false
    })

    return (
        <HOOKContext.Provider value={[auth, setAuth]}>
            {props.children}
        </HOOKContext.Provider>
    )
}

export { HOOKContext, AUTHContext }