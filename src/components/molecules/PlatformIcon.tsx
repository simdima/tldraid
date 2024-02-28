import React from 'react';
import { IconType } from 'react-icons';
import { FaAndroid } from 'react-icons/fa';

interface ConditionalIconProps {
  asComponent: boolean;
}

// Define a generic type that represents either IconType or React.ReactNode
type IconOrNode<T extends boolean> = T extends true ? IconType : React.ReactNode;

const ConditionalIcon = <T extends boolean>({
  asComponent,
}: ConditionalIconProps): IconOrNode<T> => {
  if (asComponent) {
    return (<FaAndroid />) as IconOrNode<T>; // Explicit cast
  } else {
    return FaAndroid as IconOrNode<T>; // Just returning the component type
  }
};

export default ConditionalIcon;
