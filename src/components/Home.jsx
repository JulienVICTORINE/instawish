// src/components/Home.js
import React, {useState} from 'react';
import { Typography, IconButton, Grid, Menu, MenuItem, Avatar } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { styled } from '@mui/system';

const CenteredTypography = styled(Typography)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const RoundedIconButton = styled(IconButton)({
  borderRadius: '50%',
  overflow: 'hidden',
});

const Home = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div style={{ padding: '16px' }}>
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item>
          <RoundedIconButton color="primary" aria-label="Ajouter">
            <AddCircleIcon fontSize="large" />
          </RoundedIconButton>
        </Grid>

        <Grid item>
          <CenteredTypography variant="h4">Instawish</CenteredTypography>
        </Grid>

        <Grid item>
          <RoundedIconButton onClick={handleClick}>
            <Avatar alt="username" src="/chemin/vers/image-profil.jpg" />
          </RoundedIconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Mon Profil</MenuItem>
            <MenuItem onClick={handleClose}>Se déconnecter</MenuItem>
          </Menu>
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
