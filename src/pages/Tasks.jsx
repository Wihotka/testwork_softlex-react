import { useEffect, useState } from 'react';
import '../styles/App.css';
import MyButton from '../components/UI/button/MyButton';
import MyModal from '../components/UI/modal/MyModal';
import MyLoader from '../components/UI/loader/MyLoader';
import MyPagination from '../components/UI/pagination/MyPagination';
import TaskAuth from '../components/TaskAuth/TaskAuth';
import TaskFormCreate from '../components/TaskFormCreate/TaskFormCreate';
import TaskSort from '../components/TaskSort/TaskSort';
import TaskSortDirection from '../components/TaskSortDirection/TaskSortDirection';
import TaskList from '../components/TaskList/TaskList';
import { useFetching } from '../hooks/useFetching';
import TaskService from '../API/TaskService';
import { getPageCount } from '../utils/tasks';
import { useDispatch, useSelector } from 'react-redux';
import { addData } from '../store/slices/tasksSlice';
import { addToken } from '../store/slices/tokenSlice';
import { Link, useNavigate } from 'react-router-dom';

function Tasks() {
  const [modalCreate, setModalCreate] = useState(false);
  const [sortField, setSortField] = useState('');
  const [sortDirection, setSortDirection] = useState('');
  const [limit, setLimit] = useState(3);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [pageLimit, setPageLimit] = useState(10);
  const [pageMax, setPageMax] = useState(10);
  const [pageMin, setPageMin] = useState(1);

  const dispatch = useDispatch();

  const tasks = useSelector(state => state.tasks.data);
  const token = useSelector(state => state.token.data);
  const task = useSelector(state => state.task.data);

  let navigate = useNavigate();

  const url = document.location.pathname;

  const [fetchTasks, isTasksLoading, taskError] = useFetching(async (page, sortField, sortDirection) => {
    const response = await TaskService.getAll(page, sortField, sortDirection);
    dispatch(addData(response.data.message.tasks));
    const totalCount = response.data.message['total_task_count'];
    setTotalPages(getPageCount(totalCount, limit));
  });

  useEffect(() => {
    fetchTasks(page, sortField, sortDirection);
  }, [page, sortField, sortDirection, task]);

  useEffect(() => {
    if (url === '/tasks/create') {
      setModalCreate(true);
    }
  }, [url]);

  useEffect(() => {
    if (token) {
      document.cookie = `token=${token}; max-age=86400`;
    }
  }, [token]);

  const createTask = async (newTask) => {
    const response = await TaskService.postTask(newTask);
    if (response.data.status === 'ok') {
      fetchTasks(page, sortField, sortDirection);
      setModalCreate(false);
      navigate('/tasks', {replace: true});
    }
  }

  const authUser = async (auth) => {
    const response = await TaskService.postAuth(auth);
    if (response.data.status === 'ok') {
      dispatch(addToken(response.data.message.token));
    }
  }

  const changePage = (page) => {
    setPage(page);

    const MIN_PAGE = 1;
    const HALF_LIMIT = pageLimit / 2;

    if (page - HALF_LIMIT <= MIN_PAGE) {
      setPageMin(MIN_PAGE);
      setPageMax(pageLimit);
    } else if (page + HALF_LIMIT >= totalPages) {
      setPageMin((totalPages - pageLimit) + 1);
      setPageMax(totalPages);
    } else {
      setPageMin(page - HALF_LIMIT);
      setPageMax(page + HALF_LIMIT - 1);
    }
  }

  return (
    <div className="App">
      <header className='header'>
        <h2>LOGO</h2>
        <TaskAuth auth={authUser} />
        <Link to="create">
          <MyButton>Create task</MyButton>
        </Link>
        <MyModal visible={modalCreate} setVisible={setModalCreate}>
          <TaskFormCreate create={createTask} />
        </MyModal>
        <div className='headerSorts'>
          <TaskSort
            sortField={sortField}
            setSortField={setSortField}
          />
          <TaskSortDirection
            sortDirection={sortDirection}
            setSortDirection={setSortDirection}
          />
        </div>
      </header>
      <main>
        {taskError && 
          <h2>Error: {taskError}</h2>
        }
        {isTasksLoading
          ? <MyLoader />
          : <div>
              <TaskList
                tasks={tasks}
                title="Tasks List"
              />
              <MyPagination
                page={page}
                changePage={changePage}
                totalPages={totalPages}
                pageLimit={pageLimit}
                pageMax={pageMax}
                pageMin={pageMin}
              />
            </div>
        }
      </main>
    </div>
  );
}

export default Tasks;
