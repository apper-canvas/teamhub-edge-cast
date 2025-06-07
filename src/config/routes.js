import Projects from '../pages/Projects';
import ProjectDetail from '../pages/ProjectDetail';
import MyAssignments from '../pages/MyAssignments';
import Activity from '../pages/Activity';
import Messages from '../pages/Messages';
import Todos from '../pages/Todos';
import Schedule from '../pages/Schedule';
import Files from '../pages/Files';

export const routes = {
  projects: {
    id: 'projects',
    label: 'Projects',
    path: '/projects',
    icon: 'FolderOpen',
    component: Projects
  },
  projectDetail: {
    id: 'projectDetail',
    path: '/projects/:id',
    component: ProjectDetail
  },
  myAssignments: {
    id: 'myAssignments',
    label: 'My Assignments',
    path: '/my-assignments',
    icon: 'User',
    component: MyAssignments
  },
  activity: {
    id: 'activity',
    label: 'Activity',
    path: '/activity',
    icon: 'Activity',
    component: Activity
  },
  messages: {
    id: 'messages',
    path: '/projects/:projectId/messages',
    component: Messages
  },
  todos: {
    id: 'todos',
    path: '/projects/:projectId/todos',
    component: Todos
  },
  schedule: {
    id: 'schedule',
    path: '/projects/:projectId/schedule',
    component: Schedule
  },
  files: {
    id: 'files',
    path: '/projects/:projectId/files',
    component: Files
  }
};

export const routeArray = Object.values(routes);