'use client';

import { useEffect } from 'react';
import { Line, Bar, Pie, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import './Blog.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface BlogPost {
  id: string;
  title: string;
  description: string;
  content: React.ReactNode;
  readTime: number;
  date: string;
  year: string;
  tags: string[];
  category?: string;
  pinned?: boolean;
  featured?: boolean;
}

interface BlogPostModalProps {
  post: BlogPost | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function BlogPostModal({ post, isOpen, onClose }: BlogPostModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = 'unset'; };
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
      return () => window.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);

  if (!isOpen || !post) return null;

  return (
    <div className="blog-modal-overlay" onClick={onClose}>
      <div className="blog-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="blog-modal-close" onClick={onClose} aria-label="Close">
          <i className="fas fa-times"></i>
        </button>
        <div className="blog-modal-header">
          <h1 className="blog-modal-title">{post.title}</h1>
          <p className="blog-modal-description">{post.description}</p>
          <div className="blog-modal-meta">
            <span>{post.readTime} min read</span>
            <span>·</span>
            <span><i className="fas fa-calendar fa-sm"></i> {post.date}</span>
            {post.year && <><span>·</span><span><i className="fas fa-calendar fa-sm"></i> {post.year}</span></>}
          </div>
          {post.tags.length > 0 && (
            <div className="blog-modal-tags">
              {post.tags.map((tag, i) => (
                <span key={i} className="blog-tag">
                  <i className="fas fa-hashtag fa-sm"></i> {tag}
                </span>
              ))}
              {post.category && <><span>·</span><span className="blog-category"><i className="fas fa-tag fa-sm"></i> {post.category}</span></>}
            </div>
          )}
        </div>
        <div className="blog-modal-body">
          <div className="blog-post-content">{post.content}</div>
        </div>
      </div>
    </div>
  );
}
