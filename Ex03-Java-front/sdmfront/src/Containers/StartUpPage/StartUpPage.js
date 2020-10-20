import React, { useState } from "react";
import Sign from "../../Components/LogicalComponents/SignUp/SignUp";
import Main from "../Main/Main";
import UserProfileContext from '../../Utilities/Contexts/UserProfileContext/UserProfileContext'
const StartUpPage = () => {

  const [isSigned, setIsSigned] = useState(true);
  const [userKind, setUserKind] = useState('Customer');

  const setSignedUpResultsHandeler = (isSignedParam, userKindParam) => {
    setIsSigned(isSignedParam);
    setUserKind(userKindParam);
  };

  return isSigned ? (
    <UserProfileContext.Provider value={{ userType: userKind }}>
      <Main />
    </UserProfileContext.Provider>
  )
    : <Sign  setSignedUpResult={setSignedUpResultsHandeler} />

};

export default StartUpPage;
