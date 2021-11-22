import { useEffect } from 'react';

function App() {
  useEffect(() => {
    fetch("/api/hello").then(r => r.json()).then(console.log);
  }, []);
  return (
    <div className="App">無</div>
  );
}

export default App;
