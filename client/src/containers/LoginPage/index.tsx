import React, { useState, SyntheticEvent } from 'react';
import styles from './styles.module.scss';

import { Header, Form, Divider, Segment, Button, Grid, List } from 'semantic-ui-react';
import { validateEmail } from 'helpers/validateEmail.helper';
import { useHistory } from 'react-router-dom';

export const LoginPage: React.FC = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isEmailValid, setIsEmailValid] = useState(false);
	const [isEmailSubmitted, setIsEmailSubmitted] = useState(false);
	const history = useHistory();

	const handleContinueSubmit = (event: SyntheticEvent) => {
		event.preventDefault();

		setIsEmailSubmitted(true);
		setIsEmailValid(validateEmail(email)); // TODO: replace with request to server side via redux-saga when server side is ready
	};

	const toggleForgetPasswordHandler: () => void = () => {
		history.push('/login/resetpassword');
	};

	const toggleSignUpHandler: () => void = () => {
		history.push('/signup');
	};

	const passwordInput = isEmailValid ? (
		<Form.Input placeholder="Password" type="password" onChange={(event) => setPassword(event.target.value)} />
	) : null;

	return (
		<Grid verticalAlign="middle" className={styles.grid}>
			<Grid.Column className={styles.column}>
				<Header as="h1" className={styles.mainHeader}>
					Tasky-Husky
				</Header>
				<Segment>
					<Header as="h4" className={styles.subHeader}>
						Log in to your account
					</Header>
					<Form onSubmit={handleContinueSubmit}>
						<Form.Input
							error={
								isEmailValid || !isEmailSubmitted
									? null
									: { content: 'Please enter valid email', pointing: 'below' }
							}
							placeholder="Email"
							type="text"
							onChange={(event) => {
								setEmail(event.target.value);
								setIsEmailSubmitted(false);
							}}
						/>
						{passwordInput}
						<Button className={styles.continueButton}>Continue</Button>
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
	);
};

export default LoginPage;
