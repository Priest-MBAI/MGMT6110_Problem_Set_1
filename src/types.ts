export type TaskType = 
  | 'Assignment' 
  | 'Group Project' 
  | 'Exam' 
  | 'Case Study' 
  | 'Reading Review';

export interface Task {
  id: string;
  title: string;
  courseCode: string;
  courseName: string;
  taskType: TaskType;
  deadline: string;
  deadlineDetailed: string;
  submissionGuidelines: string;
  estimatedWorkNeeded: string;
  classroomLocation: string;
  classroomLocationFull: string;
  nextLessonName: string;
  nextLessonDate: string;
  nextLessonTime: string;
  nextClassTiming: string;
  completionTip: string;
  nextAction: string;
  estimatedTimeNextAction: string;
  checklist: string[];
  status: 'Incomplete' | 'Complete';
}

export interface StudentProfile {
  name: string;
  studentNumber: string;
  mastersProgramme: string;
}

export type ScreenView = 'prioritised-task' | 'action-steps';
