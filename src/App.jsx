import { BrowserRouter as Router } from 'react-router-dom';
import {ProductList} from "./components/ProductList";
import { Sidebar } from "./components/Sidebar";

const App = () => {
  return (
    <Router>
      <div className="container-fluid mx-auto grid grid-cols-12 gap-4 h-screen p-4">
        <div className="col-span-2 bg-white rounded-lg shadow-lg p-4">
          <Sidebar />
        </div>
        <div className="col-span-10 rounded-lg shadow-lg p-4 bg-gray-100">
          <ProductList />
        </div>
      </div>
    </Router>
  );
};

export default App;

/*
    Limitations of my App:
    1. No user authentication right now, so anyone can access everything.
    2. Only one category can be selected at a time, which  limits what users can filter.
    3. If there are a lot of products, it might take longer to load, which isn’t great for users.
*/
