const irrigationData = [
    {
        id: "drip",
        name: "Drip Irrigation",
        icon: "💧",
        shortDescription:
            "Delivers water directly near the plant roots.",
        suitableFor:
            "Vegetables, fruits, cotton and row crops.",
        benefits: [
            "Reduces water wastage",
            "Delivers water directly to roots",
            "Suitable for fertigation",
            "Useful where water availability is limited"
        ],
        considerations:
            "Requires installation cost and regular maintenance of pipes and emitters."
    },

    {
        id: "sprinkler",
        name: "Sprinkler Irrigation",
        icon: "🌧️",
        shortDescription:
            "Distributes water over the field in the form of small droplets.",
        suitableFor:
            "Wheat, pulses, vegetables and uneven land.",
        benefits: [
            "Provides relatively uniform water distribution",
            "Useful for sandy and uneven fields",
            "Can reduce field channel requirements",
            "Suitable for many closely spaced crops"
        ],
        considerations:
            "Wind can affect water distribution and equipment requires maintenance."
    },

    {
        id: "surface",
        name: "Surface Irrigation",
        icon: "🌾",
        shortDescription:
            "Water flows over the soil surface using gravity.",
        suitableFor:
            "Crops such as rice, wheat and other field crops.",
        benefits: [
            "Simple system",
            "Lower equipment requirement",
            "Suitable for many traditional farming systems",
            "Easy to operate in suitable fields"
        ],
        considerations:
            "Can result in higher water losses if the field is poorly levelled."
    },

    {
        id: "rainwater",
        name: "Rainwater Harvesting",
        icon: "🌧️",
        shortDescription:
            "Collects and stores rainwater for later agricultural use.",
        suitableFor:
            "Rainfed farming areas and farms with seasonal rainfall.",
        benefits: [
            "Stores water for dry periods",
            "Can supplement irrigation",
            "Reduces dependence on groundwater",
            "Helps improve water availability"
        ],
        considerations:
            "Requires suitable storage structures and sufficient rainfall."
    }
];

export default irrigationData;