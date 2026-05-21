import { useState, useEffect } from 'react';
import { getSuroviny, createSurovina, deleteSurovina } from '../services/api';
 
const inputStyle = {
  padding: '0.65rem 1rem', borderRadius: '10px',
  border: '1.5px solid #E8DDD0', background: '#FAF7F2',
  fontSize: '0.9rem', color: '#2C1A0E', outline: 'none',
  fontFamily: 'DM Sans, sans-serif',
};
 
export default function Suroviny() {
  const [suroviny, setSuroviny] = useState([]);
  const [form, setForm] = useState({ name: '', unit: '' });
  const [saving, setSaving] = useState(false);
 
  useEffect(() => {
    getSuroviny().then(data => setSuroviny(data || []));
  }, []);
 
  const handleCreate = async () => {
    if (!form.name || !form.unit) return;
    setSaving(true);
    const nova = await createSurovina(form);
    setSuroviny([...suroviny, nova]);
    setForm({ name: '', unit: '' });
    setSaving(false);
  };
 
  const handleDelete = async (id) => {
    await deleteSurovina(id);
    setSuroviny(suroviny.filter(s => s._id !== id));
  };
 
  return (
    <div style={{ maxWidth: '700px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '0.3rem' }}>Suroviny</h1>
      <p style={{ color: '#A67C52', marginBottom: '2rem' }}>{suroviny.length} surovin v databázi</p>
 
      {/* Add form */}
      <div style={{ background: '#FFFCF7', borderRadius: '16px', border: '1px solid #E8DDD0', padding: '1.5rem', marginBottom: '1.5rem', boxShadow: '0 2px 12px rgba(44,26,14,0.06)' }}>
        <h3 style={{ fontSize: '1rem', marginBottom: '1rem', color: '#5C3D2E' }}>Přidat surovinu</h3>
        <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
          <input style={{ ...inputStyle, flex: 2, minWidth: '160px' }} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Název suroviny..." />
          <input style={{ ...inputStyle, flex: 1, minWidth: '100px' }} value={form.unit} onChange={e => setForm({ ...form, unit: e.target.value })} placeholder="Jednotka (g, ml...)" />
          <button onClick={handleCreate} disabled={saving || !form.name || !form.unit} style={{
            padding: '0.65rem 1.2rem', borderRadius: '10px', border: 'none',
            background: !form.name || !form.unit ? '#E8DDD0' : '#E8641A',
            color: !form.name || !form.unit ? '#A67C52' : 'white',
            fontWeight: 600, fontSize: '0.9rem', whiteSpace: 'nowrap',
          }}>+ Přidat</button>
        </div>
      </div>
 
      {/* List */}
      <div style={{ background: '#FFFCF7', borderRadius: '16px', border: '1px solid #E8DDD0', overflow: 'hidden', boxShadow: '0 2px 12px rgba(44,26,14,0.06)' }}>
        {suroviny.length === 0 ? (
          <p style={{ textAlign: 'center', padding: '3rem', color: '#A67C52' }}>Žádné suroviny. Přidejte první!</p>
        ) : (
          suroviny.map((sur, i) => (
            <div key={sur._id} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '0.9rem 1.2rem',
              borderBottom: i < suroviny.length - 1 ? '1px solid #E8DDD0' : 'none',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <span style={{ fontSize: '1.1rem' }}>🥕</span>
                <div>
                  <span style={{ fontWeight: 500, color: '#2C1A0E' }}>{sur.name}</span>
                  <span style={{ marginLeft: '0.6rem', fontSize: '0.8rem', color: '#A67C52', background: '#FAF7F2', padding: '0.15rem 0.5rem', borderRadius: '10px', border: '1px solid #E8DDD0' }}>{sur.unit}</span>
                </div>
              </div>
              <button onClick={() => handleDelete(sur._id)} style={{
                background: 'none', border: 'none', color: '#C0392B', fontSize: '1rem', opacity: 0.6, padding: '0.3rem',
              }} title="Smazat">🗑️</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
 