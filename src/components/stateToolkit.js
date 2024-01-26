import { useState } from "react";
import "../App.css";
import {
  Button,
  Chip,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
} from "@mui/material";

/*** PAGE *********************** PAGE ************************ PAGE **************************************************/
function StateToolkit() {
  const initState = {
    counter1: 0,
    counter2: 0,
    counter3: 0,
    text: "",
    total1: 0,
    total2: 0,
  };
  const [state, setState] = useState(initState);
  const slice = setStateHandler(setState, state, {
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
    sumAll1: (num1, num2, num3) => {
      state.total1 = num1 + num2 + num3;
    },
    sumAll2: () => {
      state.total2 = state.counter1 + state.counter2 + state.counter3;
    },
    resetState: () => {
      for (const key in state) {
        if (state[key]) {
          state[key] = initState[key];
        }
      }
    },
  });

  const props = { state, slice };

  return (
    <div
      style={{
        width: "900px",
        height: "1000px",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      <div>
        <h1>State Toolkit</h1>
        <Counter1 {...props} />
        <Counter2 {...props} />
        <Counter3 {...props} />
      </div>
      <div>
        <div
          style={{
            width: "200px",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <SumButton1 {...props} />
          <SumButton2 {...props} />
        </div>

        <div style={{ marginTop: "20px" }}>
          <TextInput {...props} />
        </div>
        <div style={{ marginTop: "20PX" }}>
          <ResetButton {...props} />
        </div>
      </div>
    </div>
  );
}

export default StateToolkit;




/*** COMPONENTS ******************** COMPONENTS ****************** COMPONENTS **********************************************************/

const Counter1 = ({ state, slice }) => {
  function handleIncrementCounter1() {
    slice.add1();
  }
  function handleDecrementCounter1() {
    slice.minus1();
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

const Counter2 = ({ state, slice }) => {
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

const Counter3 = ({ state, slice }) => {
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

const TextInput = ({ state, slice }) => {
  const handleInputOnChange = (event) => {
    const inputText = event.target.value;
    slice.inputText(inputText);
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

const ResetButton = ({ slice }) => {
  const resetState = () => {
    slice.resetState();
  };

  return (
    <Button
      variant="contained"
      style={{ marginTop: "10px" }}
      onClick={resetState}
    >
      Reset
    </Button>
  );
};

const SumButton1 = ({ state, slice }) => {
  const sumAll = () => {
    slice.sumAll1(state.counter1, state.counter2, state.counter3);
  };

  return (
    <div>
      <Button variant="contained" onClick={sumAll}>
        Sum1
      </Button>
      <p>{state.total1}</p>
    </div>
  );
};

const SumButton2 = ({ state, slice }) => {
  const sumAll = () => {
    slice.sumAll2();
  };

  return (
    <div>
      <Button variant="contained" onClick={sumAll}>
        Sum2
      </Button>
      <p>{state.total2}</p>
    </div>
  );
};






/*** TOOLS *************** TOOLS **************** TOOLS ********************* TOOLS *********************************************/
const setStateHandler = (setState, state, actions) => {
  const wrappedActions = {};

  for (const key in actions) {
    wrappedActions[key] = (...args) => {
      actions[key](...args);
      setState({ ...state });
    };
  }

  return wrappedActions;
};
