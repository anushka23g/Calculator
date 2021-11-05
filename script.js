class Calculator {
  constructor(prev, curr) {
    this.prev = prev;
    this.curr = curr;
    this.clear();
  }
  //prev is the previous inputted ele

  clear() {
    this.co = '';
    this.po = '';
    this.oper = undefined;
  }

  // co is the currentOperand, oper is operation

  delete() {
    this.co = this.co.toString().slice(0, -1);
  }

  appendNumber(number) {
    this.co = this.co.toString() + number.toString();
  }

  chooseoper(oper) {
    //handling edge cases
    if (this.co === '') return
    if (this.po !== '') {
      this.compute()
    }
    this.oper = oper
    this.po = this.co
    this.co = ''
  }

  compute() {
    let res
    const prev = parseFloat(this.po)
    const current = parseFloat(this.co)
    if (isNaN(prev) || isNaN(current)) return
    switch (this.oper) {
      case '+':
        res = prev + current
        break
      case '-':
        res = prev - current
        break
      case '*':
        res = prev * current
        break
      case '÷':
        res = prev / current
        break
      default:
        return
    }
    this.co = res
    this.oper = undefined
    this.po = ''
  }

  getDisplayNumber(number) {
    const num = number.toString()
    const integerDigits = parseFloat(num.split('.')[0])
    const decimalDigits = num.split('.')[1]
    let integerDisplay
    if (isNaN(integerDigits)) {
      integerDisplay = ''
    } else {
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
  }

  updateDisplay() {
    this.curr.innerText = this.getDisplayNumber(this.co)
    if (this.oper != null) {
      this.prev.innerText =
        `${this.getDisplayNumber(this.po)} ${this.oper}`
    } else {
      this.prev.innerText = ''
    }
  }
}


const numberButtons = document.querySelectorAll('[number]')
const operButtons = document.querySelectorAll('[oper]')
const equalsButton = document.querySelector('[equals]')
const deleteButton = document.querySelector('[delete]')
const allClearButton = document.querySelector('[all-clear]')
const prev = document.querySelector('[previous]')
const curr = document.querySelector('[current]')

const calculator = new Calculator(prev, curr)

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
  })
})

operButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseoper(button.innerText)
    calculator.updateDisplay()
  })
})

equalsButton.addEventListener('click', button => {
  calculator.compute()
  calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
  calculator.clear()
  calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
  calculator.delete()
  calculator.updateDisplay()
})
