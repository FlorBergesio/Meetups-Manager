import { MongoClient } from 'mongodb';

const mongodb_connection_string = `mongodb://${ process.env.DB_USER }:${ process.env.DB_PASS }@cluster0-shard-00-00.j3c7p.mongodb.net:27017,cluster0-shard-00-01.j3c7p.mongodb.net:27017,cluster0-shard-00-02.j3c7p.mongodb.net:27017/${ process.env.DB_NAME }?ssl=true&replicaSet=atlas-3rhyxh-shard-0&authSource=admin&retryWrites=true&w=majority`;

class DatabaseConnection {
  static instance = new DatabaseConnection();

  startConnection = async () => {
    try {

      const client = await MongoClient.connect( mongodb_connection_string );
      const db = client.db();
      const meetupsCollection = db.collection( process.env.DB_COLLECTION_NAME );
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
