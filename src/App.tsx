import React, { Suspense, lazy } from 'react';
import './App.css';
import MyApp from './components/memo';
import TodoApp from './Pages/TodoPages';

const DelayedComponent = lazy(
  () =>
    new Promise<{ default: React.FC }>((resolve) => {
      setTimeout(() => {
        resolve({
          default: () => <div>Hello</div>,
        });
      }, 4000);
    })
);

function App() {
  return (
    <>
      <div className="App bg-gray-100 min-h-screen flex flex-col mb-3">
        <header className="App-header bg-blue-500 text-white p-4 rounded shadow-md mb-3">
          <h1 className="text-4xl font-bold">Todo App with Zustand</h1>
        </header>

        {/* <Suspense fallback={<div>Loading...</div>}>
        <DelayedComponent />
      </Suspense> */}

        <MyApp />

        <TodoApp />

        <footer className="bg-blue-500 text-white p-4 text-center mt-auto">
          <p className="text-sm">&copy; {new Date().getFullYear()} Todo App with Zustand</p>
        </footer>
      </div>
    </>
  );
}

export default App;
