# Use an official Python runtime as a parent image
FROM python:3.9-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY ./main.py /app
COPY ./.env /app
COPY ./terra_config.ini /app

# Install required system dependencies
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    gdal-bin libgdal-dev python3-gdal && \
    rm -rf /var/lib/apt/lists/*

# Install the Python dependencies
RUN pip install --no-cache-dir \
    numpy \
    rasterio \
    --extra-index-url https://artifactory.vgt.vito.be/artifactory/api/pypi/python-packages/simple terracatalogueclient \
    pyproj \
    python-dotenv