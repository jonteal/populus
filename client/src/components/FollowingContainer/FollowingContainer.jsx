import React, { useState, useEffect } from "react";
import './followingContainer.css';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ME } from '../../utils/queries';
import { FOLLOW_UNFOLLOW } from '../../utils/mutations';
import AuthService from '../../utils/auth';
import { removeUserId, addUserId } from '../../utils/localStorage';
import { Link } from "react-router-dom";
import { GET_PROFILE } from '../../utils/queries';
import Account from "../Account/Account";

const FollowingContainer = () => {

    
    // Declare user variable, setUser method to update state of user
    const [user, setUser] = useState({});

    // Implement useQuery to enact the GET_ME query using 
    // id as the variable that filters the data
    const { loading, data } = useQuery(GET_ME, {
        variables: { id: AuthService.getProfile().data._id }
    });

    const [followButton, {error}] = useMutation(FOLLOW_UNFOLLOW);

    // ========= CHECK SENT AND RETURNED DATA ===========
    const handleFollow = async (event) => {
        event.preventDefault();

        console.log((event.target.id));
        const db_following = await followButton({
            variables: {_id: event.target.id}
        })

        console.log(db_following);
        return db_following;
    }
    
    let following = user?.following || [];

    // 
    useEffect(() => {
        if (data) {
            console.log("updating state");
            setUser(data.getMe);
        }

        following = user?.following || [];
        console.log(following);
    }, [data])

    if (loading) {
        return <p>Loading...</p>
    }




    return (
        <>
            <h1>People I follow</h1>

            <div className="followingList">
                <ul>
                
                {following.map(following => (
                    <li key={following._id}>
                    
                    <div className="ui card">
                        <div className="content">
                            <Link to={`/account/${Account._id}`} className="header">{`${following.firstName} ${following.lastName}`}</Link>
                        </div>
                        <div className="extra content">
                        {/* <a>
                        <i className="user icon"></i>
                            {following.followers?.length || 0} Followers
                        </a>
                        <a>
                        <i className="user icon"></i>
                            {following.following?.length || 0} Following
                        </a> */}
                        
                        </div>

                        <button className="followUnfollowBtn ui button"
                            id={following._id}
                            onClick={handleFollow}
                        >
                            Follow
                        </button>

                    </div>

                    </li>
                ))}
                </ul>


            </div>

            {/* Back to Personal Profile */}
            <div className="homeBtnContainer">
                <Link to='/mates'><button className="ui primary basic button">Back to Me</button></Link>
            </div>



        </>
    )
















    // // const { loading, data } = useQuery(GET_ME);

    // const [user, setUser] = useState({});

    // const { loading, data } = useQuery(GET_ME, {
    //     variables: { id: AuthService.getProfile().data._id }
    // });

    // useEffect(() => {
    //     if (data) {
    //         setUser(data.getMe);
    //         console.log("---- fetched data ---");
    //         console.log(data);
    //     }
    // }, [data])

    // // const userData = data?.me || {};

    // const [unfollowUser, {error}] = useMutation(FOLLOW_UNFOLLOW);

    // // const handleUnfollowUser = async (userId) => {
    // //     const token = AuthService.loggedIn() ? AuthService.getToken() : null;

    // //     if (!token) {
    // //         return false;
    // //     }

    // //     try {
    // //         const { data } = await unfollowUser({
    // //             variables: { userId },
    // //         });

    // //         removeUserId(userId);
    // //     } catch {
    // //         console.error(error);
    // //     }
    // // };

    // // if (loading) {
    // //     return <h2>Loading...</h2>
    // // }

    // // const addedUserIds = userData.addedUsers.map((user) => user.userId);
    // // addUserId(addedUserIds);

    // // const following = user?.following || [];


    // return(
    //     <div className="mainContainer">
        
    //         <div>
    //             <h1>People I Follow</h1>
    //         </div>

    //         <div className="followingContainer">
    //         {/* <h2>
    //             {user.addedUsers.length
    //                 ? `Viewing ${user.addedUsers.length} saved ${user.addedUsers.length === 1 ? 'user' : 'users'}:`
    //                 : 'You have no added users!'}
    //         </h2> */}

    //         <div className="following">
    //             {user.addedUsers.map((user) => {
    //                 return (
    //                     <div key={user.userId}>
    //                         <div>
    //                             {/* I think we need to include names/usernames */}
    //                             <div>{user}</div>
    //                             {/* <button onClick={() => handleUnfollowUser(user.userId)}>
    //                                 Unfollow
    //                             </button> */}
    //                         </div>
                            
    //                     </div>
    //                 )
    //             })}
                
            
    //         </div>
        
    //         </div>
    //     </div>
    // )
}

export default FollowingContainer;