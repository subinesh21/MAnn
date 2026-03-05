// Centralized product data for the entire application
// Modify this file to update products across all pages

export const CATEGORIES = [
  {
    id: 'drinkware',
    name: 'Drinkware',
    image: '/images/category-drinkware.jpg',
    description: 'Cups, mugs, and beverage containers',
    count: 6
  },
  {
    id: 'tableware',
    name: 'Tableware',
    image: '/images/category-tableware.jpg',
    description: 'Plates, bowls, and dining essentials',
    count: 6
  },
  {
    id: 'storage',
    name: 'Storage',
    image: '/images/category-storage.jpg',
    description: 'Jars, containers, and organization',
    count: 6
  },
  {
    id: 'kitchenware',
    name: 'Kitchenware',
    image: '/images/product-chai-cups.jpg',
    description: 'Cooking tools and kitchen essentials',
    count: 6
  },
  {
    id: 'homeware',
    name: 'Homeware',
    image: '/images/product-planters.jpg',
    description: 'Home decor and household items',
    count: 6
  },
  {
    id: 'bakeware',
    name: 'Bakeware',
    image: '/images/product-pasta-bowls.jpg',
    description: 'Baking dishes and oven-safe cookware',
    count: 6
  },
  {
    id: 'gardenware',
    name: 'Gardenware',
    image: '/images/category-gardenware.jpg',
    description: 'Planters and gardening supplies',
    count: 6
  },
  {
    id: 'gifting',
    name: 'Gifting',
    image: '/images/product-storage-jars.jpg',
    description: 'Eco-friendly gift sets and hampers',
    count: 6
  }
];

