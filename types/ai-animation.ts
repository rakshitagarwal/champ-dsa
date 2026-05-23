export type AiAnimationStep = {
  label: string;
  svg: string;
};

export type AiAnimationResult = {
  title: string;
  steps: AiAnimationStep[];
  totalSteps: number;
};

export type AiAnimationRequest = {
  code: string;
};
