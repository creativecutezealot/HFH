"use strict";

var _graphqlTag = _interopRequireDefault(require("graphql-tag"));

var graphql = _interopRequireWildcard(require("graphql"));

var _mailchimp_transactional = _interopRequireDefault(require("@mailchimp/mailchimp_transactional"));

var _awsSdk = _interopRequireDefault(require("aws-sdk"));

var _makeRequest = require("/opt/nodejs/makeRequest.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
Use the following code to retrieve configured secrets from SSM:

const aws = require('aws-sdk');

const { Parameters } = await (new aws.SSM())
  .getParameters({
    Names: ["MAILCHIMP_API_KEY"].map(secretName => process.env[secretName]),
    WithDecryption: true,
  })
  .promise();

Parameters will be of the form { Name: 'secretName', Value: 'secretValue', ... }[]
*/
const {
  print
} = graphql;
const getConfigurationSettingByName =
/* GraphQL */
(0, _graphqlTag.default)`
  query GetConfigurationSettingByName(
    $name: String!
    $sortDirection: ModelSortDirection
    $filter: ModelConfigurationSettingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getConfigurationSettingByName(
      name: $name
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        value
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

exports.handler = async event => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  const body = JSON.parse(event.body); // Retrieve the email from the configuration settings.

  const fromEmailAddress = await (0, _makeRequest.makeRequest)(print(getConfigurationSettingByName), 'GetConfigurationSettingByName', {
    name: 'system_email_address'
  });
  const fromEmailAddressToUse = fromEmailAddress.data.getConfigurationSettingByName ? fromEmailAddress.data.getConfigurationSettingByName.items[0].value : 'donotreply@fisherhouse.org';
  let main = '<p style="text-align: left; margin: 0 1em 3em 1em;">';
  let additional = '<p style="text-align: left; margin: 0 1em 3em 1em;">';

  switch (body.completion_type) {
    case 'stayed':
      main += `${body.name} completed the ${body.initial ? 'initial stay' : 'extended stay'} (${body.dates}) without changes.</p>`;
      additional = '';
      break;

    case 'modified':
      main += `${body.name} completed the ${body.initial ? 'initial stay' : 'extended stay'} with changes.</p>`;
      additional += `
                Requested:  ${body.requested_dates}<br>
                Actual: ${body.actual_dates}<br>
                Reason:  ${body.reason.replace(/(?:\r\n|\r|\n)/g, '<br>')}<br>    
            `;
      additional += '</p>';
      break;

    case 'noshow':
      main += `${body.name} completed the ${body.initial ? 'initial stay' : 'extended stay'}. The guest(s) did not stay.</p>`;
      additional += `
                Requested:  ${body.requested_dates}<br>
                Actual: The guest(s) did not stay.<br>
                Reason:  ${body.reason.replace(/(?:\r\n|\r|\n)/g, '<br>')}<br>    
            `;
      additional += '</p>';
      break;

    default:
      break;
  }

  const messageTemplate = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">

        <html xmlns="http://www.w3.org/1999/xhtml">
        <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>Hotels for Heroes Application</title>
        </head>
        
        <body style="text-align: center;">
        
        <table cellpadding="0" cellspacing="0" border="0" align="center" style="text-align: left; margin: 0 auto; max-width: 480px; font-size: 14pt;font-family: sans-serif; color: #333;">
        <tr>
            <td>
            <p style="text-align: left; margin: 4em 1em 1em 1em;">Dear ${body.to},</p>
            ${main}
            ${additional}
            <p style="text-align: left; margin: 0 1em 3em 1em;"><a href="${body.link}">Click here</a> to view this application.</p>
            <p style="text-align: left; margin: 0 1em 3em 1em;">
            Thank you,<br/>
            Hotels for Heroes
            </p>
            </td>
        </tr>
        <tr>
            <td style="text-align: center;">
            <img style="width: 80%; height: auto;" src="https://resources.fisherhouse.org/v1.0.0/images/hfh_email.gif" />
            </td>
        </tr>
        </table>
        
        </body>
        
        </html>
        `;
  var eParams = {
    Destination: {
      ToAddresses: body.email
    },
    Message: {
      Body: {
        Html: {
          Data: messageTemplate
        }
      },
      Subject: {
        Data: (body.initial ? 'Initial Stay' : 'Extended Stay') + ' Completed for ' + body.service_member_name
      }
    },
    Source: fromEmailAddressToUse
  };
  const {
    Parameter
  } = await new _awsSdk.default.SSM().getParameter({
    Name: process.env.MAILCHIMP_API_KEY,
    WithDecryption: true
  }).promise();
  const mailchimpClient = (0, _mailchimp_transactional.default)(Parameter.Value);
  const message = {
    html: eParams.Message.Body.Html.Data,
    subject: eParams.Message.Subject.Data,
    from_email: eParams.Source,
    from_name: 'Hotels for Heroes',
    to: eParams.Destination.ToAddresses.map(item => {
      return {
        email: item
      };
    })
  };
  const res = await mailchimpClient.messages.send({
    message
  });
  console.log('Res is', res);
  return {
    statusCode: 200,
    //  Uncomment below to enable CORS requests
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*'
    },
    body: JSON.stringify('User notified.')
  };
};