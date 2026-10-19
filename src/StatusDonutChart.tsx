import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface StatusItem {
  name: string;
  value: number;
  color: string;
}

const dados: StatusItem[] = [
  { name: 'Pendentes', value: 45, color: '#FF9F43' },
  { name: 'Agendadas', value: 30, color: '#00CFE8' },
  { name: 'Prontas para Iniciar', value: 25, color: '#7367F0' },
  { name: 'Em Andamento', value: 35, color: '#28C76F' },
];

const total = dados.reduce((sum, item) => sum + item.value, 0);

const renderCustomLegend = () => {
  return (
    <ul style={{ 
      listStyle: 'none', 
      padding: 0, 
      margin: 0, 
      whiteSpace: 'nowrap',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      height: '100%'
    }}>
      {dados.map((item: StatusItem, index: number) => (
        <li 
          key={`item-${index}`} 
          style={{ display: 'flex', alignItems: 'center', marginBottom: '12px', fontSize: '14px' }}
        >
          <span 
            style={{ 
              backgroundColor: item.color, 
              width: '12px', 
              height: '12px', 
              borderRadius: '3px', 
              marginRight: '10px',
              display: 'inline-block',
              flexShrink: 0 
            }} 
          />
          <span style={{ fontWeight: 500, color: '#333', fontFamily: 'sans-serif' }}>
            {item.name}: <span style={{ color: '#666', fontWeight: 400 }}>{item.value}</span>
          </span>
        </li>
      ))}
    </ul>
  );
};

export default function StatusDonutChart() {
  return (
    <div style={{ width: '100%', maxWidth: '600px', height: 260, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', background: '#fff', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', boxSizing: 'border-box' }}>
      
      <div style={{ width: '50%', height: '100%', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        
        <ResponsiveContainer width="100%" height="100%">
          <PieChart style={{ outline: 'none' }}>
            
            <Tooltip 
              separator=": " 
              wrapperStyle={{ zIndex: 1000, pointerEvents: 'none' }} 
            />

            <Pie
              data={dados}
              cx="50%" 
              cy="50%"
              innerRadius={53} 
              outerRadius={75} 
              paddingAngle={3}
              dataKey="value"
              isAnimationActive={true} 
              animationDuration={800}
              animationEasing="ease-out"
            >
              {dados.map((entry: StatusItem, index: number) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.color} 
                  style={{ outline: 'none', cursor: 'pointer' }} 
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        <div style={{ 
          position: 'absolute', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          pointerEvents: 'none',
          userSelect: 'none'
        }}>
          <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#222', lineHeight: '1' }}>
            {total}
          </span>
          <span style={{ fontSize: '10px', color: '#888', fontWeight: 600, textTransform: 'uppercase', marginTop: '4px', letterSpacing: '0.5px' }}>
            Total
          </span>
        </div>

      </div>

      <div style={{ width: '50%', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', paddingLeft: '20px', boxSizing: 'border-box' }}>
        {renderCustomLegend()}
      </div>

    </div>
  );
}
