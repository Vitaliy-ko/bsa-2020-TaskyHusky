import * as React from 'react';
import { Route, Redirect, RouteProps, RouteComponentProps } from 'react-router-dom';

interface Props extends RouteProps {
	restricted: boolean;
	component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
}

const PublicRoute = (props: Props) => {
	const { restricted, component: Component, ...rest } = props;
	const isAuthorized = false;

	return (
		<Route
			{...rest}
			render={(props) => (isAuthorized && restricted ? <Redirect to="/" /> : <Component {...props} />)}
		/>
	);
};

export default PublicRoute;
