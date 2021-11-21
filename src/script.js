const { ipcRenderer } = require('electron')
window.onload = () => {
  class Calculator {
    constructor() {
      this.numbers = ''
      this.result = ''
      this.operation = ''
    }

    setNumbers = (...numbers) => { this.numbers = numbers }

    performOperation = operation => {
      this.result = eval(this.numbers.join(operation))
      this.operation = operation
      return {
        numbers: this.numbers,
        operation: operation,
        result: this.result,
      }
    }

    add = () => this.performOperation('+')
    subtract = () => this.performOperation('-')
    multiply = () => this.performOperation('*')
    divide = () => this.performOperation('/')
  }

  const firstNumberElement = document.getElementById('firstNumber')
  const secondNumberElement = document.getElementById('secondNumber')
  const resultElement = document.getElementById('result')
  const calculator = new Calculator()

  const operationListener = button => {
    const firstNumber = firstNumberElement.value
    const secondNumber = secondNumberElement.value
    calculator.setNumbers(firstNumber, secondNumber)
    const response = calculator[button.id]()
    resultElement.innerText = response.result
    ipcRenderer.send('SAVE_DATA', response)
  }

  const operationButtons = Array.from(document.getElementsByClassName('button-operation'))
  operationButtons.forEach(button => {
    try {
      button.removeEventListener('click', () => operationListener(button))
    } catch (error) {
      console.log(`error`, error)
    }
    button.addEventListener('click', () => operationListener(button))
  })

  window.onbeforeunload = () => {
    operationButtons.forEach(button => {
      button.removeEventListener('click', () => operationListener(button))
    })
  }
}