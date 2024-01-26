import { useReducer } from "react";
import "../App.css";
import {
  Button,
  Chip,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
} from "@mui/material";

function reducer(state, action) {
  switch (action.type) {
    case "increment_1": {
      return {
        ...state,
        counter1: state.counter1 + 1,
        counter2: state.counter2 + 1,
        counter3: state.counter3 + 1,
      };
    }
    case "increment_2": {
      return {
        ...state,
        counter2: state.counter2 + 1,
        counter3: state.counter3 + 1,
      };
    }
    case "increment_3": {
      return {
        ...state,
        counter3: state.counter3 + 1,
      };
    }
    case "decrement_1": {
      return {
        ...state,
        counter1: state.counter1 - 1,
        counter2: state.counter2 - 1,
        counter3: state.counter3 - 1,
      };
    }
    case "decrement_2": {
      return {
        ...state,
        counter2: state.counter2 - 1,
        counter3: state.counter3 - 1,
      };
    }
    case "decrement_3": {
      return {
        ...state,
        counter3: state.counter3 - 1,
      };
    }
    case "text_input": {
      return {
        ...state,
        text: action.payload,
      };
    }
    default:
      return state;
  }
}

function UseReducer() {
  const initState = {
    counter1: 0,
    counter2: 0,
    counter3: 0,
    text: "",
  };
  const [state, dispatch] = useReducer(reducer, initState);

  const Counter1 = () => {
    function handleIncrementCounter1() {
      dispatch({ type: "increment_1" });
    }
    function handleDecrementCounter1() {
      dispatch({ type: "decrement_1" });
    }
    return (
      <div className="counter">
        <Button variant="text" onClick={handleDecrementCounter1}>
          <div style={{ fontSize: "2rem" }}>-</div>
        </Button>
        <Chip sx={{ fontSize: "2rem" }} label={state.counter1} />
        <Button variant="text" onClick={handleIncrementCounter1}>
          <div style={{ fontSize: "2rem" }}>+</div>
        </Button>
      </div>
    );
  };

  const Counter2 = () => {
    function handleIncrementCounter2() {
      dispatch({ type: "increment_2" });
    }
    function handleDecrementCounter2() {
      dispatch({ type: "decrement_2" });
    }
    return (
      <div className="counter">
        <Button variant="text" onClick={handleDecrementCounter2}>
          <div style={{ fontSize: "2rem" }}>-</div>
        </Button>
        <Chip sx={{ fontSize: "2rem" }} label={state.counter2} />
        <Button variant="text" onClick={handleIncrementCounter2}>
          <div style={{ fontSize: "2rem" }}>+</div>
        </Button>
      </div>
    );
  };

  const Counter3 = () => {
    function handleIncrementCounter3() {
      dispatch({ type: "increment_3" });
    }
    function handleDecrementCounter3() {
      dispatch({ type: "decrement_3" });
    }
    return (
      <div className="counter">
        <Button variant="text" onClick={handleDecrementCounter3}>
          <div style={{ fontSize: "2rem" }}>-</div>
        </Button>
        <Chip sx={{ fontSize: "2rem" }} label={state.counter3} />
        <Button variant="text" onClick={handleIncrementCounter3}>
          <div style={{ fontSize: "2rem" }}>+</div>
        </Button>
      </div>
    );
  };

  const TextInput = () => {
    const handleInputOnChange = (event) => {
      const inputText = event.target.value;
      dispatch({ type: "text_input", payload: inputText });
    };
    return (
      <FormControl variant="standard">
        <InputLabel htmlFor="component-helper">Name</InputLabel>
        <Input
          id="component-helper"
          defaultValue={state.text}
          aria-describedby="component-helper-text"
          onChange={handleInputOnChange}
        />
        <FormHelperText id="component-helper-text">{state.text}</FormHelperText>
      </FormControl>
    );
  };

  return (
    <div>
      <h1>useReducer</h1>
      <Counter1 />
      <Counter2 />
      <Counter3 />
      <div style={{ marginTop: "50px" }}>
        <TextInput />
      </div>
    </div>
  );
}

export default UseReducer;
