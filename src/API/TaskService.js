import axios from 'axios';

const MY_NAME = 'Finagin';

export default class TaskService {
  static async getAll(page = 1, sortField = '', sortDirection = 'asc') {
    const response = await axios.get('https://uxcandy.com/~shapoval/test-task-backend/v2/', {
      params: {
        developer: MY_NAME,
        page: page,
        sort_field: sortField,
        sort_direction: sortDirection
      }
    });
    return response;
  }

  static async postTask(newTask) {
    const formData = new FormData();
    formData.append('username', newTask.username);
    formData.append('email', newTask.email);
    formData.append('text', newTask.text);

    const response = await axios.post('https://uxcandy.com/~shapoval/test-task-backend/v2/create',
    formData,
    {
      params: {
        developer: MY_NAME
      }
    });
    return response;
  }

  static async postAuth(auth) {
    const formData = new FormData();
    formData.append('username', auth.login);
    formData.append('password', auth.password);

    const response = await axios.post('https://uxcandy.com/~shapoval/test-task-backend/v2/login',
    formData,
    {
      params: {
        developer: MY_NAME
      }
    });
    return response;
  }

  static async getToken() {
    const response = await axios.get('https://uxcandy.com/~shapoval/test-task-backend/v2/login', {
      params: {
        developer: MY_NAME
      }
    });
    return response;
  }

  static async postToken(task, token) {
    const formData = new FormData();
    formData.append('token', token);
    formData.append('text', task.text);
    formData.append('status', task.status);

    const response = await axios.post(`https://uxcandy.com/~shapoval/test-task-backend/v2/edit/${task.id}`,
    formData,
    {
      params: {
        developer: MY_NAME
      }
    });
    return response;
  }
}
