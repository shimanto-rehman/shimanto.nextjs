'use client';

import { useState, useEffect } from 'react';
import styles from './ThemeToggle.module.css';

interface ThemeToggleProps {
  onThemeChange: (isLight: boolean) => void;
  onColorBendsChange: (visible: boolean) => void;
  onPrismChange: (visible: boolean) => void;
  initialTheme?: boolean;
  initialColorBends?: boolean;
  initialPrism?: boolean;
}

export default function ThemeToggle({
  onThemeChange,
  onColorBendsChange,
  onPrismChange,
  initialTheme = false,
  initialColorBends = true,
  initialPrism = true,
}: ThemeToggleProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLightMode, setIsLightMode] = useState(initialTheme);
  const [colorBendsVisible, setColorBendsVisible] = useState(initialColorBends);
  const [prismVisible, setPrismVisible] = useState(initialPrism);

  useEffect(() => {
    // Load preferences from localStorage on mount
    // Defaults: dark mode (false), ColorBends visible (true), Prism visible (true)
    if (typeof window === 'undefined') return;
    
    const savedTheme = localStorage.getItem('theme');
    const savedColorBends = localStorage.getItem('colorBends');
    const savedPrism = localStorage.getItem('prism');
    
    // Apply saved preferences or keep defaults
    if (savedTheme !== null) {
      setIsLightMode(savedTheme === 'light');
      onThemeChange(savedTheme === 'light');
    }
    if (savedColorBends !== null) {
      const visible = savedColorBends !== 'false';
      setColorBendsVisible(visible);
      onColorBendsChange(visible);
    }
    if (savedPrism !== null) {
      const visible = savedPrism !== 'false';
      setPrismVisible(visible);
      onPrismChange(visible);
    }
  }, [onThemeChange, onColorBendsChange, onPrismChange]);

  const handleThemeToggle = () => {
    const newTheme = !isLightMode;
    setIsLightMode(newTheme);
    localStorage.setItem('theme', newTheme ? 'light' : 'dark');
    onThemeChange(newTheme);
  };

  const handleColorBendsToggle = () => {
    const newValue = !colorBendsVisible;
    setColorBendsVisible(newValue);
    localStorage.setItem('colorBends', String(newValue));
    onColorBendsChange(newValue);
  };

  const handlePrismToggle = () => {
    const newValue = !prismVisible;
    setPrismVisible(newValue);
    localStorage.setItem('prism', String(newValue));
    onPrismChange(newValue);
  };

  return (
    <>
      <button
        className={styles.settingsButton}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Theme Settings"
      >
        <i className="fas fa-cog"></i>
      </button>

      {isOpen && (
        <>
          <div
            className={styles.overlay}
            onClick={() => setIsOpen(false)}
          />
          <div className={styles.panel}>
            <div className={styles.panelHeader}>
              <h3>Theme Settings</h3>
              <button
                className={styles.closeButton}
                onClick={() => setIsOpen(false)}
                aria-label="Close"
              >
                ×
              </button>
            </div>

            <div className={styles.toggleGroup}>
              <div className={styles.toggleItem}>
                <label className={styles.toggleLabel}>
                  <span>Light Mode</span>
                  <ToggleSwitch
                    checked={isLightMode}
                    onChange={handleThemeToggle}
                  />
                </label>
              </div>

              <div className={styles.toggleItem}>
                <label className={styles.toggleLabel}>
                  <span>ColorBends</span>
                  <ToggleSwitch
                    checked={colorBendsVisible}
                    onChange={handleColorBendsToggle}
                  />
                </label>
              </div>

              <div className={styles.toggleItem}>
                <label className={styles.toggleLabel}>
                  <span>Prism</span>
                  <ToggleSwitch
                    checked={prismVisible}
                    onChange={handlePrismToggle}
                  />
                </label>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

interface ToggleSwitchProps {
  checked: boolean;
  onChange: () => void;
}

function ToggleSwitch({ checked, onChange }: ToggleSwitchProps) {
  return (
    <button
      className={`${styles.toggleSwitch} ${checked ? styles.checked : ''}`}
      onClick={onChange}
      role="switch"
      aria-checked={checked}
    >
      <span className={styles.toggleThumb} />
    </button>
  );
}

