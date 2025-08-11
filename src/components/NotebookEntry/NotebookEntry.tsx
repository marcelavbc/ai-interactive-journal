'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import './NotebookEntry.css';
import Modal from '../Modal/Modal';
import LocationDateModal from '../LocationDateModal/LocationDateModal';

// helpers
const toISO = (d = new Date()) => d.toISOString().slice(0, 10);
const formatLong = (iso: string, locale = 'es-ES') =>
  new Date(iso).toLocaleDateString(locale, {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

const STORAGE_PREFIX = 'journal-draft:';

const NotebookEntry: React.FC = () => {
  const [dateISO, setDateISO] = useState<string>(toISO());
  const [place, setPlace] = useState<string>('Añadir ubicación');
  const [modalOpen, setModalOpen] = useState(false);
  const editorRef = useRef<HTMLDivElement | null>(null);

  const storageKey = `${STORAGE_PREFIX}${dateISO}`;
  // Carga borrador guardado
  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (editorRef.current) editorRef.current.innerText = saved || '';
  }, [storageKey]);

  const handleInput = () => {
    const txt = editorRef.current?.innerText ?? '';
    localStorage.setItem(storageKey, txt);
  };

  // botón "Detectar" del modal -> BigDataCloud
  const locateNow = async (): Promise<string | null> => {
    return new Promise(resolve => {
      if (!navigator.geolocation) return resolve(null);
      navigator.geolocation.getCurrentPosition(
        async pos => {
          try {
            const { latitude, longitude } = pos.coords;
            const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=es`;
            const res = await fetch(url);
            const data = await res.json();
            const city =
              data.city || data.locality || data.principalSubdivision || '';
            resolve(city || null);
          } catch {
            resolve(null);
          }
        },
        () => resolve(null),
        { enableHighAccuracy: true, timeout: 8000 }
      );
    });
  };

  const openEditor = () => setModalOpen(true);
  const saveMeta = (newPlace: string, newDateISO: string) => {
    setPlace(newPlace);
    setDateISO(newDateISO);
    setModalOpen(false);
  };

  const firstLineText = `${place}, ${formatLong(dateISO)}`;

  return (
    <section className="notebook-container">
      <div className="notebook-page">
        {/* primera línea clicable */}
        <button
          className="first-line clicky"
          onClick={openEditor}
          title="Editar ubicación y fecha"
        >
          {/* icono pin sobrio (SVG) */}
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
            style={{ marginRight: 8 }}
          >
            <path
              d="M12 22s7-6.2 7-12a7 7 0 10-14 0c0 5.8 7 12 7 12z"
              stroke="#8f7d63"
              strokeWidth="1.6"
              fill="none"
            />
            <circle
              cx="12"
              cy="10"
              r="2.6"
              stroke="#8f7d63"
              strokeWidth="1.6"
              fill="none"
            />
          </svg>
          <span className="first-line-text">{firstLineText}</span>
        </button>

        <div
          ref={editorRef}
          className="entry-editor below-first-line"
          contentEditable
          spellCheck
          data-placeholder="Escribe aquí como si fuera tu libreta…"
          onInput={handleInput}
          onPaste={e => {
            e.preventDefault();
            document.execCommand(
              'insertText',
              false,
              e.clipboardData.getData('text/plain')
            );
          }}
        />
      </div>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Ubicación y fecha"
      >
        <LocationDateModal
          open={true}
          initialPlace={place === 'Añadir ubicación' ? '' : place}
          initialDateISO={dateISO}
          onClose={() => setModalOpen(false)}
          onSave={saveMeta}
          onLocate={locateNow}
        />
      </Modal>
    </section>
  );
};

export default NotebookEntry;
