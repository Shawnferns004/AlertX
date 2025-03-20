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
  
      await axios.post("http://localhost:5000/api/report", data, {
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
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-gray-50">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-2 bg-red-100 rounded-full mb-4">
            <AlertTriangle className="h-8 w-8 text-red-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Emergency Report Center</h1>
          <p className="text-gray-600">Quick and accurate emergency reporting system</p>
        </div>

        <div className="space-y-6">
          {/* Location Badge */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <MapPin className="h-5 w-5 text-red-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {isLoadingLocation ? "Getting location..." : "Current Location"}
                  </p>
                  <p className="text-sm text-gray-500 truncate">
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
                className="inline-flex items-center px-3 py-1 border border-red-200 text-sm font-medium rounded-full text-red-600 bg-red-50 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Update
              </button>
            </div>
          </div>

          {/* Main Form Card */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            {/* Image Upload Section */}
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center gap-2 mb-4">
                <Camera className="h-5 w-5 text-red-500" />
                <h2 className="text-lg font-semibold text-gray-900">Visual Evidence</h2>
              </div>

              {showCamera ? (
                <div className="relative rounded-lg overflow-hidden border border-gray-200">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className="w-full h-[300px] object-cover"
                  />
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3">
                    <button
                      type="button"
                      onClick={capturePhoto}
                      className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    >
                      Capture Photo
                    </button>
                    <button
                      type="button"
                      onClick={stopCamera}
                      className="px-4 py-2 bg-gray-600 text-white text-sm font-medium rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : preview ? (
                <div className="space-y-4">
                  <div className="relative rounded-lg overflow-hidden">
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-full h-[200px] object-cover"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute top-2 right-2 p-1.5 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-2">
                      <label className="flex flex-col items-center justify-center h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-all">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="w-8 h-8 mb-2 text-gray-400" />
                          <p className="text-sm text-gray-500">Click to upload</p>
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
                      className="flex flex-col items-center justify-center h-32 border-2 border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 transition-all"
                    >
                      <Camera className="w-8 h-8 mb-2 text-gray-400" />
                      <p className="text-sm text-gray-500">Use Camera</p>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Description Section */}
            <div className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="h-5 w-5 text-red-500" />
                <h2 className="text-lg font-semibold text-gray-900">Emergency Details</h2>
              </div>
              <textarea
                value={report.description}
                onChange={(e) => setReport({ ...report, description: e.target.value })}
                placeholder="Describe the emergency situation in detail..."
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all min-h-[150px] resize-none"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="w-full bg-red-600 text-white py-4 rounded-xl hover:bg-red-700 transition-all font-medium focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 flex items-center justify-center gap-2 shadow-lg"
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