import { useRouter } from 'next/router';
import NewMeetupForm from '../../components/meetups/NewMeetupForm';

const NewMeetupPage = () => {
  const router = useRouter();

  const addMeetupHandler = async ( enteredMeetupData ) => {
    const response = await fetch('/api/new-meetup', {
      method: 'POST',
      body: JSON.stringify( enteredMeetupData ),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();

    if ( data.status === 201 ) {
      router.push('/');
    }
  };

  return (
    <NewMeetupForm 
      onAddMeetup={ addMeetupHandler }
    />
  );
};
 
export default NewMeetupPage;