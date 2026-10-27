import Div from "./Div.jsx";
import Select from "./Select.jsx";
import Option from "./Option.jsx";
import TextInput from "./TextInput.jsx";

export default function Filter({
  placeholder = "Filter...",
  filterQuery,
  setFilterQuery,
  filterBy,
  setFilterBy,
  fields = []
}) {
  return (
    <Div
      className="filter-controls">
      <Select
        value={filterBy}
        onChange={(e) => setFilterBy(e.target.value)}
      >
        {fields.map((field) => (
          <Option key={field.value} value={field.value}>
            {field.label}
          </Option>
        ))}
      </Select>

      <TextInput
        placeholder={placeholder}
        value={filterQuery}
        onChange={(e) => setFilterQuery(e.target.value)}
      />
    </Div>
  );
}
