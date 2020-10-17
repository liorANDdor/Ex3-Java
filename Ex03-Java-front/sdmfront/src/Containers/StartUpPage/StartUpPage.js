import React, { useState } from "react";
import Sign from "../../Components/LogicalComponents/SignUp/SignUp";
import Main from "../Main/Main";
import UserProfileContext from '../../Utilities/Contexts/UserProfileContext/UserProfileContext'
const StartUpPage = () => {
  const [isSigned, setIsSigned] = useState();
  const [userKind, setUserKind] = useState();
  let ws;
  const setSignedUpResultsHandeler = (isSignedParam, userKindParam) => {
    setIsSigned(isSignedParam);
    setUserKind(userKindParam);
  };

  return isSigned ? (
    <UserProfileContext.Provider value={{ userType: userKind }}>
      <Main />
    </UserProfileContext.Provider>
  )
    : <Sign websocket={ws} setSignedUpResult={setSignedUpResultsHandeler} />

};

export default StartUpPage;
