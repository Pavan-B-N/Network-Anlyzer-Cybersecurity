from flask import Flask, jsonify
from flask_cors import CORS
import nmap
import socket
from controllers import get_ip_details, listAllNodes, ScanTarget, scan_network

app = Flask(__name__)
CORS(app)  # This will enable CORS for all routes

# Example route
@app.route('/')
def root():
    return jsonify({"message": "API Service for Network Analysis"})

@app.route('/ip-details')
def ip_details():
    return get_ip_details()

@app.route('/list-all-devices')
def list_all_devices():
    try:
        devices = listAllNodes()
        return jsonify(devices)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/scan-target/<ip>')
def scan_target(ip):
    return ScanTarget(ip)

@app.route("/host-discovery/<ip>")
def DiscoverHost(ip):
    deviceInfo=scan_network(ip)
    return jsonify(deviceInfo)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)