// src/buffer-polyfill.js
import { Buffer } from 'buffer';

if (!window.Buffer) {
  window.Buffer = Buffer;
}

if (!globalThis.Buffer) {
  globalThis.Buffer = Buffer;
}
