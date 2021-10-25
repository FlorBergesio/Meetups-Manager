import { MongoClient, ObjectId } from 'mongodb';

import MeetupDetail from "../../components/meetups/MeetupDetail";

const MeetupDetails = ( props ) => {
  return (
    <MeetupDetail 
      image={props.meetupData.image}
      title={props.meetupData.title}
      address={props.meetupData.address}
      description={props.meetupData.description}
    />
  );
}

export async function getStaticPaths() {
  const mongodb_connection_string = 'mongodb://user_meetups_course:user_meetups_course_password@cluster0-shard-00-00.j3c7p.mongodb.net:27017,cluster0-shard-00-01.j3c7p.mongodb.net:27017,cluster0-shard-00-02.j3c7p.mongodb.net:27017/meetups?ssl=true&replicaSet=atlas-3rhyxh-shard-0&authSource=admin&retryWrites=true&w=majority';
  const client = await MongoClient.connect( mongodb_connection_string );
  const db = client.db();
  const meetupsCollection = db.collection('meetups');

  const meetups = await meetupsCollection.find( {/* filter criteria */}, { _id: 1 }).toArray();

  client.close();

  return {
    fallback: false,
    paths: meetups.map( meetup => ({
      params: {
        meetupId: meetup._id.toString()
      }
    }) )
  }
}

export async function getStaticProps( context ) {
  const meetupId = context.params.meetupId;

  const mongodb_connection_string = 'mongodb://user_meetups_course:user_meetups_course_password@cluster0-shard-00-00.j3c7p.mongodb.net:27017,cluster0-shard-00-01.j3c7p.mongodb.net:27017,cluster0-shard-00-02.j3c7p.mongodb.net:27017/meetups?ssl=true&replicaSet=atlas-3rhyxh-shard-0&authSource=admin&retryWrites=true&w=majority';
  const client = await MongoClient.connect( mongodb_connection_string );
  const db = client.db();
  const meetupsCollection = db.collection('meetups');

  const selectedMeetup = await meetupsCollection.findOne({
    _id: ObjectId(meetupId),
  });

  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      },
    }
  };
}

export default MeetupDetails;
