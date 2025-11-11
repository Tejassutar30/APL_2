import './App.css';

const internalStyle = {
  backgroundColor: '#f0f8ff',
  padding: '20px',
  borderRadius: '8px',
  margin: '10px 0',
  border: '2px solid #4682b4'
};

function App() {
  return (
    <div className="app-container">
      <h1>CSS Styling in React</h1>
      
      <div className="external-style">
        <h2>External CSS</h2>
        <p>This div is styled using an external CSS file (App.css).</p>
      </div>
      
      <div style={internalStyle}>
        <h2>Internal CSS</h2>
        <p>This div is styled using internal CSS (CSS-in-JS).</p>
      </div>
      
      {/* Inline CSS */}
      <div style={{
        backgroundColor: '#fff0f5',
        padding: '20px',
        borderRadius: '8px',
        margin: '10px 0',
        border: '2px solid #db7093'
      }}>
        <h2 style={{ color: '#db7093', marginTop: '0' }}>Inline CSS</h2>
        <p>This div is styled using inline CSS.</p>
      </div>
    </div>
  )
}

export default App
