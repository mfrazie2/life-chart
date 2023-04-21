import { useEffect, useState } from "react";
import "./App.css";
import { getDifferenceInWeeks, getMaxDate } from "./utils/date-helpers";

const MAX_DATE = getMaxDate();

function App() {
  const [dob, setDob] = useState<Date | null>(null);
  const [diffInWeeks, setDiffInWeeks] = useState<number | null>(null);

  useEffect(() => {
    if (dob !== null) {
      setDiffInWeeks(getDifferenceInWeeks(dob));
    } else {
      setDiffInWeeks(null);
    }
  }, [dob]);

  return (
    <div className="App">
      <h1>Life Chart</h1>
      <div className="card">
        <form>
          <input
            className="form-input"
            type="date"
            max={MAX_DATE}
            onChange={(e) => setDob(e.target.valueAsDate)}
          />
        </form>
        {diffInWeeks !== null && <h2>Weeks since birth: {diffInWeeks}</h2>}
      </div>
    </div>
  );
}

export default App;
