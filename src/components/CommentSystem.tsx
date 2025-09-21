'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { trackEvent } from '@/lib/analytics';

interface Comment {
  id: string;
  author: string;
  email: string;
  content: string;
  timestamp: string;
  replies: Comment[];
  likes: number;
  isApproved: boolean;
  avatar?: string;
}

interface CommentSystemProps {
  postId: string;
  initialComments?: Comment[];
}

const CommentSystem: React.FC<CommentSystemProps> = ({ postId, initialComments = [] }) => {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState({
    author: '',
    email: '',
    content: '',
  });
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'popular'>('newest');
  const [showForm, setShowForm] = useState(false);
  const [likedComments, setLikedComments] = useState<Set<string>>(new Set());

  const loadComments = useCallback(async () => {
    try {
      // In a real app, this would be an API call
      const storedComments = localStorage.getItem(`comments-${postId}`);
      if (storedComments) {
        setComments(JSON.parse(storedComments));
      }
    } catch (error) {
      console.error('Failed to load comments:', error);
    }
  }, [postId]);

  useEffect(() => {
    // Load comments from API or localStorage
    loadComments();
    
    // Load liked comments from localStorage
    const liked = localStorage.getItem(`liked-comments-${postId}`);
    if (liked) {
      setLikedComments(new Set(JSON.parse(liked)));
    }
  }, [postId, loadComments]);

  const saveComments = (updatedComments: Comment[]) => {
    try {
      localStorage.setItem(`comments-${postId}`, JSON.stringify(updatedComments));
      setComments(updatedComments);
    } catch (error) {
      console.error('Failed to save comments:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent, parentId?: string) => {
    e.preventDefault();
    
    if (!newComment.author.trim() || !newComment.email.trim() || !newComment.content.trim()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const comment: Comment = {
        id: Date.now().toString(),
        author: newComment.author.trim(),
        email: newComment.email.trim(),
        content: newComment.content.trim(),
        timestamp: new Date().toISOString(),
        replies: [],
        likes: 0,
        isApproved: true, // In production, this would be false by default
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${newComment.author}`,
      };

      let updatedComments;
      if (parentId) {
        // Add as reply
        updatedComments = comments.map(c => 
          c.id === parentId 
            ? { ...c, replies: [...c.replies, comment] }
            : c
        );
        setReplyingTo(null);
      } else {
        // Add as top-level comment
        updatedComments = [comment, ...comments];
      }

      saveComments(updatedComments);
      
      // Reset form
      setNewComment({ author: '', email: '', content: '' });
      setShowForm(false);

      // Track comment submission
      trackEvent('comment_submitted', {
        postId,
        isReply: !!parentId,
      });

    } catch (error) {
      console.error('Failed to submit comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLike = (commentId: string) => {
    const updatedComments = comments.map(comment => {
      if (comment.id === commentId) {
        const isLiked = likedComments.has(commentId);
        const newLikedComments = new Set(likedComments);
        
        if (isLiked) {
          newLikedComments.delete(commentId);
          setLikedComments(newLikedComments);
          return { ...comment, likes: comment.likes - 1 };
        } else {
          newLikedComments.add(commentId);
          setLikedComments(newLikedComments);
          return { ...comment, likes: comment.likes + 1 };
        }
      }
      
      // Handle replies
      return {
        ...comment,
        replies: comment.replies.map(reply => {
          if (reply.id === commentId) {
            const isLiked = likedComments.has(commentId);
            const newLikedComments = new Set(likedComments);
            
            if (isLiked) {
              newLikedComments.delete(commentId);
              setLikedComments(newLikedComments);
              return { ...reply, likes: reply.likes - 1 };
            } else {
              newLikedComments.add(commentId);
              setLikedComments(newLikedComments);
              return { ...reply, likes: reply.likes + 1 };
            }
          }
          return reply;
        }),
      };
    });

    saveComments(updatedComments);
    localStorage.setItem(`liked-comments-${postId}`, JSON.stringify([...likedComments]));

    trackEvent('comment_liked', { postId, commentId });
  };

  const sortedComments = [...comments].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
      case 'oldest':
        return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
      case 'popular':
        return b.likes - a.likes;
      default:
        return 0;
    }
  });

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)} hours ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const CommentComponent = ({ comment, isReply = false }: { comment: Comment; isReply?: boolean }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm ${isReply ? 'ml-8 mt-4' : 'mb-6'}`}
    >
      <div className="flex items-start space-x-3">
        <img
          src={comment.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${comment.author}`}
          alt={comment.author}
          className="w-10 h-10 rounded-full"
        />
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <h4 className="font-semibold text-gray-900 dark:text-gray-100">
              {comment.author}
            </h4>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {formatDate(comment.timestamp)}
            </span>
          </div>
          <p className="text-gray-700 dark:text-gray-300 mb-3 leading-relaxed">
            {comment.content}
          </p>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => handleLike(comment.id)}
              className={`flex items-center space-x-1 text-sm transition-colors ${
                likedComments.has(comment.id)
                  ? 'text-red-500'
                  : 'text-gray-500 hover:text-red-500'
              }`}
            >
              <svg className="w-4 h-4" fill={likedComments.has(comment.id) ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span>{comment.likes}</span>
            </button>
            {!isReply && (
              <button
                onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                className="text-sm text-gray-500 hover:text-purple-600 transition-colors"
              >
                Reply
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Reply form */}
      <AnimatePresence>
        {replyingTo === comment.id && (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            onSubmit={(e) => handleSubmit(e, comment.id)}
            className="mt-4 ml-13 space-y-3"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Your name"
                value={newComment.author}
                onChange={(e) => setNewComment({ ...newComment, author: e.target.value })}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                required
              />
              <input
                type="email"
                placeholder="Your email"
                value={newComment.email}
                onChange={(e) => setNewComment({ ...newComment, email: e.target.value })}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                required
              />
            </div>
            <textarea
              placeholder="Write your reply..."
              value={newComment.content}
              onChange={(e) => setNewComment({ ...newComment, content: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 resize-none"
              required
            />
            <div className="flex space-x-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 transition-colors text-sm"
              >
                {isSubmitting ? 'Submitting...' : 'Reply'}
              </button>
              <button
                type="button"
                onClick={() => setReplyingTo(null)}
                className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors text-sm"
              >
                Cancel
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      {/* Replies */}
      {comment.replies.length > 0 && (
        <div className="mt-4">
          {comment.replies.map((reply) => (
            <CommentComponent key={reply.id} comment={reply} isReply />
          ))}
        </div>
      )}
    </motion.div>
  );

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Comments ({comments.length})
        </h3>
        <div className="flex items-center space-x-4">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm"
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
            <option value="popular">Most popular</option>
          </select>
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm"
          >
            Add Comment
          </button>
        </div>
      </div>

      {/* Comment form */}
      <AnimatePresence>
        {showForm && (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            onSubmit={(e) => handleSubmit(e)}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm mb-8"
          >
            <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
              Leave a Comment
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="Your name"
                value={newComment.author}
                onChange={(e) => setNewComment({ ...newComment, author: e.target.value })}
                className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                required
              />
              <input
                type="email"
                placeholder="Your email"
                value={newComment.email}
                onChange={(e) => setNewComment({ ...newComment, email: e.target.value })}
                className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                required
              />
            </div>
            <textarea
              placeholder="Write your comment..."
              value={newComment.content}
              onChange={(e) => setNewComment({ ...newComment, content: e.target.value })}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 resize-none mb-4"
              required
            />
            <div className="flex space-x-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 transition-colors"
              >
                {isSubmitting ? 'Submitting...' : 'Post Comment'}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-6 py-3 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
              >
                Cancel
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      {/* Comments list */}
      <div>
        {sortedComments.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <p className="text-gray-500 dark:text-gray-400">
              Be the first to leave a comment!
            </p>
          </div>
        ) : (
          sortedComments.map((comment) => (
            <CommentComponent key={comment.id} comment={comment} />
          ))
        )}
      </div>
    </div>
  );
};

export default CommentSystem;
