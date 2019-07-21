import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import $ from 'jquery'

import actions from '@/actions'
import { Container, Form, FormGrup, Label, ContainerForm,
  Input, Button, ErrorMessage, Title } from '@/styles'


class CreateUser extends Component {
  constructor(props) {
    super(props)
    this.email = ''
    this.password = ''
    this.password2 = ''
    this.state = {
      messageError: ''
    }
  }
  
  changePassword = (e) => this.password = e.target.value

  changeEmail = (e) => {
    $('#InputEmail').css({color: 'red'})
    const value = e.target.value

    // Verifico si el email tiene formato correcto
    const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    const isValid = emailRegex.test(value)

    if (isValid) {
      $('#InputEmail').css({color: 'black'})
      this.email = value
    } else {
      this.email = false
    }
  }

  changePassword2 = (e) => {
    this.password2 = e.target.value
    // Verifico si las contraseñas coinciden
    if (this.password === this.password2) {
      $('#InputPassword').css({color: 'black'})
      $('#InputPassword2').css({color: 'black'})
    } else {
      $('#InputPassword').css({color: 'red'})
      $('#InputPassword2').css({color: 'red'})
    }
  }

  handleBtnCreate = (e) => {
    e.preventDefault()

    if (this.email in this.props.users) {
      this.setState({messageError: 'Correo ya registrado'})
      return 0
    }

    if (this.password === this.password2 && this.email) {
      this.setState({messageError: ''})
      this.props.dispatch(actions.register(this.email, this.password))
      this.props.dispatch({ type: 'SET_USER', user: this.email })
    } else if (!this.email) {
      this.setState({messageError: 'Correo incorrecto!'})
    } else {
      this.setState({messageError: 'Las contraseñas no coinciden!'})
    }
  }

  render () {
    return (
      <Fragment>
        {this.props.login ? (
          <Redirect to='/list' />
        ) : (
          <Container>
            <Title>Crear Cuenta</Title>
            <ContainerForm>
              <Form>
                <FormGrup>
                  <Label htmlFor="InputEmail">Usuario</Label>
                  <Input 
                    type="email" id="InputEmail" 
                    placeholder="email"
                    onChange={this.changeEmail}
                  />
                </FormGrup>
                <FormGrup>
                  <Label htmlFor="InputPassword">Contraseña</Label>
                  <Input 
                    type="password" id="InputPassword" 
                    placeholder="••••••••••"
                    onChange={this.changePassword}
                  />
                </FormGrup>
                <FormGrup>
                  <Label htmlFor="InputPassword2">Confirmar contraseña</Label>
                  <Input 
                    type="password" id="InputPassword2" 
                    placeholder="••••••••••"
                    onChange={this.changePassword2}
                  />
                </FormGrup>
                <FormGrup row>
                  <Button onClick={this.handleBtnCreate}>Crear</Button>
                </FormGrup>
                <ErrorMessage>{this.state.messageError}</ErrorMessage>
              </Form>    
            </ContainerForm>
          </Container>
        )}
      </Fragment>
    )
  }
}

function mapStateToProps (state, props) {
  return {
    users: state.users,
    login: state.login
  }
}

export default connect(mapStateToProps)(CreateUser)
