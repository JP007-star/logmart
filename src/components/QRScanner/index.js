import React, { useRef, useCallback, useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import jsQR from 'jsqr';

// Utility function to detect mobile devices

const QRCodeScanner = ({ onScan, onError }) => {
  const webcamRef = useRef(null);
  const [devices, setDevices] = useState([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState('');

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

  useEffect(() => {
    const getDevices = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(device => device.kind === 'videoinput');
        setDevices(videoDevices);

        if (videoDevices.length > 0) {
          // If on mobile, prefer the back camera
          const backCamera = videoDevices.find(device => device.label.toLowerCase().includes('back'));
          setSelectedDeviceId(backCamera ? backCamera.deviceId : videoDevices[0].deviceId);
        }
      } catch (error) {
        onError && onError(error);
      }
    };
    getDevices();
  }, [onError]);

  const handleDeviceChange = (event) => {
    setSelectedDeviceId(event.target.value);
  };

  const videoConstraints = {
    deviceId: selectedDeviceId ? { exact: selectedDeviceId } : undefined,
    width: 500,
    height: 500,
    aspectRatio: 1,
  };

  return (
    <div className="qr-scanner-container">
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
        style={{ width: '100%', height: '30vh', objectFit: 'cover' }}
        className="webcam"
      />
      <select className='form-control' onChange={handleDeviceChange} value={selectedDeviceId}>
        {devices.map((device, index) => (
          <option key={index} value={device.deviceId}>
            {device.label || `Camera ${index + 1}`}
          </option>
        ))}
      </select>
    </div>
  );
};

export default QRCodeScanner;
