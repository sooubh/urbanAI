import React, { useEffect, useState } from 'react';
import { supabase } from '../services/supabaseClient';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';

const Profile: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [name, setName] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
      setName(data.user?.user_metadata?.full_name || '');
      setAvatarUrl(data.user?.user_metadata?.avatar_url || '');
      setEmail(data.user?.email || '');
      setLoading(false);
    };
    fetchUser();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen bg-green-50">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-green-100 py-12">
      <div className="max-w-xl mx-auto bg-white rounded-3xl shadow-2xl p-8 flex flex-col items-center border border-green-100">
        <div className="bg-green-100 p-2 rounded-full mb-4">
          <img
            src={avatarUrl || `https://ui-avatars.com/api/?name=${name || email || 'U'}`}
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-green-200 shadow-lg object-cover"
          />
        </div>
        <h2 className="text-2xl font-bold text-green-900 mb-1">{name || 'Your Name'}</h2>
        <p className="text-green-700 mb-6">{email}</p>
        <form className="w-full space-y-4">
          <div>
            <label className="block text-sm font-medium text-green-800 mb-1">Full Name</label>
            <Input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-green-800 mb-1">Avatar URL</label>
            <Input
              type="text"
              value={avatarUrl}
              onChange={e => setAvatarUrl(e.target.value)}
              placeholder="Paste image URL or leave blank for default"
            />
          </div>
          <Button type="button" className="w-full bg-green-600 hover:bg-green-700 text-white mt-4">
            Save Changes
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Profile; 