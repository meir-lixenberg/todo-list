import "./App.css";

import { QueryClient, QueryClientProvider } from "react-query";
import Todo from "./components/Todo.jsx";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Todo />
      </div>
    </QueryClientProvider>
  );
}

export default App;
