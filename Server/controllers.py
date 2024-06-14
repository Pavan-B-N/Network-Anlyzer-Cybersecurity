import nmap
import requests
import ipaddress
import socket
from flask import jsonify

def get_public_ip():
    try:
        # Use an external service to get the public IP address
        response = requests.get('https://api.ipify.org?format=json')
        response.raise_for_status()
        ip_data = response.json()
        return ip_data['ip']
    except requests.RequestException as e:
        print(f"Error obtaining public IP address: {e}")
        return None

def get_private_ip():
    hostname=socket.gethostname()
    return socket.gethostbyname(hostname)
    
def get_host_name():
    return socket.gethostname()

def get_ip_details():
    try:
        hostname = get_host_name()
        private_ip = get_private_ip()
        public_ip = get_public_ip()
        
        return jsonify({
            "hostname": hostname,
            "private_ip": private_ip,
            "public_ip": public_ip
        })
    except socket.gaierror as e:
        return jsonify({"error": f"Error obtaining IP address: {e}"}), 500

def scan_network(network_range):
    # Initialize the Nmap PortScanner
    nm = nmap.PortScanner()

    # Perform the scan
    # -sn: This option tells Nmap to perform a ping scan.
    #  ping scan is used to determine which hosts are online without performing a full port scan.
    # It sends ICMP echo requests (ping) to the target hosts and waits for replies to determine which hosts are alive.|
    nm.scan(hosts=network_range, arguments='-sn')
    devices = []
    for host in nm.all_hosts():
        if 'mac' in nm[host]['addresses']:
            # print(f"device : {nm[host]} \n\n")
            devices.append({
                'hostnames':nm[host]['hostnames'],
                'ip': nm[host]['addresses']['ipv4'],
                'mac': nm[host]['addresses']['mac'],
                'vendor':nm[host]['vendor'],
                'status':nm[host]['status']
            })
    
    # print(devices)
    return devices

def listAllNodes():
    # Calculate the network range
    local_ip=get_private_ip()
    local_ip_network = ipaddress.IPv4Network(f"{local_ip}/24", strict=False)
    network_range = f"{local_ip_network.network_address}/{local_ip_network.prefixlen}"
    # Call the function to scan the network
    devices = scan_network(network_range)
    return devices

# PS C:\Users\LOKESH\Desktop\TEMP> python .\listNodes.py
# Local IP address: 192.168.0.147
# Scanning network range: 192.168.0.0/24

# Devices on the network:
# IP Address              MAC Address
# -----------------------------------------
# 192.168.0.1             E0:1C:FC:E7:CF:F6
# 192.168.0.119           48:95:07:79:CE:73

def ScanTarget(target):
    # Initialize the PortScanner
    nm = nmap.PortScanner()
    
    # Perform the scan with default options
    nm.scan(target)
    
    # Print scan info
    print("Nmap scan summary:")
    print("Hosts up:", nm.all_hosts())
    print("------------------------")
    
    result=[]
    services=[]
    # Iterate over all hosts and the services on each
    for host in nm.all_hosts():
        state=nm[host].state()
        
        for proto in nm[host].all_protocols():
            lport = nm[host][proto].keys()
            sorted_lport = sorted(lport)
            for port in sorted_lport:
                services.append({"port":port,"state":nm[host][proto][port]['state'],"service":nm[host][proto][port]['name']})
                # print("Port:", port, "\tState:", nm[host][proto][port]['state'], "\tService:", nm[host][proto][port]['name'])
    result.append({"host":host,"state":state,"services":services})
    return result

# target="192.168.0.147"  # mysystem
# Nmap scan summary:
# Hosts up: ['192.168.0.147']
# ------------------------
# Host: 192.168.0.147
# State: up
# ------------------------
# Protocol: tcp
# Port: 135       State: open     Service: msrpc
# Port: 139       State: open     Service: netbios-ssn
# Port: 445       State: open     Service: microsoft-ds
# Port: 902       State: open     Service: vmware-auth
# Port: 912       State: open     Service: vmware-auth
# Port: 3306      State: open     Service: mysql

# PS C:\Users\LOKESH\Desktop\TEMP> python .\ScanTarget.py
# Nmap scan summary:
# Hosts up: []
# ------------------------