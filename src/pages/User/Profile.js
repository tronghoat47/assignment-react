import React, { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const Profile = () => {
  const { auth } = useContext(AuthContext);

  if (!auth) {
    return <div>You need to login to view this page.</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Profile</h1>
      <p>
        <strong>Username:</strong> {auth.token}
      </p>
      <p>
        <strong>Role:</strong> {auth.role}
      </p>
    </div>
  );
};

export default Profile;
