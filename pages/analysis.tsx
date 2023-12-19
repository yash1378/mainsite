// AnalysisPage.tsx
import React from 'react';
import { useRouter } from 'next/router';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

const AnalysisPage: React.FC = () => {
  const router = useRouter();
  const { buttonColors, integralButtonColors } = router.query;

  // Parse the received data
  const parsedButtonColors = buttonColors ? JSON.parse(buttonColors as string) : [];
  const parsedIntegralButtonColors = integralButtonColors ? JSON.parse(integralButtonColors as string) : [];

  console.log('Parsed Button Colors:', parsedButtonColors);
  console.log('Parsed Integral Button Colors:', parsedIntegralButtonColors);

  // Combine data from both tables
  const combinedData = [...parsedButtonColors, ...parsedIntegralButtonColors];

  // Function to count the number of clicked answers for a specific column
  const countClickedAnswers = (data: any[], columnIndex: number) => {
    return data.reduce((acc, row) => acc + (row && row[columnIndex] !== '' ? 1 : 0), 0);
  };

  // Calculate the number of clicked answers for each column
  const clickedCorrectAnswers = countClickedAnswers(combinedData, 0); // First column
  const clickedSillyErrors = countClickedAnswers(combinedData, 1); // Second column
  const clickedSlightRevisions = countClickedAnswers(combinedData, 2); // Third column
  const clickedToughness = countClickedAnswers(combinedData, 3); // Fourth column
  const clickedTheory = countClickedAnswers(combinedData, 4); // Fifth column

  // Calculate final cumulative row
  const finalCumulativeRow = {
    date: new Date().toLocaleDateString(),
    type: 'Mains',
    totalMarks: 100,
    mathsScore: clickedCorrectAnswers * 4,
    sillyError: clickedSillyErrors * 4,
    slightRevision: clickedSlightRevisions * 4,
    toughness: clickedToughness * 4,
    theory: clickedTheory * 4,
  };

  return (
    <div style={{ textAlign: 'center', display: 'flex', justifyContent: 'space-between' }}>
      <div style={{ width: '45%', margin: '0 10px' }}>
        <Typography variant="h2">Math Score</Typography>

        <TableContainer component={Paper} style={{ width: '100%', marginTop: '30px' }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Date</TableCell>
                <TableCell style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Type</TableCell>
                <TableCell style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Total Marks</TableCell>
                <TableCell style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Maths Score</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* Cumulative Row */}
              <TableRow key={finalCumulativeRow.date}>
                <TableCell style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>{finalCumulativeRow.date}</TableCell>
                <TableCell style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>{finalCumulativeRow.type}</TableCell>
                <TableCell style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>{finalCumulativeRow.totalMarks}</TableCell>
                <TableCell style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>{finalCumulativeRow.mathsScore}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <div style={{ width: '45%', margin: '0 10px' }}>
        <Typography variant="h2">Other Scores</Typography>

        <TableContainer component={Paper} style={{ width: '100%', marginTop: '30px' }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Silly Error</TableCell>
                <TableCell style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Slight Revision</TableCell>
                <TableCell style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Toughness</TableCell>
                <TableCell style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Theory</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* Cumulative Row */}
              <TableRow key={`${finalCumulativeRow.date}-other`}>
                <TableCell style={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'white', background: 'rgba(255, 0, 0, 0.4)' }}>
                  {finalCumulativeRow.sillyError}
                </TableCell>
                <TableCell style={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'white', background: 'rgba(138, 43, 226, 0.4)' }}>
                  {finalCumulativeRow.slightRevision}
                </TableCell>
                <TableCell style={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'white', background: 'rgba(0, 0, 255, 0.4)' }}>
                  {finalCumulativeRow.toughness}
                </TableCell>
                <TableCell style={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'white', background: 'rgba(0, 0, 255, 0.4)' }}>
                  {finalCumulativeRow.theory}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default AnalysisPage;
