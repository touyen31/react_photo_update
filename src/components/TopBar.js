import React, { Component } from "react";

import { AppBar, Toolbar, Typography, Button } from '@material-ui/core'
export default class TopBar extends Component {
  render() {
    return (
      <div style={{flexGrow: 1}}>
        <AppBar position="fixed">
          <Toolbar>
            <Typography variant="title" color="inherit" style={{flexGrow: 1}}>
              Photos
            </Typography>
            <Button color="inherit" onClick={() => this.props.history.push('/')}>Explore</Button>
            <Button color="inherit" onClick={() => this.props.history.push('/search')}>Search</Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}
