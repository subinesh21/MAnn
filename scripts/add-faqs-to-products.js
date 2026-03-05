// Script to add FAQs to all products in MongoDB
const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

// Sample FAQ templates by category
const faqTemplates = {
  drinkware: [
    {
      question: 'Is this product dishwasher safe?',
      answer: 'Yes, this product is dishwasher safe. However, hand washing is recommended to maintain its appearance and longevity.'
    },
    {
      question: 'Can I use this for hot beverages?',
      answer: 'Absolutely! This product is heat-resistant and perfect for hot beverages like coffee, tea, or hot chocolate.'
    },
    {
      question: 'Is this product microwave safe?',
      answer: 'No, this bio-composite product is not microwave safe. It\'s designed for serving hot beverages but should not be heated directly in a microwave.'
    }
  ],
  tableware: [
    {
      question: 'Are these plates/bowls oven safe?',
      answer: 'These are oven-safe up to moderate temperatures (around 200°C/400°F). They\'re perfect for serving hot dishes and can be used for warming food in the oven.'
    },
    {
      question: 'How do I clean these items?',
      answer: 'These items are dishwasher safe, but hand washing with mild soap and water is recommended to preserve their finish and extend their lifespan.'
    },
    {
      question: 'Are these suitable for outdoor use?',
      answer: 'Yes! These eco-friendly tableware items are durable and great for both indoor dining and outdoor picnics or parties.'
    }
  ],
  storage: [
    {
      question: 'Are these containers airtight?',
      answer: 'Yes, these containers feature airtight lids with silicone seals that keep your stored items fresh and protected from moisture.'
    },
    {
      question: 'Can I store liquids in these containers?',
      answer: 'Yes, the airtight seal makes them suitable for storing both dry goods and liquids. Just ensure the lid is properly closed.'
    },
    {
      question: 'Are these freezer safe?',
      answer: 'Yes, these containers are freezer-safe and perfect for storing leftovers, meal prep, or bulk ingredients.'
    }
  ],
  kitchenware: [
    {
      question: 'Are these tools heat resistant?',
      answer: 'Yes, these kitchen tools are heat-resistant and safe to use with hot cookware. They won\'t melt or warp under normal cooking conditions.'
    },
    {
      question: 'How do I clean these utensils?',
      answer: 'These utensils are easy to clean - simply wash with warm soapy water. They are also dishwasher safe for added convenience.'
    },
    {
      question: 'Will these scratch my non-stick pans?',
      answer: 'No, these eco-friendly utensils are gentle on all cookware surfaces, including non-stick coatings, cast iron, and stainless steel.'
    }
  ],
  homeware: [
    {
      question: 'How do I clean this item?',
      answer: 'Simply wipe clean with a damp cloth. For deeper cleaning, use mild soap and water, then dry thoroughly.'
    },
    {
      question: 'Is this suitable for bathroom use?',
      answer: 'Yes, this product is moisture-resistant and works well in bathrooms, kitchens, or any room in your home.'
    },
    {
      question: 'Does this item have a warranty?',
      answer: 'Yes, all our homeware items come with a manufacturer\'s warranty against defects. Please contact us if you experience any issues.'
    }
  ],
  bakeware: [
    {
      question: 'What temperature can this withstand?',
      answer: 'This bakeware is oven-safe up to 230°C (450°F), making it suitable for most baking needs including cakes, breads, and casseroles.'
    },
    {
      question: 'Do I need to grease this before use?',
      answer: 'While this bakeware has natural release properties, we recommend light greasing or lining for best results, especially with sticky batters.'
    },
    {
      question: 'Can I use metal utensils with this?',
      answer: 'It\'s best to use wooden, silicone, or plastic utensils to preserve the surface of this eco-friendly bakeware.'
    }
  ],
  gardenware: [
    {
      question: 'Does this planter have drainage holes?',
      answer: 'Yes, this planter includes drainage holes to prevent overwatering and ensure healthy root growth for your plants.'
    },
    {
      question: 'Can I use this planter outdoors?',
      answer: 'Absolutely! This planter is weather-resistant and suitable for both indoor and outdoor use.'
    },
    {
      question: 'What size plants are suitable for this pot?',
      answer: 'This planter is ideal for small to medium-sized plants, succulents, herbs, or seedlings. Check the product dimensions for specific sizing.'
    }
  ],
  gifting: [
    {
      question: 'Does this come gift-wrapped?',
      answer: 'Yes, this gift set comes beautifully packaged in eco-friendly wrapping, ready to give as a present.'
    },
    {
      question: 'Can I customize this gift set?',
      answer: 'Currently, our gift sets come as shown. However, we offer various collections to suit different preferences and occasions.'
    },
    {
      question: 'Is a gift message included?',
      answer: 'You can add a personalized gift message during checkout. We\'ll include it with your order at no extra charge.'
    }
  ]
};

async function addFAQsToProducts() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    const Product = mongoose.model('Product', new mongoose.Schema({}, { strict: false }));

    // Get all products
    const products = await Product.find({});
    console.log(`📦 Found ${products.length} products`);

    let updated = 0;
    let skipped = 0;

    for (const product of products) {
      // Skip if product already has FAQs
      if (product.faqs && product.faqs.length > 0) {
        console.log(`⏭️  Skipping "${product.name}" - already has FAQs`);
        skipped++;
        continue;
      }

      // Get FAQs based on category
      const categoryFaqs = faqTemplates[product.category] || faqTemplates.drinkware;

      // Update product with FAQs
      await Product.findByIdAndUpdate(product._id, {
        faqs: categoryFaqs
      });

      console.log(`✅ Added FAQs to "${product.name}" (${product.category})`);
      updated++;
    }

    console.log('\n🎉 Migration complete!');
    console.log(`   - Updated: ${updated} products`);
    console.log(`   - Skipped: ${skipped} products`);
    console.log(`   - Total: ${products.length} products`);

    await mongoose.disconnect();
    console.log('\n✅ Disconnected from MongoDB');

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

// Run the migration
addFAQsToProducts();
