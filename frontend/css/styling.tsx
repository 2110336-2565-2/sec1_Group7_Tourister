import { Button } from "@mui/material";
import { styled } from '@mui/material/styles';
import { FormLabel } from '@mui/material';


export const PrimaryButton = styled(Button)({
    background: '#257AFF',
    border: 0,
    borderRadius: 12,
    boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .4)',
    height: 50,
    width: 280,
    padding: '10px 30px',
    margin: 15,
    color: 'white',
    fontSize: '20px',
    fontWeight: "bold",
    textTransform: 'capitalize'
});


// fontWeight: 'bold'
export const RequireFormLabel = styled(FormLabel)({
    required: true,
    color: 'black',
    fontSize: 15,
    padding: '5px 0px',
})