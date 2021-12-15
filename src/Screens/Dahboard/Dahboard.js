import { Typography, Grid, Box, Container,Divider, OutlinedInput, Radio, FormControlLabel, Button } from '@material-ui/core'
import React, { useState } from 'react'
import { connect } from "react-redux";
import { userLogout } from '../../Redux';
import { makeStyles } from "@material-ui/core/styles";
import ScreenDialog from '../../Component/Dialog';

<img ></img>
const styles = makeStyles((theme) => ({
  checkoutHead: {
      color: '#906269'
  },
  firstDivider: {
      marginBottom: '20px',
  },
  placeOrderBtn: {
      backgroundColor: '#906269',
      color: 'white',
      padding: '20px',
      marginTop:'20px',
      "&:hover": {
          color: 'white',
          backgroundColor: '#906269',
      },
  },
}));

const Dahboard = (props) => {
  const classes = styles();

  const { userLogout, hotels } = props;
  const [dialogOpen, setDialogOpen] = useState(false)

  const hideDialogHandler = () => {
    setDialogOpen(!dialogOpen)
  }

  const BookNow = (id) => {
    console.log(id, "index")
    setDialogOpen(true)
  }

  return (
    <>
      <Grid container  >
        <Grid item xs={12}  >
          <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }} >
            <Typography variant="h2" style={{ color: "#906269" }} >Hotel Management System</Typography>
            <Button style={{ backgroundColor: "#906269", color: 'white' }} onClick={() => {
              userLogout()
              localStorage.removeItem('uid')
            }} >Logout</Button>
          </div>
        </Grid>
      </Grid>
      { hotels.length == 0 ? <Typography>Loading...</Typography> : <Container>
        <Grid container style={{ marginTop: '40px' }} spacing={4}  >
          {hotels?.map((val, i) => {
            return (
              <Grid key={val?.id} item xs={12} sm={6} md={4} >
                <Box p={2} style={{ boxShadow: '0 0.5rem 1rem rgb(0 0 0 / 15%)' }} >
                  <img style={{ width: '100%' }} src='https://www.ahstatic.com/photos/a7l9_ho_00_p_1024x768.jpg' />
                  <Typography style={{ margin: '10px 0px' }} variant="h4" > Hotel Name : {"Ramada Plaza"}</Typography>
                  <Typography style={{ margin: '10px 0px' }} variant="h6" >No of Rooms : {val?.data?.noOfRooms}</Typography>
                  <Typography style={{ margin: '10px 0px' }} variant="h6" >Per Day Price : {val?.data?.perDayPrice}</Typography>
                  <Button style={{ backgroundColor: "#906269", color: 'white' }}  onClick={() => BookNow(val?.id)} variant="outlined" >Book now</Button>
                </Box>
              </Grid>
            )
          })}
        </Grid>
      </Container>
      }
      <ScreenDialog openDialog={dialogOpen} maxWidth="sm" fullWidth={true} scrollType="body" hideDialogHandler={hideDialogHandler}>
        <Box pt={4} px={4} >
          <Typography className={classes.checkoutHead} variant="h3" >Book now</Typography>
        </Box>
        <Box pb={4} px={4} >
                <form>
                    <Box mt={2}>
                        <Typography style={{ color: "gray" }} >Name *</Typography>
                        <OutlinedInput required style={{ borderRadius: "10px", height: "45px", marginTop: "5px" }} placeholder="Your Name" fullWidth
                        />
                    </Box>
                    <Box my={2}>
                        <Typography style={{ color: "gray" }} >Contact No *</Typography>
                        <OutlinedInput required style={{ borderRadius: "10px", height: "45px", marginTop: "5px" }} placeholder="03152193909" fullWidth
                        />
                    </Box>
                    <Box my={2}>
                        <Typography style={{ color: "gray" }} >Address *</Typography>
                        <OutlinedInput required style={{ borderRadius: "10px", height: "45px", marginTop: "5px" }} placeholder="Karachi.." fullWidth
                        />
                    </Box>
                    <FormControlLabel value="cod" checked={true} value={true} control={<Radio />} label="Cash on CheckIn" />
                    {/* <Typography style={{ marginTop: '20px', textAlign: 'end' }} > Total Ammount : <span style={{ color: '#FF0000' }} > adad </span> </Typography> */}
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }} >
                        <Button type="submit" className={classes.placeOrderBtn}  >Book</Button>
                    </div>
                </form>
            </Box>
        <Divider className={classes.firstDivider} />
      </ScreenDialog>
    </>
  )
}

const mapStateToProps = (store) => ({
  currentUser: store.user.data,
  hotels: store.user.allHotels
});

const mapDispatchToProps = (dispatch) => ({
  userLogout: () => dispatch(userLogout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dahboard);