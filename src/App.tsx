import { useEffect, useState } from "react";
import "./App.css";
import { getDifferenceInWeeks, getMaxDate } from "./utils/date-helpers";
import Input from "./components/form/Input";

const MAX_DATE = getMaxDate();

const MAX_YEARS = 90;
const yearsToDisplay = new Array(MAX_YEARS).fill(0).map((_, i) => i + 1);

function App() {
  const [dob, setDob] = useState<Date | null>(null);
  const [diffInWeeks, setDiffInWeeks] = useState<number | null>(null);
  const [valuesToFill, setValuesToFill] = useState<Record<string, number>>(null!);

  useEffect(() => {
    if (dob !== null) {
      setDiffInWeeks(getDifferenceInWeeks(dob));
    } else {
      setDiffInWeeks(null);
    }
  }, [dob]);

  useEffect(() => {
    if (diffInWeeks) {
      const years = diffInWeeks / 52;
      const wholeWeeks = Math.floor(years);
      const remainder = years % 1;

      setValuesToFill({
        wholeWeeks,
        remainder,
      })
    }

  }, [diffInWeeks])


  return (
    <div className="App">
      <h1>Life Chart</h1>
      <div className="card">
        <form>
          <Input
            maxValue={MAX_DATE}
            onChange={setDob}
          />
        </form>
        {diffInWeeks !== null && <h2>Weeks since birth: {diffInWeeks}</h2>}
      </div>
      {valuesToFill && (<div className="whereCheckBoxesGo">
        {
          yearsToDisplay.map((yearValue) => {
            const key = `year-${yearValue}`;

            const isFullYear = yearValue <= valuesToFill.wholeWeeks;
            const isFutureYear = yearValue - 1 > valuesToFill.wholeWeeks;
            const value = isFullYear ? 100 : isFutureYear ? 0 : valuesToFill.remainder * 100;
            
            return (
              <div key={key}>
                <label htmlFor={key}><h4>Year {yearValue}</h4></label>
                <progress id={key} max="100" value={value}> {value}% </progress>
              </div>
            )

          })
        }
      </div>)}
    </div>
  );
}

export default App;
