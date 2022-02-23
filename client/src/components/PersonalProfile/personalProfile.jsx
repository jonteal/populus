import React, { useEffect } from "react";
import { Card, Icon } from 'semantic-ui-react';
import './personalProfile.css';
import { useQuery } from '@apollo/client';
import { GET_ME } from "../../utils/queries";
import auth from "../../utils/auth";

// Personal Profile component - Displays user's profile
const PersonalProfile = () => {

    const { loading, data } = useQuery(GET_ME, {
        variables: { id: auth.getProfile().data._id }
    });
    
    useEffect(() => {
        console.log(auth.getProfile().data._id);
        console.log(data);
    }, [data])

    return (
        <>
        <Card className="personalProfileCard"
            header={data}
            meta='User'
            description='Jon is a web developer and likes brownies.'
            // extra={extra}
        />

        </>
    )
}

export default PersonalProfile;