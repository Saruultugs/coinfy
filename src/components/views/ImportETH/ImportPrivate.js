import React, { Component } from 'react'
import styled from 'styled-components'
import { createObserver, collect } from 'dop'

import { minpassword } from '/api/crypto'
import { setHref, createAsset, setPrivateKey } from '/store/actions'
import state from '/store/state'

import { isPrivateKey, getAddressFromPrivateKey } from '/api/Coins/ETH'
import { isAssetRegistered } from '/store/getters'
import { Coins, getCoinId } from '/api/Coins'

import styles from '/const/styles'
import routes from '/const/routes'

import Input from '/components/styled/Input'
import Password from '/components/styled/Password'
import Button from '/components/styled/Button'
import Help from '/components/styled/Help'
import { Label, SubLabel } from '/components/styled/Label'
import {
    FormField,
    FormFieldLeft,
    FormFieldRight,
    FormFieldButtons
} from '/components/styled/Form'

export default class ImportPrivate extends Component {
    componentWillMount() {
        this.observer = createObserver(m => this.forceUpdate())
        this.observer.observe(state.view)

        const collector = collect()
        state.view.is_valid_input = false
        state.view.private_input = ''
        state.view.private_input_error = ''
        state.view.private_password = ''
        state.view.private_repassword = ''
        collector.destroy()

        const symbol = state.location.path[state.location.path.length - 1]
        this.Coin = Coins.hasOwnProperty(symbol) ? Coins[symbol] : Coins.ETH

        this.onChangeInput = this.onChangeInput.bind(this)
        this.onChangePassword = this.onChangePassword.bind(this)
        this.onChangeRepassword = this.onChangeRepassword.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }
    componentWillUnmount() {
        this.observer.destroy()
    }
    shouldComponentUpdate() {
        return false
    }

    onChangeInput(e) {
        const collector = collect()
        const value = e.target.value.trim()
        state.view.private_input = value
        if (isPrivateKey(value)) {
            try {
                const address = getAddressFromPrivateKey(value)
                state.view.address = address

                if (
                    isAssetRegistered(
                        getCoinId({
                            symbol: this.Coin.symbol,
                            address: address
                        })
                    )
                ) {
                    state.view.private_input_error =
                        'You already have this asset'
                    state.view.is_valid_input = false
                } else {
                    state.view.private_input_error = ''
                    state.view.is_valid_input = true
                }
            } catch (e) {
                state.view.address = ''
                state.view.is_valid_input = false
                state.view.private_input_error = 'Invalid private key'
                console.error(e)
            }
        } else {
            state.view.address = ''
            state.view.private_input_error = 'Invalid private key'
            state.view.is_valid_input = false
        }

        collector.emit()
    }

    onChangePassword(e) {
        state.view.private_password = e.target.value
    }
    onChangeRepassword(e) {
        state.view.private_repassword = e.target.value
    }

    onSubmit(e) {
        e.preventDefault()
        const collector = collect()
        const address = state.view.address
        const asset = createAsset(this.Coin.type, this.Coin.symbol, address)
        const asset_id = getCoinId({ symbol: this.Coin.symbol, address })
        setPrivateKey(
            asset_id,
            state.view.private_input,
            state.view.private_password
        )
        setHref(routes.asset(asset_id))
        collector.emit()
    }

    get isInvalidRepassword() {
        return (
            state.view.private_password.length > 0 &&
            state.view.private_repassword.length > 0 &&
            state.view.private_password.length ===
                state.view.private_repassword.length &&
            state.view.private_password !== state.view.private_repassword
        )
    }

    get isValidForm() {
        return (
            state.view.is_valid_input &&
            state.view.private_password.length >= minpassword &&
            state.view.private_password === state.view.private_repassword
        )
    }

    render() {
        return React.createElement(ImportPrivateTemplate, {
            private_input: state.view.private_input,
            private_input_error: state.view.private_input_error,
            private_password: state.view.private_password,
            private_repassword: state.view.private_repassword,
            isValidForm: this.isValidForm,
            isInvalidRepassword: this.isInvalidRepassword,
            onChangeInput: this.onChangeInput,
            onChangePassword: this.onChangePassword,
            onChangeRepassword: this.onChangeRepassword,
            onSubmit: this.onSubmit
        })
    }
}

function ImportPrivateTemplate({
    private_input,
    private_input_error,
    private_password,
    private_repassword,
    isValidForm,
    isInvalidRepassword,
    onChangeInput,
    onChangePassword,
    onChangeRepassword,
    onSubmit
}) {
    return (
        <div>
            <FormField>
                <FormFieldLeft>
                    <Label>Private key</Label>
                    <SubLabel>Type or paste your private key.</SubLabel>
                </FormFieldLeft>
                <FormFieldRight>
                    <Input
                        width="100%"
                        value={private_input}
                        onChange={onChangeInput}
                        error={private_input_error}
                        invalid={
                            private_input_error && private_input.length > 0
                        }
                    />
                </FormFieldRight>
            </FormField>

            <FormField>
                <FormFieldLeft>
                    <Label>Password</Label>
                    <Help>
                        Make sure that you remember this. This password can't be
                        restored because we don't store it. For security reasons
                        you will be asked often for this password.
                    </Help>
                    <SubLabel>
                        This password encrypts your private key.
                    </SubLabel>
                </FormFieldLeft>
                <FormFieldRight>
                    <Password
                        minlength={minpassword}
                        value={private_password}
                        onChange={onChangePassword}
                        width="100%"
                        type="password"
                    />
                </FormFieldRight>
            </FormField>

            <FormField>
                <FormFieldLeft>
                    <Label>Repeat Password</Label>
                </FormFieldLeft>
                <FormFieldRight>
                    <Input
                        minlength={minpassword}
                        error={'Passwords do not match'}
                        invalid={isInvalidRepassword}
                        value={private_repassword}
                        onChange={onChangeRepassword}
                        width="100%"
                        type="password"
                    />
                </FormFieldRight>
            </FormField>

            <FormField>
                <FormFieldButtons>
                    <Button
                        width="100px"
                        disabled={!isValidForm}
                        onClick={onSubmit}
                    >
                        Import
                    </Button>
                </FormFieldButtons>
            </FormField>
        </div>
    )
}
