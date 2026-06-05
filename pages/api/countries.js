import Country from "../../models/country";

const countries = [
  new Country(1, "USA"),
  new Country(2, "Canada"),
  // Add more countries
];

export default (req, res) => {
  if (req.method === "GET") {
    res.status(200).json(countries);
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
