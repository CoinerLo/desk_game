
export const useGetApiUrl = ({ protocol, path }) => {
	let resultURL = '';
	const isProduction = process.env.NODE_ENV === 'production';
  const host = process.env.REACT_APP_SERVER_HOST ?? window.location.hostname;
  const port = process.env.REACT_APP_SERVER_PORT ?? 8080;
	if (protocol === 'ws') {
		resultURL = isProduction ? `wss://${host}${path}` : `ws://${host}:${port}${path}` ;
	} else {
		resultURL = isProduction ? `https://${host}${path}` : `http://${host}:${port}${path}` ;
	}
	return resultURL;
}
