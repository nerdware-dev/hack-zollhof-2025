import boto3
from botocore.config import Config as BotoConfig
import os
from dotenv import load_dotenv
from datamodels.User import User
from dacite import from_dict, Config as DaciteConfig
from dataclasses import asdict

dacite_config = DaciteConfig(type_hooks={
    float: float,
    int: int
})

class UserTable:
    def __init__(self, table_name):
        if os.path.exists(f"./.env"):
            load_dotenv(dotenv_path="./.env", override=True)
        dynamodb = boto3.resource('dynamodb', config=BotoConfig(region_name='eu-central-1'))
        self.table = dynamodb.Table(table_name)

    def put_item(self, uid: str, user: User) -> None:
        data = asdict(user)
        item = {
            "uid": uid,
            "data": data
        }
        response = self.table.put_item(
            Item=item,
            ReturnConsumedCapacity='TOTAL'
        )
        print(response)

    def get_item(self, uid: str) -> User:
        response = self.table.get_item(
            Key={
                'uid':  uid,
            }
        )
        print(response)
        data = response['Item']["data"]
        user = from_dict(data_class=User, data=data, config=dacite_config)
        return user

def test():
    user = User()
    user.put_item('a3cd0312-dfa4-42a7-806e-9164b5b9215c',{"chat": {"L": [
        {"M": {"p": {"S": "Hallo"}, "a": {"S": "Auch hallo"}}}
    ]}})

#test()
