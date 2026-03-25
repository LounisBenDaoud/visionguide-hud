import requests
import base64
import json
import sys

# 1. Path to your test image
IMAGE_PATH = "server_test.jpg"

def test_api():
    # Read and encode the image
    try:
        with open(IMAGE_PATH, "rb") as image_file:
            encoded_string = base64.b64encode(image_file.read()).decode("utf-8")
    except FileNotFoundError:
        print(f"❌ File not found: {IMAGE_PATH}")
        print("   Place a server rack image in the same folder and try again.")
        sys.exit(1)

    # 2. Send to your local FastAPI server
    url = "http://127.0.0.1:8000/analyze"
    payload = {"image_base64": encoded_string}

    print("🧠 Sending image to Brain... (Waiting for results)")

    try:
        response = requests.post(url, json=payload, timeout=60)
    except requests.ConnectionError:
        print("❌ Could not connect. Is the server running?")
        print("   Start it with:  uvicorn main:app --reload")
        sys.exit(1)
    except requests.Timeout:
        print("❌ Request timed out after 60 seconds.")
        sys.exit(1)

    # 3. Print the result
    if response.status_code == 200:
        print("✅ SUCCESS! Here is the diagnostic:")
        print(json.dumps(response.json(), indent=2))
    else:
        print(f"❌ ERROR {response.status_code}:")
        print(response.text)

def test_thermal():
    url = "http://127.0.0.1:8000/thermal-status"
    print("\n🌡️ Fetching thermal data...")
    
    try:
        response = requests.get(url, timeout=10)
    except requests.ConnectionError:
        print("❌ Could not connect. Is the server running?")
        return

    if response.status_code == 200:
        print("✅ Thermal Data:")
        print(json.dumps(response.json(), indent=2))
    else:
        print(f"❌ ERROR {response.status_code}:")
        print(response.text)


if __name__ == "__main__":
    test_api()
    test_thermal()