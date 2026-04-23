import { useState } from "react";
import Accordion from "./Accordion.jsx";
import AccordionGroup from "./AccordionGroup.jsx";
import Search from "./Search.jsx";
import Filter from "./Filter.jsx";
import Sort from "./Sort.jsx";

export default function WardCollectionsAccordions({
  searchQuery,
  setSearchQuery,
  searchBy,
  setSearchBy,
  filterQuery,
  setFilterQuery,
  filterBy,
  setFilterBy,
  sortKey,
  setSortKey,
  sortDirection,
  setSortDirection,
  sortBy,
  setSortBy
}) {
  const [isOpen, setIsOpen] = useState(false);
  
  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  }
  
  const fields = [
    {
      label: "Year",
      value: "year"
    },
    {
      label: "Month",
      value: "month_name"
    },
    {
      label: "Day",
      value: "day_name"
    },
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
  
  const accordionItems = [
    {
      id: 1,
      title: "Search",
      content: (
        <Search
          placeholder="Search collections..."
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          searchBy={searchBy}
          setSearchBy={setSearchBy}
          fields={fields}
        />
      )
    },
    {
      id: 2,
      title: "Filter",
      content: (
        <Filter
          placeholder="Filter collections..."
          filterQuery={filterQuery}
          setFilterQuery={setFilterQuery}
          filterBy={filterBy}
          setFilterBy={setFilterBy}
          fields={fields}
        />
      )
    },
    {
      id: 3,
      title: "Sort",
      content: (
        <Sort
          sortBy={sortBy}
          setSortBy={setSortBy}
          sortDirection={sortDirection}
          setSortDirection={setSortDirection}
          fields={fields}
        />
      )
    }
  ];
  
  return (
    <>
      <Accordion
        title="Search Filter Sort"
        isOpen={isOpen}
        onToggle={handleToggle}>
          <AccordionGroup
            items={accordionItems}/>
      </Accordion>
    </>
  );
}
