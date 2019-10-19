import {NOTIFICATION_ACTION} from '../action/notification.action';

const initialState = {
  notifications: []
};

export function notificationReduser(state = initialState, action: any) {
  switch (action.type) {
    case  NOTIFICATION_ACTION.ADD_NOTIFICATION :
      return {
        ...state,
        notifications: [...state.notifications,
          action.payload
        ]
      };
    case NOTIFICATION_ACTION.DELETE_NOTIFICATION :
      return {
        ...state,
        notifications: [...state.notifications.filter(t => t.id !== action.payload.id)]
      };
    case  NOTIFICATION_ACTION.LOAD_NOTIFICATION :
      return {
        ...state,
        notifications: [...action.payload]
      };
    default :
      return state;
  }
}
