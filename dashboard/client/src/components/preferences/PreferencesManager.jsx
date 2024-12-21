import { Button, Box } from '@mui/material';
import { savePreferences, clearPreferences } from '../../utils/cookieManager';

const PreferencesManager = ({ preferences, onReset }) => {
  const handleSave = () => {
    savePreferences(preferences);
  };

  const handleReset = () => {
    clearPreferences();
    onReset();
  };

  return (
    <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
      <Button variant="contained" onClick={handleSave}>
        Save Preferences
      </Button>
      <Button variant="outlined" onClick={handleReset}>
        Reset Preferences
      </Button>
    </Box>
  );
};

export default PreferencesManager;