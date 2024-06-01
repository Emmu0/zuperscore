// recoils
import { selector } from "recoil";
// atoms
import * as assessmentRecoilAtoms from "./index";
// recoil data
import { atomData } from "./data";
// types
import * as assessmentRecoilTypes from "./types";
import { Assessment, Question, Section } from "types/assessments";

// selectors
export const assessmentSelector = selector<any | null>({
  key: "assessmentSelector",
  get: ({ get }) => get(assessmentRecoilAtoms.assessment),
  set: ({ set }, payload) => set(assessmentRecoilAtoms.assessment, payload),
});

export const sectionsSelector = selector<any | null>({
  key: "sectionsSelector",
  get: ({ get }) => get(assessmentRecoilAtoms.sections),
  set: ({ set }, payload) => set(assessmentRecoilAtoms.sections, payload),
});

export const sectionIndexSelector = selector<number>({
  key: "sectionIndexSelector",
  get: ({ get }) => get(assessmentRecoilAtoms.sectionIndex),
  set: ({ set }, payload) => set(assessmentRecoilAtoms.sectionIndex, payload),
});

export const questionsSelector = selector<any | null>({
  key: "questionsSelector",
  get: ({ get }) => get(assessmentRecoilAtoms.questions),
  set: ({ set }, payload) => set(assessmentRecoilAtoms.questions, payload),
});

export const questionIndexSelector = selector<number>({
  key: "questionIndexSelector",
  get: ({ get }) => get(assessmentRecoilAtoms.questionIndex),
  set: ({ set }, payload) => set(assessmentRecoilAtoms.questionIndex, payload),
});

export const sessionSelector = selector<any | null>({
  key: "sessionSelector",
  get: ({ get }) => get(assessmentRecoilAtoms.session),
  set: ({ set }, payload) => set(assessmentRecoilAtoms.session, payload),
});

export const attemptSelector = selector<any | null>({
  key: "attemptSelector",
  get: ({ get }) => get(assessmentRecoilAtoms.attempts),
  set: ({ set, get }, payload: any) => {
    let previousAttempts = get(assessmentRecoilAtoms.attempts)
      ? [...get(assessmentRecoilAtoms.attempts)]
      : [];

    switch (payload.type) {
      case "init":
        set(assessmentRecoilAtoms.attempts, payload.data);
        break;
      case "create":
        set(assessmentRecoilAtoms.attempts, [...previousAttempts, payload.data]);
        break;
      case "update":
        let currentAttemptIndex = previousAttempts.findIndex(
          (_attempt) => _attempt.id == payload.data.id
        );
        if (currentAttemptIndex >= 0) previousAttempts[currentAttemptIndex] = payload.data;
        set(assessmentRecoilAtoms.attempts, previousAttempts);
        break;
      default:
        break;
    }
  },
});

export const attemptLoaderSelector = selector<any | null>({
  key: "attemptLoaderSelector",
  get: ({ get }) => get(assessmentRecoilAtoms.attemptLoader),
  set: ({ set }, payload) => set(assessmentRecoilAtoms.attemptLoader, payload),
});

export const currentAttemptSelector = selector<any | null>({
  key: "currentAttemptSelector",
  get: ({ get }) => get(assessmentRecoilAtoms.currentAttempt),
  set: ({ set }, payload) => set(assessmentRecoilAtoms.currentAttempt, payload),
});

export const onlineCurrentViewSelector = selector<
  assessmentRecoilTypes.onlineCurrentViewType | any
>({
  key: "onlineCurrentViewSelector",
  get: ({ get }) => get(assessmentRecoilAtoms.onlineCurrentView),
  set: ({ set }, payload: any) => set(assessmentRecoilAtoms.onlineCurrentView, payload),
});

export const assessmentDefaultSelector = selector({
  key: "assessmentDefaultSelector",
  get: ({ get }) => {
    let payload: any = {};
    Object.keys(atomData).map((_atom: string) => {
      payload = {
        ...payload,
        [_atom]: get(assessmentRecoilAtoms[_atom as assessmentRecoilTypes.atomDataTypes]),
      };
    });
    return payload;
  },
  set: ({ set }, payload: any) => {
    switch (payload.type) {
      case "reset":
        Object.keys(atomData).map((_atom: any) => {
          set(assessmentRecoilAtoms[_atom as assessmentRecoilTypes.atomDataTypes], atomData[_atom]);
        });
        break;
      case "update":
        Object.entries(payload.data).forEach(([key, value]: any) => {
          set(assessmentRecoilAtoms[key as assessmentRecoilTypes.atomDataTypes], value);
        });
        break;
      default:
        break;
    }
  },
});

export const profileSelector = selector<any | null>({
  key: "profileSelector",
  get: ({ get }) => get(assessmentRecoilAtoms.profile),
  set: ({ set }, payload) => set(assessmentRecoilAtoms.profile, payload),
});

export const maskToggleSelector = selector<boolean>({
  key: "maskToggleSelector",
  get: ({ get }) => get(assessmentRecoilAtoms.maskToggle),
  set: ({ set }, payload) => set(assessmentRecoilAtoms.maskToggle, payload),
});

export const timerSelector = selector<any | null>({
  key: "timerSelector",
  get: ({ get }) => get(assessmentRecoilAtoms.timer),
  set: ({ set }, payload) => set(assessmentRecoilAtoms.timer, payload),
});

export const loadersSelector = selector<any | null>({
  key: "loadersSelector",
  get: ({ get }) => get(assessmentRecoilAtoms.loaders),
  set: ({ set }, payload) => set(assessmentRecoilAtoms.loaders, payload),
});

export const routeRestrictionSelector = selector<boolean>({
  key: "routeRestrictionSelector",
  get: ({ get }) => get(assessmentRecoilAtoms.routeRestriction),
  set: ({ set }, payload) => set(assessmentRecoilAtoms.routeRestriction, payload),
});

export const annotationToggleSelector = selector<boolean>({
  key: "annotationShowModalSelector",
  get: ({ get }) => get(assessmentRecoilAtoms.annotationToggle),
  set: ({ set }, payload) => set(assessmentRecoilAtoms.annotationToggle, payload),
});

export const annotationSelectedTextSelector = selector<any>({
  key: "annotationSelectedTextSelector",
  get: ({ get }) => get(assessmentRecoilAtoms.annotationSelectedText),
  set: ({ set }, payload) => set(assessmentRecoilAtoms.annotationSelectedText, payload),
});

export const testCompletedSelector = selector<assessmentRecoilTypes.testCompletedType>({
  key: "testCompletedSelector",
  get: ({ get }) => get(assessmentRecoilAtoms.testCompleted),
  set: ({ set }, payload) => set(assessmentRecoilAtoms.testCompleted, payload),
});
