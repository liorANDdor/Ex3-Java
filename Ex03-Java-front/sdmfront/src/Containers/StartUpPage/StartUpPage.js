import React, { useState } from "react";
import Sign from "../../Components/SignUp/SignUp";
import Main from "../Main/Main";
import UserProfileContext from '../../Components/UserProfileContext/UserProfileContext'
const StartUpPage = () => {
  const [isSigned, setIsSigned] = useState(false);
  const [userKind, setUserKind] = useState('');

  const setSignedUpResultsHandeler = (isSignedParam, userKindParam) => {
    setIsSigned(isSignedParam);
    setUserKind(userKindParam);
  };

  return isSigned ? (
    <UserProfileContext.Provider value={{ userType: userKind }}>
      <Main/>
    </UserProfileContext.Provider>
  )
    : <Sign setSignedUpResult={setSignedUpResultsHandeler} />

};

export default StartUpPage;
