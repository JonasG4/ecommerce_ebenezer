import CategoryModel from "@/models/categoryModel";

export default async function ListHandler(req, res) {
  const model = new CategoryModel();

  if (req.method === "GET") {
    const categories = await model.getAllCategories();

    res.status(200).json(categories);
  }
}
