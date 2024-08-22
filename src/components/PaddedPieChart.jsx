import {PieChart} from "@mui/x-charts/PieChart";


export function PaddedPieChart({data}) {
    return <>
        <PieChart style={{ color: 'white' }}
                  series={[
                      {
                          data: data,
                          innerRadius: 20,
                          outerRadius: 120,
                          paddingAngle: 3,
                          cornerRadius: 5
                      },
                  ]}
                  margin={{ top: 100, bottom: 100, left: 100, right:100 }}
                  width={250}
                  height={300}
                  slotProps={{ legend: { hidden: true } }}
                  sx={{ boxShadow: 'none', '.MuiPieArc-root': { stroke: 'black' } }}
        />
    </>
}