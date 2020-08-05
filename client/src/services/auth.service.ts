import callWebApi from 'helpers/callApi.helper';

export const registerUser = async (settings: Partial<WebApi.Entities.User>) => {
	const res = await callWebApi({
		endpoint: 'auth/register',
		method: 'POST',
		body: {
			...settings,
		},
	});

	if (res.status > 399) {
		// Replace this with error handling (when there will be a handler on server)
		return null;
	}

	return (await res.json()) as WebApi.Result.UserAuthResult;
};

export const loginUser = async (email: string, password: string): Promise<WebApi.Result.UserLoginResult | null> => {
	const res = await callWebApi({
		endpoint: 'auth/login',
		method: 'POST',
		body: {
			email,
			password,
		},
	});

	if (res.status > 399) {
		// Replace this with error handling (when there will be a handler on server)
		return null;
	}

	return (await res.json()) as WebApi.Result.UserLoginResult;
};