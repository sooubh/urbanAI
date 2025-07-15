import React, { useState } from 'react';
import { Input } from '../components/ui/Input';
import { Card, CardContent } from '../components/ui/Card';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { BookOpen, Search } from 'lucide-react';

// Mock blog data
const blogPosts = [
  {
    id: '1',
    title: '10 Balcony Garden Ideas for Small Spaces',
    subheading: 'Maximize your urban space with creative container gardening and vertical planters.',
    image: 'https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
    category: 'Urban Gardening',
    excerpt: 'Discover how to turn any balcony into a lush retreat with easy-to-grow edible plants and clever design tips.',
    content: `# 10 Balcony Garden Ideas for Small Spaces\n\nUrban living doesn’t mean you have to give up on gardening. With a little creativity, even the smallest balcony can become a green oasis.\n\n![Balcony garden inspiration](https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop)\n\n## 1. Use Vertical Planters\nVertical gardening saves space and adds visual interest. Try wall-mounted pockets, stacked pots, or a trellis for climbing plants.\n\n![Vertical planters](https://images.pexels.com/photos/450326/pexels-photo-450326.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop)\n\n## 2. Choose Compact Edibles\nHerbs, lettuce, and cherry tomatoes thrive in containers. Use railing planters for even more space.\n\n## 3. Add a Miniature Greenhouse\nA small greenhouse protects delicate plants and extends your growing season.\n\n![Mini greenhouse](https://images.pexels.com/photos/3076899/pexels-photo-3076899.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop)\n\n## 4. Hang Baskets for Flowers and Strawberries\nHanging baskets are perfect for trailing plants and add color at eye level.\n\n## 5. Use Multi-Tiered Plant Stands\nTiered stands maximize your growing area and make watering easier.\n\n## 6. Grow Up with Trellises\nCucumbers, beans, and peas can climb up, saving precious floor space.\n\n## 7. Incorporate Seating\nA small bench or chair lets you enjoy your garden retreat.\n\n## 8. Add Lighting for Evening Ambiance\nSolar string lights or lanterns make your balcony magical at night.\n\n## 9. Use Self-Watering Containers\nThese reduce maintenance and keep plants healthy.\n\n## 10. Personalize with Decor\nAdd colorful pots, garden art, or a small water feature for a unique touch.\n\nBalcony gardening is all about creativity and making the most of your space. Start small, experiment, and enjoy your urban oasis!`,
  },
  {
    id: '2',
    title: 'Essential Plant Care Tips for Beginners',
    subheading: 'Learn the basics of watering, sunlight, soil, and pest management.',
    image: 'https://images.pexels.com/photos/212324/pexels-photo-212324.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
    category: 'Plant Care',
    excerpt: 'Our AI assistant answers your most common plant care questions and helps you avoid beginner mistakes.',
    content: `# Essential Plant Care Tips for Beginners\n\nStarting your plant journey? Here’s what you need to know for healthy, thriving plants.\n\n![Plant care tips](https://images.pexels.com/photos/212324/pexels-photo-212324.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop)\n\n## Watering\nMost plants prefer consistent moisture, but avoid overwatering. Stick your finger in the soil—if it’s dry an inch down, it’s time to water.\n\n## Sunlight\nMatch your plant’s needs to your available light. South-facing windows are best for sun-lovers; low-light plants thrive in shadier spots.\n\n![Sunlight for plants](https://images.pexels.com/photos/3076899/pexels-photo-3076899.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop)\n\n## Soil and Fertilizer\nUse high-quality potting mix for containers. Fertilize every few weeks during the growing season.\n\n## Pest Management\nInspect leaves regularly for pests. Remove bugs by hand or use organic sprays.\n\n## Pruning and Deadheading\nTrim dead leaves and spent flowers to encourage new growth.\n\n## Repotting\nRepot when roots outgrow their container. Choose a pot 1-2 inches larger in diameter.\n\nWith these basics, you’ll avoid common mistakes and enjoy a lush, healthy indoor or outdoor garden!`,
  },
  {
    id: '3',
    title: 'How to Start a Community Garden in Your City',
    subheading: 'Step-by-step guide to organizing, funding, and growing a successful community garden.',
    image: 'https://images.pexels.com/photos/1407305/pexels-photo-1407305.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
    category: 'Community',
    excerpt: 'Connect with neighbors and make a positive impact with a thriving community garden.',
    content: `# How to Start a Community Garden in Your City\n\nCommunity gardens bring people together and transform neighborhoods.\n\n![Community gardening](https://images.pexels.com/photos/1407305/pexels-photo-1407305.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop)\n\n## Step 1: Find a Location\nLook for unused lots, rooftops, or public spaces. Contact your city for permission.\n\n## Step 2: Gather Support\nBuild a team of passionate gardeners. Host meetings and share your vision.\n\n## Step 3: Plan the Layout\nDesign plots, paths, and communal areas. Consider accessibility and water access.\n\n![Garden layout](https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop)\n\n## Step 4: Fundraise and Gather Supplies\nApply for grants, host fundraisers, and seek donations of tools and seeds.\n\n## Step 5: Build and Plant\nOrganize workdays to build beds, install irrigation, and plant together.\n\n## Step 6: Foster Community\nHost workshops, potlucks, and harvest festivals. Encourage sharing and learning.\n\nA community garden is more than just plants—it’s about connection, sustainability, and pride in your neighborhood!`,
  },
  {
    id: '4',
    title: 'The Best Indoor Plants for Air Quality',
    subheading: 'Improve your home’s air with these easy-to-grow indoor plants.',
    image: 'https://images.pexels.com/photos/3076899/pexels-photo-3076899.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
    category: 'Indoor Gardening',
    excerpt: 'Discover which plants purify the air and thrive indoors, even with low light.',
    content: `# The Best Indoor Plants for Air Quality\n\nImprove your home’s air with these easy-to-grow indoor plants.\n\n![Indoor plants](https://images.pexels.com/photos/3076899/pexels-photo-3076899.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop)\n\n## Snake Plant\nA hardy plant that filters toxins like formaldehyde and benzene.\n\n## Peace Lily\nBeautiful and effective at cleaning air, but keep away from pets.\n\n![Peace lily](https://images.pexels.com/photos/450326/pexels-photo-450326.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop)\n\n## Spider Plant\nGreat for beginners and removes carbon monoxide.\n\n## Pothos\nThrives in low light and purifies the air.\n\n## Rubber Plant\nLarge, glossy leaves and excellent at removing toxins.\n\nAdd these plants to your home for a healthier, greener environment!`,
  },
  {
    id: '5',
    title: 'Composting 101: Turn Waste into Garden Gold',
    subheading: 'Learn how to compost at home and boost your garden’s health.',
    image: 'https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
    category: 'Sustainability',
    excerpt: 'Turn kitchen scraps and yard waste into nutrient-rich compost for your plants.',
    content: `# Composting 101: Turn Waste into Garden Gold\n\nComposting is easy and eco-friendly.\n\n![Composting](https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop)\n\n## What to Compost\nFruit and veggie scraps, coffee grounds, eggshells, yard waste, and shredded paper.\n\n## What Not to Compost\nMeat, dairy, oils, and diseased plants.\n\n## How to Start\nChoose a bin or pile. Alternate green (nitrogen) and brown (carbon) materials.\n\n![Compost bin](https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop)\n\n## Maintain Your Pile\nTurn it every few weeks and keep it moist.\n\n## Harvesting Compost\nIn 2-6 months, you’ll have rich, dark compost to feed your garden.\n\nComposting reduces waste and creates free, organic fertilizer for your plants!`,
  },
  {
    id: '6',
    title: 'Urban Beekeeping: A Beginner’s Guide',
    subheading: 'Support pollinators and harvest honey in the city.',
    image: 'https://images.pexels.com/photos/459225/pexels-photo-459225.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
    category: 'Urban Gardening',
    excerpt: 'Learn the basics of keeping bees in urban environments and why it matters.',
    content: `# Urban Beekeeping: A Beginner’s Guide\n\nBees are vital for pollination and urban biodiversity.\n\n![Urban beekeeping](https://images.pexels.com/photos/459225/pexels-photo-459225.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop)\n\n## Getting Started\nCheck local regulations and find a mentor or beekeeping club.\n\n## Equipment Needed\nHive, protective gear, smoker, and tools.\n\n## Choosing a Location\nPick a sunny, sheltered spot away from high-traffic areas.\n\n![Beehive](https://images.pexels.com/photos/3076899/pexels-photo-3076899.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop)\n\n## Caring for Your Bees\nInspect hives regularly, provide water, and plant pollinator-friendly flowers.\n\nUrban beekeeping supports local food systems and helps save the bees!`,
  },
  {
    id: '7',
    title: 'DIY Drip Irrigation for Container Gardens',
    subheading: 'Save water and time with a simple drip system.',
    image: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
    category: 'Plant Care',
    excerpt: 'Automate watering for your balcony or patio garden with this easy DIY project.',
    content: `# DIY Drip Irrigation for Container Gardens\n\nDrip irrigation is efficient and easy to set up.\n\n![Drip irrigation](https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop)\n\n## Materials Needed\nTubing, emitters, connectors, and a timer.\n\n## Step-by-Step\n1. Plan your layout and measure tubing.\n2. Cut and connect tubing to each pot.\n3. Attach emitters and secure with stakes.\n4. Connect to a water source and set the timer.\n\n## Benefits\nSaves water, reduces disease, and keeps plants healthy.\n\nAutomate your watering and enjoy thriving container gardens!`,
  },
  {
    id: '8',
    title: 'How to Grow Herbs Indoors Year-Round',
    subheading: 'Enjoy fresh herbs no matter the season.',
    image: 'https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
    category: 'Indoor Gardening',
    excerpt: 'Tips for growing basil, mint, and more on your windowsill or under lights.',
    content: `# How to Grow Herbs Indoors Year-Round\n\nHerbs are easy to grow indoors with the right setup.\n\n![Herbs indoors](https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop)\n\n## Light Requirements\nSouth-facing windows or grow lights work best.\n\n## Best Herbs to Grow\nBasil, mint, parsley, chives, and thyme.\n\n![Indoor herb garden](https://images.pexels.com/photos/212324/pexels-photo-212324.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop)\n\n## Watering and Feeding\nKeep soil moist but not soggy. Fertilize monthly.\n\n## Harvesting\nSnip leaves regularly to encourage new growth.\n\nEnjoy fresh herbs for cooking all year long!`,
  },
  {
    id: '9',
    title: 'Sustainable Gardening: Eco-Friendly Practices',
    subheading: 'Reduce your environmental impact with these simple tips.',
    image: 'https://images.pexels.com/photos/3076899/pexels-photo-3076899.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
    category: 'Sustainability',
    excerpt: 'From composting to water conservation, make your garden greener.',
    content: `# Sustainable Gardening: Eco-Friendly Practices\n\nEvery gardener can help the planet.\n\n![Sustainable gardening](https://images.pexels.com/photos/3076899/pexels-photo-3076899.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop)\n\n## Composting\nTurn kitchen and yard waste into rich soil.\n\n## Water Conservation\nUse mulch, drip irrigation, and rain barrels.\n\n![Rain barrel](https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop)\n\n## Native Plants\nChoose plants adapted to your climate for less maintenance.\n\n## Organic Methods\nAvoid synthetic chemicals and use natural pest control.\n\nSustainable gardening is good for your plants, your health, and the earth!`,
  },
  {
    id: '10',
    title: 'The Ultimate Guide to Urban Vegetable Gardening',
    subheading: 'Grow your own food in the city with these expert tips.',
    image: 'https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
    category: 'Urban Gardening',
    excerpt: 'From soil prep to harvest, learn how to grow vegetables in containers, raised beds, and more.',
    content: `# The Ultimate Guide to Urban Vegetable Gardening\n\nYou can grow food anywhere!\n\n![Urban vegetable gardening](https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop)\n\n## Choosing Containers\nPick the right size for your crops—deeper pots for root veggies.\n\n## Soil and Fertilizer\nUse high-quality potting mix and organic fertilizer.\n\n## Best Vegetables for Urban Gardens\nTomatoes, peppers, lettuce, radishes, and beans.\n\n![Container vegetables](https://images.pexels.com/photos/450326/pexels-photo-450326.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop)\n\n## Planting and Care\nFollow spacing guidelines and water consistently.\n\n## Harvesting\nPick veggies at their peak for best flavor.\n\nUrban vegetable gardening is rewarding, sustainable, and delicious!`,
  },
];

