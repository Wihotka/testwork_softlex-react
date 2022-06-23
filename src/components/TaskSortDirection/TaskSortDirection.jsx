import React from 'react';
import MySelect from '../UI/select/MySelect';

const TaskSortDirection = ({ sortDirection, setSortDirection }) => {
  return (
    <div>
      <MySelect
        value={sortDirection}
        onChange={selectedSort => setSortDirection(selectedSort)}
        defaultValue="Direction"
        options={[
          { value: 'asc', name: 'Ascending' },
          { value: 'desc', name: 'Descending' }
        ]}
      />
    </div>
  );
};

export default TaskSortDirection;
