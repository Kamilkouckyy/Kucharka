import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getRecept, createRecept, updateRecept, getSuroviny } from '../services/api';
 
const CATEGORIES = ['snídaně','polévka', 'hlavní jídlo', 'dezert', 'příloha', 'večeře'];
 
const inputStyle = {
  width: '100%', padding: '0.7rem 1rem', borderRadius: '10px',
  border: '1.5px solid #E8DDD0', background: '#FAF7F2',
  fontSize: '0.95rem', color: '#2C1A0E', outline: 'none',
  fontFamily: 'DM Sans, sans-serif',
};
 
export default function ReceptForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
 
  const [form, setForm] = useState({ name: '', category: 'hlavní jídlo', procedure: '', ingredients: [] });
  const [suroviny, setSuroviny] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
 
  useEffect(() => {
    getSuroviny().then(data => setSuroviny(data || []));
    if (isEdit) {
      setLoading(true);
      getRecept(id).then(data => {
        setForm({
          name: data.name,
          category: data.category,
          procedure: data.procedure,
          ingredients: data.ingredients?.map(i => i._id) || [],
        });
        setLoading(false);
      });
    }
  }, [id, isEdit]);
 
  const toggleIngredient = (ingId) => {
    setForm(prev => ({
      ...prev,
      ingredients: prev.ingredients.includes(ingId)
        ? prev.ingredients.filter(i => i !== ingId)
        : [...prev.ingredients, ingId],
    }));
  };
 
  const handleSubmit = async () => {
    if (!form.name || !form.procedure) return;
    setSaving(true);
    if (isEdit) {
      await updateRecept(id, form);
      navigate(`/recepty/${id}`);
    } else {
      const created = await createRecept(form);
      navigate(`/recepty/${created._id}`);
    }
  };
 
  if (loading) return <div style={{ textAlign: 'center', padding: '4rem', color: '#A67C52' }}>Načítám...</div>;
 
  return (
    <div style={{ maxWidth: '680px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      <Link to="/" style={{ color: '#A67C52', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.3rem', marginBottom: '1.5rem' }}>← Zpět</Link>
 
      <h1 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>{isEdit ? 'Upravit recept' : 'Nový recept'}</h1>
 
      <div style={{ background: '#FFFCF7', borderRadius: '20px', border: '1px solid #E8DDD0', padding: '2rem', boxShadow: '0 4px 24px rgba(44,26,14,0.08)' }}>
 
        <div style={{ marginBottom: '1.2rem' }}>
          <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#5C3D2E', display: 'block', marginBottom: '0.4rem' }}>Název receptu *</label>
          <input style={inputStyle} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Název receptu..." />
        </div>
 
        <div style={{ marginBottom: '1.2rem' }}>
          <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#5C3D2E', display: 'block', marginBottom: '0.4rem' }}>Kategorie *</label>
          <select style={inputStyle} value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
            {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>
 
        <div style={{ marginBottom: '1.2rem' }}>
          <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#5C3D2E', display: 'block', marginBottom: '0.4rem' }}>Postup vaření *</label>
          <textarea style={{ ...inputStyle, minHeight: '140px', resize: 'vertical' }} value={form.procedure} onChange={e => setForm({ ...form, procedure: e.target.value })} placeholder="Popis postupu vaření..." />
        </div>
 
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#5C3D2E', display: 'block', marginBottom: '0.6rem' }}>Suroviny</label>
          {suroviny.length === 0 ? (
            <p style={{ color: '#A67C52', fontSize: '0.9rem' }}>Nejsou dostupné žádné suroviny. <Link to="/suroviny" style={{ color: '#E8641A' }}>Přidat suroviny →</Link></p>
          ) : (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              {suroviny.map(ing => {
                const selected = form.ingredients.includes(ing._id);
                return (
                  <button key={ing._id} onClick={() => toggleIngredient(ing._id)} style={{
                    padding: '0.35rem 0.9rem', borderRadius: '20px', border: '1.5px solid',
                    borderColor: selected ? '#3A7D44' : '#E8DDD0',
                    background: selected ? '#EEF7F0' : 'white',
                    color: selected ? '#3A7D44' : '#5C3D2E',
                    fontSize: '0.85rem', fontWeight: 500,
                  }}>{ing.name} ({ing.unit})</button>
                );
              })}
            </div>
          )}
        </div>
 
        <div style={{ display: 'flex', gap: '0.8rem', justifyContent: 'flex-end' }}>
          <Link to="/" style={{ padding: '0.65rem 1.4rem', borderRadius: '10px', border: '1px solid #E8DDD0', background: 'white', color: '#5C3D2E', fontWeight: 500, fontSize: '0.95rem' }}>Zrušit</Link>
          <button onClick={handleSubmit} disabled={saving || !form.name || !form.procedure} style={{
            padding: '0.65rem 1.6rem', borderRadius: '10px', border: 'none',
            background: saving || !form.name || !form.procedure ? '#E8DDD0' : '#E8641A',
            color: saving || !form.name || !form.procedure ? '#A67C52' : 'white',
            fontWeight: 600, fontSize: '0.95rem',
          }}>{saving ? 'Ukládám...' : isEdit ? 'Uložit změny' : 'Vytvořit recept'}</button>
        </div>
      </div>
    </div>
  );
}
 