// components/RotatingDesignation.tsx
"use client";
import React from 'react';

interface DesignationProps {
  titles: string[];
  className?: string;
}

export default function RotatingDesignation({ titles, className = "designation" }: DesignationProps) {
  return (
    <h1 className={className}>
      <span className="designation-list">
        {titles.map((title, index) => (
          <span key={index} className="desig-item">
            <span className="title-word-3">{title}</span>
          </span>
        ))}
      </span>
    </h1>
  );
}