import React from 'react';
import { Card, CardContent, Typography, Chip, styled, Button } from '@mui/material';
import Link from 'next/link';

// Styled Card component
const StyledCard = styled(Card)(({ theme }) => ({
    maxWidth: 345,
    margin: 'auto',
    borderRadius: 12,
    boxShadow: theme.shadows[5],
    position: 'relative',
    paddingBottom: theme.spacing(2),
    padding: theme.spacing(2),
}));

const ModelCard = ({
    modelName,
    requiredParticipants,
    rewardRate,
    restrictions,
    userCriteria
}) => {
    // Function to determine chip color based on user criteria
    const getChipColor = (restriction, userCriteria) => {
        return userCriteria.includes(restriction) ? 'success' : 'error';
    };

    return (
        <StyledCard>
            <CardContent>
                <Typography variant="h5" component="div">
                    {modelName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Required Participants: {requiredParticipants}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Reward Rate: {rewardRate}%
                </Typography>
            </CardContent>

            <CardContent>
                <Typography variant="subtitle1" component="div">
                    Restrictions:
                </Typography>
                {restrictions.map((restriction, index) => (
                    <Chip
                        key={index}
                        label={restriction.label}
                        color={getChipColor(restriction.value, userCriteria)}
                        variant="outlined"
                        sx={{ marginRight: 1, marginBottom: 1 }}
                    />
                ))}
            </CardContent>
            <Link href="/training">
                <Button fullWidth variant="contained" color="primary">
                    Participate
                </Button>
            </Link>
        </StyledCard>
    );
};

// Example usage
export default function TrainingCard() {
    const modelDetails = {
        modelName: 'Image Classification Model',
        requiredParticipants: 100,
        rewardRate: 10,
        restrictions: [
            { label: 'Android Only', value: 'android' },
            { label: 'Share Location', value: 'location' },
            { label: 'Upload Images', value: 'images' },
        ],
    };

    const userCriteria = ['android', 'location']; // User meets android and location restrictions

    return (
        <div>
            <ModelCard
                modelName={modelDetails.modelName}
                requiredParticipants={modelDetails.requiredParticipants}
                rewardRate={modelDetails.rewardRate}
                restrictions={modelDetails.restrictions}
                userCriteria={userCriteria}
            />
        </div>
    );
}