import MeetupList from '../components/meetups/MeetupList';

const DUMMY_MEETUPS = [
  {
    id: 'm1',
    title: 'A First Meetup',
    image: 'https://images.pexels.com/photos/459301/pexels-photo-459301.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    address: 'Some address 5, 12345 Some City',
    description: 'This is a first meetup!'
  },
  {
    id: 'm2',
    title: 'A Second Meetup',
    image: 'https://images.pexels.com/photos/459301/pexels-photo-459301.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    address: 'Some address 10, 12345 Some City',
    description: 'This is a second meetup!'
  }
];

const HomePage = () => {
  return (
    <MeetupList meetups={ DUMMY_MEETUPS } />
  );
};
 
export default HomePage;