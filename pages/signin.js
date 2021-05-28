import { useContext } from 'react';

import Context from '../src/context';

const OAUTH_CLIENT_ID = '492476132258-0q398eovgf4m37gal1t3vgm6ohnf49q4.apps.googleusercontent.com';

const SignIn = () => {
  const { dispatch } = useContext(Context);
  return (
    <>Sign In</>
  );
} 

export default SignIn;