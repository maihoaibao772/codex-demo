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
  (function () {
    if (typeof window.speechSynthesis === 'undefined') {
      global.speakHan = function () {};
      return;
    }
    let zhVoice = null;

    function pickZhVoice() {
      const vs = window.speechSynthesis.getVoices() || [];
      zhVoice =
        vs.find((v) => /^(zh|cmn)/i.test(v.lang)) ||
        vs.find((v) => /chinese/i.test(v.name + v.lang)) ||
        null;
    }
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = pickZhVoice;
    }
    pickZhVoice();

    function onlyHan(str) {
      const m = (str || '').match(/[\u3400-\u9FFF\uF900-\uFAFF]+/g);
      return m ? m.join('') : '';
    }

    window.speakHan = function (raw) {
      try {
        const text = onlyHan(raw);
        if (!text) return;
        const u = new SpeechSynthesisUtterance(text);
        u.lang = 'zh-CN';
        if (zhVoice) u.voice = zhVoice;
        speechSynthesis.cancel();
        speechSynthesis.speak(u);
      } catch (e) {
        console.warn('TTS error', e);
      }
    };

    const btn = document.getElementById('speak');
    if (btn) {
      btn.addEventListener('click', () => {
        const hanEl = document.getElementById('hanText');
        if (hanEl) window.speakHan(hanEl.textContent || '');
      });
    }
  })();

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
    speakHan: global.speakHan,
    isRecorderSupported,
    startRecording,
    stopRecording,
    playbackRecording,
  });
})(window);
