import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function createData(round, accuracy, incentives, trainers) {
  return {

    round,
    accuracy,
    incentives,
    history: [
      {

        customerId: trainers[0],
        amount: 3,
      },
      {

        customerId: trainers[1],
        amount: 1,
      },
      {

        customerId: trainers[2],
        amount: 4,
      },
    ],
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">{row.round}</TableCell>


        <TableCell align="right">{row.accuracy}%</TableCell>
        <TableCell align="right">${row.incentives}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Trainers
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>

                    <TableCell align="right">Times Selected</TableCell>
                  
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.customerId}>
                      <TableCell component="th" scope="row">
                        {historyRow.customerId}
                      </TableCell>

                      <TableCell align="right">{historyRow.amount}</TableCell>
                  
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}





export default function CollapsibleTable({ roundAverages, trainersList }) {
  console.log(trainersList)


  // accracy , trainers
  const rows = [
    createData(1, roundAverages[0], calculateIncentives(roundAverages[0]), trainersList[0]),
    createData(2, roundAverages[1], calculateIncentives(roundAverages[1]), trainersList[1]),
    createData(3, roundAverages[2], calculateIncentives(roundAverages[2]), trainersList[2]),
    createData(4, roundAverages[3], calculateIncentives(roundAverages[3]), trainersList[3]),
    createData(5, roundAverages[4], calculateIncentives(roundAverages[4]), trainersList[4]),
  ];

  function calculateIncentives(accuracy) {
    return accuracy * 4;
  }


  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell align='left' >Round</TableCell>


            <TableCell align="right">Accuracy</TableCell>
            <TableCell align="right">Incentives</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.round} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
