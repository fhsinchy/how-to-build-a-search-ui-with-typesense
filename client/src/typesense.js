import { Client } from 'typesense';

const client = new Client({
    'nodes': [{
      'host': 'localhost',
      'port': '8108',
      'protocol': 'http'
    }],
    'apiKey': 'vaqcyr27eJ',
    'connectionTimeoutSeconds': 2
  })

export default client;