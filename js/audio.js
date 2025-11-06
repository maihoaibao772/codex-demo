/*
  audio.js - speech synthesis and recording utilities.
*/

(function (global) {
  const HB = (global.HB = global.HB || {});
  const { showToast } = HB;

  let mediaRecorder = null;
  let audioChunks = [];
  let playbackUrl = null;

  // --- TTS speak HAN only ---
  let zhVoice = null;

  function pickZhVoice() {
    const voices = window.speechSynthesis?.getVoices?.() || [];
    zhVoice =
      voices.find((voice) => /^(zh|cmn)/i.test(voice.lang)) ||
      voices.find((voice) => /chinese/i.test(`${voice.name}${voice.lang}`)) ||
      null;
  }

  if (typeof speechSynthesis !== 'undefined') {
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = pickZhVoice;
    }
    pickZhVoice();
  }

  function onlyHan(str) {
    const match = (str || '').match(/[\u3400-\u9FFF\uF900-\uFAFF\u{20000}-\u{2EBEF}]/gu);
    return match ? match.join('') : '';
  }

  function speakHan(rawText) {
    try {
      if (!('speechSynthesis' in window)) {
        showToast('Trình duyệt không hỗ trợ đọc tiếng.');
        return;
      }
      const text = onlyHan(rawText);
      if (!text) return;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'zh-CN';
      if (zhVoice) utterance.voice = zhVoice;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    } catch (error) {
      console.warn('TTS error', error);
    }
  }

  function isRecorderSupported() {
    return 'MediaRecorder' in window && navigator.mediaDevices;
  }

  async function startRecording() {
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

  async function stopRecording() {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      mediaRecorder.stop();
      showToast('Đã lưu đoạn ghi âm.');
    }
  }

  function playbackRecording() {
    if (!playbackUrl) {
      showToast('Chưa có đoạn ghi âm.');
      return;
    }
    const audio = new Audio(playbackUrl);
    audio.play();
  }

  Object.assign(HB, {
    speakHan,
    isRecorderSupported,
    startRecording,
    stopRecording,
    playbackRecording,
  });
})(window);
