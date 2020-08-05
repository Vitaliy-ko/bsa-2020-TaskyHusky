import React, { useState, SyntheticEvent, useEffect } from 'react';
import styles from './styles.module.scss';

import { Header, Form, Divider, Segment, Button, Grid, List, Popup } from 'semantic-ui-react';
import { validateEmail } from 'helpers/validateEmail.helper';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'typings/rootState';
import * as actions from './logic/actions';
import { setToken } from 'helpers/setToken.helper';

export const LoginPage: React.FC = () => {
	const dispatch = useDispatch();
	const authData = useSelector((rootState: RootState) => rootState.auth);
	const getUser = (email: string, password: string) => {
		dispatch(actions.triggerLoginUser({ email, password }));
	};

	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [isEmailValid, setIsEmailValid] = useState<boolean>(false);
	const [isEmailSubmitted, setIsEmailSubmitted] = useState<boolean>(false);
	const [redirectToForgetPassword, setRedirectToForgetPassword] = useState<boolean>(false);
	const [redirectToSignUp, setRedirectToSignUp] = useState<boolean>(false);
	const [redirectToRootPage, setRedirectToRootPage] = useState<boolean>(false);

	useEffect(() => {
		if (!!authData.jwtToken) {
			setToken(authData.jwtToken);
			setRedirectToRootPage(!redirectToRootPage);
		}
	}, [authData.jwtToken, redirectToRootPage]);

	const handleContinueSubmit: (event: SyntheticEvent) => void = (event) => {
		event.preventDefault();
		setIsEmailSubmitted(true);
		setIsEmailValid(validateEmail(email)); // TODO: replace with request to server side via redux-saga when server side is ready
	};

	const handleLogInSubmit: (event: SyntheticEvent) => void = (event) => {
		event.preventDefault();
		setIsEmailValid(validateEmail(email));
		setIsEmailSubmitted(true);
		getUser(email, password);
	};

	const toggleForgetPasswordHandler: () => void = () => {
		setRedirectToForgetPassword(true);
	};

	const toggleSignUpHandler: () => void = () => {
		setRedirectToSignUp(true);
	};

	const renderForgetPassword: JSX.Element | null = redirectToForgetPassword ? (
		<Redirect to="/login/resetpassword" />
	) : null;

	const renderSignUp: JSX.Element | null = redirectToSignUp ? <Redirect to="/signup" /> : null;

	const renderRootPage: JSX.Element | null = redirectToRootPage ? <Redirect to="/" /> : null;

	const passwordInput = isEmailValid ? (
		<Form.Input placeholder="Password" type="password" onChange={(event) => setPassword(event.target.value)} />
	) : null;

	return (
		<>
			<Grid verticalAlign="middle" className={styles.grid}>
				<Grid.Column className={styles.column}>
					<Header as="h1" className={styles.mainHeader}>
						Tasky-Husky
					</Header>
					<Segment>
						<Header as="h4" className={styles.subHeader}>
							Log in to your account
						</Header>
						<Form onSubmit={isEmailValid ? handleLogInSubmit : handleContinueSubmit}>
							<Popup
								className={styles.errorPopup}
								open={!isEmailValid && isEmailSubmitted}
								content="Please enter a valid email"
								on={[]}
								trigger={
									<Form.Input
										error={!(isEmailValid || !isEmailSubmitted)}
										placeholder="Email"
										type="text"
										onChange={(event) => {
											setEmail(event.target.value);
											setIsEmailSubmitted(false);
										}}
									/>
								}
							/>

							{passwordInput}
							<Button className={styles.continueButton}>{isEmailValid ? 'Log in' : 'Continue'}</Button>
						</Form>
						<Divider />
						<List bulleted horizontal link className={styles.list}>
							<List.Item as="a" className={styles.listItem} onClick={toggleForgetPasswordHandler}>
								Can&apos;t login
							</List.Item>
							<List.Item as="a" className={styles.listItem} onClick={toggleSignUpHandler}>
								Sign up for an account
							</List.Item>
						</List>
					</Segment>
				</Grid.Column>
			</Grid>
			{renderForgetPassword}
			{renderSignUp}
			{renderRootPage}
		</>
	);
};

export default LoginPage;