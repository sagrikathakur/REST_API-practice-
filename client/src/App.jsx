import React, { useState, useEffect, useRef } from 'react';
import { Heart, MessageCircle, Send, Bookmark, Trash2, Edit2, Check, X, ImagePlus } from 'lucide-react';

const API_URL = 'http://localhost:5000/api/posts';

function App() {
  const [posts, setPosts] = useState([]);
  const [newPhoto, setNewPhoto] = useState(null);
  const [newCaption, setNewCaption] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editCaption, setEditCaption] = useState('');
  const fileInputRef = useRef(null);

  // Fetch posts (READ)
  const fetchPosts = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setPosts(data);
    } catch (err) {
      console.error("Failed to fetch posts:", err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Create post
  const handleCreate = async (e) => {
    e.preventDefault();
    if (!newPhoto) return;
    
    // Using FormData to handle file uploads
    const formData = new FormData();
    formData.append('photo', newPhoto);
    formData.append('caption', newCaption);
    
    try {
      await fetch(API_URL, {
        method: 'POST',
        // Do NOT set Content-Type header manually when sending FormData,
        // the browser automatically sets it to multipart/form-data with correct boundary.
        body: formData
      });
      setNewPhoto(null);
      setNewCaption('');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      fetchPosts();
    } catch (err) {
      console.error("Failed to create post:", err);
    }
  };

  // Delete post
  const handleDelete = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      fetchPosts();
    } catch (err) {
      console.error("Failed to delete post:", err);
    }
  };

  // Update post
  const handleUpdate = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ caption: editCaption })
      });
      setEditingId(null);
      fetchPosts();
    } catch (err) {
      console.error("Failed to update post:", err);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans flex justify-center pb-20">
      <main className="w-full max-w-[470px] mt-10 flex flex-col gap-8">
        
        {/* Header Branding */}
        <div className="flex items-center justify-between px-4 lg:px-0">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent italic" style={{ fontFamily: 'cursive' }}>
            InstaClone
          </h1>
        </div>

        {/* Create Post Section */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 shadow-xl mx-4 lg:mx-0">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <ImagePlus size={20} className="text-pink-500" />
            Create Post
          </h2>
          <form onSubmit={handleCreate} className="space-y-3">
            <div className="relative">
              <input 
                type="file" 
                accept="image/*"
                ref={fileInputRef}
                onChange={e => setNewPhoto(e.target.files[0])}
                className="w-full bg-black border border-zinc-800 rounded-lg p-2 text-sm focus:outline-none focus:border-zinc-500 transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-zinc-800 file:text-white hover:file:bg-zinc-700 cursor-pointer"
              />
            </div>
            <textarea 
              placeholder="Write a caption..." 
              value={newCaption}
              onChange={e => setNewCaption(e.target.value)}
              className="w-full bg-black border border-zinc-800 rounded-lg p-3 text-sm focus:outline-none focus:border-zinc-500 transition-colors resize-none h-20"
            />
            <button 
              type="submit" 
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg p-3 hover:opacity-90 transition-opacity flex justify-center items-center gap-2"
            >
              Share Post
            </button>
          </form>
        </div>

        {/* Feed Section */}
        <div className="space-y-6 mx-4 lg:mx-0">
          {posts.map(post => (
            <article key={post.id} className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-xl">
              {/* Post Header */}
              <div className="flex items-center justify-between p-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500 p-[2px]">
                    <div className="w-full h-full bg-black rounded-full border-2 border-black flex items-center justify-center overflow-hidden">
                       <img src="https://ui-avatars.com/api/?name=User&background=random" alt="avatar" className="w-full h-full object-cover" />
                    </div>
                  </div>
                  <span className="font-semibold text-sm">my_awesome_feed</span>
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={() => {
                    setEditingId(post.id);
                    setEditCaption(post.caption);
                  }} className="p-2 text-zinc-400 hover:text-white transition-colors">
                    <Edit2 size={18} />
                  </button>
                  <button onClick={() => handleDelete(post.id)} className="p-2 text-zinc-400 hover:text-red-500 transition-colors">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              {/* Post Image */}
              <div className="w-full aspect-square bg-zinc-950 flex items-center justify-center overflow-hidden">
                <img 
                  src={post.photoUrl} 
                  alt="Post content" 
                  className="w-full h-full object-cover"
                  onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1594322436404-5a0526db4d13?w=800&q=80' }}
                />
              </div>

              {/* Post Actions */}
              <div className="p-3">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-4">
                    <Heart size={24} className="hover:text-zinc-400 cursor-pointer transition-colors" />
                    <MessageCircle size={24} className="hover:text-zinc-400 cursor-pointer transition-colors" />
                    <Send size={24} className="hover:text-zinc-400 cursor-pointer transition-colors" />
                  </div>
                  <Bookmark size={24} className="hover:text-zinc-400 cursor-pointer transition-colors" />
                </div>
                <div className="text-sm font-semibold mb-2">{Math.floor(Math.random() * 1000) + 50} likes</div>
                
                {/* Caption Area */}
                <div className="text-sm">
                  <span className="font-semibold mr-2">my_awesome_feed</span>
                  {editingId === post.id ? (
                    <div className="mt-2 flex gap-2">
                      <input 
                        type="text" 
                        value={editCaption}
                        onChange={e => setEditCaption(e.target.value)}
                        className="flex-1 bg-black border border-zinc-700 rounded px-2 py-1 focus:outline-none focus:border-zinc-500"
                        autoFocus
                      />
                      <button onClick={() => handleUpdate(post.id)} className="text-green-500 p-1 hover:bg-zinc-800 rounded">
                        <Check size={16} />
                      </button>
                      <button onClick={() => setEditingId(null)} className="text-red-500 p-1 hover:bg-zinc-800 rounded">
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <span>{post.caption}</span>
                  )}
                </div>
                <div className="text-xs text-zinc-500 uppercase mt-2 tracking-wide">
                  2 hours ago
                </div>
              </div>
            </article>
          ))}
          {posts.length === 0 && (
            <div className="text-center py-20 text-zinc-500">
              No posts yet. Be the first to share something!
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
