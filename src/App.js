import logo from './logo.svg';
import './App.css';

function App() {
  return (



    <div className="">
      <div className="card bg-dark text-white" style={{ position: "relative" }}>
        <img
          src="https://images.unsplash.com/photo-1488972685288-c3fd157d7c7a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          className="card-img"
          alt="..."
          style={{ objectFit: "cover", height: "915px", width: "100%" }}
        />
        <div className="card-img-overlay d-flex align-items-center">
          <div>
            <h1 className="card-title">CREAMOS LUGARES FELICES</h1>
            <p className="card-text">
              This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.
            </p>
          </div>
        </div>

      </div>
    </div>

  );
}

export default App;
