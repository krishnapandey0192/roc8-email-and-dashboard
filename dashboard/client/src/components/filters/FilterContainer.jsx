import { useState } from "react";
import { Box, Button } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import DateRangePicker from "./DateRangePicker";
import Filters from "./Filters";

const FilterContainer = ({
  preferences,
  onPreferencesChange,
  onApplyFilters,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [localPreferences, setLocalPreferences] = useState(preferences);

  const handleApplyFilters = () => {
    // Update URL query parameters
    const params = new URLSearchParams({
      startDate: localPreferences.startDate.format("DD-MM-YYYY"),
      endDate: localPreferences.endDate.format("DD-MM-YYYY"),
      ageRange: localPreferences.ageRange,
      gender: localPreferences.gender,
    });
    setSearchParams(params);

    // Update parent component and trigger API call
    onPreferencesChange(localPreferences);
    onApplyFilters(localPreferences);
  };

  return (
    <Box className="filters-container">
      <DateRangePicker
        startDate={localPreferences.startDate}
        endDate={localPreferences.endDate}
        onStartDateChange={(date) =>
          setLocalPreferences({ ...localPreferences, startDate: date })
        }
        onEndDateChange={(date) =>
          setLocalPreferences({ ...localPreferences, endDate: date })
        }
      />
      <Filters
        ageRange={localPreferences.ageRange}
        gender={localPreferences.gender}
        onAgeRangeChange={(value) =>
          setLocalPreferences({ ...localPreferences, ageRange: value })
        }
        onGenderChange={(value) =>
          setLocalPreferences({ ...localPreferences, gender: value })
        }
      />
      <Button variant="contained" onClick={handleApplyFilters} sx={{ mt: 2 }}>
        Apply Filters
      </Button>
    </Box>
  );
};

export default FilterContainer;
