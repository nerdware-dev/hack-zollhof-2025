import json
import os

from dotenv import load_dotenv

from User import user_from_dict
from dynamo import UserTable
from ki import Ki


if os.path.exists(f"./.env"):
    load_dotenv(dotenv_path="./.env", override=True)

TABLE = "nw-hack-2025-user"
USER_ID = 'user_12345'

def lambda_handler(event, context):
    try:
        print(event)
        if event['httpMethod'] == 'OPTIONS':
            return {
                'statusCode': 204,
                'headers': {
                    "Access-Control-Allow-Headers": "Content-Type",
                    'Access-Control-Allow-Origin': '*',
                    "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
                }
            }
        path = event['path']
        path_parts = path.strip(" /").split('/')
        ki = Ki()
        if path.endswith('/test'):

            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({
                    'message': 'OK!',
                    'path': path
                })
            }
        elif path.endswith('/agent'):
            body = json.loads(event['body'])
            question = body.get('question')
            answer = ki.ask_question(question)
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({
                    'message': answer,
                    'path': path
                })
            }
        elif path.endswith('/interview-talk'):
            body = json.loads(event['body'])
            question = body.get('question')
            answer = ki.chat_mistral(question)
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({
                    'message': answer,
                    'path': path
                })
            }
        elif path.endswith('/interview-end'):
            answer = ki.end_interview()
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({
                    'message': answer,
                    'path': path
                })
            }
        elif path.endswith('/chat'):
            body = json.loads(event['body'])
            question = body.get('question')
            answer = ki.chat_with_user_data(question)
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({
                    'message': answer,
                    'path': path
                })
            }
        elif path.endswith('/register'):
            body = json.loads(event['body'])
            new_user = user_from_dict(body)
            db = UserTable(TABLE)
            db.put_item(USER_ID, new_user)
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
                },
                'body': USER_ID
            }
        elif path.endswith('/summarize'):
            ki.summarize_interview()
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            }
        elif path.endswith('/programs'):
            answer = ki.get_programs_via_ai()
            formatted = ki.format_programs(answer)
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
                'body': formatted
            }
        elif path.endswith('/events'):
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            }
        else:
            return {
                'statusCode': 404,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({
                    'message': 'unknown path!'
                })
            }

    except json.JSONDecodeError:
        return {
            'statusCode': 400,
            'headers': {
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'message': 'Invalid JSON in request body.'})
        }
    except Exception as e:
        print(f"Error generating pre-signed URL: {e}")
        return {
            'statusCode': 500,
            'headers': {
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'message': f'Server error: {str(e)}'})
        }
