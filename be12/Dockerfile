FROM public.ecr.aws/lambda/python:3.12
#FROM public.ecr.aws/lambda/python:3.10

# Copy requirements.txt
COPY requirements.txt ${LAMBDA_TASK_ROOT}
COPY readme.md ${LAMBDA_TASK_ROOT}

# Install the specified packages
RUN pip install -r requirements.txt

# Copy function code
COPY lambda-function.py ${LAMBDA_TASK_ROOT}
COPY secrets.py ${LAMBDA_TASK_ROOT}
COPY ki.py ${LAMBDA_TASK_ROOT}
COPY dynamo.py ${LAMBDA_TASK_ROOT}


# Set the CMD to your handler (could also be done as a parameter override outside of the Dockerfile)
#CMD [ "lambda_function.lambda_handler" ]
CMD [ "lambda-function.lambda_handler" ]