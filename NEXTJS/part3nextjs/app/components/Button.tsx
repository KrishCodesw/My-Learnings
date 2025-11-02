"use client";
import { useState } from "react";
export function Button() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <button
        onClick={() => {
          setCount((c) => c + 1);
        }}
      >
        +
      </button>
      <button
        onClick={() => {
          setCount((c) => c - 1);
        }}
      >
        -
      </button>
      <button
        onClick={() => {
          setCount((c) => 0);
        }}
      >
        0
      </button>
      {count}
    </div>
  );
}
