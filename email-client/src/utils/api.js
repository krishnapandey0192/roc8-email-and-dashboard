const BASE_URL = "https://flipkart-email-mock.now.sh";

export const fetchEmails = async (page) => {
  const url = page ? `${BASE_URL}/?page=${page}` : BASE_URL;
  const response = await fetch(url);
  const data = await response.json();
  return data.list;
};

export const fetchEmailBody = async (id) => {
  const response = await fetch(`${BASE_URL}/?id=${id}`);
  const data = await response.json();
  return data;
};
