import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import emails from '../data/MOCK_DATA';

class MessageComponent extends Component {

	constructor(props) {
		super(props);
		const { id } = this.props.match.params;

		this.state = {
			id,
			emails,
			emailSearch: emails.filter(
				email => (email.id == id)
			)
		}
	}

	render() {

		return (
			<Card>
				<CardActionArea>
					<CardContent>
						<Typography gutterBottom variant="headline" component="h2">
							{this.state.emailSearch[0].subject}
						</Typography>
						<Typography component="p">
							{this.state.emailSearch[0].message}
						</Typography>
					</CardContent>
				</CardActionArea>
			</Card>
		)
	}
}

export default MessageComponent;