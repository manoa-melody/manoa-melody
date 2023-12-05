import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Roles } from 'meteor/alanning:roles';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Footer from '../components/Footer';
import ManoaMelody from '../pages/ManoaMelody';
import NotFound from '../pages/NotFound';
import SignUp from '../pages/SignUp';
import SignOut from '../pages/SignOut';
import NavBar from '../components/NavBar';
import SignIn from '../pages/SignIn';
import NotAuthorized from '../pages/NotAuthorized';
import LoadingSpinner from '../components/LoadingSpinner';
import AddEvent from '../pages/AddEvent';
import ListProfiles from '../pages/ListProfiles';
import ListEvents from '../pages/ListEvents';
import SetUp from '../pages/SetUp';
import MyProfile from '../pages/MyProfile';
import MyEvents from '../pages/MyEvents';
import ListEventsAdmin from '../pages/ListEventsAdmin';
import ListProfilesAdmin from '../pages/ListProfilesAdmin';
import EditProfile from '../pages/EditProfile';
import EditEvents from '../pages/EditEvents';
import { Profiles } from '../../api/profile/Profiles';

/** Top-level layout component for this application. Called in imports/startup/client/startup.jsx. */
const App = () => {
  const { ready } = useTracker(() => {
    const rdy = Roles.subscription.ready();
    return {
      ready: rdy,
    };
  });
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <NavBar />
        <Routes>
          <Route exact path="/" element={<ManoaMelody />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signout" element={<SignOut />} />
          <Route path="/home" element={<NoProfileProtect><ManoaMelody /></NoProfileProtect>} />
          <Route path="/setup" element={<ProfileProtect><SetUp /></ProfileProtect>} />
          <Route path="/profiles" element={<NoProfileProtect><ListProfiles /></NoProfileProtect>} />
          <Route path="/events" element={<NoProfileProtect><ListEvents /></NoProfileProtect>} />
          <Route path="/add-event" element={<NoProfileProtect><AddEvent /></NoProfileProtect>} />
          <Route path="/edit-profile/:_id" element={<NoProfileProtect><EditProfile /></NoProfileProtect>} />
          <Route path="/edit-event/:_id" element={<NoProfileProtect><EditEvents /></NoProfileProtect>} />
          <Route path="/my-events" element={<NoProfileProtect><MyEvents /></NoProfileProtect>} />
          <Route path="/my-profile" element={<NoProfileProtect><MyProfile /></NoProfileProtect>} />
          <Route path="/admin-events" element={<AdminProtectedRoute ready={ready}><ListEventsAdmin /></AdminProtectedRoute>} />
          <Route path="/admin-profiles" element={<AdminProtectedRoute ready={ready}><ListProfilesAdmin /></AdminProtectedRoute>} />
          <Route path="/notauthorized" element={<NotAuthorized />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

/*
 * Prevents the logged in user from creating another profile.
 */
const ProfileProtect = ({ children }) => {
  const { ready, isLogged, hasProfile } = useTracker(() => {
    const isLoggedIn = Meteor.userId() !== null;
    // Gets the username logged into the website
    const user = Meteor.user();
    // Check if the user exists before accessing user().username
    const owner = user ? user.username : null;
    // UseTracker to subscribe to the user's profile data
    const subscription = Meteor.subscribe(Profiles.userPublicationName);
    const rdy = subscription.ready();
    const userHasProfile = () => (user ? !!Profiles.collection.findOne({ owner: owner }) : false);
    return {
      ready: rdy,
      isLogged: isLoggedIn,
      hasProfile: userHasProfile,
    };
  }, []);
  // eslint-disable-next-line no-nested-ternary
  return ready ? (isLogged && !hasProfile() ? children : <Navigate to="/my-profile" />) : <LoadingSpinner />;
};

/*
 * Prevents the logged in user from accessing web pages if no profile has been created.
 */
const NoProfileProtect = ({ children }) => {
  const { ready, isLogged, hasProfile } = useTracker(() => {
    const isLoggedIn = Meteor.userId() !== null;
    // Gets the username logged into the website
    const user = Meteor.user();
    // Check if the user exists before accessing user().username
    const owner = user ? user.username : null;
    // UseTracker to subscribe to the user's profile data
    const subscription = Meteor.subscribe(Profiles.userPublicationName);
    const rdy = subscription.ready();
    const userHasProfile = () => (user ? !!Profiles.collection.findOne({ owner: owner }) : false);
    return {
      ready: rdy,
      isLogged: isLoggedIn,
      hasProfile: userHasProfile,
    };
  }, []);
  // eslint-disable-next-line no-nested-ternary
  return ready ? (isLogged && !hasProfile() ? <Navigate to="/setup" /> : children) : <LoadingSpinner />;
};

/**
 * AdminProtectedRoute (see React Router v6 sample)
 * Checks for Meteor login and admin role before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const AdminProtectedRoute = ({ ready, children }) => {
  const isLogged = Meteor.userId() !== null;
  if (!isLogged) {
    return <Navigate to="/signin" />;
  }
  if (!ready) {
    return <LoadingSpinner />;
  }
  const isAdmin = Roles.userIsInRole(Meteor.userId(), 'admin');
  return (isLogged && isAdmin) ? children : <Navigate to="/notauthorized" />;
};

// Require a component and location to be passed to each ProtectedRoute.
ProfileProtect.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

ProfileProtect.defaultProps = {
  children: <ManoaMelody />,
};

// Require a component and location to be passed to each ProtectedRoute.
NoProfileProtect.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

NoProfileProtect.defaultProps = {
  children: <ManoaMelody />,
};

// Require a component and location to be passed to each AdminProtectedRoute.
AdminProtectedRoute.propTypes = {
  ready: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

AdminProtectedRoute.defaultProps = {
  ready: false,
  children: <ManoaMelody />,
};

export default App;
