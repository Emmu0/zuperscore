export const atomData: any = {
  // assessment detail
  assessment: null,
  // assessment sections
  sections: null,
  // current section index
  sectionIndex: 0,
  // assessment section questions
  questions: null,
  // current question index
  questionIndex: 0,
  // session
  session: null,
  // all attempts
  attempts: null,
  // attempt loader
  attemptLoader: false,
  // current attempt
  currentAttempt: null,
  // test screen review modes
  onlineCurrentView: "GENERAL-INSTRUCTIONS",
  // current profile (NOTE: not using for now)
  profile: null,
  // Giving permission to use masking
  maskToggle: false,
  // assessment session timer
  timer: null,
  // assessment sat button loaders
  loaders: {},
  // route restriction
  routeRestriction: false,
  // annotation Toggle
  annotationToggle: false,
  // annotation Selected Text
  annotationSelectedText: null,
  // test completion handler (user close and automatic timer close)
  testCompleted: null,
};
