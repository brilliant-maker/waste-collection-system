import Div from "./Div.jsx";
import Select from "./Select.jsx";
import Option from "./Option.jsx";

export default function Sort({
  sortBy,
  setSortBy,
  sortDirection,
  setSortDirection,
  fields = []
}) {
  return (
    <Div>
      <Select
        value={sortBy || ""}
        onChange={(e) => setSortBy(e.target.value)}
      >
        {fields.map((field) => (
          <Option key={field.value} value={field.value}>
            {field.label}
          </Option>
        ))}
      </Select>

      <Select
        value={sortDirection}
        onChange={(e) => setSortDirection(e.target.value)}
      >
        <Option value="asc">
          Ascending
        </Option>
        <Option value="desc">
          Descending
        </Option>
      </Select>
    </Div>
  );
}
