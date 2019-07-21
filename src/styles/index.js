import styled from 'styled-components'

export const Container = styled.div`
  background-color: #212429;
  display: flex;
  flex-direction: column;
  height: 100vh;
`
export const Title = styled.p`
  width: 100%;
  text-align: center;
  color: lavender;
  font-size: ${props => props.task ? '30px' : '50px'};
  margin: ${props => props.task ? '15px 0 0 0' : '50px 0 20px 0'  };
`
export const ContainerForm = styled.div`
  border: 3px solid gray;
  border-radius: 4px;
  margin: auto;
  margin-top: 50px;
  width: 30%;
  background-color: lavender;
  @media (max-width: 800px) {
    width: 40%;
  }
  @media (max-width: 600px) {
    width: 50%;
  }
  @media (max-width: 500px) {
    width: 70%;
  }
`
export const Form = styled.form`
  padding: 20px;
`
export const FormGrup = styled.div`
  display: flex;
  flex-direction: ${props => props.row ? 'row' : 'column'};
  align-items: ${props => props.row ? 'center' : 'inherit'};
`
export const Label = styled.label`
  font-size: 15px;
  margin-bottom: 0;
`
export const Input = styled.input`
  margin-bottom: 10px;
  height: 30px;
`
export const Button = styled.button`
  border: none;
  border-bottom: 2px solid #204A87FF;
  border-radius: 4px;
  background-color: #3465A4FF;
  color: white;
  cursor: pointer;
  height: 30px;
  &:hover { background-color: #4281D3FF;  }
`
export const ErrorMessage = styled.p`
  color: red;
  margin: 0;
  margin-top: 10px;
  text-align: center;
`
// LIST

export const NewTask = styled.div`
  margin: 20px auto;
  border: 1px solid gray;
  border-radius: 4px;
  background-color: lavender;
  width: 60%;
`
export const InputTask = styled(Input)`
  margin: 0 20px;
  width: 75%;
`
export const Lista = styled.ul`
  width: 60%;
  margin: 10px auto;
  padding: 0;
  border: 3px solid gray;
  border-radius: 4px;
`
export const Item = styled.li`
  background-color: lavender;
  border-bottom: 1px solid;
  font-size: 14px;
  padding: 7px 5px;
  position: relative;
  &:first-child {
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }
  &:last-child {
    border-bottom: none;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }
`