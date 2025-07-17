export const getSearchQuery = () => {
  try {
    const response = await axios.get(`${Base_url}`);

  } catch (error) {
    console.log(error);
  }
};