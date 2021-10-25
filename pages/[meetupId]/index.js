import DatabaseConnection from '../../libraries/DatabaseConnection';
import { ObjectId } from 'mongodb';

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
  const { meetupsCollection, client } = await DatabaseConnection.instance.startConnection();

  const meetups = await meetupsCollection.find( {/* filter criteria */}, { _id: 1 }).toArray();

  DatabaseConnection.instance.endConnection( client );

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

  const { meetupsCollection, client } = await DatabaseConnection.instance.startConnection();

  const selectedMeetup = await meetupsCollection.findOne({
    _id: ObjectId(meetupId),
  });

  DatabaseConnection.instance.endConnection( client );

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
