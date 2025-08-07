import React from 'react';
import './Layout.css';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="layout-container">
      <header className="layout-header">
        <h1>📓 Diario Interactivo</h1>
      </header>

      <main className="layout-main">{children}</main>

      <footer className="layout-footer">
        <small>&copy; {new Date().getFullYear()} Marcela's AI Diary</small>
      </footer>
    </div>
  );
};

export default Layout;
