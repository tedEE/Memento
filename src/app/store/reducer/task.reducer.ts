import {Action} from '@ngrx/store';
import {AddTask, LoadTasks, TASK_ACTION, TaskAction} from '../action/task.action';


const initialState = {
  tasks: [
    {id: 1,
      location: 'локация',
      hint: 'подсказка',
      date: 10,
      status: 1}
    ]
};

export function taskReduser(state = initialState, action: any) {
  switch (action.type) {
    case  TASK_ACTION.ADD_TASK :
      return {
        ...state,
        task: [...state.tasks,
          action.payload
        ]
      };
      case  TASK_ACTION.LOAD_TASKS :
        return {
        ...state,
        tasks: [...action.payload]
      }
    default :
      return state;
  }
}
