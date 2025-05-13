import { apiGet, apiPost, apiPut} from '../../utils/utils';
import {

  GET_USERS,
 
} from '../../utils/urls';

export const fetchUserList = async (page:number) => {
  try {
    const getUserList = await apiGet<string[]>(GET_USERS(page));
    return [...getUserList];
  } catch (error: any) {
    console.error('Failed to fetch user:', error.message);
    
  }
};


// export const addTodo = async (data: {title: string; completed: boolean}) => {
//   try {
//     const response = await apiPost<any>(ADD_TASK, data);
//     console.log('Task added successfully:', response);
//     return response;
//   } catch (error: any) {
//     console.error('Failed to add task:', error.message);
//     throw error;
//   }
// };

// export const updateTodo = async (
//   id: number,
//   data: {title?: string; completed: boolean},
// ) => {
//   try {
//     const response = await apiPut<any>(TASK_UPDATE(id));
//     console.log('Task updated successfully:', response);
//     return response;
//   } catch (error: any) {
//     console.error('Failed to update task:', error.message);
//     throw error;
//   }
// };
