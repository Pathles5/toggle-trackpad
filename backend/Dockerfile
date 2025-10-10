# Use the official SteamDeckHomebrew base image
FROM ghcr.io/steamdeckhomebrew/holo-base:latest

# Copy backend source code and entrypoint script into the container
COPY src/ /backend/src/
COPY entrypoint.sh /backend/entrypoint.sh

# Ensure the entrypoint script is executable
RUN chmod +x /backend/entrypoint.sh

# Define the container's startup command
ENTRYPOINT [ "/backend/entrypoint.sh" ]
