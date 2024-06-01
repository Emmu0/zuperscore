// recoil
import { atom } from "recoil";
// types
import * as assessmentRecoilTypes from "./types";
import { Assessment, Section, Question } from "types/assessments";
// recoil data
import { atomData } from "./data";

export const assessment = atom<Assessment | null>({
  key: "assessment",
  default: atomData["assessment"],
});

export const sections = atom<Section[] | null>({
  key: "sections",
  default: atomData["sections"],
});

export const sectionIndex = atom<number>({
  key: "sectionIndex",
  default: atomData["sectionIndex"],
});

export const questions = atom<Question[] | null>({
  key: "questions",
  default: atomData["questions"],
});

export const questionIndex = atom<number>({
  key: "questionIndex",
  default: atomData["questionIndex"],
});

export const session = atom<any | null>({
  key: "session",
  default: atomData["session"],
});

export const attempts = atom<any | null>({
  key: "attempts",
  default: atomData["attempts"],
});

export const attemptLoader = atom<any | null>({
  key: "attemptLoader",
  default: atomData["attemptLoader"], 
})

export const currentAttempt = atom<any | null>({
  key: "currentAttempt",
  default: atomData["currentAttempt"],
});

export const onlineCurrentView = atom<assessmentRecoilTypes.onlineCurrentViewType>({
  key: "onlineCurrentView",
  default: atomData["onlineCurrentView"],
});

export const profile = atom<any | null>({
  key: "profile",
  default: atomData["profile"],
});

export const maskToggle = atom<boolean>({
  key: "maskToggle",
  default: atomData["maskToggle"],
});

export const timer = atom<number | null>({
  key: "timer",
  default: atomData["timer"],
});

export const loaders = atom<any | null>({
  key: "loaders",
  default: atomData["loaders"],
});

export const routeRestriction = atom<boolean>({
  key: "routeRestriction",
  default: atomData["routeRestriction"],
});

export const annotationToggle = atom<boolean>({
  key: "annotationToggle",
  default: atomData["annotationToggle"],
});

export const annotationSelectedText = atom<any>({
  key: "annotationSelectedText",
  default: atomData["annotationSelectedText"],
});

export const testCompleted = atom<assessmentRecoilTypes.testCompletedType>({
  key: "testCompleted",
  default: atomData["testCompleted"],
});