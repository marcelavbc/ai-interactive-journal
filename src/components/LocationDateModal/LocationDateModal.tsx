'use client';
import React, { useEffect, useState } from 'react';

type Props = {
  open: boolean;
  initialPlace: string;
  initialDateISO: string; // "2025-08-11"
  onClose: () => void;
  onSave: (place: string, dateISO: string) => void;
  onLocate?: () => Promise<string | null>; // opcional: resuelve lugar actual y lo devuelve
};

const LocationDateModal: React.FC<Props> = ({
  open,
  initialPlace,
  initialDateISO,
  onClose,
  onSave,
  onLocate,
}) => {
  const [place, setPlace] = useState(initialPlace);
  const [dateISO, setDateISO] = useState(initialDateISO);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    setPlace(initialPlace);
    setDateISO(initialDateISO);
    setError(null);
  }, [open, initialPlace, initialDateISO]);

  const locate = async () => {
    if (!onLocate) return;
    try {
      setBusy(true);
      setError(null);
      const label = await onLocate();
      if (label) setPlace(label);
    } catch (e) {
      setError('No se pudo obtener la ubicación.');
    } finally {
      setBusy(false);
    }
  };

  const save = () => {
    const clean = place.trim();
    if (!clean) {
      setError('Añade una ubicación o usa “Detectar”');
      return;
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(dateISO)) {
      setError('Fecha inválida');
      return;
    }
    onSave(clean, dateISO);
  };

  if (!open) return null;

  return (
    <>
      <div style={{ display: 'grid', gap: 12 }}>
        <label>
          <div style={{ fontWeight: 700, marginBottom: 6 }}>Ubicación</div>
          <div style={{ display: 'flex', gap: 8 }}>
            <input
              type="text"
              value={place}
              onChange={e => setPlace(e.target.value)}
              placeholder="Ciudad, barrio..."
              style={{
                flex: 1,
                padding: '10px 12px',
                border: '1px solid #D9D2C6',
                borderRadius: 10,
                fontFamily: 'inherit',
              }}
            />
            {onLocate && (
              <button
                onClick={locate}
                disabled={busy}
                style={{
                  padding: '10px 12px',
                  borderRadius: 10,
                  border: '1px solid #D9D2C6',
                  background: '#fff',
                  cursor: 'pointer',
                }}
              >
                {busy ? 'Detectando…' : 'Detectar'}
              </button>
            )}
          </div>
        </label>

        <label>
          <div style={{ fontWeight: 700, margin: '8px 0 6px' }}>Fecha</div>
          <input
            type="date"
            value={dateISO}
            onChange={e => setDateISO(e.target.value)}
            style={{
              padding: '10px 12px',
              border: '1px solid #D9D2C6',
              borderRadius: 10,
              fontFamily: 'inherit',
            }}
          />
        </label>

        {error && <div style={{ color: '#a33', marginTop: 6 }}>{error}</div>}
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: 10,
          marginTop: 16,
        }}
      >
        <button
          onClick={onClose}
          style={{
            padding: '10px 14px',
            borderRadius: 10,
            border: '1px solid #ddd',
            background: '#fff',
            cursor: 'pointer',
          }}
        >
          Cancelar
        </button>
        <button
          onClick={save}
          style={{
            padding: '10px 14px',
            borderRadius: 10,
            border: 'none',
            background: '#C89A5B',
            color: '#fff',
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          Guardar
        </button>
      </div>
    </>
  );
};

export default LocationDateModal;
