import { useRef, useState } from 'react';

const useMediaRecorder = () => {
  const [
    mediaBlob,
    setMediaBlob
  ] = useState<Blob>(new Blob([],{ type: 'audio/wav'}));

  const mediaStream = useRef<MediaStream>();
  const mediaRecorder = useRef<MediaRecorder>();
  const mediaBlobs = useRef<Blob[]>([]);

  const startRecord = async () => {
    mediaStream.current = await navigator.mediaDevices.getUserMedia(
      { audio: true, video: false }
    );
    mediaRecorder.current = new MediaRecorder(mediaStream.current);

    mediaRecorder.current.ondataavailable = (blobEvent) => {
      mediaBlobs.current.push(blobEvent.data);
    };
    mediaRecorder.current.onstop = () => {
      const blob = new Blob(mediaBlobs.current, { type: 'audio/wav' });
      setMediaBlob(blob);
    };

    mediaRecorder.current?.start();
  };
  const stopRecord = async () => {
    mediaRecorder.current?.stop();
    mediaStream.current?.getTracks().forEach((track) => track.stop());
    mediaBlobs.current = [];
  };

  return {
    mediaBlob,
    startRecord,
    stopRecord,
  };
};

export default useMediaRecorder;