const categories = Array.from(new Set(blogPosts.map((b) => b.category)));

export default function Blog() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [page, setPage] = useState(1); // Add page state
  const navigate = useNavigate();

  const filtered = blogPosts.filter(
    (b) =>
      (selectedCategory === 'All' || b.category === selectedCategory) &&
      (b.title.toLowerCase().includes(search.toLowerCase()) ||
        b.subheading.toLowerCase().includes(search.toLowerCase()) ||
        b.excerpt.toLowerCase().includes(search.toLowerCase()))
  );

  const blogsPerPage = 6;
  const totalPages = Math.ceil(filtered.length / blogsPerPage);
  const paginatedBlogs = filtered.slice((page - 1) * blogsPerPage, page * blogsPerPage);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-primary-50 to-secondary-50 py-12">
      <section className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <h1 className="text-4xl font-extrabold text-primary-700 flex items-center gap-2">
            <BookOpen className="h-8 w-8 text-primary-400" /> Blog
          </h1>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <Input
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search blog posts..."
              className="w-full md:w-64"
            />
            <Button size="sm" variant="outline" className="ml-2">
              <Search className="h-5 w-5" />
            </Button>
          </div>
        </div>
        <div className="flex flex-wrap gap-3 mb-8">
          <Button
            size="sm"
            variant={selectedCategory === 'All' ? 'primary' : 'outline'}
            onClick={() => { setSelectedCategory('All'); setPage(1); }}
          >
            All
          </Button>
          {categories.map((cat) => (
            <Button
              key={cat}
              size="sm"
              variant={selectedCategory === cat ? 'primary' : 'outline'}
              onClick={() => { setSelectedCategory(cat); setPage(1); }}
            >
              {cat}
            </Button>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {paginatedBlogs.map((blog) => (
            <Card
              key={blog.id}
              className="cursor-pointer hover:shadow-2xl transition-all duration-300 rounded-2xl overflow-hidden"
              onClick={() => navigate(`/blog/${blog.id}`)}
            >
              <img src={blog.image} alt={blog.title} className="w-full h-56 object-cover" />
              <CardContent className="p-6">
                <div className="text-xs font-semibold text-primary-600 mb-2">{blog.category}</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">{blog.title}</h2>
                <h3 className="text-lg text-gray-700 mb-2">{blog.subheading}</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{blog.excerpt}</p>
                <Button size="sm" variant="outline" className="mt-2">Read More</Button>
              </CardContent>
            </Card>
          ))}
        </div>
        {/* Pagination Controls */}
        {filtered.length > 0 && (
          <div className="flex justify-center gap-4 mt-10">
            <Button
              size="sm"
              variant="outline"
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              Previous
            </Button>
            <span className="self-center text-gray-600 text-sm">Page {page} of {totalPages}</span>
            <Button
              size="sm"
              variant="outline"
              disabled={page === totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            >
              Next
            </Button>
          </div>
        )}
        {filtered.length === 0 && (
          <div className="text-center text-gray-500 py-20 text-lg">No blog posts found.</div>
        )}
      </section>
    </div>
  );
} 