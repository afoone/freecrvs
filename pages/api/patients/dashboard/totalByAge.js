import { getFirstDoseByAge } from "../../../../services/dashboard";
export default async (req, res) => {
  const results = await getFirstDoseByAge();

  const rangos = [
    "<16",
    "16-19",
    "20-29",
    "30-39",
    "40-49",
    "50-59",
    "60-64",
    ">=65",
  ];

  const totals = results.reduce((acc, curr) => {
    const age = parseInt(curr._id.match(/[0-9]*/)[0]);
    if (!age) return acc;
    const newAcc = { ...acc };
    let range = "";
    switch (true) {
      case age < 16:
        range = rangos[0];
        break;
      case age <= 19:
        range = rangos[1];
        break;
      case age <= 29:
        range = rangos[2];
        break;
      case age <= 39:
        range = rangos[3];
        break;
      case age <= 49:
        range = rangos[4];
        break;
      case age <= 59:
        range = rangos[5];
        break;
      case age <= 64:
        range = rangos[6];
        break;
      default:
        range = rangos[7];
        break;
    }
    newAcc[range] = (parseInt(acc[range]) || 0) + parseInt(curr.count);
    return newAcc;
  }, {});
  res.json(rangos.map((rng) => ({ key: rng, value: totals[rng] })));
};
