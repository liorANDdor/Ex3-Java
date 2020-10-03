import React, { useState } from "react";
import Sign from '../../Components/SignUp/SignUp'
import Main from '../Main/Main'
const StartUpPage = () => {
    const [isSigned, setIsSigned] = useState(false)
    const [userKind, setUserKind] = useState(null)

    const setSignedUpResultsHandeler = (isSignedParam, userKindParam) => {
        setIsSigned(isSignedParam)
        setUserKind(userKindParam)
    }
    return (
        isSigned ? <Main userKind={userKind} /> : <Sign setSignedUpResult={setSignedUpResultsHandeler} />
    )
}


export default StartUpPage;