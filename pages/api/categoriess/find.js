import categoryModel from "../../../models/categoryModel";

export default async function FindHandler(req, res) {
  const model = new categoryModel();

  if (req.method === "POST") {
    const categoriesFiltered = await model.filterCategories(req.body.filter);
    res.status(200).json(categoriesFiltered);
}
}
