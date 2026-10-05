export type MarketplaceProduct = {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  unit: string;
  farm: string;
  location: string;
  emoji: string;
  color: string;
  availability: string;
};

export const marketplaceProducts: MarketplaceProduct[] = [
  {
    id: "heirloom-tomatoes",
    name: "Heirloom tomatoes",
    category: "Vegetables",
    description: "Sun-ripened mixed varieties, picked at peak flavor.",
    price: 4.5,
    unit: "lb",
    farm: "Cedar Ridge Farm",
    location: "Hudson Valley, NY",
    emoji: "🍅",
    color: "from-orange-300/35 via-rose-700/35 to-emerald-950",
    availability: "Harvesting now",
  },
  {
    id: "rainbow-carrots",
    name: "Rainbow carrots",
    category: "Vegetables",
    description: "Sweet, tender bunches in a bright mix of colors.",
    price: 3.75,
    unit: "bunch",
    farm: "Meadow & Root",
    location: "Lancaster, PA",
    emoji: "🥕",
    color: "from-amber-300/35 via-orange-800/35 to-emerald-950",
    availability: "Harvesting now",
  },
  {
    id: "wildflower-honey",
    name: "Wildflower honey",
    category: "Pantry",
    description: "Small-batch raw honey from a diverse meadow bloom.",
    price: 12,
    unit: "jar",
    farm: "Golden Hour Apiary",
    location: "Berkshire County, MA",
    emoji: "🍯",
    color: "from-yellow-200/40 via-amber-800/35 to-emerald-950",
    availability: "In stock",
  },
  {
    id: "baby-greens",
    name: "Baby salad greens",
    category: "Greens",
    description: "A delicate, peppery mix cut fresh for your table.",
    price: 6,
    unit: "bag",
    farm: "North Field Organics",
    location: "Kingston, NY",
    emoji: "🥬",
    color: "from-lime-300/35 via-green-800/35 to-emerald-950",
    availability: "Harvesting now",
  },
  {
    id: "blueberry-pint",
    name: "Blueberry pint",
    category: "Fruit",
    description: "Plump, sweet berries grown without synthetic sprays.",
    price: 7.5,
    unit: "pint",
    farm: "Blue Heron Berry Farm",
    location: "Catskills, NY",
    emoji: "🫐",
    color: "from-indigo-300/40 via-violet-900/40 to-emerald-950",
    availability: "Limited harvest",
  },
  {
    id: "sourdough-loaf",
    name: "Country sourdough",
    category: "Bakery",
    description: "Naturally leavened loaf made with regional stone-milled wheat.",
    price: 9,
    unit: "loaf",
    farm: "Stone Mill Bakery",
    location: "Woodstock, NY",
    emoji: "🍞",
    color: "from-amber-200/35 via-yellow-900/35 to-emerald-950",
    availability: "Baked to order",
  },
];

export function formatProductPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(price);
}
