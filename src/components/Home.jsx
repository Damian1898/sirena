import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import Divider from '@material-ui/core/Divider';
import MenuIcon from '@material-ui/icons/Menu';
import { mailFolderListItems } from '../components/titleData';
import TextField from '@material-ui/core/TextField';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import emails from '../data/MOCK_DATA';

const drawerWidth = 240;

const styles = theme => ({
	root: {
		flexGrow: 1,
		height: 440,
		zIndex: 1,
		overflow: 'hidden',
		position: 'relative',
		display: 'flex',
		width: '100%',
	},
	appBar: {
		position: 'absolute',
		marginLeft: drawerWidth,
		[theme.breakpoints.up('md')]: {
			width: `calc(100% - ${drawerWidth}px)`,
		},
	},
	navIconHide: {
		[theme.breakpoints.up('md')]: {
			display: 'none',
		},
	},
	toolbar: theme.mixins.toolbar,
	drawerPaper: {
		width: drawerWidth,
		[theme.breakpoints.up('md')]: {
			position: 'relative',
		},
	},
	content: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.default,
		padding: theme.spacing.unit * 3,
	},
});

class HomeComponent extends Component {

	componentWillMount() {

	}
	constructor(props) {
		super(props);

		this.state = {
			emails,
			emailsSearch: this.paginator(emails)
		}

		this.handleSearch = this.handleSearch.bind(this);
	}

	paginator(items, page = 1, perPage = 20) {
		const offset = (page - 1) * perPage;
		const paginatedItems = items.slice(offset).slice(0, perPage);
		const totalPages = Math.ceil(items.length / perPage);
		return {
			page: page,
			perPage: perPage,
			prePage: page - 1 ? page - 1 : null,
			nextPage: (totalPages > page) ? page + 1 : null,
			total: items.length,
			totalPages: totalPages,
			data: paginatedItems
		};
	}

	handleSearch(event) {
		const { value } = event.target;
		const newEmails = this.paginator(this.state.emails.filter(email => `${email.firstName} ${email.lastName}`.includes(value)));
		this.setState(Object.assign(this.state, {
			searchText: value,
			emailsSearch: newEmails
		}));
	}

	render() {
		const { classes, theme } = this.props;

		const drawer = (
			<div>
				<div className={classes.toolbar} />
				<Divider />
				<List>{mailFolderListItems}</List>
			</div>
		);

		return (
			<div className={classes.root}>
				<AppBar className={classes.appBar}>
					<Toolbar>
						<IconButton
							color="inherit"
							aria-label="Open drawer"
							onClick={this.handleDrawerToggle}
							className={classes.navIconHide}
						>
							<MenuIcon />
						</IconButton>
						<Typography variant="title" color="inherit" noWrap>
							<TextField
								fullWidth
								onChange={this.handleSearch}
								placeholder='Search'
								style={{ color: '#FFF' }}
							/>
						</Typography>
					</Toolbar>
				</AppBar>
				<Hidden mdUp>
					<Drawer
						variant="temporary"
						anchor={theme.direction === 'rtl' ? 'right' : 'left'}
						onClose={this.handleDrawerToggle}
						classes={{
							paper: classes.drawerPaper,
						}}
						ModalProps={{
							keepMounted: true, // Better open performance on mobile.
						}}
					>
						{drawer}
					</Drawer>
				</Hidden>
				<Hidden smDown implementation="css">
					<Drawer
						variant="permanent"
						open
						classes={{
							paper: classes.drawerPaper,
						}}
					>
						{drawer}
					</Drawer>
				</Hidden>
				<main className={classes.content}>
					<div className={classes.toolbar} />
					<Typography
						noWrap
						style={{ height: '440px', overflow: 'scroll' }}
					>
						<List>
							{this.state.emailsSearch.data.map((email) => (
								<div>
									<ListItem button>
										<Avatar>
											<ImageIcon />
										</Avatar>
										<ListItemText primary={`${email.firstName} ${email.lastName}`} secondary={`${email.message}`} />
									</ListItem>
									<Divider inset component="li" />
								</div>
							))}
							
						</List>
					</Typography>
				</main>
			</div>
		);
	}
}

HomeComponent.propTypes = {
	classes: PropTypes.object.isRequired,
	theme: PropTypes.object.isRequired,
	emails: PropTypes.array,
};

export default withStyles(styles, { withTheme: true })(HomeComponent);