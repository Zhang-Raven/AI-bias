export const mockPhotos = [
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&h=500&fit=crop", // Woman 1
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&h=500&fit=crop", // Man 1
  "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=500&h=500&fit=crop", // Woman 2
  "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=500&h=500&fit=crop"  // Man 2
];

export const extractCases = [
  {
    imgIdx: 1,
    tags: [["gender", "man"], ["lighting", "natural_light"], ["skin_tone", "medium_skinned"]]
  },
  {
    imgIdx: 2,
    tags: [["gender", "woman"], ["attire", "uniform"], ["expression", "smiling"], ["bg", "office"]]
  },
  {
    imgIdx: 3,
    tags: [["age", "young"], ["attire", "casualwear"], ["gender", "man"], ["hair", "short"]]
  },
  {
    imgIdx: 0,
    tags: [["gender", "woman"], ["hairstyle", "curly_hair"], ["expression", "smiling"]]
  }
];

export const logicRules = [
  {
    A: [["gender", "woman"], ["attire", "uniform"], ["background", "office"], ["expression", "smiling"]],
    B: ["occupation", "medical"],
    lift: 6.21
  },
  {
    A: [["gender", "man"], ["lighting", "natural_light"], ["skin_tone", "medium_skinned"]],
    B: ["occupation", "transportation"],
    lift: 10.89
  },
  {
    A: [["age", "young"], ["attire", "casualwear"], ["background", "office"], ["gender", "man"]],
    B: ["occupation", "tech"],
    lift: 6.69
  },
  {
    A: [["attire", "uniform"], ["expression", "smiling"], ["gender", "woman"]],
    B: ["occupation", "medical"],
    lift: 5.42
  },
  {
    A: [["attire", "formalwear"], ["expression", "smiling"]],
    B: ["occupation", "management"],
    lift: 2.83
  }
];
