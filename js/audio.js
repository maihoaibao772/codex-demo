/*
  audio.js - speech synthesis and recording utilities.
*/

import { showToast } from './utils.js';

let mediaRecorder = null;
let audioChunks = [];
let playbackUrl = null;

export function isAudioSupported() {
  return 'speechSynthesis' in window && 'MediaRecorder' in window;
}

export function speakText(text) {
  if (!('speechSynthesis' in window)) {
    showToast('Trình duyệt không hỗ trợ đọc tiếng.');
    return;
  }
  const utterance = new SpeechSynthesisUtterance(text);
  const zhVoice = window.speechSynthesis.getVoices().find((voice) => voice.lang.toLowerCase().includes('zh'));
  if (zhVoice) {
    utterance.voice = zhVoice;
  }
  utterance.lang = 'zh-CN';
  try {
    window.speechSynthesis.speak(utterance);
  } catch (error) {
    console.warn('Speech synthesis error', error);
    showToast('Không thể phát âm.');
  }
}

export async function startRecording() {
  if (!navigator.mediaDevices) {
    showToast('Thiết bị không hỗ trợ ghi âm.');
    return;
  }
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream);
    audioChunks = [];
    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) audioChunks.push(event.data);
    };
    mediaRecorder.onstop = () => {
      if (playbackUrl) URL.revokeObjectURL(playbackUrl);
      const blob = new Blob(audioChunks, { type: 'audio/webm' });
      playbackUrl = URL.createObjectURL(blob);
      stream.getTracks().forEach((track) => track.stop());
    };
    mediaRecorder.start();
    showToast('Đang ghi...');
  } catch (error) {
    console.error('Recorder error', error);
    showToast('Không thể khởi tạo micro.');
  }
}

export async function stopRecording() {
  if (mediaRecorder && mediaRecorder.state !== 'inactive') {
    mediaRecorder.stop();
    showToast('Đã lưu đoạn ghi âm.');
  }
}

export function playbackRecording() {
  if (!playbackUrl) {
    showToast('Chưa có đoạn ghi âm.');
    return;
  }
  const audio = new Audio(playbackUrl);
  audio.play();
}
