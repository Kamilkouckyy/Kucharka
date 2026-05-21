import { useState } from 'react';
 
export default function StarRating({ value = 0, onChange, readonly = false, size = 20 }) {
  const [hover, setHover] = useState(0);
 
  return (
    <div style={{ display: 'flex', gap: '2px' }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => !readonly && onChange && onChange(star)}
          onMouseEnter={() => !readonly && setHover(star)}
          onMouseLeave={() => !readonly && setHover(0)}
          style={{
            fontSize: `${size}px`,
            cursor: readonly ? 'default' : 'pointer',
            color: star <= (hover || value) ? '#E8641A' : '#E8DDD0',
            transition: 'color 0.15s',
          }}
        >★</span>
      ))}
    </div>
  );
}
 