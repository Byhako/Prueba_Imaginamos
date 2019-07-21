import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router-dom'
import swal from '@sweetalert/with-react'
import { connect } from 'react-redux'
import $ from 'jquery'

import { Container, Form, FormGrup, Label, Lista, Item,
  InputTask, Button, Title, NewTask} from '@/styles'

class List extends Component {
  constructor(props) {
    super(props)
    this.task = ''
    
    this.state = {
      tasks: this.props.tasks[this.props.user]
    }
  }

  changeTask = (e) => this.task = e.target.value

  handleBtnAdd = (e) => {
    e.preventDefault()
    if (this.task) {
      $('#form-newTask').trigger("reset")
      let tasks = this.state.tasks.slice()
      tasks.push(this.task)
      const data = [tasks, this.props.user]
      this.props.dispatch({ type: 'SET_TASK', data })
      this.setState({tasks})
    }
  }

  handleBtnExit = () => {
    this.props.dispatch({ type: 'SET_LOGIN', login: false })
    this.props.dispatch({ type: 'SET_USER', user: '' })
  }

  handleDelete = (e) => {
    const index = e.target.dataset.index
    let tasks = this.state.tasks.slice()
    let task = tasks[index]

    swal({
      title: "¿Estas seguro?",
      text: `Vas a borrar la tarea "${task}".`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        tasks.splice(index, 1)

        const data = [tasks, this.props.user]
        this.props.dispatch({ type: 'SET_TASK', data })
        this.setState({tasks})
      
        swal("Poof! La tarea ha sido borrada!", {
          icon: "success",
        });
      } else {
        swal("No se borró la tarea.")
      }
    })
  }

  render () {
    return (
      <Fragment>
        {!this.props.login ? (
          <Redirect to='/' />
        ) : (
          <Container>
            <Button onClick={this.handleBtnExit}>Salir</Button>
            <Title task>Tareas de {this.props.user.split('@')[0]}</Title>
            <NewTask>
              <Form id='form-newTask'>
                <FormGrup row>
                  <Label htmlFor='newTask'>Tarea</Label>
                  <InputTask 
                    type="text" id="newTask" 
                    placeholder=""
                    onChange={this.changeTask}
                  />
                  <Button onClick={this.handleBtnAdd}>Agregar</Button>
                </FormGrup>
              </Form>
            </NewTask>
            
            <Lista>
              {this.state.tasks.map((item, index) => (
                <Item key={index}>
                  {item}
                  <i
                    className="far fa-trash-alt"
                    data-index={index}
                    onClick={this.handleDelete}
                    style={{position: 'absolute', right: '10px',top: '10px', cursor: 'pointer'}}
                  />
                </Item>
              ))}
            </Lista>
          </Container>
        )}
      </Fragment>
    )
  }
}

function mapStateToProps (state, props) {
  return {
    login: state.login,
    user: state.user,
    tasks: state.tasks
  }
}

export default connect(mapStateToProps)(List)
