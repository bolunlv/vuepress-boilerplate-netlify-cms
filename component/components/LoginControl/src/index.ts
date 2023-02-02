export const loginControlEmits = {
  click: (evt: MouseEvent) => evt instanceof MouseEvent,
};

export type LoginControlEmits = typeof loginControlEmits;
