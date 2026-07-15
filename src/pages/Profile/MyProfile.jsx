import React, { useState } from 'react';
import { 
  Heart, 
  MessageSquare, 
  Send, 
  Paperclip, 
  Smile, 
  Image as ImageIcon, 
  Play,
  Mail,
  Phone,
  Calendar as CalendarIcon,
  MapPin,
  MoreHorizontal
} from 'lucide-react';
import defaultAvatar from '../../assets/images/profile/#2.png';

const MyProfile = () => {
  // Feed list state
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: 'Dustin Williamson',
      date: 'Jan 17, 2020',
      avatar: defaultAvatar,
      content: 'Above all, think of life as a prototype. We can conduct experiments, make discoveries, and change our perspectives. We can look for opportunities to turn processes into projects that have tangible outcomes. We can learn how to take joy in the things we create whether they take the form of a fleeting experience or an heirloom that will last for generations.',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80',
      likes: 50,
      liked: false,
      comments: [
        {
          id: 101,
          author: 'Judith Black',
          time: '1 day ago',
          avatar: defaultAvatar,
          text: 'Very interesting and informative article. I learned a lot of new and interesting. 😬',
          likes: 5,
          replies: [
            {
              id: 102,
              author: 'Nathan Fox',
              time: '5 min ago',
              avatar: defaultAvatar,
              text: 'Hello! I agree, a very interesting article. Thank you very much!'
            }
          ]
        },
        {
          id: 103,
          author: 'Calvin Flores',
          time: '2 day ago',
          avatar: defaultAvatar,
          text: 'Thanks for the good article. Looking forward to new ones. 😇',
          likes: 3,
          replies: []
        }
      ]
    },
    {
      id: 2,
      author: 'Dustin Williamson',
      date: 'Jan 15, 2020',
      avatar: defaultAvatar,
      content: 'Creativity is to discover a question that has never been asked. If one brings up an idiosyncratic question, the answer he gives will necessarily be unique as well.',
      videoThumbnail: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=800&auto=format&fit=crop&q=80',
      likes: 50,
      liked: false,
      comments: [
        {
          id: 201,
          author: 'Prasanth',
          time: '5 day ago',
          avatar: defaultAvatar,
          text: 'Very Interesting and informative. I learned a lot of new and interesting things.',
          likes: 5,
          replies: [
            {
              id: 202,
              author: 'Ronald Robertson',
              time: '5 day ago',
              avatar: defaultAvatar,
              text: 'Hello! I agree, a very interesting. Thank you very much! 😬'
            }
          ]
        }
      ]
    }
  ]);

  // Creator state
  const [newPostText, setNewPostText] = useState('');
  const [newCommentTexts, setNewCommentTexts] = useState({});

  // Friends list data
  const friends = [
    { name: 'Ronald Robertson', role: 'Product Designer' },
    { name: 'Jane Wilson', role: 'Creative Director' },
    { name: 'Judith Black', role: 'Creative Director' },
    { name: 'Dustin Williamson', role: 'Web Developer' },
    { name: 'Nathan Fox', role: 'Business Analyst' },
    { name: 'Calvin Flores', role: 'Designer' },
    { name: 'Brandon Pena', role: 'Product Designer' },
    { name: 'Courtney Nguyen', role: 'Designer' },
    { name: 'Kathryn Cooper', role: 'Developer' },
    { name: 'Cody Lane', role: 'Web Developer' }
  ];

  // Photos list gradients
  const photos = [
    'linear-gradient(135deg, #38bdf8, #0ea5e9)',
    'linear-gradient(135deg, #2dd4bf, #0d9488)',
    'linear-gradient(135deg, #f87171, #dc2626)',
    'linear-gradient(135deg, #c084fc, #9333ea)',
    'linear-gradient(135deg, #fb923c, #ea580c)',
    'linear-gradient(135deg, #4ade80, #16a34a)',
    'linear-gradient(135deg, #f472b6, #db2777)',
    'linear-gradient(135deg, #a7f3d0, #059669)',
    'linear-gradient(135deg, #fed7aa, #d97706)'
  ];

  // Handle Post Submit
  const handlePostSubmit = () => {
    if (!newPostText.trim()) return;
    const newPost = {
      id: Date.now(),
      author: 'Prasanth',
      date: 'Just now',
      avatar: defaultAvatar,
      content: newPostText,
      likes: 0,
      liked: false,
      comments: []
    };
    setPosts([newPost, ...posts]);
    setNewPostText('');
  };

  // Toggle Post Like
  const handleLikeToggle = (postId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.liked ? post.likes - 1 : post.likes + 1,
          liked: !post.liked
        };
      }
      return post;
    }));
  };

  // Comment Submit
  const handleCommentSubmit = (postId) => {
    const text = newCommentTexts[postId];
    if (!text || !text.trim()) return;

    setPosts(posts.map(post => {
      if (post.id === postId) {
        const newComment = {
          id: Date.now(),
          author: 'Jane Wilson',
          time: 'Just now',
          avatar: defaultAvatar,
          text: text,
          likes: 0,
          replies: []
        };
        return {
          ...post,
          comments: [...(post.comments || []), newComment]
        };
      }
      return post;
    }));

    setNewCommentTexts({
      ...newCommentTexts,
      [postId]: ''
    });
  };

  return (
    <div style={{ display: 'flex', gap: '24px', padding: '8px', minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: 'Inter, sans-serif' }}>
      
      {/* LEFT COLUMN: Profile Info Cards */}
      <div style={{ width: '320px', display: 'flex', flexDirection: 'column', gap: '20px', flexShrink: 0 }}>
        
        {/* Main Details Card */}
        <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <div style={{ position: 'relative', width: '120px', height: '120px', marginBottom: '16px' }}>
            <div style={{ width: '100%', height: '100%', borderRadius: '50%', overflow: 'hidden', border: '3px solid #f1f5f9' }}>
              <img 
                src={defaultAvatar} 
                alt="Jane Wilson" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div style={{ position: 'absolute', bottom: '6px', right: '6px', width: '14px', height: '14px', borderRadius: '50%', backgroundColor: '#22c55e', border: '2px solid #ffffff' }} />
          </div>

          <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#1e293b', margin: '0 0 4px 0' }}>Prasanth</h2>
          <span style={{ fontSize: '13px', color: '#64748b', fontWeight: '500', marginBottom: '24px', display: 'inline-block' }}>User</span>
          
          <div style={{ width: '100%', height: '1px', backgroundColor: '#f1f5f9', marginBottom: '20px' }} />

          {/* Info Details List */}
          <div style={{ width: '100%', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <span style={{ fontSize: '11px', fontWeight: '800', color: '#94a3b8', letterSpacing: '0.05em' }}>INFO</span>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <span style={{ fontSize: '10px', fontWeight: '600', color: '#94a3b8' }}>EMAIL</span>
              <span style={{ fontSize: '13px', color: '#334155', fontWeight: '500' }}>prasanth@gmail.com</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <span style={{ fontSize: '10px', fontWeight: '600', color: '#94a3b8' }}>PHONE</span>
              <span style={{ fontSize: '13px', color: '#334155', fontWeight: '500' }}>+91 5533557771</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <span style={{ fontSize: '10px', fontWeight: '600', color: '#94a3b8' }}>BIRTHDAY</span>
              <span style={{ fontSize: '13px', color: '#334155', fontWeight: '500' }}>17 March, 1995</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <span style={{ fontSize: '10px', fontWeight: '600', color: '#94a3b8' }}>LOCATION</span>
              <span style={{ fontSize: '13px', color: '#334155', fontWeight: '500' }}>Tirupattur, TN</span>
            </div>
          </div>

          <div style={{ width: '100%', height: '1px', backgroundColor: '#f1f5f9', margin: '20px 0' }} />

          {/* Friends List */}
          <div style={{ width: '100%', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <span style={{ fontSize: '11px', fontWeight: '800', color: '#94a3b8', letterSpacing: '0.05em' }}>FRIENDS</span>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', maxHeight: '380px', overflowY: 'auto', paddingRight: '4px' }}>
              {friends.map((friend, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', overflow: 'hidden', backgroundColor: '#f1f5f9' }}>
                    <img src={defaultAvatar} alt="Friend" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '12px', fontWeight: '600', color: '#334155' }}>{friend.name}</span>
                    <span style={{ fontSize: '10px', color: '#94a3b8' }}>{friend.role}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ width: '100%', height: '1px', backgroundColor: '#f1f5f9', margin: '20px 0' }} />

          {/* Photos Grid */}
          <div style={{ width: '100%', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <span style={{ fontSize: '11px', fontWeight: '800', color: '#94a3b8', letterSpacing: '0.05em' }}>PHOTOS</span>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
              {photos.map((gradient, idx) => (
                <div 
                  key={idx} 
                  style={{ 
                    aspectRatio: '1', 
                    borderRadius: '6px', 
                    background: gradient, 
                    cursor: 'pointer',
                    transition: 'transform 0.2s',
                    boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.2)'
                  }} 
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                />
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* RIGHT COLUMN: Feed and Composer */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        {/* Post Creator Panel */}
        <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ display: 'flex', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', overflow: 'hidden', flexShrink: 0 }}>
              <img src={defaultAvatar} alt="My Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <textarea 
              value={newPostText}
              onChange={(e) => setNewPostText(e.target.value)}
              placeholder="Write something..."
              style={{ 
                flex: 1, 
                border: 'none', 
                outline: 'none', 
                resize: 'none', 
                fontSize: '14px', 
                color: '#334155',
                minHeight: '44px',
                fontFamily: 'inherit'
              }}
            />
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #f1f5f9', paddingTop: '12px' }}>
            <button 
              onClick={handlePostSubmit}
              style={{ 
                backgroundColor: '#16a34a', 
                color: '#ffffff', 
                fontWeight: '600', 
                fontSize: '13px', 
                padding: '8px 20px', 
                borderRadius: '6px', 
                border: 'none', 
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#15803d'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#16a34a'}
            >
              Post
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', color: '#94a3b8' }}>
              <Paperclip size={18} style={{ cursor: 'pointer', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#64748b'} onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'} />
              <Smile size={18} style={{ cursor: 'pointer', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#64748b'} onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'} />
              <ImageIcon size={18} style={{ cursor: 'pointer', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#64748b'} onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'} />
            </div>
          </div>
        </div>

        {/* Feed Posts */}
        {posts.map((post) => (
          <div key={post.id} style={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            {/* Post Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', overflow: 'hidden' }}>
                  <img src={post.avatar} alt="Author" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '14px', fontWeight: '700', color: '#1e293b' }}>{post.author}</span>
                  <span style={{ fontSize: '11px', color: '#94a3b8' }}>{post.date}</span>
                </div>
              </div>
              <MoreHorizontal size={18} style={{ color: '#94a3b8', cursor: 'pointer' }} />
            </div>

            {/* Post Image or Video block if exists */}
            {post.image && (
              <div style={{ width: '100%', borderRadius: '8px', overflow: 'hidden', maxHeight: '400px' }}>
                <img src={post.image} alt="Post content" style={{ width: '100%', height: 'auto', objectFit: 'cover' }} />
              </div>
            )}

            {post.videoThumbnail && (
              <div style={{ width: '100%', position: 'relative', borderRadius: '8px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src={post.videoThumbnail} alt="Post video" style={{ width: '100%', height: 'auto', objectFit: 'cover', maxHeight: '400px' }} />
                <div style={{ position: 'absolute', width: '56px', height: '56px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', cursor: 'pointer', transition: 'transform 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                  <Play size={20} fill="#1e293b" style={{ color: '#1e293b', marginLeft: '2px' }} />
                </div>
              </div>
            )}

            {/* Post Description */}
            <p style={{ fontSize: '13px', lineHeight: '1.6', color: '#475569', margin: '0' }}>{post.content}</p>

            {/* Post Actions (Likes and Comments Count) */}
            <div style={{ display: 'flex', gap: '20px', borderTop: '1px solid #f1f5f9', borderBottom: '1px solid #f1f5f9', padding: '10px 0', color: '#64748b', fontSize: '13px', fontWeight: '600' }}>
              <div 
                onClick={() => handleLikeToggle(post.id)}
                style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', transition: 'color 0.2s', color: post.liked ? '#ef4444' : '#64748b' }}
              >
                <Heart size={16} fill={post.liked ? '#ef4444' : 'none'} />
                <span>{post.likes}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                <MessageSquare size={16} />
                <span>{post.comments ? post.comments.length : 0}</span>
              </div>
            </div>

            {/* Post Comments lists */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {post.comments && post.comments.map((comment) => (
                <div key={comment.id} style={{ display: 'flex', flexDirection: 'column', gap: '10px', paddingLeft: '8px' }}>
                  
                  {/* Primary Comment Row */}
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', overflow: 'hidden', flexShrink: 0 }}>
                      <img src={comment.avatar} alt="Commenter" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                        <span style={{ fontSize: '12px', fontWeight: '700', color: '#1e293b' }}>{comment.author}</span>
                        <span style={{ fontSize: '10px', color: '#94a3b8' }}>{comment.time}</span>
                      </div>
                      <span style={{ fontSize: '13px', color: '#475569', marginTop: '2px', lineHeight: '1.5' }}>{comment.text}</span>
                      
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '6px', color: '#94a3b8', fontSize: '11px', fontWeight: '600' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
                          <Heart size={12} />
                          <span>{comment.likes || 0}</span>
                        </div>
                        <span style={{ cursor: 'pointer' }}>Reply</span>
                      </div>
                    </div>
                  </div>

                  {/* Nested Replies */}
                  {comment.replies && comment.replies.map((reply) => (
                    <div key={reply.id} style={{ display: 'flex', gap: '10px', paddingLeft: '42px' }}>
                      <div style={{ width: '28px', height: '28px', borderRadius: '50%', overflow: 'hidden', flexShrink: 0 }}>
                        <img src={reply.avatar} alt="Replier" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                          <span style={{ fontSize: '12px', fontWeight: '700', color: '#1e293b' }}>{reply.author}</span>
                          <span style={{ fontSize: '10px', color: '#94a3b8' }}>{reply.time}</span>
                        </div>
                        <span style={{ fontSize: '13px', color: '#475569', marginTop: '2px', lineHeight: '1.5' }}>{reply.text}</span>
                        
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '6px', color: '#94a3b8', fontSize: '11px', fontWeight: '600' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
                            <Heart size={12} />
                            <span>0</span>
                          </div>
                          <span style={{ cursor: 'pointer' }}>Reply</span>
                        </div>
                      </div>
                    </div>
                  ))}

                </div>
              ))}
            </div>

            {/* Comment Input Composer */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', borderTop: '1px solid #f1f5f9', paddingTop: '16px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', overflow: 'hidden', flexShrink: 0 }}>
                <img src={defaultAvatar} alt="My avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center' }}>
                <input 
                  type="text" 
                  value={newCommentTexts[post.id] || ''}
                  onChange={(e) => setNewCommentTexts({
                    ...newCommentTexts,
                    [post.id]: e.target.value
                  })}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleCommentSubmit(post.id);
                  }}
                  placeholder="Write a comment..." 
                  style={{ 
                    width: '100%', 
                    backgroundColor: '#f8fafc', 
                    border: '1px solid #e2e8f0', 
                    borderRadius: '8px', 
                    padding: '8px 40px 8px 12px', 
                    fontSize: '13px', 
                    outline: 'none',
                    color: '#334155'
                  }}
                />
                <div style={{ position: 'absolute', right: '12px', display: 'flex', alignItems: 'center', gap: '8px', color: '#94a3b8' }}>
                  <Smile size={16} style={{ cursor: 'pointer' }} />
                  <Send 
                    size={14} 
                    onClick={() => handleCommentSubmit(post.id)}
                    style={{ cursor: 'pointer', color: '#16a34a' }} 
                  />
                </div>
              </div>
            </div>

          </div>
        ))}

      </div>

    </div>
  );
};

export default MyProfile;
