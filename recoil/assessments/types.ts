export type atomDataTypes =
  | "assessment"
  | "sections"
  | "sectionIndex"
  | "questions"
  | "questionIndex"
  | "session"
  | "attempts"
  | "currentAttempt"
  | "onlineCurrentView"
  | "profile"
  | "maskToggle"
  | "timer"
  | "loaders"
  | "routeRestriction"
  | "annotationToggle"
  | "annotationSelectedText";

export type onlineCurrentViewType =
  | "GENERAL-INSTRUCTIONS"
  | "SECTION-REVIEW"
  | "SECTION-CHANGE"
  | "SECTION-BREAK"
  | "TEST"
  | "TEST-COMPLETED";

export type testCompletedType = "TIMER-CLOSE" | "TEST-CLOSE" | "TAB-INACTIVE-TEST-CLOSE" | null;
