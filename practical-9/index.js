
function sayHello(name, callback) {
  setTimeout(() => {
    console.log(`Hello, ${name}!`);
    callback();
  }, 2000);
}

sayHello('John', () => {
  sayHello('Alice', () => {
    sayHello('Bob', () => {});
  });
});
