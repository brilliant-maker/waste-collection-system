import Div from "./Div.jsx";
import Select from "./Select.jsx";
import Option from "./Option.jsx";
import SearchInput from "./SearchInput.jsx";

export default function Search({
  placeholder = "Search...",
  searchQuery,
  setSearchQuery,
  searchBy,
  setSearchBy,
  fields = []
}) {
  return (
    <Div>
      <Select
        value={searchBy}
        onChange={(e) => setSearchBy(e.target.value)}
      >
        {fields.map((field) => (
          <Option key={field.value} value={field.value}>
            {field.label}
          </Option>
        ))}
      </Select>
      
      <SearchInput
        placeholder={placeholder}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </Div>
  );
}
