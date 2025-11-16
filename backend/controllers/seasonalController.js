const SeasonalProduce = require("../models/SeasonalProductsModel");

// GET all
exports.getAllSeasonal = async (req, res) => {
  try {
    const data = await SeasonalProduce.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// GET by month
exports.getByMonth = async (req, res) => {
  const month = parseInt(req.params.month);

  try {
    const result = await SeasonalProduce.find({ months: month });
    res.json({ month, data: result });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// GET by season name
exports.getBySeason = async (req, res) => {
  const season = req.params.name.toLowerCase();

  try {
    const result = await SeasonalProduce.findOne({ season: season });

    if (!result) {
      return res.status(404).json({ message: "Season not found" });
    }

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// POST create new entry
exports.createSeasonal = async (req, res) => {
  try {
    const item = new SeasonalProduce(req.body);
    await item.save();
    res.json({ message: "Seasonal item created", item });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
