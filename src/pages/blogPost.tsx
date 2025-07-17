import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { MessageCircle, Heart, Share2, ArrowLeft } from 'lucide-react';
import { Card, CardContent } from '../components/ui/Card';
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

export default function BlogPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from('blog_post')
        .select('*')
        .eq('id', id)
        .single();
      if (error) {
        setError('Blog post not found.');
        setPost(null);
      } else {
        setPost(data as BlogPost);
      }
      setLoading(false);
    };
    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white via-primary-50 to-secondary-50">
        <div className="text-xl text-green-700">Loading blog post...</div>
      </div>
    );
  }

  if (error || !post) {
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
          {post.image_urls && (
          <img
              src={post.image_urls.split(',')[0].trim()}
              alt={post.title}
            className="w-32 h-32 object-cover rounded-xl shadow-md border border-primary-100 mb-4 sm:mb-0"
          />
          )}
          <div className="flex-1 flex flex-col justify-center items-center sm:items-start">
            <div className="mb-2 flex flex-wrap gap-2">
              {post.tags.split(',').map(tag => (
                <span key={tag} className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium">{tag.trim()}</span>
              ))}
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1 text-center sm:text-left">{post.title}</h1>
            <h2 className="text-base text-gray-700 mb-2 text-center sm:text-left">{post.heading}</h2>
            {post.subheading && <div className="text-green-500 mb-2 text-sm">{post.subheading}</div>}
            <div className="text-xs text-gray-400">{new Date(post.created_at).toLocaleString()}</div>
          </div>
        </div>
        <div className="w-full h-1 bg-gradient-to-r from-primary-100 via-white to-secondary-100 my-8 rounded-full opacity-60" />
        {/* Blog Content */}
        <div className="mb-8 prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: post.content_html }} />
        <div className="flex items-center gap-4 mb-10">
          <span className="flex items-center gap-1 text-green-700"><Heart className="h-5 w-5" /> {post.like_count}</span>
          <span className="flex items-center gap-1 text-green-700"><MessageCircle className="h-5 w-5" /> {post.comment_count}</span>
          <Button variant="outline" size="sm" onClick={() => window.alert('Share functionality coming soon!')}>
            <Share2 className="h-5 w-5 mr-1" /> Share
          </Button>
        </div>
        {/* Comments section placeholder */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <h3 className="text-lg font-bold text-primary-700 mb-4">Comments</h3>
            <div className="text-gray-500">Comments functionality coming soon.</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 