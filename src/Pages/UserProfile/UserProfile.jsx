import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBirthdayCake, faPen } from "@fortawesome/free-solid-svg-icons";
import silverBadge from '../../assets/award-silver.png'
import goldBadge from '../../assets/award-gold.png'
import diamondBadge from '../../assets/award-diamond.png'

import moment from "moment";

import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";
import Avatar from "../../components/Avatar/Avatar";
import EditProfileForm from "./EditProfileForm";
import ProfileBio from "./ProfileBio";
import "./UsersProfile.css";
import { getLoginInfo } from "../../api";

const UserProfile = ({ slideIn, handleSlideIn }) => {
  const { id } = useParams();
  const users = useSelector((state) => state.usersReducer);
  const currentProfile = users.filter((user) => user._id === id)[0];
  const [loginHistory, setLoginHistory] = useState(null);
  const currentUser = useSelector((state) => state.currentUserReducer);
  const [Switch, setSwitch] = useState(false);
  const loggedInUser = JSON.parse(localStorage.getItem('Profile'))?.result
  const award = currentProfile && {
    silver: currentProfile?.points >= 15,
    gold: currentProfile?.points >= 30,
    diamond: currentProfile?.points >= 50
  }
  const disabledAwardStyle = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(155, 155, 155, 0.8)'
  }
  const awardStyle = {
    backgroundColor: 'transparent'
  }
  useEffect(() => {
    if (loggedInUser) {
      if (loggedInUser._id === id) {
        getLoginInfo(id).then(loginHistory => setLoginHistory(loginHistory.data.loginInfo)).catch(err => console.error(err));
      }
    }
    // eslint-disable-next-line
  }, [id])
  return (
    <div className="home-container-1">
      <LeftSidebar slideIn={slideIn} handleSlideIn={handleSlideIn} />
      <div className="home-container-2">
        <section>
          <div className="user-details-container">
            <div className="user-details">
              <Avatar
                backgroundColor="purple"
                color="white"
                fontSize="50px"
                px="40px"
                py="20px"
                borderRadius={'100%'}
              >
                {currentProfile?.name.charAt(0).toUpperCase()}
              </Avatar>
              <div className="user-name">
                <h1>{currentProfile?.name}</h1>
                <p>points {currentProfile && currentProfile.points}</p>
                <p>
                  <FontAwesomeIcon icon={faBirthdayCake} /> Joined{" "}
                  {moment(currentProfile?.joinedOn).fromNow()}
                </p>
              </div>
            </div>

            {currentUser?.result._id === id && (
              <button
                type="button"
                onClick={() => setSwitch(true)}
                className="edit-profile-btn"
              >
                <FontAwesomeIcon icon={faPen} /> Edit Profile
              </button>
            )}

          </div>
          <>
            {Switch ? (
              <EditProfileForm
                currentUser={currentUser}
                setSwitch={setSwitch}
              />
            ) : (
              <ProfileBio currentProfile={currentProfile} />
            )}
          </>
          {
            currentProfile && <div className="badge-container-wrap">
            <h1>Badges</h1>
            <div className="badge-container">
              <div className="badge-card">
                <div className="image-container">
                  <div style={award.silver ? awardStyle : disabledAwardStyle}></div>
                  <img src={silverBadge} alt="silver badge" />
                </div>
                <p>{award.silver?1:'Earn 15 points to get Silver badge'}</p>
              </div>
              <div className="badge-card">
                <div className="image-container">
                  <div style={award.gold ? awardStyle : disabledAwardStyle}></div>
                  <img src={goldBadge} alt="gold badge" />
                </div>
                <p>{award.gold?1:'Earn 30 points to get Gold badge'}</p>
              </div>
              <div className="badge-card">
                <div className="image-container">
                  <div style={award.diamond ? awardStyle : disabledAwardStyle}></div>
                  <img src={diamondBadge} alt="diamond badge" />
                </div>
                <p>{award.diamond?1:'Earn 50 points to get Diamond badge'}</p>
              </div>
            </div>
            <div>
              <h4>How to earn points</h4>
              <ul>
                <li>Get 10 points on every  4 answer like 4,8,12,16... delete answer don't minus points </li>
                <li>If any user upvote your question you get 2 points </li>
              </ul>
            </div>
          </div>
          }
          {
            loggedInUser && loggedInUser._id === id && <div  >
              {loginHistory && <h2 >Login History</h2>}
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", height: "320px", overflow: "auto" ,padding:"10px 0" }}>
                {
                  loginHistory && loginHistory.map(history => {
                    return <div style={{ backgroundColor: "white", boxShadow: "2px 2px 5px  #d3e4eb", padding: '6px', width: 'fit-content', height: "fit-content", borderRadius: "6px" }} key={history.loginAt}>
                      <p>OS : {history.os}</p>
                      <p>Browser : {history.browser}</p>
                      <p>IP : {history.ip}</p>
                      <p>Date : {new Date(history.loginAt).toLocaleDateString()} {new Date(history.loginAt).toLocaleTimeString()}</p>
                    </div>
                  })
                }
              </div>
            </div>
          }
        </section>
      </div>
    </div>
  );
};

export default UserProfile;
