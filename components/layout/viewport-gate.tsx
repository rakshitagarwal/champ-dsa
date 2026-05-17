"use client";

import { useSyncExternalStore } from "react";

function subscribeWidth(onChange: () => void) {
  const onResize = () => onChange();
  window.addEventListener("resize", onResize);
  return () => window.removeEventListener("resize", onResize);
}

function getWidth() {
  return typeof window !== "undefined" ? window.innerWidth : 1024;
}

function getServerWidth() {
  return 1024;
}

export function useViewportWidth() {
  return useSyncExternalStore(subscribeWidth, getWidth, getServerWidth);
}
