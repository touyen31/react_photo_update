import React, { Component } from 'react'
import { GridList, GridListTile } from '@material-ui/core'

const style = {
    list_root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    gridList: {
        width: 1200,
        height: '100%'
    }
}

export default class List extends Component {
    state = {
        current: null
    }

    onMouseEnter = (i) => {
        this.setState({
            current: i
        })
    }

    onMouseLeave = () => {
        this.setState({
            current: null
        })
    }

    render() {
        const { tileData } = this.props;
        return (
            <div style={style.list_root}>
                <GridList cellHeight={300} cols={3} style={style.gridList}>
                    {tileData.map((tile, index) => (
                        <GridListTile key={tile.id} onMouseEnter={() => this.onMouseEnter(index)} onMouseLeave={this.onMouseLeave} onClick={() => this.props.history.push(`/photo/${tile.id}`)}>
                            <div style={{ backgroundImage: `url(${tile.url_n})`, backgroundSize: 'cover', width: 400, height: 300, backgroundPosition: 'center' }}>
                                {this.state.current === index && <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: 10, width: 400, height: '100%', background: 'linear-gradient(0deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)', justifyContent: 'flex-end' }}>
                                    <h4 style={{ color: 'white' }}>{tile.title}</h4>
                                    <div style={{ color: 'white' }}>Owner: {tile.ownername}</div>
                                    <div style={{ color: 'white' }}>Views: {tile.views}</div>
                                </div>}
                            </div>
                        </GridListTile>
                    ))}
                </GridList>
            </div>
        )
    }
}
