import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import MenuIcon from '@material-ui/icons/Menu';
import TextField from '@material-ui/core/TextField';
import emails from '../data/MOCK_DATA';

const drawerWidth = 240;

const styles = theme => ({
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
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
    },
});

class ListMessagesComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            emails,
            emailsSearch: this.paginator(emails),
            qEmails: 20,
            searchText: ''
        }

        this.handleSearch = this.handleSearch.bind(this);
        this.handleOnScroll = this.handleOnScroll.bind(this);
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
        this.setState(Object.assign(this.state, {
            searchText: value,
            qEmails: 20
        }));
        this.searchEmails();
    }

    searchEmails() {
        const newEmails = this.paginator(this.state.emails.filter(
            email => `${email.firstName} ${email.lastName}`.includes(this.state.searchText)
        ), 1, this.state.qEmails);
        this.setState(Object.assign(this.state, {
            emailsSearch: newEmails,
            loading: false
        }));
    }

    handleOnScroll(e) {
        const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;

        if (bottom && ((this.state.qEmails + 20) <= this.state.emails.length)) {
            this.setState(Object.assign(this.state, {
                loading: true,
                qEmails: this.state.qEmails + 20
            }));
            this.searchEmails();
        }
    }

    render() {
        const { classes } = this.props;
        
        const viewEmail = (id) => {
            document.location.assign(`/read/${id}`);
        }

        return (
            <div>
                <div className={classes.toolbar}>
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
                </div>
                <Typography
                    noWrap
                    style={{ height: '440px', overflow: 'scroll' }}
                    onScroll={this.handleOnScroll}
                >
                    <List>
                        {this.state.emailsSearch.data.map((email) => (
                            <div>
                                <ListItem 
                                    button
                                    onClick={() => viewEmail(email.id)}
                                >
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
            </div>
        )
    }
}

export default withStyles(styles, { withTheme: true })(ListMessagesComponent);