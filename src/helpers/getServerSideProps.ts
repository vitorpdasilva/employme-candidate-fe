export async function getServerSideProps(context: any) {
  // Check if the user is authenticated by making a request to the API, reading a cookie, etc.
  const token = localStorage.getItem("token")
  const authenticated = !!token
  console.log({ token })
  return {
    props: {
      token,
      authenticated,
    },
  };
}