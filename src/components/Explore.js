import React, { Component } from 'react'
import handleScroll from '../modules/handleScroll';
import axios from 'axios';
import List from './List';

export default class Explore extends Component {
    constructor(props) {
        super(props);
        this.state = {
            photos: [],
            perPage: 20,
            maxPage: null,
            page: 1
        }
        document.title = "Photos | Explore"
        this.loadMore = this.loadMore.bind(this);
        this.handleScroll = handleScroll(this.loadMore);
    }
    async componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
        const { perPage } = this.state;
        let res;
        try {
            res = await axios.get(`https://api.flickr.com/services/rest/?method=flickr.interestingness.getList&api_key=ac9fd35025c930e3ea8d613813e10434&extras=owner_name%2Curl_n%2Cviews&per_page=${perPage}&page=1&format=json&nojsoncallback=1`)
            const data = res.data;
            this.setState({
                photos: data.photos.photo,
                maxPage: data.photos.pages
            })
        } catch (error) {
            console.error(error)
        }

    }

    async componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    async loadMore() {
        const { photos, page, perPage, maxPage } = this.state;
        if (page > maxPage) return;
        let res;
        try {
            res = await axios.get(`https://api.flickr.com/services/rest/?method=flickr.interestingness.getList&api_key=ac9fd35025c930e3ea8d613813e10434&extras=owner_name%2Curl_n%2Cviews&per_page=${perPage}&page=${page}&format=json&nojsoncallback=1`)
            const data = res.data;
            this.setState({
                photos: photos.concat(data.photos.photo),
                maxPage: data.photos.pages,
                page: data.photos.page
            })
        } catch (error) {
            console.error(error)
        }
    }
    render() {
        console.log(this.state.photos)
        return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <List tileData={this.state.photos} history={this.props.history}/>
            </div>
        )
    }
}
