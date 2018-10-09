import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import TopBar from './components/TopBar';
import Explore from './components/Explore'
import Search from './components/Search';
import PhotoDetail from './components/PhotoDetail';
export default class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Route path='*' component={TopBar} />
                    <div style={{ marginTop: 70 }}>
                        <Route path='/' exact component={Explore} />
                        <Route path='/search' exact component={Search} />
                        <Route path='/photo/:id' exact component={PhotoDetail}/>
                    </div>
                </div>
            </BrowserRouter>
        )
    }
}
