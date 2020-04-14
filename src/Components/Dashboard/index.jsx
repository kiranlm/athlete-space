import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Activity from '../Activity';
import PageContainer from '../PageContainer';

const useStyles = makeStyles({});

export default function Dashboard() {
  const classes = useStyles();

  const activities = [
    {
      title: 'Morning run 10 km',
      date: 'September 14, 2016',
      image: '/images/run.jpg',
      description:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perferendis, eius quaerat. Accusamus eum accusantium natus minima dolorum quasi laudantium veritatis? Harum repudiandae recusandae provident dignissimos! Veniam autem labore culpa veritatis.',
    },
    {
      title: 'Morning run 15 km',
      date: 'September 14, 2016',
      image: '/images/run.jpg',
      description:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perferendis, eius quaerat. Accusamus eum accusantium natus minima dolorum quasi laudantium veritatis? Harum repudiandae recusandae provident dignissimos! Veniam autem labore culpa veritatis.',
    },
    {
      title: 'Morning run 20 km',
      date: 'September 14, 2016',
      image: '/images/run.jpg',
      description:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perferendis, eius quaerat. Accusamus eum accusantium natus minima dolorum quasi laudantium veritatis? Harum repudiandae recusandae provident dignissimos! Veniam autem labore culpa veritatis.',
    },
  ];

  return (
    <PageContainer>
      {activities.map((item) => (
        <Activity activity={item} />
      ))}
    </PageContainer>
  );
}
