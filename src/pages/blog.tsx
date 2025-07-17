import React, { useEffect, useState } from 'react';
import { Input } from '../components/ui/Input';
import { Card, CardContent } from '../components/ui/Card';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { BookOpen, Search } from 'lucide-react';
import { supabase } from '../services/supabaseClient';

interface BlogPost {
  id: number;
  title: string;
  heading: string;
  subheading: string;
  image_urls: string;
  content_html: string;
  tags: string;
  like_count: number;
  comment_count: number;
  created_at: string;
}

const DEFAULT_TAG = 'ai';

export default function Blog() {
  const [search, setSearch] = useState('');
  const [selectedTag, setSelectedTag] = useState('All');
  const [allTags, setAllTags] = useState<string[]>([DEFAULT_TAG]);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Fetch all unique tags for dropdown
  useEffect(() => {
    const fetchTags = async () => {
      const { data, error } = await supabase.from('blog_post').select('tags');
      if (error) return;
      const tagSet = new Set<string>();
      data?.forEach((row: any) => {
        row.tags?.split(',').map((t: string) => t.trim()).forEach((t: string) => tagSet.add(t));
      });
      setAllTags(Array.from(tagSet) as string[]);
    };
    fetchTags();
  }, []);

  // Fetch posts by tag
  const fetchPosts = async (tag: string) => {
    setLoading(true);
    setError(null);
    const { data, error } = await supabase
      .from('blog_post')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) {
      setError('Failed to fetch blog posts.');
      setPosts([]);
      setLoading(false);
      return;
    }
    const filtered = ((data || []) as BlogPost[]).filter((post: BlogPost) =>
      post.tags?.split(',').map(t => t.trim()).includes(tag)
    );
    setPosts(filtered);
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts(selectedTag);
    // eslint-disable-next-line
  }, [selectedTag]);

  // Real-time subscription for new posts
  useEffect(() => {
    const channel = supabase
      .channel('public:blog_post')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'blog_post' },
        (payload) => {
          const newPost = payload.new as BlogPost;
          if (newPost.tags?.split(',').map((t: string) => t.trim()).includes(selectedTag)) {
            setPosts(prev => [newPost, ...prev]);
          }
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [selectedTag]);

  // Search filter (client-side)
  const filteredPosts = posts.filter(
    (b) =>
      (selectedTag === 'All' || b.tags?.split(',').map((t) => t.trim()).includes(selectedTag)) &&
      (
        b.title.toLowerCase().includes(search.toLowerCase()) ||
        b.heading.toLowerCase().includes(search.toLowerCase()) ||
        b.subheading.toLowerCase().includes(search.toLowerCase()) ||
        b.content_html.toLowerCase().includes(search.toLowerCase())
      )
  );

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
              onChange={(e) => { setSearch(e.target.value); }}
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
            key="All"
            size="sm"
            variant={selectedTag === 'All' ? 'primary' : 'outline'}
            onClick={() => setSelectedTag('All')}
          >
            All
          </Button>
          {allTags.map((tag) => (
            <Button
              key={tag}
              size="sm"
              variant={selectedTag === tag ? 'primary' : 'outline'}
              onClick={() => setSelectedTag(tag)}
            >
              {tag}
            </Button>
          ))}
        </div>
        {loading && (
          <div className="flex justify-center items-center py-20 text-green-700">Loading blog posts...</div>
        )}
        {error && (
          <div className="flex justify-center items-center py-20 text-red-600">{error}</div>
        )}
        {!loading && !error && filteredPosts.length === 0 && (
          <div className="flex justify-center items-center py-20 text-green-700">No blog posts found for this tag.</div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredPosts.map((post) => (
            <Card
              key={post.id}
              className="cursor-pointer hover:shadow-2xl transition-all duration-300 rounded-2xl overflow-hidden"
              onClick={() => navigate(`/blog/${post.id}`)}
            >
              {post.image_urls && (
                <img
                  src={post.image_urls.split(',')[0].trim()}
                  alt={post.title}
                  className="w-full h-56 object-cover"
                />
              )}
              <CardContent className="p-6">
                <div className="flex flex-wrap gap-2 mb-2">
                  {post.tags.split(',').map(tag => (
                    <span key={tag} className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium">{tag.trim()}</span>
                  ))}
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">{post.title}</h2>
                <h3 className="text-lg text-gray-700 mb-2">{post.heading}</h3>
                <div className="flex items-center text-xs text-gray-400 mt-2">
                  <span>{new Date(post.created_at).toLocaleDateString()}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
} 