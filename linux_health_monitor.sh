#!/bin/bash

# Script to monitor the health of a Linux system

# Function to check CPU usage
check_cpu() {
    echo "CPU Usage:" 
    echo "$(top -bn1 | grep '%Cpu(s)' | sed "s/.*, *\\\([0-9.]*\\\) id.*/\\\1/")% idle"
}

# Function to check memory usage
check_memory() {
    echo "Memory Usage:"
    free -h
}

# Function to check disk usage
check_disk() {
    echo "Disk Usage:"
    df -h
}

# Function to check network health
check_network() {
    echo "Network Status:"
    ip addr show | grep 'state UP'
}

# Function to check specific services
check_services() {
    echo "Service Status:"
    systemctl --type=service --state=running
}

# Main function to call health checks
main() {
    echo "--- Linux Health Monitor ---"
    echo "Current Date and Time: $(date)"
    check_cpu
    check_memory
    check_disk
    check_network
    check_services
}

# Execute the main function
main