export const PRODUCTS = [
  // ==================== DRINKWARE (6 products) ====================
  {
    _id: '1',
    id: 1,
    name: 'Cutting Chai Cups With Stand | Set of 6',
    price: 771,
    originalPrice: 1498,
    primaryImage: '/images/product-chai-cups.jpg',
    hoverImage: '/images/category-drinkware.jpg',
    images: {
      Azure: ['/images/Azure-1.jpeg', '/images/Azure-2.jpeg', '/images/Azure-3.jpeg'],
      Celeste: ['/images/Celeste-1.jpeg', '/images/Celeste-2.jpeg', '/images/Celeste-3.jpeg'],
      Charcoal: ['/images/Charcoal-1.jpeg', '/images/Charcoal-2.jpeg', '/images/Charcoal-3.jpeg'],
      Coffee: ['/images/Coffee-1.jpeg', '/images/Coffee-2.jpeg', '/images/Coffee-3.jpeg']
    },
    category: 'drinkware',
    brand: 'Thulira',
    colors: ['Azure', 'Celeste', 'Charcoal', 'Coffee'],
    inStock: true,
    description: 'Experience traditional chai culture with our premium cutting chai cups. This elegant set of 6 cups comes with a beautiful stand, perfect for serving authentic Indian tea.',
    rating: 4.8,
    reviews: 156,
    faqs: [
      { question: 'Are these cups microwave safe?', answer: 'No, these bio-composite cups are not microwave safe. They are designed for serving hot beverages but should not be heated directly in a microwave.' },
      { question: 'Is the stand rust-proof?', answer: 'Yes, the stand is coated with a premium rust-resistant finish to ensure durability.' },
      { question: 'What is the capacity of each cup?', answer: 'Each cutting chai cup holds 150ml, perfect for traditional servings.' }
    ]
  },
  {
    _id: '5',
    id: 5,
    name: 'Mr & Mrs Coffee Mugs for Couple | Set of 2',
    price: 563,
    originalPrice: 849,
    primaryImage: '/images/category-drinkware.jpg',
    hoverImage: '/images/product-chai-cups.jpg',
    images: {
      Azure: ['/images/category-drinkware.jpg', '/images/mr-mrs-azure-2.jpg'],
      'Sand Castle': ['/images/category-drinkware-sand.jpg', '/images/mr-mrs-sand-2.jpg']
    },
    category: 'drinkware',
    brand: 'coffee',
    colors: ['Azure', 'Sand Castle'],
    inStock: true,
    description: 'Celebrate love with this adorable Mr & Mrs coffee mug set designed exclusively for couples.',
    rating: 4.6,
    reviews: 89,
    faqs: [
      { question: 'Is the "Mr" and "Mrs" design permanent?', answer: 'Yes, the typography is engraved/printed to resist fading through regular washing.' },
      { question: 'Are these mugs microwave safe?', answer: 'Yes, these specific 300ml mugs are microwave and dishwasher safe.' },
      { question: 'Do they come in a gift box?', answer: 'Yes, this set comes in premium packaging suitable for gifting.' }
    ]
  },
  {
    _id: '11',
    id: 11,
    name: 'Classic Mug 300 ml',
    price: 250,
    originalPrice: 399,
    primaryImage: '/images/category-drinkware.jpg',
    hoverImage: '/images/product-chai-cups.jpg',
    images: {
      Pink: ['/images/category-drinkware-pink.jpg', '/images/mug-pink-2.jpg'],
      Blue: ['/images/category-drinkware-blue.jpg', '/images/mug-blue-2.jpg'],
      Green: ['/images/category-drinkware-green.jpg', '/images/mug-green-2.jpg'],
      Yellow: ['/images/category-drinkware-yellow.jpg', '/images/mug-yellow-2.jpg'],
      White: ['/images/category-drinkware-white.jpg', '/images/mug-white-2.jpg']
    },
    category: 'drinkware',
    brand: 'Thulira',
    colors: ['Pink', 'Blue', 'Green', 'Yellow', 'White'],
    inStock: true,
    description: 'Our timeless Classic Mug combines functionality with aesthetic appeal.',
    rating: 4.3,
    reviews: 112,
    faqs: [
      { question: 'Can I use this for cold drinks too?', answer: 'Yes, it works perfectly for both hot and cold beverages.' },
      { question: 'Will the color fade over time?', answer: 'No, we use high-quality bio-pigments that are integrated into the material.' }
    ]
  },
  {
    _id: '23',
    id: 23,
    name: 'Insulated Travel Tumbler 500 ml',
    price: 599,
    originalPrice: 899,
    primaryImage: '/images/category-drinkware.jpg',
    hoverImage: '/images/product-chai-cups.jpg',
    images: {
      Black: ['/images/tumbler-black-1.jpg', '/images/tumbler-black-2.jpg'],
      Silver: ['/images/tumbler-silver-1.jpg', '/images/tumbler-silver-2.jpg'],
      'Rose Gold': ['/images/tumbler-rose-1.jpg', '/images/tumbler-rose-2.jpg'],
      Blue: ['/images/tumbler-blue-1.jpg', '/images/tumbler-blue-2.jpg']
    },
    category: 'drinkware',
    brand: 'Thulira',
    colors: ['Black', 'Silver', 'Rose Gold', 'Blue'],
    inStock: true,
    description: 'Take your beverages on the go with our eco-friendly Insulated Travel Tumbler.',
    rating: 4.7,
    reviews: 78,
    faqs: [
      { question: 'How long does it keep drinks hot?', answer: 'It maintains heat for up to 6 hours and keeps drinks cold for up to 12 hours.' },
      { question: 'Does it fit in car cup holders?', answer: 'Yes, the base is designed to fit most standard vehicle cup holders.' }
    ]
  },
  {
    _id: '24',
    id: 24,
    name: 'Espresso Cup Set with Saucers | Set of 4',
    price: 899,
    originalPrice: 1499,
    primaryImage: '/images/product-chai-cups.jpg',
    hoverImage: '/images/espresso-white-2.jpg',
    images: {
      White: ['/images/espresso-white-1.jpg', '/images/espresso-white-2.jpg', '/images/espresso-white-3.jpg'],
      Black: ['/images/espresso-black-1.jpg', '/images/espresso-black-2.jpg'],
      Brown: ['/images/espresso-brown-1.jpg', '/images/espresso-brown-2.jpg']
    },
    category: 'drinkware',
    brand: 'Thulira',
    colors: ['White', 'Black', 'Brown'],
    inStock: true,
    description: 'Elevate your espresso experience with our premium Espresso Cup Set.',
    rating: 4.5,
    reviews: 45,
    faqs: [
      { question: 'What is the volume of these cups?', answer: 'Each cup holds 90ml, the ideal size for a single or double shot of espresso.' },
      { question: 'Are the saucers included?', answer: 'Yes, the set includes 4 cups and 4 matching saucers.' }
    ]
  },
  {
    _id: '26',
    id: 26,
    name: 'Tea Infuser Mug with Lid | 350 ml',
    price: 449,
    originalPrice: 649,
    primaryImage: '/images/product-chai-cups.jpg',
    hoverImage: '/images/infuser-blue-2.jpg',
    images: {
      Blue: ['/images/infuser-blue-1.jpg', '/images/infuser-blue-2.jpg'],
      Green: ['/images/infuser-green-1.jpg', '/images/infuser-green-2.jpg'],
      White: ['/images/infuser-white-1.jpg', '/images/infuser-white-2.jpg']
    },
    category: 'drinkware',
    brand: 'Thulira',
    colors: ['Blue', 'Green', 'White'],
    inStock: true,
    description: 'Brew the perfect cup of loose-leaf tea with our Tea Infuser Mug.',
    rating: 4.6,
    reviews: 52,
    faqs: [
      { question: 'Is the infuser made of plastic?', answer: 'No, the infuser is made of high-quality food-grade stainless steel.' },
      { question: 'Does the lid stay cool?', answer: 'Yes, the lid is made of bio-composite material that does not conduct heat as quickly as ceramic or glass.' }
    ]
  },

  // ==================== TABLEWARE (6 products) ====================
  {
    _id: '4',
    id: 4,
    name: 'Pasta Bowl 750 ml set of 6',
    price: 720,
    originalPrice: 1276,
    primaryImage: '/images/product-pasta-bowls.jpg',
    hoverImage: '/images/pasta-azure-2.jpg',
    images: {
      Azure: ['/images/pasta-azure-1.jpg', '/images/pasta-azure-2.jpg', '/images/pasta-azure-3.jpg'],
      Celeste: ['/images/pasta-celeste-1.jpg', '/images/pasta-celeste-2.jpg'],
      Innocent: ['/images/pasta-innocent-1.jpg', '/images/pasta-innocent-2.jpg'],
      Charcoal: ['/images/pasta-charcoal-1.jpg', '/images/pasta-charcoal-2.jpg']
    },
    category: 'tableware',
    brand: 'Thulira',
    colors: ['Azure', 'Celeste', 'Innocent', 'Charcoal'],
    inStock: true,
    description: 'Transform your dining experience with our premium Pasta Bowl set.',
    rating: 4.7,
    reviews: 143,
    faqs: [
      { question: 'Are these bowls break-resistant?', answer: 'Our bio-composite material is much more durable and drop-resistant than traditional ceramic.' },
      { question: 'Are they oily/stain resistant?', answer: 'Yes, they are designed for easy cleaning and resistant to common food stains.' }
    ]
  },
  {
    _id: '7',
    id: 7,
    name: 'Snack Plates 8 inch set of 4',
    price: 460,
    originalPrice: 579,
    primaryImage: '/images/hero-slide-3.jpg',
    hoverImage: '/images/snack-azure-2.jpg',
    images: {
      Azure: ['/images/snack-azure-1.jpg', '/images/snack-azure-2.jpg'],
      Celeste: ['/images/snack-celeste-1.jpg', '/images/snack-celeste-2.jpg'],
      Charcoal: ['/images/snack-charcoal-1.jpg', '/images/snack-charcoal-2.jpg'],
      'Sand Castle': ['/images/snack-sand-1.jpg', '/images/snack-sand-2.jpg']
    },
    category: 'tableware',
    brand: 'rice',
    colors: ['Azure', 'Celeste', 'Charcoal', 'Sand Castle'],
    inStock: true,
    description: 'Elevate your entertaining game with our elegant Snack Plates set.',
    rating: 4.4,
    reviews: 78,
    faqs: [
      { question: 'Can these be used in a microwave?', answer: 'No, these rice-husk based plates are not suitable for microwave use.' },
      { question: 'Are these plates BPA-free?', answer: 'Yes, they are 100% BPA-free and food-safe.' }
    ]
  },
  {
    _id: '8',
    id: 8,
    name: 'Soup Bowl 250 ml set of 6',
    price: 714,
    originalPrice: 1149,
    primaryImage: '/images/product-pasta-bowls.jpg',
    hoverImage: '/images/soup-azure-2.jpg',
    images: {
      Azure: ['/images/soup-azure-1.jpg', '/images/soup-azure-2.jpg'],
      Celeste: ['/images/soup-celeste-1.jpg', '/images/soup-celeste-2.jpg'],
      Innocent: ['/images/soup-innocent-1.jpg', '/images/soup-innocent-2.jpg'],
      Charcoal: ['/images/soup-charcoal-1.jpg', '/images/soup-charcoal-2.jpg']
    },
    category: 'tableware',
    brand: 'Thulira',
    colors: ['Azure', 'Celeste', 'Innocent', 'Charcoal'],
    inStock: true,
    description: 'Warm hearts and souls with our cozy Soup Bowl collection.',
    rating: 4.6,
    reviews: 134,
    faqs: [
      { question: 'Do these bowls stack easily?', answer: 'Yes, they are designed to be stackable to save space in your kitchen cabinets.' },
      { question: 'Can they hold very hot soup?', answer: 'Yes, they are heat-resistant up to 100°C.' }
    ]
  },
  {
    _id: '28',
    id: 28,
    name: 'Dinner Plates 10.5 inch | Set of 4',
    price: 899,
    originalPrice: 1499,
    primaryImage: '/images/category-tableware.jpg',
    hoverImage: '/images/dinner-white-2.jpg',
    images: {
      White: ['/images/dinner-white-1.jpg', '/images/dinner-white-2.jpg', '/images/dinner-white-3.jpg'],
      Natural: ['/images/dinner-natural-1.jpg', '/images/dinner-natural-2.jpg'],
      Charcoal: ['/images/dinner-charcoal-1.jpg', '/images/dinner-charcoal-2.jpg']
    },
    category: 'tableware',
    brand: 'rice',
    colors: ['White', 'Natural', 'Charcoal'],
    inStock: true,
    description: 'Complete your dining collection with our elegant Dinner Plates.',
    rating: 4.7,
    reviews: 62,
    faqs: [
      { question: 'How heavy are these plates?', answer: 'They are lightweight yet sturdy, making them much easier to handle than ceramic plates.' },
      { question: 'Are they scratch-resistant?', answer: 'They are resistant to normal cutlery use, though sharp steak knives should be used with care.' }
    ]
  },
  {
    _id: '29',
    id: 29,
    name: 'Salad Bowl Set with Servers | 2L',
    price: 1299,
    originalPrice: 1999,
    primaryImage: '/images/product-pasta-bowls.jpg',
    hoverImage: '/images/salad-natural-2.jpg',
    images: {
      Natural: ['/images/salad-natural-1.jpg', '/images/salad-natural-2.jpg'],
      Charcoal: ['/images/salad-charcoal-1.jpg', '/images/salad-charcoal-2.jpg'],
      Olive: ['/images/salad-olive-1.jpg', '/images/salad-olive-2.jpg']
    },
    category: 'tableware',
    brand: 'Thulira',
    colors: ['Natural', 'Charcoal', 'Olive'],
    inStock: true,
    description: 'Create beautiful salads with our generous Salad Bowl Set.',
    rating: 4.5,
    reviews: 41,
    faqs: [
      { question: 'Are the servers made of the same material?', answer: 'Yes, the serving spoons are also made from the same sustainable bio-composite.' },
      { question: 'What is the diameter of the bowl?', answer: 'The bowl has a diameter of approximately 10 inches.' }
    ]
  },
  {
    _id: '33',
    id: 33,
    name: 'Breakfast Bowl 500 ml | Set of 4',
    price: 949,
    originalPrice: 1499,
    primaryImage: '/images/product-pasta-bowls.jpg',
    hoverImage: '/images/breakfast-azure-2.jpg',
    images: {
      Azure: ['/images/breakfast-azure-1.jpg', '/images/breakfast-azure-2.jpg'],
      Celeste: ['/images/breakfast-celeste-1.jpg', '/images/breakfast-celeste-2.jpg'],
      'Sand Castle': ['/images/breakfast-sand-1.jpg', '/images/breakfast-sand-2.jpg']
    },
    category: 'tableware',
    brand: 'Thulira',
    colors: ['Azure', 'Celeste', 'Sand Castle'],
    inStock: true,
    description: 'Start your mornings right with our generous Breakfast Bowls.',
    rating: 4.5,
    reviews: 46,
    faqs: [
      { question: 'Can these be used for hot oatmeal?', answer: 'Absolutely, they are perfect for hot cereals and porridge.' },
      { question: 'Are they dishwasher safe?', answer: 'Yes, they can be cleaned in the top rack of a dishwasher.' }
    ]
  },

  // ==================== STORAGE (6 products) ====================
  {
    _id: '2',
    id: 2,
    name: 'Kitchen Storage Jars & Containers | Set of 3',
    price: 695,
    originalPrice: 1158,
    primaryImage: '/images/product-storage-jars.jpg',
    hoverImage: '/images/storage-azure-2.jpg',
    images: {
      Azure: ['/images/storage-azure-1.jpg', '/images/storage-azure-2.jpg', '/images/storage-azure-3.jpg'],
      Celeste: ['/images/storage-celeste-1.jpg', '/images/storage-celeste-2.jpg'],
      Innocent: ['/images/storage-innocent-1.jpg', '/images/storage-innocent-2.jpg']
    },
    category: 'storage',
    brand: 'rice',
    colors: ['Azure', 'Celeste', 'Innocent'],
    inStock: true,
    description: 'Organize your pantry beautifully with our Kitchen Storage Jar Set.',
    rating: 4.6,
    reviews: 89,
    faqs: [
      { question: 'Are these jars airtight?', answer: 'Yes, the bamboo lids feature a silicone ring to ensure an airtight seal.' },
      { question: 'Are the jars transparent?', answer: 'These specific jars are opaque bio-composite, protecting contents from light.' }
    ]
  },
  {
    _id: '10',
    id: 10,
    name: 'Terravo Storage Containers | 2200 ml, 1200ml',
    price: 1340,
    originalPrice: 2233,
    primaryImage: '/images/category-storage.jpg',
    hoverImage: '/images/terravo-azure-2.jpg',
    images: {
      Azure: ['/images/terravo-azure-1.jpg', '/images/terravo-azure-2.jpg'],
      Celeste: ['/images/terravo-celeste-1.jpg', '/images/terravo-celeste-2.jpg'],
      Innocent: ['/images/terravo-innocent-1.jpg', '/images/terravo-innocent-2.jpg'],
      Charcoal: ['/images/terravo-charcoal-1.jpg', '/images/terravo-charcoal-2.jpg']
    },
    category: 'storage',
    brand: 'rice',
    colors: ['Azure', 'Celeste', 'Innocent', 'Charcoal'],
    inStock: true,
    description: 'Maximize your kitchen organization with our Terravo Storage Container set.',
    rating: 4.4,
    reviews: 67,
    faqs: [
      { question: 'Can I store liquids in these?', answer: 'Yes, the seals are leak-resistant, but they are primarily designed for dry goods.' },
      { question: 'Are they stackable?', answer: 'Yes, the flat lids allow for stable stacking.' }
    ]
  },
  {
    _id: '34',
    id: 34,
    name: 'Spice Rack with Jars | Set of 6',
    price: 1299,
    originalPrice: 1999,
    primaryImage: '/images/category-storage.jpg',
    hoverImage: '/images/spice-natural-2.jpg',
    images: {
      Natural: ['/images/spice-natural-1.jpg', '/images/spice-natural-2.jpg', '/images/spice-natural-3.jpg'],
      Charcoal: ['/images/spice-charcoal-1.jpg', '/images/spice-charcoal-2.jpg']
    },
    category: 'storage',
    brand: 'bamboo',
    colors: ['Natural', 'Charcoal'],
    inStock: true,
    description: 'Organize your spices beautifully with our complete Spice Rack Set.',
    rating: 4.7,
    reviews: 78,
    faqs: [
      { question: 'Are labels included?', answer: 'A set of 12 pre-printed spice labels is included with the rack.' },
      { question: 'Is the rack wall-mountable?', answer: 'The rack is designed for countertop use but can be modified for wall mounting.' }
    ]
  },
  {
    _id: '35',
    id: 35,
    name: 'Food Storage Set with Lids | 5 Pieces',
    price: 1599,
    originalPrice: 2499,
    primaryImage: '/images/product-storage-jars.jpg',
    hoverImage: '/images/food-clear-2.jpg',
    images: {
      Clear: ['/images/food-clear-1.jpg', '/images/food-clear-2.jpg'],
      Green: ['/images/food-green-1.jpg', '/images/food-green-2.jpg'],
      Blue: ['/images/food-blue-1.jpg', '/images/food-blue-2.jpg']
    },
    category: 'storage',
    brand: 'Thulira',
    colors: ['Clear', 'Green', 'Blue'],
    inStock: true,
    description: 'Complete your kitchen organization with this versatile Food Storage Set.',
    rating: 4.5,
    reviews: 54,
    faqs: [
      { question: 'Are these freezer safe?', answer: 'Yes, these containers can safely be used to store food in the freezer.' },
      { question: 'Do the lids lock?', answer: 'These lids feature a secure snap-fit design for freshness.' }
    ]
  },
  {
    _id: '36',
    id: 36,
    name: 'Bread Box with Bamboo Lid',
    price: 899,
    originalPrice: 1299,
    primaryImage: '/images/category-storage.jpg',
    hoverImage: '/images/bread-natural-2.jpg',
    images: {
      Natural: ['/images/bread-natural-1.jpg', '/images/bread-natural-2.jpg'],
      Charcoal: ['/images/bread-charcoal-1.jpg', '/images/bread-charcoal-2.jpg'],
      White: ['/images/bread-white-1.jpg', '/images/bread-white-2.jpg']
    },
    category: 'storage',
    brand: 'bamboo',
    colors: ['Natural', 'Charcoal', 'White'],
    inStock: true,
    description: 'Keep your bread fresh longer with our stylish Bread Box.',
    rating: 4.4,
    reviews: 41,
    faqs: [
      { question: 'Can the lid be used as a cutting board?', answer: 'Yes, the bamboo lid is designed to double as a crumb-catching bread board.' },
      { question: 'Is it big enough for a large loaf?', answer: 'Yes, it easily fits a standard large sandwich loaf or several smaller rolls.' }
    ]
  },
  {
    _id: '37',
    id: 37,
    name: 'Drawer Organizer Set | 4 Pieces',
    price: 599,
    originalPrice: 899,
    primaryImage: '/images/product-storage-jars.jpg',
    hoverImage: '/images/drawer-natural-2.jpg',
    images: {
      Natural: ['/images/drawer-natural-1.jpg', '/images/drawer-natural-2.jpg'],
      Charcoal: ['/images/drawer-charcoal-1.jpg', '/images/drawer-charcoal-2.jpg']
    },
    category: 'storage',
    brand: 'bamboo',
    colors: ['Natural', 'Charcoal'],
    inStock: true,
    description: 'Bring order to your drawers with our adjustable Drawer Organizer Set.',
    rating: 4.3,
    reviews: 36,
    faqs: [
      { question: 'What is the height of the organizers?', answer: 'They are 2 inches high, fitting most standard kitchen and office drawers.' },
      { question: 'Are they water-resistant?', answer: 'The bamboo is sealed, but they should be wiped dry if they get wet.' }
    ]
  },

  // ==================== KITCHENWARE (6 products) ====================
  {
    _id: '13',
    id: 13,
    name: 'Bio-Composite Cutting Board Set | 3 Pieces',
    price: 899,
    originalPrice: 1499,
    primaryImage: '/images/product-chai-cups.jpg',
    hoverImage: '/images/cutting-bamboo-2.jpg',
    images: {
      Bamboo: ['/images/cutting-bamboo-1.jpg', '/images/cutting-bamboo-2.jpg', '/images/cutting-bamboo-3.jpg'],
      Charcoal: ['/images/cutting-charcoal-1.jpg', '/images/cutting-charcoal-2.jpg'],
      Natural: ['/images/cutting-natural-1.jpg', '/images/cutting-natural-2.jpg']
    },
    category: 'kitchenware',
    brand: 'bamboo',
    colors: ['Bamboo', 'Charcoal', 'Natural'],
    inStock: true,
    description: 'Complete your kitchen prep with this versatile Cutting Board Set.',
    rating: 4.5,
    reviews: 67,
    faqs: [
      { question: 'Does the board absorb smells?', answer: 'No, the high-density bio-composite is non-porous and resists odors.' },
      { question: 'Are these boards reversible?', answer: 'Yes, both sides can be used for cutting.' }
    ]
  },
  {
    _id: '14',
    id: 14,
    name: 'Eco-Friendly Wooden Utensil Set | 6 Pieces',
    price: 549,
    originalPrice: 899,
    primaryImage: '/images/product-storage-jars.jpg',
    hoverImage: '/images/utensil-natural-2.jpg',
    images: {
      'Natural Wood': ['/images/utensil-natural-1.jpg', '/images/utensil-natural-2.jpg'],
      Walnut: ['/images/utensil-walnut-1.jpg', '/images/utensil-walnut-2.jpg']
    },
    category: 'kitchenware',
    brand: 'bamboo',
    colors: ['Natural Wood', 'Walnut'],
    inStock: true,
    description: 'Cook with nature using our Eco-Friendly Wooden Utensil Set.',
    rating: 4.6,
    reviews: 89,
    faqs: [
      { question: 'Will these scratch my non-stick pans?', answer: 'No, these wooden utensils are completely safe for all non-stick cookware.' },
      { question: 'How should I maintain them?', answer: 'Hand wash only and occasionally rub with food-safe mineral oil.' }
    ]
  },
  {
    _id: '15',
    id: 15,
    name: 'Sustainable Mixing Bowls | Set of 3',
    price: 799,
    originalPrice: 1299,
    primaryImage: '/images/product-pasta-bowls.jpg',
    hoverImage: '/images/mixing-azure-2.jpg',
    images: {
      Azure: ['/images/mixing-azure-1.jpg', '/images/mixing-azure-2.jpg'],
      Innocent: ['/images/mixing-innocent-1.jpg', '/images/mixing-innocent-2.jpg'],
      'Sand Castle': ['/images/mixing-sand-1.jpg', '/images/mixing-sand-2.jpg']
    },
    category: 'kitchenware',
    brand: 'Thulira',
    colors: ['Azure', 'Innocent', 'Sand Castle'],
    inStock: true,
    description: 'Mix, prep, and serve with our Sustainable Mixing Bowl set.',
    rating: 4.4,
    reviews: 78,
    faqs: [
      { question: 'Do they have a non-slip base?', answer: 'Yes, the base is designed to be stable during heavy mixing.' },
      { question: 'Are they microwave safe?', answer: 'No, these are not intended for microwave use.' }
    ]
  },
  {
    _id: '38',
    id: 38,
    name: 'Colander/Strainer Set | 2 Pieces',
    price: 599,
    originalPrice: 899,
    primaryImage: '/images/category-tableware.jpg',
    hoverImage: '/images/colander-white-2.jpg',
    images: {
      White: ['/images/colander-white-1.jpg', '/images/colander-white-2.jpg'],
      Green: ['/images/colander-green-1.jpg', '/images/colander-green-2.jpg'],
      Blue: ['/images/colander-blue-1.jpg', '/images/colander-blue-2.jpg']
    },
    category: 'kitchenware',
    brand: 'rice',
    colors: ['White', 'Green', 'Blue'],
    inStock: true,
    description: 'Drain pasta, rinse vegetables, and wash fruits with our versatile Colander Set.',
    rating: 4.3,
    reviews: 42,
    faqs: [
      { question: 'Is the mesh fine enough for quinoa?', answer: 'The smaller strainer in the set is suitable for most grains including quinoa.' },
      { question: 'Are they heat resistant?', answer: 'Yes, they can safely handle boiling water for pasta.' }
    ]
  },
  {
    _id: '40',
    id: 40,
    name: 'Kitchen Tool Set | 5 Pieces',
    price: 1299,
    originalPrice: 1999,
    primaryImage: '/images/category-storage.jpg',
    hoverImage: '/images/tool-natural-2.jpg',
    images: {
      Natural: ['/images/tool-natural-1.jpg', '/images/tool-natural-2.jpg'],
      Black: ['/images/tool-black-1.jpg', '/images/tool-black-2.jpg']
    },
    category: 'kitchenware',
    brand: 'bamboo',
    colors: ['Natural', 'Black'],
    inStock: true,
    description: 'Equip your kitchen with essential tools in this comprehensive 5-piece set.',
    rating: 4.5,
    reviews: 56,
    faqs: [
      { question: 'Are the metal parts stainless steel?', answer: 'Yes, all cutting and opening edges are made of 304-grade stainless steel.' },
      { question: 'Are the handles ergonomic?', answer: 'Yes, they are designed with a soft-touch bio-composite grip.' }
    ]
  },
  {
    _id: '41',
    id: 41,
    name: 'Measuring Cups & Spoons Set | 10 Pieces',
    price: 449,
    originalPrice: 649,
    primaryImage: '/images/product-storage-jars.jpg',
    hoverImage: '/images/measure-azure-2.jpg',
    images: {
      Azure: ['/images/measure-azure-1.jpg', '/images/measure-azure-2.jpg'],
      Celeste: ['/images/measure-celeste-1.jpg', '/images/measure-celeste-2.jpg'],
      Innocent: ['/images/measure-innocent-1.jpg', '/images/measure-innocent-2.jpg']
    },
    category: 'kitchenware',
    brand: 'rice',
    colors: ['Azure', 'Celeste', 'Innocent'],
    inStock: true,
    description: 'Measure ingredients accurately with our complete Measuring Set.',
    rating: 4.2,
    reviews: 63,
    faqs: [
      { question: 'Are the markings engraved or printed?', answer: 'The markings are engraved into the handles so they will never rub off.' },
      { question: 'Do they nest together?', answer: 'Yes, both sets come with a removable ring to keep them nested and organized.' }
    ]
  },

  // ==================== HOMEWARE (6 products) ====================
  {
    _id: '16',
    id: 16,
    name: 'Bio-Composite Serving Tray | Large',
    price: 649,
    originalPrice: 1099,
    primaryImage: '/images/product-planters.jpg',
    hoverImage: '/images/tray-natural-2.jpg',
    images: {
      Natural: ['/images/tray-natural-1.jpg', '/images/tray-natural-2.jpg'],
      Walnut: ['/images/tray-walnut-1.jpg', '/images/tray-walnut-2.jpg'],
      Charcoal: ['/images/tray-charcoal-1.jpg', '/images/tray-charcoal-2.jpg']
    },
    category: 'homeware',
    brand: 'bamboo',
    colors: ['Natural', 'Walnut', 'Charcoal'],
    inStock: true,
    description: 'Serve in style with our Bio-Composite Serving Tray.',
    rating: 4.4,
    reviews: 52,
    faqs: [
      { question: 'Is the surface slip-resistant?', answer: 'The tray has a slight texture to help prevent glasses from sliding.' },
      { question: 'What are the dimensions?', answer: 'The tray measures approximately 15 x 10 inches.' }
    ]
  },
  {
    _id: '17',
    id: 17,
    name: 'Eco-Friendly Coasters | Set of 6',
    price: 299,
    originalPrice: 499,
    primaryImage: '/images/category-drinkware.jpg',
    hoverImage: '/images/coaster-bamboo-2.jpg',
    images: {
      Bamboo: ['/images/coaster-bamboo-1.jpg', '/images/coaster-bamboo-2.jpg'],
      Cork: ['/images/coaster-cork-1.jpg', '/images/coaster-cork-2.jpg'],
      Natural: ['/images/coaster-natural-1.jpg', '/images/coaster-natural-2.jpg'],
      Charcoal: ['/images/coaster-charcoal-1.jpg', '/images/coaster-charcoal-2.jpg']
    },
    category: 'homeware',
    brand: 'Thulira',
    colors: ['Bamboo', 'Cork', 'Natural', 'Charcoal'],
    inStock: true,
    description: 'Protect your surfaces in style with our Eco-Friendly Coaster set.',
    rating: 4.3,
    reviews: 78,
    faqs: [
      { question: 'Are they absorbent?', answer: 'Yes, both cork and bamboo variants are designed to absorb condensation.' },
      { question: 'Do they have a non-scratch bottom?', answer: 'Yes, the base is soft-finished to protect delicate table surfaces.' }
    ]
  },
  {
    _id: '18',
    id: 18,
    name: 'Sustainable Wall Hooks | Set of 3',
    price: 449,
    originalPrice: 749,
    primaryImage: '/images/hero-slide-3.jpg',
    hoverImage: '/images/hook-natural-2.jpg',
    images: {
      'Natural Wood': ['/images/hook-natural-1.jpg', '/images/hook-natural-2.jpg'],
      Black: ['/images/hook-black-1.jpg', '/images/hook-black-2.jpg'],
      White: ['/images/hook-white-1.jpg', '/images/hook-white-2.jpg']
    },
    category: 'homeware',
    brand: 'bamboo',
    colors: ['Natural Wood', 'Black', 'White'],
    inStock: true,
    description: 'Add functional style to your walls with our Sustainable Wall Hook set.',
    rating: 4.2,
    reviews: 63,
    faqs: [
      { question: 'How much weight can each hook hold?', answer: 'When properly installed, each hook can hold up to 5kg.' },
      { question: 'Is mounting hardware included?', answer: 'Yes, screws and wall anchors are included in the package.' }
    ]
  },
  {
    _id: '43',
    id: 43,
    name: 'Bamboo Tissue Box Cover',
    price: 399,
    originalPrice: 599,
    primaryImage: '/images/product-planters.jpg',
    hoverImage: '/images/tissue-natural-2.jpg',
    images: {
      Natural: ['/images/tissue-natural-1.jpg', '/images/tissue-natural-2.jpg'],
      Walnut: ['/images/tissue-walnut-1.jpg', '/images/tissue-walnut-2.jpg'],
      Charcoal: ['/images/tissue-charcoal-1.jpg', '/images/tissue-charcoal-2.jpg']
    },
    category: 'homeware',
    brand: 'bamboo',
    colors: ['Natural', 'Walnut', 'Charcoal'],
    inStock: true,
    description: 'Elevate everyday essentials with our Bamboo Tissue Box Cover.',
    rating: 4.1,
    reviews: 44,
    faqs: [
      { question: 'Does it have a bottom?', answer: 'Yes, it features a sliding bottom panel to keep the tissue box secure.' },
      { question: 'Will it fit standard-sized tissue boxes?', answer: 'It is designed to fit most standard rectangular tissue boxes.' }
    ]
  },
  {
    _id: '44',
    id: 44,
    name: 'Desk Organizer Set | 3 Pieces',
    price: 699,
    originalPrice: 999,
    primaryImage: '/images/category-storage.jpg',
    hoverImage: '/images/desk-natural-2.jpg',
    images: {
      Natural: ['/images/desk-natural-1.jpg', '/images/desk-natural-2.jpg'],
      Charcoal: ['/images/desk-charcoal-1.jpg', '/images/desk-charcoal-2.jpg']
    },
    category: 'homeware',
    brand: 'bamboo',
    colors: ['Natural', 'Charcoal'],
    inStock: true,
    description: 'Create an organized, productive workspace with our Desk Organizer Set.',
    rating: 4.3,
    reviews: 37,
    faqs: [
      { question: 'Are the pieces separate?', answer: 'Yes, the three pieces can be arranged independently to fit your desk layout.' },
      { question: 'Is it sustainable?', answer: 'Yes, it is made from 100% sustainably sourced bamboo.' }
    ]
  },
  {
    _id: '46',
    id: 46,
    name: 'Magazine Rack',
    price: 899,
    originalPrice: 1299,
    primaryImage: '/images/hero-slide-3.jpg',
    hoverImage: '/images/magazine-natural-2.jpg',
    images: {
      Natural: ['/images/magazine-natural-1.jpg', '/images/magazine-natural-2.jpg'],
      Walnut: ['/images/magazine-walnut-1.jpg', '/images/magazine-walnut-2.jpg'],
      Charcoal: ['/images/magazine-charcoal-1.jpg', '/images/magazine-charcoal-2.jpg']
    },
    category: 'homeware',
    brand: 'bamboo',
    colors: ['Natural', 'Walnut', 'Charcoal'],
    inStock: true,
    description: 'Keep your reading materials organized and accessible with our Bamboo Magazine Rack.',
    rating: 4.2,
    reviews: 33,
    faqs: [
      { question: 'Does it require assembly?', answer: 'No, it comes fully assembled and ready to use.' },
      { question: 'Can it hold heavy books?', answer: 'It is designed for magazines and catalogs, but can hold a few lightweight books.' }
    ]
  },

  // ==================== BAKEWARE (6 products) ====================
  {
    _id: '19',
    id: 19,
    name: 'Bio-Composite Baking Dish | Rectangular',
    price: 899,
    originalPrice: 1499,
    primaryImage: '/images/product-pasta-bowls.jpg',
    hoverImage: '/images/bake-natural-2.jpg',
    images: {
      Natural: ['/images/bake-natural-1.jpg', '/images/bake-natural-2.jpg'],
      Charcoal: ['/images/bake-charcoal-1.jpg', '/images/bake-charcoal-2.jpg'],
      Terracotta: ['/images/bake-terracotta-1.jpg', '/images/bake-terracotta-2.jpg']
    },
    category: 'bakeware',
    brand: 'Thulira',
    colors: ['Natural', 'Charcoal', 'Terracotta'],
    inStock: true,
    description: 'Bake beautiful casseroles, lasagnas, and desserts with our Bio-Composite Baking Dish.',
    rating: 4.6,
    reviews: 58,
    faqs: [
      { question: 'Is it oven safe?', answer: 'Yes, it is safe for use in ovens up to 450°F (230°C).' },
      { question: 'Is it non-stick?', answer: 'It has natural non-stick properties, but greasing is recommended for best results.' }
    ]
  },
  {
    _id: '20',
    id: 20,
    name: 'Eco-Friendly Muffin Pan | 12 Cups',
    price: 699,
    originalPrice: 1199,
    primaryImage: '/images/category-storage.jpg',
    hoverImage: '/images/muffin-nonstick-2.jpg',
    images: {
      'Non-Stick': ['/images/muffin-nonstick-1.jpg', '/images/muffin-nonstick-2.jpg'],
      Natural: ['/images/muffin-natural-1.jpg', '/images/muffin-natural-2.jpg']
    },
    category: 'bakeware',
    brand: 'bamboo',
    colors: ['Non-Stick', 'Natural'],
    inStock: true,
    description: 'Bake perfect muffins and cupcakes with our Eco-Friendly Muffin Pan.',
    rating: 4.4,
    reviews: 45,
    faqs: [
      { question: 'Do I need muffin liners?', answer: 'You can use liners, but the non-stick version works well with just a light spray of oil.' },
      { question: 'Is it easy to clean?', answer: 'Yes, it is dishwasher safe and residue wipes off easily.' }
    ]
  },
  {
    _id: '47',
    id: 47,
    name: 'Loaf Pan for Baking',
    price: 499,
    originalPrice: 749,
    primaryImage: '/images/product-pasta-bowls.jpg',
    hoverImage: '/images/loaf-natural-2.jpg',
    images: {
      Natural: ['/images/loaf-natural-1.jpg', '/images/loaf-natural-2.jpg'],
      Charcoal: ['/images/loaf-charcoal-1.jpg', '/images/loaf-charcoal-2.jpg']
    },
    category: 'bakeware',
    brand: 'Thulira',
    colors: ['Natural', 'Charcoal'],
    inStock: true,
    description: 'Bake perfect banana bread, meatloaf, or pound cake with our Loaf Pan.',
    rating: 4.3,
    reviews: 36,
    faqs: [
      { question: 'Is it metal?', answer: 'It is a high-heat bio-composite material that mimics the heat distribution of professional bakeware.' },
      { question: 'What is the size?', answer: 'It is a standard 9x5 inch loaf pan.' }
    ]
  },
  {
    _id: '48',
    id: 48,
    name: 'Round Cake Pan | 9 inch',
    price: 449,
    originalPrice: 699,
    primaryImage: '/images/category-tableware.jpg',
    hoverImage: '/images/cake-natural-2.jpg',
    images: {
      Natural: ['/images/cake-natural-1.jpg', '/images/cake-natural-2.jpg'],
      Charcoal: ['/images/cake-charcoal-1.jpg', '/images/cake-charcoal-2.jpg']
    },
    category: 'bakeware',
    brand: 'bamboo',
    colors: ['Natural', 'Charcoal'],
    inStock: true,
    description: 'Create beautiful layer cakes with our Round Cake Pan.',
    rating: 4.2,
    reviews: 41,
    faqs: [
      { question: 'Will the cake stick?', answer: 'The pan has a smooth finish; greasing and flouring is still recommended for perfect release.' },
      { question: 'Is it deep enough for thick cakes?', answer: 'Yes, it has a 2-inch depth.' }
    ]
  },
  {
    _id: '49',
    id: 49,
    name: 'Cookie Sheet | Large',
    price: 599,
    originalPrice: 899,
    primaryImage: '/images/product-chai-cups.jpg',
    hoverImage: '/images/cookie-natural-2.jpg',
    images: {
      Natural: ['/images/cookie-natural-1.jpg', '/images/cookie-natural-2.jpg'],
      Charcoal: ['/images/cookie-charcoal-1.jpg', '/images/cookie-charcoal-2.jpg']
    },
    category: 'bakeware',
    brand: 'Thulira',
    colors: ['Natural', 'Charcoal'],
    inStock: true,
    description: 'Bake cookies, roast vegetables, and more with our Large Cookie Sheet.',
    rating: 4.5,
    reviews: 53,
    faqs: [
      { question: 'Does it warp in high heat?', answer: 'No, the reinforced bio-composite structure is designed to remain flat under heat.' },
      { question: 'Can I use parchment paper on it?', answer: 'Yes, parchment paper and silicone mats are compatible.' }
    ]
  },
  {
    _id: '76',
    id: 76,
    name: 'Pie Dish | 9 inch',
    price: 649,
    originalPrice: 999,
    primaryImage: '/images/product-pasta-bowls.jpg',
    hoverImage: '/images/pie-natural-2.jpg',
    images: {
      Natural: ['/images/pie-natural-1.jpg', '/images/pie-natural-2.jpg'],
      Terracotta: ['/images/pie-terracotta-1.jpg', '/images/pie-terracotta-2.jpg']
    },
    category: 'bakeware',
    brand: 'Thulira',
    colors: ['Natural', 'Terracotta'],
    inStock: true,
    description: 'Bake beautiful pies and quiches with our Ceramic Pie Dish.',
    rating: 4.4,
    reviews: 29,
    faqs: [
      { question: 'Is this ceramic or bio-composite?', answer: 'This specific product is made of high-fired ceramic for superior crust browning.' },
      { question: 'Is it dishwasher safe?', answer: 'Yes, it is safe for the dishwasher, microwave, and oven.' }
    ]
  },

  // ==================== GARDENWARE (6 products) ====================
  {
    _id: '3',
    id: 3,
    name: 'Planters Linea 5.5 Inch | Set of 6',
    price: 751,
    originalPrice: 1332,
    primaryImage: '/images/product-planters.jpg',
    hoverImage: '/images/linea-coral-2.jpg',
    images: {
      Coral: ['/images/linea-coral-1.jpg', '/images/linea-coral-2.jpg'],
      Fern: ['/images/linea-fern-1.jpg', '/images/linea-fern-2.jpg'],
      'Sand Castle': ['/images/linea-sand-1.jpg', '/images/linea-sand-2.jpg'],
      Azure: ['/images/linea-azure-1.jpg', '/images/linea-azure-2.jpg']
    },
    category: 'gardenware',
    brand: 'bamboo',
    colors: ['Coral', 'Fern', 'Sand Castle', 'Azure'],
    inStock: true,
    description: 'Display your plants beautifully with our Planters Linea set.',
    rating: 4.5,
    reviews: 94,
    faqs: [
      { question: 'Do these have drainage holes?', answer: 'Yes, each planter comes with a pre-drilled drainage hole and a matching saucer.' },
      { question: 'Can they be used outdoors?', answer: 'Yes, they are UV-resistant and suitable for both indoor and outdoor use.' }
    ]
  },
  {
    _id: '9',
    id: 9,
    name: 'Romano 7.5 inch Planters | Set of 2',
    price: 839,
    originalPrice: 1525,
    primaryImage: '/images/category-gardenware.jpg',
    hoverImage: '/images/romano-innocent-2.jpg',
    images: {
      Innocent: ['/images/romano-innocent-1.jpg', '/images/romano-innocent-2.jpg'],
      Coral: ['/images/romano-coral-1.jpg', '/images/romano-coral-2.jpg'],
      Fern: ['/images/romano-fern-1.jpg', '/images/romano-fern-2.jpg'],
      'Sand Castle': ['/images/romano-sand-1.jpg', '/images/romano-sand-2.jpg']
    },
    category: 'gardenware',
    brand: 'bamboo',
    colors: ['Innocent', 'Coral', 'Fern', 'Sand Castle'],
    inStock: true,
    description: 'Make a statement with our Romano Planter set.',
    rating: 4.6,
    reviews: 78,
    faqs: [
      { question: 'Will the color fade in the sun?', answer: 'No, the material is UV-stabilized to prevent fading in direct sunlight.' },
      { question: 'Are they heavy?', answer: 'They are lightweight and easy to move compared to stone or ceramic pots.' }
    ]
  },
  {
    _id: '53',
    id: 53,
    name: 'Hanging Planters | Set of 3',
    price: 899,
    originalPrice: 1399,
    primaryImage: '/images/product-planters.jpg',
    hoverImage: '/images/hanging-natural-2.jpg',
    images: {
      Natural: ['/images/hanging-natural-1.jpg', '/images/hanging-natural-2.jpg'],
      White: ['/images/hanging-white-1.jpg', '/images/hanging-white-2.jpg'],
      Charcoal: ['/images/hanging-charcoal-1.jpg', '/images/hanging-charcoal-2.jpg']
    },
    category: 'gardenware',
    brand: 'bamboo',
    colors: ['Natural', 'White', 'Charcoal'],
    inStock: true,
    description: 'Add dimension to your plant display with our Hanging Planter set.',
    rating: 4.4,
    reviews: 56,
    faqs: [
      { question: 'Is the rope included?', answer: 'Yes, high-quality jute hanging ropes are included for all three planters.' },
      { question: 'Do they leak when watering?', answer: 'They include an internal reservoir to prevent immediate dripping.' }
    ]
  },
  {
    _id: '54',
    id: 54,
    name: 'Succulent Planter Set | 4 Pieces',
    price: 599,
    originalPrice: 899,
    primaryImage: '/images/category-gardenware.jpg',
    hoverImage: '/images/succulent-azure-2.jpg',
    images: {
      Azure: ['/images/succulent-azure-1.jpg', '/images/succulent-azure-2.jpg'],
      Coral: ['/images/succulent-coral-1.jpg', '/images/succulent-coral-2.jpg'],
      Fern: ['/images/succulent-fern-1.jpg', '/images/succulent-fern-2.jpg'],
      'Sand Castle': ['/images/succulent-sand-1.jpg', '/images/succulent-sand-2.jpg']
    },
    category: 'gardenware',
    brand: 'Thulira',
    colors: ['Azure', 'Coral', 'Fern', 'Sand Castle'],
    inStock: true,
    description: 'Create the perfect succulent garden with our specialized Succulent Planter set.',
    rating: 4.3,
    reviews: 62,
    faqs: [
      { question: 'What is the size of each pot?', answer: 'Each pot is approximately 3 inches in diameter, perfect for small succulents.' },
      { question: 'Is the wooden tray included?', answer: 'Yes, a matching wooden display tray is included.' }
    ]
  },
  {
    _id: '55',
    id: 55,
    name: 'Self-Watering Planter | Medium',
    price: 699,
    originalPrice: 999,
    primaryImage: '/images/product-planters.jpg',
    hoverImage: '/images/self-white-2.jpg',
    images: {
      White: ['/images/self-white-1.jpg', '/images/self-white-2.jpg'],
      Green: ['/images/self-green-1.jpg', '/images/self-green-2.jpg'],
      Terracotta: ['/images/self-terracotta-1.jpg', '/images/self-terracotta-2.jpg']
    },
    category: 'gardenware',
    brand: 'bamboo',
    colors: ['White', 'Green', 'Terracotta'],
    inStock: true,
    description: 'Keep your plants hydrated with our Self-Watering Planter.',
    rating: 4.5,
    reviews: 48,
    faqs: [
      { question: 'How often do I need to refill the water?', answer: 'Depending on the plant, the reservoir usually lasts 1-2 weeks.' },
      { question: 'Is there a water level indicator?', answer: 'Yes, it features a clear indicator to show when a refill is needed.' }
    ]
  },
  {
    _id: '56',
    id: 56,
    name: 'Herb Planter Kit with Seeds',
    price: 799,
    originalPrice: 1199,
    primaryImage: '/images/category-gardenware.jpg',
    hoverImage: '/images/herb-natural-2.jpg',
    images: {
      Natural: ['/images/herb-natural-1.jpg', '/images/herb-natural-2.jpg'],
      Green: ['/images/herb-green-1.jpg', '/images/herb-green-2.jpg']
    },
    category: 'gardenware',
    brand: 'Thulira',
    colors: ['Natural', 'Green'],
    inStock: true,
    description: 'Grow your own fresh herbs with our complete Herb Planter Kit.',
    rating: 4.6,
    reviews: 71,
    faqs: [
      { question: 'What seeds are included?', answer: 'The kit includes organic Basil, Cilantro, and Mint seeds.' },
      { question: 'Is soil provided?', answer: 'Yes, compressed organic soil discs are included in the kit.' }
    ]
  },

  // ==================== GIFTING (6 products) ====================
  {
    _id: '57',
    id: 57,
    name: 'Tea Lover Gift Set',
    price: 1299,
    originalPrice: 1999,
    primaryImage: '/images/product-chai-cups.jpg',
    hoverImage: '/images/gift-tea-2.jpg',
    images: {
      Multi: ['/images/gift-tea-1.jpg', '/images/gift-tea-2.jpg', '/images/gift-tea-3.jpg']
    },
    category: 'gifting',
    brand: 'Thulira',
    colors: ['Multi'],
    inStock: true,
    description: 'Delight the tea enthusiast in your life with our Tea Lover Gift Set.',
    rating: 4.7,
    reviews: 43,
    faqs: [
      { question: 'Can I add a gift message?', answer: 'Yes, you can add a personalized message at checkout.' },
      { question: 'Is the packaging eco-friendly?', answer: 'Yes, the set is packed in a recycled cardboard box with paper-based cushioning.' }
    ]
  },
  {
    _id: '58',
    id: 58,
    name: 'Coffee Connoisseur Set',
    price: 1499,
    originalPrice: 2299,
    primaryImage: '/images/category-drinkware.jpg',
    hoverImage: '/images/gift-coffee-2.jpg',
    images: {
      Multi: ['/images/gift-coffee-1.jpg', '/images/gift-coffee-2.jpg']
    },
    category: 'gifting',
    brand: 'coffee',
    colors: ['Multi'],
    inStock: true,
    description: 'Treat the coffee lover with our Coffee Connoisseur Set.',
    rating: 4.6,
    reviews: 38,
    faqs: [
      { question: 'Is the coffee ground or whole bean?', answer: 'The set includes medium-grind coffee suitable for most brewers.' },
      { question: 'Are the mugs microwave safe?', answer: 'Yes, the ceramic mugs in this set are microwave and dishwasher safe.' }
    ]
  },
  {
    _id: '59',
    id: 59,
    name: 'Spa & Self Care Gift Set',
    price: 1699,
    originalPrice: 2499,
    primaryImage: '/images/product-planters.jpg',
    hoverImage: '/images/gift-spa-2.jpg',
    images: {
      Natural: ['/images/gift-spa-1.jpg', '/images/gift-spa-2.jpg']
    },
    category: 'gifting',
    brand: 'bamboo',
    colors: ['Natural'],
    inStock: true,
    description: 'Encourage relaxation with our Spa & Self Care Gift Set.',
    rating: 4.5,
    reviews: 31,
    faqs: [
      { question: 'Will the tray fit my tub?', answer: 'The bamboo tray is adjustable and fits most standard-width bathtubs.' },
      { question: 'Are the soaps organic?', answer: 'Yes, all soaps included are handmade and 100% organic.' }
    ]
  },
  {
    _id: '60',
    id: 60,
    name: 'Kitchen Starter Set',
    price: 1899,
    originalPrice: 2799,
    primaryImage: '/images/product-storage-jars.jpg',
    hoverImage: '/images/gift-kitchen-2.jpg',
    images: {
      Multi: ['/images/gift-kitchen-1.jpg', '/images/gift-kitchen-2.jpg']
    },
    category: 'gifting',
    brand: 'rice',
    colors: ['Multi'],
    inStock: true,
    description: 'Help someone stock their kitchen with our Kitchen Starter Set.',
    rating: 4.4,
    reviews: 27,
    faqs: [
      { question: 'Is this good for a housewarming gift?', answer: 'Absolutely, it covers all the basic essentials for a new home.' },
      { question: 'Can the components be returned separately?', answer: 'No, gift sets must be returned as a complete package.' }
    ]
  },
  {
    _id: '61',
    id: 61,
    name: 'Plant Parent Gift Box',
    price: 1399,
    originalPrice: 1999,
    primaryImage: '/images/category-gardenware.jpg',
    hoverImage: '/images/gift-plant-2.jpg',
    images: {
      Multi: ['/images/gift-plant-1.jpg', '/images/gift-plant-2.jpg']
    },
    category: 'gifting',
    brand: 'bamboo',
    colors: ['Multi'],
    inStock: true,
    description: 'Celebrate the plant lover with our Plant Parent Gift Box.',
    rating: 4.5,
    reviews: 35,
    faqs: [
      { question: 'Does it include plants?', answer: 'The box includes planters and tools, but live plants are not included.' },
      { question: 'Are the tools full-sized?', answer: 'They are specialized hand tools designed for indoor gardening.' }
    ]
  },
  {
    _id: '62',
    id: 62,
    name: 'Eco-Friendly Entertaining Set',
    price: 2199,
    originalPrice: 3299,
    primaryImage: '/images/category-tableware.jpg',
    hoverImage: '/images/gift-entertain-2.jpg',
    images: {
      Multi: ['/images/gift-entertain-1.jpg', '/images/gift-entertain-2.jpg']
    },
    category: 'gifting',
    brand: 'Thulira',
    colors: ['Multi'],
    inStock: true,
    description: 'Host in style with our Eco-Friendly Entertaining Set.',
    rating: 4.7,
    reviews: 22,
    faqs: [
      { question: 'How many people does this serve?', answer: 'This set is designed for a service of 4 people.' },
      { question: 'Is the serving platter oven-safe?', answer: 'The platter is for serving only and should not be used in the oven.' }
    ]
  }
];

