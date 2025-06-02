## setup

pip freeze > requirements.txt
pip install -r requirements.txt


### s3
```
aws s3 mb s3://nw-hack-2025-state --region=eu-central-1

aws s3api put-bucket-tagging \
    --bucket nw-hack-2025-state \
    --region=eu-central-1 \
    --tagging '{"TagSet": [{"Key": "nw:project", "Value": "hack-2025"}, {"Key": "created", "Value": "cli"}, {"Key": "by", "Value": "Dominik Pfefferle"}]}'
```

### secrets

```
aws secretsmanager create-secret --name nw-hack-2025 --region eu-central-1

#{
#    "ARN": "arn:aws:secretsmanager:eu-central-1:302263074063:secret:nw-hack-2025-WYq3l9",
#    "Name": "nw-hack-2025"
#}

aws secretsmanager tag-resource --secret-id arn:aws:secretsmanager:eu-central-1:302263074063:secret:nw-hack-2025-WYq3l9 \
--region eu-central-1 \
--tags Key=nw:project,Value=hack-2025 Key=created,Value=cli "Key=by,Value=Dominik Pfefferle"

```

### lambda
```
aws ecr create-repository --repository-name new-business/nw-hack-2025-backend \
--region eu-central-1 \
--tags Key=nw:project,Value=hack-2025 Key=created,Value=cli "Key=by,Value=Dominik Pfefferle"

aws ecr get-login-password --region eu-central-1 | docker login --username AWS --password-stdin 302263074063.dkr.ecr.eu-central-1.amazonaws.com
docker buildx build --platform linux/amd64 --provenance=false -t 302263074063.dkr.ecr.eu-central-1.amazonaws.com/new-business/nw-hack-2025-backend:1 .
docker push 302263074063.dkr.ecr.eu-central-1.amazonaws.com/new-business/nw-hack-2025-backend:1

aws iam create-role --role-name nw-hack-2025-backend --assume-role-policy-document file://iac/lambda-role.json --tags Key=nw:project,Value=hack-2025 Key=created,Value=cli "Key=by,Value=Dominik Pfefferle" --region eu-central-1
aws iam put-role-policy \
    --role-name nw-hack-2025-backend \
    --policy-name nw-hack-2025-backend \
    --policy-document file://iac/lambda-role-rights.json
    
aws lambda create-function \
--function-name nw-hack-2025-backend \
--code ImageUri=302263074063.dkr.ecr.eu-central-1.amazonaws.com/new-business/nw-hack-2025-backend:1 \
--package-type Image \
--timeout 900 \
--role arn:aws:iam::302263074063:role/nw-hack-2025-backend \
--tags nw:project=hack-2025,created=cli,by="Dominik Pfefferle" \
--region eu-central-1
    
aws lambda update-function-configuration \
    --function-name nw-hack-2025-backend \
    --environment "Variables={S3_BUCKET_NAME=nw-hack-2025-state}" \
    --region eu-central-1
    
aws logs create-log-group \
    --log-group-name /aws/lambda/nw-hack-2025-backend \
    --tags nw:project=hack-2025,created=cli,by="Dominik Pfefferle" \
    --region eu-central-1
aws logs put-retention-policy \
    --log-group-name /aws/lambda/nw-hack-2025-backend \
    --retention-in-days 7 \
    --region eu-central-1
```

### API-GW
```
aws apigateway create-rest-api \
    --name "NwHack2025Backend" \
    --description "API Gateway for Lambda Function nw-hack-2025-backend" \
    --tags nw:project=hack-2025,created=cli,by="Dominik Pfefferle" \
    --region eu-central-1

# "id": "crl7n22bp5",

aws apigateway get-resources \
    --rest-api-id crl7n22bp5 \
    --region eu-central-1
    
#            "id": "00w12ww5i3",
#            "path": "/"


aws apigateway create-resource \
    --rest-api-id crl7n22bp5 \
    --parent-id 00w12ww5i3 \
    --path-part "api" \
    --region eu-central-1
    
#{
#    "id": "diiark",
#    "parentId": "00w12ww5i3",
#    "pathPart": "api",
#    "path": "/api"
#}

aws apigateway create-resource \
    --rest-api-id crl7n22bp5 \
    --parent-id diiark \
    --path-part "{proxy+}" \
    --region eu-central-1
    
#{
#    "id": "hmg2gx",
#    "parentId": "diiark",
#    "pathPart": "{proxy+}",
#    "path": "/api/{proxy+}"
#}




aws apigateway put-method \
    --rest-api-id crl7n22bp5 \
    --resource-id hmg2gx \
    --http-method POST \
    --authorization-type "NONE" \
    --region eu-central-1
    
aws lambda get-function \
    --function-name nw-hack-2025-backend \
    --region eu-central-1 \
    --query 'Configuration.FunctionArn' --output text

# arn:aws:lambda:eu-central-1:302263074063:function:nw-hack-2025-backend

aws apigateway put-integration \
    --rest-api-id crl7n22bp5 \
    --resource-id hmg2gx \
    --http-method POST \
    --type AWS_PROXY \
    --integration-http-method POST \
    --uri "arn:aws:apigateway:eu-central-1:lambda:path/2015-03-31/functions/arn:aws:lambda:eu-central-1:302263074063:function:nw-hack-2025-backend/invocations" \
    --region eu-central-1

# arn:aws:execute-api:<region>:<account-id>:<api-id>/*/*
# => arn:aws:execute-api:eu-central-1:302263074063:crl7n22bp5/*/*

aws lambda add-permission \
    --function-name nw-hack-2025-backend \
    --statement-id "APIGatewayInvokePermission" \
    --action "lambda:InvokeFunction" \
    --principal "apigateway.amazonaws.com" \
    --source-arn "arn:aws:execute-api:eu-central-1:302263074063:crl7n22bp5/*/*" \
    --region eu-central-1
    
aws apigateway create-deployment \
    --rest-api-id crl7n22bp5 \
    --stage-name dev \
    --description "proxy path" \
    --region eu-central-1


curl -X POST --location 'https://crl7n22bp5.execute-api.eu-central-1.amazonaws.com/dev/api/test' \
--header 'Content-Type: application/json'

```


### dynamo
```
aws dynamodb create-table \
--attribute-definitions AttributeName=uid,AttributeType=S \
--table-name nw-hack-2025-user \
--key-schema AttributeName=uid,KeyType=HASH \
--billing-mode PAY_PER_REQUEST \
--region eu-central-1

#        "TableArn": "arn:aws:dynamodb:eu-central-1:302263074063:table/nw-hack-2025-user",
#        "TableId": "b0f7ba77-39ff-4d4d-a7c8-924dcbc7b56e",



aws dynamodb tag-resource --resource-arn arn:aws:dynamodb:eu-central-1:302263074063:table/nw-hack-2025-user \
--region eu-central-1 \
--tags Key=nw:project,Value=hack-2025 Key=created,Value=cli "Key=by,Value=Dominik Pfefferle"
```