import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { MessageCircle, Heart, Share2, ArrowLeft } from 'lucide-react';
import { Card, CardContent } from '../components/ui/Card';

interface BlogPost {
  id: string;
  title: string;
  subheading: string;
  image: string;
  category: string;
  excerpt: string;
  content: string;
}

// Import the same mock blogPosts data as in blog.tsx
const blogPosts: BlogPost[] = [
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

function renderMarkdown(content: string) {
  // Simple markdown renderer for demo (headings, images, paragraphs)
  return content.split('\n').map((line, idx) => {
    if (line.startsWith('# ')) return <h1 key={idx} className="text-3xl font-bold mt-8 mb-4">{line.replace('# ', '')}</h1>;
    if (line.startsWith('## ')) return <h2 key={idx} className="text-2xl font-semibold mt-6 mb-3">{line.replace('## ', '')}</h2>;
    if (line.startsWith('![')) {
      const match = line.match(/!\[(.*?)\]\((.*?)\)/);
      if (match) return <img key={idx} src={match[2]} alt={match[1]} className="my-6 rounded-xl shadow-lg w-full max-w-2xl mx-auto" />;
    }
    if (line.trim() === '') return <br key={idx} />;
    return <p key={idx} className="text-lg text-gray-700 mb-4">{line}</p>;
  });
}

export default function BlogPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const blog: BlogPost | undefined = blogPosts.find((b) => b.id === id);
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState([
    { user: 'Sarah', text: 'Great tips! I love the vertical planter idea.' },
    { user: 'Marcus', text: 'This inspired me to start my own balcony garden.' },
  ]);
  const [commentInput, setCommentInput] = useState('');

  if (!blog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white via-primary-50 to-secondary-50">
        <h1 className="text-3xl font-bold text-primary-700 mb-4">Blog Post Not Found</h1>
        <Button onClick={() => navigate('/blog')}><ArrowLeft className="mr-2 h-5 w-5" /> Back to Blog</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-primary-50 to-secondary-50 py-12">
      <div className="max-w-3xl mx-auto px-4">
        <Button variant="outline" className="mb-8" onClick={() => navigate('/blog')}>
          <ArrowLeft className="mr-2 h-5 w-5" /> Back to Blog
        </Button>
        {/* Blog Post Header */}
        <div className="flex flex-col sm:flex-row items-center gap-6 bg-white/90 rounded-2xl shadow p-4 mb-8 border border-primary-100">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-32 h-32 object-cover rounded-xl shadow-md border border-primary-100 mb-4 sm:mb-0"
          />
          <div className="flex-1 flex flex-col justify-center items-center sm:items-start">
            <div className="mb-2 text-xs font-semibold text-primary-600">{blog.category}</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1 text-center sm:text-left">{blog.title}</h1>
            <h2 className="text-base text-gray-700 mb-2 text-center sm:text-left">{blog.subheading}</h2>
          </div>
        </div>
        <div className="w-full h-1 bg-gradient-to-r from-primary-100 via-white to-secondary-100 my-8 rounded-full opacity-60" />
        {/* Blog Content */}
        <div className="mb-8 prose prose-lg max-w-none">
          {renderMarkdown(blog.content)}
        </div>
        <div className="flex items-center gap-4 mb-10">
          <Button variant={liked ? 'primary' : 'outline'} size="sm" onClick={() => setLiked((l) => !l)}>
            <Heart className="h-5 w-5 mr-1" /> {liked ? 'Liked' : 'Like'}
          </Button>
          <Button variant="outline" size="sm" onClick={() => window.alert('Share functionality coming soon!')}>
            <Share2 className="h-5 w-5 mr-1" /> Share
          </Button>
          <Button variant="outline" size="sm" onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}>
            <MessageCircle className="h-5 w-5 mr-1" /> Comment
          </Button>
        </div>
        <Card className="mb-8">
          <CardContent className="p-6">
            <h3 className="text-lg font-bold text-primary-700 mb-4">Comments</h3>
            <div className="space-y-4 mb-4">
              {comments.map((c, idx) => (
                <div key={idx} className="bg-primary-50 rounded-lg px-4 py-2">
                  <span className="font-semibold text-primary-700 mr-2">{c.user}:</span>
                  <span className="text-gray-700">{c.text}</span>
                </div>
              ))}
              {comments.length === 0 && <div className="text-gray-500">No comments yet. Be the first to comment!</div>}
            </div>
            <form
              onSubmit={e => {
                e.preventDefault();
                if (commentInput.trim()) {
                  setComments([...comments, { user: 'You', text: commentInput }]);
                  setCommentInput('');
                }
              }}
              className="flex gap-2 mt-2"
            >
              <input
                type="text"
                value={commentInput}
                onChange={e => setCommentInput(e.target.value)}
                placeholder="Add a comment..."
                className="flex-1 border border-primary-200 rounded-lg px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-primary-300"
              />
              <Button type="submit" size="sm">Post</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 