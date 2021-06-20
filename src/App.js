import Header from './components/Header'
import Search from './components/Search'
import Footer from './components/Footer'

function App() {
  return (
    <div className="App d-flex flex-column min-vh-100">
        <Header/>
        <Search/>
        <Footer/>
    </div>
  );
}

export default App;
