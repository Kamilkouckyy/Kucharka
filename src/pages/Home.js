import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getRecepty, deleteRecept } from '../services/api';
import StarRating from '../components/StarRating';
 
const CATEGORIES = ['snídaně', 'polévka', 'hlavní jídlo', 'dezert', 'příloha', 'předkrm','večeře'];
const CAT_COLORS = {
  'polévka': '#E8641A',
  'hlavní jídlo': '#3A7D44',
  'dezert': '#9B59B6',
  'příloha': '#2980B9',
  'předkrm': '#C0392B',
  'snídaně': '#F39C12',
  'večeře': '#8E44AD',
};
 
export default function Home() {
  const [recepty, setRecepty] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [deleteId, setDeleteId] = useState(null);
 
  useEffect(() => {
    getRecepty().then(data => { setRecepty(data || []); setLoading(false); });
  }, []);
 
  const handleDelete = async () => {
    await deleteRecept(deleteId);
    setRecepty(recepty.filter(r => r._id !== deleteId));
    setDeleteId(null);
  };
 
  const filtered = filter ? recepty.filter(r => r.category === filter) : recepty;
 
  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '2.2rem', color: '#2C1A0E', lineHeight: 1.1 }}>Moje recepty</h1>
          <p style={{ color: '#A67C52', marginTop: '0.3rem' }}>{recepty.length} receptů v databázi</p>
        </div>
        <Link to="/recepty/novy" style={{
          background: '#E8641A', color: '#fff', padding: '0.7rem 1.4rem',
          borderRadius: '24px', fontWeight: 500, fontSize: '0.95rem',
          boxShadow: '0 4px 14px rgba(232,100,26,0.35)', display: 'flex', alignItems: 'center', gap: '0.4rem'
        }}>+ Nový recept</Link>
      </div>
 
      
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <button onClick={() => setFilter('')} style={{
          padding: '0.35rem 1rem', borderRadius: '20px', border: '1.5px solid',
          borderColor: !filter ? '#2C1A0E' : '#E8DDD0',
          background: !filter ? '#2C1A0E' : 'white',
          color: !filter ? 'white' : '#5C3D2E', fontSize: '0.85rem', fontWeight: 500,
        }}>Vše</button>
        {CATEGORIES.map(cat => (
          <button key={cat} onClick={() => setFilter(cat)} style={{
            padding: '0.35rem 1rem', borderRadius: '20px', border: '1.5px solid',
            borderColor: filter === cat ? CAT_COLORS[cat] : '#E8DDD0',
            background: filter === cat ? CAT_COLORS[cat] : 'white',
            color: filter === cat ? 'white' : '#5C3D2E', fontSize: '0.85rem', fontWeight: 500,
          }}>{cat}</button>
        ))}
      </div>
 
      
      {loading ? (
        <p style={{ color: '#A67C52', textAlign: 'center', padding: '3rem' }}>Načítám recepty...</p>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem', color: '#A67C52' }}>
          <p style={{ fontSize: '3rem', marginBottom: '1rem' }}>🍽️</p>
          <p style={{ fontSize: '1.1rem' }}>Žádné recepty nenalezeny</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.2rem' }}>
          {filtered.map(recept => (
            <div key={recept._id} style={{
              background: '#FFFCF7', borderRadius: '16px', border: '1px solid #E8DDD0',
              overflow: 'hidden', transition: 'transform 0.2s, box-shadow 0.2s',
              boxShadow: '0 2px 12px rgba(44,26,14,0.06)',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(44,26,14,0.12)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 2px 12px rgba(44,26,14,0.06)'; }}
            >
              {/* Color bar */}
              <div style={{ height: '4px', background: CAT_COLORS[recept.category] || '#E8641A' }} />
              <div style={{ padding: '1.2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <span style={{
                    fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em',
                    color: CAT_COLORS[recept.category] || '#E8641A',
                  }}>{recept.category}</span>
                  <div style={{ display: 'flex', gap: '0.4rem' }}>
                    <Link to={`/recepty/${recept._id}/upravit`} style={{ fontSize: '1rem', opacity: 0.5 }} title="Upravit">✏️</Link>
                    <button onClick={() => setDeleteId(recept._id)} style={{ background: 'none', border: 'none', fontSize: '1rem', opacity: 0.5 }} title="Smazat">🗑️</button>
                  </div>
                </div>
                <Link to={`/recepty/${recept._id}`}>
                  <h3 style={{ fontSize: '1.15rem', color: '#2C1A0E', marginBottom: '0.5rem', lineHeight: 1.3 }}>{recept.name}</h3>
                </Link>
                <p style={{ fontSize: '0.85rem', color: '#A67C52', marginBottom: '0.8rem', lineHeight: 1.5 }}>
                  {recept.procedure.substring(0, 80)}{recept.procedure.length > 80 ? '...' : ''}
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <StarRating value={recept.averageRating} readonly size={16} />
                  <span style={{ fontSize: '0.8rem', color: '#A67C52' }}>{recept.ingredients?.length || 0} surovin</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
 
      
      {deleteId && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(44,26,14,0.5)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200,
        }}>
          <div style={{ background: '#FFFCF7', borderRadius: '16px', padding: '2rem', maxWidth: '380px', width: '90%', boxShadow: '0 20px 60px rgba(44,26,14,0.3)' }}>
            <h3 style={{ marginBottom: '0.8rem' }}>Smazat recept?</h3>
            <p style={{ color: '#A67C52', marginBottom: '1.5rem', fontSize: '0.95rem' }}>Tato akce je nevratná.</p>
            <div style={{ display: 'flex', gap: '0.8rem', justifyContent: 'flex-end' }}>
              <button onClick={() => setDeleteId(null)} style={{
                padding: '0.6rem 1.2rem', borderRadius: '8px', border: '1px solid #E8DDD0',
                background: 'white', color: '#5C3D2E', fontWeight: 500,
              }}>Zrušit</button>
              <button onClick={handleDelete} style={{
                padding: '0.6rem 1.2rem', borderRadius: '8px', border: 'none',
                background: '#C0392B', color: 'white', fontWeight: 500,
              }}>Smazat</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
 