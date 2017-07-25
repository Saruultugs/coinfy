import React, { Component } from 'react'
import styled from 'styled-components'


import IconMore from 'react-icons/lib/md/more-vert'

// import { register, createObserver } from 'dop'
// import cipher from 'browserify-cipher'
// import bignumber from 'bignumber.js'
// import bitcoin from 'bitcoinjs-lib'
// import QRCode from 'qrcode.react'


export default function App() {
    return (
        <Background>
                <Header>
                    <HeaderContent>
                        <HeaderLeft>Logo</HeaderLeft>
                        <HeaderCenter>
                            <HeaderCrypto>BTC / <strong>$2521.3</strong></HeaderCrypto>
                            <HeaderCrypto>ETH / <strong>$152.3</strong></HeaderCrypto>
                            <HeaderCrypto>LTC / <strong>$42.5</strong></HeaderCrypto>
                        </HeaderCenter>
                        <HeaderRight>
                            <div onClick={()=>alert(1)}>
                            <HeaderCurrencySelected>USD</HeaderCurrencySelected>
                            <Arrow />
                            </div>
                        </HeaderRight>
                    </HeaderContent> 
                </Header>
                <Columns>
                    <ColumnLeft>
                        <ColumnLeftHeader>
                            <ColumnLeftHeaderLeft>
                                <IconMore size={35} color={styles.color.front2} />
                            </ColumnLeftHeaderLeft>
                            <ColumnLeftHeaderRight></ColumnLeftHeaderRight>
                        </ColumnLeftHeader>
                        <ColumnLeftChart>
                            <ColumnLeftChartText>
                                $2521
                            </ColumnLeftChartText>
                            <ColumnLeftChartChart>
                                <svg width="100%" height="100%" viewBox="0 0 42 42" class="donut">
                                    <circle class="donut-hole" cx="21" cy="21" r="15.91549430918954" fill="#fff"></circle>
                                    <circle class="donut-ring" cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#d2d3d4" stroke-width="2"></circle>
                                    <circle class="donut-segment" cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#f5922f" stroke-width="2"></circle>
                                </svg>
                            </ColumnLeftChartChart>
                        </ColumnLeftChart>
                    </ColumnLeft>
                    <ColumnRight>ColumnRight</ColumnRight>
                </Columns>
                <Footer></Footer>
        </Background>
    )
}

const styles = {
    paddingOut: '50px',
    leftColumn: '250px',
    columnSeparation: '20px',
    headerHeight: '75px',
    color: {
        background: '#f3f6f8',
        front1: '#8b9bae',
        front2: '#becad9',
    }
}


const Background = styled.div`
background-color:${styles.color.background};
height:100%;
`

const Footer = styled.div`
height: ${styles.paddingOut};
padding: 0 ${styles.paddingOut};
`

const Header = styled.div`
height: ${styles.headerHeight};
padding: 0 ${styles.paddingOut};
`
const HeaderContent = styled.div`
padding-top:25px;
`
const HeaderLeft = styled.div`
width: ${styles.leftColumn};
float:left;
text-align:center;
`
const HeaderCenter = styled.div`
width: calc(100% - ${styles.leftColumn} - 100px);
float:left;
text-align: center;
`
const HeaderRight = styled.div`
width: 100px;
float: Left;
text-align: right;
position: relative;
`


const HeaderCrypto = styled.span`
font-size: 13px;
letter-spacing: .2px;
color: ${styles.color.front1};
padding-right: 25px;
font-weight:300;
`

const HeaderCurrencySelected = styled.span`
font-size: 14px;
color: ${styles.color.front1};
font-weight:bold;
padding-right:4px;
`




const Columns = styled.div`
height: calc(100% - ${styles.headerHeight} - ${styles.paddingOut});
padding: 0 ${styles.paddingOut};
`

const ColumnLeft = styled.div`
position: relative;
height: 100%;
width: ${styles.leftColumn};
background: white;
float: left;
border-radius: 5px;
box-shadow: 0 0 3px 2px rgba(205,213,218,.4);
border: 1px solid rgba(205,213,218,.7);
`

const ColumnRight = styled.div`
height: 100%;
width: calc(100% - ${styles.leftColumn} - ${styles.columnSeparation});
background: white;
float: right;
border-radius: 5px;
box-shadow: 0 0 3px 2px rgba(205,213,218,.4);
border: 1px solid rgba(205,213,218,.7);
`



const ColumnLeftHeader = styled.div`
position:absolute;
`
const ColumnLeftHeaderLeft = styled.div`
float:left;
padding-left: 5px;
padding-top: 10px;
`
const ColumnLeftHeaderRight = styled.div`
float:right;
`

const ColumnLeftChart = styled.div`
`
const ColumnLeftChartChart = styled.div`
`

const ColumnLeftChartText = styled.div`
    position: absolute;
    text-align: center;
    width: 100%;
    /* height: 100%; */
    padding-top: 100px;
    font-weight: 900;
    font-size: 4vw;
    color: #5a6168;
`











// Reusables


const Arrow = styled.span`
display: inline-block;
vertical-align: middle;
border-left: 6px solid transparent;
border-right: 6px solid transparent;
border-top: 7px solid ${styles.color.front1};
margin-top: -2px;
`