import React, { useRef, useCallback, useEffect } from 'react';
import Webcam from 'react-webcam';
import jsQR from 'jsqr';

const QRCodeScanner = ({ onScan, onError }) => {
  const webcamRef = useRef(null);

  const capture = useCallback(() => {
    if (webcamRef.current) {
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
            onScan(code.data); // Trigger the onScan callback with QR code data
          }
        };
      }
    }
  }, [onScan]);

  useEffect(() => {
    const intervalId = setInterval(capture, 1000); // Capture frame every second

    return () => clearInterval(intervalId); // Clean up interval on component unmount
  }, [capture]);

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
      {/* Removed the scanning button */}
    </div>
  );
};

export default QRCodeScanner;
