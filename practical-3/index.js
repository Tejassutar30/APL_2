const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter a number: ', (number1) => {
  rl.question('Enter another number: ', (number2) => {
    const num1 = parseInt(number1);
    const num2 = parseInt(number2);

    rl.question('Enter an operator (+, -, *, /): ', (operator) => {
      let result = 0;

      switch (operator) {
        case '+':
          result = num1 + num2;
          break;

        case '-':
          result = num1 - num2;
          break;

        case '*':
          result = num1 * num2;
          break;

        case '/':
          result = num1 / num2;
          break;

        default:
          console.log('Invalid operator');
          process.exit();
      }

      console.log(`Result: ${result}`);
      rl.close();
    });
  });
});
