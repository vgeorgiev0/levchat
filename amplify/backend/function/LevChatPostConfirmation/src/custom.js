/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
const aws = require("aws-sdk");
const ddb = new aws.DynamoDB();
const tableName = process.env.USERTABLE;

exports.handler = async (event) => {
  if (!event?.request?.userAttributes?.sub) {
    console.log("No sub provided");
    return;
  }
  const now = new Date();
  const timestamp = now.getTime();

  const userItem = {
    __typename: { S: "User" },
    _lastChangedAt: { N: timestamp.toString() },
    _version: { N: "1" },
    updatedAt: { S: now.toISOString() },
    createdAt: { S: now.toISOString() },
    id: { S: event.request.userAttributes.sub },
    name: { S: event.request.userAttributes.email },
  };

  const params = {
    Item: userItem,
    TableName: tableName,
  };
  try {
    await ddb.putItem(params).promise();
    console.log("Success!");
  } catch (error) {
    console.log(error);
  }
};
