import { getFirstDoseByAge } from "../../../../services/dashboard";
export default async (req, res) => {
  const results = await getFirstDoseByAge();

  const totals = results.reduce((acc, curr) => {
    const age = parseInt(curr._id.match(/[0-9]*/)[0]);
    if (!age) return acc;
    console.log(age, curr);
    const newAcc = { ...acc };
    console.log(parseInt(acc[age]), parseInt(curr.count));
    let range = "";
    switch (true) {
      case age < 16:
        range = "<16";
        break;
      case age <= 19:
        range = "16-19";
        break;
      case age <= 29:
        range = "20-29";
        break;
      case age <= 39:
        range = "30-39";
        break;
      case age <= 49:
        range = "40-49";
        break;
      case age <= 59:
        range = "50-59";
        break;
      case age <= 64:
        range = "60-64";
        break;
      default:
        range = ">=65";
        break;
    }
    newAcc[range] = (parseInt(acc[range]) || 0) + parseInt(curr.count);
    return newAcc;
  }, {});
  res.json(totals);
};
