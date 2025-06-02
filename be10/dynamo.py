import boto3
from botocore.config import Config
import os
import json
from dotenv import load_dotenv


class User:
    def __init__(self):
        if os.path.exists(f"./.env"):
            load_dotenv(dotenv_path="./.env", override=True)
        self.client = boto3.client('dynamodb', config=Config(region_name='eu-central-1'))

    def put_item(self, uid: str, data: dict) -> None:
        response = self.client.put_item(
            Item={
                'uid': {
                    'S': 'a3cd0312-dfa4-42a7-806e-9164b5b9215c',
                },
                'data': {'M': data}
            },
            ReturnConsumedCapacity='TOTAL',
            TableName='nw-hack-2025-user',
        )
        print(response)


    def get_item(self, uid: str) -> dict:
        response = self.client.get_item(
            Key={
                'uid': {
                    'S': uid,
                },
            },
            TableName='nw-hack-2025-user',
        )

        print(response)
        return response

#user = User()
#user.put_item('a3cd0312-dfa4-42a7-806e-9164b5b9215c',{"chat": {"L": [
#    {"M": {"p": {"S": "Hallo"}, "a": {"S": "Auch hallo"}}}
#]}})
