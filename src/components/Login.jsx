import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import Container from './Containers/Container';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const Field = styled.div`
	flex: 1 1 auto;
`;

const FormContent = styled.form`
	height: 200px;
	width: 400px;

	display: flex; 
	flex-direction: column;
	flex: 0 0 auto; 

	border: 1px solid; 
	border-radius: 5px;
	padding: 14px;
`;

const FormTitle = styled.div`
	
`;

class LoginComponent extends Component {

	constructor(props) {
		super(props);
		
		this.state = {
			email: '',
			password: ''
		}

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event) {
		const { value, name } = event.target;

		this.setState(Object.assign(this.state, {
			[name]: value,
		}));
	}

	handleSubmit(event) {
		event.preventDefault();
		const { email, password } = this.state;
		document.location.assign('/home');
	}

	render() {

		return (
			<Container>
				<FormContent
					onSubmit={this.handleSubmit}
				>
					<FormTitle>Login</FormTitle>
					<Field>
						<TextField
							fullWidth
							type='email'
							id='email'
							name='email'
							label='Email'
							required
							onChange={this.handleChange}
						/>
					</Field>
					<Field>
						<TextField
							fullWidth
							type='password'
							name='password'
							label='Password'
							id='password'
							required
							onChange={this.handleChange}
						/>
					</Field>
					<Button 
						type='submit' 
						variant="contained" 
						color="primary"
					>
						Login
					</Button>
				</FormContent>
			</Container>
		)
	}
}

export default LoginComponent;