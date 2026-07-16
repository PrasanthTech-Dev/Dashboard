import React, { useState, useEffect } from 'react';
import { Download, ChevronDown, ArrowUp, ArrowDown, BarChart2, Users, MoreHorizontal } from 'lucide-react';
import defaultAvatar from '../../assets/images/profile/avatar.png';

const Dashboard = () => {
  // Automated state for metrics
  const [income, setIncome] = useState(8500);
  const [sales, setSales] = useState(3500);
  const [clients, setClients] = useState(2500);

  // Live bar chart heights state
  const [statsData, setStatsData] = useState([
    { day: 'Mon', inc: 70, exp: 40 },
    { day: 'Tue', inc: 50, exp: 35 },
    { day: 'Wed', inc: 90, exp: 50 },
    { day: 'Thu', inc: 65, exp: 30 },
    { day: 'Fri', inc: 80, exp: 45 },
    { day: 'Sat', inc: 45, exp: 25 },
    { day: 'Sun', inc: 55, exp: 35 }
  ]);

  // Live line chart heights state
  const [analyticsPoints1, setAnalyticsPoints1] = useState([140, 120, 135, 90, 125, 75, 95]);
  const [analyticsPoints2, setAnalyticsPoints2] = useState([160, 140, 150, 115, 135, 100, 115]);

  const [activeTooltip, setActiveTooltip] = useState({ x: 150, y: 90, value: '$1.000', date: '22 August, 2019' });

  // Simulated live telemetry triggers
  useEffect(() => {
    const interval = setInterval(() => {
      // 1. Walk metrics slightly
      setIncome(prev => prev + Math.floor(Math.random() * 60) - 25);
      setSales(prev => prev + Math.floor(Math.random() * 4) - 2);
      setClients(prev => prev + Math.floor(Math.random() * 2) - 1);

      // 2. Perturb stats bar heights
      setStatsData(prev => prev.map(item => ({
        ...item,
        inc: Math.max(10, Math.min(130, item.inc + Math.floor(Math.random() * 12) - 6)),
        exp: Math.max(5, Math.min(80, item.exp + Math.floor(Math.random() * 8) - 4))
      })));

      // 3. Shift line coordinates
      setAnalyticsPoints1(prev => {
        const next = prev.map(p => Math.max(40, Math.min(150, p + Math.floor(Math.random() * 16) - 8)));
        // Keep tooltip synced with the middle (Wednesday/Thursday) coordinate
        setActiveTooltip(t => ({ ...t, y: next[3], value: `$${Math.round((200 - next[3]) * 8)}` }));
        return next;
      });
      setAnalyticsPoints2(prev => prev.map(p => Math.max(70, Math.min(170, p + Math.floor(Math.random() * 12) - 6))));

    }, 3500);

    return () => clearInterval(interval);
  }, []);

  const pathD1 = `M 30 ${analyticsPoints1[0]} L 70 ${analyticsPoints1[1]} L 110 ${analyticsPoints1[2]} L 150 ${analyticsPoints1[3]} L 190 ${analyticsPoints1[4]} L 230 ${analyticsPoints1[5]} L 270 ${analyticsPoints1[6]}`;
  const pathD2 = `M 30 ${analyticsPoints2[0]} L 70 ${analyticsPoints2[1]} L 110 ${analyticsPoints2[2]} L 150 ${analyticsPoints2[3]} L 190 ${analyticsPoints2[4]} L 230 ${analyticsPoints2[5]} L 270 ${analyticsPoints2[6]}`;

  const lastOrders = [
    { name: 'Regina Cooper', orderNo: '#790841', amount: '$2.500', type: 'Credit Card', date: '12.09.2019', avatar: defaultAvatar },
    { name: 'Robert Edwards', orderNo: '#799894', amount: '$1.500', type: 'PayPal', date: '12.09.2019', avatar: defaultAvatar },
    { name: 'Gloria Mckinney', orderNo: '#790857', amount: '$5.600', type: 'Credit Card', date: '12.09.2019', avatar: defaultAvatar },
    { name: 'Randall Fisher', orderNo: '#790687', amount: '$2.850', type: 'PayPal', date: '12.09.2019', avatar: defaultAvatar },
  ];

  const transactions = [
    { name: 'Devon Williamson', time: '08:00 AM - 19 August', amount: '+$1,400', type: 'Payment', status: 'success', avatar: defaultAvatar },
    { name: 'Debra Wilson', time: '09:45 AM - 19 August', amount: '-$850', type: 'Refund', status: 'danger', avatar: defaultAvatar },
    { name: 'Judith Black', time: '10:15 AM - 20 August', amount: '+$2,050', type: 'Payment', status: 'success', avatar: defaultAvatar },
    { name: 'Philip Henry', time: '10:50 AM - 23 August', amount: '+$650', type: 'Payment', status: 'success', avatar: defaultAvatar },
    { name: 'Mitchell Cooper', time: '12:45 AM - 25 August', amount: '+$900', type: 'Payment', status: 'success', avatar: defaultAvatar },
  ];

  return (
    <div className="dashboard-landing-page" style={{ paddingBottom: '30px' }}>
      
      <div className="overview-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: '700', color: '#1e293b', margin: 0 }}>Overview</h1>
        
        <div style={{ display: 'flex', gap: '10px' }}>
          <button style={{ padding: '8px 12px', border: '1px solid #e2e8f0', borderRadius: '6px', backgroundColor: '#ffffff', color: '#64748b', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
            <Download size={16} />
          </button>
          <button style={{ padding: '8px 16px', border: '1px solid #e2e8f0', borderRadius: '6px', backgroundColor: '#ffffff', color: '#1e293b', fontSize: '13px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>Last 7 days</span>
            <ChevronDown size={14} style={{ color: '#94a3b8' }} />
          </button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '24px' }}>
        <div className="card" style={{ margin: '0', padding: '20px', backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: '600' }}>Total Income</span>
              <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#1e293b', margin: '4px 0 6px', transition: 'color 0.5s' }}>
                ${income.toLocaleString('en-US')}
              </h2>
              <span style={{ fontSize: '11px', fontWeight: '700', color: '#10b981', display: 'inline-flex', alignItems: 'center', gap: '2px' }}>
                <ArrowUp size={12} /> 50.8%
              </span>
            </div>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#e6fbf2', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: '20px', fontWeight: '700' }}>$</span>
            </div>
          </div>
        </div>

        <div className="card" style={{ margin: '0', padding: '20px', backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: '600' }}>Total Sales</span>
              <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#1e293b', margin: '4px 0 6px' }}>
                {sales.toLocaleString('en-US')}K
              </h2>
              <span style={{ fontSize: '11px', fontWeight: '700', color: '#ef4444', display: 'inline-flex', alignItems: 'center', gap: '2px' }}>
                <ArrowDown size={12} /> 10.5%
              </span>
            </div>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#e2f6f5', color: '#14b8a6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <BarChart2 size={22} />
            </div>
          </div>
        </div>

        <div className="card" style={{ margin: '0', padding: '20px', backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: '600' }}>New Clients</span>
              <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#1e293b', margin: '4px 0 6px' }}>
                {clients.toLocaleString('en-US')}K
              </h2>
              <span style={{ fontSize: '11px', fontWeight: '700', color: '#10b981', display: 'inline-flex', alignItems: 'center', gap: '2px' }}>
                <ArrowUp size={12} /> 24.9%
              </span>
            </div>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#ecfdf5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Users size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* Live Charts block */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '20px', marginBottom: '24px' }}>
        
        {/* Statistics Bar Chart */}
        <div className="card" style={{ margin: '0', padding: '20px', backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#1e293b', margin: 0 }}>Statistics</h3>
              <div style={{ display: 'flex', gap: '12px', marginTop: '4px', fontSize: '11px' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#64748b' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981' }}></span> Income: 2,500
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#64748b' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#14b8a6' }}></span> Expense: 1,200
                </span>
              </div>
            </div>
            <button style={{ display: 'flex', alignItems: 'center', gap: '6px', border: '1px solid #cbd5e1', borderRadius: '6px', padding: '4px 10px', fontSize: '11px', fontWeight: '600', backgroundColor: '#ffffff', cursor: 'pointer' }}>
              <span>19 Aug – 25 Aug</span> <ChevronDown size={12} />
            </button>
          </div>

          <div style={{ height: '220px' }}>
            <svg viewBox="0 0 400 200" style={{ width: '100%', height: '100%' }}>
              {[0, 50, 100, 150].map((y, i) => (
                <line key={i} x1="30" y1={20 + y} x2="380" y2={20 + y} stroke="#f1f5f9" strokeWidth="1" />
              ))}
              
              {statsData.map((col, idx) => {
                const x = 45 + idx * 48;
                const incHeight = col.inc;
                const expHeight = col.exp;
                const yInc = 170 - incHeight;
                const yExp = yInc - expHeight;

                return (
                  <g key={idx}>
                    {/* Columns animated using style transitions */}
                    <rect x={x} y={yInc} width="12" height={incHeight} fill="#10b981" rx="2" style={{ transition: 'height 0.8s ease, y 0.8s ease' }} />
                    <rect x={x} y={yExp} width="12" height={expHeight} fill="#14b8a6" rx="2" style={{ transition: 'height 0.8s ease, y 0.8s ease' }} />
                    <text x={x + 6} y="185" textAnchor="middle" fontSize="9" fill="#94a3b8" fontWeight="600">{col.day}</text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Analytics Line Chart */}
        <div className="card" style={{ margin: '0', padding: '20px', backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#1e293b', margin: 0 }}>Analytics</h3>
              <div style={{ display: 'flex', gap: '10px', marginTop: '4px', fontSize: '11px', fontWeight: '600' }}>
                <span style={{ color: '#10b981' }}>↑ $5.850</span>
                <span style={{ color: '#ef4444' }}>↓ $1.750</span>
              </div>
            </div>
            <button style={{ display: 'flex', alignItems: 'center', gap: '6px', border: '1px solid #cbd5e1', borderRadius: '6px', padding: '4px 10px', fontSize: '11px', fontWeight: '600', backgroundColor: '#ffffff', cursor: 'pointer' }}>
              <span>19 Aug – 25 Aug</span> <ChevronDown size={12} />
            </button>
          </div>

          <div style={{ height: '220px', position: 'relative' }}>
            <svg viewBox="0 0 300 180" style={{ width: '100%', height: '100%' }}>
              {/* Lines morph smoothly using d transitions */}
              <path d={pathD1} fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" style={{ transition: 'd 0.8s ease' }} />
              <path d={pathD2} fill="none" stroke="#86efac" strokeWidth="2" strokeLinecap="round" style={{ transition: 'd 0.8s ease' }} />
              
              <circle cx="150" cy={activeTooltip.y} r="4" fill="#ffffff" stroke="#10b981" strokeWidth="2" style={{ transition: 'cy 0.8s ease' }} />
              
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
                <text key={i} x={30 + i * 40} y="175" textAnchor="middle" fontSize="9" fill="#94a3b8" fontWeight="600">{day}</text>
              ))}
            </svg>

            {/* Hover Tooltip moves relative to line */}
            <div className="tooltip-analytics" style={{ 
              position: 'absolute', 
              top: `${activeTooltip.y - 50}px`, 
              left: '100px', 
              backgroundColor: '#1e293b', 
              color: '#ffffff', 
              padding: '6px 12px', 
              borderRadius: '6px', 
              fontSize: '10px', 
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              transition: 'top 0.8s ease',
              pointerEvents: 'none'
            }}>
              <div style={{ fontWeight: '700' }}>{activeTooltip.value}</div>
              <div style={{ color: '#94a3b8', fontSize: '9px' }}>{activeTooltip.date}</div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '20px', marginBottom: '24px' }}>
        <div className="card" style={{ margin: '0', padding: '20px', backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#1e293b', margin: 0 }}>Sales</h3>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}><MoreHorizontal size={20} /></button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ position: 'relative', width: '130px', height: '130px', marginBottom: '20px' }}>
              <svg viewBox="0 0 36 36" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
                <circle cx="18" cy="18" r="15.91" fill="transparent" stroke="#f1f5f9" strokeWidth="3" />
                <circle cx="18" cy="18" r="15.91" fill="transparent" stroke="#10b981" strokeWidth="3" strokeDasharray="70 100" />
              </svg>
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                <div style={{ fontSize: '20px', fontWeight: '800', color: '#1e293b' }}>3.500</div>
                <div style={{ fontSize: '9px', color: '#94a3b8', fontWeight: '700', textTransform: 'uppercase' }}>Total</div>
              </div>
            </div>

            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', fontSize: '12px', borderTop: '1px solid #f1f5f9', paddingTop: '15px' }}>
              <div>
                <div style={{ color: '#64748b' }}>Current Week</div>
                <div style={{ fontWeight: '700', color: '#1e293b' }}>2.500 <span style={{ color: '#10b981', fontSize: '10px' }}>↑ 8.8%</span></div>
              </div>
              <div>
                <div style={{ color: '#64748b' }}>Last Week</div>
                <div style={{ fontWeight: '700', color: '#1e293b' }}>1.000 <span style={{ color: '#ef4444', fontSize: '10px' }}>↓ 5.8%</span></div>
              </div>
            </div>
          </div>
        </div>

        <div className="card" style={{ margin: '0', padding: '20px', backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#1e293b', margin: 0 }}>Statistics</h3>
              <div style={{ display: 'flex', gap: '12px', marginTop: '4px', fontSize: '11px' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#64748b' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981' }}></span> Income: 2,500
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#64748b' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#14b8a6' }}></span> Expense: 1,200
                </span>
              </div>
            </div>
            <button style={{ display: 'flex', alignItems: 'center', gap: '6px', border: '1px solid #cbd5e1', borderRadius: '6px', padding: '4px 10px', fontSize: '11px', fontWeight: '600', backgroundColor: '#ffffff', cursor: 'pointer' }}>
              <span>19 Aug – 25 Aug</span> <ChevronDown size={12} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { row: '25', inc: '80%', exp: '40%' },
              { row: '24', inc: '65%', exp: '30%' },
              { row: '23', inc: '75%', exp: '50%' },
              { row: '22', inc: '90%', exp: '45%' },
              { row: '21', inc: '50%', exp: '25%' },
              { row: '20', inc: '70%', exp: '35%' },
              { row: '19', inc: '40%', exp: '20%' }
            ].map((r, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '15px', fontSize: '11px' }}>
                <span style={{ width: '15px', color: '#94a3b8', fontWeight: '700' }}>{r.row}</span>
                <div style={{ flex: '1', display: 'flex', gap: '4px', height: '8px', backgroundColor: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: r.inc, height: '100%', backgroundColor: '#10b981', borderRadius: '4px' }}></div>
                  <div style={{ width: r.exp, height: '100%', backgroundColor: '#14b8a6', borderRadius: '4px' }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        <div className="card" style={{ margin: '0', padding: '20px', backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#1e293b', margin: 0 }}>Last Orders</h3>
            <button style={{ display: 'flex', alignItems: 'center', gap: '6px', border: '1px solid #cbd5e1', borderRadius: '6px', padding: '4px 10px', fontSize: '11px', fontWeight: '600', backgroundColor: '#ffffff', cursor: 'pointer' }}>
              <span>19 Aug – 25 Aug</span> <ChevronDown size={12} />
            </button>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table className="table" style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <th style={{ padding: '12px 10px', fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', textAlign: 'left' }}>Customer</th>
                  <th style={{ padding: '12px 10px', fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', textAlign: 'left' }}>Order No</th>
                  <th style={{ padding: '12px 10px', fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', textAlign: 'left' }}>Amount</th>
                  <th style={{ padding: '12px 10px', fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', textAlign: 'left' }}>Payment</th>
                  <th style={{ padding: '12px 10px', fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', textAlign: 'left' }}>Date</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {lastOrders.map((order, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '12px 10px', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px' }}>
                      <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                        <img src={order.avatar} alt={order.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                      <span style={{ fontWeight: '600', color: '#1e293b' }}>{order.name}</span>
                    </td>
                    <td style={{ padding: '12px 10px', fontSize: '13px', color: '#64748b' }}>{order.orderNo}</td>
                    <td style={{ padding: '12px 10px', fontSize: '13px', color: '#1e293b', fontWeight: '700' }}>{order.amount}</td>
                    <td style={{ padding: '12px 10px', fontSize: '13px', color: '#64748b' }}>{order.type}</td>
                    <td style={{ padding: '12px 10px', fontSize: '13px', color: '#64748b' }}>{order.date}</td>
                    <td style={{ padding: '12px 10px', textAlign: 'center', color: '#94a3b8', cursor: 'pointer' }}><MoreHorizontal size={18} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card" style={{ margin: '0', padding: '20px', backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#1e293b', margin: 0 }}>Transactions</h3>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}><MoreHorizontal size={20} /></button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {transactions.map((tx, idx) => (
              <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                    <img src={tx.avatar} alt={tx.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div>
                    <h4 style={{ margin: '0', fontSize: '13px', fontWeight: '700', color: '#1e293b' }}>{tx.name}</h4>
                    <span style={{ fontSize: '10px', color: '#94a3b8' }}>{tx.time}</span>
                  </div>
                </div>
                
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontWeight: '700', color: tx.status === 'success' ? '#10b981' : '#ef4444', display: 'block' }}>{tx.amount}</span>
                  <span style={{ fontSize: '10px', color: '#94a3b8' }}>{tx.type}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
