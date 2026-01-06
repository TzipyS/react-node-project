import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

const fields = [
  { label: "Name", value: "name" },
  { label: "Email", value: "email" },
  { label: "Phone", value: "phone" },
  { label: "Username", value: "username" },
];

export default function UnifiedSearch({
  queryField,
  setQueryField,
  queryValue,
  setQueryValue
}) {
  return (
    <Autocomplete
      freeSolo
      options={fields}
      value={fields.find(f => f.value === queryField) || null}
      getOptionLabel={(option) =>
        typeof option === "string" ? option : option.label
      }
      onChange={(event, newValue) => {
        if (!newValue || typeof newValue === "string") return;
        setQueryField(newValue.value);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search"
          size="small"
          value={queryValue}
          onChange={(e) => setQueryValue(e.target.value)}
        />
      )}
      sx={{ width: 300 }}
    />
  );
}
