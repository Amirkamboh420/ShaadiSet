#!/bin/bash
# Watchdog script - restarts dev server if it crashes
cd /home/z/my-project

while true; do
  # Check if server is alive
  if ! curl -s http://localhost:3000/ -o /dev/null -w "%{http_code}" 2>/dev/null | grep -q "200"; then
    echo "$(date) - Server down, restarting..."
    
    # Kill any existing processes
    kill $(ps aux | grep -E "next dev|node.*next" | grep -v grep | awk '{print $2}') 2>/dev/null
    sleep 2
    
    # Check if .next cache exists (avoid recompilation)
    if [ -d ".next" ]; then
      echo "  .next cache exists, using cached compilation"
    else
      echo "  No cache, will compile fresh"
    fi
    
    # Start server with moderate heap
    NODE_OPTIONS="--max-old-space-size=2560" nohup bun run dev > /home/z/my-project/dev.log 2>&1 < /dev/null &
    disown
    
    # Wait for server to be ready
    for i in $(seq 1 30); do
      sleep 2
      if curl -s http://localhost:3000/ -o /dev/null -w "%{http_code}" 2>/dev/null | grep -q "200"; then
        echo "  Server up after $((i*2))s"
        break
      fi
    done
  fi
  
  # Check every 10 seconds
  sleep 10
done
