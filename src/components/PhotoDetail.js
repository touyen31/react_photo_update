import React, { Component } from 'react'
import axios from 'axios';
import loading from '../images/loading.gif'
export default class PhotoDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            info: null,
            url: null,
            likes: null,
            isLoading: true
        }
    }

    async componentDidMount() {
        let resInfo, resUrl, resLikes;
        const { id } = this.props.match.params;
        try {
            resInfo = await axios(`https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=ac9fd35025c930e3ea8d613813e10434&photo_id=${id}&format=json&nojsoncallback=1`);
            resUrl = await axios(`https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=ac9fd35025c930e3ea8d613813e10434&photo_id=${id}&format=json&nojsoncallback=1`);
            resLikes = await axios(`https://api.flickr.com/services/rest/?method=flickr.photos.getFavorites&api_key=ac9fd35025c930e3ea8d613813e10434&photo_id=${id}&format=json&nojsoncallback=1`);
            this.setState({
                info: resInfo.data.photo,
                url: resUrl.data.sizes.size[6].source,
                likes: resLikes.data.photo.total,
                isLoading: false
            })
        } catch (error) {

        }
    }

    render() {
        if (this.state.isLoading) {
            return  <div style={{ width: '100%', height: 590, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
                    <img src={loading} alt='loading' style={{width: 100, height: 100}}/>
            </div>
        }
        let { tag } = this.state.info.tags;
        let { info } = this.state;
        console.log(info)
        return (
            <div style={{ width: '100%', height: 590, display: 'flex' }}>
                <div style={{ display: 'flex', flex: 3, backgroundColor: '#cecece', justifyContent: 'center', alignItems: 'flex-end', backgroundImage: `url(${this.state.url})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}>

                </div>
                <div style={{ flex: 2, backgroundColor: '#cecece', borderLeftStyle: 'solid', borderLeftWidth: 1, paddingLeft: 10, paddingRight: 10, overflow: 'scroll' }}>
                    <h2>{info.title._content}</h2>
                    <h4>{info.owner.realname ? info.owner.realname : info.owner.username}</h4>
                    <p style={{ borderBottomWidth: 1, borderBottomStyle: 'dotted', paddingBottom: 10 }}>{info.description._content}</p>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'space-around', justifyContent: 'center', marginTop: 10 }}>
                        <div style={{ display: 'flex', flex: 1, flexDirection: 'row' }}>
                            <div style={{ display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                <div>{info.views}</div>
                                <div>lượt xem</div>
                            </div>
                            <div style={{ display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                <div>{this.state.likes}</div>
                                <div>lượt thích</div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            Ngày chụp: {info.dates.taken}
                        </div>
                    </div>
                    <h3>Tags</h3>
                    <div style={{ width: '100%', display: 'grid', gridTemplateColumns: '170px 170px 170px', paddingBottom: 10, justifyContent: 'center' }}>
                        {tag.map((item, index) =>
                            <div key={index} style={{ backgroundColor: '#a4cdfc', borderRadius: 10, marginLeft: 5, marginRight: 5, marginTop: 5, textAlign: 'center', overflow: 'hidden', fontSize: 16 }} onClick={() => this.props.history.push(`/search?q=${item._content}`)}>{item._content}</div>
                        )}
                    </div>
                </div>
            </div>
        )
    }
}
