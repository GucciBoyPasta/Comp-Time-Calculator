
'use client';

import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Select from "react-select";

const airportOptions = [
  { value: "DCA", label: "Washington National (DCA)" },
  { value: "IAD", label: "Washington Dulles (IAD)" },
  { value: "BWI", label: "Baltimore/Washington (BWI)" },
  { value: "JFK", label: "New York (JFK)" },
  { value: "LHR", label: "London Heathrow (LHR)" },
  { value: "CDG", label: "Paris Charles de Gaulle (CDG)" },
  { value: "HND", label: "Tokyo Haneda (HND)" },
  { value: "DXB", label: "Dubai International (DXB)" },
  { value: "LAX", label: "Los Angeles (LAX)" },
  { value: "ORD", label: "Chicago O'Hare (ORD)" },
  { value: "NBO", label: "Nairobi Jomo Kenyatta (NBO)" },
  { value: "ADD", label: "Addis Ababa Bole (ADD)" },
  { value: "CMN", label: "Casablanca Mohammed V (CMN)" },
  { value: "LOS", label: "Lagos Murtala Muhammed (LOS)" },
  { value: "DKR", label: "Dakar Blaise Diagne (DKR)" }
];

export default function CompTimeCalculator() {
  const [entries, setEntries] = useState([
    {
      date: "",
      isWorkDay: "yes",
      departureCity: null,
      departure: "",
      arrivalCity: null,
      arrival: "",
      compTime: null,
    },
  ]);

  const calculateCompTime = (entry) => {
    try {
      const dep = new Date(\`\${entry.date}T\${entry.departure}\`);
      let arr = new Date(\`\${entry.date}T\${entry.arrival}\`);
      if (arr < dep) arr.setDate(arr.getDate() + 1);

      let totalMinutes = 0;
      const current = new Date(dep);

      while (current < arr) {
        const day = current.getDay();
        const hour = current.getHours();

        const isWorkHour = (hour >= 9 && hour < 17) && (day >= 1 && day <= 5) && entry.isWorkDay === "yes";
        if (!isWorkHour) totalMinutes += 1;
        current.setMinutes(current.getMinutes() + 1);
      }

      return (Math.round((totalMinutes / 60) * 4) / 4).toFixed(2);
    } catch {
      return null;
    }
  };

  const handleChange = (index, field, value) => {
    const updated = [...entries];
    updated[index][field] = value;
    if (updated[index].date && updated[index].departure && updated[index].arrival) {
      updated[index].compTime = calculateCompTime(updated[index]);
    }
    setEntries(updated);
  };

  const addEntry = () => {
    setEntries([
      ...entries,
      {
        date: "",
        isWorkDay: "yes",
        departureCity: null,
        departure: "",
        arrivalCity: null,
        arrival: "",
        compTime: null,
      },
    ]);
  };

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold mb-2">Comp Time for Travel Calculator</h1>
      <div className="grid grid-cols-7 gap-4 font-semibold text-sm border-b pb-2">
        <div>Date</div>
        <div>Workday?</div>
        <div>Departure</div>
        <div>Departure Time</div>
        <div>Arrival</div>
        <div>Arrival Time</div>
        <div>Comp Time</div>
      </div>
      {entries.map((entry, index) => (
        <div key={index} className="grid grid-cols-7 gap-4 items-center">
          <Input type="date" value={entry.date} onChange={(e) => handleChange(index, "date", e.target.value)} />
          <select className="border border-gray-300 p-2 rounded w-full" value={entry.isWorkDay} onChange={(e) => handleChange(index, "isWorkDay", e.target.value)}>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
          <Select options={airportOptions} value={entry.departureCity} onChange={(option) => handleChange(index, "departureCity", option)} placeholder="Departure" />
          <Input type="time" value={entry.departure} onChange={(e) => handleChange(index, "departure", e.target.value)} />
          <Select options={airportOptions} value={entry.arrivalCity} onChange={(option) => handleChange(index, "arrivalCity", option)} placeholder="Arrival" />
          <Input type="time" value={entry.arrival} onChange={(e) => handleChange(index, "arrival", e.target.value)} />
          <div className="text-center">{entry.compTime !== null ? \`\${entry.compTime} hrs\` : "--"}</div>
        </div>
      ))}
      <Button onClick={addEntry}>Add Travel Segment</Button>
    </div>
  );
}
