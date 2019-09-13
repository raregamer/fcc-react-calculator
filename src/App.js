import React from 'react';
import './App.css';
import MainButton from './MainButton';
import Display from './Display';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentValue: '0',
      currentInput: '0',
      hasDecimal: false,
      isOperator: false,
      isNegative: false,
      isNewCalculation: true,
      hasTwoOperators: false,
      totaled: false,
    }

    this.handleChange = this.handleChange.bind(this);
    this.clearState = this.clearState.bind(this);
    this.handleCalculateTotal = this.handleCalculateTotal.bind(this);
    this.precedenceChecker = this.precedenceChecker.bind(this);
    this.operatorCheck = this.operatorCheck.bind(this);
    this.checkForDecimal = this.checkForDecimal.bind(this);
    this.operator = this.operator.bind(this);
  }

  checkForDecimal(currentValue) {
    switch (currentValue) {
      case '.':
        this.setState({
          hasDecimal: true
        });
        break;
      default:
        break;
    }
  }

  operatorCheck(currentValue) {
    switch (currentValue) {
      case '+':
      case '-':
        this.setState({
          isOperator: true,
          hasDecimal: false,
        });
        break;
      case 'x':
      case '/':
        this.setState({
          isOperator: true,
          hasDecimal: false,
          isNegative: false
        });
        break;
      default:
        this.setState({
          isOperator: false,
        });
        break;
    }
  }

  //check if value is an operator.
  operator(value) {
    switch (value) {
      case '+':
      case '-':
      case 'x':
      case '/':
        return 1;
      default:
        return -1;
    }
  };



  precedenceChecker(operator) {
    switch (operator) {
      case '+':
      case '-':
        return 0;
      case 'x':
      case '/':
        return 1;
      default:
        break;
    }
  };

  async handleChange(event) {
    let value = event.target.value;
    //check if decimal in place
    this.checkForDecimal(value);
    if (this.state.hasDecimal && value === '.') {
      return;
    }
    if (this.operator(value) === 1) {
      this.setState({
        hasDecimal: false
      });
    }


    //if more than two operators in a row, change to the current operator inputed. 
    if (this.operator(value) === 1 && this.state.hasTwoOperators) {
      let operatorChangeValue = this.state.currentValue.substring(0, this.state.currentValue.length - 2) + value;
      this.setState({
        currentValue: operatorChangeValue,
      });
      return;
    } else if (this.operator(value) === -1 && this.state.hasTwoOperators) {
      this.setState({
        hasTwoOperators: false
      });
    }

    //check if current input value is an operator. 
    let lastInput = this.state.currentValue[this.state.currentValue.length - 1];
    //check if last input and current input operator and update them if they are.
    if (this.operator(value) === 1 && this.operator(lastInput) === 1) {
      console.log('true operator');
      let currentStateValue = this.state.currentValue;

      if (value === '-' && lastInput !==
        '-') {
        this.setState({
          currentValue: currentStateValue + value,
          hasTwoOperators: true
        });
        //check last 2 inputs if operator

      } else {
        let operatorChangeValue = currentStateValue.substring(0, currentStateValue.length - 1) + value;
        this.setState({
          currentValue: operatorChangeValue,
        });
      }
      return;
    }
    //if negative first value inputed. 
    if (lastInput === '-' && !isNaN(value)) {
      this.setState({
        currentValue: this.state.currentValue + value,
        isNewCalculation: false
      })
      return;
    }

    // Operator check end 

    //Handles multiple 0 case #10
    if (value === '0' && this.state.currentValue[0] === '0' && !this.state.hasDecimal || value === '0' && isNaN(this.state.currentValue[this.state.currentValue.length - 1]) && !this.state.hasDecimal) {
      return;
    }

    //Check if we should be starting a new calculation or using previous value after totalted. 
    if (this.state.totaled && isNaN(parseFloat(value)) && !this.state.continueAfterTotal) {
      this.setState({
        'isNewCalculation': false,
        'totaled': false,
        'continueAfterTotal': true
      });
    };

    if (this.operator(value) === -1) {
      let currentInputTotal = this.state.currentInput === '0' || isNaN(this.state.currentInput) ? value : this.state.currentInput + value;
      this.setState({
        currentInput: currentInputTotal
      });
    } else {
      this.setState({
        currentInput: value
      });
    };
    //if an opperator is pressed, use previous total to calculate, else start new calculation at 0.
    if (this.state.isNewCalculation && isNaN(value)) {
      this.setState({
        'currentValue': this.state.currentValue + value
      });
    } else if (this.state.isNewCalculation && !isNaN(value)) {
      this.setState({
        'currentValue': value,
        'currentInput': value,
        'isNewCalculation': false
      });
    } else {
      this.setState({
        'currentValue': this.state.currentValue + value,
      });
    }

  };

  // Using the The Shunting Yard Algorithm to calculate
  handleCalculateTotal() {
    //NEED TO MAKE STATE CHANGE ONLY ONCE!!!

    //1st step take current values and split them into a user token stack 
    let regEx = new RegExp(/((?<![x/\-+])-|[x/+])/);
    let currentValues = [];
    if (this.state.currentValue.length > 0) {
      currentValues = this.state.currentValue.split(regEx);
    } else {
      currentValues.push(this.state.currentValue);
    }
    console.log(currentValues)
    //spread currentvalues array into a token stack
    let userTokenStack = [...currentValues];
    //setup operator stack and outputstack
    let operatorStack = [];
    let outputStack = [];

    //2nd step go through token stack and split into an output and operator stack
    userTokenStack.forEach(token => {
      let value = parseFloat(token);
      //if token not a number it must be an operator.
      if (isNaN(value)) {
        //if no operators are in the stack yet add the first operator.
        if (operatorStack === undefined || operatorStack.length === 0) {
          operatorStack.push(token);
        }
        else {
          //make a copy of the current operator tokens. 
          let operatorTokens = [...operatorStack];
          //make a copy of the output stack.
          let outputTokens = [...outputStack];
          //get the last output operator to compare with the next operator.
          let lastOperator = operatorTokens.pop();

          //if current operator token greater than the last token operator
          if (this.precedenceChecker(token) <= this.precedenceChecker(lastOperator)) {
            // take the last operator token and push it to the output token stack.
            outputTokens.push(lastOperator);
            // take current token and push it to the operator stack.
            operatorTokens.push(token);
            operatorStack = [...operatorTokens];
            outputStack = [...outputTokens];

            //ELSE push the token to the operator token stack.
          } else {

            operatorTokens.push(lastOperator, token);
            operatorStack = [...operatorTokens];
          }
        }

        //add token which is number to output stack.
      } else {
        outputStack = [...outputStack, token];
      }

    });

    //3rd merge the output stack first then the operator stack. 
    outputStack = [...outputStack, ...operatorStack.reverse()];

    console.log("final order: " + this.state.outputStack);
    //postfix calculator algorithm
    //4th check if tokens are on the output stack
    let leftOperand = null;
    let rightOperand = null;
    let currentTokens = [...outputStack];
    let numberValues = [];
    let totalValue = null;

    for (var i = 0; i < currentTokens.length; i++) {
      if (isNaN(currentTokens[i])) {
        console.log("in here also: " + currentTokens[i]);
        rightOperand = numberValues.pop();
        leftOperand = numberValues.pop();
        switch (currentTokens[i]) {
          case '+':
            totalValue = leftOperand + rightOperand;
            break;
          case '-':
            totalValue = leftOperand - rightOperand;
            break;
          case 'x':
            totalValue = leftOperand * rightOperand;
            break;
          case '/':
            totalValue = leftOperand / rightOperand;
            break;

          default:
            break;

        }
        numberValues.push(totalValue);



      } else {
        numberValues.push(parseFloat(currentTokens[i]));
      }

    }
    if (numberValues[0] === null) {
      numberValues[0] = 0;

    }
    let finalNumber;
    if (numberValues[0] % 1 === 0) {
      finalNumber = numberValues[0].toFixed(0);
    } else {
      finalNumber = Number(numberValues[0].toFixed(4));
    }
    this.clearState();
    this.setState({
      currentValue: finalNumber.toString(),
      currentInput: finalNumber.toString(),
      totaled: true
    });

  };

  clearState() {
    this.setState({
      currentValue: '0',
      currentInput: '0',
      userTokenStack: [],
      operatorStack: [],
      outputStack: [],
      hasDecimal: false,
      isOperator: false,
      isNegative: false,
      isNewCalculation: true,
      totaled: false,
      continueAfterTotal: false,
    })
  };

  render() {
    return (
      <div className ="calculator-container">
      <div className="calculator">
        <div className="grid-container">
          <Display currentValue={this.state.currentValue} currentInput={this.state.currentInput}></Display>
          <MainButton idName="clear" innerName='AC' action={this.clearState}></MainButton>
          <MainButton idName="one" innerName='1' value='1' action={this.handleChange}></MainButton>
          <MainButton idName="two" innerName='2' value='2' action={this.handleChange}></MainButton>
          <MainButton idName="three" innerName='3' value='3' action={this.handleChange}></MainButton>
          <MainButton idName="four" innerName='4' value='4' action={this.handleChange}></MainButton>
          <MainButton idName="five" innerName='5' value='5' action={this.handleChange}></MainButton>
          <MainButton idName="six" innerName='6' value='6' action={this.handleChange}></MainButton>
          <MainButton idName="seven" innerName='7' value='7' action={this.handleChange}></MainButton>
          <MainButton idName="eight" innerName='8' value='8' action={this.handleChange}></MainButton>
          <MainButton idName="nine" innerName='9' value='9' action={this.handleChange}></MainButton>
          <MainButton idName="zero" innerName='0' value='0' action={this.handleChange}></MainButton>
          <MainButton idName="add" innerName='+' value='+' action={this.handleChange}></MainButton>
          <MainButton idName="subtract" innerName='-' value='-' action={this.handleChange}></MainButton>
          <MainButton idName="multiply" innerName='X' value='x' action={this.handleChange}></MainButton>
          <MainButton idName="divide" innerName='/' value='/' action={this.handleChange}></MainButton>
          <MainButton idName="equals" innerName='=' value='=' action={this.handleCalculateTotal}></MainButton>
          <MainButton idName="decimal" value='.' innerName='.' action={this.handleChange}></MainButton>
        </div>
      </div>
      </div>

    );

  }
}

export default App;
