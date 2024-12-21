import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Stack } from "@mui/material";

const DateRangePicker = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}) => {
  console.log(startDate, endDate);
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
        <DatePicker
          label="Start Date"
          value={startDate}
          onChange={onStartDateChange}
        />
        <DatePicker
          label="End Date"
          value={endDate}
          onChange={onEndDateChange}
        />
      </Stack>
    </LocalizationProvider>
  );
};

export default DateRangePicker;
