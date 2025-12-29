// components/Navbar.tsx
"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import "./navbar.css";
import { usePathname } from 'next/navigation';

interface NavItem {
  label: string;
  href: string;
  submenu?: NavItem[];
}

interface NavbarProps {
  items?: NavItem[];
  logo?: string;
  className?: string;
}

export const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/pages/about' },
  { label: 'Blog', href: '/pages/blog' },
  { label: 'Publications', href: '/pages/publications' },
  { label: 'Projects', href: '/pages/projects' },
  { label: 'Repositories', href: '/pages/repositories' },
  { label: 'Certifications', href: '/pages/certifications' },
  { label: 'Resources', href: '/pages/resources' },
  { label: 'People', href: '/pages/people' },
  { 
    label: 'More', 
    href: '#',
    submenu: [
      { label: 'Teaching', href: '/pages/teaching' },
      { label: 'Gallery', href: '/pages/gallery' },
      { label: 'Contact', href: '/pages/contact' }
    ]
  }
];

export default function Navbar({ items = navItems, logo, className = '' }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isMenuOpen]);



  const triggerNavigationStart = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('navigationStart'));
    }
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
    setActiveSubmenu(null);
  };

  const toggleSubmenu = (label: string) => {
    setActiveSubmenu(activeSubmenu === label ? null : label);
  };

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      <nav className={`navbar ${className}`}>
        <div className="navbar-container">
          {/* Desktop Navigation */}
          <ul className="navbar-menu desktop-menu">
            {items.map((item, index) => (
              <li key={index} className="navbar-item">
                {item.submenu ? (
                  <div className="navbar-dropdown">
                    <button className="navbar-link navbar-dropdown-toggle">
                      {item.label}
                      <i className="fas fa-chevron-down"></i>
                    </button>
                    <ul className="navbar-submenu">
                      {item.submenu.map((subitem, subindex) => (
                        <li key={subindex}>
                          <Link
                            href={subitem.href}
                            className={`navbar-sublink ${isActive(subitem.href) ? 'active' : ''}`}
                          >
                            {subitem.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={`navbar-link ${isActive(item.href) ? 'active' : ''}`}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          {/* Mobile Hamburger Button */}
          <button
            className={`hamburger-btn ${isMenuOpen ? 'open' : ''}`}
            onClick={handleMenuToggle}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Menu */}
      <div className={`nav-menu ${isMenuOpen ? 'open' : ''}`}>
        
        <div className="nav-menu-inner">
          <div className="menu-branding">
            <div className="portrait">
              <img src="/images/nav-menu.webp" alt="Profile" />
            </div>
          </div>
          
          <div className="nav-options">
            <ul className="menu-nav">
              {items.map((item, index) => (
                <li key={index} className={`nav-item ${isMenuOpen ? 'open' : ''}`}>
                  {item.submenu ? (
                    <>
                      <button
                        className={`link-item ${activeSubmenu === item.label ? 'submenu-open' : ''}`}
                        onClick={() => toggleSubmenu(item.label)}
                      >
                        {item.label}
                        <i className="fas fa-chevron-down submenu-icon"></i>
                      </button>
                      <ul className={`mobile-submenu ${activeSubmenu === item.label ? 'open' : ''}`}>
                        {item.submenu.map((subitem, subindex) => (
                          <li key={subindex}>
                            <Link
                              href={subitem.href}
                              className={`link-item submenu-link ${isActive(subitem.href) ? 'active' : ''}`}
                              onClick={() => {
                                triggerNavigationStart();
                                handleCloseMenu();
                              }}
                            >
                              {subitem.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className={`link-item ${isActive(item.href) ? 'active' : ''}`}
                      onClick={() => {
                        triggerNavigationStart();
                        handleCloseMenu();
                      }}
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Backdrop */}
      {isMenuOpen && <div className="nav-backdrop" onClick={handleCloseMenu}></div>}
    </>
  );
}