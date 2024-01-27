import { useState, useEffect, useMemo } from "react";
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
    hiddenStateData: false,
  };
  const [state, setState] = useState(initState);
  const handle = setStateHandler(setState, state, {
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
    toggleHidden: () => {
      state.hiddenStateData = state.hiddenStateData ? false : true;
    },
  });

  const props = { state, handle };

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
        <div style={{ marginTop: "20PX" }}>
          <Toogle {...props} />
        </div>
        {state.hiddenStateData && (
          <div>
            <StateData {...props} />
          </div>
        )}
      </div>
    </div>
  );
}

export default StateToolkit;

/*** COMPONENTS ******************** COMPONENTS ****************** COMPONENTS **********************************************************/

const Counter1 = ({ state, handle }) => {
  return (
    <div className="counter">
      <Button
        variant="text"
        onClick={() => {
          handle.minus1();
        }}
      >
        <div style={{ fontSize: "2rem" }}>-</div>
      </Button>
      <Chip sx={{ fontSize: "2rem" }} label={state.counter1} />
      <Button variant="text" onClick={handle.add1}>
        <div style={{ fontSize: "2rem" }}>+</div>
      </Button>
    </div>
  );
};

const Counter2 = ({ state, handle }) => {
  function handleIncrementCounter2() {
    handle.add2();
  }
  function handleDecrementCounter2() {
    handle.minus2();
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

const Counter3 = ({ state, handle }) => {
  function handleIncrementCounter3() {
    handle.add3();
  }
  function handleDecrementCounter3() {
    handle.minus3();
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

const TextInput = ({ state, handle }) => {
  const handleInputOnChange = (event) => {
    const inputText = event.target.value;
    handle.inputText(inputText);
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

const ResetButton = ({ handle }) => {
  const resetState = () => {
    handle.resetState();
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

const SumButton1 = ({ state, handle }) => {
  const sumAll = () => {
    handle.sumAll1(state.counter1, state.counter2, state.counter3);
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

const SumButton2 = ({ state, handle }) => {
  const sumAll = () => {
    handle.sumAll2();
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

const Toogle = ({ state, handle }) => {
  return (
    <div>
      <Button variant="contained" onClick={handle.toggleHidden}>
        Toogle
      </Button>
    </div>
  );
};

const StateData = ({ state, handle }) => {
  const arr1 = [];
  const arr2 = [];
  for (const key in state) {
    arr1.push(key);
    arr2.push(state[key]);
  }

  useEffect(() => {
    console.log("Log State");

    return () => {
      console.log("Bye Bye State");
    };
  });
  return (
    <>
      {arr1.map((el, index) => {
        return (
          <div key={index}>
            <h3>{`${el}: ${arr2[index]}`}</h3>
          </div>
        );
      })}
    </>
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
