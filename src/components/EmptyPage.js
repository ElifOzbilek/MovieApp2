import React from 'react';
import { useParams } from 'react-router-dom';

const EmptyPage = () => {
  const { imdbID } = useParams();

  return (
    <div>
     
    </div>
  );
};

export default EmptyPage;
