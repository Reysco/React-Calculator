import { useReducer } from "react"
import "./calculator.css"
import Number from "./Number"
import Operation from "./Operation"

export const ACTIONS = {
  ADDDIGIT: 'addDigit',
  MATHSIGN: 'mathsign',
  CLEAR: 'clear',
  ERASE: 'erase',
  RESULT: 'result',
  PERCENTAGE: 'percentage',
  MOREORLESS: 'moreorless',

}

function reducer(state, { type, payload }){
  switch (type) {
    case ACTIONS.ADDDIGIT:
      if(state.overwrite){
        return{
          ...state,
          Num: payload.digit,
          overwrite: false,
        }
      }
      if (payload.digit === "0" && state.Num === "0") {
      return state
      }
      if (payload.digit === "." && state.Num?.includes(".")) {
      return state
      }

    return {
      ...state,
      Num: `${state.Num || ""}${payload.digit}`,
    }
case ACTIONS.MATHSIGN:
  if (state.Num == null && state.OldNum == null){
    return state
  }

  if(state.Num==null){
    return{
      ...state,
      operator: payload.operator,
    }
  }

  if (state.OldNum == null){
    return{
      ...state,
      operator: payload.operator,
      OldNum: state.Num,
      Num: null,
    }
  }

  return{
    ...state,
    OldNum: result(state),
    operator: payload.operator,
    Num: null
  }
  case ACTIONS.CLEAR:
    return {}  

  case ACTIONS.PERCENTAGE:
    if(state.operator==null || state.Num==null || state.OldNum==null){
      return state
    }

    return{
      overwrite: true,
      ...state, 
      OldNum: null,
      operator: null,
      Num: percentage(state)
    }

function percentage({ Num, OldNum, operator}){
  const first = parseFloat(OldNum)
  const second = parseFloat(Num)
  if (isNaN(first) || isNaN(second)) return ""
  let computation =  ""

  switch (operator) {
    case "+":
      computation = first + (second/100 * first)
        break
    case "-":
      computation = first - (second/100 * first)
      break
    case "*":
      computation = first * (second/100)
      break

    case "/":
      computation = first / (second/100)
      break

  }
  return computation.toString()
  
}

case ACTIONS.MOREORLESS:
  if(state.operator==null || state.Num==null || state.OldNum==null){
    return state
  }

  return{
    overwrite: true,
    ...state, 
    OldNum: null,
    operator: null,
    Num: moreorless(state)
  }

function moreorless({ Num, OldNum, operator}){
const first = parseFloat(OldNum)
const second = parseFloat(Num)
if (isNaN(first) || isNaN(second)) return ""
let computation =  ""

switch (operator) {
  case "+":
    computation = first - second
      break
  case "-":
    computation = first + second
    break
  case "*":
    computation = first * (-second)
    break

  case "/":
    computation = first / (-second)
    break

}
return computation.toString()

}

  case ACTIONS.ERASE:
    if(state.overwrite) {
    return {
      ...state,
      overwrite: false,
      Num: null
    }
  }
  if(state.Num == null) return state
  if(state.Num.length === 1){
    return {...state, Num: null}
  }

  return{
    ...state,
    Num: state.Num.slice(0, -1)
  }
  case ACTIONS.RESULT:
    if(state.operator==null || state.Num==null || state.OldNum==null){
      return state
    }

    return{
      overwrite: true,
      ...state, 
      OldNum: null,
      operator: null,
      Num: result(state)
    }
  }
}

function result({ Num, OldNum, operator}){
  const first = parseFloat(OldNum)
  const second = parseFloat(Num)
  if (isNaN(first) || isNaN(second)) return ""
  let computation =  ""
  switch (operator) {
    case "+":
      computation = first + second
        break
    case "-":
      computation = first - second
      break
    case "*":
      computation = first * second
      break

    case "/":
      computation = first / second
      break

  }
  return computation.toString()
}

const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
  maximumFractionDigits: 0,
})
function format(operand){
  if(operand==null) return
  const [integer, decimal] = operand.split (".")
  if(decimal==null) return INTEGER_FORMATTER.format(integer)
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`
}

function App() {
  
  const[{Num, OldNum, operator}, dispatch] = useReducer(reducer, {})

  return (
    <div className="calculatorGrid">
      <div className="output">
        <div className="OldNum">{format(OldNum)} {operator}</div>
        <div className="Num">{format(Num)}</div>
      </div>
      <button onClick={() => dispatch({type: ACTIONS.CLEAR})}>C</button>
      <button onClick={() => dispatch({type: ACTIONS.MOREORLESS})}>+/-</button>
      <button onClick={() => dispatch({type: ACTIONS.PERCENTAGE})}>%</button>
      <Operation operator="/" dispatch={dispatch} />
      <Number digit="7" dispatch={dispatch} />
      <Number digit="8" dispatch={dispatch} />
      <Number digit="9" dispatch={dispatch} />
      <Operation operator="*" dispatch={dispatch} />
      <Number digit="4" dispatch={dispatch} />
      <Number digit="5" dispatch={dispatch} />
      <Number digit="6" dispatch={dispatch} />
      <Operation operator="-" dispatch={dispatch} />
      <Number digit="1" dispatch={dispatch} />
      <Number digit="2" dispatch={dispatch} />
      <Number digit="3" dispatch={dispatch} />
      <Operation operator="+" dispatch={dispatch} />
      <Number digit="." dispatch={dispatch} />
      <Number digit="0" dispatch={dispatch} />
      <button onClick={() => dispatch({type: ACTIONS.ERASE})}>←</button>
      <button onClick={() => dispatch({type: ACTIONS.RESULT})}>=</button>

      
    </div>
  );
}

export default App;