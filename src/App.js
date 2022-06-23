import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Tasks from './pages/Tasks';
import TaskNotFound from './components/TaskNotFound/TaskNotFound'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/tasks" element={<Tasks />}>
          <Route path='create' element={<Outlet />} />
          <Route path='edit/:id' element={<Outlet />} />
        </Route>
        <Route path="/" element={<Navigate to="/tasks" replace />} />
        <Route path='*' element={<TaskNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
