import React from 'react';
import { LocalPhotoRepository } from '../../infrastructure/api/LocalPhotoRepository';

const withPhotoRepository = (WrappedComponent: React.ComponentType<any>) => {
  return (props: any) => <WrappedComponent {...props} photoRepository={new LocalPhotoRepository()} />;
};

export default withPhotoRepository;
