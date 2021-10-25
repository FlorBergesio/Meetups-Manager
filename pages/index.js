import { MongoClient } from 'mongodb';

import MeetupList from '../components/meetups/MeetupList';

const HomePage = ( props ) => {
  return (
    <MeetupList meetups={ props.meetups } />
  );
};

export async function getStaticProps() {
  const mongodb_connection_string = 'mongodb://user_meetups_course:user_meetups_course_password@cluster0-shard-00-00.j3c7p.mongodb.net:27017,cluster0-shard-00-01.j3c7p.mongodb.net:27017,cluster0-shard-00-02.j3c7p.mongodb.net:27017/meetups?ssl=true&replicaSet=atlas-3rhyxh-shard-0&authSource=admin&retryWrites=true&w=majority';
  const client = await MongoClient.connect( mongodb_connection_string );
  const db = client.db();
  const meetupsCollection = db.collection('meetups');

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map( meetup => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString()
      }))
    },
    revalidate: 3600
  };
}

export default HomePage;