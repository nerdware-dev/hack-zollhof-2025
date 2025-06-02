import boto3
from botocore.config import Config
import os
import json
from dotenv import load_dotenv


def load_secrets():
    if os.path.exists(f"./.env"):
        load_dotenv(dotenv_path="./.env", override=True)

    client = boto3.client('secretsmanager', config=Config(region_name='eu-central-1'))
    response = client.get_secret_value(
        SecretId='arn:aws:secretsmanager:eu-central-1:302263074063:secret:nw-hack-2025-WYq3l9'
    )
    secrets = json.loads(response["SecretString"])
    os.environ['MISTRAL_API_KEY'] = secrets["mistral-key"]
    os.environ['GEMENAI_API_KEY'] = secrets["gemini-key"]

