// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

/**
 * Analyze an image using the VisionGuide AI backend
 * @param {string} imageBase64 - Base64 encoded image (without data:image prefix)
 * @returns {Promise<Object>} Diagnostic result
 */
export async function analyzeImage(imageBase64) {
  // Remove data URL prefix if present
  const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, '');

  const response = await fetch(`${API_BASE_URL}/analyze`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ image_base64: base64Data }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Unknown error' }));
    throw new Error(error.detail || `API Error: ${response.status}`);
  }

  const data = await response.json();

  // Transform backend response to frontend format
  return transformResponse(data);
}

/**
 * Get thermal status from the backend
 * @returns {Promise<Object>} Thermal data
 */
export async function getThermalStatus() {
  const response = await fetch(`${API_BASE_URL}/thermal-status`);

  if (!response.ok) {
    throw new Error('Failed to fetch thermal status');
  }

  return response.json();
}

/**
 * Transform backend response to frontend expected format
 */
function transformResponse(backendData) {
  // Map severity string to numeric value
  const severityMap = {
    'Critical': 85,
    'Warning': 55,
    'Healthy': 20,
  };

  // Calculate bounds from coordinates (center point -> bounding box)
  const boxSize = 25; // percentage width/height of target box
  const bounds = {
    x: Math.max(0, (backendData.coordinates?.x || 50) - boxSize / 2),
    y: Math.max(0, (backendData.coordinates?.y || 50) - boxSize / 2),
    width: boxSize,
    height: boxSize,
  };

  // Calculate thermal hotspot from coordinates
  const thermalHotspot = {
    x: backendData.coordinates?.x || 50,
    y: backendData.coordinates?.y || 50,
    radius: backendData.severity === 'Critical' ? 20 : 15,
  };

  return {
    model: backendData.model || 'Unknown Model',
    faultType: backendData.fault || 'Unknown Fault',
    severity: severityMap[backendData.severity] || 50,
    severityLevel: backendData.severity || 'Warning',
    confidence: 94, // Backend doesn't provide this, use fixed value
    steps: backendData.steps || ['No repair steps available'],
    bounds,
    thermalHotspot,
    rawResponse: backendData, // Keep original for debugging
  };
}
