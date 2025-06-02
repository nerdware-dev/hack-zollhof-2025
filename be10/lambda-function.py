import json
import os

from dotenv import load_dotenv
from ki import Ki


if os.path.exists(f"./.env"):
    load_dotenv(dotenv_path="./.env", override=True)


def lambda_handler(event, context):
    try:
        print(event)
        path = event['path']
        path_parts = path.strip(" /").split('/')
        if path.endswith('/test'):

            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json'
                },
                'body': json.dumps({
                    'message': 'OK!',
                    'path': path
                })
            }
        elif path.endswith('/chat'):
            body = json.loads(event['body'])
            question = body.get('question')
            ki = Ki()
            answer = ki.ask_question(question)
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json'
                },
                'body': json.dumps({
                    'message': answer,
                    'path': path
                })
            }
        else:
            return {
                'statusCode': 404,
                'headers': {
                    'Content-Type': 'application/json'
                },
                'body': json.dumps({
                    'message': 'unknown path!'
                })
            }

    except json.JSONDecodeError:
        return {
            'statusCode': 400,
            'body': json.dumps({'message': 'Invalid JSON in request body.'})
        }
    except Exception as e:
        print(f"Error generating pre-signed URL: {e}")
        return {
            'statusCode': 500,
            'body': json.dumps({'message': f'Server error: {str(e)}'})
        }
