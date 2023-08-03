# Use a Python base image
FROM python:3.11

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Create and set the working directory
WORKDIR /vidroo_app

# Install dependencies
COPY requirements.txt /vidroo_app/
RUN pip install -r requirements.txt

# Copy the Vidroo application code into the container
COPY vidroo_app/ /vidroo_app/

# Expose the port on which the Vidroo application will run (change this if needed)
EXPOSE 8000

# Run the Vidroo application
CMD ["python", "manage.py", "runserver", "0.0.0.0:80"]
