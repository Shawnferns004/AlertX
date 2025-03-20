import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { AlertTriangle, Camera, Upload, X, MapPin, FileText, Send } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const defaultLocation = { lat: 37.7749, lng: -122.4194 };

const ReportForm = () => {
  const [report, setReport] = useState({
    description: "",
    location: defaultLocation,
    locationName: "",
    image: null,
  });
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const [showCamera, setShowCamera] = useState(false);
  const [stream, setStream] = useState(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(true);
  const locationUpdateTimeoutRef = useRef(null);

  const updateLocationName = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`
      );
      const locationName = response.data.display_name;
      
      setReport(prev => ({
        ...prev,
        location: { lat: latitude, lng: longitude },
        locationName: locationName
      }));
    } catch (error) {
      setReport(prev => ({
        ...prev,
        location: { lat: latitude, lng: longitude },
        locationName: `Location (${latitude.toFixed(6)}, ${longitude.toFixed(6)})`
      }));
    }
  };

  const getCurrentLocation = async () => {
    setIsLoadingLocation(true);
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        });
      });

      const { latitude, longitude } = position.coords;
      await updateLocationName(latitude, longitude);
    } catch (error) {
      toast.error("Could not get your location. Please check your permissions.");
      console.error("Error getting location:", error);
    } finally {
      setIsLoadingLocation(false);
    }
  };

  useEffect(() => {
    getCurrentLocation();
    
    const watchId = navigator.geolocation.watchPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        if (locationUpdateTimeoutRef.current) {
          clearTimeout(locationUpdateTimeoutRef.current);
        }

        setReport(prev => ({
          ...prev,
          location: { lat: latitude, lng: longitude }
        }));

        locationUpdateTimeoutRef.current = setTimeout(() => {
          updateLocationName(latitude, longitude);
        }, 2000);
      },
      (error) => {
        console.error("Error watching location:", error);
        toast.error("Location tracking error. Please check your permissions.");
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
      if (locationUpdateTimeoutRef.current) {
        clearTimeout(locationUpdateTimeoutRef.current);
      }
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!report.image) {
      toast.error("Please upload or capture an image before submitting");
      return;
    }

    try {
      const data = new FormData();
      data.append("description", report.description);
      data.append("location", JSON.stringify(report.location));
      data.append("locationName", report.locationName);
      if (report.image) {
        data.append("image", report.image);
      }
  
      await axios.post("http://localhost:3000/api/report", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setReport({
        description: "",
        location: defaultLocation,
        locationName: "",
        image: null,
      });
      setPreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      toast.success("Report submitted successfully!");
      
      getCurrentLocation();
    } catch (error) {
      toast.error("Error submitting report");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setReport(prev => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setShowCamera(true);
    } catch (err) {
      console.error("Error accessing camera:", err);
      toast.error("Unable to access camera. Please check your permissions.");
    }
  };

  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0);
    
    canvas.toBlob((blob) => {
      const file = new File([blob], "captured-photo.jpg", { type: "image/jpeg" });
      setReport(prev => ({ ...prev, image: file }));
      setPreview(canvas.toDataURL('image/jpeg'));
      stopCamera();
    }, 'image/jpeg');
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setShowCamera(false);
  };

  const removeImage = () => {
    setReport(prev => ({ ...prev, image: null }));
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="bg-gradient-to-br from-red-50 min-h-screen to-gray-50 via-white">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="lg:px-8 max-w-4xl mx-auto px-4 py-12 sm:px-6">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="bg-red-100 justify-center p-2 rounded-full inline-flex items-center mb-4">
            <AlertTriangle className="h-8 text-red-600 w-8" />
          </div>
          <h1 className="text-3xl text-gray-900 font-bold mb-2">Emergency Report Center</h1>
          <p className="text-gray-600">Quick and accurate emergency reporting system</p>
        </div>

        <div className="space-y-6">
          {/* Location Badge */}
          <div className="bg-white border border-gray-100 p-4 rounded-xl shadow-sm">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <MapPin className="h-5 text-red-500 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-gray-900 text-sm font-medium truncate">
                    {isLoadingLocation ? "Getting location..." : "Current Location"}
                  </p>
                  <p className="text-gray-500 text-sm truncate">
                    {isLoadingLocation ? (
                      <span className="flex items-center">
                        <span className="animate-pulse">Detecting your location...</span>
                      </span>
                    ) : (
                      report.locationName || "Location not available"
                    )}
                  </p>
                </div>
              </div>
              <button
                onClick={getCurrentLocation}
                className="bg-red-50 border border-red-200 rounded-full text-red-600 text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 font-medium hover:bg-red-100 inline-flex items-center px-3 py-1"
              >
                Update
              </button>
            </div>
          </div>

          {/* Main Form Card */}
          <div className="bg-white border border-gray-100 rounded-2xl shadow-lg overflow-hidden">
            {/* Image Upload Section */}
            <div className="border-b border-gray-100 p-6">
              <div className="flex gap-2 items-center mb-4">
                <Camera className="h-5 text-red-500 w-5" />
                <h2 className="text-gray-900 text-lg font-semibold">Visual Evidence</h2>
              </div>

              {showCamera ? (
                <div className="border border-gray-200 rounded-lg overflow-hidden relative">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className="h-[300px] w-full object-cover"
                  />
                  <div className="flex justify-center absolute bottom-4 gap-3 left-0 right-0">
                    <button
                      type="button"
                      onClick={capturePhoto}
                      className="bg-red-600 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 font-medium hover:bg-red-700 px-4 py-2"
                    >
                      Capture Photo
                    </button>
                    <button
                      type="button"
                      onClick={stopCamera}
                      className="bg-gray-600 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 font-medium hover:bg-gray-700 px-4 py-2"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : preview ? (
                <div className="space-y-4">
                  <div className="rounded-lg overflow-hidden relative">
                    <img
                      src={preview}
                      alt="Preview"
                      className="h-[200px] w-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="bg-red-600 p-1.5 rounded-full text-white absolute hover:bg-red-700 right-2 top-2 transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-2">
                      <label className="flex flex-col bg-gray-50 border-2 border-dashed border-gray-300 h-32 justify-center rounded-lg cursor-pointer hover:bg-gray-100 items-center transition-all">
                        <div className="flex flex-col justify-center items-center pb-6 pt-5">
                          <Upload className="h-8 text-gray-400 w-8 mb-2" />
                          <p className="text-gray-500 text-sm">Click to upload</p>
                        </div>
                        <input
                          ref={fileInputRef}
                          type="file"
                          className="hidden"
                          onChange={handleImageChange}
                          accept="image/*"
                        />
                      </label>
                    </div>
                    <button
                      type="button"
                      onClick={startCamera}
                      className="flex flex-col bg-gray-50 border-2 border-gray-300 h-32 justify-center rounded-lg hover:bg-gray-100 items-center transition-all"
                    >
                      <Camera className="h-8 text-gray-400 w-8 mb-2" />
                      <p className="text-gray-500 text-sm">Use Camera</p>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Description Section */}
            <div className="p-6">
              <div className="flex gap-2 items-center mb-4">
                <FileText className="h-5 text-red-500 w-5" />
                <h2 className="text-gray-900 text-lg font-semibold">Emergency Details</h2>
              </div>
              <textarea
                value={report.description}
                onChange={(e) => setReport({ ...report, description: e.target.value })}
                placeholder="Describe the emergency situation in detail..."
                required
                className="border border-gray-200 rounded-lg w-full focus:border-transparent focus:ring-2 focus:ring-red-500 min-h-[150px] px-4 py-3 resize-none transition-all"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="flex bg-red-600 justify-center rounded-xl shadow-lg text-white w-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 font-medium gap-2 hover:bg-red-700 items-center py-4 transition-all"
          >
            <Send className="h-5 w-5" />
            Submit Emergency Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportForm;