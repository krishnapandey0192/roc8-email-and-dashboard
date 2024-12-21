import Cookies from "js-cookie";
import dayjs from "dayjs";

const COOKIE_KEYS = {
  PREFERENCES: "user_preferences",
  AUTH_TOKEN: "auth_token",
};

export const savePreferences = (preferences) => {
  Cookies.set(COOKIE_KEYS.PREFERENCES, JSON.stringify(preferences), {
    expires: 30,
  });
};

export const getPreferences = () => {
  const preferences = Cookies.get(COOKIE_KEYS.PREFERENCES);
  if (preferences) {
    const parsedPreferences = JSON.parse(preferences);
    // Convert date strings back to Dayjs objects
    return {
      ...parsedPreferences,
      startDate: dayjs(parsedPreferences.startDate),
      endDate: dayjs(parsedPreferences.endDate),
    };
  }
  return null;
};

export const clearPreferences = () => {
  Cookies.remove(COOKIE_KEYS.PREFERENCES);
};

export const setAuthToken = (token) => {
  Cookies.set(COOKIE_KEYS.AUTH_TOKEN, token, { expires: 7 });
};

export const getAuthToken = () => {
  return Cookies.get(COOKIE_KEYS.AUTH_TOKEN);
};

export const removeAuthToken = () => {
  Cookies.remove(COOKIE_KEYS.AUTH_TOKEN);
};
