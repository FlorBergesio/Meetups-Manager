import { MongoClient } from 'mongodb';

const mongodb_connection_string = 'mongodb://user_meetups_course:user_meetups_course_password@cluster0-shard-00-00.j3c7p.mongodb.net:27017,cluster0-shard-00-01.j3c7p.mongodb.net:27017,cluster0-shard-00-02.j3c7p.mongodb.net:27017/meetups?ssl=true&replicaSet=atlas-3rhyxh-shard-0&authSource=admin&retryWrites=true&w=majority';

class DatabaseConnection {
  static instance = new DatabaseConnection();

  startConnection = async () => {
    try {

      const client = await MongoClient.connect( mongodb_connection_string );
      const db = client.db();
      const meetupsCollection = db.collection('meetups');
      return { meetupsCollection, client };

    } catch ( err ) {
        console.log( "Error", err )
        throw Error( err );
    }
  }

  endConnection = async ( client ) => {
    client.close();
  }
}

export default DatabaseConnection;
