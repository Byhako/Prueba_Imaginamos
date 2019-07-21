import React, { Component, Fragment } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import $ from 'jquery'

import { Container, Form, FormGrup, Label, ContainerForm,
  Input, Button, ErrorMessage, Title } from '@/styles'

class Home extends Component {
  constructor(props) {
    super(props)
    this.email = ''
    this.password = ''
    this.state = {
      error: false
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

  handleBtnEnter = (e) => {
    e.preventDefault()
    const users = this.props.users

    if (this.email in users) {
      if (this.password === users[this.email].password) {
        this.props.dispatch({ type: 'SET_LOGIN', login: true })
        this.props.dispatch({ type: 'SET_USER', user: this.email })
      } else {
        this.setState({error: true})
      }
    } else {
      this.setState({error: true})
    }
  }

  render () {
    return (
      <Fragment>
        {this.props.login ? (
          <Redirect to='/list' />
        ) : (
          <Container>
            <Title>Todo List</Title>
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
                <FormGrup row>
                  <Button onClick={this.handleBtnEnter}>Ingresar</Button>
                  <Link to='/create' style={{marginLeft: 'auto'}}>
                    <Button left>Crear cuenta</Button>
                  </Link>
                </FormGrup>
                {this.state.error &&
                  <ErrorMessage>Acceso denegado</ErrorMessage>
                }
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
    login: state.login,
    users: state.users
  }
}

export default connect(mapStateToProps)(Home)
