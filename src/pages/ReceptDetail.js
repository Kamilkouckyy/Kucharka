import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getRecept, deleteRecept, hodnotitRecept } from '../services/api';
import StarRating from '../components/StarRating';
 
const CAT_COLORS = {
  'polévka': '#E8641A', 'hlavní jídlo': '#3A7D44', 'dezert': '#9B59B6',
  'příloha': '#2980B9', 'předkrm': '#C0392B',
  'snídaně': '#F39C12', 'večeře': '#eeea02',
};
 
export default function ReceptDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recept, setRecept] = useState(null);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(0);
  const [rated, setRated] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
 
  useEffect(() => {
    getRecept(id).then(data => { setRecept(data); setLoading(false); });
  }, [id]);
 
  const handleRate = async () => {
    if (!rating) return;
    const updated = await hodnotitRecept(id, rating);
    setRecept(prev => ({ ...prev, averageRating: updated.averageRating, ratingCount: updated.ratingCount }));
    setRated(true);
  };
 
  const handleDelete = async () => {
    await deleteRecept(id);
    navigate('/');
  };
 
  if (loading) return <div style={{ textAlign: 'center', padding: '4rem', color: '#A67C52' }}>Načítám...</div>;
  if (!recept) return <div style={{ textAlign: 'center', padding: '4rem', color: '#C0392B' }}>Recept nenalezen</div>;
 
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      <Link to="/" style={{ color: '#A67C52', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.3rem', marginBottom: '1.5rem' }}>← Zpět na recepty</Link>
 
      <div style={{ background: '#FFFCF7', borderRadius: '20px', border: '1px solid #E8DDD0', overflow: 'hidden', boxShadow: '0 4px 24px rgba(44,26,14,0.08)' }}>
        <div style={{ height: '6px', background: CAT_COLORS[recept.category] || '#E8641A' }} />
        <div style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <span style={{ fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: CAT_COLORS[recept.category] || '#E8641A' }}>{recept.category}</span>
              <h1 style={{ fontSize: '2rem', color: '#2C1A0E', marginTop: '0.3rem', lineHeight: 1.2 }}>{recept.name}</h1>
            </div>
            <div style={{ display: 'flex', gap: '0.6rem' }}>
              <Link to={`/recepty/${id}/upravit`} style={{
                padding: '0.5rem 1rem', borderRadius: '8px', border: '1px solid #E8DDD0',
                background: 'white', color: '#5C3D2E', fontSize: '0.9rem', fontWeight: 500,
              }}>✏️ Upravit</Link>
              <button onClick={() => setDeleteModal(true)} style={{
                padding: '0.5rem 1rem', borderRadius: '8px', border: 'none',
                background: '#FEE2E2', color: '#C0392B', fontSize: '0.9rem', fontWeight: 500,
              }}>🗑️ Smazat</button>
            </div>
          </div>
 
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.5rem', padding: '0.8rem 1rem', background: '#FAF7F2', borderRadius: '10px' }}>
            <StarRating value={Math.round(recept.averageRating)} readonly size={20} />
            <span style={{ fontSize: '0.9rem', color: '#5C3D2E', fontWeight: 500 }}>{recept.averageRating?.toFixed(1)} ({recept.ratingCount} hodnocení)</span>
          </div>
 
          
          {recept.ingredients?.length > 0 && (
            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1rem', marginBottom: '0.8rem', color: '#5C3D2E' }}>Suroviny</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {recept.ingredients.map(ing => (
                  <span key={ing._id} style={{
                    padding: '0.3rem 0.8rem', borderRadius: '20px',
                    background: '#EEF7F0', color: '#3A7D44', fontSize: '0.85rem', fontWeight: 500,
                  }}>{ing.name} ({ing.unit})</span>
                ))}
              </div>
            </div>
          )}
 
          
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1rem', marginBottom: '0.8rem', color: '#5C3D2E' }}>Postup vaření</h3>
            <p style={{ lineHeight: 1.8, color: '#2C1A0E', whiteSpace: 'pre-line', fontSize: '0.95rem' }}>{recept.procedure}</p>
          </div>
 
          
          {!rated ? (
            <div style={{ borderTop: '1px solid #E8DDD0', paddingTop: '1.5rem' }}>
              <h3 style={{ fontSize: '1rem', marginBottom: '0.8rem', color: '#5C3D2E' }}>Ohodnoťte recept</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <StarRating value={rating} onChange={setRating} size={28} />
                <button onClick={handleRate} disabled={!rating} style={{
                  padding: '0.5rem 1.2rem', borderRadius: '8px', border: 'none',
                  background: rating ? '#E8641A' : '#E8DDD0',
                  color: rating ? 'white' : '#A67C52', fontWeight: 500, fontSize: '0.9rem',
                }}>Odeslat</button>
              </div>
            </div>
          ) : (
            <div style={{ borderTop: '1px solid #E8DDD0', paddingTop: '1.5rem', color: '#3A7D44', fontWeight: 500 }}>✓ Děkujeme za hodnocení!</div>
          )}
        </div>
      </div>
 
      
      {deleteModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(44,26,14,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200 }}>
          <div style={{ background: '#FFFCF7', borderRadius: '16px', padding: '2rem', maxWidth: '380px', width: '90%' }}>
            <h3 style={{ marginBottom: '0.8rem' }}>Smazat recept?</h3>
            <p style={{ color: '#A67C52', marginBottom: '1.5rem' }}>Tato akce je nevratná.</p>
            <div style={{ display: 'flex', gap: '0.8rem', justifyContent: 'flex-end' }}>
              <button onClick={() => setDeleteModal(false)} style={{ padding: '0.6rem 1.2rem', borderRadius: '8px', border: '1px solid #E8DDD0', background: 'white', color: '#5C3D2E', fontWeight: 500 }}>Zrušit</button>
              <button onClick={handleDelete} style={{ padding: '0.6rem 1.2rem', borderRadius: '8px', border: 'none', background: '#C0392B', color: 'white', fontWeight: 500 }}>Smazat</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}