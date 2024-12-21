import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const Filters = ({ ageRange, gender, onAgeRangeChange, onGenderChange }) => {
  return (
    <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
      <FormControl style={{ minWidth: 120 }}>
        <InputLabel>Age Range</InputLabel>
        <Select
          value={ageRange}
          label="Age Range"
          onChange={(e) => onAgeRangeChange(e.target.value)}
        >
          <MenuItem value="15-25">15-25</MenuItem>
          <MenuItem value=">25">&gt;25</MenuItem>
        </Select>
      </FormControl>

      <FormControl style={{ minWidth: 120 }}>
        <InputLabel>Gender</InputLabel>
        <Select
          value={gender}
          label="Gender"
          onChange={(e) => onGenderChange(e.target.value)}
        >
          <MenuItem value="Male">Male</MenuItem>
          <MenuItem value="Female">Female</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default Filters;
