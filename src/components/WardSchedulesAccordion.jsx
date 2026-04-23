import { useState } from "react";
import Accordion from "./Accordion.jsx";
import Search from "./Search.jsx";

export default function WardSchedulesAccordion({
  searchQuery,
  setSearchQuery,
  searchBy,
  setSearchBy
}) {
  
  const [isOpen, setIsOpen] = useState(false);
  
  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  }
  
  const fields = [
    {
      label: "Shift Type",
      value: "shift_type"
    },
    {
      label: "Waste Type",
      value: "ward_waste_type"
      
    },
    {
      label: "Vehicle Type",
      value: "ward_vehicle_type"
    }
  ];
  
  return (
    <>
      <Accordion
        title="Search"
        isOpen={isOpen}
        onToggle={handleToggle}>
        <Search
          placeholder="Search schedules..."
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          searchBy={searchBy}
          setSearchBy={setSearchBy}
          fields={fields}/>
      </Accordion>
    </>
  );
}
