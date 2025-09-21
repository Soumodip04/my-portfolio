'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import CodeBlock from '@/components/CodeBlock';
import { useTheme } from '@/context/ThemeContext';
import Navbar from '@/components/Navbar';

export default function MernChatAppBlog() {
  const { theme } = useTheme();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
        <div className="container mx-auto px-6 py-12 max-w-4xl">
          <Link href="/#blog" className="inline-flex items-center mb-8 text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Blog
          </Link>

          <div className="mb-12">
            <div className="flex items-center mb-4">
              <span className="text-sm font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wider px-3 py-1 bg-purple-100 dark:bg-purple-900/30 rounded-full mr-4">
                Web Development
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">May 15, 2024 · 8 min read</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Building a Real-Time Chat App Using MERN Stack
            </h1>
          </div>

          <div className="relative w-full h-[400px] mb-12 rounded-xl overflow-hidden shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 z-10"></div>
            <div className="absolute bottom-6 left-6 z-20 text-6xl">
              📬
            </div>
            <div className="absolute w-full h-full bg-gradient-to-br from-blue-500 to-purple-600"></div>
          </div>

          <article className="prose prose-lg dark:prose-invert max-w-none">
            <h1>Building a Real-Time Chat Application with MERN Stack and Socket.IO</h1>
            <p><em>By Soumodip Das</em></p>

            <h2>Introduction: Why Real-Time Communication Matters</h2>
            <p>In today's digital world, real-time communication has become essential for modern web applications. Whether it's customer support, team collaboration, or social networking, users expect instant messaging capabilities that work seamlessly across devices.</p>

            <p>In this comprehensive guide, I'll walk you through building a full-featured real-time chat application using the MERN stack (MongoDB, Express.js, React, Node.js) enhanced with Socket.IO for real-time functionality.</p>

            <h2>Tech Stack Overview</h2>
            <p>Here's what we'll be using to build our chat application:</p>
            <ul>
              <li><strong>Frontend:</strong> React.js with Tailwind CSS for styling</li>
              <li><strong>Backend:</strong> Node.js with Express.js framework</li>
              <li><strong>Database:</strong> MongoDB for data persistence</li>
              <li><strong>Real-time Communication:</strong> Socket.IO</li>
              <li><strong>Authentication:</strong> JWT (JSON Web Tokens)</li>
              <li><strong>State Management:</strong> React Context API</li>
            </ul>

            <h2>Project Architecture</h2>
            <p>Our chat application follows a client-server architecture with the following key components:</p>

            <h3>Backend Structure</h3>
            <CodeBlock language="javascript" code={`
// Server setup with Express and Socket.IO
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
mongoose.connect('mongodb://localhost:27017/chatapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
            `} />

            <h3>Real-Time Event Handling</h3>
            <p>Socket.IO enables bidirectional communication between the client and server. Here's how we handle real-time events:</p>

            <CodeBlock language="javascript" code={`
// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Join a room
  socket.on('join_room', (roomId) => {
    socket.join(roomId);
    socket.to(roomId).emit('user_joined', {
      message: 'A user has joined the room',
      userId: socket.id
    });
  });

  // Handle sending messages
  socket.on('send_message', (data) => {
    const { roomId, message, username, timestamp } = data;
    
    // Save message to database
    const newMessage = new Message({
      roomId,
      username,
      message,
      timestamp
    });
    
    newMessage.save().then(() => {
      // Broadcast message to room
      io.to(roomId).emit('receive_message', data);
    });
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});
            `} />

            <h2>Frontend Implementation</h2>
            <p>The React frontend provides an intuitive interface for users to send messages, join rooms, and see real-time updates.</p>

            <h3>Chat Component</h3>
            <CodeBlock language="jsx" code={`
import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

const ChatRoom = ({ roomId, username }) => {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [socket, setSocket] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Initialize socket connection
    const newSocket = io('http://localhost:5000');
    setSocket(newSocket);

    // Join the room
    newSocket.emit('join_room', roomId);

    // Listen for messages
    newSocket.on('receive_message', (data) => {
      setMessages(prevMessages => [...prevMessages, data]);
    });

    return () => newSocket.close();
  }, [roomId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (messageInput.trim() && socket) {
      const messageData = {
        roomId,
        message: messageInput,
        username,
        timestamp: new Date()
      };
      
      socket.emit('send_message', messageData);
      setMessageInput('');
    }
  };

  return (
    <div className="flex flex-col h-96 border rounded-lg">
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((msg, index) => (
          <div key={index} className="flex items-start space-x-2">
            <span className="font-semibold text-blue-600">
              {msg.username}:
            </span>
            <span>{msg.message}</span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={sendMessage} className="p-4 border-t">
        <div className="flex space-x-2">
          <input
            type="text"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};
            `} />

            <h2>Database Schema Design</h2>
            <p>MongoDB stores our chat data with the following schemas:</p>

            <CodeBlock language="javascript" code={`
// User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String, default: '' },
  isOnline: { type: Boolean, default: false },
  lastSeen: { type: Date, default: Date.now }
});

// Message Schema
const messageSchema = new mongoose.Schema({
  roomId: { type: String, required: true },
  username: { type: String, required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  messageType: { type: String, enum: ['text', 'image', 'file'], default: 'text' }
});

// Room Schema
const roomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  participants: [{ type: String }],
  createdBy: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  isPrivate: { type: Boolean, default: false }
});
            `} />

            <h2>Authentication Implementation</h2>
            <p>We use JWT tokens for secure user authentication:</p>

            <CodeBlock language="javascript" code={`
// Authentication middleware
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Login route
app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({ token, user: { id: user._id, username: user.username } });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});
            `} />

            <h2>Key Features Implemented</h2>
            <ul>
              <li><strong>Real-time messaging</strong> with instant delivery</li>
              <li><strong>Multiple chat rooms</strong> with room-based message isolation</li>
              <li><strong>User authentication</strong> and session management</li>
              <li><strong>Message persistence</strong> with MongoDB</li>
              <li><strong>Online status</strong> indicators</li>
              <li><strong>Responsive design</strong> that works on all devices</li>
              <li><strong>Message history</strong> loading</li>
              <li><strong>Typing indicators</strong> for better UX</li>
            </ul>

            <h2>Challenges and Solutions</h2>
            <h3>Challenge 1: Managing Socket Connections</h3>
            <p>One of the biggest challenges was properly managing socket connections and preventing memory leaks.</p>
            <p><strong>Solution:</strong> Implemented proper cleanup in React useEffect hooks and server-side connection management.</p>

            <h3>Challenge 2: Real-time Synchronization</h3>
            <p>Ensuring messages appear in the correct order across all connected clients required careful event handling.</p>
            <p><strong>Solution:</strong> Used room-based messaging and server-side message ordering with timestamps.</p>

            <h3>Challenge 3: Scalability</h3>
            <p>As the number of concurrent users grows, managing socket connections becomes challenging.</p>
            <p><strong>Solution:</strong> Implemented connection pooling and considered Redis for scaling across multiple server instances.</p>

            <h2>Deployment and Production Considerations</h2>
            <p>For production deployment, consider these important factors:</p>
            <ul>
              <li><strong>Environment Variables:</strong> Use proper environment configuration for different stages</li>
              <li><strong>HTTPS:</strong> Ensure secure connections in production</li>
              <li><strong>Rate Limiting:</strong> Implement rate limiting to prevent spam</li>
              <li><strong>Message Moderation:</strong> Add content filtering for inappropriate messages</li>
              <li><strong>Load Balancing:</strong> Use Redis adapter for Socket.IO clustering</li>
              <li><strong>Database Optimization:</strong> Index frequently queried fields</li>
            </ul>

            <h2>Performance Optimizations</h2>
            <CodeBlock language="javascript" code={`
// Implementing message pagination
app.get('/api/messages/:roomId', authenticateToken, async (req, res) => {
  try {
    const { roomId } = req.params;
    const { page = 1, limit = 50 } = req.query;
    
    const messages = await Message.find({ roomId })
      .sort({ timestamp: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    
    res.json(messages.reverse());
  } catch (error) {
    res.status(500).json({ message: 'Error fetching messages' });
  }
});

// Optimizing socket events
socket.on('typing', (data) => {
  socket.to(data.roomId).emit('user_typing', {
    username: data.username,
    isTyping: data.isTyping
  });
});
            `} />

            <h2>Future Enhancements</h2>
            <p>Here are some features that could be added to enhance the chat application:</p>
            <ul>
              <li>File and image sharing capabilities</li>
              <li>Voice and video calling integration</li>
              <li>Message reactions and emoji support</li>
              <li>User roles and permissions</li>
              <li>Message search functionality</li>
              <li>Push notifications for offline users</li>
              <li>Dark mode support</li>
              <li>Message encryption for security</li>
            </ul>

            <h2>Conclusion</h2>
            <p>Building a real-time chat application with the MERN stack and Socket.IO provides an excellent foundation for understanding modern web development practices. The combination of React's component-based architecture, Node.js's event-driven backend, MongoDB's flexible document storage, and Socket.IO's real-time capabilities creates a powerful and scalable solution.</p>

            <p>The key takeaways from this project include understanding real-time communication protocols, managing client-server state synchronization, implementing secure authentication, and designing for scalability from the beginning.</p>

            <p>Whether you're building a customer support system, team collaboration tool, or social platform, the patterns and techniques demonstrated in this chat application provide a solid foundation for any real-time web application.</p>

            <div className="mt-12 p-6 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-200 dark:border-purple-800">
              <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-100 mb-2">
                🚀 Want to see the code?
              </h3>
              <p className="text-purple-700 dark:text-purple-300 mb-4">
                Check out the complete source code on GitHub and try the live demo!
              </p>
              <div className="flex gap-4">
                <a 
                  href="https://github.com/Soumodip04"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                  </svg>
                  View Source Code
                </a>
              </div>
            </div>
          </article>
        </div>
      </div>
    </>
  );
}
