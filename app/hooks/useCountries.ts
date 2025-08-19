import countries from "world-countries";


const formattedCountries = countries.map((country) => ({
  value: country.cca2,
  label: country.name.common,
  flag: country.flag, // Keep as fallback
  latlng: country.latlng,
  region: country.region,
  icon: country.cca2 // Add this for SVG import reference
}));

const useCountries = () => {
  const getAll = () => formattedCountries;

  const getByValue = (value: string) => {
    return formattedCountries.find(item => item.value === value);
  }

  return {
    getAll,
    getByValue
  };
};

export default useCountries;