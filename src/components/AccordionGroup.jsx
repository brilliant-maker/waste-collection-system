import { useState } from "react";
import Accordion from "./Accordion.jsx";

export default function AccordionGroup({
  items
}){
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="accordions-group">
      {items.map((item, index) => (
        <Accordion
          key={item.id ?? index}
          title={item.title}
          isOpen={openIndex === index}
          onToggle={() => handleToggle(index)}>
          {item.content}
        </Accordion>
      ))}
    </div>
  );
};
