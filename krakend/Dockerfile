FROM devopsfaith/krakend:2.6

# Copy the configuration file
COPY ./config/krakend.json /etc/krakend/krakend.json

# Set a specific working directory to avoid conflicts
WORKDIR /app

# Use exec form to prevent shell interpolation
CMD ["/usr/bin/krakend", "run", "-c", "/etc/krakend/krakend.json"]