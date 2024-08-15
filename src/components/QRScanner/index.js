import React, { useRef, useState, useCallback, useEffect } from 'react';
import Webcam from 'react-webcam';
import jsQR from 'jsqr';

const QRCodeScanner = ({ onScan, onError }) => {
  const [scanning, setScanning] = useState(false);
  const webcamRef = useRef(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      const image = new Image();
      image.src = imageSrc;
      image.onload = () => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = image.width;
        canvas.height = image.height;
        context.drawImage(image, 0, 0, image.width, image.height);
        const imageData = context.getImageData(0, 0, image.width, image.height);
        const code = jsQR(imageData.data, image.width, image.height);
        if (code) {
          onScan(code.data);
        }
      };
    }
  }, [onScan]);

  useEffect(() => {
    let intervalId;
    if (scanning) {
      intervalId = setInterval(capture, 1000);
    }
    return () => clearInterval(intervalId);
  }, [scanning, capture]);

  const videoConstraints = {
    facingMode: 'environment', // Use back camera by default
    width: 1280,
    height: 720
  };

  return (
    <div className="qr-scanner-container">
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
        width="100%"
        height="auto" // Adjust height to maintain aspect ratio
        className="webcam"
      />
      <button className="btn btn-primary toggle-scanning-btn" onClick={() => setScanning(!scanning)}>
        {scanning ? 'Stop Scanning' : 'Start Scanning'}
      </button>
    </div>
  );
};

export default QRCodeScanner;
