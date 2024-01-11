const buttons = document.querySelectorAll("button");
const operators = ["+", "-", "*", "/"];
buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const clickedOn = e.target.innerHTML;
    const calculationBox = document.querySelector(".calculation");
    const valueBox = document.querySelector(".value");

    if (clickedOn === "AC") {
      calculationBox.innerText = "";
      valueBox.innerText = "";
    } else if (clickedOn === "=") {
      const operandList = getOperandList();
      const value = calculateAndUpdate(operandList);
      valueBox.innerText = value;
    } else if (operators.includes(clickedOn)) {
      const operandList = getOperandList();
      if (operandList.length === 3) {
        const value = calculateAndUpdate(operandList);
        calculationBox.innerText = value + clickedOn;
      } else {
        calculationBox.innerText = calculationBox.innerText + clickedOn;
      }
    } else {
      calculationBox.innerText = calculationBox.innerText + clickedOn;
    }
  });
});

const getOperandList = () => {
  const calculationBox = document.querySelector(".calculation");

  const equation = calculationBox.innerText;
  const eqChar = equation.split("");
  let currentNumber = "";
  let operandList = [];
  eqChar.forEach((c, i) => {
    if (operators.includes(c)) {
      operandList.push(currentNumber);
      currentNumber = "";
      operandList.push(c);
    } else {
      currentNumber = currentNumber + c;
    }
    if (eqChar.length - 1 === i) {
      operandList.push(currentNumber);
    }
  });
  return operandList;
};

const calculateAndUpdate = (operandList) => {
  let leftHand = null;
  let rightHand = null;
  for (let i = 0; i < operandList.length; i++) {
    const opa = operandList[i];
    if (operators.includes(opa)) {
      if (leftHand === null) {
        leftHand = +operandList[i - 1];
      }
      rightHand = +operandList[i + 1];
      i = i + 1;
      // calculation
      if (opa === "+") {
        leftHand = leftHand + rightHand;
      }
      if (opa === "-") {
        leftHand = leftHand - rightHand;
      }
      if (opa === "*") {
        leftHand = leftHand * rightHand;
      }
      if (opa === "/") {
        leftHand = leftHand / rightHand;
      }
    }
  }
  return leftHand;
};
