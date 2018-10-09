import React, { Component } from "react";
import { Input } from "@material-ui/core";
import axios from "axios";
import handleScroll from "../modules/handleScroll";
import List from "./List";

export default class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: props.location.search.substr(3) || "",
            page: 1,
            perPage: 20,
            maxPage: null,
            photos: []
        };
        document.title = "Photos | Search";
        this.loadmore = this.loadmore.bind(this);
        this.handleScroll = handleScroll(this.loadmore);
    }

    handleChangeText = e => {
        this.props.location.search = "?q=" + e;
        this.setState({
            search: e.target.value
        });
    };

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
        if (this.state.search !== "")
            this.search();
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    async loadmore() {
        let res;
        const { search, perPage, page, maxPage, photos } = this.state;
        if (page > maxPage) return;
        try {
            res = await axios(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=ac9fd35025c930e3ea8d613813e10434&tags=${search}&extras=owner_name%2Curl_n%2Cviews&per_page=${perPage}&page=${page + 1}&format=json&nojsoncallback=1`);
            let data = res.data;
            this.setState({
                maxPage: data.photos.pages,
                photos: photos.concat(data.photos.photo),
                page: data.photos.page
            });
        } catch (error) {
            console.error(error)
        }
    };

    search = async () => {
        const { search, perPage } = this.state;
        let res;
        try {
            res = await axios(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=ac9fd35025c930e3ea8d613813e10434&tags=${search}&extras=owner_name%2Curl_n%2Cviews&per_page=${perPage}&page=1&format=json&nojsoncallback=1`);
            let data = res.data;
            this.setState({
                maxPage: data.photos.pages,
                photos: data.photos.photo,
            });
        } catch (error) { }
    };

    handleKeyUp = e => {
        if (e.keyCode !== 13) return;

        this.search();
    };
    render() {
        return (
            <div>
                <div style={{ display: "flex", justifyContent: "center", flexGrow: 1, marginBottom: 10 }}>
                    <Input
                        placeholder="Search…"
                        disableUnderline
                        value={this.state.search}
                        style={{
                            backgroundColor: "#d3d3d3",
                            width: "40%",
                            borderRadius: 20,
                            paddingLeft: 10
                        }}
                        onChange={this.handleChangeText}
                        onKeyUp={this.handleKeyUp}
                    />
                </div>
                <List tileData={this.state.photos} history={this.props.history}/>
            </div>
        );
    }
}
