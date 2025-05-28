import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function CompTimeCalculator() {
  const [entries, setEntries] = useState([
    {
      travelDate: "",
      departureTime: "",
      arrivalTime: "",
      compTime: null,
    },
  ]);

  const calculateCompTime = (entry) => {
    const dep = new Date(`${entry.travelDate}T${entry.departureTime}:00-05:00`);
    const arr = new Date(`${entry.travelDate}T${entry.arrivalTime}:00-05:00`);

    let totalCompTime = 0;
    let current = new Date(dep);

    while (current < arr) {
      const day = current.getDay();
      const hour = current.getHours();

      const isWeekday = day >= 1 && day <= 5;
      const isDuringCoreWorkHours = isWeekday && hour >= 9 && hour < 17;

      if (!isDuringCoreWorkHours) {
        totalCompTime += 1 / 60;
      }
      current.setMinutes(current.getMinutes() + 1);
    }

    return totalCompTime.toFixed(2);
  };

  const handleChange = (index, field, value) => {
    const updated = [...entries];
    updated[index][field] = value;
    updated[index].compTime = calculateCompTime(updated[index]);
    setEntries(updated);
  };

  const addEntry = () => {
    setEntries([
      ...entries,
      {
        travelDate: "",
        departureTime: "",
        arrivalTime: "",
        compTime: null,
      },
    ]);
  };

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-bold">Comp Time for Travel Calculator</h1>
      {entries.map((entry, index) => (
        <div key={index} className="grid grid-cols-5 gap-2 items-end">
          <Input
            type="date"
            value={entry.travelDate}
            onChange={(e) => handleChange(index, "travelDate", e.target.value)}
            placeholder="Travel Date"
          />
          <Input
            type="time"
            value={entry.departureTime}
            onChange={(e) => handleChange(index, "departureTime", e.target.value)}
            placeholder="Departure Time"
          />
          <Input
            type="time"
            value={entry.arrivalTime}
            onChange={(e) => handleChange(index, "arrivalTime", e.target.value)}
            placeholder="Arrival Time"
          />
          <div>
            <span className="text-sm">{entry.compTime ? `${entry.compTime} hrs` : "--"}</span>
          </div>
        </div>
      ))}
      <Button onClick={addEntry}>Add Entry</Button>
    </div>
  );
}