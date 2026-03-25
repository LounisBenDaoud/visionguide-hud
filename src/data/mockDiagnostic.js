export async function fetchMockDiagnostic() {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  const response = await fetch('/mock_response.json');
  return response.json();
}

// Alternative inline mock for reliability
export const FALLBACK_MOCK = {
  faultType: "MOTOR OVERHEATING",
  severity: 65,
  confidence: 89,
  steps: [
    "Check cooling fan operation",
    "Clean ventilation ports",
    "Verify ambient temperature",
    "Consider thermal paste reapplication"
  ],
  bounds: { x: 40, y: 30, width: 25, height: 30 },
  thermalHotspot: { x: 52, y: 45, radius: 15 }
};
