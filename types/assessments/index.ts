export type Assessment = {
  readonly id?: number;
  tenant?: any;
  created_at?: any;
  updated_at?: any;
  name?: any;
  description?: any;
  instructions?: any;
  cover_url?: any;
  link?: any;
  data?: any;
  kind?: any;
  created_by?: Number;
  attempts?: any;
};

export type Attempt = {
  readonly id?: number;
  user: number;
  section: number;
  question: number;
  type: string;
  need_validation: boolean;
  is_bookmark: boolean;
  data: any;
  extra: any;
  info: any;
  time_taken: any;
  created_at: Date;
  updated_at: Date;
  session_id: number;
};

export type AssessmentData = {
  result: Result;
  session: any;
  assessment_detail: AssessmentSection;
  user_assessment_session: any;
};

export type Result = {
  score: number;
  time_taken: any;
  wrong_answers: number;
  correct_answers: number;
  omitted_answers: number;
  over_all_percentage: number;
  total_no_of_questions: number;
};

export type Section = {
  readonly id?: number;
  name?: string;
  description?: string;
  instructions?: any;
  is_timed?: boolean;
  time_limit?: number;
  tools?: any;
  pre_screen?: any;
  post_screen?: any;
  sequence?: number;
  layout?: any;
  data?: any;
  timers?: any;
  questions?: any;
  result?: any;
  bubble_sheet_data?: any;
  bubble_sheet_questions?: any;
  bubble_sheet_answers?: any;
};

export interface AssessmentSection extends Assessment {
  sections: Section[];
}

export type Question = {
  readonly id?: number;
  title?: any;
  content?: any;
  type?: any;
  created_at?: Date;
  updated_at?: Date;
  data?: any;
  result?: any;
  passage?: any;
  timers?: any;
  is_active?: any;
  feedback?: any;
  assets?: any;
  score?: any;
  files?: any;
  options?: Option[];
};

// export interface SectionQuestion extends Section {
//   questions?: Question[];
// }

type Option = {
  id?: any;
  tenant?: any;
  created_at?: Date;
  updated_at?: Date;
  hash?: any;
  data?: any;
  sequence?: any;
  assets?: any;
  created_by?: any;
  question?: any;
};
