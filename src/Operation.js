import { ACTIONS  } from "./App"

export default function Operation({ dispatch, operator }) {
    return (
    <button onClick={() => dispatch({type: ACTIONS.MATHSIGN, payload: {operator}})}    
    >
        {operator}
    </button>
    )
}