// Helper functions (unchanged)
export const getProductsByCategory = (categoryId) => PRODUCTS.filter(p => p.category === categoryId);
export const getAllCategories = () => CATEGORIES;
export const getCategoryById = (categoryId) => CATEGORIES.find(c => c.id === categoryId);
export const getProductById = (productId) => PRODUCTS.find(p => p._id === productId || p.id === parseInt(productId));
export const getAllProducts = () => [...PRODUCTS];
export const getProductsByBrand = (brand) => PRODUCTS.filter(p => p.brand === brand);
export const getInStockProducts = () => PRODUCTS.filter(p => p.inStock);
export const getOutOfStockProducts = () => PRODUCTS.filter(p => !p.inStock);
export const getProductsOnSale = () => PRODUCTS.filter(p => p.originalPrice && p.originalPrice > p.price);

export const CATEGORY_INFO = {
  drinkware: { name: 'Drinkware', title: 'Drinkware Collection', description: 'Sustainable cups, mugs, and beverage containers.', image: '/images/category-drinkware.jpg' },
  tableware: { name: 'Tableware', title: 'Tableware Collection', description: 'Eco-friendly plates and bowls.', image: '/images/category-tableware.jpg' },
  storage: { name: 'Storage', title: 'Storage Collection', description: 'Organize with sustainable jars.', image: '/images/category-storage.jpg' },
  kitchenware: { name: 'Kitchenware', title: 'Kitchenware Collection', description: 'Bio-composite kitchen essentials.', image: '/images/product-chai-cups.jpg' },
  homeware: { name: 'Homeware', title: 'Homeware Collection', description: 'Sustainable home decor.', image: '/images/product-planters.jpg' },
  bakeware: { name: 'Bakeware', title: 'Bakeware Collection', description: 'Oven-safe baking dishes.', image: '/images/product-pasta-bowls.jpg' },
  gardenware: { name: 'Gardenware', title: 'Gardenware Collection', description: 'Bio-composite planters.', image: '/images/category-gardenware.jpg' },
  gifting: { name: 'Gifting', title: 'Gift Collections', description: 'Curated gift sets.', image: '/images/product-storage-jars.jpg' }
};