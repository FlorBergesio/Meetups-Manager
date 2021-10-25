import Head from 'next/head';
import DatabaseConnection from '../libraries/DatabaseConnection';

import MeetupList from '../components/meetups/MeetupList';

const HomePage = ( props ) => {
  return (
    <>
      <Head>
        <title>Meetup manager</title>
        <meta 
          name="description" 
          content="Browse all active meetups" 
        />
      </Head>
      <MeetupList meetups={ props.meetups } />
    </>
  );
};

export async function getStaticProps() {
  const { meetupsCollection, client } = await DatabaseConnection.instance.startConnection();

  const meetups = await meetupsCollection.find().toArray();

  DatabaseConnection.instance.endConnection( client );

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