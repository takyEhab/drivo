import { useEffect, useState } from 'react';
import { api } from '../../lib/axios';
import { egp } from '../../lib/format';

export default function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => { api.get('/admin/stats').then((r) => setStats(r.data)); }, []);

  if (!stats) return <div>Loading…</div>;

  const cards = [
    { label: 'Total orders',      value: stats.orders },
    { label: 'Revenue (paid)',    value: egp(stats.revenue) },
    { label: 'Pending / sourcing',value: stats.pending },
    { label: 'Unavailable items', value: stats.unavailable },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((c) => (
          <div key={c.label} className="card p-5">
            <div className="text-sm text-white/60">{c.label}</div>
            <div className="text-2xl font-bold mt-1">{c.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}