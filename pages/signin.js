import { useContext } from 'react';
import { GraphQLClient } from 'graphql-request';
import GoogleLogin from 'react-google-login';
import Context from '../src/context';
import { BASE_URL } from '../src/client';
import { ME_QUERY } from '../src/queries';

const OAUTH_CLIENT_ID = '492476132258-0q398eovgf4m37gal1t3vgm6ohnf49q4.apps.googleusercontent.com';

const SignIn = () => {
  const { dispatch } = useContext(Context);
  const onSuccess = async googleUser => {
    try {
      const { id_token } = googleUser.getAuthResponse();
      const client = new GraphQLClient(BASE_URL, {
        headers: { authorization: id_token },
      });
      const { me } = await client.request(ME_QUERY);
      console.log({ me });
    } catch (err) {
      console.error(err);
    }
  }

  const onFailure = err => {
    console.error('onFailure', err);
  }
  return (
    <>
      <GoogleLogin
        buttonText="Login with Google"
        onSuccess={onSuccess}
        onFailure={onFailure}
        theme="dark"
        cookiePolicy={'single_host_origin'}
        clientId={OAUTH_CLIENT_ID}
        isSignedIn={true}
      />
    </>
  );
} 

export default SignIn;