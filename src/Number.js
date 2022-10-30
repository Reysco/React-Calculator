import { ACTIONS  } from "./App"

export default function Number({ dispatch, digit }) {
    return (
    <button onClick={() => dispatch({type: ACTIONS.ADDDIGIT,payload: {digit}})}
    >
        {digit}
    </button>
    )
}