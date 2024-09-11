import React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
[`&.${stepConnectorClasses.alternativeLabel}`]: {
top: 22,
},
[`&.${stepConnectorClasses.active}`]: {
[`& .${stepConnectorClasses.line}`]: {
backgroundImage:
'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
},
},
[`&.${stepConnectorClasses.completed}`]: {
[`& .${stepConnectorClasses.line}`]: {
backgroundImage:
'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
},
},
[`& .${stepConnectorClasses.line}`]: {
height: 3,
border: 0,
backgroundColor:
theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
borderRadius: 1,
},
}));

const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
zIndex: 1,
color: '#fff',
width: 50,
height: 50,
display: 'flex',
borderRadius: '50%',
justifyContent: 'center',
alignItems: 'center',
...(ownerState.active && {
backgroundImage:
'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
}),
...(ownerState.completed && {
backgroundImage:
'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
}),
}));

function ColorlibStepIcon(props) {
const { active, completed, className } = props;

return (
<ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
{completed ? '✓' : props.icon}
</ColorlibStepIconRoot>
);
}

const ContributionTracker = () => {
const steps = [
{ label: 'January', status: "Completed", comment: "Payment Made" },
{ label: 'February', status: "Completed", comment: "Payment Made" },
{ label: 'March', status: "In Progress", comment: "Payment Pending" },
{ label: 'April', status: "In Progress", comment: "Payment Pending" },
{ label: 'May', status: "In Progress", comment: "Payment Pending" },
{ label: 'June', status: "In Progress", comment: "Payment Pending" },
{ label: 'July', status: "In Progress", comment: "Payment Pending" },
{ label: 'August', status: "In Progress", comment: "Payment Pending" },
{ label: 'September', status: "In Progress", comment: "Payment Pending" },
{ label: 'October', status: "In Progress", comment: "Payment Pending" },
{ label: 'November', status: "In Progress", comment: "Payment Pending" },
{ label: 'December', status: "In Progress", comment: "Payment Pending" }
];

return (
<Box sx={{ maxWidth: 400, margin: 'auto', mt: 4 }}>
<Typography variant="h6" gutterBottom>
Monthly Contribution Tracker
</Typography>
<Typography variant="body2" color="text.secondary" paragraph>
Effortlessly manage and monitor your financial commitments
</Typography>
<Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
<Typography variant="subtitle1">Month</Typography>
<Typography variant="subtitle1">Status</Typography>
</Box>
<Stepper orientation="vertical" connector={<ColorlibConnector />}>
{steps.map((step, index) => (
<Step key={step.label} active={step.status === "Completed"}>
<StepLabel StepIconComponent={ColorlibStepIcon}>
<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
<Typography>{step.label}: {step.comment}</Typography>
<Typography
variant="caption"
sx={{
                    bgcolor: step.status === "Completed" ? 'success.main' : 'info.main',
                    color: 'white',
                    px: 1,
                    py: 0.5,
                    borderRadius: '10px',
                  }} >
{step.status}
</Typography>
</Box>
</StepLabel>
</Step>
))}
</Stepper>
</Box>
);
};

export default ContributionTracker;
