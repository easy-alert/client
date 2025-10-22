import type { ITicketChecklistItem } from '@customTypes/ITicketChecklistItem';
import { StyleHTMLAttributes } from 'react';

interface PublicTicketChecklistProps extends StyleHTMLAttributes<HTMLDivElement> {
  items: ITicketChecklistItem[];
}

export function TicketChecklist({ items, style, ...rest }: PublicTicketChecklistProps) {
  const ordered = [...(items || [])].sort((a, b) => a.position - b.position);
  const total = ordered.length;
  const done = ordered.filter((i) => i.status === 'completed').length;
  const percent = total > 0 ? Math.round((done / total) * 100) : 0;

  return (
    <div style={{ marginTop: 16, ...(style || {}) }} {...rest}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#666', fontSize: 13 }}>
        <span>{percent}% concluído</span>
        <div style={{ flex: 1, height: 6, background: '#eee', borderRadius: 4 }}>
          <div
            style={{
              width: `${percent}%`,
              height: '100%',
              background: percent === 100 ? '#2ecc71' : '#3498db',
              borderRadius: 4,
            }}
          />
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 8 }}>
        {ordered.map((item) => (
          <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <input type="checkbox" checked={item.status === 'completed'} readOnly />
            <p
              style={{
                margin: 0,
                textDecoration: item.status === 'completed' ? 'line-through' : 'none',
              }}
            >
              {item.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}


