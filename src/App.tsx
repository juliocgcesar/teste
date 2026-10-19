import StatusDonutChart from './StatusDonutChart';

function App() {
  return (
    <div style={{ backgroundColor: '#f3f4f6', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
      <div style={{ width: '100%', maxWidth: '600px' }}>
        <h2 style={{ fontFamily: 'sans-serif', color: '#1f2937', marginBottom: '16px', textAlign: 'center' }}>
          Dashboard de Atividades
        </h2>
        <StatusDonutChart />
      </div>
    </div>
  );
}

export default App;
