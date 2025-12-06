// components/TagList.tsx
"use client";
import React from 'react';

interface TagListProps {
  tags: string[];
  className?: string;
  tagClassName?: string;
}

export default function TagList({ 
  tags, 
  className = "home-intro-tags",
  tagClassName = "home-intro-tag"
}: TagListProps) {
  return (
    <div className={className}>
      {tags.map((tag, index) => (
        <span key={index} className={tagClassName}>
          {tag}
        </span>
      ))}
    </div>
  );
}