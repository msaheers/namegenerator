import AddNames from "./components/AddNames";
import AddSurnames from "./components/AddSurnames";
import GenerateFullName from "./components/GenerateFullName";
import History from "./components/History";
import "./index.css"; // make sure we have our CSS

function App() {
  return (
    <div className="App">
      {/* 🔥 Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        id="background-video"
        onEnded={(e) => e.target.play()}
      >
        <source src="/nissan.mp4" type="video/mp4" />
      </video>

    
      <div className="overlay"></div>

      {/* Main Content */}
      <h1>Name Generator</h1>
      <AddNames />
      <AddSurnames />
      <GenerateFullName />
      <History />
    </div>
  );
}

export default App;
