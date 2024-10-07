import { useState } from 'react'

function App() {
  const [display, setDisplay] = useState("0");
  const [operator, setOperator] = useState(null);
  const [operand1, setOperand1] = useState(null);
  const [waitingForOperand, setWaitingForOperand] =useState(false);

  const inputDigit = (digit) => {
      if (waitingForOperand) {
          setDisplay(String(digit));
          setWaitingForOperand(false);
      } else {
          setDisplay(display === "0" ? String(digit) : display + digit);
      }
  };

  const inputDot = () => {
      if (waitingForOperand) {
          setDisplay("0.");
          setWaitingForOperand(false);
      } else if (!display.includes(".")) {
          setDisplay(display + ".");
      }
  };

  const clearDisplay = () => {
      setDisplay("0");
      setOperator(null);
      setOperand1(null);
      setWaitingForOperand(false);
  };

  const toggleSign = () => {
      setDisplay(display.charAt(0) === "-" ? display.substring(1) : "-" + display);
  };

  const inputPercent = () => {
      const value = parseFloat(display);
      if (value === 0) return;
      setDisplay(String(value / 100));
  };

  const performOperation = (nextOperator) => {
      const inputValue = parseFloat(display);

      if (operand1 == null) {
          setOperand1(inputValue);
      } else if (operator) {
          const currentValue = operand1 || 0;
          const newValue = calculate[operator](currentValue, inputValue);

          setDisplay(String(newValue));
          setOperand1(newValue);
      }

      setWaitingForOperand(true);
      setOperator(nextOperator);
  };

  const calculate = {
      "/": (prevValue, nextValue) => prevValue / nextValue,
      "*": (prevValue, nextValue) => prevValue * nextValue,
      "+": (prevValue, nextValue) => prevValue + nextValue,
      "-": (prevValue, nextValue) => prevValue - nextValue,
      "=": (prevValue, nextValue) => nextValue
  };

  return (
    <div className='flex justify-center items-center mt-[10%]'>

    <div className="bg-black rounded-2xl p-5 w-96 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg ">
        <div className="bg-black text-white text-right p-5 text-2xl rounded-lg mb-2">{display}</div>
        <div className="grid grid-cols-4 gap-2">
            <button className="bg-gray-400 text-black rounded-full text-xl flex justify-center items-center" onClick={clearDisplay}>AC</button>
            <button className="bg-gray-400 text-black rounded-full text-xl flex justify-center items-center" onClick={toggleSign}>+/-</button>
            <button className="bg-gray-400 text-black rounded-full text-xl flex justify-center items-center" onClick={inputPercent}>%</button>
            <button className="bg-orange-500 text-white rounded-full text-xl flex justify-center items-center" onClick={() => performOperation("/")}>/</button>
            <button className="bg-gray-800 text-white rounded-full text-xl flex justify-center items-center" onClick={() => inputDigit(7)}>7</button>
            <button className="bg-gray-800 text-white rounded-full text-xl flex justify-center items-center" onClick={() => inputDigit(8)}>8</button>
            <button className="bg-gray-800 text-white rounded-full text-xl flex justify-center items-center" onClick={() => inputDigit(9)}>9</button>
            <button className="bg-orange-500 text-white rounded-full text-xl flex justify-center items-center" onClick={() => performOperation("*")}>*</button>
            <button className="bg-gray-800 text-white rounded-full text-xl flex justify-center items-center" onClick={() => inputDigit(4)}>4</button>
            <button className="bg-gray-800 text-white rounded-full text-xl flex justify-center items-center" onClick={() => inputDigit(5)}>5</button>
            <button className="bg-gray-800 text-white rounded-full text-xl flex justify-center items-center" onClick={() => inputDigit(6)}>6</button>
            <button className="bg-orange-500 text-white rounded-full text-xl flex justify-center items-center" onClick={() => performOperation("-")}>-</button>
            <button className="bg-gray-800 text-white rounded-full text-xl flex justify-center items-center" onClick={() => inputDigit(1)}>1</button>
            <button className="bg-gray-800 text-white rounded-full text-xl flex justify-center items-center" onClick={() => inputDigit(2)}>2</button>
            <button className="bg-gray-800 text-white rounded-full text-xl flex justify-center items-center" onClick={() => inputDigit(3)}>3</button>
            <button className="bg-orange-500 text-white rounded-full text-xl flex justify-center items-center" onClick={() => performOperation("+")}>+</button>
            <button className="bg-gray-800 text-white rounded-full text-xl flex justify-center items-center " onClick={() => inputDigit(0)}>0</button>
            <button className="bg-gray-800 text-white rounded-full text-xl flex justify-center items-center" onClick={inputDot}>.</button>
            <button className="bg-orange-500 text-white rounded-full text-xl flex justify-center items-center w-[210%]" onClick={() => performOperation("=")}>=</button>
        </div>
    </div>
    </div>
);
}

export default App
