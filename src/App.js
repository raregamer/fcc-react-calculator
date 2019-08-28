import React from 'react';
import './App.css';
import MainButton from './MainButton';
import Display from './Display';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentValue: '0',
      userTokenStack: [],
      operatorStack: [],
      outputStack: [],
      hasDecimal: false,
      isOperator: false,
      isNegative: false,
      total: null,
    }

    this.handleChange = this.handleChange.bind(this);
    this.clearState = this.clearState.bind(this);
    this.handleCalculateTotal = this.handleCalculateTotal.bind(this);
    this.precedenceChecker = this.precedenceChecker.bind(this);
    this.previousOperatorCheck = this.previousOperatorCheck.bind(this);
    this.checkForNegativeNumber = this.checkForNegativeNumber.bind(this);
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

  previousOperatorCheck(currentValue) {
    switch (currentValue) {
      case ' + ':
      case ' - ':
        this.setState({
          isOperator: true,
          hasDecimal: false,
        });
        break;
      case ' x ':
      case ' / ':
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
      case ' + ':
      case ' - ':
      case ' x ':
      case ' /':
        return 1;
      default:
        return -1;
    }
  };


  checkForNegativeNumber(currentValue) {
    // if current value a number and previous value a negative replace with -currentvalue number
    let currentInput = parseFloat(currentValue);
    let lastCharInput = (this.state.currentValue[this.state.currentValue.length - 3]);
    console.log(lastCharInput + ' current: ' + currentValue);
    if (!isNaN(currentInput) && lastCharInput === '-') {
      console.log("made it")
      currentInput = '-' + currentInput;
      console.log(currentInput);
      console.log(this.state.currentValue);
      let currentStateValue = this.state.currentValue;
      let newStateValue = currentStateValue.substring(0, currentStateValue.length - 4) + currentInput;
      this.setState({
        currentValue: newStateValue
      });
      console.log(this.state.currentValue);

    }
  }

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
    console.log(this.state.hasDecimal);
    let value = event.target.value;

    //Phase 1 check to see if first input is operator if it is use 0 as the current value. Else if a number set value to current number else concatenate the last number to current value.
    //check if number already contains a decimal. Also check if currently an opperator. Used to prevent multiple operators chained together.
    if ((this.state.hasDecimal && value === '.') || (this.state.isOperator && isNaN(value))) {
      let lastOperator = this.state.currentValue.charAt(this.state.currentValue.length - 2);
      //allow a negative to be put after an operator. 
      if (value === ' - ' && lastOperator !== '-') {
        this.setState({
          currentValue: this.state.currentValue + value
        });
      }

      //change current operator if operator clicked after current operator
      else if (this.state.isOperator && this.operator(value) && value !== '.') {
        let currentStateValue = this.state.currentValue;
        let operatorChangeValue = currentStateValue.substring(0, currentStateValue.length - 2) + value;
        this.setState({
          currentValue: operatorChangeValue
        });
      }
      //allow a decimal operand after an operator
      if (!this.state.hasDecimal && this.state.isOperator && value === '.') {
        this.setState({
          currentValue: this.state.currentValue + value,
          hasDecimal: true
        });
      };
      return
    };




    if (this.state.currentValue === '0' && this.state.isOperator) {
      this.setState({
        currentValue: this.state.currentValue + value
      });
    } else if (this.state.currentValue === '0') {
      this.setState({ currentValue: value });
    } else {
      this.setState({ currentValue: this.state.currentValue + value })
    };

    //end phase 1
    // assign boolean if operator
    await this.previousOperatorCheck(value);

    //assign boolean if decimal.
    await this.checkForDecimal(value);
  }

  // Using the The Shunting Yard Algorithm to calculate
  async handleCalculateTotal() {

    console.log("handle calc: " + this.state.currentValue)

    //1st step take current values and split them into a user token stack 
    let currentValues = await this.state.currentValue.split(' ');
    //Get rid of empty spaces in array.
    currentValues = await currentValues.filter((item) => {
      return item !== '';
    });
    //Convert numbers to negative values if a negative operator prior to number and value before operator not a number.
    for (let i = 0; i < currentValues.length; i++) {
      if (currentValues[i] === '-' && isNaN(currentValues[i - 1])) {
        let convertNumberAfter = "-" + currentValues[i + 1];
        currentValues[i + 1] = convertNumberAfter;
        currentValues.splice(i, 1);
      };
    };
    this.setState({
      userTokenStack: await [...this.state.userTokenStack, ...currentValues],
    });
    //2nd step go through token stack and split into an output and operator stack
    console.log("pre tokenstack " + this.state.userTokenStack);
    this.state.userTokenStack.forEach(token => {
      let value = parseFloat(token);
      //if token not a number it must be an operator.
      if (isNaN(value)) {

        //if no operators are in the stack yet add the first operator.
        if (this.state.operatorStack === undefined || this.state.operatorStack.length === 0) {
          this.setState({
            operatorStack: [...this.state.operatorStack, token]
          });
        }
        else {
          //make a copy of the current operator tokens. 
          let operatorTokens = [...this.state.operatorStack];
          //make a copy of the output stack.
          let outputTokens = [...this.state.outputStack];
          //get the last output operator to compare with the next operator.
          let lastOperator = operatorTokens.pop();

          //if current operator token greater than the last token operator
          if (this.precedenceChecker(token) <= this.precedenceChecker(lastOperator)) {
            // take the last operator token and push it to the output token stack.
            outputTokens.push(lastOperator);
            // take current token and push it to the operator stack.
            operatorTokens.push(token);
            this.setState({
              operatorStack: [...operatorTokens],
              outputStack: [...outputTokens]
            });

            //ELSE push the token to the operator token stack.
          } else {

            operatorTokens.push(lastOperator, token);
            this.setState({
              operatorStack: [...operatorTokens],
            });

          }
        }

        //add token which is number to output stack.
      } else {
        this.setState({
          outputStack: [...this.state.outputStack, token]
        });
      }

    });
    //3rd merge the output stack first then the operator stack. 
    this.setState({
      outputStack: [...this.state.outputStack, ...this.state.operatorStack.reverse()]
    });

    console.log("final order: " + this.state.outputStack);
    //postfix calculator algorithm
    //4th check if tokens are on the output stack
    let leftOperand = null;
    let rightOperand = null;
    let currentTokens = [...this.state.outputStack];
    let numberValues = [];
    let totalValue = null;

    for (var i = 0; i < currentTokens.length; i++) {
      console.log(i);
      console.log(numberValues);
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
        console.log("number: " + (currentTokens[i]));
        numberValues.push(parseFloat(currentTokens[i]));
      }

    }
    console.log(' modulu: ' + numberValues[0]);
    if (numberValues[0] === null) {
      numberValues[0] = 0;

    }
    let finalNumber;
    if (numberValues[0] % 1 === 0) {
      finalNumber = Number(numberValues[0].toFixed(0));
    } else {
      finalNumber = Number(numberValues[0].toFixed(4));
    }
    this.clearState();
    this.setState({
      currentValue: finalNumber
    });

  }

  clearState() {
    this.setState({
      currentValue: '0',
      userTokenStack: [],
      operatorStack: [],
      outputStack: [],
      hasDecimal: false,
      isOperator: false,
      isNegative: false,
      total: null,
    })
  };

  render() {
    return (
      <div className="calculator">
        <div className="grid-container">
          <Display currentValue={this.state.currentValue} userTokenStack={this.state.userTokenStack} total={this.state.total}></Display>
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
          <MainButton idName="add" innerName='+' value=' + ' action={this.handleChange}></MainButton>
          <MainButton idName="subtract" innerName='-' value=' - ' action={this.handleChange}></MainButton>
          <MainButton idName="multiply" innerName='X' value=' x ' action={this.handleChange}></MainButton>
          <MainButton idName="divide" innerName='/' value=' / ' action={this.handleChange}></MainButton>
          <MainButton idName="equals" innerName='=' value=' = ' action={this.handleCalculateTotal}></MainButton>
          <MainButton idName="decimal" value='.' innerName='.' action={this.handleChange}></MainButton>
        </div>
      </div>

    );

  }
}

export default App;
