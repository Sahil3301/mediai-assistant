import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RoutePath, APP_NAME } from '../../constants';
import Button from './Button';
import { IconProps } from '../../types';
import DonationBox from './DonationBox';

const BrainIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2a9.5 9.5 0 0 0-6.93 16.205A6.537 6.537 0 0 1 8.5 14.518a6.507 6.507 0 0 1 7 0 6.537 6.537 0 0 1 3.43 3.687A9.5 9.5 0 0 0 12 2Zm0 18c-2.53 0-4.79-.99-6.49-2.62a6.35 6.35 0 0 1 2.05-3.803 4.507 4.507 0 0 0-2.41-2.043C3.6 10.615 3 8.667 3 7.5 3 4.467 7.03 2 12 2s9 2.467 9 5.5c0 1.167-.6 3.115-2.15 4.034a4.507 4.507 0 0 0-2.41 2.043c.74.98 1.47 2.193 2.05 3.804C16.79 19.01 14.53 20 12 20Zm-4.33-5.529A4.542 4.542 0 0 0 8.5 16.518a4.507 4.507 0 0 0 7 0c.27-.76.42-1.58.42-2.44a6.384 6.384 0 0 1-1.99 1.412 6.51 6.51 0 0 1-5.86 0A6.383 6.383 0 0 1 7.67 14.08Z"/>
    <path d="M11.5 7.5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zM12.5 9.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM10 11.5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zM14 11.5a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
  </svg>
);


const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to={RoutePath.Home} className="flex items-center space-x-2 text-primary-DEFAULT hover:text-primary-dark">
            <BrainIcon className="h-8 w-8" />
            <span className="font-bold text-xl">{APP_NAME} - Live Demo</span>
          </Link>
          <nav className="flex items-center space-x-4">
            <Link to={RoutePath.Home} className="text-neutral-700 hover:text-primary-DEFAULT px-3 py-2 rounded-md text-sm font-medium">
              Home
            </Link>
            <Link to={RoutePath.Dashboard} className="text-neutral-700 hover:text-primary-DEFAULT px-3 py-2 rounded-md text-sm font-medium">
              Dashboard
            </Link>
            <DonationBox />
            <Button onClick={() => navigate(RoutePath.Dashboard)} variant="primary" size="sm">
                Try Now
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;