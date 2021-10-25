// /api/new-meetup
// POST requests

import { MongoClient } from 'mongodb';

const mongodb_connection_string = 'mongodb://user_meetups_course:user_meetups_course_password@cluster0-shard-00-00.j3c7p.mongodb.net:27017,cluster0-shard-00-01.j3c7p.mongodb.net:27017,cluster0-shard-00-02.j3c7p.mongodb.net:27017/meetups?ssl=true&replicaSet=atlas-3rhyxh-shard-0&authSource=admin&retryWrites=true&w=majority';

async function handler( req, res ) {
  if ( req.method === 'POST' ) {
    try {
      const data = req.body;

      const client = await MongoClient.connect( mongodb_connection_string );
      const db = client.db();

      const meetupsCollection = db.collection('meetups');
      const result = await meetupsCollection.insertOne( data );

      client.close();

      res.status(201).json({ 
        status: 201,
        message: "Meetup inserted!" 
      });
    } catch ( error ) {
      res.status(500).json({ 
        status: 500,
        message: "An error occurred!" 
      });
    }
  }
}

export default handler;
