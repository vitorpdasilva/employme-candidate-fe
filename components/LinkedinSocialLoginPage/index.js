import { useState } from 'react';

import linkedin, { useLinkedIn } from 'react-linkedin-login-oauth2';

function LinkedinSocialLoginPage() {
  const { linkedInLogin } = useLinkedIn({
    clientId: '86vhj2q7ukf83q',
    redirectUri: '/linkedin', // for Next.js, you can use `${typeof window === 'object' && window.location.origin}/linkedin`
    onSuccess: (code) => {
      console.log(code);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return (
    <img
      onClick={linkedInLogin}
      src={linkedin}
      alt="Sign in with Linked In"
      style={{ maxWidth: '180px', cursor: 'pointer' }}
    />
  );
}

export default LinkedinSocialLoginPage;