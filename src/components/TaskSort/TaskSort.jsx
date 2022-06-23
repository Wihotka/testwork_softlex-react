import React from 'react';
import MySelect from '../UI/select/MySelect';

const TaskSort = ({ sortField, setSortField }) => {
  return (
    <div>
      <MySelect
        value={sortField}
        onChange={selectedSort => setSortField(selectedSort)}
        defaultValue="Sort"
        options={[
          { value: 'username', name: 'Name' },
          { value: 'email', name: 'Email' },
          { value: 'status', name: 'Status' }
        ]}
      />
    </div>
  );
};

export default TaskSort;
