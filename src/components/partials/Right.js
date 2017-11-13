import React, { Component } from 'react'
import styled from 'styled-components'
import { createObserver } from 'dop'
import { Router, Route } from '/doprouter/react'


import state from '/store/state'
import { getAsset, isAssetRegistered } from '/store/getters'
import { BTC } from '/api/Assets'
import styles from '/const/styles'
import routes from '/const/routes'

// Styled
import { RightContainer, RightContainerMiddle } from '/components/styled/Right'
import Message from '/components/styled/Message'

// Views
import Dashboard from '/components/views/Dashboard'
import AddAsset from '/components/views/AddAsset'
import CreateBTC from '/components/views/CreateBTC'
import ImportBTC from '/components/views/ImportBTC'
import CreateETH from '/components/views/CreateETH'
import ImportETH from '/components/views/ImportETH'
import ViewBTC from '/components/views/BTC/'
import ViewETH from '/components/views/ETH/'

export default class Right extends Component {
    componentWillMount() {
        this.observer = createObserver(mutations => this.forceUpdate())
        this.observer.observe(state, 'totalAssets')
        this.observer.observe(state.location, 'pathname')
    }
    componentWillUnmount() {
        this.observer.destroy()
    }
    shouldComponentUpdate() {
        return false
    }

    render() {
        const asset = getAsset(state.location.path[1])
        const symbol = (asset !== undefined) ? asset.symbol : false
        console.log( symbol );
        return React.createElement(RightTemplate, {
            location: state.location,
            totalAssets: state.totalAssets,
            isRegistered: isAssetRegistered(state.location.path[1]),
            symbol: symbol
        })            
    }
}


function RightTemplate({
    location,
    totalAssets,
    isRegistered,
    symbol,
}) {
    return (
        <RightContainer>
            <Router source={location}>
                <Route pathname="/" if={totalAssets===0}>
                    <RightContainerMiddle>
                        <Message>Add or Import assets to start working</Message>
                    </RightContainerMiddle>
                </Route>
                <Route pathname="/">
                    <Dashboard />
                </Route>
                <Route pathname={routes.add()}>
                    <AddAsset />
                </Route>
                <Route pathname={routes.createbtc()}>
                    <CreateBTC />
                </Route>
                <Route pathname={routes.importbtc()}>
                    <ImportBTC />
                </Route>
                <Route pathname={routes.createeth()}>
                    <CreateETH />
                </Route>
                <Route pathname={routes.importeth()}>
                    <ImportETH />
                </Route>
                <Route path-0="asset" if={isRegistered && symbol==='BTC'}>
                    <ViewBTC />
                </Route>
                <Route path-0="asset" if={isRegistered && symbol==='ETH'}>
                    <ViewETH />
                </Route>
                <Route>
                    <RightContainerMiddle>
                        <Message>Not found</Message>
                    </RightContainerMiddle>
                </Route>

            </Router>
        </RightContainer>
    )
}
