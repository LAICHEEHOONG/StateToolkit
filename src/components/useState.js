import { useState, memo } from "react";
import "../App.css";
import {
  Button,
  Chip,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
} from "@mui/material";

/*** PAGE *************************************************************************************************/
function UseState() {
  const initState = {
    counter1: 0,
    counter2: 0,
    counter3: 0,
    text: "",
    text2: "",
    total: 0,
  };
  const [state, setState] = useState(initState);
  const slice = setStateHandler(initState, setState, state, {
    resetState: () => {},
    add1: () => {
      state.counter1 += 1;
      state.counter2 += 1;
      state.counter3 += 1;
    },
    minus1: () => {
      state.counter1 -= 1;
      state.counter2 -= 1;
      state.counter3 -= 1;
    },
    add2: () => {
      state.counter2 += 1;
      state.counter3 += 1;
    },
    minus2: () => {
      state.counter2 -= 1;
      state.counter3 -= 1;
    },
    add3: () => {
      state.counter3 += 1;
    },
    minus3: () => {
      state.counter3 -= 1;
    },
    inputText: (value) => {
      state.text = value;
    },
    sumAll: (num1, num2, num3) => {
      state.total = num1 + num2 + num3;
    },
    sumAll2: () => {
      state.total = state.counter1 + state.counter2 + state.counter3;
    },
  });

  return (
    <div>
      <h1>useState</h1>
      <Counter1 slice={slice} state={state} />
      <Counter2 slice={slice} state={state} />
      <Counter3 slice={slice} state={state} />
      <div style={{ marginTop: "50px" }}>
        <TextInput slice={slice} state={state} />
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <ResetButton slice={slice} />
        <SumButton slice={slice} state={state} />
      </div>
    </div>
  );
}

export default UseState;

/*** COMPONENTS *************************************************************************************************/
const Counter1 = memo(
  (prop) => {
    function handleIncrementCounter1() {
      prop.slice.add1();
    }
    function handleDecrementCounter1() {
      prop.slice.minus1();
    }
    return (
      <div className="counter">
        <Button variant="text" onClick={handleDecrementCounter1}>
          <div style={{ fontSize: "2rem" }}>-</div>
        </Button>
        <Chip sx={{ fontSize: "2rem" }} label={prop.state.counter1} />
        <Button variant="text" onClick={handleIncrementCounter1}>
          <div style={{ fontSize: "2rem" }}>+</div>
        </Button>
      </div>
    );
  },
  (prevProps, nextProps) => {
    return prevProps.state === nextProps.state;
  }
);

const Counter2 = ({ slice, state }) => {
  function handleIncrementCounter2() {
    slice.add2();
  }
  function handleDecrementCounter2() {
    slice.minus2();
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

const Counter3 = ({ slice, state }) => {
  function handleIncrementCounter3() {
    slice.add3();
  }
  function handleDecrementCounter3() {
    slice.minus3();
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

const TextInput = memo(
  (prop) => {
    const handleInputOnChange = (event) => {
      const inputText = event.target.value;
      // prop.run({ type: ACTION.INPUT_TEXT, payload: inputText });
      prop.slice.inputText(inputText);
    };
    return (
      <FormControl variant="standard">
        <InputLabel htmlFor="component-helper">Name</InputLabel>
        <Input
          id="component-helper"
          defaultValue={prop.state.text}
          aria-describedby="component-helper-text"
          onChange={handleInputOnChange}
        />
        <FormHelperText id="component-helper-text">
          {prop.state.text}
        </FormHelperText>
      </FormControl>
    );
  },
  (prevProps, nextProps) => {
    return prevProps.state === nextProps.state;
  }
);

const ResetButton = ({ slice, state }) => {
  const resetState = () => {
    slice.resetState();
  };

  return (
    <Button
      variant="contained"
      style={{ marginTop: "50px" }}
      onClick={resetState}
    >
      Reset
    </Button>
  );
};

const SumButton = ({ slice, state }) => {
  const sumAll = () => {
    slice.sumAll2();
  };

  return (
    <div>
      <Button
        variant="contained"
        style={{ marginTop: "50px" }}
        onClick={sumAll}
      >
        Sum
      </Button>
      <p>{state.total}</p>
    </div>
  );
};

/*** TOOLS *************************************************************************************************/
const setStateHandler = (initState, setState, state, actions) => {
  const wrappedActions = {};

  for (const key in actions) {
    wrappedActions[key] = (...args) => {
      actions[key](...args);
      if (key === "resetState") {
        setState(initState);
      } else {
        setState({ ...state });
      }
    };
  }

  return wrappedActions;
};
