import React, { useState, useEffect } from 'react';
import { Box, LinearProgress, Typography } from '@mui/material';

const LinearProgressWithLabel = (props) => {
    return (
        <Box display="flex" alignItems="center">
            <Box width="100%" mr={1}>
                <LinearProgress variant="determinate" {...props} />
            </Box>
            <Box minWidth={35}>
                <Typography variant="body2" color="textSecondary">{`${Math.round(
                    props.value,
                )}%`}</Typography>
            </Box>
        </Box>
    );
};

const ProgressWithTimeout = () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
        }, 1000); // 1초마다 10%씩 증가

        // 타이머 정리
        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <Box width="100%">
            <LinearProgressWithLabel value={50} />
        </Box>
    );
};

export default ProgressWithTimeout;