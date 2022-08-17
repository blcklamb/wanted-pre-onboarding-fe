export interface TodoFormState {
  todo: string;
}

export interface TodoUpdateState {
  id: string;
  todo: string;
  isCompleted: boolean;
}

export interface TodoDeleteState {
  id: string;
}

export interface TodoResponse {
  id: number;
  todo: string;
  isCompleted: boolean;
  userId: number;
}
