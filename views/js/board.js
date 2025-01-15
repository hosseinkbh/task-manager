document.addEventListener('DOMContentLoaded', () => {
  const tasks = document.querySelectorAll('.task');
  const columns = document.querySelectorAll('.column');
  const sidebar = document.querySelector('.sidebar');
  const container = document.querySelector('.container');
  const create_button = document.querySelector('.create-button');
  const task_priority = $('.task-priority');
  tasks.forEach((task) => {
    task.addEventListener('dragstart', (e) => {
      draggedTask = task;
      task.classList.add('dragging');
      setTimeout(() => task.classList.add('hidden'), 0);
    });
    task.addEventListener('dragend', () => {
      task.classList.remove('dragging', 'hidden');
      draggedTask = null;
    });
    task.addEventListener('click', () => {
      $.ajax({
        url: `/task/get/${task.dataset.id}`,
        method: 'GET',
        data: {},
        success: (response) => {
          const assigne = response.assign;
          let assigne_text = 'NOT ASSIGNED';
          if (assigne && assigne.firstName && assigne.lastName) {
            assigne_text = assigne.firstName + ' ' + assigne.lastName;
          }
          document.getElementById('task-detail-taskId').value = response.taskId;
          document.getElementById('task-detail_id').value = response._id;
          document.getElementById('task-detail-title').value = response.title;
          document.getElementById('task-detail-assigne').value = assigne_text;
          document.getElementById('task-detail-priority').value =
            response.priority ? response.priority : 'UNKNOWN';
          document.getElementById('task-detail-description').value =
            response.description;
          sidebar.classList.remove('hidden');
          sidebar.classList.add('open');
          container.classList.add('shrink');
          create_button.classList.add('button_shrink');
        },
      });
    });
  });
  columns.forEach((column) => {
    column.addEventListener('dragover', (e) => {
      e.preventDefault();
    });

    column.addEventListener('drop', (e) => {
      if (draggedTask) {
        column.appendChild(draggedTask);
        const status = column.getAttribute('data-status');
        $.ajax({
          url: `/task/update/${draggedTask.dataset.id}`,
          method: 'POST',
          data: { status: status },
        });
      }
    });
  });
  document.addEventListener('click', (e) => {
    const isClickInsideSidebar = sidebar.contains(e.target);
    const isClickOnTask = Array.from(tasks).some((task) =>
      task.contains(e.target),
    );
  });
  document.querySelector('.close-button').addEventListener('click', () => {
    sidebar.classList.remove('open');
    container.classList.remove('shrink');
    create_button.classList.remove('button_shrink');
  });
  document.querySelector('.edit-button').addEventListener('click', () => {
    const id = document.getElementById('task-detail_id').value;
    window.location = `/task/view/edit/${id}`;
  });
});
