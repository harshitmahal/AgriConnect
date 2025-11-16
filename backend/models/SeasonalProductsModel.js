const mongoose = require("mongoose");

const SeasonalProduceSchema = new mongoose.Schema({
    season: {
        type: String,
        required: true,
        enum: ["winter", "summer", "monsoon"]
    },

    months: {
        type: [Number], // 1–12
        default: []
    },

    fruits: {
        // type: [String],
        default: []
    },

    vegetables: {
        // type: [String],
        default: []
    }
});

module.exports = mongoose.model("SeasonalProduce", SeasonalProduceSchema);
