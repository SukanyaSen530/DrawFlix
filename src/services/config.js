import { tokenName } from "../context/providers/AuthProvider";

 const getConfig = () => {
   const encodedToken = window.sessionStorage.getItem(`${tokenName}`);

   if (encodedToken)
     return {
       headers: {
         authorization: encodedToken,
       },
     };
   else return {};
 };
 export default getConfig;